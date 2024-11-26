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

// Serve Static Files Middleware
app.use("/images", express.static(path.join(__dirname, "images")));
app.use((req, res) => {
  res.status(404).send("Image not found");
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

// Routes
const lessonRoutes = require("./routes/lessonRoutes");
app.use("/lessons", lessonRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
