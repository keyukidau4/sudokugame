import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function GridSizeSelector({ currentGridSize, onGridSizeChange }) {
    const gridSizes = [
        { key: 5, label: "5x5" },
        { key: 7, label: "7x7" },
        { key: 10, label: "10x10" }
    ];
    const handleChange = (e) => {
        onGridSizeChange(parseInt(e.target.value));
    };
    return (_jsxs("div", { className: "bg-white rounded-xl shadow-lg p-6", children: [_jsx("label", { htmlFor: "grid-size-select", className: "block text-lg font-semibold text-gray-800 mb-4", children: "Grid Size" }), _jsx("select", { id: "grid-size-select", value: currentGridSize, onChange: handleChange, className: "w-full px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors", children: gridSizes.map((gridSize) => (_jsx("option", { value: gridSize.key, children: gridSize.label }, gridSize.key))) })] }));
}
