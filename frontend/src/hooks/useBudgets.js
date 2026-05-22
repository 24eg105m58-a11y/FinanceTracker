import {
  useEffect,
  useState,
} from "react";

import { getBudgets } from "../services";

const useBudgets = (
  selectedMonth = ""
) => {

  const [budgets,
    setBudgets,
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

  const refreshBudgets =
    () => {

      setRefreshKey(
        (prev) =>
          prev + 1
      );
    };

  useEffect(() => {

    const fetchBudgets =
      async () => {

        try {

          setLoading(
            true
          );

          setError(null);

          const res =
            await getBudgets(
              selectedMonth
            );

          const data =
            Array.isArray(
              res.data
            )
              ? res.data
              : res.data
                  .payload;

          setBudgets(
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
              "Failed to fetch budgets"
          );

          setBudgets([]);

        } finally {

          setLoading(
            false
          );
        }
      };

    fetchBudgets();

  }, [
    selectedMonth,
    refreshKey,
  ]);

  const totalLimit =
    budgets.reduce(
      (
        sum,
        budget
      ) =>
        sum +
        Number(
          budget.limit ||
            0
        ),
      0
    );

  const limitByCategory =
    budgets.reduce(
      (
        acc,
        budget
      ) => {

        const category =
          String(
            budget.category ||
              "others"
          ).toLowerCase();

        acc[
          category
        ] = Number(
          budget.limit ||
            0
        );

        return acc;
      },
      {}
    );

  return {
    budgets,

    totalLimit,

    limitByCategory,

    loading,

    error,

    refreshBudgets,
  };
};

export default useBudgets;