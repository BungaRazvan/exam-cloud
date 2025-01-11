"use client";

import React from "react";
import { setExamResult } from "@/lib/utils";
import Quiz from "@/components/Quiz";

interface QuizWrapperProps {
  questions: any;
  examId: string;
  resultPath: string | null;
  isTimed: boolean;
}

export const QuizWrapper: React.FC<QuizWrapperProps> = (props) => {
  const { questions, examId, resultPath, isTimed } = props;
  const passingScore = 700;

  const onEndQuiz = (finalScore: number) => {
    if (!resultPath) {
      return;
    }

    if (finalScore >= passingScore) {
      setExamResult(resultPath, examId, true);
    } else {
      setExamResult(resultPath, examId, false);
    }
  };

  return (
    <Quiz
      questions={questions}
      isTimed={isTimed}
      minScore={100}
      maxScore={1000}
      passingScore={passingScore}
      examTime={60 * 60}
      onEndQuiz={onEndQuiz}
    />
  );
};
