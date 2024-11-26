const mongoose = require("mongoose");

const LessonSchema = new mongoose.Schema({
  topic: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  space: { type: Number, required: true },
});

module.exports = mongoose.model("Lesson", LessonSchema);
