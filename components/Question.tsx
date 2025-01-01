"use client";

import React, { useMemo } from "react";
import MultipleAnswers from "./MultipleAnswers";
import SingleAnswer from "./SingleAnswer";
import { Card, CardContent, CardHeader } from "./ui/card";
import { shuffle } from "lodash";
import { QuestionProps } from "@/lib/types";

const Question: React.FC<QuestionProps> = (props) => {
  const { question, number, handleAnswer, nextQuestion } = props;
  const suffledOptions = useMemo(
    () => shuffle(question.options),
    [question.text]
  );

  return (
    <Card className="max-w-[980px]">
      <CardHeader>
        {number}. {question.text}
      </CardHeader>
      <CardContent>
        {question.correctAnswers.length > 1 ? (
          <MultipleAnswers
            items={suffledOptions}
            handleAnswer={handleAnswer}
            correctAnswers={question.correctAnswers}
            nextQuestion={nextQuestion}
          />
        ) : (
          <SingleAnswer
            items={suffledOptions}
            handleAnswer={handleAnswer}
            correctAnswers={question.correctAnswers}
            nextQuestion={nextQuestion}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default Question;
