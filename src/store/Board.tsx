import { action, computed, makeObservable, observable } from "mobx";
import { createContext, FC, useContext } from "react";
import CellStore, { CellIndex } from "./Cell";
import RowStore from "./Row";

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
export default class BoardStore {
  __clickCount: number = 0;
  __rowCount: number = 9;
  __columnCount: number = 9;
  __rows: RowStore[] = [];
  __openCellCount: number = 0;

  constructor() {
    this.init();
    makeObservable(this, {
      __rows: observable,
      __rowCount: observable,
      __columnCount: observable,
      __openCellCount: observable,
      push: action,
      setMine: action,
      init: action,
      openMines: action,
      openEmptyCells: action,
      openAroundCell: action,
      openCell: action,
      addOpenCell: action,
      isAllLeftMine: computed,
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
  get openCellCount(): number {
    return this.__openCellCount;
  }
  get isAllLeftMine(): boolean {
    return this.__rows.every((row) => {
      return row.cells
        .filter((cell) => !cell.isOpened)
        .every((cell) => cell.isMine);
    });
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
    this.__openCellCount = 0;

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

  openAroundCell(row: CellIndex, col: CellIndex) {
    if (row === null || col === null) return;
    // 주변 check한 cell의 갯수가 mineCount와 동일한경우, 주변 cell 모두 공개
    let aroundCellCount = 0;
    let aroundCheckCount = 0;
    CURSOR.forEach(([offsetRow, offsetCol]) => {
      const nextRow = row + offsetRow;
      const nextCol = col + offsetCol;
      if (nextRow < 0 || nextRow >= this.__rowCount) return;
      if (nextCol < 0 || nextCol >= this.__columnCount) return;
      if (this.__rows[nextRow].cells[nextCol].isChecked) {
        aroundCheckCount++;
      }
      aroundCellCount++;
    });
    if (this.__rows[row].cells[col].mineCount === aroundCheckCount) {
      CURSOR.forEach(([offsetRow, offsetCol]) => {
        const nextRow = row + offsetRow;
        const nextCol = col + offsetCol;
        if (nextRow < 0 || nextRow >= this.__rowCount) return;
        if (nextCol < 0 || nextCol >= this.__columnCount) return;
        if (this.__rows[nextRow].cells[nextCol].mineCount === 0) {
          this.openCell(nextRow, nextCol);
        }
        this.__rows[nextRow].cells[nextCol].open();
      });
    }
  }

  openCell(row: CellIndex, col: CellIndex) {
    if (row === null || col === null) return;
    if (this.__rows[row].cells[col].isMine) return;
    if (this.__rows[row].cells[col].isOpened) return;
    if (this.__rows[row].cells[col].mineCount > 0) {
      this.__rows[row].cells[col].open();
      this.addOpenCell();
      return;
    }
    if (this.__rows[row].cells[col].mineCount === 0) {
      this.__rows[row].cells[col].open();
      this.addOpenCell();
    }

    CURSOR.forEach(([offsetRow, offsetCol]) => {
      const nextRow = row + offsetRow;
      const nextCol = col + offsetCol;
      if (nextRow < 0 || nextRow >= this.__rowCount) return;
      if (nextCol < 0 || nextCol >= this.__columnCount) return;
      this.openCell(row + offsetRow, col + offsetCol);
    });
  }

  addOpenCell() {
    this.__openCellCount += 1;
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
