import { createContext, useState } from "react";
import "./App.css";
import Todo from "./components/Todo/Todo";

export const TodoContext = createContext(null);

function App() {
  const [completedTodo, setCompletedTodo] = useState("hello");
  const [unCompletedTodo, setUnCompletedTodo] = useState([]);

  return (
    <div className="container">
      <TodoContext.Provider
        value={{
          completedTodo,
          setCompletedTodo,
          unCompletedTodo,
          setUnCompletedTodo,
        }}
      >
        <h1>Hello</h1>
        <Todo />
      </TodoContext.Provider>
    </div>
  );
}

export default App;
