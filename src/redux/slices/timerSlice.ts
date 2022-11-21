import { Data } from '../../models/models';
import { createSlice } from '@reduxjs/toolkit';

const initialState: Data = {
  timerIsStarted: false,
  breakLength: 5,
  sessionLength: 25,
  mode: 'Session',
  rounds: 3,
  timer: 1500,
  timerRunning: false,
  color: {
    backgroundColor: 'red',
  },
};

export const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    increment(state, action) {
      if (state.timerRunning) return;
      if (!state.timerIsStarted) {
        if (action.payload === 'Session' && state.sessionLength <= 59) {
          state.sessionLength += 1;
          state.timer += 60;
        } else if (action.payload === 'Break' && state.breakLength <= 59) {
          state.breakLength += 1;
        } else if (action.payload === 'Rounds') {
          state.rounds += 1;
        }
      }
    },
    decrement(state, action) {
      if (state.timerRunning) return;
      if (!state.timerIsStarted) {
        if (action.payload === 'Session' && state.sessionLength >= 2) {
          state.sessionLength -= 1;
          state.timer -= 60;
        } else if (action.payload === 'Break' && state.breakLength >= 2) {
          state.breakLength -= 1;
        } else if (action.payload === 'Rounds' && state.rounds >= 2) {
          state.rounds -= 1;
        }
      }
    },
    reset() {
      return { ...initialState };
    },
    toggleTimer(state) {
      state.timerRunning = !state.timerRunning;
    },
    switchMode(state) {
      if (state.mode === 'Session') {
        if (state.rounds === 1) {
          return;
        }
        state.color.backgroundColor = 'green';
        state.timer = state.breakLength * 60 + 1;
        state.mode = 'Break';
      } else if (state.mode === 'Break') {
        state.color.backgroundColor = 'red';
        state.timer = state.sessionLength * 60 + 1;
        state.mode = 'Session';
        state.rounds -= 1;
      }
    },
    setTimer(state) {
      state.timer -= 1;
    },
    startTimer(state) {
      state.timerIsStarted = !state.timerIsStarted;
    },
  },
});

export const {
  increment,
  decrement,
  reset,
  toggleTimer,
  switchMode,
  setTimer,
  startTimer,
} = timerSlice.actions;

export default timerSlice.reducer;
