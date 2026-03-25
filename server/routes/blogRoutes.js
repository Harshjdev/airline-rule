const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");
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
   CREATE BLOG WITH IMAGE
============================== */

router.post("/", upload.single("bannerImage"), async (req, res) => {
  try {
    const { title, slug, description, content, category, quickLinks } =
      req.body;
    const blog = new Blog({
      title,
      slug,
      description,
      content,
      category,
      quickLinks: quickLinks ? JSON.parse(quickLinks) : [],
      bannerImage: req.file ? `/uploads/${req.file.filename}` : "",
    });

    await blog.save();

    res.json({
      success: true,
      message: "Blog created successfully",
      data: blog,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

/* ==============================
   GET ALL BLOGS
============================== */

router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ==============================
   GET BLOG BY SLUG
============================== */

router.get("/:slug", async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const recommended = await Blog.find({
      slug: { $ne: req.params.slug },
    }).limit(5);

    res.json({ blog, recommended });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
