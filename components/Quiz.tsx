"use client";

import React, { useState } from "react";
import Question from "./Question";
import { isEqual, sortBy } from "lodash";
import { QuizProps } from "@/lib/types";
import Score from "./Score";

const Quiz: React.FC<QuizProps> = (props) => {
  const [questions, setQuestions] = useState([props.questions[0]]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60 * 90);
  const [isTimeUp, setIsTimeUp] = useState(false);

  const totalQuestions = questions.length;
  const minScore = 100;
  const maxScore = 1000;
  const passingScore = 700;
  const [score, setScore] = useState(200);

  // Compute step size for scoring adjustment
  const step = (maxScore - minScore) / questions.length;

  const handleAnswer = (answer: string[]) => {
    const correctAnswers = questions[currentQuestionIndex].correctAnswers;

    setScore((prevScore) => {
      if (isEqual(sortBy(correctAnswers), sortBy(answer))) {
        return Math.min(prevScore + step, maxScore); // Cap at maxScore
      } else {
        return Math.max(prevScore - step, minScore); // Floor at minScore
      }
    });
  };

  const nextQuestion = () => {
    // Move to the next question
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      return;
    }

    setShowScore(true);
  };

  const onRetry = () => {
    setCurrentQuestionIndex(0);
    setShowScore(false);
    setScore(minScore);
  };

  return (
    <div className="flex h-[90vh]">
      <div className="m-auto">
        {showScore ? (
          <Score
            score={score}
            maxScore={maxScore}
            passingScore={passingScore}
            onRetry={onRetry}
          />
        ) : (
          <Question
            question={questions[currentQuestionIndex]}
            number={currentQuestionIndex + 1}
            handleAnswer={handleAnswer}
            nextQuestion={nextQuestion}
          />
        )}
      </div>
    </div>
  );
};

export default Quiz;
