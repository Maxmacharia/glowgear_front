
import { Link } from "react-router-dom";

export default function Navbar({ onMenuClick }) {
  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-gray-800 text-white flex items-center px-4 z-50">
      {/* Hamburger */}
      <button
        onClick={onMenuClick}
        className="mr-4 text-xl focus:outline-none"
        aria-label="Open menu"
      >
        ☰
      </button>

      <h1 className="font-bold text-lg flex-1">
        GlowGear Sales Dashboard
      </h1>

      <nav className="space-x-6 text-sm hidden sm:block">
        <Link to="/" className="hover:text-gray-300">Home</Link>
        <Link to="/about" className="hover:text-gray-300">About</Link>
        <Link to="/contact" className="hover:text-gray-300">Contact</Link>
      </nav>
    </header>
  );
}
