import React, {useEffect, useState} from "react";
import {FaPlay, FaPause, FaSyncAlt} from "react-icons/fa";
import {Timer} from "./components/Timer";
import {Button} from "./components/Button";
import {Settings} from "./components/Settings";
import {useSound} from 'use-sound';
import boopSfx from './audio/bamboo.mp3';

export const App = () => {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [mode, setMode] = useState('Session');
  const [timer, setTimer] = useState(1500);
  const [timerRunning, setTimerRunning] = useState(false);
  const [color, setColor] = useState({backgroundColor: 'red'});
  const [play] = useSound(boopSfx);


  const increment = mode => {
    if (timerRunning) return;

    if (mode === "session" && sessionLength <= 59) {
      setSessionLength(prevState => prevState + 1)
      setTimer(prevState => prevState + 60)
    } else if (mode === "break" && breakLength <= 59) {
      setBreakLength(prevState => prevState + 1)
    }
  };

  const decrement = mode => {
    if (timerRunning) return;

    if (mode === "session" && sessionLength >= 2) {
      setSessionLength(prevState => prevState - 1)
      setTimer(prevState => prevState - 60)
    } else if (mode === "break" && breakLength >= 2) {
      setBreakLength(prevState => prevState - 1)
    }
  };

  const reset = () => {
    setBreakLength(5);
    setSessionLength(25);
    setMode('Session');
    setTimer(1500);
    setColor({backgroundColor: 'red'});
    setTimerRunning(false);
  };

  const toggleTimer = () => {
    setTimerRunning(!timerRunning);
  };

  const displayTimeLeft = seconds => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedTime = formatTime(minutes, remainingSeconds);
    return formattedTime;
  };

  const formatTime = (minutes, remainingSeconds) => {
    return `${minutes < 10 ? 0 : ""}${minutes}:${remainingSeconds < 10 ? 0 : ""}${remainingSeconds}`;
  };

  useEffect(() => {
      let timerId = setTimeout(() => {
        if (!timerRunning) return;
        if (timer === 0 && mode === 'Session') {
          play();
          setColor({backgroundColor: 'green'})
          setTimer(breakLength * 60 + 1);
          setMode('Break');
        }else if (timer === 0 && mode === 'Break') {
          play();
          setColor({backgroundColor: 'red'});
          setTimer(sessionLength * 60 + 1);
          setMode('Session');
        }
        setTimer(prevState => prevState - 1);
      }, 1000)
  return () => clearTimeout(timerId)
  // eslint-disable-next-line
  }, [timerRunning, timer])

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
              onClick={toggleTimer}
              icon={<FaPlay className="fa fa-play" />}
            >
              Start
            </Button>
          ) : (
            <Button
              id="start_stop"
              onClick={toggleTimer}
              icon={<FaPause className="fa fa-pause" />}
            >
              Pause
            </Button>
          )}

          <Button
            id="reset"
            onClick={reset}
            icon={<FaSyncAlt className="fa fa-sync-alt" />}
          >
            Reset
          </Button>
        </div>
      </header>
      <footer>
        <Settings
          label="Session"
          mode="session"
          length={sessionLength}
          increment={increment}
          decrement={decrement}
        />
        <Settings
          label="Break"
          mode="break"
          length={breakLength}
          increment={increment}
          decrement={decrement}
        />
      </footer>    
    </div>
  );
}