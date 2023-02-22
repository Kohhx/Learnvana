const mongoose = require("mongoose");
const lessonSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: String,
  objective: String,
  date: String,
  time: String,
  images: [{
    type: String
  }]
}, {
  timestamps: true
});
module.exports = lessonSchema;