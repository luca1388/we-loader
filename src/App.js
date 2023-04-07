import "./App.css";
import { getFridayLoader } from "./date-utils";
import useInterval from "./hooks/useInterval";

import { useCallback, useEffect, useState } from "react";
import WinnerScreen from "./components/WinnerScreen/WinnerScreen";
import Progress from "./components/Progress/Progress";
import DailyMessage from "./components/DailyMessage/DailyMessage";

const REFRESH_INTERVAL = 10000;

function App() {
  const [ratio, setRatio] = useState(null);

  const computeCurrentRatio = useCallback(() => {
    const fridayLoader = getFridayLoader();
    setRatio(fridayLoader.percentageToFridayFromToday);
  }, []);

  useEffect(() => {
    computeCurrentRatio();
  }, [computeCurrentRatio]);

  useInterval(() => {
    computeCurrentRatio();
  }, REFRESH_INTERVAL);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Weekend loader</h1>
        <Progress value={ratio} />
        <DailyMessage ratio={ratio} />
      </header>
      {ratio === 1 && <WinnerScreen />}
    </div>
  );
}

export default App;
