import { useEffect, useState } from "react";
import axios from "axios";

import {
  FaSearch,
  FaHeart,
  FaMapMarkerAlt,
  FaBriefcase,
  FaMoneyBillWave,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaExternalLinkAlt,
} from "react-icons/fa";

function JobTracker() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [companyFilter, setCompanyFilter] = useState("All");

  // ==============================
  // Saved Jobs
  // ==============================

  const [savedJobs, setSavedJobs] = useState(() => {
    return (
      JSON.parse(
        localStorage.getItem("savedJobs")
      ) || []
    );
  });

  // ==============================
  // Applied Jobs
  // ==============================

  const [appliedJobs, setAppliedJobs] =
    useState([]);

  // ==============================
  // Saved Filter
  // ==============================

  const [showSavedOnly, setShowSavedOnly] =
    useState(false);

  // ==============================
  // Load Jobs
  // ==============================

  useEffect(() => {
    fetchJobs();

    const applications =
      JSON.parse(
        localStorage.getItem("applications")
      ) || [];

    setAppliedJobs(
      applications.map(
        (application) => application.id
      )
    );
  }, []);

  // ==============================
  // Fetch Jobs
  // ==============================

  const fetchJobs = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/jobs"
      );

      setJobs(response.data);
    } catch (error) {
      console.log(
        "Job loading error:",
        error
      );

      setJobs([]);
    }
  };

  // ==============================
  // Save / Unsave
  // ==============================

  const saveJob = (id) => {
    setSavedJobs((previous) => {
      const updated =
        previous.includes(id)
          ? previous.filter(
              (jobId) => jobId !== id
            )
          : [...previous, id];

      localStorage.setItem(
        "savedJobs",
        JSON.stringify(updated)
      );

      return updated;
    });
  };

  // ==============================
  // Apply Job
  // ==============================

  const applyJob = (id, link) => {
    const job = jobs.find(
      (item) => item.id === id
    );

    if (!job) return;

    const applications =
      JSON.parse(
        localStorage.getItem("applications")
      ) || [];

    const alreadyApplied =
      applications.some(
        (application) =>
          application.id === id
      );

    if (!alreadyApplied) {
      const newApplication = {
        id: job.id,
        company: job.company,
        role: job.role,
        location: job.location,
        salary: job.salary,
        jobType: job.jobType,
        applyLink: job.applyLink,
        status: "Applied",
      };

      const updatedApplications = [
        ...applications,
        newApplication,
      ];

      localStorage.setItem(
        "applications",
        JSON.stringify(
          updatedApplications
        )
      );

      setAppliedJobs((previous) => [
        ...previous,
        id,
      ]);

      window.dispatchEvent(
        new Event("applicationsUpdated")
      );
    }

    if (link) {
      window.open(link, "_blank");
    }
  };

  // ==============================
  // Application Status
  // ==============================

  const updateStatus = (
    id,
    newStatus
  ) => {
    const applications =
      JSON.parse(
        localStorage.getItem("applications")
      ) || [];

    const updated =
      applications.map(
        (application) =>
          application.id === id
            ? {
                ...application,
                status: newStatus,
              }
            : application
      );

    localStorage.setItem(
      "applications",
      JSON.stringify(updated)
    );

    window.dispatchEvent(
      new Event("applicationsUpdated")
    );
  };

  // ==============================
  // Get Status
  // ==============================

  const getApplicationStatus = (id) => {
    const applications =
      JSON.parse(
        localStorage.getItem("applications")
      ) || [];

    const application =
      applications.find(
        (item) => item.id === id
      );

    return (
      application?.status || "Applied"
    );
  };

  // ==============================
  // Status UI
  // ==============================

  const getStatusStyle = (status) => {
    switch (status) {
      case "Interview":
        return {
          color:
            "text-yellow-400",
          bg:
            "bg-yellow-400/10",
          border:
            "border-yellow-400/20",
          icon: FaClock,
        };

      case "Offer":
        return {
          color:
            "text-green-400",
          bg:
            "bg-green-400/10",
          border:
            "border-green-400/20",
          icon: FaCheckCircle,
        };

      case "Rejected":
        return {
          color:
            "text-red-400",
          bg:
            "bg-red-400/10",
          border:
            "border-red-400/20",
          icon: FaTimesCircle,
        };

      default:
        return {
          color:
            "text-blue-400",
          bg:
            "bg-blue-400/10",
          border:
            "border-blue-400/20",
          icon: FaBriefcase,
        };
    }
  };

  // ==============================
  // Companies
  // ==============================

  const companies = [
    ...new Set(
      jobs.map(
        (job) => job.company
      )
    ),
  ];

  // ==============================
  // Filter Jobs
  // ==============================

  const filteredJobs = jobs.filter(
    (job) => {
      const searchText =
        search.toLowerCase();

      const searchMatch =
        job.company
          ?.toLowerCase()
          .includes(searchText) ||
        job.role
          ?.toLowerCase()
          .includes(searchText) ||
        job.location
          ?.toLowerCase()
          .includes(searchText);

      const typeMatch =
        filter === "All" ||
        job.jobType === filter;

      const companyMatch =
        companyFilter === "All" ||
        job.company ===
          companyFilter;

      const savedMatch =
        !showSavedOnly ||
        savedJobs.includes(
          job.id
        );

      return (
        searchMatch &&
        typeMatch &&
        companyMatch &&
        savedMatch
      );
    }
  );

  return (
    <div className="space-y-8">

      {/* ================================= */}
      {/* HEADER */}
      {/* ================================= */}

      <div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

          <div>

            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5">

              <span className="h-2 w-2 rounded-full bg-blue-400" />

              <span className="text-xs font-semibold tracking-wider text-blue-400">
                CAREER OPPORTUNITIES
              </span>

            </div>

            <h1 className="text-3xl font-bold text-white md:text-4xl">
              Job Tracker
              <span className="ml-2">
                💼
              </span>
            </h1>

            <p className="mt-2 text-slate-400">
              Discover opportunities and manage your applications.
            </p>

          </div>

          {/* Saved Count */}

          <div
            className="
              flex items-center gap-3
              rounded-2xl
              border border-white/10
              bg-white/5
              px-5 py-3
            "
          >

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
              <FaHeart />
            </div>

            <div>

              <p className="text-xs text-slate-500">
                SAVED JOBS
              </p>

              <p className="text-lg font-bold text-white">
                {savedJobs.length}
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* ================================= */}
      {/* SEARCH & FILTERS */}
      {/* ================================= */}

      <div
        className="
          rounded-2xl
          border border-white/10
          bg-gradient-to-br
          from-white/5
          to-white/[0.02]
          p-5
          shadow-xl
        "
      >

        {/* Search */}

        <div className="relative">

          <FaSearch
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-slate-500
            "
          />

          <input
            type="text"
            placeholder="Search company, role or location..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="
              w-full
              rounded-xl
              border border-white/10
              bg-slate-900/80
              px-5 py-4 pl-12
              text-white
              outline-none
              transition
              placeholder:text-slate-500
              focus:border-blue-500
              focus:ring-2
              focus:ring-blue-500/10
            "
          />

        </div>

        {/* Filters */}

        <div className="mt-4 grid gap-3 sm:grid-cols-3">

          <select
            value={companyFilter}
            onChange={(e) =>
              setCompanyFilter(
                e.target.value
              )
            }
            className="
              rounded-xl
              border border-white/10
              bg-slate-900
              px-4 py-3
              text-white
              outline-none
              focus:border-blue-500
            "
          >

            <option value="All">
              All Companies
            </option>

            {companies.map(
              (company) => (
                <option
                  key={company}
                  value={company}
                >
                  {company}
                </option>
              )
            )}

          </select>

          <select
            value={filter}
            onChange={(e) =>
              setFilter(
                e.target.value
              )
            }
            className="
              rounded-xl
              border border-white/10
              bg-slate-900
              px-4 py-3
              text-white
              outline-none
              focus:border-blue-500
            "
          >

            <option value="All">
              All Job Types
            </option>

            <option value="Full-Time">
              Full-Time
            </option>

            <option value="Part-Time">
              Part-Time
            </option>

            <option value="Internship">
              Internship
            </option>

            <option value="Remote">
              Remote
            </option>

            <option value="Hybrid">
              Hybrid
            </option>

          </select>

          <button
            onClick={() =>
              setShowSavedOnly(
                !showSavedOnly
              )
            }
            className={`
              flex items-center
              justify-center gap-2
              rounded-xl
              border
              px-4 py-3
              font-semibold
              transition-all
              ${
                showSavedOnly
                  ? "border-red-500/30 bg-red-500 text-white shadow-lg shadow-red-500/10"
                  : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
              }
            `}
          >

            <FaHeart />

            {showSavedOnly
              ? "Showing Saved"
              : `Saved Jobs (${savedJobs.length})`}

          </button>

        </div>

      </div>

      {/* ================================= */}
      {/* JOB COUNT */}
      {/* ================================= */}

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-xl font-bold text-white">
            {showSavedOnly
              ? "Saved Jobs"
              : "Available Jobs"}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Find your next career opportunity
          </p>

        </div>

        <span
          className="
            rounded-full
            border border-white/10
            bg-white/5
            px-4 py-2
            text-sm
            text-slate-400
          "
        >
          {filteredJobs.length} jobs
        </span>

      </div>

      {/* ================================= */}
      {/* NO JOBS */}
      {/* ================================= */}

      {filteredJobs.length === 0 ? (

        <div
          className="
            rounded-3xl
            border border-white/10
            bg-white/5
            px-6 py-20
            text-center
          "
        >

          <div
            className="
              mx-auto
              flex h-20 w-20
              items-center justify-center
              rounded-2xl
              bg-white/5
              text-4xl
            "
          >
            {showSavedOnly
              ? "❤️"
              : "🔍"}
          </div>

          <h2 className="mt-5 text-xl font-bold text-white">

            {showSavedOnly
              ? "No saved jobs yet"
              : "No jobs found"}

          </h2>

          <p className="mx-auto mt-2 max-w-md text-slate-400">

            {showSavedOnly
              ? "Save interesting jobs and they will appear here."
              : "Try changing your search or filters."}

          </p>

        </div>

      ) : (

        /* ================================= */
        /* JOB CARDS */
        /* ================================= */

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {filteredJobs.map(
            (job) => {

              const isApplied =
                appliedJobs.includes(
                  job.id
                );

              const isSaved =
                savedJobs.includes(
                  job.id
                );

              const currentStatus =
                getApplicationStatus(
                  job.id
                );

              const statusStyle =
                getStatusStyle(
                  currentStatus
                );

              const StatusIcon =
                statusStyle.icon;

              return (
                <div
                  key={job.id}
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-3xl
                    border border-white/10
                    bg-gradient-to-br
                    from-slate-900
                    to-slate-950
                    p-6
                    shadow-xl
                    transition-all
                    duration-300
                    hover:-translate-y-2
                    hover:border-blue-500/30
                    hover:shadow-2xl
                  "
                >

                  {/* Top Glow */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      -right-10
                      -top-10
                      h-32
                      w-32
                      rounded-full
                      bg-blue-500/10
                      blur-3xl
                    "
                  />

                  {/* ================================= */}
                  {/* TOP */}
                  {/* ================================= */}

                  <div className="relative flex items-start justify-between">

                    <div
                      className="
                        flex h-14 w-14
                        items-center justify-center
                        rounded-2xl
                        border border-blue-500/20
                        bg-blue-500/10
                        text-2xl
                      "
                    >
                      🏢
                    </div>

                    <button
                      onClick={() =>
                        saveJob(job.id)
                      }
                      title={
                        isSaved
                          ? "Remove from saved jobs"
                          : "Save job"
                      }
                      className={`
                        flex h-11 w-11
                        items-center justify-center
                        rounded-xl
                        border
                        transition-all
                        duration-200
                        ${
                          isSaved
                            ? "border-red-500/20 bg-red-500/10 text-red-400"
                            : "border-white/10 bg-white/5 text-slate-400 hover:border-red-500/20 hover:bg-red-500/10 hover:text-red-400"
                        }
                      `}
                    >

                      <FaHeart
                        className={
                          isSaved
                            ? "scale-110"
                            : ""
                        }
                      />

                    </button>

                  </div>

                  {/* ================================= */}
                  {/* COMPANY */}
                  {/* ================================= */}

                  <div className="relative mt-5">

                    <h2 className="text-xl font-bold text-white">
                      {job.company}
                    </h2>

                    <h3 className="mt-1 font-semibold text-blue-400">
                      {job.role}
                    </h3>

                  </div>

                  {/* Description */}

                  <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-400">
                    {job.description}
                  </p>

                  {/* ================================= */}
                  {/* DETAILS */}
                  {/* ================================= */}

                  <div className="mt-5 space-y-3">

                    <div className="flex items-center gap-3 text-sm text-slate-300">

                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10">
                        <FaMapMarkerAlt className="text-blue-400" />
                      </span>

                      {job.location}

                    </div>

                    <div className="flex items-center gap-3 text-sm text-slate-300">

                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500/10">
                        <FaMoneyBillWave className="text-green-400" />
                      </span>

                      {job.salary}

                    </div>

                    <div className="flex items-center gap-3 text-sm text-slate-300">

                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10">
                        <FaBriefcase className="text-violet-400" />
                      </span>

                      {job.jobType}

                    </div>

                  </div>

                  {/* ================================= */}
                  {/* SKILLS */}
                  {/* ================================= */}

                  <div className="mt-5 flex flex-wrap gap-2">

                    {job.skills
                      ?.split(",")
                      .map(
                        (skill) => (
                          <span
                            key={skill}
                            className="
                              rounded-full
                              border
                              border-blue-500/10
                              bg-blue-500/10
                              px-3 py-1
                              text-xs
                              font-medium
                              text-blue-400
                            "
                          >
                            {skill.trim()}
                          </span>
                        )
                      )}

                  </div>

                  {/* ================================= */}
                  {/* STATUS BADGE */}
                  {/* ================================= */}

                  {isApplied && (
                    <div
                      className={`
                        mt-5
                        flex items-center gap-2
                        rounded-xl
                        border
                        ${statusStyle.border}
                        ${statusStyle.bg}
                        px-4 py-3
                      `}
                    >

                      <StatusIcon
                        className={
                          statusStyle.color
                        }
                      />

                      <div>

                        <p className="text-[10px] uppercase tracking-wider text-slate-500">
                          APPLICATION STATUS
                        </p>

                        <p
                          className={`text-sm font-semibold ${statusStyle.color}`}
                        >
                          {currentStatus}
                        </p>

                      </div>

                    </div>
                  )}

                  {/* ================================= */}
                  {/* ACTIONS */}
                  {/* ================================= */}

                  <div className="mt-5 flex gap-3">

                    <button
                      onClick={() =>
                        saveJob(job.id)
                      }
                      className={`
                        flex-1
                        rounded-xl
                        border
                        py-3
                        text-sm
                        font-semibold
                        transition-all
                        ${
                          isSaved
                            ? "border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20"
                            : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
                        }
                      `}
                    >

                      {isSaved
                        ? "❤️ Saved"
                        : "🤍 Save"}

                    </button>

                    <button
                      onClick={() =>
                        applyJob(
                          job.id,
                          job.applyLink
                        )
                      }
                      disabled={
                        isApplied
                      }
                      className={`
                        flex-1
                        rounded-xl
                        py-3
                        text-sm
                        font-semibold
                        text-white
                        transition-all
                        ${
                          isApplied
                            ? "cursor-default bg-green-600/80"
                            : "bg-blue-600 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/20"
                        }
                      `}
                    >

                      {isApplied
                        ? "✓ Applied"
                        : "Apply Now"}

                    </button>

                  </div>

                  {/* ================================= */}
                  {/* STATUS SELECTOR */}
                  {/* ================================= */}

                  {isApplied && (
                    <div className="mt-4">

                      <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-slate-500">
                        Update Status
                      </label>

                      <div className="relative">

                        <select
                          value={
                            currentStatus
                          }
                          onChange={(e) =>
                            updateStatus(
                              job.id,
                              e.target.value
                            )
                          }
                          className={`
                            w-full
                            appearance-none
                            rounded-xl
                            border
                            ${statusStyle.border}
                            ${statusStyle.bg}
                            px-4 py-3
                            pr-10
                            text-sm
                            font-semibold
                            ${statusStyle.color}
                            outline-none
                            transition
                            focus:ring-2
                            focus:ring-blue-500/20
                          `}
                        >

                          <option
                            value="Applied"
                            className="bg-slate-900 text-blue-400"
                          >
                            🔵 Applied
                          </option>

                          <option
                            value="Interview"
                            className="bg-slate-900 text-yellow-400"
                          >
                            🟡 Interview
                          </option>

                          <option
                            value="Offer"
                            className="bg-slate-900 text-green-400"
                          >
                            🟢 Offer
                          </option>

                          <option
                            value="Rejected"
                            className="bg-slate-900 text-red-400"
                          >
                            🔴 Rejected
                          </option>

                        </select>

                        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                          ▼
                        </span>

                      </div>

                    </div>
                  )}

                  {/* Last Date */}

                  {job.lastDate && (
                    <div className="mt-4 flex items-center justify-between">

                      <p className="text-xs text-slate-500">
                        Application deadline
                      </p>

                      <p className="text-xs font-medium text-slate-400">
                        {job.lastDate}
                      </p>

                    </div>
                  )}

                  {/* Apply Link */}

                  {job.applyLink && (
                    <button
                      onClick={() =>
                        window.open(
                          job.applyLink,
                          "_blank"
                        )
                      }
                      className="
                        mt-4
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        border
                        border-white/10
                        bg-transparent
                        py-2.5
                        text-xs
                        font-medium
                        text-slate-400
                        transition
                        hover:bg-white/5
                        hover:text-white
                      "
                    >

                      <FaExternalLinkAlt />

                      View Application Link

                    </button>
                  )}

                </div>
              );
            }
          )}

        </div>

      )}

    </div>
  );
}

export default JobTracker;