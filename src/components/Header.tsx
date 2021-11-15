import { observer } from "mobx-react";
import { useCallback } from "react";
import { useGameStore } from "../store/Game";

const Header = observer(() => {
  const store = useGameStore();
  const onReset = useCallback(() => {
    store.reset();
  }, []);
  return (
    <div className="header-wrap">
      <input type="text" value={store.mineCount} />
      <button onClick={onReset}>reset</button>
      <input type="text" value={store.seconds} />
    </div>
  );
});

export default Header;
