import {
  pageBackground,
  pageWrapper,
  headingClass,
  bodyText,
  inputClass,
} from "../styles/common";

import { useState } from "react";

import ExpenseDonutChart from "./expenses/ExpenseDonutChart";
import BudgetCard from "./budgets/BudgetCard";
import AlertBanner from "./alerts/AlertBanner";
import MonthlyReportCard from "./expenses/MonthlyReportCard";
import InsightsPanel from "./InsightsPanel";
import ReceiptScanner from "./expenses/ReceiptScanner";
import ExpensePredictionCard from "./expenses/ExpensePredictionCard";

import ExpensesModal from "./expenses/ExpensesModal";
import ExpenseFormModal from "./expenses/ExpenseFormModal";
import AddBudgetForm from "./budgets/AddBudgetForm";

import { exportExpenseReport } from "../services";

import {
  useMonthStore,
} from "../store/monthStore";

function Expenses() {

  const [
    refreshKey,
    setRefreshKey,
  ] = useState(0);

  const {
    selectedDate,
    setSelectedDate,
  } = useMonthStore();

  const selectedMonth =
    selectedDate.slice(0, 7);

  const [
    showExpensesModal,
    setShowExpensesModal,
  ] = useState(false);

  const [
    showExpenseForm,
    setShowExpenseForm,
  ] = useState(false);

  const [
    showBudgetForm,
    setShowBudgetForm,
  ] = useState(false);

  const refresh = () =>
    setRefreshKey(
      (key) => key + 1
    );

  const downloadCSV =
    async () => {

      try {

        const response =
          await exportExpenseReport(
            selectedMonth
          );

        const blob =
          new Blob(
            [response.data],
            {
              type: "text/csv",
            }
          );

        const url =
          window.URL.createObjectURL(
            blob
          );

        const link =
          document.createElement(
            "a"
          );

        link.href = url;

        link.download =
          `expenses-${selectedMonth}.csv`;

        document.body.appendChild(
          link
        );

        link.click();

        link.remove();

      } catch (err) {

        console.error(
          "CSV download failed",
          err
        );
      }
    };

  return (
    <div className={pageBackground}>

      <div className={pageWrapper}>

        {/* HEADER */}
        <div className="mb-5">

          <h1 className={headingClass}>
            Expenses
          </h1>

          <p
            className={`${bodyText} mt-1 mb-4`}
          >
            Track your spending,
            budgets, and monthly
            expense insights
          </p>

          {/* ACTION ROW */}
          <div className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-4">

            {/* DATE */}
            <div>

              <label className="block text-xs font-medium text-slate-500 mb-1">
                Select Date
              </label>

              <input
                type="date"
                value={
                  selectedDate
                }
                onChange={(
                  event
                ) =>
                  setSelectedDate(
                    event.target
                      .value
                  )
                }
                className={`${inputClass} max-w-[220px]`}
              />
            </div>

            {/* BUTTONS */}
            <div className="flex flex-wrap gap-3 xl:justify-end">

              <button
                onClick={() => {

                  setShowExpenseForm(
                    false
                  );

                  setShowBudgetForm(
                    false
                  );

                  setShowExpensesModal(
                    true
                  );
                }}
                className="bg-gradient-to-r from-sky-500 to-cyan-500 hover:scale-[1.02] text-white font-semibold px-5 py-3 rounded-2xl transition-transform shadow-sm"
              >
                All Expenses
              </button>

              <button
                onClick={() => {

                  setShowExpensesModal(
                    false
                  );

                  setShowBudgetForm(
                    false
                  );

                  setShowExpenseForm(
                    true
                  );
                }}
                className="bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:scale-[1.02] text-white font-semibold px-5 py-3 rounded-2xl transition-transform shadow-sm"
              >
                Add Expense
              </button>

              <button
                onClick={() => {

                  setShowExpensesModal(
                    false
                  );

                  setShowExpenseForm(
                    false
                  );

                  setShowBudgetForm(
                    true
                  );
                }}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:scale-[1.02] text-white font-semibold px-5 py-3 rounded-2xl transition-transform shadow-sm"
              >
                Set Budget
              </button>

              <button
                onClick={
                  downloadCSV
                }
                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:scale-[1.02] text-white font-semibold px-5 py-3 rounded-2xl transition-transform shadow-sm"
              >
                Download CSV
              </button>
            </div>
          </div>
        </div>

        {/* MONTHLY REPORT */}
        <div className="mb-4">

          <MonthlyReportCard
            key={`monthly-${refreshKey}-${selectedMonth}`}
            selectedMonth={
              selectedMonth
            }
          />
        </div>

        {/* ALERTS */}
        <div className="mb-6">

          <AlertBanner
            key={`alert-${refreshKey}-${selectedMonth}`}
            selectedMonth={
              selectedMonth
            }
          />
        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">

          <ExpenseDonutChart
            key={`chart-${refreshKey}-${selectedMonth}`}
            selectedMonth={
              selectedMonth
            }
          />

          <BudgetCard
            key={`budget-${refreshKey}-${selectedMonth}`}
            selectedMonth={
              selectedMonth
            }
          />
        </div>

        {/* RECEIPT + AI */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6 items-stretch">

          <ReceiptScanner
            onSuccess={
              refresh
            }
          />
<ExpensePredictionCard
  key={`prediction-${refreshKey}-${selectedMonth}`}
  selectedMonth={
    selectedMonth
  }
/>
        </div>

        {/* INSIGHTS */}
        <InsightsPanel
          key={`insights-${refreshKey}-${selectedMonth}`}
          selectedMonth={
            selectedMonth
          }
        />

        {/* ALL EXPENSES MODAL */}
        {showExpensesModal && (

          <ExpensesModal
            selectedMonth={
              selectedMonth
            }
            onRefresh={
              refresh
            }
            onClose={() =>
              setShowExpensesModal(
                false
              )
            }
          />
        )}

        {/* ADD EXPENSE MODAL */}
        {showExpenseForm && (

          <ExpenseFormModal
            selectedMonth={
              selectedMonth
            }
            onClose={() =>
              setShowExpenseForm(
                false
              )
            }
            onSaved={() => {

              refresh();

              setShowExpenseForm(
                false
              );
            }}
          />
        )}
        
        {showBudgetForm && (

          <AddBudgetForm
            selectedMonth={
              selectedMonth
            }
            onSuccess={() => {

              refresh();

              setShowBudgetForm(
                false
              );
            }}
            onClose={() =>
              setShowBudgetForm(
                false
              )
            }
          />
        )}
      </div>
    </div>
  );
}

export default Expenses;