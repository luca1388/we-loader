// import party from "party-js";
import { Fireworks } from "@fireworks-js/react";

const WinnerScreen = () => {
  // useEffect(() => {
  //   if (ratio === 1) {
  //     party.confetti(containerRef.current);
  //   }
  // }, [ratio]);
  return (
    <Fireworks
      options={{
        rocketsPoint: {
          min: 0,
          max: 100,
        },
      }}
      style={{
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        position: "fixed",
      }}
    />
  );
};

export default WinnerScreen;
