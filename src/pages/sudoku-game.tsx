import { useState, useEffect, useCallback } from "react";
import { Clock, Settings } from "lucide-react";
import SudokuGrid from "../components/sudoku-grid";
import NumberInputPad from "../components/number-input-pad";
import GameStats from "../components/game-stats";
import GameControls from "../components/game-controls";
import DifficultySelector from "../components/difficulty-selector";
import GridSizeSelector from "../components/grid-size-selector";
import GameModals from "../components/game-modals";
import {
  generatePuzzle,
  validateMove,
  checkWinCondition,
} from "../lib/sudoku-logic";
import type { GameState, Difficulty, GridSize } from "../shared/schema";

export default function SudokuGame() {
  const [gameState, setGameState] = useState<GameState>({
    grid: new Array(100).fill(null),
    initialGrid: new Array(100).fill(null),
    selectedCell: null,
    difficulty: "normal",
    gridSize: 10,
    gameTime: 0,
    moveCount: 0,
    hintsUsed: 0,
    mistakes: 0,
    isComplete: false,
    isPaused: false,
    showWinModal: false,
    showPauseModal: false,
    errorMessage: null,
  });

  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);

  // Timer effect
  useEffect(() => {
    if (!gameState.isPaused && !gameState.isComplete) {
      const interval = setInterval(() => {
        setGameState((prev) => ({ ...prev, gameTime: prev.gameTime + 1 }));
      }, 1000);
      setTimerInterval(interval);
      return () => clearInterval(interval);
    } else if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
  }, [gameState.isPaused, gameState.isComplete]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleCellSelect = useCallback(
    (index: number) => {
      if (gameState.initialGrid[index] !== null) return; // Can't select pre-filled cells

      setGameState((prev) => ({
        ...prev,
        selectedCell: prev.selectedCell === index ? null : index,
        errorMessage: null,
      }));
    },
    [gameState.initialGrid]
  );

  const handleNumberInput = useCallback(
    (number: number) => {
      if (gameState.selectedCell === null || gameState.isPaused) return;

      const row = Math.floor(gameState.selectedCell / gameState.gridSize);
      const col = gameState.selectedCell % gameState.gridSize;

      if (!validateMove(gameState.grid, row, col, number, gameState.gridSize)) {
        setGameState((prev) => ({
          ...prev,
          errorMessage: "This number cannot be placed here",
          mistakes: prev.mistakes + 1,
        }));

        // Clear error message after 3 seconds
        setTimeout(() => {
          setGameState((prev) => ({ ...prev, errorMessage: null }));
        }, 3000);
        return;
      }

      const newGrid = [...gameState.grid];
      newGrid[gameState.selectedCell] = number;

      const isComplete = checkWinCondition(newGrid, gameState.gridSize);

      setGameState((prev) => ({
        ...prev,
        grid: newGrid,
        moveCount: prev.moveCount + 1,
        isComplete,
        showWinModal: isComplete,
        errorMessage: null,
      }));
    },
    [
      gameState.selectedCell,
      gameState.grid,
      gameState.isPaused,
      gameState.gridSize,
    ]
  );

  const handleClearCell = useCallback(() => {
    if (gameState.selectedCell === null || gameState.isPaused) return;
    if (gameState.initialGrid[gameState.selectedCell] !== null) return; // Can't clear pre-filled cells

    const newGrid = [...gameState.grid];
    newGrid[gameState.selectedCell] = null;

    setGameState((prev) => ({
      ...prev,
      grid: newGrid,
      moveCount: prev.moveCount + 1,
      errorMessage: null,
    }));
  }, [
    gameState.selectedCell,
    gameState.grid,
    gameState.initialGrid,
    gameState.isPaused,
  ]);

  const handleDifficultyChange = useCallback(
    (difficulty: Difficulty) => {
      const puzzle = generatePuzzle(difficulty, gameState.gridSize);
      setGameState((prev) => ({
        ...prev,
        difficulty,
        grid: [...puzzle.grid],
        initialGrid: [...puzzle.grid],
        selectedCell: null,
        gameTime: 0,
        moveCount: 0,
        hintsUsed: 0,
        mistakes: 0,
        isComplete: false,
        isPaused: false,
        showWinModal: false,
        showPauseModal: false,
        errorMessage: null,
      }));
    },
    [gameState.gridSize]
  );

  const handleGridSizeChange = useCallback(
    (gridSize: GridSize) => {
      const puzzle = generatePuzzle(gameState.difficulty, gridSize);
      setGameState((prev) => ({
        ...prev,
        gridSize,
        grid: [...puzzle.grid],
        initialGrid: [...puzzle.grid],
        selectedCell: null,
        gameTime: 0,
        moveCount: 0,
        hintsUsed: 0,
        mistakes: 0,
        isComplete: false,
        isPaused: false,
        showWinModal: false,
        showPauseModal: false,
        errorMessage: null,
      }));
    },
    [gameState.difficulty]
  );

  const handleNewGame = useCallback(() => {
    const puzzle = generatePuzzle(gameState.difficulty, gameState.gridSize);
    setGameState((prev) => ({
      ...prev,
      grid: [...puzzle.grid],
      initialGrid: [...puzzle.grid],
      selectedCell: null,
      gameTime: 0,
      moveCount: 0,
      hintsUsed: 0,
      mistakes: 0,
      isComplete: false,
      isPaused: false,
      showWinModal: false,
      showPauseModal: false,
      errorMessage: null,
    }));
  }, [gameState.difficulty, gameState.gridSize]);

  const handlePauseGame = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      isPaused: !prev.isPaused,
      showPauseModal: !prev.isPaused,
    }));
  }, []);

  const handleGetHint = useCallback(() => {
    if (gameState.selectedCell === null || gameState.isPaused) return;

    // Simple hint: find the correct number for the selected cell
    const row = Math.floor(gameState.selectedCell / gameState.gridSize);
    const col = gameState.selectedCell % gameState.gridSize;

    for (let num = 1; num <= gameState.gridSize; num++) {
      if (validateMove(gameState.grid, row, col, num, gameState.gridSize)) {
        const newGrid = [...gameState.grid];
        newGrid[gameState.selectedCell] = num;

        setGameState((prev) => ({
          ...prev,
          grid: newGrid,
          hintsUsed: prev.hintsUsed + 1,
          moveCount: prev.moveCount + 1,
        }));
        break;
      }
    }
  }, [
    gameState.selectedCell,
    gameState.grid,
    gameState.isPaused,
    gameState.gridSize,
  ]);

  // Keyboard input handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState.selectedCell === null || gameState.isPaused) return;

      const key = e.key;
      if (key >= "1" && key <= "9") {
        const number = parseInt(key);
        if (number <= gameState.gridSize) {
          handleNumberInput(number);
        }
      } else if (key === "0" && gameState.gridSize === 10) {
        handleNumberInput(10);
      } else if (key === "Backspace" || key === "Delete") {
        handleClearCell();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    gameState.selectedCell,
    gameState.isPaused,
    gameState.gridSize,
    handleNumberInput,
    handleClearCell,
  ]);

  // Initialize game on mount
  useEffect(() => {
    handleNewGame();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalCells = gameState.gridSize * gameState.gridSize;
  const completion = Math.round(
    (gameState.grid.filter((cell) => cell !== null).length / totalCells) * 100
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 grid grid-cols-2 gap-0.5">
                <div className="bg-white rounded-sm"></div>
                <div className="bg-white rounded-sm"></div>
                <div className="bg-white rounded-sm"></div>
                <div className="bg-white rounded-sm"></div>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">
              Sudoku {gameState.gridSize}x{gameState.gridSize}
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>{formatTime(gameState.gameTime)}</span>
            </div>
            <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Game Container */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Game Grid */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">
                      Difficulty:{" "}
                      <span className="text-blue-600 capitalize">
                        {gameState.difficulty}
                      </span>
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {gameState.mistakes}/3 mistakes
                  </div>
                </div>
                <button
                  onClick={handleNewGame}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
                >
                  New Game
                </button>
              </div>

              <SudokuGrid
                grid={gameState.grid}
                initialGrid={gameState.initialGrid}
                selectedCell={gameState.selectedCell}
                onCellSelect={handleCellSelect}
                isPaused={gameState.isPaused}
                gridSize={gameState.gridSize}
              />

              {/* Error Message */}
              {gameState.errorMessage && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  <span>{gameState.errorMessage}</span>
                </div>
              )}
            </div>
          </div>

          {/* Game Controls */}
          <div className="lg:col-span-4 space-y-6">
            <NumberInputPad
              onNumberInput={handleNumberInput}
              onClearCell={handleClearCell}
              onGetHint={handleGetHint}
              disabled={gameState.isPaused}
              gridSize={gameState.gridSize}
            />

            <GameStats
              gameTime={gameState.gameTime}
              moveCount={gameState.moveCount}
              hintsUsed={gameState.hintsUsed}
              completion={completion}
            />

            <GridSizeSelector
              currentGridSize={gameState.gridSize}
              onGridSizeChange={handleGridSizeChange}
            />

            <DifficultySelector
              currentDifficulty={gameState.difficulty}
              onDifficultyChange={handleDifficultyChange}
            />

            <GameControls
              onCheckSolution={() => {}}
              onPauseGame={handlePauseGame}
              onSaveGame={() => {}}
              onResetGame={handleNewGame}
              isPaused={gameState.isPaused}
            />
          </div>
        </div>
      </main>

      <GameModals
        showWinModal={gameState.showWinModal}
        showPauseModal={gameState.showPauseModal}
        finalTime={formatTime(gameState.gameTime)}
        onNewGame={handleNewGame}
        onCloseModal={() =>
          setGameState((prev) => ({ ...prev, showWinModal: false }))
        }
        onResumeGame={() =>
          setGameState((prev) => ({
            ...prev,
            showPauseModal: false,
            isPaused: false,
          }))
        }
      />
    </div>
  );
}
