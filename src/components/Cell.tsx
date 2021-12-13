import { observer } from "mobx-react";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { CellStore } from "../store";
import { useBoardStore } from "../store/Board";
import { useGameStore } from "../store/Game";
import { CellIndex } from "../store/Cell";
type CellProps = {
  cell: CellStore;
  setMine: (arg0: CellIndex, arg1: CellIndex) => void;
};
const CellComponent = observer(({ cell, setMine }: CellProps) => {
  const gameStore = useGameStore();
  const boardStore = useBoardStore();
  const buttonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (buttonRef && buttonRef.current) {
      buttonRef.current.addEventListener("mousedown", mouseHandler);
      buttonRef.current.addEventListener("contextmenu", preventContextMenu);
    }
    function preventContextMenu(e: MouseEvent) {
      e.preventDefault();
    }
    function mouseHandler(e: MouseEvent) {
      const [LEFT, RIGHT, TOGETHER] = [1, 2, 3];
      switch (e.buttons) {
        case LEFT:
          break;
        case RIGHT:
          if (cell.isOpened) break;
          const offSet = cell.isChecked ? -1 : 1;
          gameStore.addCheckCount(offSet);
          cell.check();
          break;
        case TOGETHER:
          break;
        default:
      }
    }
    return () => {
      if (buttonRef && buttonRef.current) {
        buttonRef.current.removeEventListener("mousedown", mouseHandler);
        buttonRef.current.removeEventListener(
          "contextmenu",
          preventContextMenu
        );
      }
    };
  }, [cell]);
  const onClick = useCallback(() => {
    if (gameStore.isGameOver || cell.isChecked) {
      return;
    }
    if (cell.isMine) {
      // 지뢰인 경우, 게임 정지 및 모든 지뢰 표시
      boardStore.openMines();
      gameStore.gameOver("fail");
      return;
    }
    if (!gameStore.isGameStart) {
      setMine(cell.row, cell.column);
      gameStore.start();
    }
    if (cell.mineCount === 0) {
      boardStore.openEmptyCells(cell.row, cell.column);
    }
    if (cell.isOpened) {
      boardStore.openAroundCell(cell.row, cell.column);
    } else {
      cell.open();
      boardStore.addOpenCell();
    }
  }, [setMine, cell, boardStore, gameStore]);

  const content = useMemo(() => {
    if (!cell.isMine && cell.isOpened && cell.mineCount > 0) {
      return cell.mineCount;
    }
    return null;
  }, [cell.isMine, cell.mineCount, cell.isOpened]);

  const className = useMemo(() => {
    const open = cell.isOpened ? " open" : "";
    const check = cell.isChecked ? " check" : "";
    const gameOver = gameStore.isGameOver ? (cell.isChecked ? "" : " red") : "";
    const color = cell.isOpened ? ` mine-count-${cell.mineCount}` : "";
    return `cell${open}${check}${gameOver}${color}`;
  }, [
    cell.isMine,
    cell.isOpened,
    cell.isChecked,
    cell.mineCount,
    gameStore.isGameOver,
  ]);

  return (
    <button ref={buttonRef} className={className} onClick={onClick}>
      {content}
    </button>
  );
});

export default CellComponent;
