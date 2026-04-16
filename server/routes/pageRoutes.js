const express = require("express");
const router = express.Router();
const Page = require("../models/Page");
const multer = require("multer");

/* ================= MULTER ================= */
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

/* ================= CREATE / UPDATE PAGE ================= */
router.post("/", upload.single("bannerImage"), async (req, res) => {
  try {
    const { title, slug, content } = req.body;

    let page = await Page.findOne({ slug });

    if (!page) {
      page = new Page({
        title,
        slug,
        content,
        bannerImage: req.file ? req.file.filename : "",
      });
    } else {
      // update existing
      page.title = title;
      page.content = content;

      if (req.file) {
        page.bannerImage = `/uploads/${req.file.filename}`;
      }
    }

    await page.save();

    res.json({
      success: true,
      message: "Page saved successfully",
      data: page,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ================= GET PAGE BY SLUG ================= */
router.get("/:slug", async (req, res) => {
  try {
    const page = await Page.findOne({ slug: req.params.slug });

    if (!page) {
      return res.status(404).json({ message: "Page not found" });
    }

    res.json(page);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
