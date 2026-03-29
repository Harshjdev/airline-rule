const express = require("express");
const Layout = require("../models/Layout"); // make sure this is also CommonJS

const router = express.Router();

// GET
router.get("/", async (req, res) => {
  const layout = await Layout.findOne();
  res.json(layout || {});
});

// POST
router.post("/", async (req, res) => {
  const { headerHTML, headerCSS, footerHTML, footerCSS } = req.body;

  let layout = await Layout.findOne();

  if (layout) {
    layout.headerHTML = headerHTML;
    layout.headerCSS = headerCSS;
    layout.footerHTML = footerHTML;
    layout.footerCSS = footerCSS;
    await layout.save();
  } else {
    layout = await Layout.create({
      headerHTML,
      headerCSS,
      footerHTML,
      footerCSS,
    });
  }

  res.json({ message: "Layout Saved ✅" });
});

module.exports = router; // ✅ IMPORTANT
