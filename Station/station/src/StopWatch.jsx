import { useState, useEffect } from "react";

export const StopWatch = () => {
  const seconds = useStopWatch();

  return <div>Прошло {seconds} секунд</div>;
};

function useStopWatch() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timerId = setInterval(() => {
      // console.count("StopWatch");

      setSeconds((seconds) => seconds + 1);
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  return seconds;
}
