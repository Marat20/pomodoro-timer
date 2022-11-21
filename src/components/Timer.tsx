import { memo } from 'react';

interface TimerData {
  mode: string;
  timeLeft: string;
}

export const Timer = memo(({ mode, timeLeft }: TimerData) => {
  return (
    <>
      <h2 id='timer-label'>{mode}</h2>
      <div id='time-left'>{timeLeft}</div>
    </>
  );
});
