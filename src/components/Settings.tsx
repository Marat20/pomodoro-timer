import { memo } from 'react';
import { FaArrowCircleUp, FaArrowCircleDown } from 'react-icons/fa';
import { useAppDispatch } from '../redux/redux-hooks';
import { increment, decrement } from '../redux/slices/timerSlice';

interface SettingsData {
  label: string;
  mode: string;
  length: number;
}

export const Settings = memo(({ label, mode, length }: SettingsData) => {
  const dispatch = useAppDispatch();

  const incrementCount = () => {
    dispatch(increment(mode));
  };

  const decrementCount = () => {
    dispatch(decrement(mode));
  };

  return (
    <div className='time-adjust-wrapper' style={{ justifyContent: 'normal' }}>
      <h3 id={`${mode}-label`}>{label} Length</h3>
      <div className='adjust-time'>
        <span id={`${mode}-increment`} onClick={incrementCount}>
          <FaArrowCircleUp className='fas fa-arrow-circle-up' />
        </span>
        <p>
          {mode === 'Session' || mode === 'Break' ? (
            <span id={`${mode}-length`}>{length} min</span>
          ) : (
            <span id={`${mode}-length`}>{length}</span>
          )}
        </p>
        <span id={`${mode}-decrement`} onClick={decrementCount}>
          <FaArrowCircleDown className='fas fa-arrow-circle-down' />
        </span>
      </div>
    </div>
  );
});
