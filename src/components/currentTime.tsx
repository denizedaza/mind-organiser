import React, { useState, useEffect, useRef } from "react";
import { Time } from "./types";
import FutureTime from "./futureTime";

const CurrentTime = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [currentTime, setCurrentTime] = useState<Time>({
    hour: currentDate.getHours(),
    minute: currentDate.getMinutes(),
    seconds: currentDate.getSeconds(),
    month: currentDate.getMonth(),
    day: currentDate.getDate(),
    year: currentDate.getFullYear(),
  });
  const [isRunning, setIsRunning] = useState(true);

  function padDisplay(value: number) {
    return value.toString().padStart(2, "0");
  }

  function updateDate() {
    let date = new Date();
    setCurrentDate(date);
  }

  function updateTime() {
    setCurrentTime({
      ...currentTime,
      hour: currentDate.getHours(),
      minute: currentDate.getMinutes(),
      seconds: currentDate.getSeconds(),
    });
  }

  useInterval(() => {
    updateDate();
    updateTime();
  }, 1000);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  function handleIsRunningChange(e: {
    target: { checked: boolean | ((prevState: boolean) => boolean) };
  }) {
    setIsRunning(e.target.checked);
  }

  function calcFutureTime(minutesInFuture: number) {
    const startHour = currentTime.hour;
    const startMinute = currentTime.minute;
    const TBDMinutes = (startMinute + minutesInFuture ?? 25) % 60;
    const TBDHour = TBDMinutes <= 24 ? startHour + 1 : startHour;
    const finishedTime = {
      hours: TBDHour,
      minutes: TBDMinutes,
      // TODO, future: add checks if user is working past midnight and the day/month/year rolls over. start with day then month, etc
    };
    return finishedTime;
  }

  function useInterval(callback: () => void, delay: number) {
    const savedCallback = useRef();

    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    });
  }

  return (
    <div>
      <p>Current Time:</p>
      <h3>{`${monthNames[currentTime?.month]} ${currentTime?.day}, ${
        currentTime?.year
      }`}</h3>
      <h1>{`${padDisplay(currentTime?.hour)}:${padDisplay(
        currentTime?.minute
      )}:${padDisplay(currentTime?.seconds)}`}</h1>
      <h1>{currentDate.toLocaleTimeString()}</h1>
      <br />
      {/* <input
        type="checkbox"
        checked={isRunning}
        onChange={handleIsRunningChange}
      />
      Start Now? */}
      <p>Predicted End Time:</p>
      <FutureTime currentTime={currentTime} />
      {/* <h3>
        {padDisplay(calcFutureTime(25).hours)}:
        {padDisplay(calcFutureTime(25).minutes)}
      </h3> */}
    </div>
  );
};

export default CurrentTime;
