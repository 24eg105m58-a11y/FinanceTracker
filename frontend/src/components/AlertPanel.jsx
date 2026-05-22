import {
  alertErrorCard,
  alertSuccessCard,
  alertWarningBadge,
  alertSuccessBadge,
  errorText,
  successText,
  mutedText,
} from "../styles/common";

function AlertPanel({
  budgetAlert,
  savingsAlert,
}) {

  const budgetAlerts =
    budgetAlert?.alerts || [];

  const hasBudgetAlerts =
    budgetAlerts.length > 0;

  const hasBudgets =
    budgetAlert?.hasBudgets;

  const noBudgets =
    !hasBudgets;

  const savingsViolated =
    savingsAlert?.message?.includes(
      "violated"
    );

  const hasSavingsGoal =
    Number(
      savingsAlert?.goal || 0
    ) > 0;

  const savingsHealthy =
    hasSavingsGoal &&
    !savingsViolated;

  const hasAnyAlerts =
    hasBudgetAlerts ||
    savingsViolated ||
    savingsHealthy;

  return (
    <div className="space-y-4">

      {/* NO BUDGETS */}
      {noBudgets && (

        <div className="bg-slate-100 border border-slate-200 rounded-3xl p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p
                className={`${mutedText} font-semibold text-sm`}
              >
                No Budget Limits
              </p>

              <p
                className={`${mutedText} text-sm mt-1`}
              >
                No budget limits
                added for any
                category
              </p>
            </div>
          </div>
        </div>
      )}

      {/* BUDGET ALERTS */}
      {budgetAlerts.map(
        (
          alert,
          index
        ) => (

          <div
            key={index}
            className={alertErrorCard}
          >

            <div className="flex items-start justify-between gap-3">

              <div>

                <p
                  className={`${errorText} font-semibold text-sm`}
                >

                  {String(
                    alert.category
                  )
                    .charAt(0)
                    .toUpperCase() +
                    String(
                      alert.category
                    ).slice(1)}{" "}

                  budget exceeded
                </p>

                <p
                  className={`${errorText} text-sm mt-1`}
                >

                  Exceeded by ₹
                  {Number(
                    alert.exceededt ||
                      0
                  ).toLocaleString(
                    "en-IN"
                  )}
                </p>
              </div>

              <div
                className={alertWarningBadge}
              >
                Alert
              </div>
            </div>
          </div>
        )
      )}

      {/* SAVINGS ALERT */}
      {hasSavingsGoal && (

        <div
          className={
            savingsViolated
              ? alertErrorCard
              : alertSuccessCard
          }
        >

          <div className="flex items-start justify-between gap-3">

            <div>

              <p
                className={`font-semibold text-sm ${
                  savingsViolated
                    ? errorText
                    : successText
                }`}
              >

                {savingsViolated
                  ? "Savings Goal Missed"
                  : "Savings Goal Achieved"}
              </p>

              <p
                className={`text-sm mt-1 ${
                  savingsViolated
                    ? errorText
                    : successText
                }`}
              >

                {savingsAlert.message}
              </p>

              <p
                className={`${mutedText} text-xs mt-2`}
              >

                Savings: ₹
                {Number(
                  savingsAlert.savings ||
                    0
                ).toLocaleString(
                  "en-IN"
                )}

                {" • "}

                Goal: ₹
                {Number(
                  savingsAlert.goal ||
                    0
                ).toLocaleString(
                  "en-IN"
                )}
              </p>
            </div>

            <div
              className={
                savingsViolated
                  ? alertWarningBadge
                  : alertSuccessBadge
              }
            >

              {savingsViolated
                ? "Warning"
                : "Success"}
            </div>
          </div>
        </div>
      )}

      {/* HEALTHY STATE */}
      {!hasAnyAlerts &&
        !noBudgets && (

          <div
            className={alertSuccessCard}
          >

            <div className="flex items-center justify-between">

              <div>

                <p
                  className={`${successText} font-semibold text-sm`}
                >
                  Financial Status Healthy
                </p>

                <p
                  className={`${successText} text-sm mt-1`}
                >

                  Budgets and savings
                  are within healthy
                  limits
                </p>
              </div>

              <div
                className={alertSuccessBadge}
              >
                Good
              </div>
            </div>
          </div>
        )}
    </div>
  );
}

export default AlertPanel;