const mongoose = require("mongoose");

const layoutSchema = new mongoose.Schema({
  metaTitle: String,
  metaDescription: String,

  headerHTML: String,   // ✅ will contain SEO + scripts + header
  footerHTML: String,
});

module.exports = mongoose.model("Layout", layoutSchema);