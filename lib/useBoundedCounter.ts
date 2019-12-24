import { useState } from "react";
import compose from "./compose";

type Counter = [number, () => void, () => void];

type Bounds = [number, number];

type Operation = (x: number, y: number) => number;

const boundedOperation = (op: Operation) => (y: number) => ([
  min,
  max,
]: Bounds) => (x: number): number => {
  const n = op(x, y);
  if (n > max) return min;
  if (n < min) return max;
  return n;
};

const add: Operation = (x, y) => x + y;
const subtract: Operation = (x, y) => x - y;

const boundedAdd = boundedOperation(add);
const boundedSubtract = boundedOperation(subtract);

const boundedIncrement = boundedAdd(1);
const boundedDecrement = boundedSubtract(1);

const useBoundedCounter = (bounds: Bounds, initial: number): Counter => {
  const [value, setValue] = useState(initial);

  const increment = () => compose(setValue)(boundedIncrement)(bounds);
  const decrement = () => compose(setValue)(boundedDecrement)(bounds);

  return [value, increment, decrement];
};

export default useBoundedCounter;
