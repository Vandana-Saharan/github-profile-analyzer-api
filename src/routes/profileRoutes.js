const express = require("express");

const {
  analyzeProfile,
  getAllProfiles,
  getProfileByUsername,
} = require("../controllers/profileController");

const router = express.Router();

router.post("/analyze", analyzeProfile);
router.get("/", getAllProfiles);
router.get("/:username", getProfileByUsername);

module.exports = router;