import React, { useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import { Card } from "@/components/ui/card";
import MoodQuizProgress from "@/components/MoodQuizProgress";
import MoodQuizQuestion from "@/components/MoodQuizQuestion";
import MoodQuizResult from "@/components/MoodQuizResult";
import { Brain } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const quizQuestions = [
  "How are you feeling today?",
  "Did anything stressful happen recently?",
  "Do you feel energized or tired?",
  "Have you been socially active lately?",
  "What's been on your mind most of the time?",
];

const analyzeMood = async (userId, answers) => {
  try {
    const res = await axios.post("http://localhost:5000/api/submit-mood", {
      userId,
      answers,
    });

    return {
      emotion: res.data.emotion || "unknown",
      categories: res.data.suggestedCategories || [],
    };
  } catch (error) {
    console.error("❌ Error submitting mood:", error);
    return { emotion: "error", categories: [] };
  }
};

const MoodQuiz = () => {
  const { user } = useUser();
  const userId = user?.id;

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState(Array(quizQuestions.length).fill(""));
  const [mood, setMood] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const updateAnswer = (value) => {
    const newAnswers = [...answers];
    newAnswers[currentStep] = value;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentStep < quizQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!userId) {
      toast({
        title: "User not logged in",
        description: "Please log in to complete the quiz.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    const moodData = await analyzeMood(userId, answers);
    console.log("🔥 analyzedMood:", moodData);

    setMood(moodData);
    setIsSubmitting(false);

    toast({
      title: "Mood Analysis Complete",
      description: `AI detected: ${moodData.emotion}`,
    });
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers(Array(quizQuestions.length).fill(""));
    setMood(null);
  };

  const showQuestions = mood === null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b bg-[#F5F1EA] px-4 py-10 pt-[100px] pb-[100px]">
      <Card className="mood-card w-full max-w-2xl rounded-2xl shadow-2xl border border-gray-100">
        <div className="p-6 sm:p-8">
          {!isSubmitting ? (
            <>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-mood-primary/10 p-2 rounded-full">
                  <Brain size={24} className="text-mood-primary" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-semibold text-mood-textPrimary">
                  Mood Quiz
                </h1>
              </div>

              {showQuestions ? (
                <>
                  <MoodQuizProgress
                    currentStep={currentStep + 1}
                    totalSteps={quizQuestions.length}
                  />

                  <MoodQuizQuestion
                    question={quizQuestions[currentStep]}
                    value={answers[currentStep]}
                    onChange={updateAnswer}
                    onNext={handleNext}
                    isValid={answers[currentStep].trim().length > 0}
                    isFirst={currentStep === 0}
                    isLast={currentStep === quizQuestions.length - 1}
                    onPrev={handlePrev}
                    onSubmit={handleSubmit}
                  />
                </>
              ) : (
                <MoodQuizResult mood={mood} onReset={resetQuiz} />
              )}
            </>
          ) : (
            <div className="py-16 flex flex-col items-center animate-fade-in">
              <div className="relative">
                <div className="absolute -inset-2 bg-mood-primary/40 rounded-full blur-md opacity-60 z-0"></div>
                <div className="relative z-10 bg-mood-primary rounded-full p-5">
                  <Brain size={36} className="text-white animate-pulse" />
                </div>
              </div>
              <h2 className="mt-6 text-xl font-semibold text-mood-textPrimary">
                Analyzing your responses...
              </h2>
              <p className="mt-2 text-sm text-mood-textSecondary text-center max-w-md">
                Using AI to understand your current emotional state. This won’t
                take long!
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default MoodQuiz;
