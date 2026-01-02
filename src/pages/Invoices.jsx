import { useEffect, useState } from "react";
import {
  getInvoices,
  createInvoice,
  deleteInvoice,
} from "../api/invoices";
import Table from "../components/Table";
import Modal from "../components/Modal";

export default function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [open, setOpen] = useState(false);

  const load = async () => {
    const res = await getInvoices();
    setInvoices(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">Invoices</h1>
        <button
          className="bg-blue-600 text-white px-4"
          onClick={() => setOpen(true)}
        >
          New Invoice
        </button>
      </div>

      <Table
        columns={[
          "client_name",
          "total_amount",
          "status",
          "created_at",
        ]}
        data={invoices}
        actions={(row) => (
          <button
            className="text-red-600"
            onClick={() => deleteInvoice(row.id).then(load)}
          >
            Delete
          </button>
        )}
      />

      <Modal open={open} onClose={() => setOpen(false)} title="Create Invoice">
        <p className="text-sm text-gray-600">
          Invoice creation UI (with items & payments) comes next.
        </p>
      </Modal>
    </div>
  );
}
