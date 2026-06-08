import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-100">
      <nav className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo / Brand */}
          <Link
            to="/"
            className="text-xl font-bold tracking-tight text-gray-900"
          >
            Sayed Ahmad Nawid
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              Home
            </Link>

            <Link
              to="/projects"
              className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200"
            >
              Projects
            </Link>

            <Link
              to="/contact"
              className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200"
            >
              Contact
            </Link>

            <Link
              to="/dashboard"
              className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
