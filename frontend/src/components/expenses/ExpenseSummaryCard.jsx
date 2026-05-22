import useBudgets from "../../hooks/useBudgets";
import useExpenses from "../../hooks/useExpenses";

const ExpenseSummaryCard = ({ selectedMonth }) => {
  const {
    totalSpent,
    loading: expLoading,
    error: expError,
  } = useExpenses(selectedMonth);

  const {
    totalLimit,
    loading: budLoading,
  } = useBudgets(selectedMonth);

  if (expLoading || budLoading) {
    return (
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm animate-pulse">
        <div className="h-4 bg-slate-200 rounded w-1/2 mb-4"></div>
        <div className="h-8 bg-slate-200 rounded w-3/4"></div>
      </div>
    );
  }

  if (expError) {
    return (
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
        <p className="text-red-500 text-sm">
          Failed to load expenses
        </p>
      </div>
    );
  }

  const isOverLimit = totalSpent > totalLimit;

  const percentage = totalLimit
    ? ((totalSpent / totalLimit) * 100).toFixed(1)
    : 0;

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex items-center gap-4">
      <div className="bg-red-100 p-3 rounded-full">
        <span className="text-red-500 text-2xl">
          ₹
        </span>
      </div>

      <div>
        <p className="text-sm text-slate-500 font-medium">
          Total Expenses
        </p>

        <p className="text-3xl font-bold text-slate-800">
          ₹ {totalSpent.toLocaleString("en-IN")}
        </p>

        <p
          className={`text-sm mt-1 font-medium ${
            isOverLimit
              ? "text-red-500"
              : "text-emerald-500"
          }`}
        >
          {isOverLimit
            ? `${percentage}% of your limit, over budget`
            : `${percentage}% of your limit, within budget`}
        </p>
      </div>
    </div>
  );
};

export default ExpenseSummaryCard;