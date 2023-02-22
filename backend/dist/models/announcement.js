const mongoose = require("mongoose");
const announcementSchema = mongoose.Schema({
  content: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});
module.exports = announcementSchema;