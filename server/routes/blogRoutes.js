const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

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
   UPDATE BLOG
============================== */

router.put("/:id", upload.single("bannerImage"), async (req, res) => {
  try {
    const { title, slug, description, content, category, quickLinks } =
      req.body;

    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Update fields
    blog.title = title || blog.title;
    blog.slug = slug || blog.slug;
    blog.description = description || blog.description;
    blog.content = content || blog.content;
    blog.category = category || blog.category;

    // Handle quickLinks
    blog.quickLinks = quickLinks ? JSON.parse(quickLinks) : blog.quickLinks;

    if (req.file) {
      // Delete old image
      if (blog.bannerImage) {
        const oldPath = path.join(__dirname, "..", blog.bannerImage);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }

      blog.bannerImage = `/uploads/${req.file.filename}`;
    }

    await blog.save();

    res.json({
      success: true,
      message: "Blog updated successfully",
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
   DELETE BLOG
============================== */

router.delete("/:id", async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
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
