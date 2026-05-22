import exp from "express";
import Groq from "groq-sdk";
import { config } from "dotenv";
import { upload } from "../config/multer.js";
import { uploadToCloudinary } from "../config/cloudinaryUpload.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { ReceiptModel } from "../models/ReceiptModel.js";

config();

export const receiptApp = exp.Router();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const parseJson = (text) => {
  try {
    const cleaned = text
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleaned);
  } catch {
    return {};
  }
};

receiptApp.post(
  "/scan",
  verifyToken,
  upload.single("receipt"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "Receipt image is required" });
      }

      const uploaded = await uploadToCloudinary(
        req.file.buffer,
        "expense_receipts"
      );

      const completion = await groq.chat.completions.create({
        model:
          process.env.RECEIPT_AI_MODEL ||
          "meta-llama/llama-4-scout-17b-16e-instruct",
        response_format: { type: "json_object" },
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text:
                  "Extract receipt data as JSON only. Return merchant, amount, category, expenseDate in YYYY-MM-DD format, and items array. If unsure, use category others.",
              },
              {
                type: "image_url",
                image_url: {
                  url: uploaded.secure_url,
                },
              },
            ],
          },
        ],
        temperature: 0,
        max_completion_tokens: 600,
      });

      const aiText = completion.choices[0]?.message?.content || "{}";
      const extracted = parseJson(aiText);

      const receipt = new ReceiptModel({
        userId: req.user.id,
        receiptUrl: uploaded.secure_url,
        cloudinaryPublicId: uploaded.public_id,
        merchant: extracted.merchant || "",
        amount: Math.max(0, Number(extracted.amount || 0)),
        category: extracted.category || "others",
        expenseDate: extracted.expenseDate
          ? new Date(extracted.expenseDate)
          : new Date(),
       items: Array.isArray(extracted.items)
  ? extracted.items.map((item) => ({
      name: item.name || "",
      quantity: Number(item.quantity || 1),
      price: Number(item.price || 0),
    }))
  : [],
        rawAiResult: extracted,
      });

      await receipt.save();

      res.json({
        message: "Receipt scanned",
        payload: receipt,
        suggestedExpense: {
          item: extracted.merchant || extracted.items?.[0] || "Receipt expense",
          amount: Number(extracted.amount || 0),
          category: String(extracted.category || "others").toLowerCase(),
          expenseDate: extracted.expenseDate,
        },
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);
