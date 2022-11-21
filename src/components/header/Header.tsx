import { Timer } from '../Timer';
import { Button } from '../Button';
import { useAppSelector } from '../../redux/redux-hooks';
import { displayTimeLeft } from '../../utils/getTime';
import { memo } from 'react';

export const Header = memo(() => {
  const { mode, timerRunning, color, timer } = useAppSelector(
    (state) => state.persistedReducer
  );

  return (
    <header className='flex-center' style={color}>
      <Timer mode={mode} timeLeft={displayTimeLeft(timer)} />
      <div className='wrapper'>
        {!timerRunning ? (
          <Button id='start_stop' name='Start' />
        ) : (
          <Button id='start_stop' name='Pause' />
        )}

        <Button id='reset' name='Reset' />
      </div>
    </header>
  );
});
