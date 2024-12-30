import React from "react";
import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import Quiz from "@/components/Quiz";

interface PractiseExamProps {
  params: Promise<{
    id: string;
  }>;
}

const PractiseExamPage: React.FC<PractiseExamProps> = async (props) => {
  const { params } = props;

  const { id } = await params;

  const getExamData = (id: string) => {
    const filePath = path.join(
      process.cwd(),
      "exams",
      "aws",
      "cloud-practitioner",
      `AWS_Practice_Exam_${id}.json`
    );

    try {
      return JSON.parse(fs.readFileSync(filePath, "utf-8"));
    } catch {
      return null;
    }
  };

  const questions = getExamData(id);

  if (!questions) {
    return notFound();
  }
  return <Quiz questions={questions} />;
};

export default PractiseExamPage;
