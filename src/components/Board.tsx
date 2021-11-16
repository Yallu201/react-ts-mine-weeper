import { observer } from "mobx-react-lite";
import { useCallback } from "react";
import { useBoardStore } from "../store/Board";
import CellComponent from "./Cell";

const Board = observer(() => {
  const board = useBoardStore();
  const setMine = useCallback(() => {
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
      board.setMine(row, col);
    }
  }, [board]);
  return (
    <div className="cell-area-wrap">
      <div className="board">
        {board &&
          board.rows.map((row,r_index) => {
            return (
              <div className="row" key={`row_${r_index}`}>
                {row.cells.map((cell,c_index) => {
                  return <CellComponent key={`col_${r_index}_${c_index}`} cell={cell} setMine={setMine} />;
                })}
              </div>
            );
          })}
      </div>
    </div>
  );
});

export default Board;
