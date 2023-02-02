const asyncHandler = require("express-async-handler");
const Instructor = require("../models/instructor");
const User = require("../models/user");

// @desc create a new instructor
// @route /api/instructor/create
// @access user
exports.createInstructor= asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(400);
    throw new Error("User not logged in");
  }

  if (!user.role === "instructor" ){
    res.status(400);
    throw new Error("Only instructor account can create instructor profile");
  }

  if (user.role === "instructor" && user.instructorprofile ) {
    res.status(400);
    throw new Error("Instructor account can only create 1 instructor profile");
  }

  const { first_name, last_name, age, gender, email, contact, avatar, experience} = req.body;

  if (!first_name || !last_name || !age || !gender || !email) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  const instructor = await Instructor.create({
    first_name,
    last_name,
    age,
    gender,
    email,
    contact: contact || null,
    avatar: avatar || null,
  })

  user.instructorprofile = instructor;
  await user.save();
  // const user1 = await User.findById(req.user.id).populate("instructorprofiles");
  // console.log(user1)

  res.status(200).json({
    _id: instructor._id,
    first_name: instructor.first_name,
    last_name: instructor.last_name,
    age: instructor.age,
    gender: instructor.gender,
    email: instructor.email,
    contact: instructor.contact,
    avatar: instructor.avatar,
    experience: instructor.experience
  })

});
