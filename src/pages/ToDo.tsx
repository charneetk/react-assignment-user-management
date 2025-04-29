import TodoList from "../components/TodoList";
import { customClasses } from "../utils/constant";

const Todo = () => {
  return (
    <div className={customClasses.todoContainer}>
      <TodoList />
    </div>
  );
};
export default Todo;
