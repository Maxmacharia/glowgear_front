import { useEffect, useState } from "react";
import {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
} from "../api/expenses";
import Table from "../components/Table";

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({ description: "", amount: 0 });
  const [editing, setEditing] = useState(null);

  const load = async () => {
    const res = await getExpenses();
    setExpenses(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (editing) {
      await updateExpense(editing.id, form);
      setEditing(null);
    } else {
      await createExpense(form);
    }
    setForm({ description: "", amount: 0 });
    load();
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Expenses</h1>

      <form onSubmit={submit} className="flex gap-2 mb-4">
        <input
          placeholder="Description"
          className="border p-2"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Amount"
          className="border p-2"
          value={form.amount}
          onChange={(e) =>
            setForm({ ...form, amount: +e.target.value })
          }
        />
        <button className="bg-blue-600 text-white px-4">
          {editing ? "Update" : "Add"}
        </button>
      </form>

      <Table
        columns={["description", "amount"]}
        data={expenses}
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
              onClick={() => deleteExpense(row.id).then(load)}
            >
              Delete
            </button>
          </>
        )}
      />
    </div>
  );
}
