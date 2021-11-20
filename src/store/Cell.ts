import { action, makeObservable, observable } from "mobx";

export type CellIndex = number | null;
export default class CellStore {
  __row: CellIndex = null;
  __column: CellIndex = null;
  __isOpened: boolean = false;
  __isMine: boolean = false;
  __isChecked: boolean = false;
  __mineCount: number = 0;

  constructor(row: number, column: number) {
    this.__row = row;
    this.__column = column;

    makeObservable(this, {
      __row: observable,
      __column: observable,
      __isOpened: observable,
      __isMine: observable,
      __isChecked: observable,
      __mineCount: observable,
      open: action,
      check: action,
    });
  }

  get row(): CellIndex {
    return this.__row;
  }
  get column(): CellIndex {
    return this.__column;
  }
  get isOpened(): boolean {
    return this.__isOpened;
  }
  set isOpened(input: boolean) {
    this.__isOpened = input;
  }
  get isMine(): boolean {
    return this.__isMine;
  }
  set isMine(input: boolean) {
    this.__isMine = input;
  }
  get isChecked() {
    return this.__isChecked;
  }
  get mineCount(): number {
    return this.__mineCount;
  }
  set mineCount(count: number) {
    this.__mineCount = count;
  }

  open() {
    if (this.__isChecked) return;
    this.__isOpened = true;
  }

  check() {
    if (this.__isOpened) return;
    this.__isChecked = !this.__isChecked;
  }
}
