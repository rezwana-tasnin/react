import { useCounter } from "~/hooks/useCounter";
import { Button } from "./Button";

export const Counter = ({
  title = "Counter",
  min = 0,
  max = 5,
  delta = 1,
  initial = 0,
}) => {
  const { count, increment, decrement } = useCounter({
    min,
    max,
    delta,
    initial,
  });
  return (
    <div className="flex gap-4 items-center">
      <div className="text-lg font-bold">{title}</div>
      <Button onClick={decrement}>-</Button>
      <div className="text-2xl font-bold">{count}</div>
      <Button onClick={increment}>+</Button>
    </div>
  );
};
