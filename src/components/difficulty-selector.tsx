import type { Difficulty } from "@/shared/schema";

interface DifficultySelectorProps {
  currentDifficulty: Difficulty;
  onDifficultyChange: (difficulty: Difficulty) => void;
}

export default function DifficultySelector({
  currentDifficulty,
  onDifficultyChange
}: DifficultySelectorProps) {
  const difficulties = [
    { key: "easy", label: "Easy" },
    { key: "normal", label: "Normal" },
    { key: "hard", label: "Hard" },
    { key: "very-hard", label: "Very Hard" }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onDifficultyChange(e.target.value as Difficulty);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <label htmlFor="difficulty-select" className="block text-lg font-semibold text-gray-800 mb-4">
        Difficulty
      </label>
      <select
        id="difficulty-select"
        value={currentDifficulty}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
      >
        {difficulties.map((difficulty) => (
          <option key={difficulty.key} value={difficulty.key}>
            {difficulty.label}
          </option>
        ))}
      </select>
    </div>
  );
}
