import { observer } from "mobx-react-lite";
import { useCallback, useState } from "react";
import { BoardStore } from "../store";
import CellComponent from "./Cell";

const CellArea = observer(() => {
  const [board] = useState<BoardStore>(new BoardStore());
  const setMine = useCallback(() => {
    if (!board) return;
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
          board.rows.map((row) => {
            return (
              <div className="row">
                {row.cells.map((cell) => {
                  return <CellComponent cell={cell} setMine={setMine} />;
                })}
              </div>
            );
          })}
      </div>
    </div>
  );
});

export default CellArea;
