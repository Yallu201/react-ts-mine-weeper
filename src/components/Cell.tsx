import { observer } from "mobx-react";
import { useCallback, useMemo } from "react";
import { CellStore } from "../store";
import { useBoardStore } from "../store/Board";
import { useGameStore } from "../store/Game";
type CellProps = { cell: CellStore; setMine: () => void };
const CellComponent = observer(({ cell, setMine }: CellProps) => {
  const gameStore = useGameStore();
  const boardStore = useBoardStore();
  const onClick = useCallback(() => {
    if (gameStore.isGameOver) {
      return;
    }
    cell.open();
    if (cell.isMine) {
      // 지뢰인 경우, 게임 정지 및 모든 지뢰 표시
      boardStore.openMines();
      gameStore.gameOver();
      return;
    }
    setMine();
    gameStore.start();
  }, [setMine, cell, boardStore, gameStore]);

  const content = useMemo(() => {
    if (!cell.isMine && cell.mineCount > 0) {
      return cell.mineCount;
    }
    return null;
  }, [cell.isMine, cell.mineCount]);

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
