const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();

// MongoDB connection URI
const uri = process.env.MONGO_URI;

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
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    // Connect to the database
    await client.connect();
    console.log("MongoDB Connected!");

    // Get the lessons collection
    const db = client.db();
    const lessonsCollection = db.collection("lessons");

    // Clear existing data
    await lessonsCollection.deleteMany({});
    console.log("Existing lessons cleared!");

    // Insert new data
    await lessonsCollection.insertMany(lessons);
    console.log("Lessons added successfully!");
  } catch (err) {
    console.error("Seeding error:", err);
  } finally {
    // Close the connection
    await client.close();
    console.log("MongoDB connection closed.");
  }
};

seedLessons();
