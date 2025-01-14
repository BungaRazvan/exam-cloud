import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface ScoreScreenProps {
  score: number; // Scaled score (100–1,000)
  maxScore: number; // Maximum score (1,000)
  passingScore: number; // Passing threshold (e.g., 700)
  examMode: boolean;
  onRetry: () => void; // Function to handle retry (reset score and quiz state)
}

const Result: React.FC<ScoreScreenProps> = (props) => {
  const { score, maxScore, hasPassed } = props;
  const percentage = ((score - 100) / (maxScore - 100)) * 100; // Normalized percentage

  const radius = 40; // Radius of the semi-circle
  const circumference = Math.PI * radius; // Circumference of the semi-circle
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col m-auto items-center space-y-10 p-12 rounded-lg max-w-sm">
      <h2
        className={cn("text-2xl font-semibold", {
          "text-green-500": hasPassed,
          "text-red-500": !hasPassed,
        })}
      >
        {hasPassed ? "Congratulations! 🎉" : "Keep Trying!"}
      </h2>

      <div className="relative m-0">
        <svg
          width="500"
          height="250"
          viewBox="0 0 100 50"
          className="overflow-visible"
        >
          <path
            d="M 10 40 A 40 40 0 1 1 90 40"
            fill="none"
            stroke="#ef4444"
            strokeWidth="1"
          />
          {/* Progress Path */}
          <path
            d="M 10 40 A 40 40 0 1 1 90 40"
            fill="none"
            stroke="#22c55e"
            strokeWidth="1"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
        {/* Score Label */}
        <div className="absolute left-1/2 top-[125px] text-[75px] transform -translate-x-1/2 -translate-y-1/2 font-bold">
          {Math.floor(percentage)}%
        </div>
      </div>
    </div>
  );
};

const ScoreScreen: React.FC<ScoreScreenProps> = (props) => {
  const { score, maxScore, passingScore, examMode, onRetry } = props;

  const hasPassed = score >= passingScore;

  return (
    <>
      <Result
        score={score}
        maxScore={maxScore}
        passingScore={passingScore}
        hasPassed={hasPassed}
      />

      <div className="flex justify-around">
        {!hasPassed && (
          <Button
            style={{ margin: "0px !important" }}
            className="p-5 text-white text-xl"
            onClick={onRetry}
            variant={"outline"}
          >
            Retry
          </Button>
        )}

        {!examMode && (
          <Button
            style={{ margin: "0px !important" }}
            className="p-5 text-white text-xl"
            onClick={onRetry}
            variant={"outline"}
          >
            Answers
          </Button>
        )}

        {examMode && (
          <Button
            style={{ margin: "0px !important" }}
            className="p-5 text-white text-xl"
            onClick={onRetry}
            variant={"outline"}
          >
            Answers
          </Button>
        )}
      </div>
    </>
  );
};

export default ScoreScreen;
