import { useCallback, useState } from "react";
import "./App.css";

function App() {
  const [mineCount, setMineCount] = useState(10);
  const [timeSpent, setTimeSpent] = useState(0);
  const [stopwatch, setStopwatch] = useState<NodeJS.Timeout | null>(null);
  const onClickReset = useCallback(() => {
    stopwatch && clearInterval(stopwatch);
    setTimeSpent(0);
  }, [stopwatch]);
  return (
    <div className="container">
      <div className="header-wrap">
        <input type="text" value={mineCount} />
        <button onClick={onClickReset}>reset</button>
        <input type="text" value={timeSpent} />
      </div>
      <div className="cell-area-wrap">
      </div>
    </div>
  );
}

export default App;
