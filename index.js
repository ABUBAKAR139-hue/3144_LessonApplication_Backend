require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Configuration
const corsOptions = {
  origin: " https://abubakar139-hue.github.io/3144_LessonApplication_Frontend/",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json());

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

// MongoDB connection
const mongoUri = process.env.MONGO_URI;
console.log("Mongo URI: ", mongoUri);

mongoose
  .connect(mongoUri, {})
  .then(() => {
    console.log("MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.error("Connection error:", err);
  });

// Test Route to confirm backend is running
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Search Route
app.get("/search", async (req, res) => {
  const query = req.query.q;
  try {
    const results = await Lesson.find({
      name: { $regex: query, $options: "i" },
    }).exec();
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start the Server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
