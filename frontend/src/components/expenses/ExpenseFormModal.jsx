import { useForm } from "react-hook-form";

import { useState } from "react";

import api from "../../services/api";

import {
  useMonthStore,
} from "../../store/monthStore";

import {
  modalOverlay,
  modalCard,
  inputClass,
  selectClass,
  labelClass,
  primaryBtn,
  secondaryBtn,
  errorClass,
  modalActions,
} from "../../styles/common";

const MAX_EXPENSE =
  10000000;

function ExpenseFormModal({
  expense,
  onClose,
  onSaved,
}) {

  const {
    selectedDate,
  } = useMonthStore();

  const isEditMode =
    Boolean(expense);

  const [apiError,
    setApiError,
  ] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      amount:
        expense?.amount || "",

      category:
        expense?.category || "",

      item:
        expense?.item || "",

      expenseDate:
        expense?.expenseDate
          ? toDateInputValue(
              expense.expenseDate
            )
          : selectedDate,
    },
  });

  const saveExpense =
    async (data) => {

      try {

        setApiError("");

        const parsedAmount =
          parseInt(
            data.amount
          );

        const payload = {
          amount:
            parsedAmount,

          category:
            data.category,

          item:
            data.item.trim(),

          expenseDate:
            data.expenseDate,
        };

        if (isEditMode) {

          await api.put(
            `/expense-api/updateExpense/${expense._id}`,
            payload
          );

        } else {

          await api.post(
            "/expense-api/addExpense",
            payload
          );
        }

        await onSaved();

      } catch (err) {

        setApiError(
          err.response?.data
            ?.message ||
            "Failed to save expense"
        );
      }
    };

  return (
    <div className={modalOverlay}>

      <div className={modalCard}>

        {apiError && (
          <div
            className={`${errorClass} mb-4`}
          >
            {apiError}
          </div>
        )}

        <form
          noValidate
          onSubmit={handleSubmit(
            saveExpense
          )}
          className="space-y-4"
        >

          {/* AMOUNT */}
        {/* AMOUNT */}
<div>

  <label
    className={labelClass}
  >
    Amount
  </label>

  <input
    type="text"
    inputMode="numeric"
    placeholder="Enter amount"
    className={inputClass}
    {...register(
      "amount",
      {
        required:
          "Amount is required",

        validate: (
          value
        ) => {

          const trimmed =
            value.trim();

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

            return "Amount should be more than 0";
          }

          if (
            parsed >
            MAX_EXPENSE
          ) {

            return "Expense exceeds maximum allowed limit";
          }

          return true;
        },
      }
    )}
  />

  {errors.amount && (
    <p
      className={`${errorClass} mt-2`}
    >
      {
        errors.amount
          .message
      }
    </p>
  )}
</div>

          {/* CATEGORY */}
          <div>

            <label
              className={labelClass}
            >
              Category
            </label>

            <select
              className={
                selectClass
              }
              {...register(
                "category",
                {
                  required:
                    "Category is required",
                }
              )}
            >

              <option value="">
                Select Category
              </option>

              <option value="food">
                Food
              </option>

              <option value="travel">
                Travel
              </option>

              <option value="shopping">
                Shopping
              </option>

              <option value="entertainment">
                Entertainment
              </option>

              <option value="utilities">
                Utilities
              </option>

              <option value="others">
                Others
              </option>
            </select>

            {errors.category && (
              <p
                className={`${errorClass} mt-2`}
              >
                {
                  errors.category
                    .message
                }
              </p>
            )}
          </div>

          {/* ITEM */}
          <div>

            <label
              className={labelClass}
            >
              Item Name
            </label>

            <input
              type="text"
              placeholder="Expense item"
              className={inputClass}
              {...register(
                "item",
                {
                  required:
                    "Item is required",

                  validate: (
                    value
                  ) => {

                    if (
                      value.trim()
                        .length < 3
                    ) {

                      return "Item name must contain at least 3 characters";
                    }

                    return true;
                  },
                }
              )}
            />

            {errors.item && (
              <p
                className={`${errorClass} mt-2`}
              >
                {
                  errors.item
                    .message
                }
              </p>
            )}
          </div>

          {/* DATE */}
          <div>

            <label
              className={labelClass}
            >
              Date
            </label>

            <input
              type="date"
              className={inputClass}
              {...register(
                "expenseDate",
                {
                  required:
                    "Date is required",
                }
              )}
            />

            {errors.expenseDate && (
              <p
                className={`${errorClass} mt-2`}
              >
                {
                  errors
                    .expenseDate
                    .message
                }
              </p>
            )}
          </div>

          {/* BUTTONS */}
          <div
            className={
              modalActions
            }
          >

            <button
              type="submit"
              className={`${primaryBtn} flex-1`}
            >
              {isEditMode
                ? "Update Expense"
                : "Add Expense"}
            </button>

            <button
              type="button"
              onClick={onClose}
              className={`${secondaryBtn} flex-1`}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function toDateInputValue(
  dateValue
) {

  const date = new Date(
    dateValue
  );

  return `${date.getFullYear()}-${String(
    date.getMonth() + 1
  ).padStart(2, "0")}-${String(
    date.getDate()
  ).padStart(2, "0")}`;
}

export default ExpenseFormModal;