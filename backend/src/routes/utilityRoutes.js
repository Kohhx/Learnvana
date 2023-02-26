const express = require("express");
const router = express.Router();
const utilityController = require("../controllers/utilityController");
const { uploadImage, uploadAllFile, uploadVideo } = require("../middlewares/multer");
const { protect } = require("../middlewares/authMiddleware");

// Upload photo to cloudinary
router.post(
  "/uploadimage",
  protect,
  uploadImage.single("image"),
  utilityController.editorJSUploadPhoto
);

// Upload video to cloudinary
router.post(
  "/uploadvideo",
  protect,
  uploadVideo.single("video"),
  utilityController.editorJSUploadVideo
);

// Upload pdf or zip to cloudinary
router.post(
  "/uploadfile",
  protect,
  uploadAllFile.single("file"),
  utilityController.editorJSUploadFile
);

// Delete File from cloudinary
router.post("/deletefile", protect, utilityController.editorJSDeleteFile);

module.exports = router;
