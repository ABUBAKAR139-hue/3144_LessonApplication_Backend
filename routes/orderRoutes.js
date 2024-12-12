const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");

module.exports = (db) => {
  const router = express.Router();
  const ordersCollection = db.collection("orders");

  // POST a new order
  router.post("/", async (req, res) => {
    try {
      const order = req.body;
      if (order.lessonIDs && Array.isArray(order.lessonIDs)) {
        order.lessonIDs = order.lessonIDs.map((id) => new ObjectId(id));
      }
      order.createdAt = new Date();
      // Insert the order into the database
      const result = await ordersCollection.insertOne(order);
      res.status(201).json({ ...order, _id: result.insertedId });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  // GET all orders
  router.get("/", async (req, res) => {
    try {
      const orders = await ordersCollection.find().toArray();
      res.json(orders);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  // GET a single order by ID
  router.get("/:id", async (req, res) => {
    try {
      const order = await ordersCollection.findOne({
        _id: new ObjectId(req.params.id),
      });
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.json(order);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  // PUT - Update an order by ID
  router.put("/:id", async (req, res) => {
    try {
      const orderId = req.params.id;
      const updates = req.body;

      // Validate lessonIDs if they are part of the update
      if (updates.lessonIDs) {
        updates.lessonIDs = updates.lessonIDs.map((id) => new ObjectId(id));
      }

      const result = await ordersCollection.updateOne(
        { _id: new ObjectId(orderId) },
        { $set: updates }
      );

      if (!result.matchedCount) {
        return res.status(404).json({ message: "Order not found" });
      }

      res.json({ message: "Order updated successfully" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  return router;
};
