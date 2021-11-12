import { useState } from "react";
import "./App.css";

function App() {
  const [mineCount, setMineCount] = useState(10);
  const [timeSpent, setTimeSpent] = useState(0);
  const [stopwatch, setStopwatch] = useState<NodeJS.Timeout | null>(null);
  return (
    <div className="container">
      <div className="header-wrap">
      </div>
      <div className="cell-area-wrap">
      </div>
    </div>
  );
}

export default App;
