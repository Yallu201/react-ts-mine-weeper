import { observer } from "mobx-react-lite";
import { useCallback, useEffect } from "react";
import { useBoardStore } from "../store/Board";
import CellComponent from "./Cell";
import { CellIndex } from "../store/Cell";
import { useGameStore } from "../store/Game";

const Board = observer(() => {
  const board = useBoardStore();
  const game = useGameStore();
  const setMine = useCallback(
    (row_: CellIndex, col_: CellIndex) => {
      if (board.clickCount > 0) return;
      board.clickCount += 1;
      const [ROW, COL] = [9, 9];
      const TOTAL_CELL_COUNT = ROW * COL;
      const set = new Set();
      while (set.size < 10) {
        const mineIndex = Math.floor(Math.random() * TOTAL_CELL_COUNT);
        if (set.has(mineIndex)) continue;
        set.add(mineIndex);
        const row = Math.floor(mineIndex / ROW);
        const col = mineIndex % ROW;
        if (row === row_ && col === col_) continue;
        board.setMine(row, col);
      }
    },
    [board]
  );
  useEffect(() => {
    if (board.isAllLeftMine) {
      game.gameOver();
    }
  }, [board.isAllLeftMine]);
  return (
    <div className="cell-area-wrap">
      <div className="board">
        {board &&
          board.rows.map((row, r_index) => {
            return (
              <div className="row" key={`row_${r_index}`}>
                {row.cells.map((cell, c_index) => {
                  return (
                    <CellComponent
                      key={`col_${r_index}_${c_index}`}
                      cell={cell}
                      setMine={setMine}
                    />
                  );
                })}
              </div>
            );
          })}
      </div>
    </div>
  );
});

export default Board;
