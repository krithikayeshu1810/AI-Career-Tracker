import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import DashboardNavbar from "../components/DashboardNavbar";

function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Sidebar */}

      <div
        className="
          fixed
          left-0
          top-0
          z-50
          h-screen
          w-64
        "
      >
        <Sidebar />
      </div>

      {/* Main Area */}

      <div className="ml-64 min-h-screen">

        {/* Navbar */}

        <DashboardNavbar />

        {/* Page Content */}

        <main
          className="
            min-h-screen
            px-6
            pb-10
            pt-28
            sm:px-8
            lg:px-10
          "
        >
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default Dashboard;