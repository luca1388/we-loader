import { useCallback } from "react";

const Progress = ({ value }) => {
  const getPercentage = useCallback(() => {
    const formattedPercentage = new Intl.NumberFormat("default", {
      style: "percent",
      minimumFractionDigits: value === 1 ? 0 : 2,
      maximumFractionDigits: 2,
    }).format(value);

    const [integer, decimal] = formattedPercentage.replace("%", "").split(",");
    const roundedValueBefore100 = new Intl.NumberFormat("default", {
      style: "percent",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format("0.9999");

    return integer === "100" && decimal === "00"
      ? roundedValueBefore100
      : formattedPercentage;
  }, [value]);

  return (
    <>
      <label htmlFor="weekend">
        <h2 className="App-percentage">{getPercentage()}</h2>
      </label>
      <progress id="weekend" max={1} value={value}>
        {getPercentage()}
      </progress>
    </>
  );
};

export default Progress;