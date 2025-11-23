// routes/bmi.js
const express = require("express");
const BmiRecord = require("../models/BMIRecord");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// Helper: calculate BMI from units
function calculateBMI({ height, weight, units }) {
  let hInMeters;
  let wInKg;

  if (units === "metric") {
    // height in cm, weight in kg
    hInMeters = height / 100;
    wInKg = weight;
  } else {
    // imperial: height in inches, weight in lbs
    // 1 inch = 0.0254m, 1 lb = 0.453592kg
    hInMeters = height * 0.0254;
    wInKg = weight * 0.453592;
  }

  const bmi = wInKg / (hInMeters * hInMeters);
  return Number(bmi.toFixed(2));
}

function getBMICategory(bmi) {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal";
  if (bmi < 30) return "Overweight";
  return "Obese";
}

// POST /api/bmi/calculate
router.post("/calculate", async (req, res) => {
  try {
    const { height, weight, gender, units = "metric" } = req.body;

    if (!height || !weight) {
      return res
        .status(400)
        .json({ message: "Height and weight are required" });
    }

    const bmi = calculateBMI({ height, weight, units });
    const category = getBMICategory(bmi);

    res.json({ bmi, category, gender, units });
  } catch (err) {
    console.error("BMI calculate error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/bmi/save  (requires login)
router.post("/save", auth, async (req, res) => {
  try {
    const { height, weight, gender, units = "metric" } = req.body;

    if (!height || !weight) {
      return res
        .status(400)
        .json({ message: "Height and weight are required" });
    }

    const bmi = calculateBMI({ height, weight, units });
    const category = getBMICategory(bmi);

    const record = await BmiRecord.create({
      user: req.user.id,
      bmi,
      category,
      height,
      weight,
      gender,
      units,
    });

    res.status(201).json({
      message: "BMI record saved",
      record,
    });
  } catch (err) {
    console.error("BMI save error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/bmi/history  (requires login)
router.get("/history", auth, async (req, res) => {
  try {
    const records = await BmiRecord.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .lean();

    res.json({ records });
  } catch (err) {
    console.error("BMI history error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
