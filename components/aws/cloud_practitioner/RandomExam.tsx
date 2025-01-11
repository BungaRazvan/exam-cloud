import fs from "fs";
import path from "path";
import { map, filter } from "lodash";
import { notFound } from "next/navigation";
import { QuestionType } from "@/lib/types";
import { QuizWrapper } from "./QuizWrapper";

interface RandomExamProps {
  isTimed: boolean;
}
const RandomExam: React.FC<RandomExamProps> = (props) => {
  const { isTimed } = props;

  const getQuestions = () => {
    let questions: QuestionType[] = [];
    const folderPath = path.join(
      process.cwd(),
      "exams",
      "aws",
      "cloud-practitioner"
    );
    const filePaths = filter(map(fs.readdirSync(folderPath)), (filePath) =>
      filePath.endsWith(".json")
    );

    filePaths.map((filePath) => {
      try {
        questions = questions.concat(
          JSON.parse(fs.readFileSync(path.join(folderPath, filePath), "utf-8"))
        );
      } catch {}
    });

    return questions;
  };

  const questions = getQuestions();

  if (questions.length < 50) {
    return notFound();
  }

  const getRandomItems = <T,>(array: Array<T>, count: number): Array<T> => {
    if (array.length < count) {
      throw new Error(
        "Not enough items in the array to select the desired count."
      );
    }

    // Shuffle the array randomly
    const shuffled = [...array].sort(() => Math.random() - 0.5);

    // Return the first `count` items
    return shuffled.slice(0, count);
  };

  const randomQuestions = getRandomItems(questions, 50);

  return (
    <QuizWrapper
      questions={randomQuestions}
      isTimed={isTimed}
      examId={""}
      resultPath={null}
    />
  );
};

export default RandomExam;
