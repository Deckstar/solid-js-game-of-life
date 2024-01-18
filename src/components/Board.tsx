import { join, map } from "lodash";
import { For } from "solid-js";

import classes from "./Board.module.css";
import { BOARD_SIZE, CellState, useBoard, useGameOn } from "./state";

interface CellProps extends CellState {
  /** The `x` coordinate. */
  x: number;
  /** The `y` coordinate. */
  y: number;
}

const Cell = (props: CellProps) => {
  const [isGameOn] = useGameOn();
  const [, setBoard] = useBoard();

  const onClick = () => {
    setBoard(function toggleCellAliveState(prevBoard) {
      const oldCell = prevBoard[props.y][props.x];

      const newCell: CellState = { ...oldCell, alive: !oldCell.alive };

      const newBoard = map(prevBoard, (row, y) => {
        const isRightRow = props.y === y;
        if (!isRightRow) return row;

        return map(row, (cell, x) => {
          const isThisCell = props.x === x && props.y === y;

          if (!isThisCell) return cell;
          return newCell;
        });
      });

      return newBoard;
    });
  };

  return (
    <button
      classList={{ [classes.cell]: true, [classes.alive]: props.alive }}
      onClick={onClick}
      disabled={isGameOn()}
    />
  );
};

const Board = () => {
  const [board] = useBoard();

  const gridStyle = join(Array(BOARD_SIZE).fill("1fr"), " ");

  return (
    <div
      class={classes.grid}
      style={{
        "grid-template-columns": gridStyle,
        "grid-template-rows": gridStyle,
      }}
    >
      <For each={board()}>
        {(row, y) => {
          return (
            <For each={row}>
              {(cell, x) => <Cell x={x()} y={y()} {...cell} />}
            </For>
          );
        }}
      </For>
    </div>
  );
};

export default Board;
