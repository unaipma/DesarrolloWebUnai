var express = require("express");
const { MongoClient } = require("mongodb");

const url = "mongodb://mongoadmin:secret@localhost:27017";
const client = new MongoClient(url);
const dbName = "santa";
const collectionName = "users";

var router = express.Router();

async function getCollection() {
  await client.connect();
  const db = client.db(dbName);
  return db.collection(collectionName);
}

// Function to initialize default admin user
async function initAdmin() {
  try {
    const collection = await getCollection();
    const admin = await collection.findOne({ username: "admin" });
    if (!admin) {
      await collection.insertOne({ username: "admin", password: "admin", role: "admin" });
      console.log("Admin user created");
    }
  } catch (err) {
    console.error("Error creating admin user:", err);
  }
}
initAdmin();

/* POST register new user */
router.post("/register", async function (req, res, next) {
  try {
    const collection = await getCollection();
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password required" });
    }

    const existingUser = await collection.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = { username, password, role: "user" }; // Default role user
    await collection.insertOne(newUser);
    res.json({ success: true, user: newUser });
  } catch (err) {
    next(err);
  }
});

/* POST login */
router.post("/login", async function (req, res, next) {
  try {
    const collection = await getCollection();
    const { username, password } = req.body;

    const user = await collection.findOne({ username, password });
    if (user) {
      res.json(user);
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
