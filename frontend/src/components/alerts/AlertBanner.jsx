import useBudgets from "../../hooks/useBudgets";
import useExpenses from "../../hooks/useExpenses";

import {
  alertErrorCard,
  alertWarningBadge,
  mutedText,
  loadingClass,
} from "../../styles/common";

const AlertBanner = ({
  selectedMonth,
}) => {

  const {
    budgets,
    loading:
      budLoading,
  } = useBudgets(
    selectedMonth
  );

  const {
    byCategory,
    loading:
      expLoading,
  } = useExpenses(
    selectedMonth
  );

  if (
    budLoading ||
    expLoading
  ) {

    return (
      <div className={loadingClass}>
        Checking budget
        alerts...
      </div>
    );
  }

  const alerts =
    budgets.filter(
      (budget) => {

        const spent =
          byCategory[
            budget.category.toLowerCase()
          ] || 0;

        return (
          spent >
          budget.limit
        );
      }
    );
    if (budgets.length === 0) {

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 shadow-sm">
      <h2 className="text-slate-600 font-semibold mb-2">
        Budget Status
      </h2>

      <p className="text-sm text-slate-500">
        No budget limits added for this month.
      </p>
    </div>
  );
}



  if (
    alerts.length ===
    0
  ) {

    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-5">

        <div className="flex items-center justify-between gap-3">

          <div>

            <h2 className="text-emerald-700 font-semibold">
              Budget Status
            </h2>

            <p
              className={`${mutedText} mt-1`}
            >
              All category
              budgets are
              within limits
            </p>
          </div>

          <span className="bg-emerald-100 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full">
            Safe
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${alertErrorCard} shadow-sm`}
    >

      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">

        <div>

          <h2 className="text-red-600 font-semibold text-lg">
             Budget Alerts
          </h2>

          <p
            className={`${mutedText} mt-1`}
          >
            Some categories
            exceeded monthly
            budget limits
          </p>
        </div>

        <span
          className={
            alertWarningBadge
          }
        >
          {
            alerts.length
          }{" "}
          Alert
          {alerts.length >
          1
            ? "s"
            : ""}
        </span>
      </div>

      {/* ALERTS */}
      <div className="space-y-3">

        {alerts.map(
          (
            alert,
            index
          ) => {

            const spent =
              byCategory[
                alert.category.toLowerCase()
              ] || 0;

            const exceeded =
              spent -
              alert.limit;

            return (
              <div
                key={index}
                className="bg-white border border-red-100 rounded-2xl p-4"
              >

                <div className="flex items-start justify-between gap-3">

                  <div>

                    <p className="text-red-600 font-medium capitalize">
                      {
                        alert.category
                      }{" "}
                      budget exceeded
                    </p>

                    <p className="text-sm text-slate-500 mt-1">
                      Spent Rs.
                      {spent.toLocaleString(
                        "en-IN"
                      )}{" "}
                      of ₹
                      {alert.limit.toLocaleString(
                        "en-IN"
                      )}
                    </p>
                  </div>

                  <span className="bg-red-100 text-red-600 text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
                    ₹
                    {exceeded.toLocaleString(
                      "en-IN"
                    )}
                  </span>
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default AlertBanner;