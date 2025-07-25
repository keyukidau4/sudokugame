import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function DifficultySelector({ currentDifficulty, onDifficultyChange }) {
    const difficulties = [
        { key: "easy", label: "Easy" },
        { key: "normal", label: "Normal" },
        { key: "hard", label: "Hard" },
        { key: "very-hard", label: "Very Hard" }
    ];
    const handleChange = (e) => {
        onDifficultyChange(e.target.value);
    };
    return (_jsxs("div", { className: "bg-white rounded-xl shadow-lg p-6", children: [_jsx("label", { htmlFor: "difficulty-select", className: "block text-lg font-semibold text-gray-800 mb-4", children: "Difficulty" }), _jsx("select", { id: "difficulty-select", value: currentDifficulty, onChange: handleChange, className: "w-full px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors", children: difficulties.map((difficulty) => (_jsx("option", { value: difficulty.key, children: difficulty.label }, difficulty.key))) })] }));
}
