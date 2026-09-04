import { Link } from "react-router-dom";
import { Form, useRouteLoaderData } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const token = useRouteLoaderData("root");

  const navClass = ({ isActive }) =>
    isActive
      ? "px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium shadow-md"
      : "px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200";

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
            <NavLink to="/" end className={navClass}>
              Home
            </NavLink>

            <NavLink to="/projects" className={navClass}>
              Projects
            </NavLink>

            <NavLink to="/contact" className={navClass}>
              Contact
            </NavLink>
            {token && (
              <>
                <NavLink to="/leads" className={navClass}>
                  Leads
                </NavLink>
                <NavLink to="/rag-search" className={navClass}>
                  RAG Search
                </NavLink>
                <NavLink to="/dashboard" className={navClass}>
                  Dashboard
                </NavLink>
              </>
            )}
            {!token && (
              <NavLink to="/auth" className={navClass}>
                Login
              </NavLink>
            )}
            {token && (
              <Form action="/logout" method="post">
                <button className={navClass}>Logout</button>
              </Form>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
