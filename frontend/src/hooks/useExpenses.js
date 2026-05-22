import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { getExpenses } from "../services";

const normalizeMonth =
  (value) => {

    if (!value) {
      return "";
    }

    return String(value).slice(
      0,
      7
    );
  };

const useExpenses = (
  selectedMonth = ""
) => {

  const [expenses,
    setExpenses,
  ] = useState([]);

  const [loading,
    setLoading,
  ] = useState(true);

  const [error,
    setError,
  ] = useState(null);

  const [refreshKey,
    setRefreshKey,
  ] = useState(0);

  const refreshExpenses =
    () => {

      setRefreshKey(
        (prev) =>
          prev + 1
      );
    };

  useEffect(() => {

    const fetchExpenses =
      async () => {

        try {

          setLoading(
            true
          );

          setError(null);

          const res =
            await getExpenses(
              selectedMonth
            );

          const data =
            Array.isArray(
              res.data
            )
              ? res.data
              : res.data
                  .payload;

          setExpenses(
            Array.isArray(
              data
            )
              ? data
              : []
          );

        } catch (err) {

          setError(
            err.response
              ?.data
              ?.message ||
              "Failed to fetch expenses"
          );

          setExpenses([]);

        } finally {

          setLoading(
            false
          );
        }
      };

    fetchExpenses();

  }, [
    selectedMonth,
    refreshKey,
  ]);

  const filteredExpenses =
    useMemo(() => {

      if (
        !selectedMonth
      ) {
        return expenses;
      }

      return expenses.filter(
        (
          expense
        ) => {

          const month =
            normalizeMonth(
              expense.expenseDate
            );

          return (
            month ===
            normalizeMonth(
              selectedMonth
            )
          );
        }
      );
    }, [
      expenses,
      selectedMonth,
    ]);

  const totalSpent =
    filteredExpenses.reduce(
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

  const byCategory =
    filteredExpenses.reduce(
      (
        acc,
        expense
      ) => {

        const category =
          String(
            expense.category ||
              "others"
          ).toLowerCase();

        acc[
          category
        ] =
          (
            acc[
              category
            ] || 0
          ) +
          Number(
            expense.amount ||
              0
          );

        return acc;
      },
      {}
    );

  return {
    expenses:
      filteredExpenses,

    allExpenses:
      expenses,

    totalSpent,

    byCategory,

    loading,

    error,

    refreshExpenses,
  };
};

export default useExpenses;