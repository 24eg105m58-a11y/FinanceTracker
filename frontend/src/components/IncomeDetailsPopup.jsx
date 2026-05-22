import { useState } from "react";
import { useForm } from "react-hook-form";

import api from "../services/api";

import {
  glassCard,
  inputClass,
  primaryBtn,
  secondaryBtn,
  errorClass,
} from "../styles/common";

const MAX_INCOME =
  1000000000;

function IncomeDetailsPopup({
  income,
  selectedMonth,
  onClose,
  onIncomeUpdated,
}) {

  const [isEditing,
    setIsEditing,
  ] = useState(false);

  const [apiError,
    setApiError,
  ] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      income:
        income?.income || "",
    },
  });

  const updateIncome =
    async (data) => {

      try {

        setApiError("");

        const parsedIncome =
          parseInt(
            data.income
          );

        const res =
          await api.put(
            "/income-api/updateIncome",
            {
              income:
                parsedIncome,

              month:
                selectedMonth,
            },
            {
              withCredentials:
                true,
            }
          );

        onIncomeUpdated(
          res.data.payload
        );

        setIsEditing(false);

      } catch (err) {

        setApiError(
          err.response?.data
            ?.message ||
            "Updating income failed"
        );
      }
    };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">

      <div
        className={`${glassCard} w-full max-w-md p-7`}
      >

        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">

          <div>

            <h2 className="text-2xl font-bold text-slate-800">
              Income Details
            </h2>

            <p className="text-slate-500 text-sm mt-1">
              View and update your
              monthly income
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-500 hover:scale-110 transition-transform text-xl"
          >
            ✕
          </button>
        </div>

        {/* API ERROR */}
        {apiError && (
          <div className="bg-red-50 border border-red-200 text-red-500 rounded-2xl p-4 mb-5 text-sm">
            {apiError}
          </div>
        )}

        {!isEditing ? (
          <>

            {/* INCOME CARD */}
            <div className="bg-gradient-to-br rounded-3xl p-6 mb-6">

              <p className="text-sm text-slate-500 mb-2">
                Current Income
              </p>

              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-500 to-sky-500 bg-clip-text text-transparent">
                Rs.
                {(
                  income?.income || 0
                ).toLocaleString(
                  "en-IN"
                )}
              </h1>

              <p className="text-sm text-slate-500 mt-3">
                Added on{" "}
                {income?.incomeDate
                  ? new Date(
                      income.incomeDate
                    ).toLocaleDateString(
                      "en-IN"
                    )
                  : "N/A"}
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setIsEditing(true)
              }
              className={`${primaryBtn} w-full`}
            >
               Edit Income
            </button>
          </>
        ) : (
          <form
            noValidate
            onSubmit={handleSubmit(
              updateIncome
            )}
          >

            {/* INPUT */}
            <div className="mb-5">

              <label className="block text-sm font-medium text-slate-600 mb-2">
                Income Amount
              </label>

              <input
                type="text"
                inputMode="numeric"
                placeholder="Enter income amount"
                className={inputClass}
                {...register(
                  "income",
                  {
                    required:
                      "Income is required",

                    validate: (
                      value
                    ) => {

                      const trimmed =
                        value.trim();

                      if (
                        trimmed.length ===
                        0
                      ) {

                        return "Income is required";
                      }

                      if (
                        !/^[0-9]+$/.test(
                          trimmed
                        )
                      ) {

                        return "Only whole numbers are allowed";
                      }

                      const parsed =
                        parseInt(
                          trimmed
                        );

                      if (
                        parsed <= 0
                      ) {

                        return "Income must be greater than 0";
                      }

                      if (
                        parsed >
                        MAX_INCOME
                      ) {

                        return "Income exceeds maximum allowed limit";
                      }

                      return true;
                    },
                  }
                )}
              />

              {errors.income && (
                <p
                  className={`${errorClass} mt-2`}
                >
                  {
                    errors.income
                      .message
                  }
                </p>
              )}
            </div>

            {/* BUTTONS */}
            <div className="flex gap-4">

              <button
                type="submit"
                className={`${primaryBtn} flex-1`}
              >
                 Update Income
              </button>

              <button
                type="button"
                onClick={() =>
                  setIsEditing(false)
                }
                className={`${secondaryBtn} flex-1`}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default IncomeDetailsPopup;