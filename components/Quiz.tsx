"use client";

import React, { useEffect, useRef, useState } from "react";
import Question from "./Question";
import { isEqual, sortBy, shuffle } from "lodash";
import { QuizProps } from "@/lib/types";
import Score from "./Score";
import Answers from "./Answers";

const Quiz: React.FC<QuizProps> = (props) => {
  const {
    questions,
    minScore,
    maxScore,
    passingScore,
    examTime,
    examMode,
    onEndQuiz,
  } = props;
  const [quizQuestions, setQuizQuestions] = useState(questions);
  const [answersedQuestion, setAnswersedQuestion] = useState([]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [showScore, setShowScore] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);

  const totalQuestions = quizQuestions.length;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [score, setScore] = useState(minScore);
  const [timeLeft, setTimeLeft] = useState(examTime);

  useEffect(() => {
    if (!examMode) {
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
  }, [timeLeft, examMode]);

  useEffect(() => {
    const shuffled = quizQuestions.map((question) => ({
      ...question,
      options: shuffle(question.options),
    }));

    setQuizQuestions(shuffled);
  }, [questions]);

  // Compute step size for scoring adjustment
  const step = (maxScore - minScore) / quizQuestions.length;

  const handleAnswer = (answer: string[]) => {
    const correctAnswers = quizQuestions[currentQuestionIndex].correctAnswers;

    const isCorrect = isEqual(sortBy(correctAnswers), sortBy(answer));

    setAnswersedQuestion([
      ...answersedQuestion,
      {
        ...quizQuestions[currentQuestionIndex],
        userAnswer: answer,
        correct: isCorrect,
      },
    ]);
    setScore((prevScore) => {
      if (isCorrect) {
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

    if (examMode) {
      clearInterval(timerRef.current!);
    }
    if (onEndQuiz) {
      onEndQuiz(score);
    }
  };

  const onRetry = () => {
    if (examMode) {
      setTimeLeft(examTime);
    }

    setCurrentQuestionIndex(0);
    setShowScore(false);
    setScore(minScore);
    setAnswersedQuestion([]);
    setShowAnswers(false);
  };

  return (
    <div className="flex items-center justify-center h-[90vh]">
      <div className="m-auto">
        {examMode && !showScore && (
          <h3 className="justify-end">
            Time Left: {Math.floor(timeLeft! / 60)}:{timeLeft! % 60}
          </h3>
        )}
        {showScore ? (
          <>
            <Score
              score={score}
              maxScore={maxScore}
              passingScore={passingScore}
              onRetry={onRetry}
              toggleAnswers={() => setShowAnswers(!showAnswers)}
              examMode={examMode}
            />

            {showAnswers && (
              <Answers
                answersedQuestion={answersedQuestion}
                examMode={examMode}
              />
            )}
          </>
        ) : (
          <Question
            key={"Question"}
            question={quizQuestions[currentQuestionIndex]}
            number={currentQuestionIndex + 1}
            handleAnswer={handleAnswer}
            nextQuestion={nextQuestion}
            examMode={examMode}
          />
        )}
      </div>
    </div>
  );
};

export default Quiz;
