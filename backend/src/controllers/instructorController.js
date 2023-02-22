const asyncHandler = require("express-async-handler");
const validation = require("../utility/validation");
const remove = require("../utility/delete");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Import Model
const Student = require("../models/student");
const Instructor = require("../models/instructor");
const Class = require("../models/class");
const User = require("../models/user");

// @desc create a new instructor
// @route /api/instructors/create
// @access private
exports.createInstructor = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(400);
    throw new Error("User not logged in");
  }

  if (!user.role === "instructor") {
    res.status(400);
    throw new Error("Only instructor account can create instructor profile");
  }

  if (user.role === "instructor" && user.instructorprofile) {
    res.status(400);
    throw new Error("Instructor account can only create 1 instructor profile");
  }

  const {
    first_name,
    last_name,
    age,
    gender,
    email,
    contact,
    avatar,
    experience,
  } = req.body;

  if (!first_name || !last_name || !age || !gender) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  const instructor = await Instructor.create({
    first_name,
    last_name,
    age,
    gender,
    email,
    experience,
    contact: contact || null,
    avatar: avatar || null,
  });

  instructor.user = user;
  await instructor.save();

  user.instructorprofile = instructor;
  await user.save();

  res.status(200).json({
    _id: instructor._id,
    first_name: instructor.first_name,
    last_name: instructor.last_name,
    age: instructor.age,
    gender: instructor.gender,
    email: instructor.email,
    contact: instructor.contact,
    avatar: instructor.avatar,
    experience: instructor.experience,
  });
});

// @desc Update instructor profile
// @route /api/instructors/:instructorId/update
// @access private
exports.updateInstructorProfile = asyncHandler(async (req, res, next) => {
  const { instructorId } = req.params;

  const { first_name, last_name, age, gender, email, contact, experience } =
    req.body;

  const { file } = req;

  const user = await User.findById(req.user.id);

  const instructorFound = await Instructor.findById(instructorId);

  // Validate
  validation.validateUser(user, res, next);
  validation.validateRole(user, "instructor", res, next);
  validation.validateExistent(
    instructorFound,
    400,
    "No such instructor found",
    res,
    next
  );
  validation.validateProfileBelongsToUser(user, instructorFound, res, next);

  // Update all the other fields
  instructorFound.first_name = first_name;
  instructorFound.last_name = last_name;
  instructorFound.age = age;
  instructorFound.gender = gender;
  instructorFound.email = email;
  instructorFound.contact = contact;
  instructorFound.experience = experience;

  const oldPublicId = instructorFound.avatar?.public_id;

  // Remove old avatar first
  if (oldPublicId && file) {
    // Check if there avatar exist
    try {
      const { result: destroyRes } = await cloudinary.uploader.destroy(
        oldPublicId,
        {
          resource_type: "image",
        }
      );
    } catch (error) {
      res.status(400);
      throw new Error(error);
    }
  }

  // Add new image to avatar if file exist
  if (file) {
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      file.path,
      {
        resource_type: "image",
        gravity: "face",
        height: 150,
        width: 150,
        crop: "thumb",
      }
    );
    instructorFound.avatar = { url: secure_url, public_id };
  }

  try {
    await instructorFound.save();
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }

  res.status(200).json({
    _id: instructorFound._id,
    first_name: instructorFound.first_name,
    last_name: instructorFound.last_name,
    age: instructorFound.age,
    gender: instructorFound.gender,
    email: instructorFound.email,
    contact: instructorFound.contact,
    avatar: instructorFound.avatar,
    experience: instructorFound.experience,
  });
});

exports.delete = asyncHandler(async (req, res) => {
  // delete class function
  const {action} = req.body;
  console.log(action)

  if (action === "deleteClass") {
      remove.oneClass(req, res);
  } else {
    console.log("fail")
  }

});
