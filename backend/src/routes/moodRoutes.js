const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const Mood = require("../models/moodModel");
const LessonCategory = require("../models/lessonCategory"); 

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/submit-mood", async (req, res) => {
  const { userId, answers } = req.body;

  console.log("Mood submission received:", { userId, answers });

  // Construct the prompt for Gemini AI based on the user's mood answers
  const prompt = `These are answers to a mood quiz. Respond with a single-word emotion that best describes the current mood:\n\n${answers
    .map((a, i) => `Q${i + 1}: ${a}`)
    .join("\n")}\n\nEmotion:`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Generate response from Gemini AI
    const result = await model.generateContent(prompt);
    const response = await result.response.text();
    const emotion = response.trim().toLowerCase();

    console.log(" AI response (emotion):", emotion);

    // Save mood response to the database
    const mood = new Mood({
      userId,
      answers,
      emotion,
      timestamp: new Date(),
    });

    await mood.save();

    // Define the emotion to category mapping
    const emotionToCategories = {
      happy: ["Happiness", "Mindfulness","joyful","optimistic"],
      sad: ["Emotional Balance", "Self-Reflection"],
      stressed: ["Stress Management", "Relaxation Techniques"],
      tired: ["Energy Boost", "Self-Care"],
      anxious: ["Calmness", "Mindfulness"],
      overwhelmed: ["Stress Management", "Mindfulness","Time Management"],
      lonely: ["Connection", "Self-Reflection"],
      motivated: ["Goal Setting", "Personal Growth"],
      // Add more mappings as needed...
    };

    // Default to "Emotional Balance" if no emotion match is found
    const categories = emotionToCategories[emotion];

    // Fetch category documents from the LessonCategory collection
    const categoryDocs = await LessonCategory.find({ name: { $in: categories } });
    // Get the names of the matched categories
    const categoryNames = categoryDocs.map(cat => cat.name);

    // Return the suggested category names to the frontend
    res.status(200).json({ emotion, suggestedCategories: categoryNames });
  } catch (err) {
    console.error(" Error in /submit-mood:", err.message);
    res.status(500).json({ error: "Failed to process mood." });
  }
});

module.exports = router;
