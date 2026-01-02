import { useEffect, useState } from "react";
import {
  createInvoice,
  getInvoices,
  getInvoice,
  addInvoicePayment,
  deleteInvoice,
} from "../api/invoices";
import { getItems } from "../api/items";
import Table from "../components/Table";

export default function InvoicePayments() {
  const [items, setItems] = useState([]);
  const [lines, setLines] = useState([]);
  const [clientName, setClientName] = useState("");
  const [invoices, setInvoices] = useState([]);
  const [selected, setSelected] = useState(null);
  const [payment, setPayment] = useState(0);

  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    const [itemsRes, invoicesRes] = await Promise.all([
      getItems(),
      getInvoices(),
    ]);
    setItems(itemsRes.data);
    setInvoices(invoicesRes.data);
  };

  const addLine = () => {
    setLines([
      ...lines,
      { item_id: "", quantity: 1, selling_price: 0 },
    ]);
  };

  const updateLine = (i, field, value) => {
    const updated = [...lines];
    updated[i][field] = value;
    setLines(updated);
  };

  const create = async () => {
    await createInvoice({
      client_name: clientName,
      items: lines.map((l) => ({
        item_id: l.item_id,
        quantity: Number(l.quantity),
        selling_price: Number(l.selling_price),
      })),
    });

    setClientName("");
    setLines([]);
    loadAll();
  };

  const loadInvoice = async (id) => {
    const res = await getInvoice(id);
    setSelected(res.data);
  };

  const pay = async () => {
    await addInvoicePayment(selected.id, {
      amount: Number(payment),
    });
    setPayment(0);
    loadInvoice(selected.id);
    loadAll();
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">Invoices</h1>

      <input
        className="border p-2"
        placeholder="Client Name"
        value={clientName}
        onChange={(e) => setClientName(e.target.value)}
      />

      {lines.map((line, i) => (
        <div key={i} className="flex gap-2">
          <select
            className="border p-2"
            value={line.item_id}
            onChange={(e) =>
              updateLine(i, "item_id", e.target.value)
            }
          >
            <option value="">Select Item</option>
            {items.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            className="border p-2 w-20"
            value={line.quantity}
            onChange={(e) =>
              updateLine(i, "quantity", e.target.value)
            }
          />

          <input
            type="number"
            className="border p-2 w-24"
            value={line.selling_price}
            onChange={(e) =>
              updateLine(i, "selling_price", e.target.value)
            }
          />
        </div>
      ))}

      <button
        className="bg-gray-600 text-white px-4 py-1"
        onClick={addLine}
      >
        + Add Item
      </button>

      <button
        className="bg-blue-600 text-white px-4 py-2"
        onClick={create}
      >
        Create Invoice
      </button>

      <Table
        columns={["client_name", "total_amount", "status"]}
        data={invoices}
        actions={(row) => (
          <>
            <button
              className="text-blue-600"
              onClick={() => loadInvoice(row.id)}
            >
              View
            </button>
            <button
              className="text-red-600"
              onClick={() => deleteInvoice(row.id).then(loadAll)}
            >
              Delete
            </button>
          </>
        )}
      />

      {selected && (
        <div className="border p-4">
          <h2 className="font-bold">Payments</h2>
          <p>Status: {selected.status}</p>

          <ul>
            {selected.payments.map((p) => (
              <li key={p.id}>
                {p.amount} — {p.created_at}
              </li>
            ))}
          </ul>

          <input
            type="number"
            className="border p-2"
            value={payment}
            onChange={(e) => setPayment(e.target.value)}
          />

          <button
            className="bg-green-600 text-white px-4 ml-2"
            onClick={pay}
          >
            Add Payment
          </button>
        </div>
      )}
    </div>
  );
}
