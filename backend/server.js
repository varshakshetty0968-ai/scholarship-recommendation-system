console.log("🔥 FINAL FULLY COMBINED SERVER RUNNING");

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const { MongoClient, ObjectId } = require("mongodb");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

/* =========================================
   DATABASE CONNECTION (BOTH URI SUPPORT)
========================================= */

// 🔥 MAIN PRIORITY DB (Second Code)
const url = "mongodb+srv://varsha:varsha789@cluster0.bchiaka.mongodb.net/?retryWrites=true&w=majority";

// 🔥 FIRST CODE DB
const uri = "mongodb+srv://Vedhika:vedhika44@cluster0.bchiaka.mongodb.net/scholarshipDB";

const client = new MongoClient(url);
let db;

/* =========================================
   HTTP + SOCKET.IO SERVER
========================================= */

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

/* =========================================
   SOCKET.IO CHAT
========================================= */

io.on("connection", (socket) => {
  console.log("🟢 User Connected:", socket.id);

  socket.on("join_room", (roomName) => {
    socket.join(roomName.trim());
  });

  socket.on("leave_room", (roomName) => {
    socket.leave(roomName.trim());
  });

  socket.on("send_message", async (data) => {
    try {
      const newMessage = {
        room: data.room.trim(),
        author: data.author,
        message: data.message,
        time: data.time,
        userId: data.userId,
        timestamp: new Date()
      };

      await db.collection("messages").insertOne(newMessage);
      io.to(data.room.trim()).emit("receive_message", newMessage);

    } catch (err) {
      console.error("Chat Error:", err);
    }
  });
});

/* =========================================
   START SERVER
========================================= */

async function startServer() {
  try {
    await client.connect();
    db = client.db("scholarshipDB");

    console.log("✅ Connected to scholarshipDB");

    server.listen(5000, () => {
      console.log("🚀 Server running at http://localhost:5000");
    });

  } catch (err) {
    console.error("❌ DB Connection Error:", err);
  }
}

/* =========================================
   ROOT
========================================= */

app.get("/", (req, res) => {
  res.send("Backend running successfully 🚀");
});

/* =========================================
   ================= ADMIN ROUTES =================
========================================= */

// ---------- ADMIN REGISTER ----------
app.post("/admin-register", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.json({ success: false });

    const existing = await db.collection("admins").findOne({ email });

    if (existing) {
      return res.json({ success: false, message: "Admin already exists" });
    }

    await db.collection("admins").insertOne({ email, password });

    res.json({ success: true });
  } catch (err) {
    res.json({ success: false });
  }
});

// ---------- ADMIN LOGIN ----------
app.post("/admin-login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await db.collection("admins").findOne({ email, password });

    if (admin) {
      res.json({ success: true });
    } else {
      res.json({ success: false, message: "Invalid email or password" });
    }
  } catch (err) {
    res.json({ success: false });
  }
});

/* =========================================
   ================= SCHOLARSHIPS =================
========================================= */

// FIRST CODE VERSION (Grouped)
app.get("/scholarships-full", async (req, res) => {
  const data = await db.collection("scholarships").aggregate([
    {
      $group: {
        _id: "$Name",
        doc: { $first: "$$ROOT" }
      }
    },
    {
      $replaceRoot: { newRoot: "$doc" }
    }
  ]).toArray();

  res.json(data);
});

// SECOND CODE VERSION (Distinct)
app.get("/scholarships", async (req, res) => {
  try {
    const list = await db.collection("scholarships").distinct("Name");
    res.send(list || []);
  } catch (err) {
    res.status(500).send([]);
  }
});

app.post("/scholarships", async (req, res) => {
  const result = await db.collection("scholarships").insertOne(req.body);
  res.json(result);
});

app.delete("/scholarships/:id", async (req, res) => {
  await db.collection("scholarships").deleteOne({
    _id: new ObjectId(req.params.id),
  });
  res.send("Deleted");
});

