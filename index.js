require("dotenv").config();
const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Configuration
const allowedOrigins = [
  "https://abubakar139-hue.github.io",
  "http://localhost:5173",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOptions));

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.url}`);
  next();
});

// MongoDB Connection
const mongoUri = process.env.MONGO_URI;
const client = new MongoClient(mongoUri);

client
  .connect()
  .then(() => {
    const db = client.db();
    console.log("MongoDB Connected Successfully");

    const lessonRoutes = require("./routes/lessonRoutes")(db);
    const orderRoutes = require("./routes/orderRoutes")(db);

    app.use("/lessons", lessonRoutes);
    app.use("/orders", orderRoutes);

    app.use("/images", express.static(path.join(__dirname, "images")));
    app.use("/images", (req, res) => {
      res.status(404).send("Image not found");
    });

    app.get("/", (req, res) => {
      res.send("Backend is running");
    });

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Connection error:", err);
    process.exit(1);
  });

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("Shutting down server...");
  await client.close();
  process.exit(0);
});
