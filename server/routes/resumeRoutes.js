const express = require("express");
const multer = require("multer");

const {
  analyzeResume,
} = require("../controllers/resumeController");

const router = express.Router();

// ==========================================
// Multer Upload Configuration
// ==========================================

const upload = multer({
  dest: "uploads/",

  limits: {
    fileSize: 5 * 1024 * 1024, // Maximum 5 MB
  },

  fileFilter: (req, file, cb) => {
    // Allow PDF files only
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed."));
    }
  },
});

// ==========================================
// AI Resume Analysis Route
// ==========================================

router.post(
  "/analyze",

  // Upload one PDF with field name "resume"
  upload.single("resume"),

  // Check uploaded file
  (req, res, next) => {
    console.log("=================================");
    console.log("✅ Resume API Hit");

    if (req.file) {
      console.log("📄 File:", req.file.originalname);
      console.log("📦 Size:", req.file.size);
      console.log("📁 Path:", req.file.path);
      console.log("📌 Type:", req.file.mimetype);
    } else {
      console.log("❌ No resume file received");
    }

    console.log("=================================");

    next();
  },

  // Send PDF to AI controller
  analyzeResume
);

// ==========================================
// Upload / Multer Error Handler
// ==========================================

router.use((err, req, res, next) => {
  console.error("❌ Resume Upload Error:", err.message);

  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        message: "Resume file must be smaller than 5 MB.",
      });
    }

    return res.status(400).json({
      message: err.message,
    });
  }

  if (err.message === "Only PDF files are allowed.") {
    return res.status(400).json({
      message: "Only PDF files are allowed.",
    });
  }

  return res.status(500).json({
    message: "Unable to upload resume.",
  });
});

module.exports = router;