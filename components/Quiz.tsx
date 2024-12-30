"use client";

import React, { useState } from "react";
import Question from "./Question";
import { isEqual, sortBy } from "lodash";

const Quiz: React.FC<{}> = (props) => {
  const [questions, setQuestions] = useState(props.questions);

  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds
  const [isTimeUp, setIsTimeUp] = useState(false);

  const totalQuestions = questions.length;
  const minScore = 100;
  const maxScore = 1000;
  const passingScore = 700;

  const handleAnswer = (answer: string[]) => {
    const correctAnswers = questions[currentQuestionIndex].correctAnswers;

    if (isEqual(sortBy(correctAnswers), sortBy(answer))) {
      setScore((prevScore) => prevScore + 1);
    } else {
      setScore((prevScore) => {
        if (prevScore === 0) {
          return 0;
        }
        return prevScore - 1;
      });
    }
  };

  const nextQuestion = () => {
    // Move to the next question
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      return;
    }
  };
  return (
    <>
      <Question
        question={questions[currentQuestionIndex]}
        number={currentQuestionIndex + 1}
        handleAnswer={handleAnswer}
        nextQuestion={nextQuestion}
      />
      ,
    </>
  );
};

export default Quiz;
