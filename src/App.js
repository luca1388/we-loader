import "./App.css";
import { getFridayLoader } from "./date-utils";
import { getRandomIntBetweenZeroAnd } from "./math-utils";
import useInterval from "./hooks/useInterval";
import messages from "./i18n.json";
import { useCallback, useEffect, useRef, useState } from "react";
import WinnerScreen from "./components/WinnerScreen/WinnerScreen";
import Progress from "./components/Progress/Progress";

const REFRESH_INTERVAL = 10000;

function App() {
  const [ratio, setRatio] = useState(null);
  const messageRef = useRef(null);
  const containerRef = useRef(null);
  const [message, setMessage] = useState("");

  const computeCurrentRatio = useCallback(() => {
    const fridayLoader = getFridayLoader();
    setRatio(fridayLoader.percentageToFridayFromToday);
  }, []);

  useEffect(() => {
    if (ratio !== null) {
      if (messageRef.current === null) {
        messageRef.current = true;
      }
    }
  }, [ratio]);

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
    if (messageRef.current || ratio === 1) {
      messageRef.current = false;
      setMessage(getMessage());
    }
  }, [getMessage, ratio]);

  useInterval(() => {
    computeCurrentRatio();
  }, REFRESH_INTERVAL);

  return (
    <div className="App" ref={containerRef}>
      <header className="App-header">
        <h1 className="App-title">Weekend loader</h1>
        <Progress value={ratio} />
        <p>{message}</p>
      </header>
      {ratio === 1 && <WinnerScreen />}
    </div>
  );
}

export default App;
