import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
} from "react-icons/fa";
import { registerUser } from "../services/authService";

function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async () => {
    // Check required fields
    if (
      !user.fullname ||
      !user.email ||
      !user.password ||
      !user.confirmPassword
    ) {
      alert("Please fill all fields");
      return;
    }

    // Check password
    if (user.password !== user.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await registerUser({
        fullname: user.fullname,
        email: user.email,
        password: user.password,
      });

      alert(response.data.message);

      navigate("/login");

    } catch (error) {
      console.log("Registration Error:", error);

      if (error.response) {
        alert(
          error.response.data.message ||
            JSON.stringify(error.response.data)
        );
      } else {
        alert(error.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-md">

        {/* Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">

          {/* Header */}
          <div className="text-center mb-8">

            <div className="text-5xl mb-4">
              🚀
            </div>

            <h1 className="text-3xl font-bold text-white">
              Create Account
            </h1>

            <p className="text-slate-400 mt-2">
              Join CareerPilot and start your career journey.
            </p>

          </div>

          {/* Full Name */}
          <div className="mb-5">

            <label className="block text-sm font-medium text-slate-300 mb-2">
              Full Name
            </label>

            <div className="relative">

              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400" />

              <input
                type="text"
                name="fullname"
                placeholder="Enter your full name"
                value={user.fullname}
                onChange={handleChange}
                className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-5 py-3 pl-11 text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
              />

            </div>

          </div>

          {/* Email */}
          <div className="mb-5">

            <label className="block text-sm font-medium text-slate-300 mb-2">
              Email Address
            </label>

            <div className="relative">

              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400" />

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={user.email}
                onChange={handleChange}
                className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-5 py-3 pl-11 text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
              />

            </div>

          </div>

          {/* Password */}
          <div className="mb-5">

            <label className="block text-sm font-medium text-slate-300 mb-2">
              Password
            </label>

            <div className="relative">

              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400" />

              <input
                type="password"
                name="password"
                placeholder="Create a password"
                value={user.password}
                onChange={handleChange}
                className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-5 py-3 pl-11 pr-11 text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
              />

              <FaEye className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" />

            </div>

          </div>

          {/* Confirm Password */}
          <div className="mb-6">

            <label className="block text-sm font-medium text-slate-300 mb-2">
              Confirm Password
            </label>

            <div className="relative">

              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400" />

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={user.confirmPassword}
                onChange={handleChange}
                className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-5 py-3 pl-11 pr-11 text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
              />

              <FaEye className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" />

            </div>

          </div>

          {/* Register Button */}
          <button
            onClick={handleRegister}
            className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/20 transition transform hover:-translate-y-0.5"
          >
            Create Account 🚀
          </button>

          {/* Login */}
          <div className="text-center mt-7">

            <p className="text-slate-400">
              Already have an account?
            </p>

            <Link
              to="/login"
              className="inline-block mt-2 text-blue-400 hover:text-blue-300 font-semibold"
            >
              Back to Login
            </Link>

          </div>

        </div>

        {/* Bottom text */}
        <p className="text-center text-slate-600 text-sm mt-6">
          © 2026 CareerPilot. All rights reserved.
        </p>

      </div>

    </div>
  );
}

export default Register;