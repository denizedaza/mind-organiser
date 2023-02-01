import React, { useState } from "react";
import { Time } from "./types";

const FutureTime = (props: {
  currentTime: Time;
  displayCallback: Function;
}) => {
  const { currentTime, displayCallback } = props;
  const [hasStarted, setHasStarted] = useState(false); //if future clock has started

  function handleHasStartedChange(e: {
    target: { checked: boolean | ((prevState: boolean) => boolean) };
  }) {
    setHasStarted(e.target.checked);
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

  const displayTime = `${displayCallback(
    calcFutureTime(25).hours
  )}:${displayCallback(calcFutureTime(25).minutes)}`;

  return (
    <>
      <p>Predicted End Time:</p>
      <h3>{displayTime}</h3>
    </>
  );
};

export default FutureTime;
