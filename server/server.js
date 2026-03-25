const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

/* ==============================
   ROUTES IMPORT
============================== */
const settingsRoutes = require("./routes/settingRoutes");
const blogRoutes = require("./routes/blogRoutes");
const pageRoutes = require("./routes/pageRoutes");

/* ==============================
   INIT APP
============================== */
const app = express();

/* ==============================
   MIDDLEWARE
============================== */

// ✅ CORS CONFIG (more flexible for production)
const allowedOrigins = [
  "http://localhost:5173",
  "https://free-zaer.vercel.app",
  "https://radivoninfra.com",
  "https://usaflightservices.com",
  "https://www.radivoninfra.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow Postman / server requests

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("❌ Blocked by CORS:", origin);
        callback(null, false); // don't crash server
      }
    },
    credentials: true,
  })
);

// ✅ BODY PARSER
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// ✅ STATIC FILES
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ==============================
   ROUTES
============================== */

// Health check (IMPORTANT for Render)
app.get("/", (req, res) => {
  res.status(200).send("Backend is running 🚀");
});

// APIs
app.use("/api/settings", settingsRoutes);
app.use("/api/pages", pageRoutes);
app.use("/api/blogs", blogRoutes);

/* ==============================
   GLOBAL ERROR HANDLER
============================== */
app.use((err, req, res, next) => {
  console.error("🔥 Error:", err);

  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

/* ==============================
   MONGODB CONNECTION
============================== */

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      // These options improve stability
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB Connected");

  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);

    // retry after 5 sec (important for Render cold starts)
    setTimeout(connectDB, 5000);
  }
};

/* ==============================
   START SERVER
============================== */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// connect DB AFTER server starts
connectDB();