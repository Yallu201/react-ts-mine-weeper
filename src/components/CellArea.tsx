import { MouseEventHandler } from "react";

type CellAreaProps = {
  onClickCell: MouseEventHandler<HTMLButtonElement> | undefined;
};
const CellArea = ({ onClickCell }: CellAreaProps) => {
  return (
    <div className="cell-area-wrap">
      <button onClick={onClickCell}>This is first cell</button>
    </div>
  );
};

export default CellArea;
