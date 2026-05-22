import { incomeModel } from "../models/IncomeModel.js";
import exp from "express";
import { verifyToken } from "../middlewares/verifyToken.js";

export const incomeApp = exp.Router();

const normalizeMonth = (month) => {
  if (!month) {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  }

  return String(month).slice(0, 7);
};

incomeApp.post("/addIncome", verifyToken, async (req, res) => {
  try {
    const month = normalizeMonth(req.body.month);

    const income = await incomeModel.findOneAndUpdate(
      {
        userId: req.user.id,
        month,
      },
      {
        $set: {
          income: Number(req.body.income),
          month,
          incomeDate: new Date(),
        },
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    res.json({ message: "Income saved", payload: income });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

incomeApp.get("/readIncome", verifyToken, async (req, res) => {
  try {
    const month = normalizeMonth(req.query.month);

    const income = await incomeModel
      .findOne({
        userId: req.user.id,
        month: { $lte: month },
      })
      .sort({ month: -1 });

    res.json({
      message: "Income",
      payload: income,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

incomeApp.put("/updateIncome", verifyToken, async (req, res) => {
  try {
    const month = normalizeMonth(req.body.month);

    const income = await incomeModel.findOneAndUpdate(
      {
        userId: req.user.id,
        month,
      },
      {
        $set: {
          income: Number(req.body.income),
          month,
          incomeDate: new Date(),
        },
      },
      {
        new: true,
        upsert: true,
       runValidators: true,
      }
    );

    res.json({
      message: "Income updated",
      payload: income,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
