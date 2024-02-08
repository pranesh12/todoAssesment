import { useContext } from "react";
import { TodoContext } from "../../App";

const Todo = () => {
  const { completedTodo } = useContext(TodoContext);
  console.log(completedTodo);
  return (
    <div>
      <h1>Todod</h1>
    </div>
  );
};

export default Todo;
