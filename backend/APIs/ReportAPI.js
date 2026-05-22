import exp from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { expenseModel } from "../models/ExpenseModel.js";
import { BudgetModel } from "../models/BudgetModel.js";

export const reportApp = exp.Router();

const csvEscape = (value) => {
  const text = String(value ?? "");
  return `"${text.replace(/"/g, '""')}"`;
};

const getMonthRange = (month) => {
  if (!month) return null;

  const [year, monthNumber] = month.split("-").map(Number);
  const start = new Date(year, monthNumber - 1, 1);
  const end = new Date(year, monthNumber, 1);

  return { start, end };
};

reportApp.get("/export", verifyToken, async (req, res) => {
  try {
    const { month } = req.query;
    const range = getMonthRange(month);

    const query = { userId: req.user.id };

    if (range) {
      query.expenseDate = {
        $gte: range.start,
        $lt: range.end,
      };
    }

    const expenses = await expenseModel.find(query).sort({ expenseDate: 1 });
   const budgetQuery = { userId: req.user.id };

if (range) {
  budgetQuery.month = {
    $gte: range.start,
    $lt: range.end,
  };
}

const budgets = await BudgetModel.find(budgetQuery);


    const totalExpense = expenses.reduce(
      (sum, expense) => sum + Number(expense.amount || 0),
      0
    );

    const totalBudget = budgets.reduce(
      (sum, budget) => sum + Number(budget.limit || 0),
      0
    );

    const rows = [
      ["Expense Report"],
      ["Month", month || "All"],
      ["Total Expense", totalExpense],
      ["Total Budget", totalBudget],
      [],
      ["Date", "Item", "Category", "Amount"],
      ...expenses.map((expense) => [
       ` ${new Date(expense.expenseDate)
  .toISOString()
  .slice(0, 10)}`,
      expense.title || expense.item || "",
        expense.category,
        expense.amount,
      ]),
    ];

    const csv = rows
      .map((row) => row.map(csvEscape).join(","))
      .join("\n");

    const fileName = `expense-report-${month || "all"}.csv`;

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
    res.send(csv);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
