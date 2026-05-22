import { useEffect, useState } from "react";
import { exportExpenseReport } from "../../services";

const getCurrentMonth = () => {
  const now = new Date();

  return `${now.getFullYear()}-${String(
    now.getMonth() + 1
  ).padStart(2, "0")}`;
};

const ExportReportButton = ({
  selectedMonth,
}) => {
  const [month, setMonth] = useState(
    selectedMonth || getCurrentMonth()
  );

  const [loading, setLoading] =
    useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    if (selectedMonth) {
      setMonth(selectedMonth);
    }
  }, [selectedMonth]);

  const handleExport = async () => {
    try {
      setLoading(true);
      setError("");

      const res =
        await exportExpenseReport(month);

      const url =
        window.URL.createObjectURL(
          new Blob([res.data])
        );

      const link =
        document.createElement("a");

      link.href = url;

      link.setAttribute(
        "download",
        `expense-report-${month}.csv`
      );

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Could not export report"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
      <h2 className="text-base font-semibold text-slate-700 mb-4">
        Export Financial Report
      </h2>

      {error && (
        <p className="text-red-500 text-sm mb-3">
          {error}
        </p>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="month"
          value={month}
          onChange={(event) =>
            setMonth(event.target.value)
          }
          className="border border-slate-200 rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-cyan-400"
        />

        <button
          type="button"
          onClick={handleExport}
          disabled={loading}
          className="bg-slate-800 hover:bg-slate-900 text-white text-sm font-medium px-5 py-3 rounded-2xl transition disabled:opacity-60"
        >
          {loading
            ? "Exporting..."
            : "Download CSV"}
        </button>
      </div>
    </div>
  );
};

export default ExportReportButton;