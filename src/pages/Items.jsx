import { useEffect, useState } from "react";
import {
  getItems,
  createItem,
  updateItem,
  deleteItem,
} from "../api/items";
import Table from "../components/Table";
import Modal from "../components/Modal";

export default function Items() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: "", quantity: 0, cost_price: 0 });
  const [editing, setEditing] = useState(null);

  const load = async () => {
    const res = await getItems();
    setItems(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (editing) {
      await updateItem(editing.id, form);
      setEditing(null);
    } else {
      await createItem(form);
    }
    setForm({ name: "", quantity: 0, cost_price: 0 });
    load();
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Items</h1>

      <form onSubmit={submit} className="flex gap-2 mb-4">
        <input
          placeholder="Name"
          className="border p-2"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Qty"
          className="border p-2"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: +e.target.value })}
        />
        <input
          type="number"
          placeholder="Cost Price"
          className="border p-2"
          value={form.cost_price}
          onChange={(e) => setForm({ ...form, cost_price: +e.target.value })}
        />
        <button className="bg-blue-600 text-white px-4">
          {editing ? "Update" : "Add"}
        </button>
      </form>

      <Table
        columns={["name", "quantity", "cost_price"]}
        data={items}
        actions={(row) => (
          <>
            <button
              className="text-blue-600"
              onClick={() => {
                setEditing(row);
                setForm(row);
              }}
            >
              Edit
            </button>
            <button
              className="text-red-600"
              onClick={() => deleteItem(row.id).then(load)}
            >
              Delete
            </button>
          </>
        )}
      />
    </div>
  );
}
