import { useCallback, useState } from "react";
import "./App.css";
import { Header, Board } from "./components";
import { GameProvider, useGameStore } from "./store/Game";

function App() {
  const gameStore = useGameStore();
  return (
    <div className="container">
      <GameProvider store={gameStore}>
        <Header />
        <Board />
      </GameProvider>
    </div>
  );
}

export default App;
