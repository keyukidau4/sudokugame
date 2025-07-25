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
    <div className="bg-white rounded-xl shadow-lg p-2">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Actions</h3>
      <div className="space-y-3">
        <button
          onClick={onPauseGame}
          className="flex items-center w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors  cursor-pointer"
        >
          {isPaused ? <Play className="w-4 h-4 mr-2" /> : <Pause className="w-4 h-4 mr-2" />}
          {isPaused ? 'Play' : 'Pause'}
        </button>
        <button
          onClick={onResetGame}
          className="flex items-center w-full px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-sm font-medium transition-colors  cursor-pointer"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </button>
      </div>
    </div>
  );
}
