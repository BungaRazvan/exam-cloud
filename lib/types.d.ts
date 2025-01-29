import { FieldValues } from "react-hook-form";

export type AnswerOptionType = {
  value: string;
  label: string;
};

export type QuestionType = {
  text: string;
  options: AnswerOptionType[];
  correctAnswers: string[];
  userAnswer?: string[];
  correct: boolean;
  exam: string;
};

export type AnswerProps = {
  items: AnswerOptionType[];
  correctAnswers: string[];
  userAnswer?: string[];
  questionText: string;
  examMode: boolean;
  readonly: boolean;
  handleAnswer: (answer: str) => void;
  nextQuestion: () => void;
};

export type AnswerOptionProps = {
  item: AnswerOptionType;
  index: number;
  field: FieldValues;
  correctAnswers: string[];
  formSubmitted: boolean;
  readonly: boolean;
};

export type QuestionProps = {
  question: QuestionType;
  number: numeber;
  examMode: boolean;
  readonly: boolean;
  handleAnswer: (answer: str) => void;
  nextQuestion: () => void;
};

export type QuizProps = {
  questions: QuestionType[];
  examMode: boolean;
  minScore: number;
  maxScore: number;
  passingScore: number;
  examTime: null | number;
  onEndQuiz?: (score: number) => void;
};

type DataType = "obj" | null;
