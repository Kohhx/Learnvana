const express = require("express")
const router = express.Router();
const classController = require("../controllers/classController")
const { protect } = require("../middlewares/authMiddleware")

// create new class route
// to use req.user in middle ware, you have to go through middleware { protect } and check if
// req.user exist, only after, can you use req.user globally
router.post('/create', protect, classController.createClass)


module.exports = router;
