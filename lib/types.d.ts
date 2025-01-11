import { FieldValues } from "react-hook-form";

export type AnswerOptionType = {
  value: string;
  label: string;
};

export type QuestionType = {
  text: string;
  options: AnswerOptionType[];
  correctAnswers: string[];
  exam: string;
};

export type AnswerProps = {
  items: AnswerOptionType[];
  questionText: string;
  handleAnswer: (answer: str) => void;
  correctAnswers: string[];
  nextQuestion: () => void;
};

export type AnswerOptionProps = {
  item: AnswerOptionType;
  index: number;
  field: FieldValues;
  correctAnswers: string[];
  formSubmitted: boolean;
};

export type QuestionProps = {
  question: QuestionType;
  number: numeber;
  handleAnswer: (answer: str) => void;
  nextQuestion: () => void;
};

export type QuizProps = {
  questions: QuestionType[];
  isTimed: boolean;
  minScore: number;
  maxScore: number;
  passingScore: number;
  examTime: null | number;
  onEndQuiz?: (score: number) => void;
};

type DataType = "obj" | null;
