import { Plus } from "lucide-react";
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { useTodoContext } from "../contexts/TodoProvider";
import { useAddTodo } from "../services/TodoService";
import { customClasses } from "../utils/constant";
import Button from "./formComponents/Button";
import InputText from "./formComponents/InputText";
import SingleTodo from "./SingleTodo";

const TodoList: React.FC = () => {
  const { currentUser } = useAuth();
  const { todos } = useTodoContext();
  const { mutate: addTodo } = useAddTodo();
  const [input, setInput] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);

  const todoList = todos ?? [];

  const todosPerPage = 5;

  const totalPages = Math.ceil(todoList.length / todosPerPage);
  const startIdx = (currentPage - 1) * todosPerPage;
  const currentTodos = todoList.slice(startIdx, startIdx + todosPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className={customClasses.todoList}>
      <h1 className={customClasses.listHeading}>ToDo List</h1>
      {currentUser?.id ? (
        <>
          <div className="flex items-center gap-2 w-full">
            <InputText
              name="task"
              placeholder="Add a todo"
              label="Add a todo"
              onChange={(e: {
                target: { value: React.SetStateAction<string> };
              }) => setInput(e.target.value)}
              value={input}
              className={customClasses.addToDo}
            />
            <Button
              onClick={() => {
                addTodo({
                  userId: currentUser?.id,
                  todo: input,
                  completed: false,
                });
                setInput("");
              }}
              className={customClasses.addButton}
            >
              <Plus size={20} />
            </Button>
          </div>
          <div className="space-y-2">
            {currentTodos?.length > 0 ? (
              currentTodos.map((todo) => (
                <SingleTodo key={todo.id} todo={todo} />
              ))
            ) : (
              <h2 className="text-center text-gray-400 text-lg mt-8">
                All todos completed!
              </h2>
            )}
            <div className="flex justify-between pt-4">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className={customClasses.pageButton}
              >
                Previous
              </button>
              <span className="self-center">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={customClasses.pageButton}
              >
                Next
              </button>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default TodoList;
