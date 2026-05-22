import { useState } from "react";
import { getInsights } from "../services/index";

const InsightsPanel = ({ selectedMonth }) => {
  const [insights, setInsights] = useState("");
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchInsights = async () => {
    setLoading(true);
    setError("");
    setInsights("");

    try {
      const res = await getInsights(selectedMonth);

      setInsights(res.data.insights);
      setSummary(res.data.spendingSummary);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Could not fetch insights"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-slate-700">
          AI Insights
        </h2>

        <button
          onClick={fetchInsights}
          disabled={loading}
          className="text-sm bg-violet-100 hover:bg-violet-200 text-violet-700 font-medium px-4 py-2 rounded-2xl transition disabled:opacity-60"
        >
          {loading ? "Thinking..." : "Get Tips"}
        </button>
      </div>

      {!insights && !loading && !error && (
        <p className="text-slate-400 text-sm">
          Click "Get Tips" to get personalized
          money-saving tips based on your spending.
        </p>
      )}

      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}

      {insights && (
        <div>
          {summary && (
            <div className="mb-4 flex flex-wrap gap-2">
              {Object.entries(summary).map(([cat, amt]) => (
                <span
                  key={cat}
                  className="bg-slate-100 text-slate-600 text-xs px-3 py-1 rounded-full capitalize"
                >
                  {cat}: ₹{amt.toLocaleString("en-IN")}
                </span>
              ))}
            </div>
          )}

          <div className="text-sm text-slate-700 whitespace-pre-line leading-relaxed">
            {insights}
          </div>
        </div>
      )}
    </div>
  );
};

export default InsightsPanel;