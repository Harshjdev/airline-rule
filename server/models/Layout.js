// models/Layout.js

const mongoose = require("mongoose");

const layoutSchema = new mongoose.Schema({
  metaTitle: String,
  metaDescription: String,

  headerHTML: String,
  footerHTML: String,
});

module.exports = mongoose.model("Layout", layoutSchema);
