import {
  Chart as ChartJS,
  ArcElement,
  Legend,
  Tooltip,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

import useExpenses from "../../hooks/useExpenses";

import {
  glassCard,
  loadingClass,
  errorClass,
  mutedText,
} from "../../styles/common";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const CATEGORY_COLORS = {
  food: "#06b6d4",
  travel: "#8b5cf6",
  shopping: "#f59e0b",
  utilities: "#10b981",
  entertainment: "#ef4444",
  others: "#64748b",
};

const DEFAULT_COLOR =
  "#cbd5e1";

const ExpenseDonutChart = ({
  selectedMonth,
}) => {

  const {
    byCategory,
    totalSpent,
    loading,
    error,
  } = useExpenses(
    selectedMonth
  );

  if (loading) {

    return (
      <div
        className={`${glassCard} ${loadingClass}`}
      >
        Loading expense
        chart...
      </div>
    );
  }

  if (error) {

    return (
      <div className={glassCard}>

        <div className={errorClass}>
          Failed to load
          chart data
        </div>
      </div>
    );
  }

  const safeCategoryData =
    Object.entries(
      byCategory || {}
    ).filter(
      ([, amount]) =>
        Number(amount) >
        0
    );

  const categories =
    safeCategoryData.map(
      ([category]) =>
        category
    );

  const amounts =
    safeCategoryData.map(
      ([, amount]) =>
        Number(amount)
    );

  const colors =
    categories.map(
      (category) =>
        CATEGORY_COLORS[
          category
        ] ||
        DEFAULT_COLOR
    );

  const hasData =
    amounts.length > 0;

  const chartData = {
    labels:
      categories.map(
        (category) =>
          category
            .charAt(0)
            .toUpperCase() +
          category.slice(
            1
          )
      ),

    datasets: [
      {
        data: hasData
          ? amounts
          : [1],

        backgroundColor:
          hasData
            ? colors
            : [
                "#e2e8f0",
              ],

        borderWidth: 2,

        borderColor:
          "#ffffff",

        hoverOffset: 6,
      },
    ],
  };

  const options = {
    cutout: "72%",

    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        callbacks: {
          label: (
            ctx
          ) =>
            hasData
              ? `₹ ${Number(
                  ctx.parsed
                ).toLocaleString(
                  "en-IN"
                )}`
              : "No expenses",
        },
      },
    },
  };

  const centerTextPlugin = {
    id: "centerText",

    beforeDraw(
      chart
    ) {

      const {
        ctx,
        chartArea: {
          top,
          bottom,
          left,
          right,
        },
      } = chart;

      const centerX =
        (left +
          right) /
        2;

      const centerY =
        (top +
          bottom) /
        2;

      ctx.save();

      ctx.font =
        "bold 18px sans-serif";

      ctx.fillStyle =
        "#0f172a";

      ctx.textAlign =
        "center";

      ctx.textBaseline =
        "middle";

      ctx.fillText(
        `₹ ${Number(
          totalSpent || 0
        ).toLocaleString(
          "en-IN"
        )}`,
        centerX,
        centerY - 10
      );

      ctx.font =
        "12px sans-serif";

      ctx.fillStyle =
        "#64748b";

      ctx.fillText(
        "Total Spent",
        centerX,
        centerY + 14
      );

      ctx.restore();
    },
  };

  return (
    <div
      className={`${glassCard} bg-gradient-to-br from-white to-slate-50`}
    >

      {/* HEADER */}
      <div className="mb-5">

        <h2 className="text-2xl font-bold text-slate-800">
           Expenses by
          Category
        </h2>

        <p
          className={`${mutedText} mt-1`}
        >
          Visual breakdown
          of monthly
          spending
        </p>
      </div>

      {/* EMPTY */}
      {!hasData ? (

        <div className="flex flex-col items-center justify-center py-10">

          <div className="w-52 h-52">

            <Doughnut
              data={
                chartData
              }
              options={
                options
              }
              plugins={[
                centerTextPlugin,
              ]}
            />
          </div>

          <p className="text-slate-400 text-sm mt-5">
            No expenses
            recorded for
            this month
          </p>
        </div>

      ) : (

        <div className="flex flex-col md:flex-row items-center gap-8">

          {/* CHART */}
          <div className="w-56 h-56 flex-shrink-0">

            <Doughnut
              data={
                chartData
              }
              options={
                options
              }
              plugins={[
                centerTextPlugin,
              ]}
            />
          </div>

          {/* LEGEND */}
          <div className="w-full space-y-4">

            {categories.map(
              (
                category,
                index
              ) => {

                const amount =
                  amounts[
                    index
                  ];

                const percentage =
                  totalSpent
                    ? (
                        (amount /
                          totalSpent) *
                        100
                      ).toFixed(
                        0
                      )
                    : 0;

                return (
                  <div
                    key={
                      category
                    }
                    className="flex items-center justify-between gap-4"
                  >

                    <div className="flex items-center gap-3">

                      <span
                        className="w-3 h-3 rounded-full"
                        style={{
                          backgroundColor:
                            colors[
                              index
                            ],
                        }}
                      ></span>

                      <span className="text-slate-700 capitalize font-medium">
                        {
                          category
                        }
                      </span>
                    </div>

                    <div className="text-right">

                      <p className="text-slate-800 font-semibold">
                        Rs.
                        {amount.toLocaleString(
                          "en-IN"
                        )}
                      </p>

                      <p className="text-xs text-slate-400">
                        {
                          percentage
                        }
                        %
                      </p>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ExpenseDonutChart;