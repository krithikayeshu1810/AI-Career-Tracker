import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    location: "",
    dob: "",
    college: "",
    degree: "",
    graduation: "",
    cgpa: "",
    github: "",
    linkedin: "",
  });

  const [loading, setLoading] = useState(false);

  // ================= LOAD USER PROFILE =================

  useEffect(() => {
    if (!user?.id) {
      navigate("/login");
      return;
    }

    const loadProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/profile/${user.id}`
        );

        const profile = response.data.user;

        setFormData({
          fullname: profile?.fullname || "",
          email: profile?.email || "",
          phone: profile?.phone || "",
          location: profile?.location || "",
          dob: profile?.dob
            ? profile.dob.substring(0, 10)
            : "",
          college: profile?.college || "",
          degree: profile?.degree || "",
          graduation: profile?.graduation || "",
          cgpa: profile?.cgpa || "",
          github: profile?.github || "",
          linkedin: profile?.linkedin || "",
        });

        localStorage.setItem(
          "user",
          JSON.stringify(profile)
        );

        setUser(profile);

      } catch (error) {
        console.log("Profile Load Error:", error);

        alert(
          error.response?.data?.message ||
            "Unable to load profile."
        );
      }
    };

    loadProfile();
  }, [navigate, user?.id]);

  // ================= HANDLE INPUT =================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ================= SAVE PROFILE =================

  const handleSave = async () => {
    if (!user?.id) {
      navigate("/login");
      return;
    }

    if (!formData.fullname || !formData.email) {
      alert("Full Name and Email are required.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.put(
        "http://localhost:5000/api/profile/update",
        {
          id: user.id,
          fullname: formData.fullname,
          email: formData.email,
          phone: formData.phone,
          location: formData.location,
          dob: formData.dob || null,
          college: formData.college,
          degree: formData.degree,
          graduation: formData.graduation,
          cgpa: formData.cgpa,
          github: formData.github,
          linkedin: formData.linkedin,
        }
      );

      const updatedUser = response.data.user;

      // Save updated user
      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );

      setUser(updatedUser);

      // IMPORTANT:
      // No alert here.
      navigate("/dashboard/profile", {
        state: {
          profileSuccess:
            "Profile updated successfully! ✅",
        },
      });

    } catch (error) {
      console.log("Save Profile Error:", error);

      alert(
        error.response?.data?.message ||
          "Unable to update profile."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white px-4 sm:px-6 lg:px-8 py-10">

      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-8">

          <h1 className="text-3xl md:text-4xl font-bold text-white">
            ✏️ Edit Profile
          </h1>

          <p className="text-slate-400 mt-2">
            Update your personal and professional information.
          </p>

        </div>

        {/* Form Card */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Full Name
              </label>

              <input
                type="text"
                name="fullname"
                placeholder="Enter Full Name"
                value={formData.fullname}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Phone
              </label>

              <input
                type="text"
                name="phone"
                placeholder="Enter Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Location
              </label>

              <input
                type="text"
                name="location"
                placeholder="Enter Location"
                value={formData.location}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {/* DOB */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Date of Birth
              </label>

              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {/* College */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                College
              </label>

              <input
                type="text"
                name="college"
                placeholder="Enter College"
                value={formData.college}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {/* Degree */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Degree
              </label>

              <input
                type="text"
                name="degree"
                placeholder="Enter Degree"
                value={formData.degree}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {/* Graduation */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Graduation Year
              </label>

              <input
                type="text"
                name="graduation"
                placeholder="Example: 2027"
                value={formData.graduation}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {/* CGPA */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                CGPA
              </label>

              <input
                type="text"
                name="cgpa"
                placeholder="Example: 8.7"
                value={formData.cgpa}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {/* GitHub */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                GitHub Profile
              </label>

              <input
                type="text"
                name="github"
                placeholder="https://github.com/username"
                value={formData.github}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {/* LinkedIn */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                LinkedIn Profile
              </label>

              <input
                type="text"
                name="linkedin"
                placeholder="https://linkedin.com/in/username"
                value={formData.linkedin}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">

            <button
              onClick={handleSave}
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition"
            >
              {loading
                ? "Saving..."
                : "💾 Save Profile"}
            </button>

            <button
              onClick={() =>
                navigate("/dashboard/profile")
              }
              disabled={loading}
              className="sm:w-40 border border-slate-700 hover:bg-slate-800 text-slate-300 py-3 rounded-xl transition"
            >
              Cancel
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default EditProfile;