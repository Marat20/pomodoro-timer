export interface Data {
  timerIsStarted: boolean;
  breakLength: number;
  sessionLength: number;
  mode: string;
  rounds: number;
  timer: number;
  timerRunning: boolean;
  color: {
    backgroundColor: string;
  };
}
