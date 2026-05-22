import exp from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { expenseModel } from "../models/ExpenseModel.js";
import { BudgetModel } from "../models/BudgetModel.js";
import { savingsModel } from "../models/SavingsModel.js";
import { incomeModel } from "../models/IncomeModel.js";

//Budget Alerts

export const totalApp = exp.Router();

const sameCategory = (left, right) => {
  return String(left || "").toLowerCase() === String(right || "").toLowerCase();
};
totalApp.get("/budgetAlert", verifyToken, async (req, res) => {
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

    const budgets = await BudgetModel.find({
      userId: req.user.id,
      month: startOfMonth,
    });

    const alerts = [];

    for (const budget of budgets) {
      const totalSpent = expenses
        .filter((expense) =>
          sameCategory(expense.category, budget.category)
        )
        .reduce(
          (acc, expense) => acc + Number(expense.amount || 0),
          0
        );

      if (totalSpent > Number(budget.limit || 0)) {
        alerts.push({
          category: budget.category,
          limit: Number(budget.limit || 0),
          spent: totalSpent,
          exceeded: totalSpent - Number(budget.limit || 0),
        });
      }
    }

    res.json({
      message:
        alerts.length > 0
          ? "Budget exceeded"
          : "All budgets are under control",
      alerts,


  hasBudgets:
    budgets.length > 0,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

totalApp.get("/savingsAlert", verifyToken , async (req, res) => {
  try {
    const month = req.query.month;

    const currentDate = month ? new Date(month) : new Date();

    const monthKey = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}`;

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

    const income =
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

    const goal = await savingsModel.findOne({
      userId: req.user.id,
      month: monthKey,
    });

    const totalIncome = Number(income?.income || 0);

    const totalExpense = expenses.reduce(
      (sum, doc) => sum + Number(doc.amount || 0),
      0
    );

    const savings = totalIncome - totalExpense;

    if (goal && savings < Number(goal.savingsGoal || 0)) {
      return res.json({
        message: "Savings goal violated",
        savings,
        goal: goal.savingsGoal,
      });
    }

    res.json({
      message: "Savings goal is safe",
      savings,
      goal: goal?.savingsGoal || 0,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});