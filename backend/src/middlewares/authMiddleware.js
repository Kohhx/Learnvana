const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/user");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Token",decoded.id)
      // Get user from token
      req.user = await User.findById(decoded.id).select("-password");
      console.log("Req user",req.user)
      next();
    } catch (error) {
      console.log("aaa")
      console.log(error);
      res.status(401);
      throw new Error("Not authorized");
    }
  }
  // console.log("bbb")
  // if (!token) {
  //   console.log("jijij")
  //   res.status(401);
  //   throw new Error("Not authorized");
  // }
});

module.exports = { protect };
