import { createContext, useState } from "react";
import "./App.css";
import Todo from "./components/Todo/Todo";

export const TodoContext = createContext(null);

function App() {
  const initialTodo = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
  const [todos, setTodos] = useState(initialTodo);

  return (
    <div className="container">
      <TodoContext.Provider
        value={{
          todos,
          setTodos,
        }}
      >
        <h1 className="text-center mt-5 mb-5">Todo App</h1>
        <Todo />
      </TodoContext.Provider>
    </div>
  );
}

export default App;
