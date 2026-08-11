function DashboardNavbar() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const name = user?.fullname || "User";

  return (
    <header className="fixed top-0 left-0 md:left-64 right-0 h-24 z-50 bg-slate-950/95 backdrop-blur-xl border-b border-slate-800">

      <div className="h-full px-5 sm:px-8 flex items-center justify-between">

        {/* Welcome */}
        <div>

          <p className="text-slate-400 text-sm sm:text-base">
            Welcome back,
          </p>

          <h2 className="text-white text-xl sm:text-2xl font-bold">
            {name} 👋
          </h2>

        </div>

        {/* Profile Circle */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xl font-bold shadow-lg">

          {name.charAt(0).toUpperCase()}

        </div>

      </div>

    </header>
  );
}

export default DashboardNavbar;