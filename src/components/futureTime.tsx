import React from "react";
import { Time } from "./types";

const FutureTime = (props: { currentTime: Time }) => {
  return (
    <>
      <div> End TIME:</div>
      <div>
        {props.currentTime.hour}:{props.currentTime.minute}:
        {props.currentTime.seconds}
      </div>
    </>
  );
};

export default FutureTime;
