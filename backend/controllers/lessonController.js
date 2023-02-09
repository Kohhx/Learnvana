const asyncHandler = require("express-async-handler");

// Import Model
const Student = require("../models/student");
const Instructor = require("../models/instructor");
const Class = require("../models/class");
const User = require("../models/user");
const Lesson = require("../models/lesson");

exports.getInstructorLesson = asyncHandler(async (req, res) => {
  console.log("/api/classes/instructor-classes/:classId/instructor-lessons/:lessonId");
  const classId = req.params.classId;
  const lessonId = req.params.lessonId;

  let classFound;
  try {
    classFound = await Class.findById(classId);
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }

  let lessonFound;
  try {
    lessonFound = await Lesson.findById(lessonId);
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

  if (!lessonFound.class.toString() === classFound._id.toString()) {
    res.status(400);
    throw new Error("lesson does not belong to this instructor");
  }

  console.log(lessonFound);

  res.status(201).json(lessonFound);
});


exports.getInstructorLessons = asyncHandler(async (req, res) => {
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

  const instructorLessons = classFound.lessons;

  console.log(instructorLessons);

  res.status(201).json(instructorLessons);
});

exports.createLesson = asyncHandler(async (req, res) => {
  const { title, status, images, address } = req.body;

  const user = await User.findById(req.user.id);
  const instructor = await Instructor.findById(user.instructorprofile);

  console.log(instructor);

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

  // Create Lesson
  let newLesson;
  try {
    newLesson = await Lesson.create({
      title,
      content,
      objective,
      date,
      time,
      images,
    });
  } catch (error) {
    res.status(500);
    throw new Error("Something went wrong");
  }

  // Add lesson to instructor
  try {
    instructor.classes.lessons.push(newLesson);
    await instructor.save();
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
      images: newLesson.images,
    });
  } else {
    res.status(400);
    throw new Error("Invalid lesson data");
  }
});
