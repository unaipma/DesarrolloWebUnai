var express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const url = "mongodb://mongoadmin:secret@localhost:27017";
const client = new MongoClient(url);
const dbName = "santa";
var router = express.Router();

/* GET home page. */
router.get("/", async function (req, res, next) {
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection("santa");
  const data = await collection.find({}).toArray();

  res.json(data);
});

router.post("/", async function (req, res, next) {
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection("santa");
  const insertResult = await collection.insertOne(req.body);
  res.json(insertResult);
});

router.put("/:id", async function (req, res, next) {
  try {
    await client.connect();
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    const collection = db.collection("santa");
    const id = req.params.id;
    const update = { $set: req.body };
    const result = await collection.updateOne({ _id: new ObjectId(id) }, update);
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "No se encontró el documento a actualizar" });
    }
    res.json({ matchedCount: result.matchedCount, modifiedCount: result.modifiedCount });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async function (req, res, next) {
  try {
    await client.connect();
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    const collection = db.collection("santa");
    const id = req.params.id;
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "No se encontró el documento" });
    }
    res.json({ deletedCount: result.deletedCount });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
