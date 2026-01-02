import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Items from "./pages/Items";
import Expenses from "./pages/Expenses";
import Receipts from "./pages/Receipts";
import Invoices from "./pages/Invoices";
import Reports from "./pages/Reports";
import ReceiptCreate from "./pages/ReceiptCreate";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/items" element={<Items />} />
        <Route path="/expenses" element={<Expenses />} />
	<Route path="/receipts/new" element={<ReceiptCreate />} />
        <Route path="/receipts/edit/:id" element={<ReceiptCreate />} />
        <Route path="/receipts" element={<Receipts />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </BrowserRouter>
  );
}
