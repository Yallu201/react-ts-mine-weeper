import { action, makeObservable, observable } from "mobx";
import { createContext, FC, useContext } from "react";
import CellStore, { CellIndex } from "./Cell";
import RowStore from "./Row";
export default class BoardStore {
  __clickCount: number = 0;
  __rowCount: number = 9;
  __columnCount: number = 9;
  __rows: RowStore[] = [];

  constructor() {
    this.init();
    makeObservable(this, {
      __rows: observable,
      __rowCount: observable,
      __columnCount: observable,
      push: action,
      setMine: action,
      init: action,
      openMines: action,
      openEmptyCells: action,
      openCell: action,
    });
  }

  get clickCount(): number {
    return this.__clickCount;
  }
  set clickCount(count: number) {
    this.__clickCount = count;
  }
  get rows(): RowStore[] {
    return this.__rows;
  }
  set rows(rows: RowStore[]) {
    this.__rows = rows;
  }
  push(row: RowStore) {
    this.__rows.push(row);
  }
  setMine(row: number, col: number) {
    const isTopRow = row === 0;
    const isBottomRow = row === this.__rowCount - 1;
    const isLeftColumn = col === 0;
    const isRightColumn = col === this.__columnCount - 1;

    this.__rows[row].cells[col].isMine = true;

    if (!isTopRow) {
      // ■□□  □■□  □□■
      // □□□  □□□  □□□
      // □□□  □□□  □□□
      if (!isLeftColumn) {
        this.__rows[row - 1].cells[col - 1].mineCount += 1;
      }
      this.__rows[row - 1].cells[col].mineCount += 1;
      if (!isRightColumn) {
        this.__rows[row - 1].cells[col + 1].mineCount += 1;
      }
    }
    if (!isBottomRow) {
      // □□□ □□□ □□□
      // □□□ □□□ □□□
      // ■□□ □■□ □□■
      if (!isLeftColumn) {
        this.__rows[row + 1].cells[col - 1].mineCount += 1;
      }
      this.__rows[row + 1].cells[col].mineCount += 1;
      if (!isRightColumn) {
        this.__rows[row + 1].cells[col + 1].mineCount += 1;
      }
    }
    // □□□ □□□
    // ■□□ □□■
    // □□□ □□□
    if (!isLeftColumn) {
      this.__rows[row].cells[col - 1].mineCount += 1;
    }
    if (!isRightColumn) {
      this.__rows[row].cells[col + 1].mineCount += 1;
    }
  }

  init() {
    this.__clickCount = 0;
    this.__rowCount = 9;
    this.__columnCount = 9;
    this.__rows = [];

    for (let i = 0; i < this.__rowCount; i++) {
      const row = new RowStore(i, []);
      for (let j = 0; j < this.__columnCount; j++) {
        const cell = new CellStore(i, j);
        row.push(cell);
      }
      this.push(row);
    }
  }

  openMines() {
    this.__rows.forEach((row) => {
      row.cells.forEach((cell) => {
        if (cell.isMine) {
          cell.isOpened = true;
        }
      });
    });
  }

  openEmptyCells(row_: CellIndex, col_: CellIndex) {
    this.openCell(row_, col_);
  }

  openCell(row: CellIndex, col: CellIndex) {
    if (row === null || col === null) return;
    if (this.__rows[row].cells[col].isMine) return;
    if (this.__rows[row].cells[col].mineCount > 0) {
      this.__rows[row].cells[col].open();
      return;
    }
    if (this.__rows[row].cells[col].mineCount === 0) {
      if (this.__rows[row].cells[col].isOpened) return;
      this.__rows[row].cells[col].open();
    }
    const CURSOR = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];
    CURSOR.forEach(([offsetRow, offsetCol]) => {
      const nextRow = row + offsetRow;
      const nextCol = col + offsetCol;
      if (nextRow < 0 || nextRow >= this.__rowCount) return;
      if (nextCol < 0 || nextCol >= this.__columnCount) return;
      this.openCell(row + offsetRow, col + offsetCol);
    });
  }
}

export const BoardContext = createContext<BoardStore>(new BoardStore());
export const BoardProvider: FC<{ store: BoardStore }> = ({
  store,
  children,
}) => {
  return (
    <BoardContext.Provider value={store}>{children}</BoardContext.Provider>
  );
};
export const useBoardStore = () => {
  return useContext(BoardContext);
};
