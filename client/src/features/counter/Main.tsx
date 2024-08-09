"use client";

import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React from "react";
import { CounterState, increment } from "./service/counterSlice";
import { RootState } from "@/lib/store";

const Counter = () => {
  const count = useAppSelector((state: RootState) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <>
      <div className="ml-96">
        {count}
        <Button onClick={() => dispatch(increment())}>Increment</Button>
        <Button>decrement</Button>
      </div>
    </>
  );
};

export default Counter;
