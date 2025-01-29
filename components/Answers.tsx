import React, { ReactNode } from "react";
import Question from "./Question";
import { filter } from "lodash";
import { QuestionType } from "@/lib/types";

interface AnswerProps {
  answersedQuestion: QuestionType[];
  examMode: boolean;
}

const Answers: React.FC<AnswerProps> = (props) => {
  const { answersedQuestion, examMode } = props;
  const items: ReactNode[] = [];

  const questions = examMode
    ? answersedQuestion
    : filter(answersedQuestion, (question) => !question.correct);

  questions.map((question: QuestionType, index: number) => {
    items.push(
      <div className="mt-2">
        <Question
          key={index + "Question"}
          question={question}
          number={index + 1}
          readonly={true}
          examMode={false}
          handleAnswer={() => {}}
          nextQuestion={() => {}}
        />
      </div>
    );
  });

  return items;
};

export default Answers;
