require("dotenv").config();
const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Configuration
const corsOptions = {
  origin: "https://abubakar139-hue.github.io/3144_LessonApplication_Frontend/",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  allowedHeaders: ["Content-Type"],
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json());

// Logger Middleware
app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.url}`);
  next();
});

// MongoDB connection
const mongoUri = process.env.MONGO_URI;
const client = new MongoClient(mongoUri);

client
  .connect()
  .then(() => {
    const db = client.db(); // Use the default database specified in the URI
    console.log("MongoDB Connected Successfully");

    // Import routes and pass `db`
    const lessonRoutes = require("./routes/lessonRoutes")(db);
    const orderRoutes = require("./routes/orderRoutes")(db);

    // Register routes
    app.use("/lessons", lessonRoutes);
    app.use("/orders", orderRoutes);

    // Serve Static Files Middleware
    app.use("/images", express.static(path.join(__dirname, "images")));
    app.use("/images", (req, res) => {
      res.status(404).send("Image not found");
    });

    // Test Route to confirm backend is running
    app.get("/", (req, res) => {
      res.send("Backend is running");
    });

    // Start the Server
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Connection error:", err);
    process.exit(1); // Exit the application if the database connection fails
  });
