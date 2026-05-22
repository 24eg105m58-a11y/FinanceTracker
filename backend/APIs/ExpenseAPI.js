import exp from "express";
import { expenseModel } from "../models/ExpenseModel.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { incomeModel } from "../models/IncomeModel.js";

export const expenseApp = exp.Router();

// ADD EXPENSE

expenseApp.post(
  "/addExpense",
  verifyToken,
  async (req, res) => {
    try {

      const userId =
        req.user.id;

      const expenseDate =
        req.body.expenseDate
          ? new Date(
              req.body.expenseDate
            )
          : new Date();

      if (
        isNaN(
          expenseDate.getTime()
        )
      ) {
        return res
          .status(400)
          .json({
            message:
              "Invalid expense date",
          });
      }

      const newExpenseAmount =
        Number(
          req.body.amount
        );

      if (
        isNaN(
          newExpenseAmount
        ) ||
        newExpenseAmount <= 0
      ) {
        return res
          .status(400)
          .json({
            message:
              "Expense amount must be greater than 0",
          });
      }

      // MONTH FORMAT
      const expenseMonth = `${expenseDate.getFullYear()}-${String(
        expenseDate.getMonth() +
          1
      ).padStart(2, "0")}`;

      const startOfMonth =
        new Date(
          expenseDate.getFullYear(),
          expenseDate.getMonth(),
          1
        );

      const endOfMonth =
        new Date(
          expenseDate.getFullYear(),
          expenseDate.getMonth() +
            1,
          1
        );
// INCOME
const userIncome =
  await incomeModel
    .findOne({
      userId,

      month: {
        $lte:
          expenseMonth,
      },
    })
    .sort({
      month: -1,
    });

if (!userIncome) {

  return res
    .status(400)
    .json({
      message:
        "Please add income first",
    });
}

      // EXISTING EXPENSES
      const existingExpenses =
        await expenseModel.find(
          {
            userId,

            expenseDate: {
              $gte:
                startOfMonth,

              $lt:
                endOfMonth,
            },
          }
        );

      const totalExpenses =
        existingExpenses.reduce(
          (
            sum,
            expense
          ) =>
            sum +
            Number(
              expense.amount ||
                0
            ),
          0
        );

      const updatedTotalExpense =
        totalExpenses +
        newExpenseAmount;

      // DEBUG LOGS
      console.log(
        "================================"
      );

      console.log(
        "expenseMonth:",
        expenseMonth
      );

      console.log(
        "userIncome:",
        userIncome
      );

      console.log(
        "incomeValue:",
        Number(
          userIncome?.income ||
            0
        )
      );

      console.log(
        "totalExpenses:",
        totalExpenses
      );

      console.log(
        "newExpenseAmount:",
        newExpenseAmount
      );

      console.log(
        "updatedTotalExpense:",
        updatedTotalExpense
      );

      console.log(
        "comparison:",
        updatedTotalExpense >
          Number(
            userIncome?.income ||
              0
          )
      );

      console.log(
        "================================"
      );

      // BLOCK NEGATIVE SAVINGS
      if (
        updatedTotalExpense >
        Number(
          userIncome.income ||
            0
        )
      ) {
        return res
          .status(400)
          .json({
            message:
              "Expense exceeds available balance",
          });
      }

      const newExp =
        new expenseModel({
          item: String(
            req.body.item ||
              ""
          ).trim(),

          amount:
            newExpenseAmount,

          category:
            String(
              req.body.category ||
                "others"
            )
              .trim()
              .toLowerCase(),

          expenseDate,

          userId,
        });

      await newExp.save();

      res.status(201).json({
        message:
          "Expense Added",

        payload: newExp,
      });

    } catch (err) {

      res.status(500).json({
        message:
          err.message,
      });
    }
  }
);
// =========================================================
// READ EXPENSES
// =========================================================

expenseApp.get("/readExpenses", verifyToken, async (req, res) => {
  try {
    const month = req.query.month;

    const query = {
      userId: req.user.id,
    };

    if (month) {
      const selectedDate = new Date(month);

      const startOfMonth = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        1
      );

      const endOfMonth = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth() + 1,
        1
      );

      query.expenseDate = {
        $gte: startOfMonth,
        $lt: endOfMonth,
      };
    }

    const expenses = await expenseModel
      .find(query)
      .sort({ expenseDate: -1 });

    res.status(200).json({
      message: "Expenses fetched",
      payload: expenses,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});


// =========================================================
// UPDATE EXPENSE
// =========================================================

expenseApp.put("/updateExpense/:id", verifyToken, async (req, res) => {
  try {
    const amount = Number(req.body.amount);

    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({
        message: "Expense amount must be greater than 0",
      });
    }

    const expenseDate = req.body.expenseDate
      ? new Date(req.body.expenseDate)
      : new Date();

    if (isNaN(expenseDate.getTime())) {
      return res.status(400).json({
        message: "Invalid expense date",
      });
    }

    const updatedExpense = await expenseModel.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.id,
      },
      {
        $set: {
          item: String(req.body.item || "").trim(),
          amount,
          category: String(req.body.category || "others")
            .trim()
            .toLowerCase(),
          expenseDate,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedExpense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    res.status(200).json({
      message: "Expense updated",
      payload: updatedExpense,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});


// =========================================================
// DELETE EXPENSE
// =========================================================

expenseApp.delete("/deleteExpense/:id", verifyToken, async (req, res) => {
  try {
    const deletedExpense = await expenseModel.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!deletedExpense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    res.status(200).json({
      message: "Expense deleted",
      payload: deletedExpense,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});