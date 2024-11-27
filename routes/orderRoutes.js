const express = require("express");
const Order = require("../models/Order");
const router = express.Router();

// POST - Create new order
router.post("/", async (req, res) => {
  try {
    const { name, phoneNumber, lessonIDs, numberOfSpaces } = req.body; // Ensure correct field names
    const newOrder = new Order({
      name,
      phone: phoneNumber, // Ensure consistency in field names
      lessonIDs,
      numberOfSpaces, // Use "numberOfSpaces" from request body
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single order by ID
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
