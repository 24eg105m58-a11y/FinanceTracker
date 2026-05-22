import {
  useRef,
  useState,
} from "react";

import {
  addExpense,
  scanReceipt,
} from "../../services";

import {
  glassCard,
  primaryBtn,
  secondaryBtn,
  inputClass,
  selectClass,
  labelClass,
  errorClass,
  modalOverlay,
  modalCard,
  modalActions,
} from "../../styles/common";

const CATEGORIES = [
  "food",
  "travel",
  "shopping",
  "utilities",
  "entertainment",
  "others",
];

const MAX_EXPENSE =
  10000000;

const ReceiptScanner = ({
  onSuccess,
}) => {

  const fileInputRef =
    useRef(null);

  const [file, setFile] =
    useState(null);

  const [result,
    setResult,
  ] = useState(null);

  const [error,
    setError,
  ] = useState("");

  const [loading,
    setLoading,
  ] = useState(false);

  const [saving,
    setSaving,
  ] = useState(false);

  const clearScannerState =
    () => {

      setResult(null);

      setFile(null);

      setError("");

      if (
        fileInputRef.current
      ) {

        fileInputRef.current.value =
          "";
      }
    };

  const handleScan =
    async () => {

      if (!file) {

        setError(
          "Please provide a receipt image"
        );

        return;
      }

      try {

        setLoading(true);

        setError("");

        setResult(null);

        const res =
          await scanReceipt(
            file
          );

      const scannedData =
  res.data.payload
    ? {
        suggestedExpense:
          res.data.payload,
      }
    : res.data;

        const expense =
          scannedData?.suggestedExpense;

        const hasItem =
          String(
            expense?.item ||
              ""
          ).trim().length >
          0;

        const hasAmount =
          String(
            expense?.amount ||
              ""
          ).trim().length >
          0;

          const hasValidDate =
  !expense?.expenseDate ||
  !isNaN(
    new Date(
      expense.expenseDate
    ).getTime()
  );

        if (
  !expense ||
  (!hasItem &&
    !hasAmount) ||
  !hasValidDate
) {

          setError(
            "Please upload a proper receipt image"
          );

          return;
        }

        setResult(
          scannedData
        );

      } catch (err) {

        setError(
          err.response?.data
            ?.message ||
            "Could not scan receipt"
        );

      } finally {

        setLoading(false);
      }
    };

  const saveAsExpense =
  async () => {

    try {

      setSaving(true);

      setError("");

      await addExpense({
        item:
          result
            .suggestedExpense
            .item,

        amount: parseInt(
          result
            .suggestedExpense
            .amount || 0
        ),

        category:
          result
            .suggestedExpense
            .category ||
          "others",

        expenseDate:
          result
            .suggestedExpense
            .expenseDate ||
          new Date()
            .toISOString()
            .slice(0, 10),
      });

      onSuccess?.();

      setFile(null);

      setResult(null);

      setError("");

      document.querySelector(
        'input[type="file"]'
      ).value = "";

    } catch (err) {

      setError(
        err.response?.data
          ?.message ||
          "Could not save expense"
      );

    } finally {

      setSaving(false);
    }
  };

  return (
    <>
      {/* MAIN CARD */}
      <div className={`${glassCard} h-full`}>

        <h2 className="text-2xl font-bold text-slate-700 mb-5">
           Receipt Scanner
        </h2>

        {error && (
          <div
            className={`${errorClass} mb-4`}
          >
            {error}
          </div>
        )}

        <div className="flex flex-col gap-4">

          {/* FILE INPUT */}
          <div>

            <label
              className={
                labelClass
              }
            >
              Receipt Image
            </label>

            <label className="flex items-center justify-between border border-slate-200 rounded-2xl px-4 py-4 bg-white cursor-pointer hover:border-slate-500 transition-all mt-5">

              <span className="text-sm text-slate-600 truncate">
                {file
                  ? file.name
                  : "Upload receipt image"}
              </span>

              <span className="bg-gradient-to-r from-slate-500 to-gray-500 text-white text-xs font-medium px-4 py-2 rounded-xl">
                Browse
              </span>

              <input
                ref={
                  fileInputRef
                }
                type="file"
                accept="image/png,image/jpeg"
                onChange={(
                  event
                ) =>
                  setFile(
                    event
                      .target
                      .files?.[0] ||
                      null
                  )
                }
                className="hidden"
              />
            </label>
          </div>

          {/* BUTTON */}
          <button
            type="button"
            onClick={
              handleScan
            }
            disabled={
              loading
            }
            className={`${primaryBtn} w-fit px-8 disabled:opacity-60 mt-4`}
          >
            {loading
              ? "Scanning..."
              : "Scan Receipt"}
          </button>
        </div>
      </div>

      {/* RESULT MODAL */}
      {result?.suggestedExpense && (
        <div className={modalOverlay}>

          <div
            className={`${modalCard} max-w-xl`}
          >

            {/* HEADER */}
            <div className="flex items-center justify-between pb-5 border-b border-slate-200">

              <h2 className="text-2xl font-bold text-slate-800">
                🧾 Detected Expense
              </h2>

              <button
                onClick={
                  clearScannerState
                }
                className="text-slate-400 text-2xl hover:scale-110 transition-transform"
              >
                ✕
              </button>
            </div>

            {/* BODY */}
            <div className="pt-6 space-y-5">

  {error && (
    <div
      className={`${errorClass} mb-2`}
    >
      {error}
    </div>
  )}

              {/* ITEM */}
              <div>

                <label
                  className={
                    labelClass
                  }
                >
                  Item
                </label>

                <input
                  type="text"
                  value={
                    result
                      .suggestedExpense
                      .item ||
                    ""
                  }
                  onChange={(
                    e
                  ) =>
                    setResult({
                      suggestedExpense:
                        {
                          ...result.suggestedExpense,
                          item:
                            e.target
                              .value,
                        },
                    })
                  }
                  className={
                    inputClass
                  }
                />
              </div>

              {/* AMOUNT */}
              <div>

                <label
                  className={
                    labelClass
                  }
                >
                  Amount
                </label>

                <input
                  type="text"
                  inputMode="numeric"
                  value={
                    result
                      .suggestedExpense
                      .amount ||
                    ""
                  }
                  onChange={(
                    e
                  ) =>
                    setResult({
                      suggestedExpense:
                        {
                          ...result.suggestedExpense,
                          amount:
                            e.target.value.replace(
                              /[^0-9]/g,
                              ""
                            ),
                        },
                    })
                  }
                  className={
                    inputClass
                  }
                />
              </div>

              {/* CATEGORY */}
              <div>

                <label
                  className={
                    labelClass
                  }
                >
                  Category
                </label>

                <select
                  value={
                    result
                      .suggestedExpense
                      .category ||
                    "others"
                  }
                  onChange={(
                    e
                  ) =>
                    setResult({
                      suggestedExpense:
                        {
                          ...result.suggestedExpense,
                          category:
                            e.target
                              .value,
                        },
                    })
                  }
                  className={
                    selectClass
                  }
                >

                  {CATEGORIES.map(
                    (
                      category
                    ) => (
                      <option
                        key={
                          category
                        }
                        value={
                          category
                        }
                      >
                        {category
                          .charAt(
                            0
                          )
                          .toUpperCase() +
                          category.slice(
                            1
                          )}
                      </option>
                    )
                  )}
                </select>
              </div>

              {/* DATE */}
              <div>

                <label
                  className={
                    labelClass
                  }
                >
                  Expense Date
                </label>

                <input
                  type="date"
                  value={
                    result
                      .suggestedExpense
                      .expenseDate
                      ? new Date(
                          result.suggestedExpense.expenseDate
                        )
                          .toISOString()
                          .slice(
                            0,
                            10
                          )
                      : new Date()
                          .toISOString()
                          .slice(
                            0,
                            10
                          )
                  }
                  onChange={(
                    e
                  ) =>
                    setResult({
                      suggestedExpense:
                        {
                          ...result.suggestedExpense,
                          expenseDate:
                            e.target
                              .value,
                        },
                    })
                  }
                  className={
                    inputClass
                  }
                />
              </div>

              {/* BUTTONS */}
              <div
                className={
                  modalActions
                }
              >

                <button
                  type="button"
                  onClick={
                    saveAsExpense
                  }
                  disabled={
                    saving
                  }
                  className={`${primaryBtn} flex-1 disabled:opacity-60`}
                >
                  {saving
                    ? "Saving..."
                    : "💾 Save Expense"}
                </button>

                <button
                  type="button"
                  onClick={
                    clearScannerState
                  }
                  className={`${secondaryBtn} flex-1`}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReceiptScanner;