import {
    INCREMENT,
    DECREMENT,
    RESET,
    TOGGLE_TIMER,
    SWITCH_MODE,
    SET_TIMER,
    START_TIMER,
} from "./actionTimer"

const initialState = {
    timerIsStarted: false,
    breakLength: 5,
    sessionLength: 25,
    mode: 'Session',
    rounds: 3,
    timer: 1500,
    timerRunning: false,
    color: {
        backgroundColor: 'red'
    },
}

export const timerReducer = (state = initialState, action) => {
    switch (action.type) {
        case INCREMENT:
            if (state.timerRunning) return state;
            if (!state.timerIsStarted) {
                if (action.payload === "Session" && state.sessionLength <= 59) {
                    return {
                        ...state,
                        sessionLength: state.sessionLength + 1,
                        timer: state.timer + 60
                    }
                } else if (action.payload === "Break" && state.breakLength <= 59) {
                    return {
                        ...state,
                        breakLength: state.breakLength + 1
                    }
                } else if (action.payload === "Rounds") {
                    return {
                        ...state,
                        rounds: state.rounds + 1
                    }
                }
            }
            return state;
        case DECREMENT:
            if (state.timerRunning) return state;
            if (!state.timerIsStarted) {
                if (action.payload === "Session" && state.sessionLength >= 2) {
                    return {
                        ...state,
                        sessionLength: state.sessionLength - 1,
                        timer: state.timer - 60
                    }
                } else if (action.payload === "Break" && state.breakLength >= 2) {
                    return {
                        ...state,
                        breakLength: state.breakLength - 1
                    }
                } else if (action.payload === "Rounds" && state.rounds >= 2) {
                    return {
                        ...state,
                        rounds: state.rounds - 1
                    }
                }
            }
            return state;
        case RESET:
            return {
                ...initialState
            }
        case TOGGLE_TIMER:
            return {
                ...state,
                timerRunning: !state.timerRunning,
            }
        case SWITCH_MODE:
            if (state.mode === 'Session') {
                if(state.rounds === 1) {return initialState}
                return {
                    ...state,
                    color: {
                        backgroundColor: 'green'
                    },
                    timer: state.breakLength * 60 + 1,
                    mode: 'Break'
                }
            } else if (state.mode === 'Break') {
                return {
                    ...state,
                    color: {
                        backgroundColor: 'red'
                    },
                    timer: state.sessionLength * 60 + 1,
                    mode: 'Session',
                    rounds: state.rounds - 1
                }
            }
            break;
            case SET_TIMER:
                return {
                    ...state,
                    timer: state.timer - 1
                }
            case START_TIMER:
            return {
                ...state,
                timerIsStarted: !state.timerIsStarted
            }
            default:
                return state
    }
}