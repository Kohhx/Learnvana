const mongoose = require("mongoose");

const lessonSchema = mongoose.Schema({
  title: String,
  content: String,
  objective: String,
  date: Date,
  time: Date,
  images: [{ type: String }],
},
{
  timestamps: true,
});

module.exports = lessonSchema;
