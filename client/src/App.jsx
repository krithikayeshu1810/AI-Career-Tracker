import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import DashboardHome from "./pages/DashboardHome";

import JobTracker from "./pages/JobTracker.jsx";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import CareerPath from "./pages/CareerPath";
import Learning from "./pages/Learning";

import Analytics from "./pages/Analytics";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Settings from "./pages/Settings";

import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>

      {/* Landing Page */}

      <Route
        path="/"
        element={<Home />}
      />

      {/* Authentication */}

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      {/* Dashboard */}

      <Route
        path="/dashboard"
        element={<Dashboard />}
      >

        {/* Dashboard Home */}

        <Route
          index
          element={<DashboardHome />}
        />

        {/* Job Tracker */}

        <Route
          path="jobs"
          element={<JobTracker />}
        />

        {/* Resume Analyzer */}

        <Route
          path="resume"
          element={<ResumeAnalyzer />}
        />

        {/* Career Path */}

        <Route
          path="career"
          element={<CareerPath />}
        />

        {/* Learning */}

        <Route
          path="learning/:path"
          element={<Learning />}
        />

        {/* Analytics */}

        <Route
          path="analytics"
          element={<Analytics />}
        />

        {/* Profile */}

        <Route
          path="profile"
          element={<Profile />}
        />

        {/* Edit Profile */}

        <Route
          path="edit-profile"
          element={<EditProfile />}
        />

        {/* Settings */}

        <Route
          path="settings"
          element={<Settings />}
        />

      </Route>

      {/* 404 */}

      <Route
        path="*"
        element={<NotFound />}
      />

    </Routes>
  );
}

export default App;