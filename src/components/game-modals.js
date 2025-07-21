import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Trophy, Pause, Play } from "lucide-react";
import confetti from 'canvas-confetti';
export default function GameModals({ showWinModal, showPauseModal, finalTime, onNewGame, onCloseModal, onResumeGame }) {
    if (showWinModal) {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
        });
    }
    return (_jsxs(_Fragment, { children: [showWinModal && (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50", children: _jsx("div", { className: "bg-white rounded-xl shadow-2xl p-8 max-w-md w-full mx-4", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4", children: _jsx(Trophy, { className: "w-8 h-8 text-white" }) }), _jsx("h2", { className: "text-2xl font-bold text-gray-800 mb-2", children: "Congratulations!" }), _jsxs("p", { className: "text-gray-600 mb-4", children: ["You solved the puzzle in ", _jsx("span", { className: "font-semibold", children: finalTime })] }), _jsxs("div", { className: "flex space-x-3", children: [_jsx("button", { onClick: onNewGame, className: "flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors", children: "New Game" }), _jsx("button", { onClick: onCloseModal, className: "flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors", children: "Close" })] })] }) }) })), showPauseModal && (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50", children: _jsx("div", { className: "bg-white rounded-xl shadow-2xl p-8 max-w-md w-full mx-4", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4", children: _jsx(Pause, { className: "w-8 h-8 text-white" }) }), _jsx("h2", { className: "text-2xl font-bold text-gray-800 mb-2", children: "Game Paused" }), _jsx("p", { className: "text-gray-600 mb-6", children: "Take a break and come back when you're ready!" }), _jsxs("button", { onClick: onResumeGame, className: "w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center", children: [_jsx(Play, { className: "w-4 h-4 mr-2" }), "Resume Game"] })] }) }) }))] }));
}
