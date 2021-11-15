import { makeObservable, observable } from "mobx";
import Cell from "./Cell";

type RowIndex = number | null;
export default class CellRow {
  __index: RowIndex = null;
  __cells: Cell[];

  constructor(index: number, cells: Cell[]) {
    this.__index = index;
    this.__cells = cells;

    makeObservable(this, {
      __index: observable,
      __cells: observable,
    });
  }

  get index(): RowIndex {
    return this.__index;
  }
  get cells(): Cell[] {
    return this.__cells;
  }
  set cells(cells: Cell[]) {
    this.__cells = cells;
  }
  push(cell: Cell) {
    this.__cells.push(cell);
  }
}
