"use client";

import React from "react";
import { setExamResult } from "@/lib/utils";
import Quiz from "@/components/Quiz";
import { QuestionType } from "@/lib/types";

interface QuizWrapperProps {
  questions: QuestionType[];
  examId: string;
  resultPath: string | null;
  examMode: boolean;
}

export const QuizWrapper: React.FC<QuizWrapperProps> = (props) => {
  const { questions, examId, resultPath, examMode } = props;
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
      examMode={examMode}
      minScore={100}
      maxScore={1000}
      passingScore={passingScore}
      examTime={60 * 60}
      onEndQuiz={onEndQuiz}
    />
  );
};
