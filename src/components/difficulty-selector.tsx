import { Smile, Meh, Frown, Haze } from "lucide-react";
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
    { key: "easy", label: "Easy", icon: Smile, color: "bg-green-100 text-green-700 hover:bg-green-200" },
    { key: "normal", label: "Normal", icon: Meh, color: "bg-blue-100 text-blue-700 hover:bg-blue-200" },
    { key: "hard", label: "Hard", icon: Frown, color: "bg-orange-100 text-orange-700 hover:bg-orange-200" },
    { key: "very-hard", label: "Very Hard", icon: Haze, color: "bg-red-100 text-red-700 hover:bg-red-200" }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Difficulty</h3>
      <div className="space-y-2">
        {difficulties.map((difficulty) => {
          const Icon = difficulty.icon;
          const isSelected = currentDifficulty === difficulty.key;
          
          return (
            <button
              key={difficulty.key}
              onClick={() => onDifficultyChange(difficulty.key as Difficulty)}
              className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center cursor-pointer ${
                isSelected
                  ? "bg-blue-600 text-white"
                  : difficulty.color
              }`}
            >
              <Icon className="w-4 h-4 mr-2" />
              {difficulty.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
