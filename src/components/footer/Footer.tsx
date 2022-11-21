import { memo } from 'react';
import { useAppSelector } from '../../redux/redux-hooks';
import { Settings } from '../Settings';

export const Footer = memo(() => {
  const { sessionLength, rounds, breakLength } = useAppSelector(
    (state) => state.persistedReducer
  );

  return (
    <footer>
      <Settings label='Session' mode='Session' length={sessionLength} />
      <Settings label='Rounds' mode='Rounds' length={rounds} />
      <Settings label='Break' mode='Break' length={breakLength} />
    </footer>
  );
});
