import { useEffect, useState } from "react";

export default function ProgressBar({ timer }) {
  const [remainTime, setRemainTime] = useState(TIMER);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainTime((prevTime) => prevTime - 10);
    }, 10);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return <progress value={remainTime} max={timer} />;
}
