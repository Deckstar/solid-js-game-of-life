import { map } from "lodash";
import { createEffect, onCleanup } from "solid-js";

import Board from "./Board";
import classes from "./GameOfLife.module.css";
import {
  BOARD_SIZE,
  GameOfLifeState,
  reset,
  useBoard,
  useGameOn,
} from "./state";

const GAME_SPEED = 200; // ms

/**
 * Checks if a cell should live in the next round.
 *
 * The cell should live according to the rules:
 * - Any live cell with fewer than two live neighbours dies, as if by underpopulation.
 * - Any live cell with two or three live neighbours lives on to the next generation.
 * - Any live cell with more than three live neighbours dies, as if by overpopulation.
 * - Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
 */
const checkShouldLive = (
  prevBoard: GameOfLifeState["board"],
  x: number,
  y: number,
): boolean => {
  let livingNeighbors = 0;

  const cell = prevBoard[y][x];

  rowLoop: for (let neighborY = y - 1; neighborY <= y + 1; neighborY++) {
    const yOutOfBounds = neighborY < 0 || neighborY >= BOARD_SIZE;
    if (yOutOfBounds) continue rowLoop;

    columnLoop: for (let neighborX = x - 1; neighborX <= x + 1; neighborX++) {
      const xOutOfBounds = neighborX < 0 || neighborX >= BOARD_SIZE;
      if (xOutOfBounds) continue columnLoop;

      const isSelf = neighborX === x && neighborY === y;
      if (isSelf) continue columnLoop;

      const neighborCell = prevBoard[neighborY][neighborX];

      if (neighborCell.alive) {
        livingNeighbors++;
      }

      /**
       * If we got to 4 neighbors, don't bother
       * continuing the loop and return `false`.
       */
      const tooManyNeighbors = livingNeighbors > 3;
      if (tooManyNeighbors) return false;
    }
  }

  if (cell.alive) {
    /** If the living cell has too few neighbors or too many, it dies. */
    const shouldDie = livingNeighbors < 2 || livingNeighbors > 3;
    return !shouldDie;
  }

  const shouldBeBorn = livingNeighbors === 3;
  return shouldBeBorn;
};

const GameOfLife = () => {
  const [isGameOn, setIsGameOn] = useGameOn();
  const [, setBoard] = useBoard();

  createEffect(function tick(_wasGameOn) {
    if (!isGameOn()) return;

    const interval = setInterval(
      () =>
        setBoard(function updateCells(prevBoard) {
          const newBoard = map(prevBoard, (row, y) =>
            map(row, (cell, x) => {
              const willLive = checkShouldLive(prevBoard, x, y);
              const shouldUpdate = willLive !== cell.alive;

              if (shouldUpdate) return { ...cell, alive: willLive };
              return cell;
            }),
          );

          return newBoard;
        }),
      GAME_SPEED,
    );

    onCleanup(() => clearInterval(interval));
  }, isGameOn());

  return (
    <div class={classes.game}>
      <Board />

      <div class={classes.actions}>
        <button onClick={() => setIsGameOn((wasOn) => !wasOn)}>
          {isGameOn() ? "Pause" : "Start"}
        </button>
        <button disabled={isGameOn()} onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default GameOfLife;
