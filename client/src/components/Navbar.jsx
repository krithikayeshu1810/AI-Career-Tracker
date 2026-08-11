import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/10">

      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

        <Link
          to="/"
          className="text-2xl md:text-3xl font-extrabold text-white"
        >
          Career<span className="text-blue-500">Pilot</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">

          <a
            href="#home"
            className="text-slate-300 hover:text-blue-400 transition"
          >
            Home
          </a>

          <a
            href="#features"
            className="text-slate-300 hover:text-blue-400 transition"
          >
            Features
          </a>

          <a
            href="#about"
            className="text-slate-300 hover:text-blue-400 transition"
          >
            About
          </a>

          <a
            href="#contact"
            className="text-slate-300 hover:text-blue-400 transition"
          >
            Contact
          </a>

        </div>

        <Link
          to="/login"
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-blue-600/20 transition"
        >
          Login
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;