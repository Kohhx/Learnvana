const asyncHandler = require("express-async-handler");
const validation = require("../utility/validation");
const cloudinaryHelper = require("../utility/cloudinaryHelper");

// models
const Instructor = require("../models/instructor");
const Class = require("../models/class");
const User = require("../models/user");

// remove a class
exports.oneClass = asyncHandler(async (req, res, next) => {
  const { classId } = req.body;
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
    await Instructor.updateOne(
      { _id: instructor },
      { $pullAll: { classes: [classFound] } }
    );
  } catch (error) {
    res.status(500);
    throw new Error("Error updating class list");
  }
});

exports.oneLesson = asyncHandler(async (req, res, next) => {
  const { classId, lessonId } = req.body;
  const user = await User.findById(req.user.id);
  const instructor = await Instructor.findById(user.instructorprofile);
  const classFound = await Class.findById(classId);

  function findLesson(lessonId) {
    for (let i = 0; i < classFound.lessons.length; i++) {
      if (classFound.lessons[i].id === lessonId) {
        // console.log(i);
        // x = i;
        return i;
      }
    }
  }

  let lessonFound;
  try {
    lessonFound = await classFound.lessons[findLesson(lessonId)];
    // lessonFound = await Class.findOne(
    //   { _id: classId },
    //   { lessons: [lessonId] }
    // );
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
  console.log("sadasd", lessonId);

  console.log("testcheck", lessonFound);

  // Validate
  validation.validateUser(user, res, next);
  validation.validateRole(user, "instructor", res, next);
  validation.validateClassBelongsInstructor(user, classFound, res, next);

  // check if class exist
  if (!classFound) {
    res.status(500);
    throw new Error("No such class");
  }

  if (!lessonFound) {
    res.status(500);
    throw new Error("No such lesson");
  }

  // Lets remove everything from cloudinary if there is

  console.log("LessonFound", lessonFound);

  const { blocks } = JSON.parse(lessonFound.content);
  console.log(blocks)
  blocks.forEach((block) => {
    const { type, data } = block;
    if (type === "image" || type === "video" || type === "attaches") {
      const mimetypeArr = data.file.mimetype.split("/");

      let deleteType = "image";
      if (mimetypeArr[0] === "video") {
        deleteType = "video";
      }

      if (mimetypeArr[0] === "application") {
        if (mimetypeArr[1] !== "pdf") {
          deleteType = "raw";
        }
      }

      const destroRes = cloudinaryHelper
        .deleteFile(data.file.public_id, deleteType)
        .then((destroRes) => console.log(destroRes))
        .catch((error) => {
          res.status(400);
          throw new Error("Error deleting resource from cloudinary");
        });
    }
  });

  // Remove lesson from class
  try {
    await Class.updateOne(
      { _id: classId },
      { $pullAll: { lessons: [lessonFound] } }
    );
  } catch (error) {
    res.status(500);
    throw new Error("Error updating lesson in class list");
  }

  console.log("reach here?");
});
