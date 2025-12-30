import { useState } from "react";

export const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const incrementTwice = () => {
    // setCount((count) => count + 1);
    // setCount((count) => count + 1);
    setCount(count + 2);
  };

  return (
    <div>
      <span>{count}</span>

      <button onClick={increment}>Увеличить на 1</button>
      <button onClick={incrementTwice}>Увеличить на 2</button>
    </div>
  );
};
