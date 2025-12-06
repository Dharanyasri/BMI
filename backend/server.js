// server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

// Connect DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("BMI Wellness API is running");
});

// Existing Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/bmi", require("./routes/bmi"));

// NEW Routes
app.use("/api/ideal-weight", require("./routes/idealWeight"));
app.use("/api/calories", require("./routes/calories"));

// ⭐ FIXED AI ROUTE

app.use("/api/ai", require("./routes/aiRecommendations"));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
