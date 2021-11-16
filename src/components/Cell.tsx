import { observer } from "mobx-react";
import { useCallback } from "react";
import { CellStore } from "../store";
import { useGameStore } from "../store/Game";
  type CellProps = { cell: CellStore; setMine: () => void };
const CellComponent = observer(({ cell, setMine }: CellProps) => {
  const gameStore = useGameStore();

  const onClick = useCallback(() => {
    setMine();
    gameStore.start();
    cell.isOpened = true;
  }, [setMine,cell,gameStore]);
  return (
    <button
      className={`cell ${cell.isMine ? "mine" : ""} ${
        cell.isOpened ? "open" : ""
      }`}
      onClick={onClick}
    >
      {cell.row}, {cell.column}
    </button>
  );
});

export default CellComponent;
