const express = require("express");
const Layout = require("../models/Layout"); // make sure this is also CommonJS

const router = express.Router();

// GET
router.get("/", async (req, res) => {
  const layout = await Layout.findOne();
  res.json(layout || {});
});

router.post("/", async (req, res) => {
  try {
    const { headerHTML, headerCSS, footerHTML, footerCSS } = req.body;

    const layout = await Layout.findOneAndUpdate(
      {}, // single layout doc
      {
        $set: {
          headerHTML,
          headerCSS,
          footerHTML,
          footerCSS,
        },
      },
      {
        new: true,
        upsert: true,
      },
    );

    res.json({ message: "Layout Saved ✅", layout });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; // ✅ IMPORTANT
