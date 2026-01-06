import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

import Items from "./pages/Items";
import Expenses from "./pages/Expenses";
import Receipts from "./pages/Receipts";
import ReceiptCreate from "./pages/ReceiptCreate";
import Invoices from "./pages/Invoices";
import Reports from "./pages/Reports";

import CustomerOverview from "./pages/analysis/CustomerOverview";
import SalesAnalysis from "./pages/analysis/SalesAnalysis";
import LocationOverview from "./pages/LocationOverview";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/items" element={<Items />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/receipts" element={<Receipts />} />
          <Route path="/receipts/new" element={<ReceiptCreate />} />
          <Route path="/receipts/edit/:id" element={<ReceiptCreate />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/reports" element={<Reports />} />

          <Route path="/analysis/customers" element={<CustomerOverview />} />
          <Route path="/analysis/sales" element={<SalesAnalysis />} />
          <Route path="/locations" element={<LocationOverview />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
