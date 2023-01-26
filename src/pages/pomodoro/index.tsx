import React from "react";
import styles from "@/styles/Pomodoro.module.css";

const Pomodoro = () => {
  return (
    <div className={styles.pomodoro}>
      <div className={styles.message}>
        <div>Break time! New Session starts in: </div>
      </div>
      <div className="timer">25:00</div>
    </div>
  );
};

export default Pomodoro;
