import { action, makeObservable, observable } from "mobx";
import { CellStore, RowStore } from ".";

export default class BoardStore {
  __clickCount: number;
  __rowCount: number;
  __columnCount: number;
  __rows: RowStore[];

  constructor() {
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
      this.__rows.push(row);
    }

    makeObservable(this, {
      __rows: observable,
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

    this.rows[row].cells[col].isMine = true;

    if (!isTopRow) {
      // ■□□  □■□  □□■
      // □□□  □□□  □□□
      // □□□  □□□  □□□
      if (!isLeftColumn) {
        this.rows[row - 1].cells[col - 1].mineCount += 1;
      }
      this.rows[row - 1].cells[col].mineCount += 1;
      if (!isRightColumn) {
        this.rows[row - 1].cells[col + 1].mineCount += 1;
      }
    }
    if (!isBottomRow) {
      // □□□ □□□ □□□
      // □□□ □□□ □□□
      // ■□□ □■□ □□■
      if (!isLeftColumn) {
        this.rows[row + 1].cells[col - 1].mineCount += 1;
      }
      this.rows[row + 1].cells[col].mineCount += 1;
      if (!isRightColumn) {
        this.rows[row + 1].cells[col + 1].mineCount += 1;
      }
    }
    // □□□ □□□
    // ■□□ □□■
    // □□□ □□□
    if (!isLeftColumn) {
      this.rows[row].cells[col - 1].mineCount += 1;
    }
    if (!isRightColumn) {
      this.rows[row].cells[col + 1].mineCount += 1;
    }
  }
}
