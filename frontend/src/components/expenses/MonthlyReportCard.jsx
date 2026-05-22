import useBudgets from "../../hooks/useBudgets";
import useExpenses from "../../hooks/useExpenses";

import {
  glassCard,
  errorClass,
  mutedText,
  loadingClass,
} from "../../styles/common";

const formatMonth = (
  monthValue
) => {

  const [year, month] =
    monthValue.split("-");

  const date =
    new Date(
      Number(year),
      Number(month) - 1,
      1
    );

  return date.toLocaleDateString(
    "en-IN",
    {
      month: "long",
      year: "numeric",
    }
  );
};

const MonthlyReportCard = ({
  selectedMonth,
}) => {

  const {
    expenses,
    totalSpent,
    byCategory,
    loading,
    error,
  } = useExpenses(
    selectedMonth
  );

  const {
    loading:
      budgetLoading,
  } = useBudgets(
    selectedMonth
  );

  if (
    loading ||
    budgetLoading
  ) {

    return (
      <div
        className={`${glassCard} ${loadingClass}`}
      >
        Loading monthly
        report...
      </div>
    );
  }

  if (error) {

    return (
      <div className={glassCard}>

        <div className={errorClass}>
          Failed to load
          monthly report
        </div>
      </div>
    );
  }

  const categories =
    Object.entries(
      byCategory
    ).sort(
      (a, b) =>
        b[1] - a[1]
    );

  const topCategory =
    categories[0];

  return (
    <div
      className={`${glassCard} bg-gradient-to-br from-white to-slate-50`}
    >

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

        {/* LEFT */}
        <div>

          <div className="mb-5">

            <h2 className="text-2xl font-bold text-slate-800">
               Monthly Report
            </h2>

            <p
              className={`${mutedText} mt-1`}
            >
              {formatMonth(
                selectedMonth
              )}
            </p>
          </div>

          <div>

            {/* TOTAL SPENT */}
            <div>

              <p className="text-sm text-slate-500 mb-2">
                Total Expenses
              </p>

              <h1 className="text-4xl font-bold text-red-500">
                ₹
                {totalSpent.toLocaleString(
                  "en-IN"
                )}
              </h1>
            </div>

            {/* TOP CATEGORY */}
            {topCategory && (
              <div className="mt-5">

                <p className="text-sm text-slate-500 mb-1">
                  Highest Spending
                </p>

                <p className="font-semibold capitalize text-lg text-slate-800">
                  {topCategory[0]}
                </p>

                <p className="text-sm text-red-500 mt-1">
                  Over by ₹
                  {Number(
                    topCategory[1]
                  ).toLocaleString(
                    "en-IN"
                  )}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT */}
        <div className="min-w-[220px] flex items-center">

          {expenses.length === 0 ? (

            <p className="text-slate-500 text-sm leading-relaxed">
              No expenses recorded for this month.
            </p>

          ) : (

            <div className="space-y-3">

            </div>
          )}
        </div>
      </div>

      {/* CATEGORY TAGS */}
      {categories.length >
        0 && (
        <div className="flex flex-wrap gap-2 mt-6">

          {categories.map(
            ([
              category,
              amount,
            ]) => (
              <span
                key={
                  category
                }
                className="bg-slate-100 text-slate-600 text-xs px-3 py-2 rounded-full capitalize"
              >
                {category}
                : ₹
                {Number(
                  amount
                ).toLocaleString(
                  "en-IN"
                )}
              </span>
            )
          )}
        </div>
      )}
    </div>
  );
}
export default MonthlyReportCard;