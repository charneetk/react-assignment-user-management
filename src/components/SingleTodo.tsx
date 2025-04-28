import React from "react";
import { TodoItem } from "../interfaces/Todo";
import { TrashIcon, CheckIcon } from "@radix-ui/react-icons";
import { CheckSquare, Pencil, Square, Trash } from "lucide-react";
import { useDeleteTodo, useUpdateTodo } from "../services/TodoService";

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
    <div className="flex items-center justify-between px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl">
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
          className="w-10 h-10 flex items-center justify-center rounded-md bg-green-600 hover:bg-green-700 transitio"
        >
          {todo.completed ? (
            <CheckSquare className="w-5 h-5 text-white" />
          ) : (
            <Square className="w-5 h-5 text-white" />
          )}
        </button>
        <button
          onClick={handleDelete}
          className="w-10 h-10 flex items-center justify-center rounded-md bg-rose-600 hover:bg-rose-700 transition"
        >
          <Trash className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  );
};

export default SingleTodo;
