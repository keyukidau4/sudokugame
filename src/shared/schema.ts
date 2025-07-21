export type Difficulty = "easy" | "normal" | "hard" | "very-hard";
export type GridSize = 5 | 7 | 10;
export type SudokuCell = number | null;
export type SudokuGrid = SudokuCell[];

export interface GameState {
  grid: SudokuGrid;
  initialGrid: SudokuGrid;
  selectedCell: number | null;
  difficulty: Difficulty;
  gridSize: GridSize;
  gameTime: number;
  moveCount: number;
  hintsUsed: number;
  mistakes: number;
  isComplete: boolean;
  isPaused: boolean;
  showWinModal: boolean;
  showPauseModal: boolean;
  errorMessage: string | null;
}
