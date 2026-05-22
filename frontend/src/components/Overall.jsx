import { useEffect, useState } from "react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

import {
  pageBackground,
  pageWrapper,
  headingClass,
  bodyText,
  glassCard,
  primaryBtn,
  inputClass,
  subHeadingClass,
} from "../styles/common";

import { useAuth } from "../store/authStore";

import api from "../services/api";

import IncomeDetailsPopup from "./IncomeDetailsPopup";
import IncomePopup from "./IncomePopup";
import AlertPanel from "./AlertPanel";

import {
  useMonthStore,
} from "../store/monthStore";

function Overall() {

  const {
    isNewUser,
  } = useAuth(
    (state) => state
  );

  const {
    selectedDate,
    setSelectedDate,
  } = useMonthStore();

  const selectedMonth =
    selectedDate.slice(0, 7);

  const [
    showIncomeDetails,
    setShowIncomeDetails,
  ] = useState(false);

  const [income, setIncome] =
    useState(null);

  const [
    expenses,
    setExpenses,
  ] = useState([]);

  const [
    budgetAlert,
    setBudgetAlert,
  ] = useState(null);

  const [
    savingsAlert,
    setSavingsAlert,
  ] = useState(null);

  const [
    showIncomePopup,
    setShowIncomePopup,
  ] = useState(false);

  const [loading, setLoading] =
    useState(true);

  const fetchOverallData =
    async () => {

      try {

        setLoading(true);

        const [
          incomeRes,
          expenseRes,
          budgetAlertRes,
          savingsAlertRes,
        ] = await Promise.all([

          api.get(
            "/income-api/readIncome",
            {
              params: {
                month:
                  selectedMonth,
              },
            }
          ),

          api.get(
            "/expense-api/readExpenses",
            {
              params: {
                month:
                  selectedMonth,
              },
            }
          ),

          api.get(
            "/alert-api/budgetAlert",
            {
              params: {
                month:
                  selectedMonth,
              },
            }
          ),

          api.get(
            "/alert-api/savingsAlert",
            {
              params: {
                month:
                  selectedMonth,
              },
            }
          ),
        ]);

        setIncome(
          incomeRes.data.payload
        );

        setExpenses(
          expenseRes.data.payload ||
            []
        );

        setBudgetAlert(
          budgetAlertRes.data
        );

        setSavingsAlert(
          savingsAlertRes.data
        );

        if (
          isNewUser ||
          !incomeRes.data.payload
        ) {

          setShowIncomePopup(
            true
          );
        }

      } catch (err) {

        console.error(
          "Overall dashboard fetch failed:",
          err
        );

      } finally {

        setLoading(false);
      }
    };

  useEffect(() => {

    fetchOverallData();

  }, [selectedDate]);

  const totalIncome =
    Number(
      income?.income || 0
    );

  const totalExpense =
    expenses.reduce(
      (sum, expense) =>
        sum +
        Number(
          expense.amount || 0
        ),
      0
    );

  const totalSavings =
    totalIncome -
    totalExpense;

  const chartData =
    buildCategoryChartData(
      expenses,
      totalIncome
    );

  if (loading) {

    return (
      <div
        className={`${pageBackground} flex items-center justify-center`}
      >

        <p className="text-cyan-600 text-lg animate-pulse">
          Loading dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className={pageBackground}>

      <div className={pageWrapper}>

        {showIncomePopup && (

          <IncomePopup
            onClose={() =>
              setShowIncomePopup(
                false
              )
            }
            onIncomeAdded={(
              newIncome
            ) =>
              setIncome(
                newIncome
              )
            }
          />
        )}

        {showIncomeDetails && (

          <IncomeDetailsPopup
            income={income}
            selectedMonth={
              selectedMonth
            }
            onClose={() =>
              setShowIncomeDetails(
                false
              )
            }
            onIncomeUpdated={(
              updatedIncome
            ) =>
              setIncome(
                updatedIncome
              )
            }
          />
        )}

        {/* TOP BAR */}
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5 mb-8">

          {/* LEFT */}
          <div>

            <h1 className={headingClass}>
              Financial Dashboard
            </h1>

            <p
              className={`${bodyText} mt-2`}
            >
              Track your monthly
              income, expenses,
              and savings insights
            </p>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">

            <div>

              <label className="block text-xs font-medium text-slate-500 mb-1">
                Select Date
              </label>

              <input
                type="date"
                value={
                  selectedDate
                }
                onChange={(e) =>
                  setSelectedDate(
                    e.target.value
                  )
                }
                className={`${inputClass} min-w-[200px]`}
              />
            </div>

            <button
              type="button"
              onClick={() =>
                setShowIncomeDetails(
                  true
                )
              }
              className={`${primaryBtn} h-[48px] px-5`}
            >
              Manage Income
            </button>
          </div>
        </div>

        {/* SUMMARY */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

          {/* INCOME */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300">

            <div className="flex items-center justify-between mb-4">

              <div>

                <p className="text-sm font-medium text-slate-500 mb-2">
                  Income
                </p>

                <h2 className="text-4xl font-bold text-cyan-600">
                  ₹
                  {totalIncome.toLocaleString()}
                </h2>
              </div>
            </div>

            <p className="text-xs text-slate-400">
              Total monthly earnings
            </p>
          </div>

          {/* EXPENSES */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300">

            <div className="flex items-center justify-between mb-4">

              <div>

                <p className="text-sm font-medium text-slate-500 mb-2">
                  Expenses
                </p>

                <h2 className="text-4xl font-bold text-red-500">
                  ₹
                  {totalExpense.toLocaleString()}
                </h2>
              </div>
            </div>

            <p className="text-xs text-slate-400">
              Current month spending
            </p>
          </div>

          {/* SAVINGS */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300">

            <div className="flex items-center justify-between mb-4">

              <div>

                <p className="text-sm font-medium text-slate-500 mb-2">
                  Savings
                </p>

                <h2
                  className={`text-4xl font-bold ${
                    totalSavings >= 0
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  ₹
                  {totalSavings.toLocaleString()}
                </h2>
              </div>
            </div>

            <p className="text-xs text-slate-400">
              Remaining monthly balance
            </p>
          </div>
        </div>

        {/* GRAPH */}
        <div
          className={`${glassCard} bg-gradient-to-br from-white to-slate-50 border border-slate-200 shadow-[0_8px_30px_rgba(0,0,0,0.04)] h-[430px] mb-6`}
        >

          <div className="flex items-center justify-between mb-6">

            <div>

              <h2
                className={
                  subHeadingClass
                }
              >
                Spending Overview
              </h2>

              <p className="text-sm text-slate-400 mt-1">
                Category-wise
                expense &
                savings analysis
              </p>
            </div>

            <div className="bg-slate-100 text-slate-500 text-xs px-3 py-1 rounded-full">
              Monthly Analytics
            </div>
          </div>

          <ResponsiveContainer
            width="100%"
            height="85%"
          >

            <BarChart
              data={chartData}
              barGap={12}
            >

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e2e8f0"
                vertical={false}
              />

              <XAxis
                dataKey="category"
                tick={{
                  fill:
                    "#64748b",
                  fontSize: 12,
                }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tick={{
                  fill:
                    "#64748b",
                  fontSize: 12,
                }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                contentStyle={{
                  borderRadius:
                    "16px",
                  border:
                    "1px solid #e2e8f0",
                  boxShadow:
                    "0 8px 24px rgba(0,0,0,0.08)",
                }}
              />

              <Legend />

              <Bar
                dataKey="expenses"
                fill="#dc2626"
                name="Expenses"
                radius={[
                  10,
                  10,
                  0,
                  0,
                ]}
              />

              <Bar
                dataKey="savings"
                fill="#16a34a"
                name="Savings"
                radius={[
                  10,
                  10,
                  0,
                  0,
                ]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* ALERTS */}
        <div
          className={`${glassCard} border border-slate-200 shadow-[0_8px_30px_rgba(0,0,0,0.04)]`}
        >

          <div className="flex items-center justify-between mb-5">

            <div>

              <h2
                className={
                  subHeadingClass
                }
              >
                Alerts
              </h2>

              <p className="text-sm text-slate-400 mt-1">
                Budget and
                savings status
              </p>
            </div>
          </div>

          <AlertPanel
            budgetAlert={
              budgetAlert
            }
            savingsAlert={
              savingsAlert
            }
          />
        </div>
      </div>
    </div>
  );
}

function buildCategoryChartData(
  expenses,
  income
) {

  const categories = [
    "food",
    "travel",
    "entertainment",
    "shopping",
    "utilities",
    "others",
  ];

  const grouped =
    categories.reduce(
      (
        acc,
        category
      ) => {

        acc[category] = 0;

        return acc;
      },
      {}
    );

  expenses.forEach(
    (expense) => {

      const category =
        String(
          expense.category ||
            "others"
        ).toLowerCase();

      const finalCategory =
        grouped[
          category
        ] !== undefined
          ? category
          : "others";

      grouped[
        finalCategory
      ] += Number(
        expense.amount || 0
      );
    }
  );

  return categories.map(
    (category) => ({
      category:
        category.charAt(0).toUpperCase() +
        category.slice(1),

      expenses:
        grouped[
          category
        ],

      savings: Math.max(
        Number(
          income || 0
        ) -
          grouped[
            category
          ],
        0
      ),
    })
  );
}

export default Overall;