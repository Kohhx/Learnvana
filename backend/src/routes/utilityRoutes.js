const express = require("express");
const router = express.Router();
const utilityController = require("../controllers/utilityController");
const { uploadImage } = require("../middlewares/multer");
const { protect } = require("../middlewares/authMiddleware");

// Upload photo to cloudinary
router.post(
  "/uploadphoto",
  protect,
  uploadImage.single("picture"),
  utilityController.editorJSUploadPhoto
);

// Delete photo from cloudinary
router.post(
  "/deletephoto",
  protect,
  utilityController.editorJSDeletePhoto
);

module.exports = router;
