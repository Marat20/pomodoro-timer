import { useAppDispatch, useAppSelector } from '../redux/redux-hooks';
import { startTimer, reset, toggleTimer } from '../redux/slices/timerSlice';
import { FaPlay, FaPause, FaSyncAlt } from 'react-icons/fa';
import { memo } from 'react';

interface ButtonData {
  id: string;
  name: string;
}

export const Button = memo(({ id, name }: ButtonData) => {
  const { timerIsStarted } = useAppSelector((state) => state.persistedReducer);
  const dispatch = useAppDispatch();

  const handleBtn = () => {
    if (!timerIsStarted && id === 'start_stop') dispatch(startTimer());
    id !== 'reset' ? dispatch(toggleTimer()) : dispatch(reset());
  };

  return (
    <button id={id} onClick={handleBtn}>
      <>
        {name === 'Start' && <FaPlay className='fa fa-play' />}
        {name === 'Pause' && <FaPause className='fa fa-pause' />}
        {name === 'Reset' && <FaSyncAlt className='fa fa-sync-alt' />}
        {name}
      </>
    </button>
  );
});
