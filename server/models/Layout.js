// models/Layout.js

const mongoose = require("mongoose");

const layoutSchema = new mongoose.Schema({
  headerHTML: String,
  headerCSS: String,
  footerHTML: String,
  footerCSS: String,
});

module.exports = mongoose.model("Layout", layoutSchema);
