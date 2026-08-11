const express = require("express");

const router = express.Router();

const {
  updateProfile,
  getProfile,
} = require("../controllers/profileController");

router.put("/update", updateProfile);

router.get("/:id", getProfile);

module.exports = router;