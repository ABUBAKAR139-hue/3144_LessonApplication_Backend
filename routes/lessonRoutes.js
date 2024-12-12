const express = require("express");
const { ObjectId } = require("mongodb");

module.exports = (db) => {
  const router = express.Router();
  const lessonsCollection = db.collection("lessons");

  // GET all lessons
  router.get("/", async (req, res) => {
    try {
      const lessons = await lessonsCollection.find().toArray();
      res.json(lessons);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  // GET a single lesson by ID
  router.get("/:id", async (req, res) => {
    try {
      const lesson = await lessonsCollection.findOne({
        _id: new ObjectId(req.params.id),
      });
      if (!lesson) {
        return res.status(404).json({ message: "Lesson not found" });
      }
      res.json(lesson);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  // POST a new lesson
  router.post("/", async (req, res) => {
    try {
      const lesson = req.body;
      const result = await lessonsCollection.insertOne(lesson);
      res.status(201).json({ ...lesson, _id: result.insertedId });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  // PUT to update a lesson by ID
  router.put("/:id", async (req, res) => {
    try {
      const update = req.body;
      const result = await lessonsCollection.updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: update }
      );
      if (!result.matchedCount) {
        return res.status(404).json({ message: "Lesson not found" });
      }
      res.json({ message: "Lesson updated successfully" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  // DELETE a lesson by ID
  router.delete("/:id", async (req, res) => {
    try {
      const result = await lessonsCollection.deleteOne({
        _id: new ObjectId(req.params.id),
      });
      if (!result.deletedCount) {
        return res.status(404).json({ message: "Lesson not found" });
      }
      res.json({ message: "Lesson deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  return router;
};
