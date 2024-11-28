require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Logger Middleware
app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.url}`);
  next();
});

// Routes
const lessonRoutes = require("./routes/lessonRoutes");
const orderRoutes = require("./routes/orderRoutes");
app.use("/lessons", lessonRoutes);
app.use("/orders", orderRoutes);

// Serve Static Files Middleware
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/images", (req, res) => {
  res.status(404).send("Image not found");
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("Connection error:", err));

// Test Route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Search as you type
app.get("/search", async (req, res) => {
  const query = req.query.q;
  try {
    const results = await Lesson.find({
      name: { $regex: query, $options: "i" },
    });
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
