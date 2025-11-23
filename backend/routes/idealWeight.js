const express = require("express");
const router = express.Router();

// Devine Formula for Ideal Weight
const calculateIdealWeight = (height, gender) => {
  if (gender === "male") {
    return 50 + 0.91 * (height - 152);
  } else {
    return 45.5 + 0.91 * (height - 152);
  }
};

router.post("/calculate", (req, res) => {
  const { height, gender } = req.body;

  if (!height || !gender) {
    return res.status(400).json({ message: "Height and Gender are required" });
  }

  const idealWeight = calculateIdealWeight(height, gender);

  res.json({
    height,
    gender,
    idealWeight: idealWeight.toFixed(1),
  });
});

module.exports = router;
