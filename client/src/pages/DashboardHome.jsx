import DashboardCards from "../components/DashboardCards";

function DashboardHome() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="max-w-7xl mx-auto">

      {/* Page Heading */}
      <div className="mb-10">

        <p className="text-slate-400 text-lg">
          Track your job search and career progress.
        </p>

        <h1 className="text-4xl md:text-5xl font-bold text-white mt-2">
          Your Career Overview
        </h1>

        <p className="text-slate-400 mt-3 text-lg">
          Welcome back,{" "}
          <span className="text-blue-400 font-semibold">
            {user?.fullname || "User"}
          </span>
          {" "}👋
        </p>

      </div>

      {/* Dashboard Cards */}
      <DashboardCards />

    </div>
  );
}

export default DashboardHome;