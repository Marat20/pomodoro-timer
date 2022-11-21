export const displayTimeLeft = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedTime = formatTime(minutes, remainingSeconds);
  return formattedTime;
};

const formatTime = (minutes: number, remainingSeconds: number) => {
  return `${minutes < 10 ? 0 : ''}${minutes}:${
    remainingSeconds < 10 ? 0 : ''
  }${remainingSeconds}`;
};
