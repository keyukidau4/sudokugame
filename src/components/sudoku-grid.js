import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "@/lib/utils";
export default function SudokuGrid({ grid, initialGrid, selectedCell, onCellSelect, isPaused, gridSize }) {
    const getCellClassName = (index, value) => {
        const isSelected = selectedCell === index;
        const isInitial = initialGrid[index] !== null;
        const hasValue = value !== null;
        return cn("w-10 h-10 md:w-12 md:h-12 border-2 rounded flex items-center justify-center text-lg font-semibold cursor-pointer transition-colors", {
            "bg-blue-100 border-blue-600": isSelected,
            "bg-white border-gray-300 hover:bg-blue-50": !isSelected && !isPaused,
            "bg-gray-100 border-gray-300": isPaused,
            "text-gray-800": isInitial,
            "text-blue-600": hasValue && !isInitial,
            "cursor-not-allowed": isInitial || isPaused
        });
    };
    const totalCells = gridSize * gridSize;
    const gridColsClass = `grid-cols-${gridSize}`;
    if (isPaused) {
        return (_jsx("div", { className: `grid ${gridColsClass} gap-1 p-4 bg-gray-50 rounded-lg max-w-fit mx-auto`, children: Array.from({ length: totalCells }, (_, index) => (_jsx("div", { className: "w-10 h-10 md:w-12 md:h-12 bg-gray-200 border-2 border-gray-300 rounded flex items-center justify-center", children: _jsx("div", { className: "w-2 h-2 bg-gray-400 rounded-full" }) }, index))) }));
    }
    return (_jsx("div", { className: `grid ${gridColsClass} gap-1 p-4 bg-gray-50 rounded-lg max-w-fit mx-auto`, children: grid.map((value, index) => (_jsx("div", { className: getCellClassName(index, value), onClick: () => onCellSelect(index), children: value && (_jsx("span", { className: selectedCell === index ? "text-blue-600" : "", children: value })) }, index))) }));
}
