import { useGameStore } from "../store/Game";

const Header = () => {
  const store = useGameStore();
  return (
    <div className="header-wrap">
      <input type="text" value={store.mineCount} />
      <button onClick={store.reset}>reset</button>
      <input type="text" value={store.seconds} />
    </div>
  );
};

export default Header;
