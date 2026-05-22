import exp from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { expenseModel } from "../models/ExpenseModel.js";

export const predictionApp = exp.Router();

// MONTH KEY
const getMonthKey = (
  dateValue
) => {

  const date =
    new Date(
      dateValue
    );

  return `${date.getFullYear()}-${String(
    date.getMonth() + 1
  ).padStart(2, "0")}`;
};

// NEXT MONTH KEY
const getNextMonthKey = (
  dateValue
) => {

  const current =
    dateValue
      ? new Date(
          dateValue
        )
      : new Date();

  const next =
    new Date(
      current.getFullYear(),
      current.getMonth() + 1,
      1
    );

  return getMonthKey(
    next
  );
};

// NEXT MONTH PREDICTION


predictionApp.get("/nextMonth",verifyToken,async (req,res) => {

    try {

      const selectedMonth =
        req.query.month;

      const currentMonth =
        selectedMonth
          ? String(
              selectedMonth
            ).slice(0, 7)
          : getMonthKey(
              new Date()
            );

      const expenses =
        await expenseModel
          .find({
            userId:
              req.user.id,
          })
          .sort({
            expenseDate: 1,
          });

      // INCLUDE CURRENT + PREVIOUS MONTHS
      const filteredExpenses =
        expenses.filter(
          (expense) => {

            const expenseMonth =
              getMonthKey(
                expense.expenseDate
              );

            return (
              expenseMonth <=
              currentMonth
            );
          }
        );

      // NO EXPENSES
      if (
        filteredExpenses.length ===
        0
      ) {

        return res.json({
          message:
            "Not enough expenses",

          payload: {

            nextMonth:
              getNextMonthKey(
                selectedMonth
              ),

            estimatedTotal: 0,

            categoryEstimates:
              {},

            basedOnMonths:
              [],
          },
        });
      }

      const monthlyTotals =
        {};

      const categoryMonthlyTotals =
        {};

      // GROUP EXPENSES
      for (
        const expense of filteredExpenses
      ) {

        const month =
          getMonthKey(
            expense.expenseDate
          );

        const category =
          String(
            expense.category ||
              "others"
          ).toLowerCase();

        const amount =
          Number(
            expense.amount ||
              0
          );

        monthlyTotals[
          month
        ] =
          (
            monthlyTotals[
              month
            ] || 0
          ) + amount;

        if (
          !categoryMonthlyTotals[
            category
          ]
        ) {

          categoryMonthlyTotals[
            category
          ] = {};
        }

        categoryMonthlyTotals[
          category
        ][month] =
          (
            categoryMonthlyTotals[
              category
            ][month] || 0
          ) + amount;
      }

      const months =
        Object.keys(
          monthlyTotals
        ).sort();

      // LAST 3 MONTHS
      const recentMonths =
        months.slice(-3);

      // NO VALID MONTHS
      if (
        recentMonths.length ===
        0
      ) {

        return res.json({
          message:
            "Need completed month data",

          payload: {

            nextMonth:
              getNextMonthKey(
                selectedMonth
              ),

            estimatedTotal: 0,

            categoryEstimates:
              {},

            basedOnMonths:
              [],
          },
        });
      }

      // TOTAL PREDICTION
      const estimatedTotal =
        recentMonths.reduce(
          (
            sum,
            month
          ) =>
            sum +
            monthlyTotals[
              month
            ],

          0
        ) /
        recentMonths.length;

      // CATEGORY PREDICTIONS
      const categoryEstimates =
        {};

      for (const [
        category,
        monthMap,
      ] of Object.entries(
        categoryMonthlyTotals
      )) {

        const values =
          recentMonths
            .map(
              (month) =>
                monthMap[
                  month
                ]
            )
            .filter(
              (
                value
              ) =>
                value !==
                undefined
            );

        if (
          values.length > 0
        ) {

          categoryEstimates[
            category
          ] =
            values.reduce(
              (
                sum,
                value
              ) =>
                sum +
                value,

              0
            ) /
            values.length;
        }
      }

      res.json({

        message:
          "Estimated next month spending",

        payload: {

          nextMonth:
            getNextMonthKey(
              selectedMonth
            ),

          estimatedTotal:
            Math.round(
              estimatedTotal
            ),

          categoryEstimates,

          basedOnMonths:
            recentMonths,
        },
      });

    } catch (err) {

      res.status(500).json({
        message:
          err.message,
      });
    }
  }
);