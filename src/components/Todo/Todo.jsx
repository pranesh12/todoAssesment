import { useContext, useState } from "react";
import { TodoContext } from "../../App";
import { v4 as uuidv4 } from "uuid";
const Todo = () => {
  const { todos, setTodos } = useContext(TodoContext);
  const [taskValues, setTaskValues] = useState({
    id: uuidv4(),
    taskName: "",
    completed: false,
    priority: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = {
      id: taskValues.id,
      taskName: taskValues.taskName,
      completed: taskValues.completed,
      priority: taskValues.priority,
    };
    if (newTodo.taskName.trim() !== "") {
      setTodos([...todos, newTodo]);
    }
  };
  const handleChange = (e) => {
    setTaskValues({ ...taskValues, [e.target.name]: e.target.value });
  };

  console.log(taskValues);
  return (
    <div>
      <h1>Todod</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={taskValues.taskName}
          onChange={handleChange}
          name="taskName"
          type="text"
          placeholder="Add Todo"
        />
        <select
          onChange={handleChange}
          name="priority"
          value={taskValues.priority}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button type="submit">Add Todo</button>
      </form>

      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Todo name</th>
              <th scope="col">Status</th>
              <th scope="col">Switch</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {todos &&
              todos.map((todo) => {
                return (
                  <tr key={todo.id}>
                    <th scope="row">1</th>
                    <td>{todo.taskName}</td>
                    <td>{todo.priority}</td>
                    <td>switbutton</td>
                    <td>editbutton</td>
                    <td>deleteButton</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Todo;
