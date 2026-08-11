import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 flex items-center justify-center px-6">

      <div className="text-center">

        <FaExclamationTriangle className="text-yellow-400 text-7xl mx-auto" />

        <h1 className="text-8xl font-extrabold mt-8 text-white">
          404
        </h1>

        <h2 className="text-3xl font-bold mt-4">
          Page Not Found
        </h2>

        <p className="text-slate-400 mt-4">
          Sorry, the page you're looking for doesn't exist.
        </p>

        <Link
          to="/"
          className="inline-block mt-8 px-7 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold"
        >
          Back to Home
        </Link>

      </div>

    </div>
  );
}

export default NotFound;