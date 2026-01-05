import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function Sidebar({ open, onClose }) {
  const [openInventory, setOpenInventory] = useState(true);

  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded ${
      isActive
        ? "bg-blue-600 text-white"
        : "hover:bg-gray-100"
    }`;

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white z-50 transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Header */}
        <div className="h-14 flex items-center justify-between px-4 border-b">
          <span className="font-bold">Menu</span>
          <button onClick={onClose}>✕</button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Inventory */}
          <button
            onClick={() => setOpenInventory(!openInventory)}
            className="font-semibold w-full text-left"
          >
            Inventory
          </button>

          {openInventory && (
            <div className="ml-2 space-y-1">
              <NavLink to="/items" className={linkClass} onClick={onClose}>
                Items
              </NavLink>
              <NavLink to="/expenses" className={linkClass} onClick={onClose}>
                Expenses
              </NavLink>
              <NavLink to="/receipts" className={linkClass} onClick={onClose}>
                Receipts
              </NavLink>
              <NavLink to="/invoices" className={linkClass} onClick={onClose}>
                Invoices
              </NavLink>
              <NavLink to="/reports" className={linkClass} onClick={onClose}>
                Reports
              </NavLink>
            </div>
          )}

          {/* Other Sections */}
          <div className="space-y-1 pt-4 border-t">
            <NavLink to="/customers" className={linkClass} onClick={onClose}>
              Customer Profile Overview
            </NavLink>
            <NavLink to="/sales-analysis" className={linkClass} onClick={onClose}>
              Sales Analysis
            </NavLink>
            <NavLink to="/locations" className={linkClass} onClick={onClose}>
              Location Profile Overview
            </NavLink>
          </div>
        </div>
      </aside>
    </>
  );
}
