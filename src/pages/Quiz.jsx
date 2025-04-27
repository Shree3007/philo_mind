import React from "react";
import { Button } from "@/components/ui/button";
import { Brain, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const FeatureCard = ({ title, description, highlight }) => {
  return (
    <div
      className={`mood-card p-6 ${
        highlight ? "border-2 border-mood-primary/30" : ""
      }`}
    >
      <h3 className="text-lg font-semibold mb-2 text-mood-textPrimary">
        {title}
      </h3>
      <p className="text-mood-textSecondary">{description}</p>
    </div>
  );
};

const Quiz = () => {
  return (
    <div className=" bg-[#F5F1EA] min-h-screen flex flex-col items-center justify-center p-4 bg-mood-background pb-[120px] pt-[100px]">
      {/* Top Section */}
      <div className="text-center max-w-2xl">
        <div className="mb-6 mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-mood-primary">
          <Brain size={50} className="text-black" />
        </div>

        <h1 className="text-4xl font-bold mb-4 text-mood-textPrimary">
          Philo AI Emotional Check-In
        </h1>

        <p className="text-xl text-mood-textSecondary mb-8 leading-relaxed">
          Let Philo AI understand your emotional state and suggest personalized
          exercises for reflection, self-growth, and healing.
        </p>

        {/* Two Action Buttons */}
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <Link to="/moodquiz">
            <Button className="mood-button text-lg py-6 px-8 shadow-lg hover:shadow-xl">
              Start Mood Quiz
            </Button>
          </Link>

          <p className="text-mood-textSecondary text-base mb-1">
            If you already know how you're feeling, you can skip the quiz and
            tell AI directly!
          </p>

          <Link to="/chat-ai">
            <Button
              variant="outline"
              className="text-lg py-6 px-8 shadow hover:shadow-md"
            >
              Tell AI Directly
            </Button>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full">
        <FeatureCard
          title="5 Simple Questions"
          description="Answer five thoughtfully crafted questions to reflect on your state of mind."
          highlight
        />
        <FeatureCard
          title="AI-Powered Analysis"
          description="Our AI analyzes your mood to suggest exercises personalized to you."
          highlight
        />
        <FeatureCard
          title="Build Self-Awareness"
          description="Regular emotional check-ins can help strengthen your emotional intelligence."
          highlight
        />
      </div>
    </div>
  );
};

export default Quiz;
