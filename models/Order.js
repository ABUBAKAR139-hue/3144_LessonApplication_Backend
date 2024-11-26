const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  lessonIDs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }],
  numberOfSpaces: { type: Number, required: true },
});

module.exports = mongoose.model("Order", OrderSchema);
