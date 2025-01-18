"use client";

import React from "react";
import MultipleAnswers from "./MultipleAnswers";
import SingleAnswer from "./SingleAnswer";
import { Card, CardContent, CardHeader } from "./ui/card";
import { QuestionProps } from "@/lib/types";

const Question: React.FC<QuestionProps> = (props) => {
  const { question, number, examMode, handleAnswer, nextQuestion } = props;

  return (
    <Card className="md:w-[920px]">
      <CardHeader>
        {number}. {question.text}
      </CardHeader>
      <CardContent>
        {question.correctAnswers.length > 1 ? (
          <MultipleAnswers
            items={question.options}
            questionText={question.text}
            handleAnswer={handleAnswer}
            correctAnswers={question.correctAnswers}
            nextQuestion={nextQuestion}
            examMode={examMode}
          />
        ) : (
          <SingleAnswer
            items={question.options}
            handleAnswer={handleAnswer}
            correctAnswers={question.correctAnswers}
            questionText={question.text}
            nextQuestion={nextQuestion}
            examMode={examMode}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default Question;
