import { Check, Pause, Play, Save, RotateCcw } from "lucide-react";

interface GameControlsProps {
  onCheckSolution: () => void;
  onPauseGame: () => void;
  onSaveGame: () => void;
  onResetGame: () => void;
  isPaused: boolean;
}

export default function GameControls({
  onCheckSolution,
  onPauseGame,
  onSaveGame,
  onResetGame,
  isPaused
}: GameControlsProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Actions</h3>
      <div className="space-y-3">
        <button
          onClick={onCheckSolution}
          className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center cursor-pointer"
        >
          <Check className="w-4 h-4 mr-2" />
          Check Solution
        </button>
        <button
          onClick={onPauseGame}
          className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors flex items-center justify-center cursor-pointer"
        >
          {isPaused ? <Play className="w-4 h-4 mr-2" /> : <Pause className="w-4 h-4 mr-2" />}
          {isPaused ? "Resume Game" : "Pause Game"}
        </button>
        <button
          onClick={onSaveGame}
          className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors flex items-center justify-center cursor-pointer"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Game
        </button>
        <button
          onClick={onResetGame}
          className="w-full px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-sm font-medium transition-colors flex items-center justify-center cursor-pointer"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset Game
        </button>
      </div>
    </div>
  );
}
