"use client";

import { useSelector, useDispatch } from "react-redux";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { decrement, increment, incrementByAmount } from "../redux/features/counterSlice";

export function Counter() {
  // const count = useSelector((state: any) => state.counter.value);
  // const dispatch = useDispatch();
  const dispatch = useAppDispatch();
  const count = useAppSelector((state) => state.counter.value);

  return (
    <div>
      <button
        aria-label="Increment value"
        onClick={() => dispatch(increment())}
      >
        Increment
      </button>
      <span>{count}</span>
      <button
        aria-label="Decrement value"
        onClick={() => dispatch(decrement())}
      >
        Decrement
      </button>
      <button
        onClick={() => dispatch(incrementByAmount(5))}
        aria-label="Increment value by 5"
      >
        Increase by amount
      </button>
    </div>
  );
}
