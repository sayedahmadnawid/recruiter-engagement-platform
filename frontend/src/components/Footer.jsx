import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-6 border-t border-gray-100 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Top section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Left */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Sayed Ahmad Nawid
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Full Stack Developer • Laravel • React • AWS
            </p>
          </div>

          {/* Right - links */}
          <div className="flex flex-wrap gap-4 text-sm">
            <Link
              to="/"
              className="text-gray-600 hover:text-indigo-600 transition"
            >
              Home
            </Link>
            <Link
              to="projects"
              className="text-gray-600 hover:text-indigo-600 transition"
            >
              Projects
            </Link>
            <Link
              to="contact"
              className="text-gray-600 hover:text-indigo-600 transition"
            >
              Contacts
            </Link>
            <Link
              to="/dashboard"
              className="text-gray-600 hover:text-indigo-600 transition"
            >
              Dashboard
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 h-px bg-gray-200"></div>

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <p className="text-sm text-gray-500">
            © 2026 Sayed Ahmad Nawid. All rights reserved.
          </p>

          <div className="flex gap-4 text-sm">
            <a
              href="https://github.com/sayedahmadnawid/recruiter-engagement-platform"
              target="_blank"
              className="text-gray-500 hover:text-gray-900 transition"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/sayednawid/"
              target="_blank"
              className="text-gray-500 hover:text-gray-900 transition"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
