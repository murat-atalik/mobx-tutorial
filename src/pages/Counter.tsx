import { observer } from "mobx-react";
import React from "react";
import { counterStore } from "../mobx/counterStore";
import { Link } from "react-router";

export const Counter = observer(() => {
  return (
    <div>
      <h1>Count: {counterStore.count}</h1>
      <button onClick={() => counterStore.increment()}>+</button>
      <button onClick={() => counterStore.decrement()}>-</button>
      <Link to={`/`}>Home</Link>
    </div>
  );
});
