// 📁 backend/src/models/moodModel.js
const mongoose = require("mongoose");

const moodSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  answers: [String],
  emotion: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Mood", moodSchema);
