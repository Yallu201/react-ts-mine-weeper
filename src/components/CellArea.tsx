import { MouseEventHandler, useEffect, useState } from "react";
import { Cell, CellRow, CellBoard } from "../store";
import CellComponent from "./Cell";

type CellAreaProps = {
  onClickCell: MouseEventHandler<HTMLButtonElement> | undefined;
};
const CellArea = ({ onClickCell }: CellAreaProps) => {
  const [board, setBoard] = useState<CellBoard | null>(null);
  useEffect(() => {
    const [ROW, COL] = [9, 9];
    const board_ = new CellBoard([]);
    for (let i = 0; i < ROW; i++) {
      const row = new CellRow(i, []);
      for (let j = 0; j < COL; j++) {
        const cell = new Cell(i, j);
        row.push(cell);
      }
      board_.push(row);
    }
    console.log(board_);
    setBoard(board_);
  }, []);
  return (
    <div className="cell-area-wrap">
      <div className="board">
        {board &&
          board.cellRows.map((row) => {
            return (
              <div className="row">
                {row.cells.map((cell) => {
                  return <CellComponent cell={cell} />;
                })}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default CellArea;
