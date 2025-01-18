import React from "react";
import Question from "./Question";

const Answers = (props) => {
  const { answersedQuestion } = props;
  const items = [];

  answersedQuestion.map((question, index) => {
    items.push(
      <div className="mt-2">
        <Question
          key={index}
          question={question}
          number={index + 1}
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
