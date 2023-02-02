const express = require("express")
const router = express.Router();
const classController = require("../controllers/classController");
const { protect } = require("../middlewares/authMiddleware")

// User add pending user routes route
router.post('/add', classController.addPendingUserToClass)


modules.export = router;
