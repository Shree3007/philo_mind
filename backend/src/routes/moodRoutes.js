// 📁 src/routes/moodRoutes.js
const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const Mood = require("../models/moodModel");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/submit-mood", async (req, res) => {
  const { userId, answers } = req.body;

  console.log("🟢 Mood submission received:", { userId, answers });

  const prompt = `These are answers to a mood quiz. Respond with a single-word emotion that best describes the current mood:\n\n${answers
    .map((a, i) => `Q${i + 1}: ${a}`)
    .join("\n")}\n\nEmotion:`;

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const result = await model.generateContent(prompt);
    const response = await result.response.text();
    const emotion = response.trim().toLowerCase();

    console.log("🧠 AI response:", emotion);

    const mood = new Mood({
      userId,
      answers,
      emotion,
      timestamp: new Date(),
    });

    await mood.save();
    res.status(200).json({ emotion });
  } catch (err) {
    console.error("❌ Error in /submit-mood:", err.message);
    res.status(500).json({ error: "Failed to process mood." });
  }
});

module.exports = router; // ✅ Don't forget this line!
