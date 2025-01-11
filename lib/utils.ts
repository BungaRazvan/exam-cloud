import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { DataType } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getLS(key: string, defVal: any, dataType: DataType) {
  let results = localStorage.getItem(key);

  if (results === null) {
    return defVal;
  }

  if (dataType == "obj") {
    return JSON.parse(results);
  }

  return results;
}

export function setExamResult(
  examPath: string,
  id: number | string,
  result: any
) {
  const examResults = getLS(examPath, {}, "obj");
  examResults[id] = result;
  localStorage.setItem(`${examPath}`, JSON.stringify(examResults));
}
