import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getReceipts, deleteReceipt } from "../api/receipts";

export default function Receipts() {
  const [receipts, setReceipts] = useState([]);
  const [openId, setOpenId] = useState(null);
  const navigate = useNavigate();

  const load = async () => {
    const res = await getReceipts();
    setReceipts(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Receipts</h1>

        {/* ✅ CREATE BUTTON */}
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => navigate("/receipts/new")}
        >
          + Create Receipt
        </button>
      </div>

      {receipts.map((r) => (
        <div key={r.id} className="border rounded p-3">
          <div className="flex justify-between items-center">
            <div>
              <p><b>Client:</b> {r.client_name || "Walk-in"}</p>
              <p><b>Total:</b> {r.total_amount}</p>
              <p className="text-sm text-gray-500">
                {new Date(r.created_at).toLocaleString("en-GB")}
              </p>
            </div>

            <div className="space-x-2">
              {/* VIEW */}
              <button
                className="text-blue-600"
                onClick={() =>
                  setOpenId(openId === r.id ? null : r.id)
                }
              >
                {openId === r.id ? "Hide" : "View"}
              </button>

              {/* ✅ EDIT */}
              <button
                className="text-orange-600"
                onClick={() => navigate(`/receipts/edit/${r.id}`)}
              >
                Edit
              </button>

              {/* DELETE */}
              <button
                className="text-red-600"
                onClick={() => deleteReceipt(r.id).then(load)}
              >
                Delete
              </button>
            </div>
          </div>

          {openId === r.id && (
            <table className="mt-3 w-full border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-1">Item</th>
                  <th className="border p-1">Qty</th>
                  <th className="border p-1">Price</th>
                  <th className="border p-1">Total</th>
                </tr>
              </thead>
              <tbody>
                {r.items.map((it, i) => (
                  <tr key={i}>
                    <td className="border p-1">{it.item_name}</td>
                    <td className="border p-1">{it.quantity}</td>
                    <td className="border p-1">{it.selling_price}</td>
                    <td className="border p-1">{it.line_total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ))}
    </div>
  );
}
