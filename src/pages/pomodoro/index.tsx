import React, { useState, useEffect } from "react";
import CurrentTime from "@/components/currentTime";
import styles from "@/styles/Pomodoro.module.css";

interface PomoTimer {
  minutes: number;
  seconds: number;
  isBreak: boolean;
  isPaused?: boolean;
}

const Pomodoro = () => {
  // const [minutes, setMinutes] = useState(25);
  // const [seconds, setSeconds] = useState(0);
  const [timer, setTimer] = useState<PomoTimer>({
    minutes: 25,
    seconds: 0,
    isBreak: false,
    isPaused: false,
  });
  // const [displayMessage, setDisplayMessage] = useState(false); // if true, then timer is in "break"

  const displayMinutes = timer.minutes.toString().padStart(2, "0");
  const displaySeconds = timer.seconds.toString().padStart(2, "0");

  //TODO: pause, play, stop buttons + functionalities
  // useEffect(() => {
  // }, [timer.seconds]);
  let interval: NodeJS.Timer;

  function startTimer() {
    console.log("start timer was pressed!!");
    interval = setInterval(() => {
      clearInterval(interval);
      if (timer.seconds === 0) {
        if (timer.minutes !== 0) {
          setTimer({
            ...timer,
            seconds: 59,
            minutes: timer.minutes - 1,
          });
        } else {
          let minutes = timer.isBreak ? 24 : 4;
          let seconds = 59;

          setTimer({
            seconds: seconds,
            minutes: minutes,
            isBreak: !timer.isBreak,
          });
          // setDisplayMessage(!displayMessage);
        }
      } else if (timer.seconds !== 0) {
        setTimer({
          ...timer,
          seconds: timer.seconds - 1,
        });
        // setSeconds(seconds - 1);
      }
    }, 1000);
    setTimer({
      ...timer,
      isPaused: false,
    });
  }

  function stopTimer() {
    clearInterval(interval);
    setTimer({
      ...timer,
      isPaused: true,
    });
    console.log("Stopped timer was pressed!!");
    // clearInterval(interval);
  }

  return (
    <>
      <CurrentTime />
      <div className={styles.pomodoro}>
        <div className={styles.message}>
          {timer.isBreak && <div>Break time! New Session starts in: </div>}
        </div>
        <div className={styles.timer}>
          {displayMinutes}:{displaySeconds}
        </div>
        <div className={styles.controlPanel}>
          <button>PAUSE</button>
          <button onClick={startTimer}>PLAY</button>
          <button onClick={stopTimer}>STOP</button>
        </div>
      </div>
    </>
  );
};

export default Pomodoro;
