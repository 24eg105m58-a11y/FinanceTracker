import exp from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { incomeModel } from "../models/IncomeModel.js";
import { expenseModel } from "../models/ExpenseModel.js";
import { savingsModel } from "../models/SavingsModel.js";

export const savingsApp = exp.Router();

const normalizeMonth = (month) => {
  if (!month) {
    const now = new Date();

    return `${now.getFullYear()}-${String(
      now.getMonth() + 1
    ).padStart(2, "0")}`;
  }

  return String(month).slice(0, 7);
};

savingsApp.get("/get-savings", verifyToken, async (req, res) => {
  try {
    const selectedMonth = req.query.month
      ? new Date(req.query.month)
      : new Date();

    const monthKey = `${selectedMonth.getFullYear()}-${String(
      selectedMonth.getMonth() + 1
    ).padStart(2, "0")}`;

    const startOfMonth = new Date(
      selectedMonth.getFullYear(),
      selectedMonth.getMonth(),
      1
    );

    const endOfMonth = new Date(
      selectedMonth.getFullYear(),
      selectedMonth.getMonth() + 1,
      1
    );

  const incomeDoc =
  await incomeModel
    .findOne({
      userId:
        req.user.id,

      month: {
        $lte:
          monthKey,
      },
    })
    .sort({
      month: -1,
    });

    const expenses = await expenseModel.find({
      userId: req.user.id,
      expenseDate: {
        $gte: startOfMonth,
        $lt: endOfMonth,
      },
    });

    const totalIncome = Number(incomeDoc?.income || 0);

    const totalExpense = expenses.reduce(
      (sum, doc) => sum + Number(doc.amount || 0),
      0
    );

    const totalSavings = totalIncome - totalExpense;

    res.status(200).json({
      message: "Savings calculated successfully",
      payload: {
        month: monthKey,
        totalIncome,
        totalExpense,
        totalSavings,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

savingsApp.post("/goal", verifyToken, async (req, res) => {
  try {
    const month = normalizeMonth(req.body.month);

    const goal = await savingsModel.findOneAndUpdate(
      {
        userId: req.user.id,
        month,
      },
      {
        $set: {
          savingsGoal: Number(req.body.savingsGoal),
          month,
        },
      },
      {
        new: true,
        upsert: true,
         runValidators: true,
      }
    );

    res.json({
      message: "Savings goal saved",
      payload: goal,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

savingsApp.get("/goal", verifyToken, async (req, res) => {
  try {
    const month = normalizeMonth(req.query.month);

    const goal = await savingsModel.findOne({
      userId: req.user.id,
      month,
    });

    res.json({
      message: "Savings goal",
      payload: goal,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

savingsApp.delete("/goal", verifyToken, async (req, res) => {
  try {
    const month = normalizeMonth(req.query.month);

    const deletedGoal = await savingsModel.findOneAndDelete({
      userId: req.user.id,
      month,
    });

    if (!deletedGoal) {
      return res.json({
        message: "Savings goal not found",
      });
    }

    res.json({
      message: "Savings goal deleted",
      payload: deletedGoal,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
