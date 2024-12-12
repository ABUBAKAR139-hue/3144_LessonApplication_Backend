// models/order.js
const { ObjectId } = require("mongodb");

const orderSchema = {
  name: { type: "string", required: true },
  phone: { type: "string", required: true },
  lessonIDs: {
    type: [ObjectId],
    ref: "Lesson",
    required: true,
  },
  numberOfSpaces: { type: "number", required: true },
};

module.exports = orderSchema;
