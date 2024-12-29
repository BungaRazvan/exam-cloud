"use client";

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
  const { question, number, handleAnswer } = props;

  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <Card className="w-[980px]">
          <CardHeader>
            {number}. {question.text}
          </CardHeader>
          <CardContent>
            <SingleAnswer
              items={shuffle(question.options)}
              handleAnswer={handleAnswer}
              correctAnswers={question.correctAnswers}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
