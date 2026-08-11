import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const [message, setMessage] = useState(
    location.state?.profileSuccess || ""
  );

  // ================= SUCCESS MESSAGE =================

  useEffect(() => {
    if (location.state?.profileSuccess) {
      setMessage(location.state.profileSuccess);

      const timer = setTimeout(() => {
        setMessage("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [location.state]);

  // ================= REFRESH USER DATA =================

  useEffect(() => {
    const storedUser = JSON.parse(
      localStorage.getItem("user")
    );

    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white px-4 sm:px-6 lg:px-8 py-10">

      <div className="max-w-6xl mx-auto">

        {/* ================= PROFILE HEADER ================= */}

        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 md:p-10 mb-8 shadow-xl">

          <div className="flex flex-col md:flex-row items-center gap-6">

            {/* Avatar */}
            <div className="w-32 h-32 rounded-full bg-white/20 border-4 border-white/30 flex items-center justify-center">

              <span className="text-5xl font-bold text-white">
                {user?.fullname
                  ? user.fullname
                      .charAt(0)
                      .toUpperCase()
                  : "U"}
              </span>

            </div>

            {/* User Info */}
            <div className="text-center md:text-left">

              <h1 className="text-3xl md:text-4xl font-bold">
                {user?.fullname || "User"}
              </h1>

              <p className="text-blue-100 text-lg mt-2">
                Full Stack Developer
              </p>

              <p className="text-blue-100 mt-2">
                {user?.email || "Email not available"}
              </p>

            </div>

          </div>

        </div>

        {/* ================= PERSONAL INFORMATION ================= */}

        <div className="mb-8">

          <h2 className="text-2xl font-bold mb-5">
            👤 Personal Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <Detail
              title="Email"
              value={user?.email}
            />

            <Detail
              title="Phone"
              value={user?.phone}
            />

            <Detail
              title="Location"
              value={user?.location}
            />

            <Detail
              title="Date of Birth"
              value={user?.dob}
            />

          </div>

        </div>

        {/* ================= EDUCATION ================= */}

        <div className="mb-8">

          <h2 className="text-2xl font-bold mb-5">
            🎓 Education
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <Detail
              title="College"
              value={user?.college}
            />

            <Detail
              title="Degree"
              value={user?.degree}
            />

            <Detail
              title="Graduation"
              value={user?.graduation}
            />

            <Detail
              title="CGPA"
              value={user?.cgpa}
            />

          </div>

        </div>

        {/* ================= SKILLS ================= */}

        <div className="mb-8">

          <h2 className="text-2xl font-bold mb-5">
            💻 Skills
          </h2>

          <div className="flex flex-wrap gap-3">

            {[
              "React",
              "Node.js",
              "Express",
              "MongoDB",
              "MySQL",
              "Python",
              "JavaScript",
              "Git",
            ].map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full"
              >
                {skill}
              </span>
            ))}

          </div>

        </div>

        {/* ================= CERTIFICATIONS ================= */}

        <div className="mb-8">

          <h2 className="text-2xl font-bold mb-5">
            🏆 Certifications
          </h2>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

            <ul className="space-y-3 text-slate-300">

              <li>🏅 AWS Cloud Practitioner</li>
              <li>🏅 Salesforce AI Associate</li>
              <li>🏅 Wipro TalentNext</li>
              <li>🏅 Python Full Stack Development</li>

            </ul>

          </div>

        </div>

        {/* ================= PROJECTS ================= */}

        <div className="mb-8">

          <h2 className="text-2xl font-bold mb-5">
            🚀 Projects
          </h2>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

            <ul className="space-y-3 text-slate-300">

              <li>🚀 AI Career Tracker</li>
              <li>📄 Resume Analyzer</li>
              <li>🎓 Student Grade Management System</li>
              <li>🌍 Tourism Management System</li>

            </ul>

          </div>

        </div>

        {/* ================= SOCIAL LINKS ================= */}

        <div className="mb-8">

          <h2 className="text-2xl font-bold mb-5">
            🔗 Social Links
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* GitHub */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

              <h3 className="text-blue-400 font-semibold text-lg">
                GitHub
              </h3>

              {user?.github ? (
                <a
                  href={user.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-3 text-slate-300 hover:text-blue-400 break-all transition"
                >
                  {user.github}
                </a>
              ) : (
                <p className="text-slate-500 mt-3">
                  Not Added
                </p>
              )}

            </div>

            {/* LinkedIn */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

              <h3 className="text-blue-400 font-semibold text-lg">
                LinkedIn
              </h3>

              {user?.linkedin ? (
                <a
                  href={user.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-3 text-slate-300 hover:text-blue-400 break-all transition"
                >
                  {user.linkedin}
                </a>
              ) : (
                <p className="text-slate-500 mt-3">
                  Not Added
                </p>
              )}

            </div>

          </div>

        </div>

        {/* ================= PROFILE COMPLETION ================= */}

        <div className="mb-8">

          <h2 className="text-2xl font-bold mb-5">
            📊 Profile Completion
          </h2>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

            <div className="flex justify-between mb-3">

              <span className="text-slate-300">
                Profile Completion
              </span>

              <span className="text-blue-400 font-bold">
                85%
              </span>

            </div>

            <div className="w-full bg-slate-800 rounded-full h-3">

              <div
                className="bg-gradient-to-r from-blue-500 to-indigo-500 h-3 rounded-full"
                style={{ width: "85%" }}
              />

            </div>

          </div>

        </div>

        {/* ================= BUTTONS ================= */}

        <div className="flex flex-col sm:flex-row gap-4">

          <button
            onClick={() =>
              navigate("/dashboard/edit-profile")
            }
            className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold py-3 rounded-xl transition"
          >
            ✏️ Edit Profile
          </button>

          <a
            href="/Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
          >
            <button
              type="button"
              className="w-full border border-slate-700 hover:bg-slate-800 text-slate-300 font-semibold py-3 rounded-xl transition"
            >
              📄 View Resume
            </button>
          </a>

        </div>

      </div>

      {/* ================= SUCCESS MESSAGE ================= */}

      {message && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999]">

          <div className="flex items-center gap-3 bg-green-600 text-white px-6 py-3 rounded-xl shadow-2xl">

            <span className="text-xl">
              ✅
            </span>

            <span className="font-semibold">
              {message}
            </span>

          </div>

        </div>
      )}

    </div>
  );
}

// ================= DETAIL COMPONENT =================

function Detail({ title, value }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

      <h3 className="text-blue-400 font-semibold text-lg">
        {title}
      </h3>

      <p className="text-slate-200 mt-3">
        {value || "Not Added"}
      </p>

    </div>
  );
}

export default Profile;