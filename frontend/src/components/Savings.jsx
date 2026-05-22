import { useEffect, useState } from "react";
import api from "../services/api";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import SavingsGoalModal from "./SavingsGoalModal";

import {
  pageBackground,
  pageWrapper,
  headingClass,
  bodyText,
  glassCard,
  statCard,
  statLabel,
  statValue,
  primaryBtn,
  inputClass,
  alertDanger,
  alertSuccess,
} from "../styles/common";

import { useMonthStore } from "../store/monthStore";

function Savings() {

  const [chartData, setChartData] =
    useState([]);

  const {
    selectedDate,
    setSelectedDate,
  } = useMonthStore();

  const [
    selectedSavings,
    setSelectedSavings,
  ] = useState(null);

  const [goal, setGoal] =
    useState(null);

  const [
    savingsAlert,
    setSavingsAlert,
  ] = useState(null);

  const [
    showGoalModal,
    setShowGoalModal,
  ] = useState(false);

  const [loading, setLoading] =
    useState(true);

  const fetchSavingsData =
    async () => {

      try {

        setLoading(true);

        const year =
          new Date(
            selectedDate
          ).getFullYear();

        const months =
          getYearMonths(year);

        const monthlyResponses =
          await Promise.all(
            months.map(
              (month) =>
                api.get(
                  "/saving-api/get-savings",
                  {
                    params: {
                      month:
                        month.value,
                    },
                  }
                )
            )
          );

        const monthlyData =
          monthlyResponses.map(
            (
              res,
              index
            ) => ({
              month:
                months[index]
                  .label,

              totalSavings:
                res.data.payload
                  ?.totalSavings ||
                0,
            })
          );

        setChartData(
          monthlyData
        );

        const selectedMonth =
          selectedDate.slice(
            0,
            7
          );

        const selectedSavingsRes =
          await api.get(
            "/saving-api/get-savings",
            {
              params: {
                month:
                  selectedMonth,
              },
            }
          );

        const goalRes =
          await api.get(
            "/saving-api/goal",
            {
              params: {
                month:
                  selectedMonth,
              },
            }
          );

        const alertRes =
          await api.get(
            "/alert-api/savingsAlert",
            {
              params: {
                month:
                  selectedMonth,
              },
            }
          );

        setSelectedSavings(
          selectedSavingsRes
            .data.payload
        );

        setGoal(
          goalRes.data.payload
        );

        setSavingsAlert(
          alertRes.data
        );

      } catch (err) {

        console.error(
          "Fetching savings failed:",
          err
        );

      } finally {

        setLoading(false);
      }
    };

  useEffect(() => {

    fetchSavingsData();

  }, [selectedDate]);

  const totalIncome =
    Number(
      selectedSavings
        ?.totalIncome || 0
    );

  const totalExpense =
    Number(
      selectedSavings
        ?.totalExpense || 0
    );

  const totalSavings =
    Number(
      selectedSavings
        ?.totalSavings || 0
    );

  if (loading) {

    return (
      <div
        className={`${pageBackground} flex items-center justify-center`}
      >

        <p className="text-cyan-600 text-lg animate-pulse">
          Loading savings...
        </p>
      </div>
    );
  }

  return (
    <div className={pageBackground}>

      <div
        className={`${pageWrapper} space-y-8`}
      >

        {showGoalModal && (

          <SavingsGoalModal
            selectedMonth={
              selectedDate.slice(
                0,
                7
              )
            }
            goal={goal}
            onClose={() =>
              setShowGoalModal(
                false
              )
            }
            onGoalChanged={
              fetchSavingsData
            }
          />
        )}

        {/* TOP BAR */}
        <div className="mb-8">

          <div className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-5">

            {/* LEFT */}
            <div>

              <h1
                className={
                  headingClass
                }
              >
                Savings Overview
              </h1>

              <p
                className={`${bodyText} mt-2`}
              >
                Track your
                monthly income,
                expenses, and
                savings insights
              </p>
            </div>

            {/* RIGHT */}
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">

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
                    e
                  ) =>
                    setSelectedDate(
                      e.target
                        .value
                    )
                  }
                  className={`${inputClass} min-w-[200px]`}
                />
              </div>

              {/* BUTTON */}
              <button
                type="button"
                onClick={() =>
                  setShowGoalModal(
                    true
                  )
                }
                className={`${primaryBtn} h-[48px] px-5`}
              >
                Savings Goal
              </button>
            </div>
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
              Total monthly
              earnings
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
              Current month
              spending
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
                    totalSavings >=
                    0
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
              Remaining monthly
              balance
            </p>
          </div>
        </div>

        {/* CHART */}
        <div className={glassCard}>

          <h2 className="text-xl font-semibold text-slate-800 mb-5">
            Savings Trend
          </h2>

          <div className="w-full h-80">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <LineChart
                data={chartData}
              >

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="month" />

                <YAxis />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="totalSavings"
                  stroke="#22c55e"
                  strokeWidth={3}
                  name="Savings"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ALERT */}
        {savingsAlert && (

          <div
            className={
              savingsAlert.message?.includes(
                "violated"
              )
                ? alertDanger
                : alertSuccess
            }
          >

            <p className="font-semibold">
              {
                savingsAlert.message
              }
            </p>

            <p className="text-sm mt-1">
              Savings: Rs.
              {" "}
              {
                savingsAlert.savings ||
                0
              }

              {" | "}

              Goal: Rs.
              {" "}
              {
                savingsAlert.goal ||
                0
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function SummaryCard({
  title,
  value,
  color,
}) {

  return (
    <div className={statCard}>

      <p className={statLabel}>
        {title}
      </p>

      <p
        className={`${statValue} ${color}`}
      >
        Rs.
        {Number(
          value || 0
        ).toLocaleString()}
      </p>
    </div>
  );
}

function getYearMonths(
  year
) {

  return Array.from(
    { length: 12 },
    (_, index) => {

      const month =
        String(
          index + 1
        ).padStart(
          2,
          "0"
        );

      const date =
        new Date(
          year,
          index,
          1
        );

      return {
        value:
          `${year}-${month}`,

        label:
          date.toLocaleString(
            "default",
            {
              month: "short",
            }
          ),
      };
    }
  );
}

export default Savings;