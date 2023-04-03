import "./App.css";
import { getFridayLoader } from "./date-utils";
import { getRandomIntBetweenZeroAnd } from "./math-utils";
import useInterval from "./hooks/useInterval";
import messages from "./i18n.json";
import { useCallback, useEffect, useState } from "react";

const REFRESH_INTERVAL = 10000;

function App() {
  const [ratio, setRatio] = useState(0);
  const [message, setMessage] = useState("");

  const computeCurrentRatio = useCallback(() => {
    const fridayLoader = getFridayLoader();
    setRatio(fridayLoader.percentageToFridayFromToday);
  }, []);

  const getMessage = () => {
    if (ratio < 0.5) {
      const index = getRandomIntBetweenZeroAnd(
        messages.weekendMessages.firstHalf.length
      );
      return messages.weekendMessages.firstHalf[index];
    }
    if (ratio < 1) {
      const index = getRandomIntBetweenZeroAnd(
        messages.weekendMessages.secondHalf.length
      );
      return messages.weekendMessages.secondHalf[index];
    }
    const index = getRandomIntBetweenZeroAnd(
      messages.weekendMessages.completed.length
    );
    return messages.weekendMessages.completed[index];
  };

  useEffect(() => {
    setMessage(getMessage());
  }, []);

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

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weekend loader</h1>
        <label htmlFor="weekend">{message}</label>
        <progress id="weekend" max={1} value={ratio}>
          {getPercentage()}
        </progress>
        <p>{getPercentage()}</p>
      </header>
    </div>
  );
}

export default App;
