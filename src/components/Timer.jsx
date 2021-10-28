import React from "react";

export const Timer = ({mode, timeLeft}) => {
  return (
    <>
      <h2 id="timer-label">{mode}</h2>
      <div id="time-left">
          {timeLeft}
      </div>

    </>
  );
}