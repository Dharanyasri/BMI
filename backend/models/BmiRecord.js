// models/BmiRecord.js
const mongoose = require("mongoose");

const bmiRecordSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bmi: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    height: Number,
    weight: Number,
    gender: String,
    units: {
      type: String,
      enum: ["metric", "imperial"],
      default: "metric",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BmiRecord", bmiRecordSchema);
