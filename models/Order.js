const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  lessonIDs: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Lesson", required: true },
  ],
  numberOfSpaces: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", OrderSchema);
