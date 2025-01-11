"use client";

import React, { useEffect, useRef, useState } from "react";
import Question from "./Question";
import { isEqual, sortBy } from "lodash";
import { QuizProps } from "@/lib/types";
import Score from "./Score";

const Quiz: React.FC<QuizProps> = (props) => {
  const {
    isTimed,
    questions,
    onEndQuiz,
    minScore,
    maxScore,
    passingScore,
    examTime,
  } = props;
  const [quizQuestions, _setQuizQuestions] = useState(questions);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const totalQuestions = quizQuestions.length;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [score, setScore] = useState(minScore);
  const [timeLeft, setTimeLeft] = useState(examTime);

  useEffect(() => {
    if (!isTimed) {
      return () => {};
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => Math.max(prevTime! - 1, 0));
    }, 1000);
    timerRef.current = timer;

    if (timeLeft === 0) {
      clearInterval(timer);
      setShowScore(true);
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
    if (hasMoreQuestions()) {
      goToNextQuestion();
    } else {
      handleEndOfQuiz();
    }
  };

  const hasMoreQuestions = () => {
    return currentQuestionIndex < totalQuestions - 1;
  };

  const goToNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handleEndOfQuiz = () => {
    setShowScore(true);

    if (isTimed) {
      clearInterval(timerRef.current!);
    }
    if (onEndQuiz) {
      onEndQuiz(score);
    }
  };

  const onRetry = () => {
    if (isTimed) {
      setTimeLeft(examTime);
    }

    setCurrentQuestionIndex(0);
    setShowScore(false);
    setScore(minScore);
  };

  return (
    <div className="flex items-center justify-center h-[90vh]">
      <div className="m-auto">
        {isTimed && !showScore && (
          <h3 className="justify-end">
            Time Left: {Math.floor(timeLeft! / 60)}:{timeLeft! % 60}
          </h3>
        )}
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
