import { useCallback, useState } from "react";
import "./App.css";
import { Header, CellArea } from "./components";
import { GameProvider, useGameStore } from "./store/Game";

function App() {
  const gameStore = useGameStore();
  return (
    <div className="container">
      <GameProvider store={gameStore}>
        <Header />
        <CellArea />
      </GameProvider>
    </div>
  );
}

export default App;
