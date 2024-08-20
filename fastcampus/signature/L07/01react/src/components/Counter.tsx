import { type FC, useState } from "react";

const Counter: FC = () => {
  const [num, setNum] = useState<number>(0);
  const handleClick = () => {
    setNum((prev) => prev + 1);
  };

  return (
    <>
      <div>{num}</div>
      <button onClick={handleClick}>+</button>
    </>
  );
};

export default Counter;
