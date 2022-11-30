import React from "react";
import { Button, Stack } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { decreament, increament } from "../redux/counter/counterSlice";
import { RootState } from "../redux/store";

const Counter = () => {
  const dispatch = useDispatch();
  const count = useSelector<RootState, number>((state) => state.counter.value);
  return (
    <div>
      <div>
        Counter value is <span>{count}</span>
      </div>
      <Stack gap={3} direction="horizontal">
        <Button
          variant="outline-success"
          onClick={() => {
            dispatch(increament());
          }}
        >
          +
        </Button>
        <Button
          variant="outline-danger"
          onClick={() => {
            dispatch(decreament());
          }}
        >
          -
        </Button>
      </Stack>
    </div>
  );
};

export default Counter;
