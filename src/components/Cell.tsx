import { observer } from "mobx-react";
import { useCallback, useMemo } from "react";
import { CellStore } from "../store";
import { useGameStore } from "../store/Game";
type CellProps = { cell: CellStore; setMine: () => void };
const CellComponent = observer(({ cell, setMine }: CellProps) => {
  const gameStore = useGameStore();

  const onClick = useCallback(() => {
    setMine();
    gameStore.start();
    cell.isOpened = true;
  }, [setMine, cell, gameStore]);

  const content = useMemo(() => {
    const { mineCount } = cell;
    return mineCount > 0 ? mineCount : null;
  }, [cell.mineCount]);
  const className = useMemo(() => {
    const mine = cell.isMine ? " mine" : "";
    const open = cell.isOpened ? " open" : "";
    return `cell${mine}${open}`;
  }, [cell.isMine, cell.isOpened]);
  return (
    <button className={className} onClick={onClick}>
      {content}
    </button>
  );
});

export default CellComponent;
