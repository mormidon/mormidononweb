import { useState } from "react";
import "./App.css";
import CurrentDate from "./CurrentDate";
import ButtonsBar from "./ButtonsBar";
import Progress from "./Progress";
import Confetti from "./Confetti";
import TaskCalendar from "./TaskCalendar";

function App() {
  const [progr, setProgr] = useState(0);

  const handleClick = (event) => {
    setProgr((currentProgress) => currentProgress + 100 / 6);
    event.target.disabled = true;
  };

  return (
    <>
      <CurrentDate />
      <br />
      <ButtonsBar buttonClick={handleClick} />
      <br />
      <Progress percents={progr} />
      {progr >= 100 && <Confetti />}
      <br />
      <TaskCalendar />
    </>
  );
}

export default App;
