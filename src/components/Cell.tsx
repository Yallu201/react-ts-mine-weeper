import { observer } from "mobx-react";
import { useCallback, useMemo } from "react";
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
  const onClick = useCallback(() => {
    if (gameStore.isGameOver) {
      return;
    }
    if (cell.isMine) {
      // 지뢰인 경우, 게임 정지 및 모든 지뢰 표시
      boardStore.openMines();
      gameStore.gameOver();
      cell.open();
      boardStore.addOpenCell();
      return;
    }
    if (!gameStore.isGameStart) {
      setMine(cell.row, cell.column);
      gameStore.start();
    }
    if (cell.mineCount === 0) {
      boardStore.openEmptyCells(cell.row, cell.column);
    }
    cell.open();
    boardStore.addOpenCell();
  }, [setMine, cell, boardStore, gameStore]);

  const content = useMemo(() => {
    if (!cell.isMine && cell.isOpened && cell.mineCount > 0) {
      return cell.mineCount;
    }
    return null;
  }, [cell.isMine, cell.mineCount, cell.isOpened]);

  const className = useMemo(() => {
    const open = cell.isOpened ? (cell.isMine ? " mine open" : " open") : "";
    const gameOver = gameStore.isGameOver ? " red" : "";
    return `cell${open}${gameOver}`;
  }, [cell.isMine, cell.isOpened, gameStore.isGameOver]);

  return (
    <button className={className} onClick={onClick}>
      {content}
    </button>
  );
});

export default CellComponent;
