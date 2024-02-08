import { useContext } from "react";
import { TodoContext } from "../../App";

const Sort = () => {
  const { todos, setTodos } = useContext(TodoContext);
  const sortByPriority = () => {
    const sortedTasks = [...todos].sort((a, b) => {
      const priorityOrder = { high: 1, medium: 2, low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

    setTodos(sortedTasks);
  };
  return (
    <div>
      <button onClick={sortByPriority} className="btn btn-secondary">
        Sort By priority
      </button>
    </div>
  );
};

export default Sort;
