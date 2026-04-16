// routes/seoRoutes.js
const express = require("express");
const router = express.Router();
const SeoSettings = require("../models/Seo");

// Save / Update
router.post("/head", async (req, res) => {
  try {
    const { headScripts } = req.body;

    let settings = await SeoSettings.findOne();

    if (!settings) {
      settings = new SeoSettings({ headScripts });
    } else {
      settings.headScripts = headScripts;
    }

    await settings.save();

    res.json({ success: true, data: settings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Get
router.get("/head", async (req, res) => {
  const settings = await SeoSettings.findOne();
  res.json({ success: true, data: settings });
});

module.exports = router;
