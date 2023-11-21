require('dotenv').config();
const { MongoClient } = require("mongodb");
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

const ATLAS_URI = process.env.ATLAS_URI;
const client = new MongoClient(ATLAS_URI);

app.get("/api/data", async (req, res) => {
  try {
    await client.connect();
    const db = client.db("sample_guides");
    const coll = db.collection("planets");
    const data = await coll.find().toArray();
    res.setHeader("Content-Type", "application/json");
    res.json(data);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
