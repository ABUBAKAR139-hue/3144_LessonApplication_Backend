const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Lesson = require("./models/Lesson"); // Path to your Lesson model

dotenv.config(); // Load environment variables

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("Connection error:", err));

// Data to Populate
const lessons = [
  {
    subject: "Psychology",
    location: "London",
    price: 20,
    spaces: 5,
    image: "/images/Psychology.jpg",
  },
  {
    subject: "Art",
    location: "Bristol",
    price: 15,
    spaces: 5,
    image: "/images/art.jpg",
  },
  {
    subject: "Biology",
    location: "Manchester",
    price: 10,
    spaces: 5,
    image: "/images/biology.jpg",
  },
  {
    subject: "Chemistry",
    location: "Liverpool",
    price: 18,
    spaces: 5,
    image: "/images/chemistry.jpg",
  },
  {
    subject: "Computer Science",
    location: "Oxford",
    price: 25,
    spaces: 5,
    image: "/images/computer.jpg",
  },
  {
    subject: "Economics",
    location: "Cambridge",
    price: 22,
    spaces: 5,
    image: "/images/economics.jpg",
  },
  {
    subject: "Engineering",
    location: "Edinburgh",
    price: 27,
    spaces: 5,
    image: "/images/engineering.jpg",
  },
  {
    subject: "English",
    location: "Leeds",
    price: 15,
    spaces: 5,
    image: "/images/english.jpg",
  },
  {
    subject: "French",
    location: "Glasgow",
    price: 19,
    spaces: 5,
    image: "/images/french.jpg",
  },
  {
    subject: "Geography",
    location: "Birmingham",
    price: 24,
    spaces: 5,
    image: "/images/geography.jpg",
  },
  {
    subject: "History",
    location: "London",
    price: 20,
    spaces: 5,
    image: "/images/history.jpg",
  },
  {
    subject: "Law",
    location: "Manchester",
    price: 30,
    spaces: 5,
    image: "/images/law.jpg",
  },
  {
    subject: "Mathematics",
    location: "Cambridge",
    price: 22,
    spaces: 5,
    image: "/images/mathematics.jpg",
  },
  {
    subject: "Music",
    location: "Liverpool",
    price: 30,
    spaces: 5,
    image: "/images/music.jpg",
  },
  {
    subject: "Philosophy",
    location: "Oxford",
    price: 18,
    spaces: 5,
    image: "/images/philosophy.jpg",
  },
  {
    subject: "Physical Education",
    location: "Edinburgh",
    price: 15,
    spaces: 5,
    image: "/images/physicaleducation.jpg",
  },
  {
    subject: "Physics",
    location: "Bristol",
    price: 20,
    spaces: 5,
    image: "/images/physics.jpg",
  },
];

// Seed the database
const seedLessons = async () => {
  try {
    // Clear existing data
    await Lesson.deleteMany();
    console.log("Existing lessons cleared!");

    // Insert new data
    await Lesson.insertMany(lessons);
    console.log("Lessons added successfully!");

    // Close the connection
    mongoose.connection.close();
  } catch (err) {
    console.error("Seeding error:", err);
    mongoose.connection.close();
  }
};

// Run the seed function
seedLessons();
