import useExpenses from "../../hooks/useExpenses";
import useBudgets from "../../hooks/useBudgets";

import {
  glassCard,
  loadingClass,
  errorClass,
  progressTrack,
  progressBar,
  mutedText,
} from "../../styles/common";

const getBarColor = (
  percentage
) => {

  if (percentage >= 100)
    return "bg-red-500";

  if (percentage >= 75)
    return "bg-amber-400";

  return "bg-emerald-500";
};

const getTextColor = (
  percentage
) => {

  if (percentage >= 100)
    return "text-red-500";

  if (percentage >= 75)
    return "text-amber-500";

  return "text-emerald-500";
};

const BudgetCard = ({
  selectedMonth,
}) => {

  const {
    byCategory,
    loading:
      expLoading,
    error: expError,
  } = useExpenses(
    selectedMonth
  );

  const {
    budgets,
    loading:
      budLoading,
    error: budError,
  } = useBudgets(
    selectedMonth
  );

  if (
    expLoading ||
    budLoading
  ) {

    return (
      <div
        className={`${glassCard} ${loadingClass}`}
      >
        Loading budget
        data...
      </div>
    );
  }

  if (
    expError ||
    budError
  ) {

    return (
      <div className={glassCard}>

        <div className={errorClass}>
          Failed to load
          budget data
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${glassCard} bg-gradient-to-br from-white to-slate-50`}
    >

      {/* HEADER */}
      <div className="mb-5">

        <h2 className="text-2xl font-bold text-slate-800">
           Budget vs Spending
        </h2>

        <p
          className={`${mutedText} mt-1`}
        >
          Track category-wise
          spending against
          monthly budgets
        </p>
      </div>

      {/* EMPTY */}
      {budgets.length ===
      0 ? (

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-center">

          <p className="text-slate-500 text-sm">
            No budgets set
            yet for this
            month.
          </p>
        </div>

      ) : (

        <ul className="flex flex-col gap-6">

          {budgets.map(
            (budget) => {

              const category =
                budget.category.toLowerCase();

              const limit =
                budget.limit;

              const spent =
                byCategory[
                  category
                ] || 0;

              const percentage =
                Math.min(
                  (
                    (spent /
                      limit) *
                    100
                  ),
                  100
                ).toFixed(
                  0
                );

              const isOver =
                spent >
                limit;

              return (
                <li
                  key={
                    budget._id
                  }
                  className="space-y-2"
                >

                  {/* TOP */}
                  <div className="flex items-center justify-between gap-3">

                    <div>

                      <p className="text-sm font-semibold text-slate-700 capitalize">
                        {
                          category
                        }
                      </p>

                      <p className="text-xs text-slate-400 mt-1">
                        Rs.
                        {spent.toLocaleString(
                          "en-IN"
                        )}
                        {" "}
                        spent of Rs.
                        {limit.toLocaleString(
                          "en-IN"
                        )}
                      </p>
                    </div>

                    <span
                      className={`text-sm font-bold ${getTextColor(
                        Number(
                          percentage
                        )
                      )}`}
                    >
                      {
                        percentage
                      }
                      %
                    </span>
                  </div>

                  {/* BAR */}
                  <div
                    className={
                      progressTrack
                    }
                  >

                    <div
                      className={`${progressBar} ${getBarColor(
                        Number(
                          percentage
                        )
                      )}`}
                      style={{
                        width: `${percentage}%`,
                      }}
                    ></div>
                  </div>

                  {/* ALERT */}
                  {isOver && (
                    <p className="text-xs text-red-500 font-medium">
                       Over by Rs.
                      {(
                        spent -
                        limit
                      ).toLocaleString(
                        "en-IN"
                      )}
                    </p>
                  )}
                </li>
              );
            }
          )}
        </ul>
      )}
    </div>
  );
};

export default BudgetCard;