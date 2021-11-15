import { action, makeObservable, observable } from "mobx";
import { CellStore } from ".";
import CellRow from "./Row";

export default class BoardStore {
  __clickCount: number;
  __rowCount: number;
  __columnCount: number;
  __cellRows: CellRow[];

  constructor() {
    this.__clickCount = 0;
    this.__rowCount = 9;
    this.__columnCount = 9;
    this.__cellRows = [];

    for (let i = 0; i < this.__rowCount; i++) {
      const row = new CellRow(i, []);
      for (let j = 0; j < this.__columnCount; j++) {
        const cell = new CellStore(i, j);
        row.push(cell);
      }
      this.__cellRows.push(row);
    }

    makeObservable(this, {
      __cellRows: observable,
      __rowCount: observable,
      __columnCount: observable,
      setMine: action,
    });
  }

  get clickCount(): number {
    return this.__clickCount;
  }
  set clickCount(count: number) {
    this.__clickCount = count;
  }
  get cellRows(): CellRow[] {
    return this.__cellRows;
  }
  set cellRows(rows: CellRow[]) {
    this.__cellRows = rows;
  }
  push(row: CellRow) {
    this.__cellRows.push(row);
  }
  setMine(row: number, col: number) {
    const isTopRow = row === 0;
    const isBottomRow = row === this.__rowCount - 1;
    const isLeftColumn = col === 0;
    const isRightColumn = col === this.__columnCount - 1;

    this.cellRows[row].cells[col].isMine = true;

    if (!isTopRow) {
      // ■□□  □■□  □□■
      // □□□  □□□  □□□
      // □□□  □□□  □□□
      if (!isLeftColumn) {
        this.cellRows[row - 1].cells[col - 1].mineCount += 1;
      }
      this.cellRows[row - 1].cells[col].mineCount += 1;
      if (!isRightColumn) {
        this.cellRows[row - 1].cells[col + 1].mineCount += 1;
      }
    }
    if (!isBottomRow) {
      // □□□ □□□ □□□
      // □□□ □□□ □□□
      // ■□□ □■□ □□■
      if (!isLeftColumn) {
        this.cellRows[row + 1].cells[col - 1].mineCount += 1;
      }
      this.cellRows[row + 1].cells[col].mineCount += 1;
      if (!isRightColumn) {
        this.cellRows[row + 1].cells[col + 1].mineCount += 1;
      }
    }
    // □□□ □□□
    // ■□□ □□■
    // □□□ □□□
    if (!isLeftColumn) {
      this.cellRows[row].cells[col - 1].mineCount += 1;
    }
    if (!isRightColumn) {
      this.cellRows[row].cells[col + 1].mineCount += 1;
    }
  }
}
