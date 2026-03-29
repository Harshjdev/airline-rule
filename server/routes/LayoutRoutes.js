// routes/layout.js
import express from "express";
import Layout from "../models/Layout.js";

const router = express.Router();

// GET layout
router.get("/", async (req, res) => {
  const layout = await Layout.findOne();
  res.json(layout || {});
});

// SAVE layout
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

export default router;
