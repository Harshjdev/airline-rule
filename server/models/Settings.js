const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema({
  logo: String,
  phone: String, // ✅ ADD THIS
});

module.exports = mongoose.model("Setting", settingSchema);
