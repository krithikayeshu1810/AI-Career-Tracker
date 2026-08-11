import { useEffect, useState } from "react";
import {
  FaBriefcase,
  FaUserTie,
  FaCheckCircle,
  FaFileAlt,
} from "react-icons/fa";

function DashboardCards() {
  const [stats, setStats] = useState({
    applications: 0,
    interviews: 0,
    offers: 0,
    resumeScore: 0,
  });

  const loadStats = () => {
    const applications =
      JSON.parse(localStorage.getItem("applications")) || [];

    const resumeScore =
      Number(localStorage.getItem("resumeScore")) || 0;

    setStats({
      applications: applications.length,

      interviews: applications.filter(
        (app) => app.status === "Interview"
      ).length,

      offers: applications.filter(
        (app) => app.status === "Offer"
      ).length,

      resumeScore,
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
      title: "Total Applications",
      value: stats.applications,
      icon: FaBriefcase,
      iconColor: "text-blue-400",
      iconBg: "bg-blue-500/10",
    },
    {
      title: "Interviews",
      value: stats.interviews,
      icon: FaUserTie,
      iconColor: "text-yellow-400",
      iconBg: "bg-yellow-500/10",
    },
    {
      title: "Offers",
      value: stats.offers,
      icon: FaCheckCircle,
      iconColor: "text-green-400",
      iconBg: "bg-green-500/10",
    },
    {
      title: "Resume Score",
      value: `${stats.resumeScore}%`,
      icon: FaFileAlt,
      iconColor: "text-violet-400",
      iconBg: "bg-violet-500/10",
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="
              group
              rounded-2xl
              border border-slate-700/60
              bg-gradient-to-br
              from-slate-900
              to-slate-800
              p-7
              shadow-xl
              transition-all
              duration-300
              hover:-translate-y-2
              hover:border-blue-500/50
            "
          >
            <div
              className={`
                flex h-14 w-14
                items-center justify-center
                rounded-xl
                ${card.iconBg}
                mb-7
              `}
            >
              <Icon
                className={`
                  text-2xl
                  ${card.iconColor}
                  transition-transform
                  duration-300
                  group-hover:scale-110
                `}
              />
            </div>

            <h2 className="text-4xl font-bold text-white">
              {card.value}
            </h2>

            <p className="mt-3 text-lg text-slate-400">
              {card.title}
            </p>
          </div>
        );
      })}

    </div>
  );
}

export default DashboardCards;