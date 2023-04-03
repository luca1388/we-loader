import "./App.css";
import { getFridayLoader } from "./date-utils";
import useInterval from "./hooks/useInterval";
import { useCallback, useEffect, useState } from "react";

const REFRESH_INTERVAL = 10000;

function App() {
  const [ratio, setRatio] = useState(0);
  useInterval(() => {
    const fridayLoader = getFridayLoader();
    setRatio(fridayLoader.percentageToFridayFromToday);

  }, REFRESH_INTERVAL);

  useEffect(() => {
    const fridayLoader = getFridayLoader();
    setRatio(fridayLoader.percentageToFridayFromToday);
  }, []);

  const getPercentage = useCallback(() => {
    return new Intl.NumberFormat("default", {
      style: "percent",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(ratio);
  }, [ratio]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weekend loader</h1>
        <label for="weekend">{ ratio === 1 ? `TGIF!` : `Friday is almost here...`}</label>
        <progress
          id="weekend"
          max={1}
          value={ratio}
        >
          {getPercentage()}
        </progress>
        <p>{getPercentage()}</p>
      </header>
    </div>
  );
}

export default App;
