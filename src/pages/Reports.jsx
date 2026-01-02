import { useState } from "react";
import { getDailyReport, downloadDailyPDF } from "../api/reports";

export default function Reports() {
  const [date, setDate] = useState("");
  const [report, setReport] = useState(null);

  const load = async () => {
    const res = await getDailyReport(date);
    setReport(res.data);
  };

  const download = async () => {
    const res = await downloadDailyPDF(date);
    const blob = new Blob([res.data], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Daily Report</h1>

      <input
        type="date"
        className="border p-2 my-4"
        onChange={(e) => setDate(e.target.value)}
      />

      <button className="bg-blue-600 text-white px-4 mr-2" onClick={load}>
        View
      </button>

      <button className="bg-green-600 text-white px-4" onClick={download}>
        Download PDF
      </button>

      {report && (
        <div className="mt-4">
          <p>Receipts Profit: {report.receipts_profit}</p>
          <p>Invoices Profit: {report.invoices_profit}</p>
          <p>Expenses: {report.expenses}</p>
          <p className="font-bold">Net: {report.net_profit}</p>
        </div>
      )}
    </div>
  );
}
