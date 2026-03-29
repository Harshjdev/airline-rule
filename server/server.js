const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const settingsRoutes = require("./routes/settingRoutes");
require("dotenv").config();

/* ==============================
   ROUTES IMPORT
============================== */

// ✅ NEW BLOG ROUTES
const blogRoutes = require("./routes/blogRoutes");
const pageRoutes = require("./routes/pageRoutes");
const layoutRoutes = require("./routes/LayoutRoutes");

/* ==============================
   INIT APP
============================== */

const app = express();

/* ==============================
   MIDDLEWARE
============================== */

// ✅ CORS CONFIG
const allowedOrigins = [
  "http://localhost:5173",
  "https://free-zaer.vercel.app",
  "https://usaflightservices.com",
  "https://radivoninfra.com",
  "https://www.radivoninfra.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow server-to-server or postman (no origin)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("Blocked by CORS:", origin);
        callback(new Error("CORS not allowed"));
      }
    },
    credentials: true,
  }),
);

// ✅ BODY PARSER
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ STATIC FOLDER (IMAGES)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/settings", settingsRoutes);
app.use("/api/pages", pageRoutes);
app.use("/api/layout", layoutRoutes);
/* ==============================
   ROUTES
============================== */

// Health check
app.get("/", (req, res) => {
  res.send("airline backend is running 🚀");
});

// ✅ BLOG APIs
app.use("/api/blogs", blogRoutes);

/* ==============================
   GLOBAL ERROR HANDLER
============================== */

app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({
    success: false,
    message: err.message || "Server Error",
  });
});

/* ==============================
   MONGODB CONNECTION
============================== */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Atlas Connected ✅");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} 🚀`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
