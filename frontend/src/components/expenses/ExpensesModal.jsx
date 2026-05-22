import {
  useEffect,
  useState,
} from "react";

import api from "../../services/api";

import useExpenses from "../../hooks/useExpenses";

import ExpenseFormModal from "./ExpenseFormModal";

import {
  modalOverlay,
  modalCard,
  primaryBtn,
  dangerBtn,
  emptyStateClass,
  expenseItemCard,
  expenseItemActions,
  expenseItemInfo,
  scrollArea,
} from "../../styles/common";

function ExpensesModal({
  selectedMonth,
  onClose,
    onRefresh,
}) {

  const {
    expenses,
    refreshExpenses,
    totalSpent,
  } = useExpenses(
    selectedMonth
  );

  const [editingExpense,
    setEditingExpense,
  ] = useState(null);

  const [localExpenses,
    setLocalExpenses,
  ] = useState([]);

  useEffect(() => {

    setLocalExpenses(
      expenses
    );

  }, [expenses]);

  const deleteExpense =
    async (id) => {

      try {

        await api.delete(
          `/expense-api/deleteExpense/${id}`
        );

        setLocalExpenses(
          (prev) =>
            prev.filter(
              (expense) =>
                expense._id !==
                id
            )
        );

        refreshExpenses?.();
        onRefresh?.();

      } catch (err) {

        console.error(
          "Delete failed",
          err
        );
      }
    };

  return (
    <>
      {/* MAIN MODAL */}
      <div className={modalOverlay}>

        <div
          className={`${modalCard} max-w-4xl h-[85vh] flex flex-col overflow-hidden`}
        >

          {/* HEADER */}
          <div className="flex items-center justify-between pb-5 border-b border-slate-200">

            <div>

              <h2 className="text-2xl font-bold text-slate-800">
                 All Expenses
              </h2>

              <p className="text-sm text-slate-400 mt-1">
                {selectedMonth}
              </p>
            </div>

            <button
              onClick={
                onClose
              }
              className="text-slate-400 text-2xl hover:scale-110 transition-transform"
            >
              ✕
            </button>
          </div>

          {/* LIST */}
          <div
            className={`${scrollArea} flex-1 pt-5`}
          >

            {localExpenses.length ===
            0 ? (

              <div
                className={
                  emptyStateClass
                }
              >
                No expenses
                found for this
                month.
              </div>

            ) : (

              <div className="space-y-4">

                {localExpenses.map(
                  (
                    expense
                  ) => (

                    <div
                      key={
                        expense._id
                      }
                      className={
                        expenseItemCard
                      }
                    >

                      {/* INFO */}
                      <div
                        className={
                          expenseItemInfo
                        }
                      >

                        <h3 className="text-lg font-semibold text-slate-800">
                          {
                            expense.item
                          }
                        </h3>

                        <p className="text-sm text-slate-500 capitalize">
                          {
                            expense.category
                          }
                        </p>

                        <p className="text-xs text-slate-400">
                          {new Date(
                            expense.expenseDate
                          ).toLocaleDateString(
                            "en-IN"
                          )}
                        </p>
                      </div>

                      {/* ACTIONS */}
                      <div className="flex flex-col items-end gap-4">

                        <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                          ₹
                          {Number(
                            expense.amount
                          ).toLocaleString(
                            "en-IN"
                          )}
                        </h2>

                        <div
                          className={
                            expenseItemActions
                          }
                        >

                          <button
                            onClick={() =>
                              setEditingExpense(
                                expense
                              )
                            }
                            className={
                              primaryBtn
                            }
                          >
                            Edit
                          </button>

                          <button
                            onClick={() =>
                              deleteExpense(
                                expense._id
                              )
                            }
                            className={
                              dangerBtn
                            }
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* EDIT MODAL */}
      {editingExpense && (
        <div className={modalOverlay}>

          <div
            className={`${modalCard} max-w-xl`}
          >

            <div className="flex items-center justify-between pb-5 border-b border-slate-200">

              <h2 className="text-2xl font-bold text-slate-800">
                Edit Expense
              </h2>

              <button
                onClick={() =>
                  setEditingExpense(
                    null
                  )
                }
                className="text-slate-400 text-2xl hover:scale-110 transition-transform"
              >
                ✕
              </button>
            </div>

            <div className="pt-6">

              <ExpenseFormModal
                expense={
                  editingExpense
                }
                selectedMonth={
                  selectedMonth
                }
                totalExpenses={
                  totalSpent
                }
                onClose={() =>
                  setEditingExpense(
                    null
                  )
                }
                onSaved={() => {

                  setEditingExpense(
                    null
                  );

                  refreshExpenses?.();
                  onRefresh?.();
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ExpensesModal;