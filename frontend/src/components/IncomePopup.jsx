import { useForm } from "react-hook-form";
import axios from "axios";
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

function IncomePopup({
  onClose,
  onIncomeAdded,
}) {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const addIncome =
    async (data) => {

      try {

        const parsedIncome =
          parseInt(
            data.income
          );

        const res =
          await api.post(
            `/income-api/addIncome`,
            {
              income:
                parsedIncome,

              incomeDate:
                new Date(),

              month: `${new Date().getFullYear()}-${String(
                new Date().getMonth() +
                  1
              ).padStart(2, "0")}`,
            },
            {
              withCredentials:
                true,
            }
          );

        onIncomeAdded(
          res.data.payload
        );

        onClose();

      } catch (err) {

        console.error(
          "Adding income failed:",
          err
        );
      }
    };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">

      <div
        className={`${glassCard} w-full max-w-md p-7`}
      >

        {/* HEADER */}
        <div className="mb-6">

          <h2 className="text-2xl font-bold text-slate-800">
             Add Income
          </h2>

          <p className="text-slate-500 text-sm mt-1">
            Add your monthly
            income to manage
            savings and expenses
          </p>
        </div>

        {/* FORM */}
        <form
          noValidate
          onSubmit={handleSubmit(
            addIncome
          )}
        >

          {/* INPUT */}
          <div>

            <label className="block text-sm font-medium text-slate-600 mb-2">
              Monthly Income
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

                      return "Income exceeds maximum limit (100 Cr)";
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
          <div className="flex gap-4 mt-7">

            <button
              type="button"
              onClick={onClose}
              className={`${secondaryBtn} flex-1`}
            >
              Cancel
            </button>

            <button
              type="submit"
              className={`${primaryBtn} flex-1`}
            >
              Save Income
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default IncomePopup;