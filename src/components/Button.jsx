import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleTimer, reset } from '../store/timer/actionTimer';

export const Button = ({ id, children, icon }) => {
  const dispatch = useDispatch();
  const handleBtn = () => {
    id !== 'reset' ? dispatch(toggleTimer()) : dispatch(reset());
  };

  return (
    <button id={id} onClick={handleBtn}>
      {icon} {children}
    </button>
  );
};
