// models/Layout.js
import mongoose from "mongoose";

const layoutSchema = new mongoose.Schema({
  headerHTML: String,
  headerCSS: String,
  footerHTML: String,
  footerCSS: String,
});

export default mongoose.model("Layout", layoutSchema);
