import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 flex gap-4">
      <Link to="/items">Items</Link>
      <Link to="/expenses">Expenses</Link>
      <Link to="/receipts">Receipts</Link>
      <Link to="/invoices">Invoices</Link>
      <Link to="/reports">Reports</Link>
    </nav>
  );
}
