import { useState } from "react";
import axios from "axios";

export default function DailyReport() {
  const [date, setDate] = useState("");
  const [report, setReport] = useState(null);

  const load = async () => {
    const res = await axios.get(
      "http://localhost:8000/reports/daily",
      { params: { report_date: date } }
    );
    setReport(res.data);
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">Daily Report</h1>

      <div className="flex gap-2">
        <input
          type="date"
          className="border p-2"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4"
          onClick={load}
        >
          Load
        </button>
      </div>

      {report && (
        <div className="border p-4 rounded space-y-2">
          <p><b>Date:</b> {report.date}</p>
          <p><b>Sales:</b> {report.sales}</p>
          <p><b>Expenses:</b> {report.expenses}</p>
          <p><b>Invoices:</b> {report.invoices}</p>
          <p>
            <b>Profit / Loss:</b>{" "}
            <span
              className={
                report.net_income >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }
            >
              {report.net_income}
            </span>
          </p>

          <div className="text-sm text-gray-600">
            Receipts: {report.counts.receipts} | Invoices:{" "}
            {report.counts.invoices} | Expenses:{" "}
            {report.counts.expenses}
          </div>
        </div>
      )}
    </div>
  );
}
