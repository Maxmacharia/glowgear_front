import { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Sidebar isOpen={open} onClose={() => setOpen(false)} />

      <nav className="bg-gray-800 text-white p-4 flex items-center justify-between">
        <button
          onClick={() => setOpen(true)}
          className="text-xl font-bold"
        >
          ☰
        </button>

        <div className="flex gap-4">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </nav>
    </>
  );
}
