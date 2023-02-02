const mongoose = require("mongoose");
const announcementSchema = require("./announcement");
const lessonSchema = require("./lesson");

const classSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "Not started",
    enum: ["Not started", "In progress", "Closed"],
  },
  address: String,
  location: {
    lat: Number,
    lng: Number,
  },
  images: [{ type: String }],
  announcements: [announcementSchema],
  lessons: [lessonSchema],
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
  pending: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
});

classSchema.virtual('studentCount').get(function() {
  return this.students.length;
})

module.exports = mongoose.model("Class", classSchema);
