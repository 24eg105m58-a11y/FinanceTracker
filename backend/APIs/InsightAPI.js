import exp from "express";
import Groq from "groq-sdk";
import { expenseModel } from "../models/ExpenseModel.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { config } from "dotenv";

config();

export const insightsApp = exp.Router();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

insightsApp.get("/getInsights", verifyToken, async (req, res) => {
  try {
   const month = req.query.month;

const currentDate = month ? new Date(month) : new Date();

const startOfMonth = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth(),
  1
);

const endOfMonth = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth() + 1,
  1
);

const expenses = await expenseModel.find({
  userId: req.user.id,
  expenseDate: {
    $gte: startOfMonth,
    $lt: endOfMonth,
  },
});

    if (expenses.length === 0) {
      return res.json({ message: "No expenses found to analyze" });
    }

    const summary = {};

    for (let exp of expenses) {
      if (!summary[exp.category]) {
        summary[exp.category] = 0;
      }

      summary[exp.category] += Number(exp.amount || 0);
    }

    const summaryText = Object.entries(summary)
      .map(([cat, amt]) => `${cat}: Rs.${amt}`)
      .join(", ");

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: `A user has the following expenses: ${summaryText}. Give 3 short personalized money saving tips based on their spending pattern. Keep each tip under 2 sentences.`,
        },
      ],
      max_tokens: 500,
    });

    res.json({
      message: "AI Insights",
      spendingSummary: summary,
      insights: response.choices[0].message.content,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
