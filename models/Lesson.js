// models/lesson.js
const { ObjectId } = require("mongodb");

const lessonSchema = {
  subject: { type: "string", required: true },
  location: { type: "string", required: true },
  price: { type: "string", required: true },
  spaces: { type: "number", required: true },
  image: { type: "string", required: true },
};

module.exports = lessonSchema;
