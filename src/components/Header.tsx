import { observer } from "mobx-react";
import { useCallback } from "react";
import { useBoardStore } from "../store/Board";
import { useGameStore } from "../store/Game";

const Header = observer(() => {
  const boardStore = useBoardStore();
  const gameStore = useGameStore();
  const onReset = useCallback(() => {
    gameStore.reset();
    boardStore.init();
  }, [gameStore, boardStore]);
  return (
    <>
      <div className="header-wrap">
        <div className="header-best">
          best: {gameStore.best === 0 ? "-" : `${gameStore.best}초`}
        </div>
      </div>
      <div className="header-wrap">
        <div className="header-item header-info">{gameStore.leftMineCount}</div>
        <div className="header-item">
          <button onClick={onReset}>Reset</button>
        </div>
        <div className="header-item header-info">{gameStore.seconds}</div>
      </div>
    </>
  );
});

export default Header;
