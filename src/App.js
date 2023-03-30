import logo from "./logo.svg";
import "./App.css";
import { getFridayLoader } from "./date-utils";

function App() {
  const fridayLoader = getFridayLoader();
  const percentage = parseFloat(fridayLoader.percentageToFridayFromToday).toFixed(4);
  return (
    <div className="App">
      <header className="App-header">
        <h1>Weekend loader</h1>
        <label for="weekend">Friday is almost here...</label>
        <progress id="weekend" max={fridayLoader.fridayTime} value={fridayLoader.todayTime}>
          {percentage}
        </progress>
        <p>{percentage}</p>
      </header>
    </div>
  );
}

export default App;
