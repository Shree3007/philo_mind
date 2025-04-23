import { useState } from "react";
import axios from "axios";

const questions = [
  "How are you feeling today?",
  "Did anything stressful happen recently?",
  "Do you feel energized or tired?",
  "Have you been socially active lately?",
  "What’s been on your mind most of the time?",
];

const MoodQuiz = ({ userId }) => {
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [emotion, setEmotion] = useState("");

  const handleAnswerChange = (value) => {
    const updated = [...answers];
    updated[currentQuestion] = value;
    setAnswers(updated);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await axios.post("http://localhost:5000/api/submit-mood", {
        userId,
        answers,
      });
      const mood = res.data.emotion;
      setEmotion(mood);
    } catch (err) {
      console.error("Quiz submit error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  if (emotion) {
    return (
      <div className="bg-white p-4 rounded-xl shadow text-center">
        <h3 className="text-lg font-semibold">🧠 Detected Mood</h3>
        <p className="text-md font-bold capitalize mt-1">{emotion}</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="text-lg font-semibold mb-4">🧠 Mood Quiz</h3>
      <div className="mb-3">
        <label className="text-sm block mb-1">
          {questions[currentQuestion]}
        </label>
        <input
          value={answers[currentQuestion]}
          onChange={(e) => handleAnswerChange(e.target.value)}
          className="w-full border rounded px-3 py-2 text-sm"
        />
      </div>
      <button
        onClick={handleNext}
        disabled={submitting || !answers[currentQuestion].trim()}
        className="w-full bg-black text-white rounded py-2 mt-3"
      >
        {currentQuestion === questions.length - 1
          ? submitting
            ? "Submitting..."
            : "Submit"
          : "Next"}
      </button>
    </div>
  );
};

export default MoodQuiz;
