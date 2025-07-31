import { useState } from "react";

export const useCounter = (props = {}) => {
  const { min = 0, max = 5, delta = 1, initial = 0 } = props;
  const [count, setCount] = useState(initial);

  const increment = () => {
    setCount((count) => {
      const newCount = count + delta;
      if (newCount <= max) {
        return newCount;
      } else return count;
    });
  };

  const decrement = () => {
    setCount((count) => {
      const newCount = count - delta;
      if (newCount >= min) {
        return newCount;
      } else return min;
    });
  };

  return {
    count,
    increment,
    decrement,
  };
};
