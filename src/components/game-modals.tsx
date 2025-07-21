import { Trophy, Pause, Play } from "lucide-react";
import confetti from 'canvas-confetti';

interface GameModalsProps {
  showWinModal: boolean;
  showPauseModal: boolean;
  finalTime: string;
  onNewGame: () => void;
  onCloseModal: () => void;
  onResumeGame: () => void;
}

export default function GameModals({
  showWinModal,
  showPauseModal,
  finalTime,
  onNewGame,
  onCloseModal,
  onResumeGame
}: GameModalsProps) {
    if(showWinModal) {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
        });
    }
  return (
    <>
      {/* Win Modal */}
      {showWinModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full mx-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Congratulations!</h2>
              <p className="text-gray-600 mb-4">
                You solved the puzzle in <span className="font-semibold">{finalTime}</span>
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={onNewGame}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  New Game
                </button>
                <button
                  onClick={onCloseModal}
                  className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pause Modal */}
      {showPauseModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full mx-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Pause className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Game Paused</h2>
              <p className="text-gray-600 mb-6">Take a break and come back when you're ready!</p>
              <button
                onClick={onResumeGame}
                className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center"
              >
                <Play className="w-4 h-4 mr-2" />
                Resume Game
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
