import React from "react";
import { Button } from "@/components/ui/button";
import { Brain, RotateCcw } from "lucide-react";

const MoodQuizResult = ({ mood, onReset }) => {
  console.log("🧠 MoodQuizResult received:", mood);

  const displayMood = typeof mood === "string" ? mood : JSON.stringify(mood);

  return (
    <div className="flex flex-col items-center justify-center animate-fade-in   px-4 text-center">
      {/* Glowing Brain Icon */}
      <div className="mb-8">
        <div className="relative">
          {/* Glowing Background */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-400 to-purple-500 blur-xl opacity-30 scale-110"></div>
          {/* Brain Container */}
          <div className="relative bg-mood-primary rounded-full p-6 shadow-lg border-4 border-white/20">
            <Brain size={48} className="text-white animate-pulse" />
          </div>
        </div>
      </div>

      {/* Heading */}
      <h2 className="text-2xl md:text-3xl font-semibold mb-3 text-mood-textPrimary">
        Your mood seems to be:
      </h2>

      {/* Mood Label */}
      <div className="bg-white text-mood-primary font-extrabold text-4xl px-6 py-3 rounded-xl shadow mb-6 border border-mood-primary/30">
        {displayMood}
      </div>

      {/* Mood Explanation */}
      <p className="text-mood-textSecondary max-w-md mb-10">
        Understanding your emotions is the first step toward clarity. Take a
        moment to reflect on this mood and what might be shaping it.
      </p>

      {/* Reset Button */}
      <Button
        onClick={onReset}
        variant="outline"
        className="mood-button-secondary px-6 py-2 text-base flex items-center"
      >
        <RotateCcw size={18} className="mr-2" />
        Start Again
      </Button>
    </div>
  );
};

export default MoodQuizResult;
