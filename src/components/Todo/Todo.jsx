import { useContext, useState } from "react";
import { TodoContext } from "../../App";
import { v4 as uuidv4 } from "uuid";
import deleteIcon from "../../assets/delete-1487-svgrepo-com.svg";
import editIcon from "../../assets/edit-2-svgrepo-com (1).svg";
import completedIcon from "../../assets/done-v-svgrepo-com.svg";
import Sort from "../Sort/Sort";
import Counter from "../Counter/Counter";

const Todo = () => {
  const { todos, setTodos } = useContext(TodoContext);
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [taskValues, setTaskValues] = useState({
    id: "",
    taskName: "",
    completed: false,
    priority: "low",
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
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
    } else {
      const newTodo = {
        id: uuidv4(),
        taskName: taskValues.taskName,
        completed: false,
        priority: taskValues.priority,
      };
      if (newTodo.taskName.trim() !== "") {
        setTodos([...todos, newTodo]);
      }
      localStorage.setItem("todos", JSON.stringify(todos));
      setTaskValues({
        id: "",
        taskName: "",
        completed: "",
        priority: "low",
      });
    }
  };
  const handleChange = (e) => {
    setTaskValues({ ...taskValues, [e.target.name]: e.target.value });
  };

  const handleDelete = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const hadleEdit = (id) => {
    const editTodo = todos.filter((todo) => todo.id == id);

    setTaskValues({
      taskName: editTodo[0].taskName,
      completed: editTodo[0].completed,
      priority: editTodo[0].priority,
    });
    setEdit(true);
    setEditId(id);
  };

  const handleCompleted = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: true } : todo
    );

    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control form-control-lg mt-3 mb-3"
          value={taskValues.taskName}
          onChange={handleChange}
          name="taskName"
          type="text"
          placeholder="Add Todo"
          required
        />

        <select
          className="form-select mb-3"
          onChange={handleChange}
          name="priority"
        >
          <option value="" disabled selected>
            Set Priority
          </option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <div className="d-grid mt-2 mb-2">
          <button className="btn btn-success mb-5" type="submit">
            {edit ? "Update" : "Add "}
          </button>
        </div>
      </form>

      {/* Adding counter componet */}
      <div>
        <Counter />
      </div>
      {/* Adding sorting component */}
      <div className="d-flex justify-content-center  mb-5">
        <Sort />
      </div>

      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Todo name</th>
              <th scope="col">Status</th>
              <th>Priority</th>
              <th scope="col">Mark</th>
              <th scope="col">Update</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {todos &&
              todos.map((todo) => {
                return (
                  <tr key={todo.id}>
                    <td className="text-capitalize">{todo.taskName}</td>
                    <td className=" rounded-pill text-capitalize">
                      {todo.completed ? "Completed" : "Not completed"}
                    </td>
                    <td className="text-capitalize">{todo.priority}</td>
                    <td>
                      <span onClick={() => handleCompleted(todo.id)}>
                        <img
                          style={{ cursor: "pointer", textColor: "green" }}
                          src={completedIcon}
                          width={15}
                          height={15}
                        />
                      </span>
                    </td>
                    <td>
                      <span
                        className="text-muted"
                        onClick={() => hadleEdit(todo.id)}
                      >
                        <img
                          style={{ cursor: "pointer", textColor: "green" }}
                          src={editIcon}
                          width={15}
                          height={15}
                        />
                      </span>
                    </td>
                    <td>
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDelete(todo.id)}
                      >
                        <img
                          src={deleteIcon}
                          width={15}
                          height={15}
                          alt="Delete recepie"
                        />
                      </span>
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
