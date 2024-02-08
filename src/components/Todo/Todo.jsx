import { useContext, useState } from "react";
import { TodoContext } from "../../App";
import { v4 as uuidv4 } from "uuid";
const Todo = () => {
  const { todos, setTodos } = useContext(TodoContext);
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [taskValues, setTaskValues] = useState({
    id: "",
    taskName: "",
    completed: false,
    priority: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (edit) {
      const updatedTodos = todos.map((todo) =>
        todo.id === editId
          ? {
              ...todo,
              taskName: taskValues.taskName,
              priority: taskValues.priority,
            }
          : todo
      );

      setTodos(updatedTodos);
      setEdit(false);
      setEditId(null);
    } else {
      const newTodo = {
        id: uuidv4(),
        taskName: taskValues.taskName,
        completed: taskValues.completed,
        priority: taskValues.priority,
      };
      if (newTodo.taskName.trim() !== "") {
        setTodos([...todos, newTodo]);
      }
      setTaskValues({
        id: "",
        taskName: "",
        completed: "",
        priority: "",
      });
    }
  };
  const handleChange = (e) => {
    setTaskValues({ ...taskValues, [e.target.name]: e.target.value });
  };

  const handleDelete = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const hadleEdit = (id) => {
    console.log(id);
    const editTodo = todos.filter((todo) => todo.id == id);
    console.log(editTodo);
    setTaskValues({
      taskName: editTodo[0].taskName,
      completed: editTodo[0].completed,
      priority: editTodo[0].priority,
    });
    setEdit(true);
    setEditId(id);
  };
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
                    <td>
                      <button onClick={() => hadleEdit(todo.id)}>Edit</button>
                    </td>
                    <td>
                      <button onClick={() => handleDelete(todo.id)}>
                        delete
                      </button>
                    </td>
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