app.put("/scholarships/:id", async (req, res) => {
  await db.collection("scholarships").updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: req.body }
  );

  res.json({ success: true });
});

/* =========================================
   ================= STUDENT ROUTES =================
========================================= */

app.post("/register", async (req, res) => {
  try {
    const result = await db.collection("students").insertOne(req.body);
    res.status(201).send({ message: "Success", id: result.insertedId });
  } catch (err) {
    res.status(500).send({ message: "Student registration failed" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const user = await db.collection("students").findOne({
      email: req.body.email,
      password: req.body.password
    });

    if (user) res.send(user);
    else res.status(401).send({ message: "Invalid student credentials" });

  } catch (err) {
    res.status(500).send(err);
  }
});

// FIRST CODE STUDENT LIST
app.get("/students", async (req, res) => {
  try {
    const students = await db.collection("students").aggregate([
      {
        $group: {
          _id: "$name",
          doc: { $first: "$$ROOT" }
        }
      },
      {
        $replaceRoot: { newRoot: "$doc" }
      }
    ]).toArray();

    res.json(students);
  } catch (err) {
    res.status(500).send("Error fetching students");
  }
});

/* =========================================
   ================= RECOMMENDATIONS =================
========================================= */

app.get("/recommend/:id", async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) return res.send([]);

    const student = await db.collection("students")
      .findOne({ _id: new ObjectId(req.params.id) });

    if (!student) return res.send([]);

    const matches = await db.collection("scholarships").find({
      "Education Qualification": student.education,
      "Community": student.community,
      "Religion": student.religion
    }).toArray();

    res.send(matches || []);

  } catch (err) {
    res.status(500).send([]);
  }
});

/* =========================================
   ================= APPLICATION ROUTES =================
========================================= */

app.post("/apply", async (req, res) => {
  try {
    const applicationData = {
      ...req.body,
      student_id: ObjectId.isValid(req.body.student_id)
        ? new ObjectId(req.body.student_id)
        : req.body.student_id,
      status: "Pending",
      appliedAt: new Date()
    };

    await db.collection("applications").insertOne(applicationData);
    res.status(201).send({ message: "Success" });

  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/applications/:studentId", async (req, res) => {
  try {
    const sId = req.params.studentId;

    const query = {
      $or: [
        { student_id: sId },
        { student_id: ObjectId.isValid(sId) ? new ObjectId(sId) : null }
      ]
    };

    const list = await db.collection("applications").find(query).toArray();
    res.send(list || []);

  } catch (err) {
    res.status(200).send([]);
  }
});

/* =========================================
   ================= EMPLOYEE ROUTES =================
========================================= */

app.get("/admin/applications", async (req, res) => {
  try {
    const applications = await db.collection("applications")
      .find()
      .sort({ appliedAt: -1 })
      .toArray();

    res.json(applications);

  } catch (err) {
    res.status(500).json({ message: "Error fetching applications" });
  }
});

app.get("/applications/detail/:id", async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id))
      return res.status(400).json({ message: "Invalid ID" });

    const application = await db.collection("applications")
      .findOne({ _id: new ObjectId(req.params.id) });

    if (!application)
      return res.status(404).json({ message: "Application not found" });

    let student = null;

    if (application.student_id) {
      student = await db.collection("students").findOne({
        _id: ObjectId.isValid(application.student_id)
          ? new ObjectId(application.student_id)
          : application.student_id
      });
    }

    res.json({ application, student });

  } catch (err) {
    res.status(500).json({ message: "Error fetching details" });
  }
});

app.put("/applications/:id", async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id))
      return res.status(400).json({ message: "Invalid ID" });

    const { status, remarks } = req.body;

    await db.collection("applications").updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { status, remarks: remarks || "", reviewedAt: new Date() } }
    );

    res.json({ message: "Application updated successfully" });

  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
});

/* =========================================
   ================= EMPLOYEE AUTH =================
========================================= */

