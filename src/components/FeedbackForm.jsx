import { useState } from "react";
import { useParams } from "react-router-dom"; // 👈 important
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

const FeedbackForm = () => {
  const { user } = useUser();
  const { categoryId } = useParams(); // 👈 fetch from URL params

  const [feedbackText, setFeedbackText] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/feedback/submit-feedback", {
        clerkUserId: user.id,
        categoryId,
        feedbackText,
        isAnonymous,
      });
      setStatus("Feedback submitted! Thank you.");
      setFeedbackText("");
      setIsAnonymous(false);
    } catch (error) {
      console.error(error);
      setStatus("Error submitting feedback.");
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-lg">
      <h2 className="text-lg font-bold mb-2">Share your feedback</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full p-2 border rounded mb-2"
          rows="4"
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
          placeholder="Your feedback..."
          required
        ></textarea>
        <div className="flex items-center gap-2 mb-2">
          <input
            type="checkbox"
            checked={isAnonymous}
            onChange={(e) => setIsAnonymous(e.target.checked)}
          />
          <label>Submit anonymously</label>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Submit
        </button>
      </form>
      {status && <p className="mt-2 text-sm">{status}</p>}
    </div>
  );
};

export default FeedbackForm;
