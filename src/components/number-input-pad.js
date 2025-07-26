import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Eraser } from "lucide-react";
export default function NumberInputPad({ onNumberInput, onClearCell, disabled, gridSize, }) {
    const numbers = Array.from({ length: gridSize }, (_, i) => i + 1);
    const cols = gridSize === 5 ? 5 : gridSize === 7 ? 7 : 5;
    return (_jsxs("div", { className: "bg-white rounded-xl shadow-lg p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-800 mb-4", children: "Number Input" }), _jsx("div", { className: `grid grid-cols-${cols} gap-2`, children: numbers.map((number) => (_jsx("button", { onClick: () => onNumberInput(number), disabled: disabled, className: "w-12 h-12 bg-gray-100 hover:bg-blue-600 hover:text-white rounded-lg text-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-100 disabled:hover:text-gray-800", children: number }, number))) }), _jsx("div", { className: "mt-4 flex space-x-2", children: _jsxs("button", { onClick: onClearCell, disabled: disabled, className: "flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center", children: [_jsx(Eraser, { className: "w-4 h-4 mr-2" }), "Clear"] }) })] }));
}
