import "./App.css";
import { getFridayLoader } from "./date-utils";
import { getRandomIntBetweenZeroAnd } from "./math-utils";
import useInterval from "./hooks/useInterval";
import messages from "./i18n.json";
import party from 'party-js';
import { useCallback, useEffect, useRef, useState } from "react";

const REFRESH_INTERVAL = 10000;

function App() {
  const [ratio, setRatio] = useState(0);
  const messageRef = useRef(null);
  const containerRef = useRef(null);
  const [message, setMessage] = useState("");

  const computeCurrentRatio = useCallback(() => {
    const fridayLoader = getFridayLoader();
    setRatio(fridayLoader.percentageToFridayFromToday);
    if (messageRef.current === null) {
      messageRef.current = true;
    }
  }, []);

  const getMessage = useCallback(() => {
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
  }, [ratio]);

  useEffect(() => {
    computeCurrentRatio();
  }, [computeCurrentRatio]);

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current = false;
      setMessage(getMessage());
    }
  }, [getMessage]);

  useInterval(() => {
    computeCurrentRatio();
  }, REFRESH_INTERVAL);

  const getPercentage = useCallback(() => {
    return new Intl.NumberFormat("default", {
      style: "percent",
      minimumFractionDigits: ratio === 1 ? 0 : 2,
      maximumFractionDigits: 2,
    }).format(ratio);
  }, [ratio]);

  useEffect(() => {
    if (ratio === 1) {
      party.confetti(containerRef.current);
    }
  }, [ratio]);

  return (
    <div className="App" ref={containerRef}>
      <header className="App-header">
        <h1 className="App-title">Weekend loader</h1>
        <label htmlFor="weekend">
          <h2 className="App-percentage">{getPercentage()}</h2>
        </label>
        <progress id="weekend" max={1} value={ratio}>
          {getPercentage()}
        </progress>
        <p>{message}</p>
      </header>
    </div>
  );
}

export default App;
