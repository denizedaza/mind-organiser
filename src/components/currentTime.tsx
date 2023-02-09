import React, { useState, useEffect, useRef } from "react";
import { Time } from "./types";
import FutureTime from "./futureTime";
import { padDisplay } from "@/utils";

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
  const [isTimeOn, setIsTimeOn] = useState<Boolean>(true);

  useInterval(() => {
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
    }, []);
  }

  return (
    <div>
      <p>Current Time:</p>
      <h3>{`${monthNames[currentTime?.month]} ${currentTime?.day}, ${
        currentTime?.year
      }`}</h3>
      <h1>
        currentTime obj-
        {`${padDisplay(currentTime?.hour)}:${padDisplay(
          currentTime?.minute
        )}:${padDisplay(currentTime?.seconds)}`}
      </h1>
      <h1>currentDate obj- {currentDate.toLocaleTimeString()}</h1>
      <br />
      <FutureTime currentTime={currentTime} />
    </div>
  );
};

export default CurrentTime;
