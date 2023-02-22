const asyncHandler = require("express-async-handler");
const validation = require("../utility/validation");

// models
const Instructor = require("../models/instructor");
const Class = require("../models/class");
const User = require("../models/user");

// remove a class
exports.oneClass = asyncHandler(async (req, res, next) => {
  const {
    classId
  } = req.body;
  const user = await User.findById(req.user.id);
  const instructor = await Instructor.findById(user.instructorprofile);
  const classFound = await Class.findById(classId);

  // Validate
  validation.validateUser(user, res, next);
  validation.validateRole(user, "instructor", res, next);
  validation.validateClassBelongsInstructor(user, classFound, res, next);

  // check if class exist
  if (!classFound) {
    res.status(500);
    throw new Error("No such class");
  }

  // Remove class from classlist
  try {
    await Instructor.updateOne({
      _id: instructor
    }, {
      $pullAll: {
        classes: [classFound]
      }
    });
  } catch (error) {
    res.status(500);
    throw new Error("Error updating class list");
  }
});