import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTimer, reset } from '../store/timer/actionTimer';
import { getTimerIsStarted } from '../store/timer/selectorTimer';
import { startTimer } from '../store/timer/actionTimer';

export const Button = ({ id, children, icon }) => {
  const startingTimer = useSelector(getTimerIsStarted);
  const dispatch = useDispatch();
  const handleBtn = () => {
    if (!startingTimer && id === 'start_stop') dispatch(startTimer());
    id !== 'reset' ? dispatch(toggleTimer()) : dispatch(reset());
  };

  return (
    <button id={id} onClick={handleBtn}>
      {icon} {children}
    </button>
  );
};
