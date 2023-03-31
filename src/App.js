import logo from "./logo.svg";
import "./App.css";
import { getFridayLoader } from "./date-utils";

function App() {
  const fridayLoader = getFridayLoader();
  const percentage = new Intl.NumberFormat("default", {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 3,
  }).format(fridayLoader.percentageToFridayFromToday);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weekend loader - in progress</h1>
        <label for="weekend">{ fridayLoader.differenceInTime === 0 ? `TGIF!` : `Friday is almost here...`}</label>
        <progress
          id="weekend"
          max={fridayLoader.fridayTime}
          value={fridayLoader.todayTime}
        >
          {percentage}
        </progress>
        <p>{percentage}</p>
      </header>
    </div>
  );
}

export default App;
