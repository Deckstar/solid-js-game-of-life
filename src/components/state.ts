import { createSignal } from "solid-js";

/** The state of the cell. */
export type CellState = {
  /** Whether the cell is alive or not. */
  alive: boolean;
};

/** The state of the game. */
export type GameOfLifeState = {
  /** The state of cells on the board. */
  board: CellState[][];
  /** Whether the game is playing or not. */
  on: boolean;
};

export const BOARD_SIZE = 40;

const BASIC_CELL = { alive: false } satisfies CellState;

const INITIAL_STATE = {
  board: Array(BOARD_SIZE).fill(Array(BOARD_SIZE).fill({ ...BASIC_CELL })),
  on: false,
} satisfies GameOfLifeState;

const boardState = createSignal<GameOfLifeState["board"]>(INITIAL_STATE.board);
export const useBoard = () => boardState;

const gameOnState = createSignal<GameOfLifeState["on"]>(INITIAL_STATE.on);
export const useGameOn = () => gameOnState;

/** Resets the game state. */
export const reset = () => {
  const setBoard = boardState[1];
  setBoard(INITIAL_STATE.board);

  const setGameOn = gameOnState[1];
  setGameOn(INITIAL_STATE.on);
};

const getRandomCell = (): CellState => ({
  ...BASIC_CELL,
  alive: Math.random() > 0.5 ? true : false,
});

/** Resets the board state. */
export const randomize = () => {
  const isGameOn = gameOnState[0];
  if (isGameOn()) return;

  const setBoard = boardState[1];

  const nullsBoard = Array<null[]>(BOARD_SIZE).fill(
    Array<null>(BOARD_SIZE).fill(null),
  );

  const randomBoard: CellState[][] = nullsBoard.map((row) =>
    row.map(getRandomCell),
  );

  setBoard(randomBoard);
};
