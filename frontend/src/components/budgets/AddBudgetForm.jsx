import {
  useEffect,
  useState,
} from "react";

import {
  addBudgetLimit,
  getBudgetLimits,
  deleteBudgetLimit,
} from "../../services/index";

import {
  modalOverlay,
  modalCard,
  inputClass,
  primaryBtn,
  dangerBtn,
  errorClass,
} from "../../styles/common";

const categories = [
  "food",
  "travel",
  "shopping",
  "entertainment",
  "utilities",
  "others",
];

function AddBudgetForm({
  selectedMonth,
  onSuccess,
  onClose,
}) {

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("food");

  const [
    limit,
    setLimit,
  ] = useState("");

  const [
    error,
    setError,
  ] = useState("");

  const [
    budgets,
    setBudgets,
  ] = useState([]);

  const [
    selectedBudget,
    setSelectedBudget,
  ] = useState(null);

  useEffect(() => {

    fetchBudgets();

  }, []);

  useEffect(() => {

    const existing =
      budgets.find(
        (budget) =>
          budget.category ===
          selectedCategory
      );

    setSelectedBudget(
      existing || null
    );

    setLimit(
      existing
        ? String(
            existing.limit
          )
        : ""
    );

  }, [
    selectedCategory,
    budgets,
  ]);

  const fetchBudgets =
    async () => {

      try {

        const res =
          await getBudgetLimits(
            selectedMonth
          );

        setBudgets(
          res.data.payload ||
            []
        );

      } catch (err) {

        console.error(
          err
        );
      }
    };

  const saveBudget =
    async () => {

      if (
        !limit ||
        Number(limit) <= 0
      ) {

        setError(
          "Budget limit must be greater than 0"
        );

        return;
      }

      try {

        setError("");

        await addBudgetLimit({
          category:
            selectedCategory,

          limit:
            Number(limit),

          month:
            selectedMonth,
        });

        onSuccess();

      } catch (err) {

        setError(
          err.response?.data
            ?.message ||
            "Failed to save budget"
        );
      }
    };

  const removeBudget =
    async () => {

      if (
        !selectedBudget
      ) {

        return;
      }

      try {

        setError("");

        await deleteBudgetLimit(
          selectedBudget._id
        );

        onSuccess();

      } catch (err) {

        setError(
          err.response?.data
            ?.message ||
            "Failed to remove budget"
        );
      }
    };

  return (
    <div className={modalOverlay}>

      <div className={`${modalCard} max-w-xl`}>

        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">

          <h2 className="text-2xl font-bold text-slate-800">
            Set Budget
          </h2>

          <button
            onClick={onClose}
            className="text-slate-400 text-2xl hover:scale-110 transition-transform"
          >
            ✕
          </button>
        </div>

        {/* CATEGORY */}
        <div className="mb-5">

          <label className="block text-sm font-medium text-slate-700 mb-2">
            Category
          </label>

          <select
            value={
              selectedCategory
            }
            onChange={(e) =>
              setSelectedCategory(
                e.target.value
              )
            }
            className={inputClass}
          >

            {categories.map(
              (category) => (

                <option
                  key={
                    category
                  }
                  value={
                    category
                  }
                >
                  {
                    category
                      .charAt(0)
                      .toUpperCase() +
                    category.slice(
                      1
                    )
                  }
                </option>
              )
            )}
          </select>
        </div>

        {/* LIMIT */}
        <div className="mb-3">

          <label className="block text-sm font-medium text-slate-700 mb-2">
            Budget Limit
          </label>

          <input
            type="text"
            inputMode="numeric"
            value={limit}
            onChange={(e) => {

              setLimit(
                e.target.value.replace(
                  /[^0-9]/g,
                  ""
                )
              );
            }}
            placeholder="Enter budget limit"
            className={inputClass}
          />
        </div>

        {/* ERROR */}
        {error && (

          <p
            className={`${errorClass} mb-5`}
          >
            {error}
          </p>
        )}

        {/* BUTTONS */}
        <div className="flex gap-3 mt-6">

          <button
            onClick={
              saveBudget
            }
            className={`${primaryBtn} flex-1`}
          >
            Set Budget
          </button>

          <button
            onClick={
              removeBudget
            }
            disabled={
              !selectedBudget
            }
            className={`${dangerBtn} flex-1 ${
              !selectedBudget
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            Remove Budget Limit
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddBudgetForm;