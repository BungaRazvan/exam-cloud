import fs from "fs";
import path from "path";

export async function getExamData(id: string) {
  const filePath = path.join(
    process.cwd(),
    "exams",
    "aws",
    "cloud-practitioner",
    `AWS_Practice_Exam_${id}.json`
  );

  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return null;
  }
}
