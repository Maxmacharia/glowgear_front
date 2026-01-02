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
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Daily Report</h1>

      <input
        type="date"
        className="border p-2 mr-2"
        onChange={(e) => setDate(e.target.value)}
      />

      <button
        className="bg-blue-600 text-white px-4 py-1 mr-2"
        onClick={load}
      >
        View
      </button>

      <button
        className="bg-green-600 text-white px-4 py-1"
        onClick={download}
      >
        Download PDF
      </button>

      {report && (
        <div className="mt-6 space-y-6">
          {/* ---------------- RECEIPTS ---------------- */}
          <div>
            <h2 className="font-bold text-lg mb-2">Receipts</h2>

            {report.receipts.length === 0 && (
              <p className="text-gray-500">No receipts for this day</p>
            )}

            {report.receipts.map((receipt) => (
              <div
                key={receipt.receipt_id}
                className="border rounded p-3 mb-4"
              >
                <p>
                  <strong>Client:</strong> {receipt.client_name}
                </p>
                <p className="text-sm text-gray-600">
                  {new Date(receipt.created_at).toLocaleString()}
                </p>

                <table className="w-full mt-2 border">
                  <thead>
                    <tr className="bg-gray-100 text-left">
                      <th className="p-1 border">Item</th>
                      <th className="p-1 border">Qty</th>
                      <th className="p-1 border">Selling</th>
                      <th className="p-1 border">Buying</th>
                      <th className="p-1 border">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {receipt.items.map((item, idx) => (
                      <tr key={idx}>
                        <td className="p-1 border">{item.item_name}</td>
                        <td className="p-1 border">{item.quantity}</td>
                        <td className="p-1 border">{item.selling_price}</td>
                        <td className="p-1 border">{item.buying_price}</td>
                        <td className="p-1 border">{item.line_total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <p className="mt-2 font-semibold">
                  Receipt Total: {receipt.receipt_total}
                </p>
              </div>
            ))}
          </div>

          {/* ---------------- EXPENSES ---------------- */}
          <div>
            <h2 className="font-bold text-lg mb-2">Expenses</h2>

            {report.expenses.length === 0 && (
              <p className="text-gray-500">No expenses for this day</p>
            )}

            <ul className="list-disc pl-5">
              {report.expenses.map((expense, idx) => (
                <li key={idx}>
                  {expense.description} — {expense.amount} (
                  {new Date(expense.created_at).toLocaleString()})
                </li>
              ))}
            </ul>
          </div>

          {/* ---------------- SUMMARY ---------------- */}
          <div className="border-t pt-4">
            <h2 className="font-bold text-lg">Result</h2>

            <p>Total Sales: {report.summary.total_receipt_sales}</p>
            <p>Total Buying: {report.summary.total_receipt_buying}</p>
            <p>Total Expenses: {report.summary.total_expenses}</p>

            <p
              className={`font-bold text-lg mt-2 ${
                report.summary.profit_or_loss >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {report.summary.profit_or_loss >= 0
                ? "Profit"
                : "Loss"}
              : {report.summary.profit_or_loss}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
