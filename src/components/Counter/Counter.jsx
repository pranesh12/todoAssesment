import { useContext, useState } from "react";
import { TodoContext } from "../../App";

const Counter = () => {
  const { todos, setTodos } = useContext(TodoContext);
  const completedCounter = todos.reduce((count, todo) => {
    return count + (todo.completed ? 1 : 0);
  }, 0);

  const unCompletedCounter = todos.length - completedCounter;

  console.log(completedCounter);
  return (
    <div className="d-flex mt-2 mb-2 p-2 justify-content-between">
      <button type="button" className="btn btn-outline-success">
        Completed task : {completedCounter}
      </button>
      <button type="button" className="btn btn-outline-success">
        Uncompleted task : {unCompletedCounter}
      </button>
    </div>
  );
};

export default Counter;
