const mongoose = require("mongoose");

const pageSchema = new mongoose.Schema(
  {
    title: String,
    slug: { type: String, unique: true }, // cancellation-policy
    bannerImage: String,
    content: String, // HTML (ReactQuill)
  },
  { timestamps: true },
);

module.exports = mongoose.model("Page", pageSchema);
