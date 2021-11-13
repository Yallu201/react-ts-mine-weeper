import React, { MouseEventHandler } from "react";

type HeaderProps = {
  mineCount: number;
  onClickReset: MouseEventHandler<HTMLElement> | undefined;
  timeSpent: number;
};
const Header = ({ mineCount, onClickReset, timeSpent }: HeaderProps) => {
  return (
    <div className="header-warp">
      <input type="text" value={mineCount} />
      <button onClick={onClickReset}>reset</button>
      <input type="text" value={timeSpent} />
    </div>
  );
};

export default Header;
