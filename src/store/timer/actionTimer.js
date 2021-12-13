export const INCREMENT = 'TIMER::INCREMENT';
export const DECREMENT = 'TIMER::DECREMENT';
export const RESET = 'TIMER::RESET';
export const TOGGLE_TIMER = 'TIMER::TOGGLE_TIMER';
export const SWITCH_MODE = 'TIMER::SWITCH_MODE';
export const SET_TIMER = 'TIMER::SET_TIMER';

export const increment = (mode) => ({
    type: INCREMENT,
    payload: mode
});

export const decrement = (mode) => ({
    type: DECREMENT,
    payload: mode
});

export const reset = () => ({
    type: RESET
});

export const toggleTimer = () => ({
    type: TOGGLE_TIMER
});


export const switchMode = () => ({
    type: SWITCH_MODE,
});

export const setTimer = () => ({
    type: SET_TIMER,
});