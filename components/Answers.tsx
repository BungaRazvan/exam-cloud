import React from "react";
import Question from "./Question";
import { filter } from "lodash";

const Answers = (props) => {
  const { answersedQuestion, examMode } = props;
  const items = [];

  const questions = examMode
    ? answersedQuestion
    : filter(answersedQuestion, (question) => !question.correct);

  questions.map((question, index) => {
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
