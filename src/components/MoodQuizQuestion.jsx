import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const MoodQuizQuestion = ({
  question,
  value,
  onChange,
  onNext,
  isValid,
  isFirst,
  isLast,
  onPrev,
  onSubmit,
}) => {
  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-medium mb-4 text-mood-textPrimary">
        {question}
      </h2>

      <Textarea
        className="mood-input min-h-[80px] mb-6 w-full resize-none"
        placeholder="Write your thoughts here..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

      <div className="flex justify-between">
        {!isFirst && (
          <Button
            variant="outline"
            onClick={onPrev}
            className="mood-button-secondary"
          >
            Back
          </Button>
        )}

        <div className={cn("ml-auto", !isFirst && "flex gap-3")}>
          {isLast ? (
            <Button
              onClick={onSubmit}
              disabled={!isValid}
              className={cn(
                "mood-button",
                !isValid && "opacity-50 cursor-not-allowed"
              )}
            >
              Submit
            </Button>
          ) : (
            <Button
              onClick={onNext}
              disabled={!isValid}
              className={cn(
                "mood-button",
                !isValid && "opacity-50 cursor-not-allowed"
              )}
            >
              Next
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoodQuizQuestion;
