import { observer } from "mobx-react";
import { useCallback } from "react";
import { Cell } from "../store";
type CellProps = { cell: Cell; setMine: () => void };
const CellComponent = observer(({ cell, setMine }: CellProps) => {
  const onClick = useCallback(() => {
    setMine();
    cell.isOpened = true;
  }, [setMine]);
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