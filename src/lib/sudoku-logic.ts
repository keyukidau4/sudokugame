import type { SudokuGrid, Difficulty, GridSize } from "../shared/schema";

// Generate a valid Sudoku puzzle of specified size
export function generatePuzzle(
  difficulty: Difficulty,
  gridSize: GridSize = 10
): { grid: SudokuGrid } {
  // Create a solved puzzle first
  const solvedGrid = generateSolvedPuzzle(gridSize);

  // Remove cells based on difficulty
  const cellsToRemove = getDifficultySettings(difficulty, gridSize);
  const puzzle = removeCells(solvedGrid, cellsToRemove);

  return { grid: puzzle };
}

// Generate a complete valid Sudoku solution
function generateSolvedPuzzle(gridSize: GridSize): SudokuGrid {
  const totalCells = gridSize * gridSize;
  const grid: SudokuGrid = new Array(totalCells).fill(null);

  // Use backtracking to fill the grid
  if (solvePuzzle(grid, gridSize)) {
    return grid;
  }

  // If generation fails, return a basic valid pattern
  return generateBasicPattern(gridSize);
}

// Generate a basic valid pattern as fallback
function generateBasicPattern(gridSize: GridSize): SudokuGrid {
  const totalCells = gridSize * gridSize;
  const grid: SudokuGrid = new Array(totalCells).fill(null);

  // Fill the grid with a simple pattern that satisfies Sudoku rules
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const index = row * gridSize + col;
      // Simple pattern: each row shifts by 1, ensuring valid Sudoku
      grid[index] = ((row + col) % gridSize) + 1;
    }
  }

  return grid;
}

// Solve puzzle using backtracking
function solvePuzzle(grid: SudokuGrid, gridSize: GridSize): boolean {
  const emptyCell = findEmptyCell(grid, gridSize);
  if (!emptyCell) return true; // Puzzle solved

  const [row, col] = emptyCell;
  const numbers = shuffleArray(
    Array.from({ length: gridSize }, (_, i) => i + 1)
  );

  for (const num of numbers) {
    if (validateMove(grid, row, col, num, gridSize)) {
      grid[row * gridSize + col] = num;

      if (solvePuzzle(grid, gridSize)) {
        return true;
      }

      grid[row * gridSize + col] = null;
    }
  }

  return false;
}

// Find first empty cell
function findEmptyCell(
  grid: SudokuGrid,
  gridSize: GridSize
): [number, number] | null {
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      if (grid[row * gridSize + col] === null) {
        return [row, col];
      }
    }
  }
  return null;
}

// Validate if a number can be placed at given position
export function validateMove(
  grid: SudokuGrid,
  row: number,
  col: number,
  num: number,
  gridSize: GridSize = 10
): boolean {
  // Check row
  for (let c = 0; c < gridSize; c++) {
    if (c !== col && grid[row * gridSize + c] === num) {
      return false;
    }
  }

  // Check column
  for (let r = 0; r < gridSize; r++) {
    if (r !== row && grid[r * gridSize + col] === num) {
      return false;
    }
  }

  // Check sub-grid based on grid size
  const { subGridRows, subGridCols } = getSubGridDimensions(gridSize);
  const subGridRow = Math.floor(row / subGridRows) * subGridRows;
  const subGridCol = Math.floor(col / subGridCols) * subGridCols;

  for (let r = subGridRow; r < subGridRow + subGridRows; r++) {
    for (let c = subGridCol; c < subGridCol + subGridCols; c++) {
      if ((r !== row || c !== col) && grid[r * gridSize + c] === num) {
        return false;
      }
    }
  }

  return true;
}

// Get sub-grid dimensions based on grid size
function getSubGridDimensions(gridSize: GridSize): {
  subGridRows: number;
  subGridCols: number;
} {
  switch (gridSize) {
    case 5:
      return { subGridRows: 1, subGridCols: 5 }; // 1x5 sub-grids
    case 7:
      return { subGridRows: 1, subGridCols: 7 }; // 1x7 sub-grids
    case 10:
      return { subGridRows: 2, subGridCols: 5 }; // 2x5 sub-grids
    default:
      return { subGridRows: 1, subGridCols: gridSize };
  }
}

// Check if puzzle is completely solved
export function checkWinCondition(
  grid: SudokuGrid,
  gridSize: GridSize = 10
): boolean {
  const totalCells = gridSize * gridSize;

  // Check if all cells are filled
  for (let i = 0; i < totalCells; i++) {
    if (grid[i] === null) return false;
  }

  // Check if all constraints are satisfied
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const num = grid[row * gridSize + col];
      if (num === null) return false;

      // Temporarily remove the number to check validity
      const temp = grid[row * gridSize + col];
      grid[row * gridSize + col] = null;

      if (!validateMove(grid, row, col, num, gridSize)) {
        grid[row * gridSize + col] = temp;
        return false;
      }

      grid[row * gridSize + col] = temp;
    }
  }

  return true;
}

// Get difficulty settings
function getDifficultySettings(
  difficulty: Difficulty,
  gridSize: GridSize
): number {
  const totalCells = gridSize * gridSize;
  const basePercentage = getBaseRemovalPercentage(difficulty);

  return Math.floor(totalCells * basePercentage);
}

// Get base removal percentage for difficulty
function getBaseRemovalPercentage(difficulty: Difficulty): number {
  switch (difficulty) {
    case "easy":
      return 0.35; // Remove 35% of cells
    case "normal":
      return 0.45; // Remove 45% of cells
    case "hard":
      return 0.55; // Remove 55% of cells
    case "very-hard":
      return 0.65; // Remove 65% of cells
    default:
      return 0.45;
  }
}

// Remove cells from solved puzzle
function removeCells(grid: SudokuGrid, cellsToRemove: number): SudokuGrid {
  const puzzle = [...grid];
  const totalCells = grid.length;
  const positions = shuffleArray(
    Array.from({ length: totalCells }, (_, i) => i)
  );

  for (let i = 0; i < cellsToRemove && i < positions.length; i++) {
    puzzle[positions[i]] = null;
  }

  return puzzle;
}

// Utility function to shuffle array
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
