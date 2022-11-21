import { memo, useEffect } from 'react';
import { useSound } from 'use-sound';
import bamboo from './audio/bamboo.mp3';
import { Header } from './components/header/Header';
import { Footer } from './components/footer/Footer';
import { useAppDispatch, useAppSelector } from './redux/redux-hooks';
import { switchMode, setTimer } from './redux/slices/timerSlice';

export const App = memo(() => {
  const { timerRunning, timer, mode } = useAppSelector(
    (state) => state.persistedReducer
  );
  const dispatch = useAppDispatch();
  const [play] = useSound(bamboo);

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (!timerRunning) return;
      if (timer === 0 && mode === 'Session') {
        play();
        dispatch(switchMode());
      } else if (timer === 0 && mode === 'Break') {
        play();
        dispatch(switchMode());
      }
      dispatch(setTimer());
    }, 1000);
    return () => clearTimeout(timerId);
  });

  return (
    <div id='app-container'>
      <Header />
      <Footer />
    </div>
  );
});
