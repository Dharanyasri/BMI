const express = require("express");
const axios = require("axios");
const router = express.Router();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// ⭐ 1) Existing: AI Health Recommendation (already working)
router.post("/recommend", async (req, res) => {
  try {
    const { bmi, category, age, gender, activityLevel } = req.body;

    if (!bmi || !category) {
      return res.status(400).json({ message: "BMI and category are required" });
    }

    const prompt = `
You are a friendly health AI.

User details:
- BMI: ${bmi}
- Category: ${category}
- Age: ${age || "not provided"}
- Gender: ${gender || "not provided"}
- Activity Level: ${activityLevel || "not provided"}

Provide:
1. Short explanation of their BMI.
2. 3 simple diet suggestions.
3. 3 no-gym exercises.
4. 2 lifestyle tips.
Keep answer clear and in bullet points.
`;

    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

    const response = await axios.post(url, {
      contents: [{ parts: [{ text: prompt }] }],
    });

    const text =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No advice generated.";

    res.json({ advice: text });
  } catch (error) {
    console.error("Gemini API error (recommend):", error?.response?.data || error.message);
    res.status(500).json({ message: "Failed to get AI recommendations from Gemini." });
  }
});

// ⭐ 2) NEW: Interactive Chatbot Endpoint
router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ message: "User message is required" });
    }

        const prompt = `
You are *FitBuddy*, a friendly, fun and smart AI Health Assistant for a BMI & Wellness website.

Your personality:
- Talk like a supportive friend, not a strict doctor.
- Use simple English and add a few emojis (but not too many).
- Always be kind, non-judgmental and encouraging.
- Give practical tips about BMI, diet, exercise, water intake, sleep and healthy habits.
- For serious medical issues, clearly say you are not a doctor and they should contact a real doctor or hospital.

Rules:
- Keep answers short, clear and structured (headings + bullet points when helpful).
- Prefer Indian-friendly food examples when giving diet tips.
- Never give extreme diet or workout advice.

Now, the user says:
"${message}"
`;
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

    const response = await axios.post(url, {
      contents: [{ parts: [{ text: prompt }] }],
    });

    const text =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't generate a response.";

    res.json({ reply: text });
  } catch (error) {
    console.error("Gemini API error (chat):", error?.response?.data || error.message);
    res.status(500).json({ message: "Failed to get AI chat response from Gemini." });
  }
});

module.exports = router;
