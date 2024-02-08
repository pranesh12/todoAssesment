import { createContext, useState } from "react";
import "./App.css";
import Todo from "./components/Todo/Todo";

export const TodoContext = createContext(null);

function App() {
  const [todos, setTodos] = useState([
    { id: "1", taskName: "Eat rice", completed: false, priority: "low" },
    { id: "2", taskName: "Go to Gym", completed: true, priority: "medium" },
    { id: "3", taskName: "Read 1 book", completed: false, priority: "high" },
  ]);

  return (
    <div className="container">
      <TodoContext.Provider
        value={{
          todos,
          setTodos,
        }}
      >
        <h1>Hello</h1>
        <Todo />
      </TodoContext.Provider>
    </div>
  );
}

export default App;
