import "./App.css";
import { getFridayLoader } from "./date-utils";
import { getRandomIntBetweenZeroAnd } from "./math-utils";
import useInterval from "./hooks/useInterval";
import messages from '../resources/i18n.json';
import { useCallback, useEffect, useState } from "react";

const REFRESH_INTERVAL = 10000;

function App() {
  const [ratio, setRatio] = useState(0);

  const computeCurrentRatio = () => {
    const fridayLoader = getFridayLoader();
    setRatio(fridayLoader.percentageToFridayFromToday);
  };

  useInterval(() => {
    computeCurrentRatio();
  }, REFRESH_INTERVAL);

  useEffect(() => {
    computeCurrentRatio();
  }, [computeCurrentRatio]);

  const getPercentage = useCallback(() => {
    return new Intl.NumberFormat("default", {
      style: "percent",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(ratio);
  }, [ratio]);

  const getMessage = () => {
    if (ratio < 0.5) {
      const index = getRandomIntBetweenZeroAnd(messages['firstHalf'].length)
      return messages.firstHalf[index];
    }
    if (ratio < 1) {
      const index = getRandomIntBetweenZeroAnd(messages['secondHalf'].length)
      return messages.secondHalf[index];
    }
    const index = getRandomIntBetweenZeroAnd(messages['completed'].length)
    return messages.completed[index];
  };

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
