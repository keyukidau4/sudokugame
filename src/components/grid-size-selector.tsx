import { Grid3x3, Grid2x2, LayoutGrid } from "lucide-react";
import type { GridSize } from "@/shared/schema";

interface GridSizeSelectorProps {
  currentGridSize: GridSize;
  onGridSizeChange: (gridSize: GridSize) => void;
}

export default function GridSizeSelector({
  currentGridSize,
  onGridSizeChange
}: GridSizeSelectorProps) {
  const gridSizes = [
    { key: 5, label: "5x5", icon: Grid2x2, color: "bg-green-100 text-green-700 hover:bg-green-200" },
    { key: 7, label: "7x7", icon: Grid3x3, color: "bg-blue-100 text-blue-700 hover:bg-blue-200" },
    { key: 10, label: "10x10", icon: LayoutGrid, color: "bg-purple-100 text-purple-700 hover:bg-purple-200" }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Grid Size</h3>
      <div className="space-y-2">
        {gridSizes.map((gridSize) => {
          const Icon = gridSize.icon;
          const isSelected = currentGridSize === gridSize.key;
          
          return (
            <button
              key={gridSize.key}
              onClick={() => onGridSizeChange(gridSize.key as GridSize)}
              className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center cursor-pointer ${
                isSelected
                  ? "bg-blue-600 text-white"
                  : gridSize.color
              }`}
            >
              <Icon className="w-4 h-4 mr-2" />
              {gridSize.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}