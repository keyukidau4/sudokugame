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
    { key: 5, label: "5x5" },
    { key: 7, label: "7x7" },
    { key: 10, label: "10x10" }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onGridSizeChange(parseInt(e.target.value) as GridSize);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <label htmlFor="grid-size-select" className="block text-lg font-semibold text-gray-800 mb-4">
        Grid Size
      </label>
      <select
        id="grid-size-select"
        value={currentGridSize}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
      >
        {gridSizes.map((gridSize) => (
          <option key={gridSize.key} value={gridSize.key}>
            {gridSize.label}
          </option>
        ))}
      </select>
    </div>
  );
}