const express = require("express");
const cors = require("cors");
require("dotenv").config();

// ================== MySQL Connection ==================
const db = require("./config/db");

// ================== Routes ==================
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const profileRoutes = require("./routes/profileRoutes");

// ================== App ==================
const app = express();

// ================== Middleware ==================
app.use(cors());
app.use(express.json());

// ================== API Routes ==================

// Authentication
app.use("/api/auth", authRoutes);

// Job Tracker
app.use("/api/jobs", jobRoutes);

// Resume Analyzer
app.use("/api/resume", resumeRoutes);

// Profile
app.use("/api/profile", profileRoutes);

// ================== Test Route ==================

app.get("/", (req, res) => {
  res.send("🚀 CareerPilot Backend is Running...");
});

// ================== Port ==================

const PORT = process.env.PORT || 5000;

// ================== Start Server ==================

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});