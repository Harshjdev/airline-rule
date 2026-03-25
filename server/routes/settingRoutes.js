const express = require("express");
const router = express.Router();
const Setting = require("../models/Settings");
const multer = require("multer");
const path = require("path");

/* ==============================
   MULTER CONFIG
============================== */

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname.replace(/\s/g, "-");
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

/* ==============================
   GET SETTINGS
============================== */

router.get("/", async (req, res) => {
  try {
    const setting = await Setting.findOne();
    res.json(setting || {});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ==============================
   UPLOAD / UPDATE LOGO
============================== */

router.post("/logo", upload.single("logo"), async (req, res) => {
  try {
    let setting = await Setting.findOne();

    if (!setting) {
      setting = new Setting({
        logo: req.file ? `/uploads/${req.file.filename}` : "",
      });
    } else {
      if (req.file) {
        setting.logo = `/uploads/${req.file.filename}`;
      }
    }

    await setting.save();

    res.json({
      success: true,
      message: "Logo updated",
      data: setting,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.post("/phone", async (req, res) => {
  try {
    let setting = await Setting.findOne();

    if (!setting) {
      setting = new Setting({
        phone: req.body.phone || "",
      });
    } else {
      setting.phone = req.body.phone || setting.phone;
    }

    await setting.save();

    res.json({
      success: true,
      message: "Phone updated",
      data: setting,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
