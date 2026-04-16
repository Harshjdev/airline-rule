const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");
const multer = require("multer");
const mongoose = require("mongoose");

const storage = multer.memoryStorage();
const upload = multer({ storage });
/* ==============================
   MULTER CONFIG
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

router.get("/image/:filename", async (req, res) => {
  try {
    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: "uploads",
    });

    const stream = bucket.openDownloadStreamByName(req.params.filename);

    stream.pipe(res);

    stream.on("error", () => {
      res.status(404).json({ message: "Image not found" });
    });
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

    let filename = "";

    if (req.file) {
      const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: "uploads",
      });

      const uniqueName =
        Date.now() + "-" + req.file.originalname.replace(/\s/g, "-");

      const uploadStream = bucket.openUploadStream(uniqueName);

      uploadStream.end(req.file.buffer);

      filename = uniqueName;
    }

    const blog = new Blog({
      title,
      slug,
      description,
      content,
      category,
      quickLinks: quickLinks ? JSON.parse(quickLinks) : [],
      bannerImage: filename,
    });

    await blog.save();

    res.json({
      success: true,
      message: "Blog created successfully",
      data: blog,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
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

    blog.title = title || blog.title;
    blog.slug = slug || blog.slug;
    blog.description = description || blog.description;
    blog.content = content || blog.content;
    blog.category = category || blog.category;
    blog.quickLinks = quickLinks ? JSON.parse(quickLinks) : blog.quickLinks;

    // ✅ FIX: Upload image to GridFS
    if (req.file) {
      const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: "uploads",
      });

      const uniqueName =
        Date.now() + "-" + req.file.originalname.replace(/\s/g, "-");

      const uploadStream = bucket.openUploadStream(uniqueName);

      uploadStream.end(req.file.buffer);

      blog.bannerImage = uniqueName;
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
