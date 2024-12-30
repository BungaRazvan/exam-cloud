import { FieldValues } from "react-hook-form";

export type AnswerOptionItem = {
  value: string;
  label: string;
};

export type AnswerProps = {
  items: AnswerOptionItem[];
  handleAnswer: (answer: str) => void;
  correctAnswers: string[];
  nextQuestion: () => void;
};

export type AnswerOptionProps = {
  item: AnswerOptionItem;
  index: number;
  field: FieldValues;
  correctAnswers: string[];
  formSubmitted: boolean;
};
