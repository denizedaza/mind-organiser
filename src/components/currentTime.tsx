import React, { useState, useEffect } from "react";

interface Time {
  hour: number;
  minute: number;
  month: number;
  day: number;
  year: number;
}

const CurrentTime = (futureTime: number | any) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [currentTime, setCurrentTime] = useState<Time>({
    hour: currentDate.getHours(),
    minute: currentDate.getMinutes(),
    month: currentDate.getMonth(),
    day: currentDate.getDate(),
    year: currentDate.getFullYear(),
  });

  function padDisplay(value: number) {
    return value.toString().padStart(2, "0");
  }

  useEffect(() => {
    let timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  }, [currentDate]);

  useEffect(() => {
    setCurrentTime({
      ...currentTime,
      hour: currentDate.getHours(),
      minute: currentDate.getMinutes(),
    });
  }, [currentDate]);

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

  return (
    <div>
      <p>Current Time:</p>

      <h3>{`${monthNames[currentTime?.month]} ${currentTime?.day}, ${
        currentTime?.year
      }`}</h3>
      <h1>{`${padDisplay(currentTime?.hour)}:${padDisplay(
        currentTime?.minute
      )}`}</h1>
      <h1>{currentDate.toLocaleTimeString()}</h1>
      <br />
      <p>Predicted End Time:</p>
      <h3>
        {calcFutureTime(25).hours}:{calcFutureTime(25).minutes}
      </h3>
    </div>
  );
};

export default CurrentTime;
