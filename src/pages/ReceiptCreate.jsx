import { useEffect, useState } from "react";
import { getItems } from "../api/items";
import {
  createReceipt,
  getReceipts,
  deleteReceipt,
  updateReceipt,
} from "../api/receipts";
import Table from "../components/Table";

export default function ReceiptCreate() {
  const [items, setItems] = useState([]);
  const [lines, setLines] = useState([]);
  const [receipts, setReceipts] = useState([]);
  const [clientName, setClientName] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    const [itemsRes, receiptsRes] = await Promise.all([
      getItems(),
      getReceipts(),
    ]);
    setItems(itemsRes.data);
    setReceipts(receiptsRes.data);
  };

  // ------------------------
  // LINE HANDLERS
  // ------------------------
  const addLine = () => {
    setLines([...lines, { item_id: "", quantity: 1, selling_price: 0 }]);
  };

  const updateLine = (index, field, value) => {
    const updated = [...lines];
    updated[index][field] = value;
    setLines(updated);
  };

  const resetForm = () => {
    setLines([]);
    setClientName("");
    setIsEditing(false);
    setEditingId(null);
  };

  // ------------------------
  // CREATE / UPDATE
  // ------------------------
  const submit = async () => {
    if (!lines.length) return;

    const payload = {
      client_name: clientName,
      items: lines.map((l) => ({
        item_id: l.item_id,
        quantity: Number(l.quantity),
        selling_price: Number(l.selling_price),
      })),
    };

    if (isEditing) {
      await updateReceipt(editingId, payload);
    } else {
      await createReceipt(payload);
    }

    resetForm();
    loadAll();
  };

  // ------------------------
  // EDIT RECEIPT
  // ------------------------
  const editReceipt = (receipt) => {
    setIsEditing(true);
    setEditingId(receipt.id);
    setClientName(receipt.client_name || "");

    setLines(
      receipt.items.map((i) => ({
        item_id: i.item_id,
        quantity: i.quantity,
        selling_price: i.selling_price,
      }))
    );
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">
        {isEditing ? "Edit Receipt" : "POS Receipt Builder"}
      </h1>

      {/* CLIENT NAME */}
      <input
        className="border p-2 w-full"
        placeholder="Client Name (optional)"
        value={clientName}
        onChange={(e) => setClientName(e.target.value)}
      />

      {/* LINE ITEMS */}
      {lines.map((line, i) => (
        <div key={i} className="flex gap-2">
          <select
            className="border p-2"
            value={line.item_id}
            onChange={(e) => updateLine(i, "item_id", e.target.value)}
          >
            <option value="">Item</option>
            {items.map((it) => (
              <option key={it.id} value={it.id}>
                {it.name} (Stock {it.quantity})
              </option>
            ))}
          </select>

          <input
            type="number"
            className="border p-2 w-20"
            min="1"
            value={line.quantity}
            onChange={(e) => updateLine(i, "quantity", e.target.value)}
          />

          <input
            type="number"
            className="border p-2 w-28"
            placeholder="Selling Price"
            value={line.selling_price}
            onChange={(e) =>
              updateLine(i, "selling_price", e.target.value)
            }
          />
        </div>
      ))}

      {/* ACTION BUTTONS */}
      <div className="flex gap-2">
        <button
          className="bg-gray-600 text-white px-4 py-1"
          onClick={addLine}
        >
          + Add Item
        </button>

        <button
          className={`px-4 py-2 text-white ${
            isEditing ? "bg-orange-600" : "bg-blue-600"
          }`}
          onClick={submit}
        >
          {isEditing ? "Update Receipt" : "Create Receipt"}
        </button>

        {isEditing && (
          <button
            className="bg-gray-400 px-4 py-2"
            onClick={resetForm}
          >
            Cancel
          </button>
        )}
      </div>

      {/* RECEIPTS TABLE */}
      <h2 className="font-bold mt-6">Receipts</h2>

      <Table
        columns={["client_name", "total_amount", "created_at"]}
        data={receipts.map((r) => ({
          ...r,
          created_at: new Date(r.created_at).toLocaleString("en-GB"),
        }))}
        actions={(row) => (
          <div className="flex gap-2">
            <button
              className="text-blue-600"
              onClick={() => editReceipt(row)}
            >
              Edit
            </button>
            <button
              className="text-red-600"
              onClick={() => deleteReceipt(row.id).then(loadAll)}
            >
              Delete
            </button>
          </div>
        )}
      />
    </div>
  );
}
