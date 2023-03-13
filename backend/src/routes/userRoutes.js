const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware")
const { uploadImage } = require("../middlewares/multer")

// User signup route
router.post("/signup", userController.signupUser);

// User login route
router.post("/login", userController.loginUser);

// Update user profile
router.post("/update", protect,uploadImage.single('avatar'), userController.updateUser);

module.exports = router;
