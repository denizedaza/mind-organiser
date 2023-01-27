import React, { useState, useEffect } from "react";
import styles from "@/styles/Pomodoro.module.css";

const Pomodoro = () => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(4);
  const [displayMessage, setDisplayMessage] = useState(false); // if true, then timer is in "break"

  useEffect(() => {
    let interval = setInterval(() => {
      clearInterval(interval);

      if (seconds === 0) {
        if (minutes !== 0) {
          setSeconds(59);
          setMinutes(minutes - 1);
        } else {
          let minutes = displayMessage ? 24 : 4;
          let seconds = 59;

          setSeconds(seconds);
          setMinutes(minutes);
          setDisplayMessage(!displayMessage);
        }
      } else {
        setSeconds(seconds - 1);
      }
    }, 1000);
  }, [seconds]);

  const timerMinutes = minutes.toString().padStart(2, "0");
  const timerSeconds = seconds.toString().padStart(2, "0");

  //TODO: pause, play, stop buttons + functionalities

  return (
    <div className={styles.pomodoro}>
      <div className={styles.message}>
        {displayMessage && <div>Break time! New Session starts in: </div>}
      </div>
      <div className={styles.timer}>
        {timerMinutes}:{timerSeconds}
      </div>
    </div>
  );
};

export default Pomodoro;
