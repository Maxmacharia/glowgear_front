import { Link } from "react-router-dom";

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white z-50 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-4 font-bold text-lg border-b border-gray-700">
          GlowGear Dashboard
        </div>

        <nav className="p-4 space-y-3">
          <SidebarGroup title="Inventory">
            <SidebarLink to="/items" onClick={onClose}>Items</SidebarLink>
            <SidebarLink to="/expenses" onClick={onClose}>Expenses</SidebarLink>
            <SidebarLink to="/receipts" onClick={onClose}>Receipts</SidebarLink>
            <SidebarLink to="/invoices" onClick={onClose}>Invoices</SidebarLink>
            <SidebarLink to="/reports" onClick={onClose}>Reports</SidebarLink>
          </SidebarGroup>

          <SidebarLink to="/analysis/customers" onClick={onClose}>
            Customer Profile Overview
          </SidebarLink>

          <SidebarLink to="/analysis/sales" onClick={onClose}>
            Sales Analysis
          </SidebarLink>

          <SidebarLink to="/analysis/location" onClick={onClose}>
            Location Profile Overview
          </SidebarLink>
        </nav>
      </aside>
    </>
  );
}

function SidebarGroup({ title, children }) {
  return (
    <div>
      <p className="text-sm text-gray-400 mb-1">{title}</p>
      <div className="ml-2 space-y-2">{children}</div>
    </div>
  );
}

function SidebarLink({ to, onClick, children }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="block hover:text-blue-400 transition"
    >
      {children}
    </Link>
  );
}
