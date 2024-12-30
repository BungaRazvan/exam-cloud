"use client";

import MultipleAnswers from "./MultipleAnswers";
import SingleAnswer from "./SingleAnswer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { shuffle } from "lodash";

export default function Question(props) {
  const { question, number, handleAnswer, nextQuestion } = props;

  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <Card className="w-[980px]">
          <CardHeader>
            {number}. {question.text}
          </CardHeader>
          <CardContent>
            {question.correctAnswers.length > 1 ? (
              <MultipleAnswers
                items={shuffle(question.options)}
                handleAnswer={handleAnswer}
                correctAnswers={question.correctAnswers}
                nextQuestion={nextQuestion}
              />
            ) : (
              <SingleAnswer
                items={shuffle(question.options)}
                handleAnswer={handleAnswer}
                correctAnswers={question.correctAnswers}
                nextQuestion={nextQuestion}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
