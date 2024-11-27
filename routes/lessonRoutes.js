const express = require("express");
const Lesson = require("../models/Lesson");
const router = express.Router();

// GET all lessons
router.get("/", async (req, res) => {
  try {
    const lessons = await Lesson.find();
    const formattedLessons = lessons.map((lesson) => ({
      id: lesson._id,
      subject: lesson.subject,
      location: lesson.location,
      price: lesson.price,
      spaces: lesson.spaces,
      image: lesson.image,
    }));
    res.json(formattedLessons);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single lesson by ID
router.get("/:id", async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }
    const formattedLesson = {
      id: lesson._id,
      subject: lesson.subject,
      location: lesson.location,
      price: lesson.price,
      spaces: lesson.spaces,
      image: lesson.image,
    };
    res.json(formattedLesson);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new lesson
router.post("/", async (req, res) => {
  const { subject, price, location, spaces, image } = req.body;

  const newLesson = new Lesson({
    subject,
    price,
    location,
    spaces,
    image,
  });

  try {
    const savedLesson = await newLesson.save();
    const formattedLesson = {
      id: savedLesson._id,
      subject: savedLesson.subject,
      location: savedLesson.location,
      price: savedLesson.price,
      spaces: savedLesson.spaces,
      image: savedLesson.image,
    };
    res.status(201).json(formattedLesson);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT to update lesson by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedLesson = await Lesson.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedLesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    // Return the updated lesson
    res.json({
      id: updatedLesson._id,
      subject: updatedLesson.subject,
      location: updatedLesson.location,
      price: updatedLesson.price,
      spaces: updatedLesson.spaces,
      image: updatedLesson.image,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a lesson by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedLesson = await Lesson.findByIdAndDelete(req.params.id);

    if (!deletedLesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    res.json({ message: "Lesson deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
