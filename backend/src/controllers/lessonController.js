const asyncHandler = require("express-async-handler");

// Import Model
const Student = require("../models/student");
const Instructor = require("../models/instructor");
const Class = require("../models/class");
const User = require("../models/user");
const Lesson = require("../models/lesson");


// create a new lesson inside a class

exports.createLesson = asyncHandler(async (req, res) => {
  const { title, content, objective, date, time } = req.body;
  console.log("lesson",req.body)

  const { classId } = req.params

  let classFound;
  try {
    classFound = await Class.findById(classId);
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }

  const user = await User.findById(req.user.id);
  const instructor = await Instructor.findById(user.instructorprofile);

  console.log("sadasd",instructor);

  // Validation
  if (!title) {
    res.status(400);
    throw new Error("Please include title");
  }

  if (!user) {
    res.status(400);
    throw new Error("No user found");
  }

  if (user.role !== "instructor") {
    res.status(400);
    throw new Error("User is not a instructor");
  }

  if (!instructor) {
    res.status(400);
    throw new Error(
      "No instructor profile created. Create instructor profile first"
    );
  }

  if (!instructor.classes) {
    res.status(400);
    throw new Error(
      "No classes found. Create a class first"
    );
  }

  if (!classFound) {
    res.status(400);
    throw new Error(
      "No such class"
    );
  }

  if (classFound.instructor.toString() !== instructor._id.toString()) {
    res.status(400);
    throw new Error("Class does not belong to this instructor");
  }

  console.log(content, typeof content)

  // Create Lesson
  const newLesson = {
    title,
    content: JSON.stringify(content),
    objective,
    date,
    time,
  };

  try {
    classFound.lessons.push(newLesson);
    await classFound.save();
  } catch (error) {
    res.status(500);
    throw new Error("Something went wrong with adding classes to instructor");
  }

  if (newLesson) {
    res.status(201).json({
      _id: newLesson._id,
      title: newLesson.title,
      content: newLesson.content,
      objective: newLesson.objective,
      date: newLesson.date,
      time: newLesson.time,
    });
  } else {
    res.status(400);
    throw new Error("Invalid lesson data");
  }
});


// get all lessons from a class

exports.getClassLessons = asyncHandler(async (req, res) => {
  console.log("/api/classes//instructor-classes/:classId/instructor-lessons");
  const classId = req.params.classId;

  let classFound;
  try {
    classFound = await Class.findById(classId);
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }

  const user = await User.findById(req.user.id);
  const instructor = await Instructor.findById(user.instructorprofile);
  // const instructor = await Instructor.findById(user.instructorprofile).populate(
  //   { "classes" }
  // );
  //

  if (!user) {
    res.status(400);
    throw new Error("No user found");
  }

  if (user.role !== "instructor") {
    res.status(400);
    throw new Error("User is not a instructor");
  }

  if (!instructor) {
    res.status(400);
    throw new Error(
      "No instructor profile created. Create instructor profile first"
    );
  }

  if (!classFound.instructor.toString() === user._id.toString()) {
    res.status(400);
    throw new Error("Class does not belong to this instructor");
  }

  const classLessons = classFound.lessons;

  console.log(classLessons);

  res.status(201).json(classLessons);
});



// get one lesson from a class

exports.getClassLesson = asyncHandler(async (req, res) => {
  const classId = req.params.classId;
  const lessonId = req.params.lessonId;
  // const {classId, lessonId} = req.params;
  // javascript destructruting


  let classFound;
  try {
    classFound = await Class.findById(classId);
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }

  // String.prototype.toObjectId = function() {
  //   var ObjectId = (require('mongoose').Types.ObjectId);
  //   return new ObjectId(this.toString());
  // };
  // console.log(lessonId.toObjectId())
  // console.log(classFound.lessons[3]._id)
  // console.log(classFound.lessons[3].id === lessonId)
  function findLesson(lessonId) {
    for (let i=0; i < classFound.lessons.length; i++) {
      if (classFound.lessons[i].id === lessonId) {
        // console.log(i);
        // x = i;
        return i;
      }
    }
  };

  let lessonFound;
  try {
    lessonFound = await classFound.lessons[findLesson(lessonId)]
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }

  const user = await User.findById(req.user.id);
  const instructor = await Instructor.findById(user.instructorprofile).populate(
    { path: 'classes', select: 'lessons' }
  );

  if (!user) {
    res.status(400);
    throw new Error("No user found");
  }

  if (user.role !== "instructor") {
    res.status(400);
    throw new Error("User is not a instructor");
  }

  if (!instructor) {
    res.status(400);
    throw new Error(
      "No instructor profile created. Create instructor profile first"
    );
  }

  if (!classFound.instructor.toString() === user._id.toString()) {
    res.status(400);
    throw new Error("Class does not belong to this instructor");
  }


  console.log(lessonFound);

  res.status(201).json(lessonFound);
});
