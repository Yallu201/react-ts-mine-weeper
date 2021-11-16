import { observer } from "mobx-react";
import { useCallback, useMemo } from "react";
import { CellStore } from "../store";
import { useGameStore } from "../store/Game";
type CellProps = { cell: CellStore; setMine: () => void };
const CellComponent = observer(({ cell, setMine }: CellProps) => {
  const gameStore = useGameStore();

  const onClick = useCallback(() => {
    if (cell.isMine) {
      // 지뢰인 경우, 게임 정지 및 모든 지뢰 표시
    }
    setMine();
    gameStore.start();
    cell.isOpened = true;
  }, [setMine, cell, gameStore]);

  const content = useMemo(() => {
    const { mineCount, isMine } = cell;
    return isMine ? null : mineCount > 0 ? mineCount : null;
  }, [cell.mineCount, cell.isMine]);
  const className = useMemo(() => {
    const open = cell.isOpened ? (cell.isMine ? " mine open" : " open") : "";
    return `cell${open}`;
  }, [cell.isMine, cell.isOpened]);
  return (
    <button className={className} onClick={onClick}>
      {content}
    </button>
  );
});

export default CellComponent;
