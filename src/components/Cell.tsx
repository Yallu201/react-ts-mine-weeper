import { Cell } from "../store";
type CellProps = { cell: Cell };
const CellComponent = ({ cell }: CellProps) => {
  return (
    <button className="cell">
      {cell.row}, {cell.column}
    </button>
  );
};

export default CellComponent;
