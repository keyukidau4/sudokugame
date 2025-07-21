import { Eraser, Lightbulb } from "lucide-react";
import type { GridSize } from "@/shared/schema";

interface NumberInputPadProps {
  onNumberInput: (number: number) => void;
  onClearCell: () => void;
  onGetHint: () => void;
  disabled: boolean;
  gridSize: GridSize;
}

export default function NumberInputPad({
  onNumberInput,
  onClearCell,
  onGetHint,
  disabled,
  gridSize
}: NumberInputPadProps) {
  const numbers = Array.from({ length: gridSize }, (_, i) => i + 1);
  const cols = gridSize === 5 ? 5 : gridSize === 7 ? 7 : 5;
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Number Input</h3>
      <div className={`grid grid-cols-${cols} gap-2`}>
        {numbers.map((number) => (
          <button
            key={number}
            onClick={() => onNumberInput(number)}
            disabled={disabled}
            className="w-12 h-12 bg-gray-100 hover:bg-blue-600 hover:text-white rounded-lg text-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-100 disabled:hover:text-gray-800"
          >
            {number}
          </button>
        ))}
      </div>
      <div className="mt-4 flex space-x-2">
        <button
          onClick={onClearCell}
          disabled={disabled}
          className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          <Eraser className="w-4 h-4 mr-2" />
          Clear
        </button>
        <button
          onClick={onGetHint}
          disabled={disabled}
          className="flex-1 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          <Lightbulb className="w-4 h-4 mr-2" />
          Hint
        </button>
      </div>
    </div>
  );
}
