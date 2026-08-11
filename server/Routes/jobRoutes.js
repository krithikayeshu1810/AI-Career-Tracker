const express = require("express");

const router = express.Router();

const {
  getJobs,
  addJob,
  deleteJob,
  updateJob,
  applyJob,
  getUserApplications,
  getDashboardStats,
  updateApplicationStatus,
} = require("../controllers/jobController");

// ================= JOB ROUTES =================

router.get("/", getJobs);

router.post("/", addJob);

router.put("/:id", updateJob);

router.delete("/:id", deleteJob);

// ================= APPLICATION ROUTES =================

// Apply for a job
router.post("/apply", applyJob);

// Get user's applications
router.get(
  "/applications/:userId",
  getUserApplications
);

// Dashboard statistics
router.get(
  "/stats/:userId",
  getDashboardStats
);

// Change application status
router.put(
  "/applications/:applicationId/status",
  updateApplicationStatus
);

module.exports = router;