const express = require("express");
const router = express.Router();
const utilityController = require("../controllers/utilityController");
const { uploadImage } = require("../middlewares/multer");
const { protect } = require("../middlewares/authMiddleware");

// User signup route
router.post(
  "/uploadphoto",
  protect,
  uploadImage.single("picture"),
  utilityController.editorJSUploadPhoto
);

module.exports = router;
