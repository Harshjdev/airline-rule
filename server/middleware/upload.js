const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");

const storage = new GridFsStorage({
  url: process.env.MONGO_URI, // your MongoDB Atlas URL
  file: (req, file) => {
    return {
      filename: Date.now() + "-" + file.originalname,
      bucketName: "uploads", // collection name
    };
  },
});

const upload = multer({ storage });

module.exports = upload;
