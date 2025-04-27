import React from "react";
import { Button } from "@/components/ui/button";
import { Brain, RotateCcw, Bot } from "lucide-react";
import { Link } from "react-router-dom";

const MoodQuizResult = ({ mood, onReset }) => {
  const displayMood =
    typeof mood.emotion === "string"
      ? mood.emotion
      : JSON.stringify(mood.emotion);
  const categories = mood.categories || [];

  const openAIChat = () => {
    window.location.href = "/chat"; // Or open a modal if you use modal chat
  };

  return (
    <div className="flex flex-col items-center justify-center animate-fade-in px-4 text-center">
      <div className="mb-8">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-400 to-purple-500 blur-xl opacity-30 scale-110"></div>
          <div className="relative bg-mood-primary rounded-full p-6 shadow-lg border-4 border-white/20">
            <Brain size={48} className="text-white animate-pulse" />
          </div>
        </div>
      </div>

      <h2 className="text-2xl md:text-3xl font-semibold mb-3 text-mood-textPrimary">
        Your mood seems to be:
      </h2>

      <div className="bg-white text-mood-primary font-extrabold text-4xl px-6 py-3 rounded-xl shadow mb-6 border border-mood-primary/30">
        {displayMood}
      </div>

      <p className="text-mood-textSecondary max-w-md mb-6">
        Understanding your emotions is the first step toward clarity. Take a
        moment to reflect on this mood and what might be shaping it.
      </p>

      {categories.length > 0 ? (
        <>
          <h3 className="text-lg font-medium mb-2 text-mood-textPrimary">
            Suggested Lesson Categories:
          </h3>
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {categories.map((cat, i) => (
              <span
                key={i}
                className="bg-mood-secondary text-white px-3 py-1 rounded-full text-sm shadow"
              >
                {cat}
              </span>
            ))}
          </div>
        </>
      ) : (
        <div className="mb-6 text-center">
          <p className="text-sm text-mood-textSecondary mb-3">
            We couldn't match a category, but you can chat with our AI for
            personalized help!
          </p>
          <Link
            to="/chat-ai"
            className="inline-flex items-center bg-mood-primary text-black px-6 py-2 text-base rounded-md hover:bg-mood-primary/90 transition-colors shadow"
          >
            <Bot size={18} className="mr-2" />
            Chat with AI
          </Link>
        </div>
      )}

      <Button
        onClick={onReset}
        variant="outline"
        className="mood-button-secondary px-6 py-2 text-base flex items-center mt-4"
      >
        <RotateCcw size={18} className="mr-2" />
        Start Again
      </Button>
    </div>
  );
};

export default MoodQuizResult;
