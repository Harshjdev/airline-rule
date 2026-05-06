const express = require("express");
const router = express.Router();

const Banner = require("../models/Banner");
const upload = require("../middleware/bannerUpload");


// ================= CREATE =================
router.post(
  "/",
  upload.single("image"),
  async (req, res) => {
    try {
      const banner = await Banner.create({
        title: req.body.title,
        link: req.body.link,
        image: req.file.filename,
      });

      res.json(banner);
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }
);


// ================= GET ALL =================
router.get("/", async (req, res) => {
  try {
    const banners = await Banner.find().sort({
      createdAt: -1,
    });

    res.json(banners);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});


// ================= DELETE =================
router.delete("/:id", async (req, res) => {
  try {
    await Banner.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;