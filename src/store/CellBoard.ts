import { makeObservable, observable } from "mobx";
import CellRow from "./CellRow";

export default class CellBoard {
  __cellRows: CellRow[];

  constructor(cellRows: CellRow[]) {
    this.__cellRows = cellRows;

    makeObservable(this, {
      __cellRows: observable,
    });
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
}
