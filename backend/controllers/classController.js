const asyncHandler = require("express-async-handler");

// Import Model
const Class = require("../models/class");

exports.createClass = asyncHandler(async (req, res) => {
  const { title, status, lessons, images, address, role } = req.body;

  // Validation
  if (!title || !status || !lessons || !images || !address) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  if (req.user) {
    if (req.user.role == "instructor") {
      res.status(201);
      console.log("User is a instructor")

    } else {
      res.status(400);
      throw new Error("User is not a instructor");
    }
  } else {
    res.status(400);
    throw new Error("Not logged in!");
  }

  // Create class
  const newClass = await Class.create({
    title,
    status,
    lessons,
    images,
    address,
  });

  if (newClass) {
    res.status(201).json({
      _id: newClass._id,
      title: newClass.title,
      status: newClass.status,
      lessons: newClass.lessons,
      images: newClass.images,
      address: newClass.address,
    });
  } else {
    res.status(400);
    throw new Error("Invalid class data");
  }
});
