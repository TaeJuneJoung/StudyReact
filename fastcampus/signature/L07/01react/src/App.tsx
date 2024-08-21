import { useState, useRef } from "react";

function FoucusInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div>
      <input type="text" ref={inputRef} />
      <button onClick={handleClick}>Focus</button>
    </div>
  );
}

function App() {
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef<number | undefined>(undefined);

  const handleStart = () => {
    if (timerRef.current) return;
    timerRef.current = setInterval(() => {
      setSeconds((prev: number) => prev + 1);
    }, 1000);
  };

  const handleEnd = () => {
    clearInterval(timerRef.current);
    timerRef.current = undefined;
  };
  return (
    <>
      <h1>Timer: {seconds}</h1>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleEnd}>End</button>

      <FoucusInput />
    </>
  );
}

export default App;
