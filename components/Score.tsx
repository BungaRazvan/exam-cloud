import classNames from "classnames";

interface ScoreProps {
  score: number; // Scaled score (100–1,000)
  maxScore: number; // Maximum score (1,000)
  passingScore: number; // Passing threshold (e.g., 700)
  onRetry: () => void; // Function to handle retry (reset score and quiz state)
}

const Score: React.FC<ScoreProps> = (props) => {
  const { score, maxScore, passingScore, onRetry } = props;
  const percentage = ((score - 100) / (maxScore - 100)) * 100; // Normalized percentage
  const hasPassed = score >= passingScore;

  const radius = 40; // Radius of the semi-circle
  const circumference = Math.PI * radius; // Circumference of the semi-circle
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col m-auto items-center space-y-10 p-12 rounded-lg max-w-sm">
      <h2
        className={classNames("text-2xl font-semibold", {
          "text-green-500": hasPassed,
          "text-red-500": !hasPassed,
        })}
      >
        {hasPassed ? "Congratulations! 🎉" : "Keep Trying!"}
      </h2>

      <div className="relative m-0">
        <svg
          width="500"
          height="500"
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
        <div className="absolute left-1/2  top-[250px] text-[100px] transform -translate-x-1/2 -translate-y-1/2 text-xl font-bold">
          {Math.floor(percentage)}%
        </div>
      </div>

      {!hasPassed && (
        <button
          onClick={onRetry}
          className="px-3 py-3 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default Score;
