import { NavLink, useNavigate } from "react-router-dom";

import {
  FaHome,
  FaBriefcase,
  FaFileAlt,
  FaChartBar,
  FaUser,
  FaCog,
  FaRoute,
} from "react-icons/fa";

function Sidebar() {
  const navigate = useNavigate();

  const links = [
    ["", "Dashboard", FaHome],
    ["jobs", "Job Tracker", FaBriefcase],
    ["resume", "Resume Analyzer", FaFileAlt],
    ["career", "Career Path", FaRoute],
    ["analytics", "Analytics", FaChartBar],
    ["profile", "Profile", FaUser],
    ["settings", "Settings", FaCog],
  ];

  return (
    <aside className="flex h-full w-full flex-col overflow-y-auto border-r border-slate-800 bg-slate-950">

      {/* Logo */}

      <div className="p-7">

        <h1 className="text-2xl font-bold text-white">
          Career
          <span className="text-blue-500">
            Pilot
          </span>
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Career Management
        </p>

      </div>

      {/* Navigation */}

      <nav className="flex-1 space-y-2 px-4">

        {links.map(([path, label, Icon]) => (

          <NavLink
            key={label}
            to={
              path
                ? `/dashboard/${path}`
                : "/dashboard"
            }
            end={!path}
            className={({ isActive }) =>
              `flex items-center gap-4 rounded-xl px-4 py-3 transition-all duration-200 ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`
            }
          >

            <Icon className="text-lg" />

            <span className="font-medium">
              {label}
            </span>

          </NavLink>

        ))}

      </nav>

      {/* Logout */}

      <button
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");

          navigate("/login");
        }}
        className="
          m-5
          rounded-xl
          bg-red-500/10
          px-4
          py-3
          text-red-400
          transition
          hover:bg-red-500
          hover:text-white
        "
      >
        Logout
      </button>

    </aside>
  );
}

export default Sidebar;