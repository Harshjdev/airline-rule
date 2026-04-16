// models/SeoSettings.js
const mongoose = require("mongoose");

const seoSchema = new mongoose.Schema({
  headScripts: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("SeoSettings", seoSchema);
