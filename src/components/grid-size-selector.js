import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Grid3x3, Grid2x2, LayoutGrid } from "lucide-react";
export default function GridSizeSelector({ currentGridSize, onGridSizeChange }) {
    const gridSizes = [
        { key: 5, label: "5x5", icon: Grid2x2, color: "bg-green-100 text-green-700 hover:bg-green-200" },
        { key: 7, label: "7x7", icon: Grid3x3, color: "bg-blue-100 text-blue-700 hover:bg-blue-200" },
        { key: 10, label: "10x10", icon: LayoutGrid, color: "bg-purple-100 text-purple-700 hover:bg-purple-200" }
    ];
    return (_jsxs("div", { className: "bg-white rounded-xl shadow-lg p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-800 mb-4", children: "Grid Size" }), _jsx("div", { className: "space-y-2", children: gridSizes.map((gridSize) => {
                    const Icon = gridSize.icon;
                    const isSelected = currentGridSize === gridSize.key;
                    return (_jsxs("button", { onClick: () => onGridSizeChange(gridSize.key), className: `w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center cursor-pointer ${isSelected
                            ? "bg-blue-600 text-white"
                            : gridSize.color}`, children: [_jsx(Icon, { className: "w-4 h-4 mr-2" }), gridSize.label] }, gridSize.key));
                }) })] }));
}
