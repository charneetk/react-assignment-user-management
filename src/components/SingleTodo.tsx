import React from "react";
import { TodoItem } from "../interfaces/Todo";
import { CheckSquare, Pencil, Square, Trash } from "lucide-react";
import { useDeleteTodo, useUpdateTodo } from "../services/TodoService";
import { customClasses } from "../utils/constant";

type TodoProp = {
  todo: TodoItem;
};

const SingleTodo = ({ todo }: TodoProp) => {
  const { mutate: updateTodo } = useUpdateTodo();
  const { mutate: deleteTodo } = useDeleteTodo();

  const handleToggleComplete = () => {
    updateTodo({
      id: todo.id,
      completed: !todo.completed,
    });
  };

  const handleDelete = () => {
    deleteTodo(todo.id);
  };
  return (
    <div className={customClasses.todoItem}>
      <span
        className={`text-base font-semibold ${
          todo.completed ? "line-through text-gray-400" : "text-white"
        }`}
      >
        {todo.todo}
      </span>
      <div className="flex gap-2">
        <button
          onClick={handleToggleComplete}
          className={customClasses.todoActionComplete}
        >
          {todo.completed ? (
            <CheckSquare className="w-5 h-5 text-white" />
          ) : (
            <Square className="w-5 h-5 text-white" />
          )}
        </button>
        <button
          onClick={handleDelete}
          className={customClasses.todoActionDelete}
        >
          <Trash className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  );
};

export default SingleTodo;