app.post("/add-employee", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await db.collection("employee").findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Employee already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.collection("employee").insertOne({
      name,
      email,
      password: hashedPassword,
      role: "employee",
      createdAt: new Date()
    });

    res.json({ message: "Employee registered successfully" });

  } catch (err) {
    res.status(500).json({ message: "Registration failed" });
  }
});

app.post("/employee-login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const employee = await db.collection("employee").findOne({ email });
    if (!employee)
      return res.status(400).json({ message: "Employee not found" });

    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid password" });

    res.json({
      message: "Login successful",
      employeeId: employee._id,
      name: employee.name
    });

  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
});

/* =========================================
   ================= CHAT HISTORY =================
========================================= */

app.get("/messages/:room", async (req, res) => {
  try {
    const history = await db.collection("messages")
      .find({ room: req.params.room.trim() })
      .sort({ timestamp: 1 })
      .toArray();

    res.send(history);
  } catch (err) {
    res.status(500).send([]);
  }
});
/* =========================================
    🔥 STUDENT PROFILE DETAIL ENDPOINT
========================================= */

// Fetch a single student's full profile by ID
app.get("/students/:id", async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid Student ID format" });
    }

    const student = await db.collection("students").findOne({ 
      _id: new ObjectId(req.params.id) 
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
  } catch (err) {
    console.error("Profile Fetch Error:", err);
    res.status(500).json({ message: "Error fetching student profile" });
  }
});

/* =========================================
    🔥 USER MANAGEMENT ACTIONS (Deactivate)
========================================= */

// Optional: Logic for the 'Deactivate' button in your screenshot
app.put("/students/status/:id", async (req, res) => {
  try {
    // Corrected to look for 'accountStatus' from the request body
    const { accountStatus } = req.body; 

    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid ID" });
    }

    const result = await db.collection("students").updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { accountStatus: accountStatus } } // Matches MongoDB field name
    );

    if (result.modifiedCount === 1) {
      res.json({ success: true, message: `Status updated to ${accountStatus}` });
    } else {
      // If the user is already Inactive and you click Deactivate again
      res.json({ success: true, message: "Status remains unchanged" });
    }
  } catch (err) {
    console.error("Status Update Error:", err);
    res.status(500).json({ success: false });
  }
});
/* =========================================
   NEW: SPECIFIC STUDENT & MANAGEMENT ROUTES
========================================= */

// Fetch a single student's full profile by ID
app.get("/students/:id", async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid Student ID format" });
    }
    const student = await db.collection("students").findOne({ 
      _id: new ObjectId(req.params.id) 
    });
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: "Error fetching student profile" });
  }
});

// Delete a student from the database
app.delete("/students/:id", async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }
    await db.collection("students").deleteOne({ _id: new ObjectId(req.params.id) });
    res.json({ success: true, message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});
app.put("/employees/status/:id", async (req, res) => {
  try {
    const { accountStatus } = req.body;
    const result = await db.collection("employee").updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { accountStatus: accountStatus } }
    );
    if (result.modifiedCount === 1) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (err) {
    res.status(500).json({ success: false });
  }
});
app.get("/employees", async (req, res) => {
  try {
    const employees = await db.collection("employee").find().toArray(); // Add 'await' here
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: "Error fetching employees" });
  }
});
app.delete("/employees/:id", async (req, res) => {
  try {
    const result = await db.collection("employee").deleteOne({ 
      _id: new ObjectId(req.params.id) 
    });
    
    if (result.deletedCount === 1) {
      res.json({ success: true });
    } else {
      res.status(404).json({ success: false, message: "Employee not found" });
    }
  } catch (err) {
    res.status(500).json({ success: false });
  }
});
// Fetch a single employee for the Profile Page
app.get("/employees/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Validate if the ID is a valid MongoDB ObjectId
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const employee = await db.collection("employee").findOne({ 
      _id: new ObjectId(id) 
    });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json(employee);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


startServer();