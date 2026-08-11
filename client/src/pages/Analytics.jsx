import { useEffect, useState } from "react";

import {
  FaBriefcase,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
} from "react-icons/fa";

function Analytics() {
  const [stats, setStats] = useState({
    applications: 0,
    interviews: 0,
    offers: 0,
    rejected: 0,
  });

  // =====================================
  // Get application data
  // =====================================

  const loadStats = () => {
    const applications =
      JSON.parse(
        localStorage.getItem("applications")
      ) || [];

    const newStats = {
      applications: applications.length,

      interviews: applications.filter(
        (app) => app.status === "Interview"
      ).length,

      offers: applications.filter(
        (app) => app.status === "Offer"
      ).length,

      rejected: applications.filter(
        (app) => app.status === "Rejected"
      ).length,
    };

    setStats(newStats);
  };

  // =====================================
  // Load when Analytics opens
  // =====================================

  useEffect(() => {
    loadStats();

    // Update when Job Tracker changes
    window.addEventListener(
      "applicationsUpdated",
      loadStats
    );

    return () => {
      window.removeEventListener(
        "applicationsUpdated",
        loadStats
      );
    };
  }, []);

  // =====================================
  // Cards
  // =====================================

  const data = [
    {
      title: "Applications",
      value: stats.applications,
      icon: FaBriefcase,
      color: "text-blue-400",
    },
    {
      title: "Interviews",
      value: stats.interviews,
      icon: FaClock,
      color: "text-yellow-400",
    },
    {
      title: "Offers",
      value: stats.offers,
      icon: FaCheckCircle,
      color: "text-green-400",
    },
    {
      title: "Rejected",
      value: stats.rejected,
      icon: FaTimesCircle,
      color: "text-red-400",
    },
  ];

  // =====================================
  // Percentages
  // =====================================

  const interviewPercentage =
    stats.applications > 0
      ? (stats.interviews /
          stats.applications) *
        100
      : 0;

  const offerPercentage =
    stats.applications > 0
      ? (stats.offers /
          stats.applications) *
        100
      : 0;

  return (
    <div className="space-y-8">

      {/* ============================= */}
      {/* Header */}
      {/* ============================= */}

      <div>

        <p className="font-semibold text-blue-400">
          CAREER INSIGHTS
        </p>

        <h1 className="mt-2 text-3xl font-bold md:text-4xl">
          Analytics 📊
        </h1>

        <p className="mt-2 text-slate-400">
          Understand your job search performance.
        </p>

      </div>

      {/* ============================= */}
      {/* Statistics Cards */}
      {/* ============================= */}

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

        {data.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="
                rounded-2xl
                border border-white/10
                bg-white/5
                p-7
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-blue-500/40
              "
            >

              <Icon
                className={`text-3xl ${item.color}`}
              />

              <h2 className="mt-6 text-4xl font-bold text-white">
                {item.value}
              </h2>

              <p className="mt-2 text-slate-400">
                {item.title}
              </p>

            </div>
          );
        })}

      </div>

      {/* ============================= */}
      {/* Application Progress */}
      {/* ============================= */}

      <div
        className="
          rounded-2xl
          border border-white/10
          bg-white/5
          p-8
        "
      >

        <h2 className="text-2xl font-bold text-white">
          Application Progress
        </h2>

        <div className="mt-8 space-y-6">

          {/* Applications */}

          <div>

            <div className="mb-2 flex justify-between">

              <span className="text-white">
                Applications
              </span>

              <span className="text-white">
                {stats.applications}
              </span>

            </div>

            <div className="h-3 rounded-full bg-slate-800">

              <div
                className="h-3 rounded-full bg-blue-500 transition-all duration-500"
                style={{
                  width:
                    stats.applications > 0
                      ? "100%"
                      : "0%",
                }}
              />

            </div>

          </div>

          {/* Interviews */}

          <div>

            <div className="mb-2 flex justify-between">

              <span className="text-white">
                Interviews
              </span>

              <span className="text-white">
                {stats.interviews}
              </span>

            </div>

            <div className="h-3 rounded-full bg-slate-800">

              <div
                className="h-3 rounded-full bg-yellow-500 transition-all duration-500"
                style={{
                  width: `${interviewPercentage}%`,
                }}
              />

            </div>

          </div>

          {/* Offers */}

          <div>

            <div className="mb-2 flex justify-between">

              <span className="text-white">
                Offers
              </span>

              <span className="text-white">
                {stats.offers}
              </span>

            </div>

            <div className="h-3 rounded-full bg-slate-800">

              <div
                className="h-3 rounded-full bg-green-500 transition-all duration-500"
                style={{
                  width: `${offerPercentage}%`,
                }}
              />

            </div>

          </div>

          {/* Rejected */}

          <div>

            <div className="mb-2 flex justify-between">

              <span className="text-white">
                Rejected
              </span>

              <span className="text-white">
                {stats.rejected}
              </span>

            </div>

            <div className="h-3 rounded-full bg-slate-800">

              <div
                className="h-3 rounded-full bg-red-500 transition-all duration-500"
                style={{
                  width:
                    stats.applications > 0
                      ? `${(stats.rejected / stats.applications) * 100}%`
                      : "0%",
                }}
              />

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Analytics;