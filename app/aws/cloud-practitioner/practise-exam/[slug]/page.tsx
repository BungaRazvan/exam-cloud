"use client";

import { useParams } from "next/navigation";

interface PractiseExamProps {
  slug: string;
}

const PractiseExam: React.FC<PractiseExamProps> = (props) => {
  const { slug } = useParams();

  console.log(slug);

  return <div>page</div>;
};

export default PractiseExam;
