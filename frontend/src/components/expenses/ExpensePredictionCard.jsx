import {
  useEffect,
  useState,
} from "react";

import {
  getNextMonthPrediction,
} from "../../services";

import {
  glassCard,
  loadingClass,
  errorClass,
  mutedText,
} from "../../styles/common";

const ExpensePredictionCard =
  ({
    selectedMonth,
  }) => {

    const [
      prediction,
      setPrediction,
    ] = useState(null);

    const [
      error,
      setError,
    ] = useState("");

    const [
      loading,
      setLoading,
    ] = useState(true);

    useEffect(() => {

      const fetchPrediction =
        async () => {

          try {

            setLoading(
              true
            );

            setError("");

            const res =
              await getNextMonthPrediction(
                selectedMonth
              );

            setPrediction(
              res.data.payload
            );

          } catch (err) {

            setError(
              err.response
                ?.data
                ?.message ||
                "Could not load prediction"
            );

          } finally {

            setLoading(
              false
            );
          }
        };

      fetchPrediction();

    }, [selectedMonth]);

    if (loading) {

      return (
        <div
          className={`${glassCard} ${loadingClass}`}
        >
          Loading prediction...
        </div>
      );
    }

    if (error) {

      return (
        <div className={glassCard}>

          <div className={errorClass}>
            {error}
          </div>
        </div>
      );
    }

    if (!prediction) {

      return (
        <div className={glassCard}>

          <p className="text-slate-400 text-sm">
            No prediction data
            available yet.
          </p>
        </div>
      );
    }

    const estimatedTotal =
      Number(
        prediction.estimatedTotal ||
          0
      );

    const categories =
      Object.entries(
        prediction.categoryEstimates ||
          {}
      ).filter(
        ([, amount]) =>
          Number(amount) >
          0
      );

    return (
      <div
        className={`${glassCard} bg-gradient-to-br from-white to-slate-50`}
      >

        {/* HEADER */}
        <div className="mb-4">

          <h2 className="text-2xl font-bold text-slate-800">
            Next Month Prediction
          </h2>

          <p
            className={`${mutedText} mt-1`}
          >
            AI estimated
            spending forecast
          </p>
        </div>

        {/* MAIN VALUE */}
        <div className="bg-slate-50 border border-slate-200 rounded-3xl px-5 py-4 mb-4">

          <p className="text-sm text-slate-500 mb-1">
            Predicted Total for{" "}

            <span className="font-semibold text-slate-700">
              {
                prediction.nextMonth
              }
            </span>
          </p>

          <h1 className="text-3xl font-bold text-slate-600 leading-tight">
            Rs.
            {estimatedTotal.toLocaleString(
              "en-IN"
            )}
          </h1>
        </div>

        {/* CATEGORY ESTIMATES */}
        {categories.length >
        0 ? (

          <div className="mt-2">

            <h3 className="text-sm font-semibold text-slate-600 mb-3">
              Category Estimates
            </h3>

            <div className="flex flex-wrap gap-2">

              {categories.map(
                ([
                  category,
                  amount,
                ]) => (

                  <span
                    key={
                      category
                    }
                    className="bg-slate-100 text-slate-700 text-xs px-3 py-2 rounded-full capitalize"
                  >
                    {
                      category
                    }
                    : Rs.
                    {Math.round(
                      Number(
                        amount
                      )
                    ).toLocaleString(
                      "en-IN"
                    )}
                  </span>
                )
              )}
            </div>
          </div>

        ) : (

          <p className="text-slate-400 text-sm">
            No category-wise
            prediction data
            available.
          </p>
        )}
      </div>
    );
  };

export default ExpensePredictionCard;