import "./App.css";
import { Header, Board } from "./components";
import { BoardProvider, useBoardStore } from "./store/Board";
import { GameProvider, useGameStore } from "./store/Game";

function App() {
  const gameStore = useGameStore();
  const boardStore = useBoardStore();
  return (
    <div className="container">
      <GameProvider store={gameStore}>
        <BoardProvider store={boardStore}>
          <Header />
          <Board />
        </BoardProvider>
      </GameProvider>
    </div>
  );
}

export default App;
