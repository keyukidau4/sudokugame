import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function GameStats({ gameTime, moveCount, hintsUsed, completion }) {
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };
    return (_jsxs("div", { className: "bg-white rounded-xl shadow-lg p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-800 mb-4", children: "Game Stats" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-gray-600", children: "Time" }), _jsx("span", { className: "font-semibold text-blue-600", children: formatTime(gameTime) })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-gray-600", children: "Moves" }), _jsx("span", { className: "font-semibold", children: moveCount })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-gray-600", children: "Completion\u3000" }), _jsxs("span", { className: "font-semibold text-green-600", children: [completion, "%"] })] })] })] }));
}
