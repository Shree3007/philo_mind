import React from "react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

const MoodQuizProgress = ({ currentStep, totalSteps }) => {
  const percentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="w-full mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-mood-textSecondary">Progress</span>
        <span className="text-sm font-medium text-mood-primary">
          {currentStep}/{totalSteps}
        </span>
      </div>
      <Progress value={percentage} className="h-2 bg-mood-secondary/20" />
    </div>
  );
};

export default MoodQuizProgress;
