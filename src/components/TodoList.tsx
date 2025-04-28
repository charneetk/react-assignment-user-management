import { Plus } from "lucide-react";
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { useTodoContext } from "../contexts/TodoProvider";
import { useAddTodo } from "../services/TodoService";
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
    <div className="bg-black bg-opacity-70 backdrop-blur-lg rounded-3xl p-8 shadow-2xl w-full max-w-lg space-y-6">
      <h1 className="text-4xl font-bold text-center text-white">Todo App</h1>
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
              className="flex-1 p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
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
              className="w-12 h-12 flex items-center justify-center bg-green-600 hover:bg-green-700 rounded-lg transition"
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
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="self-center">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );

  // return (
  //   <>
  //     <div className="flex flex-col md:flex-row gap-4 mb-6">
  //       <div className="flex-1">
  //         <InputText
  //           name="task"
  //           label=""
  //           type="text"
  //           placeholder="Add a new task..."
  //           onChange={(e: {
  //             target: { value: React.SetStateAction<string> };
  //           }) => setInput(e.target.value)}
  //         />
  //       </div>
  //       <Button
  //         onClick={() => addTodo({ todo: input, completed: false })}
  //         className="bg-purple-700 hover:bg-purple-800 text-white text-sm font-medium py-2 px-4 rounded-md"
  //       >
  //         Add Todo
  //       </Button>
  //     </div>
  //     <div className="space-y-4">
  //       {todoList?.length > 0 ? (
  //         todoList.map((todo: TodoItem) => (
  //           <SingleTodo
  //             key={todo.id}
  //             todo={todo}
  //             completeTodo={completeTodo}
  //             deleteTodo={deleteTodo}
  //           />
  //         ))
  //       ) : (
  //         <h2 className="text-center text-gray-600 text-lg mt-8">
  //           All todos completed!
  //         </h2>
  //       )}
  //     </div>
  //   </>
  // );
};

export default TodoList;
