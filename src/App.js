import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import {FaPlay, FaPause, FaSyncAlt} from "react-icons/fa";
import {Timer} from "./components/Timer";
import {Button} from "./components/Button";
import {Settings} from "./components/Settings";
import { getBreakLength, getColor, getMode, getRounds, getSessionLength, getTimer, getTimerRunning } from "./store/timer/selectorTimer";
import {displayTimeLeft} from './helper/getTime'
import { switchMode, setTimer } from "./store/timer/actionTimer";
import {useSound} from 'use-sound';
import boopSfx from './audio/bamboo.mp3';

export const App = () => {
  const breakLength = useSelector(getBreakLength);
  const sessionLength = useSelector(getSessionLength);
  const mode = useSelector(getMode);
  const rounds = useSelector(getRounds);
  const timer = useSelector(getTimer);
  const timerRunning = useSelector(getTimerRunning);
  const color = useSelector(getColor);
  const dispatch = useDispatch();
  const [play] = useSound(boopSfx);

  useEffect(() => {
    let timerId = setTimeout(() => {
      if (!timerRunning) return;
      if (timer === 0 && mode === 'Session') {
        play();
        dispatch(switchMode())
      } else if (timer === 0 && mode === 'Break') {
        play();
        dispatch(switchMode())
      }
      dispatch(setTimer());
    }, 500);
    return () => clearTimeout(timerId)
  })

  return (
        <div id="app-container">
          <header 
          className='flex-center'
          style={color}
          >
            <Timer
              mode={mode}
              timeLeft={displayTimeLeft(timer)}
            />
            <div className="wrapper">
              {timerRunning === false ? (
                <Button
                  id="start_stop"
                  icon={<FaPlay className="fa fa-play" />}
                >
                  Start
                </Button>
              ) : (
                <Button
                  id="start_stop"
                  icon={<FaPause className="fa fa-pause" />}
                >
                  Pause
                </Button>
              )}

              <Button
                id="reset"
                icon={<FaSyncAlt className="fa fa-sync-alt" />}
              >
                Reset
              </Button>
            </div>
          </header>
          <footer>
            <Settings
              label="Session"
              mode="Session"
              length={sessionLength}
            />
              <Settings
                label="Rounds"
                mode="Rounds"
                length={rounds}
              />
            <Settings
              label="Break"
              mode="Break"
              length={breakLength}
            />
          </footer>    
        </div>
  );
}