import { useForm } from "react-hook-form";
import { useState } from "react";

import {
  saveSavingsGoal,
  deleteSavingsGoal,
} from "../services";

import {
  modalOverlay,
  modalCard,
  subHeadingClass,
  inputClass,
  primaryBtn,
  dangerBtn,
  errorClass,
  cancelBtn,
} from "../styles/common";

function SavingsGoalModal({
  selectedMonth,
  goal,
  onClose,
  onGoalChanged,
}) {

  const {
    handleSubmit,
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      savingsGoal:
        goal?.savingsGoal || "",
    },
  });

  const [goalValue] = [
    watch("savingsGoal"),
  ];

  const [isEditing, setIsEditing] =
    useState(!goal);

    const [showError,
  setShowError,
] = useState(false);

  const saveGoal =
    async (data) => {
if (
  !data.savingsGoal ||
  Number(
    data.savingsGoal
  ) <= 0
) {

  setShowError(true);

  return;
}

setShowError(false);
      try {

        await saveSavingsGoal({
          savingsGoal:
            Number(
              data.savingsGoal
            ),

          month:
            selectedMonth,
        });

        await onGoalChanged();

        onClose();

      } catch (err) {

        console.error(
          "Saving goal failed:",
          err
        );
      }
    };

  const removeGoal =
    async () => {

      try {

        await deleteSavingsGoal(
          selectedMonth
        );

        await onGoalChanged();

        onClose();

      } catch (err) {

        console.error(
          "Deleting goal failed:",
          err
        );
      }
    };

  return (
    <div className={modalOverlay}>

      <div className={modalCard}>

        <h2
          className={`${subHeadingClass} mb-2`}
        >
          Savings Goal
        </h2>

        <p className="text-sm text-slate-500 mb-5">
          Goal month:{" "}
          {selectedMonth.slice(0, 7)}
        </p>

        <form
          onSubmit={handleSubmit(saveGoal)}
        >

          <label className="block text-sm font-medium text-slate-700 mb-2">
            Goal Amount
          </label>

          <input
            type="text"
            inputMode="numeric"
            value={goalValue || ""}
            disabled={!isEditing}
            onChange={(e) =>
              setValue(
                "savingsGoal",
                e.target.value.replace(
                  /[^0-9]/g,
                  ""
                )
              )
            }
            className={`${inputClass} mb-2 ${
              !isEditing
                ? "bg-slate-100 cursor-default opacity-70"
                : ""
            }`}
            placeholder="Enter savings goal"
          />

         {showError &&
 (!goalValue ||
  Number(goalValue) <= 0) && (
              <p className={errorClass}>
                Please enter a valid savings goal
              </p>
            )}

          <div className="flex gap-3 mt-5">

            <button
              type="button"
              onClick={() => {

                if (
                  goal &&
                  !isEditing
                ) {

                  setIsEditing(true);

                  return;
                }

                handleSubmit(
                  saveGoal
                )();
              }}
              className={`${primaryBtn} flex-1`}
            >
              {goal
                ? isEditing
                  ? "Save Goal"
                  : "Update Goal"
                : "Add Goal"}
            </button>

            <button
              type="button"
              onClick={onClose}
              className = {`${cancelBtn} flex-1`} 
            >
              Cancel
            </button>

            {goal && (
              <button
                type="button"
                onClick={removeGoal}
                className={`${dangerBtn} flex-1`}
              >
                Delete
              </button>
            )}

          </div>
        </form>
      </div>
    </div>
  );
}

export default SavingsGoalModal;