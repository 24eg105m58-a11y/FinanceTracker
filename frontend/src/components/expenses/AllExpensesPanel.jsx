import { useState } from "react";
import useExpenses from "../../hooks/useExpenses";
import { deleteExpense } from "../../services";

import EditExpenseModal from "./EditExpenseModal";

import {
  cardClass,
  sectionTitle,
  dangerBtn,
  editBtn,
  tagClass,
  listCard,
  bodyText,
} from "../../styles/common";

function AllExpensesPanel({
  selectedMonth,
  refresh,
}) {
  const {
    expenses,
    loading,
    error,
  } = useExpenses(selectedMonth);

  const [editingExpense, setEditingExpense] =
    useState(null);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this expense?"
    );

    if (!confirmDelete) return;

    try {
      await deleteExpense(id);
      refresh?.();
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Delete failed"
      );
    }
  };

  if (loading) {
    return (
      <div className={cardClass}>
        Loading expenses...
      </div>
    );
  }

  if (error) {
    return (
      <div className={cardClass}>
        <p className="text-red-500">
          Failed to load expenses
        </p>
      </div>
    );
  }

  return (
    <>
      <div className={cardClass}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className={sectionTitle}>
              All Expenses
            </h2>

            <p className={`${bodyText} mt-1`}>
              Month wise expense history
            </p>
          </div>

          <span className={tagClass}>
            {expenses.length} entries
          </span>
        </div>

        {expenses.length === 0 ? (
          <p className="text-slate-400 text-sm">
            No expenses found for this month.
          </p>
        ) : (
          <div className="space-y-4">
            {expenses.map((expense) => (
              <div
                key={expense._id}
                className={listCard}
              >
                <div>
                  <h3 className="font-semibold text-slate-800 text-lg">
                    {expense.item || "Expense"}
                  </h3>

                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className={tagClass}>
                      ₹
                      {Number(
                        expense.amount || 0
                      ).toLocaleString("en-IN")}
                    </span>

                    <span
                      className={`${tagClass} capitalize`}
                    >
                      {expense.category}
                    </span>

                    <span className={tagClass}>
                      {new Date(
                        expense.expenseDate
                      ).toLocaleDateString(
                        "en-IN"
                      )}
                    </span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() =>
                      setEditingExpense(
                        expense
                      )
                    }
                    className={editBtn}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(
                        expense._id
                      )
                    }
                    className={dangerBtn}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {editingExpense && (
        <EditExpenseModal
          expense={editingExpense}
          onClose={() =>
            setEditingExpense(null)
          }
          onUpdated={refresh}
        />
      )}
    </>
  );
}

export default AllExpensesPanel;