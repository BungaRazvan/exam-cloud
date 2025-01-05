"use client";

import React, { useEffect, useRef, useState } from "react";
import Question from "./Question";
import { isEqual, sortBy } from "lodash";
import { QuizProps } from "@/lib/types";
import Score from "./Score";

const Quiz: React.FC<QuizProps> = (props) => {
  const { isTimed, questions } = props;
  const [quizQuestions, _setQuizQuestions] = useState(questions);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [_isTimeUp, setIsTimeUp] = useState(false);

  const totalQuestions = questions.length;
  const minScore = 100;
  const maxScore = 1000;
  const passingScore = 700;
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const examTime = 60 * 90;

  const [score, setScore] = useState(minScore);
  const [timeLeft, setTimeLeft] = useState(60 * 90);

  useEffect(() => {
    if (!isTimed) {
      return () => {};
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => Math.max(prevTime - 1, 0));
    }, 1000);
    timerRef.current = timer;

    if (timeLeft === 0) {
      clearInterval(timer);
      setIsTimeUp(true);
    }

    return () => clearInterval(timer);
  }, [timeLeft, isTimed]);

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

    if (isTimed) {
      clearInterval(timerRef.current!);
    }
  };

  const onRetry = () => {
    if (isTimed) {
      setTimeLeft(examTime);
    }

    setCurrentQuestionIndex(0);
    setIsTimeUp(false);
    setShowScore(false);
    setScore(minScore);
  };

  return (
    <div className="flex h-[90vh]">
      <div className="m-auto">
        <h3>
          Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60}
        </h3>
        {showScore ? (
          <Score
            score={score}
            maxScore={maxScore}
            passingScore={passingScore}
            onRetry={onRetry}
          />
        ) : (
          <Question
            question={quizQuestions[currentQuestionIndex]}
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
