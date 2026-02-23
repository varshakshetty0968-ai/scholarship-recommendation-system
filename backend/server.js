const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
app.use(cors()); 
app.use(express.json()); 

const url = "mongodb+srv://varsha:varsha789@cluster0.bchiaka.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);
let db;

async function startServer() {
  try {
    await client.connect();
    db = client.db("scholarshipDB");
    console.log("✅ Connected to scholarshipDB");
    app.listen(5000, () => console.log("🚀 Server running at http://localhost:5000"));
  } catch (e) { console.error("Connection Error:", e); }
}
startServer();

// --- 1. GET ALL UNIQUE SCHOLARSHIPS ---
app.get("/scholarships", async (req, res) => {
  try {
    const list = await db.collection("scholarships").distinct("Name");
    res.send(list);
  } catch (err) { res.status(500).send(err); }
});

// --- 2. RECOMMENDATIONS (Dataset Logic) ---
app.get("/recommend/:id", async (req, res) => {
  try {
    const student = await db.collection("students").findOne({ _id: new ObjectId(req.params.id) });
    if (!student) return res.status(404).send("Student not found");

    // Matches your CSV columns exactly
    const matches = await db.collection("scholarships").distinct("Name", {
      "Education Qualification": student.education,
      "Gender": student.gender,
      "Community": student.community,
      "Religion": student.religion,
      "Annual-Percentage": student.percentage,
      "Income": student.income,
      "Outcome": 1
    });
    res.send(matches);
  } catch (err) { res.status(500).send(err); }
});

// --- 3. REGISTER ---
app.post("/register", async (req, res) => {
  try {
    const result = await db.collection("students").insertOne(req.body);
    res.status(201).send({ message: "Success", id: result.insertedId });
  } catch (err) { res.status(500).send(err); }
});

// --- 4. LOGIN ---
app.post("/login", async (req, res) => {
  const user = await db.collection("students").findOne({ email: req.body.email, password: req.body.password });
  user ? res.send(user) : res.status(401).send("Invalid");
});