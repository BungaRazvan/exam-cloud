import React from "react";

import { notFound } from "next/navigation";
import { getExamData } from "../../exam-data";
import { awsCloudPractitionerResultsPath } from "@/lib/constants";
import { QuizWrapper } from "@/components/aws/cloud_practitioner/QuizWrapper";

interface PractiseExamProps {
  params: Promise<{
    id: string;
  }>;
}

const PractiseExamPage: React.FC<PractiseExamProps> = async (props) => {
  const { params } = props;

  const { id } = await params;

  const questions = await getExamData(id);

  if (!questions) {
    return notFound();
  }

  return (
    <QuizWrapper
      questions={questions}
      isTimed={false}
      examId={id}
      resultPath={awsCloudPractitionerResultsPath}
    />
  );
};

export default PractiseExamPage;
