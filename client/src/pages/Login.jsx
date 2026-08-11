import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaEye,
} from "react-icons/fa";
import { loginUser } from "../services/authService";

function Login() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    if (!user.email || !user.password) {
      alert("Please enter email and password");
      return;
    }

    try {
      const response = await loginUser(user);

      console.log("Login Response:", response.data);

      // Save JWT token
      localStorage.setItem(
        "token",
        response.data.token
      );

      // Save logged-in user's information
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      // Go to dashboard with success message
      navigate("/dashboard", {
        state: {
          loginSuccess: "Login successful! 🎉",
        },
      });

    } catch (error) {
      console.log("Login Error:", error);

      if (error.response) {
        alert(
          error.response.data.message ||
            "Login failed"
        );
      } else {
        alert("Unable to connect to server.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 flex items-center justify-center px-4">

      <div className="w-full max-w-md">

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">

          {/* Header */}
          <div className="text-center mb-8">

            <div className="text-5xl mb-4">
              🚀
            </div>

            <h1 className="text-3xl font-bold text-white">
              Welcome Back
            </h1>

            <p className="text-slate-400 mt-2">
              Login to continue your CareerPilot journey.
            </p>

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
          <div className="mb-6">

            <label className="block text-sm font-medium text-slate-300 mb-2">
              Password
            </label>

            <div className="relative">

              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400" />

              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={user.password}
                onChange={handleChange}
                className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-5 py-3 pl-11 pr-11 text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
              />

              <FaEye className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" />

            </div>

          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/20 transition transform hover:-translate-y-0.5"
          >
            Login
          </button>

          {/* Register */}
          <div className="text-center mt-7">

            <p className="text-slate-400">
              Don't have an account?
            </p>

            <Link
              to="/register"
              className="inline-block mt-2 text-blue-400 hover:text-blue-300 font-semibold"
            >
              Create Account 🚀
            </Link>

          </div>

        </div>

        <p className="text-center text-slate-600 text-sm mt-6">
          © 2026 CareerPilot. All rights reserved.
        </p>

      </div>

    </div>
  );
}

export default Login;