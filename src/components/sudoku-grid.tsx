import { cn } from "@/lib/utils";
import type { SudokuGrid, SudokuCell, GridSize } from "@/shared/schema";

interface SudokuGridProps {
  grid: SudokuGrid;
  initialGrid: SudokuGrid;
  selectedCell: number | null;
  onCellSelect: (index: number) => void;
  isPaused: boolean;
  gridSize: GridSize;
}

export default function SudokuGrid({
  grid,
  initialGrid,
  selectedCell,
  onCellSelect,
  isPaused,
  gridSize
}: SudokuGridProps) {
  const getCellClassName = (index: number, value: SudokuCell) => {
    const isSelected = selectedCell === index;
    const isInitial = initialGrid[index] !== null;
    const hasValue = value !== null;
    
    return cn(
      "w-10 h-10 md:w-12 md:h-12 border-2 rounded flex items-center justify-center text-lg font-semibold cursor-pointer transition-colors",
      {
        "bg-blue-100 border-blue-600": isSelected,
        "bg-white border-gray-300 hover:bg-blue-50": !isSelected && !isPaused,
        "bg-gray-100 border-gray-300": isPaused,
        "text-gray-800": isInitial,
        "text-blue-600": hasValue && !isInitial,
        "cursor-not-allowed": isInitial || isPaused
      }
    );
  };

  const totalCells = gridSize * gridSize;
  const gridColsClass = `grid-cols-${gridSize}`;

  if (isPaused) {
    return (
      <div className={`grid ${gridColsClass} gap-1 p-4 bg-gray-50 rounded-lg max-w-fit mx-auto`}>
        {Array.from({ length: totalCells }, (_, index) => (
          <div
            key={index}
            className="w-10 h-10 md:w-12 md:h-12 bg-gray-200 border-2 border-gray-300 rounded flex items-center justify-center"
          >
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`grid ${gridColsClass} gap-1 p-4 bg-gray-50 rounded-lg max-w-fit mx-auto`}>
      {grid.map((value, index) => (
        <div
          key={index}
          className={getCellClassName(index, value)}
          onClick={() => onCellSelect(index)}
        >
          {value && (
            <span className={selectedCell === index ? "text-blue-600" : ""}>
              {value}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
