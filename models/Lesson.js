const mongoose = require("mongoose");

const LessonSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  spaces: { type: Number, required: true },
  image: { type: String, required: false },
});

module.exports = mongoose.model("Lesson", LessonSchema);
