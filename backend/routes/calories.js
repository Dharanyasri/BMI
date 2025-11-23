const express = require("express");
const router = express.Router();

// Mifflin–St Jeor Formula
const calculateCalories = (gender, age, height, weight, activity) => {
  let bmr;

  if (gender === "male") {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  const activityLevels = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9,
  };

  return bmr * activityLevels[activity];
};

router.post("/calculate", (req, res) => {
  const { gender, age, height, weight, activity } = req.body;

  if (!gender || !age || !height || !weight || !activity) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const calories = calculateCalories(gender, age, height, weight, activity);

  res.json({
    gender,
    age,
    height,
    weight,
    activity,
    calories: Math.round(calories),
  });
});

module.exports = router;
