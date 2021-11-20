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
    <div className="header-wrap">
      <input type="text" value={gameStore.leftMineCount} />
      <button onClick={onReset}>reset</button>
      <input type="text" value={gameStore.seconds} />
    </div>
  );
});

export default Header;
