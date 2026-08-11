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

  const loadStats = () => {
    const applications =
      JSON.parse(localStorage.getItem("applications")) || [];

    setStats({
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
    });
  };

  useEffect(() => {
    loadStats();

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

  const cards = [
    {
      title: "Applications",
      value: stats.applications,
      icon: FaBriefcase,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      title: "Interviews",
      value: stats.interviews,
      icon: FaClock,
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
    },
    {
      title: "Offers",
      value: stats.offers,
      icon: FaCheckCircle,
      color: "text-green-400",
      bg: "bg-green-500/10",
    },
    {
      title: "Rejected",
      value: stats.rejected,
      icon: FaTimesCircle,
      color: "text-red-400",
      bg: "bg-red-500/10",
    },
  ];

  const getPercentage = (value) => {
    if (stats.applications === 0) {
      return 0;
    }

    return Math.round(
      (value / stats.applications) * 100
    );
  };

  return (
    <div className="space-y-8">

      {/* Header */}

      <div>
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5">
          <span className="h-2 w-2 rounded-full bg-blue-400" />

          <span className="text-xs font-semibold tracking-wider text-blue-400">
            CAREER INSIGHTS
          </span>
        </div>

        <h1 className="mt-2 text-3xl font-bold text-white md:text-4xl">
          Analytics 📊
        </h1>

        <p className="mt-2 text-slate-400">
          Understand your job search performance.
        </p>
      </div>

      {/* Statistic Cards */}

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="
                group
                rounded-2xl
                border border-white/10
                bg-white/5
                p-7
                transition-all
                duration-300
                hover:-translate-y-2
                hover:border-blue-500/40
              "
            >
              <div
                className={`
                  flex h-14 w-14
                  items-center justify-center
                  rounded-xl
                  ${card.bg}
                `}
              >
                <Icon
                  className={`text-2xl ${card.color}`}
                />
              </div>

              <h2 className="mt-6 text-4xl font-bold text-white">
                {card.value}
              </h2>

              <p className="mt-2 text-slate-400">
                {card.title}
              </p>
            </div>
          );
        })}

      </div>

      {/* Application Progress */}

      <div
        className="
          rounded-2xl
          border border-white/10
          bg-white/5
          p-8
        "
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Application Progress
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Your current application pipeline
            </p>
          </div>

          <div className="rounded-xl bg-blue-500/10 px-4 py-2">
            <span className="text-sm font-semibold text-blue-400">
              {stats.applications} Total
            </span>
          </div>
        </div>

        <div className="mt-8 space-y-7">

          {/* Applications */}

          <ProgressBar
            label="Applications"
            value={stats.applications}
            percentage={
              stats.applications > 0 ? 100 : 0
            }
            color="bg-blue-500"
          />

          {/* Interviews */}

          <ProgressBar
            label="Interviews"
            value={stats.interviews}
            percentage={getPercentage(
              stats.interviews
            )}
            color="bg-yellow-500"
          />

          {/* Offers */}

          <ProgressBar
            label="Offers"
            value={stats.offers}
            percentage={getPercentage(
              stats.offers
            )}
            color="bg-green-500"
          />

          {/* Rejected */}

          <ProgressBar
            label="Rejected"
            value={stats.rejected}
            percentage={getPercentage(
              stats.rejected
            )}
            color="bg-red-500"
          />

        </div>
      </div>

    </div>
  );
}

function ProgressBar({
  label,
  value,
  percentage,
  color,
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-slate-300">
          {label}
        </span>

        <span className="font-semibold text-white">
          {value}
        </span>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-slate-800">
        <div
          className={`h-full rounded-full ${color} transition-all duration-700`}
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>

      <p className="mt-1 text-right text-xs text-slate-500">
        {percentage}%
      </p>
    </div>
  );
}

export default Analytics;