var express = require("express");
const { MongoClient } = require("mongodb");

// Connection URL - keeping existing configuration
const url = "mongodb://mongoadmin:secret@localhost:27017";
const client = new MongoClient(url);
const dbName = "santa"; // Reusing the database name found in index.js
const collectionName = "housing"; // New collection for houses

var router = express.Router();

async function getCollection() {
    await client.connect();
    const db = client.db(dbName);
    return db.collection(collectionName);
}

/* GET all housing locations */
router.get("/", async function (req, res, next) {
    try {
        const collection = await getCollection();
        // Return all documents
        const data = await collection.find({}).toArray();
        res.json(data);
    } catch (err) {
        next(err);
    }
});

/* GET housing location by id */
router.get("/:id", async function (req, res, next) {
    try {
        const collection = await getCollection();
        const id = parseInt(req.params.id);
        const data = await collection.findOne({ id: id });

        // Return as array if found, to match expected behavior if applicable
        // But standard REST dictates object. However, if previous interactions suggested array...
        // Let's stick to array to be safe given the weird service code 'locationJson[0]'
        if (data) {
            res.json([data]);
        } else {
            res.json([]);
        }
    } catch (err) {
        next(err);
    }
});

/* POST new housing location */
router.post("/", async function (req, res, next) {
    try {
        const collection = await getCollection();
        const newHouse = req.body;

        // Auto-generate ID if 0 or missing
        if (!newHouse.id || newHouse.id === 0) {
            const lastHouse = await collection.find().sort({ id: -1 }).limit(1).toArray();
            let newId = 1;
            if (lastHouse.length > 0 && lastHouse[0].id) {
                newId = lastHouse[0].id + 1;
            }
            newHouse.id = newId;
        }

        await collection.insertOne(newHouse);
        res.json(newHouse);
    } catch (err) {
        next(err);
    }
});

/* PUT update housing location */
router.put("/:id", async function (req, res, next) {
    try {
        const collection = await getCollection();
        const id = parseInt(req.params.id);
        const update = { $set: req.body };
        // We don't want to update the ID usually, but body might contain it.
        // Ensure we don't accidentally overwrite _id or id with bad data?
        // Mongo insert/update won't change _id unless valid. id field is custom.
        await collection.updateOne({ id: id }, update);
        res.json(req.body);
    } catch (err) {
        next(err);
    }
});

/* DELETE housing location */
router.delete("/:id", async function (req, res, next) {
    try {
        const collection = await getCollection();
        const id = parseInt(req.params.id);
        await collection.deleteOne({ id: id });
        res.json({ success: true });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
