import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { TodoItem } from "../interfaces/Todo";
import { useFetchTodos } from "../services/TodoService";
import { useAuth } from "./AuthProvider";

interface TodoProviderProps {
  children: ReactNode;
  userId?: number;
}
interface TodoContextType {
  todos: TodoItem[];
  setTodos: React.Dispatch<React.SetStateAction<TodoItem[]>>;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider = ({ children, userId }: TodoProviderProps) => {
  const [todos, setTodos] = useState<TodoItem[]>([]);

  // Fetch todos using useFetchTodos from the TodoService
  const { data, isLoading, isError } = useFetchTodos(userId);

  // When data is fetched successfully, update the context state with fetched todos
  useEffect(() => {
    if (data) {
      setTodos(data); // Update context with fetched todos
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching todos</div>;
  }

  return (
    <TodoContext.Provider value={{ todos, setTodos }}>
      {children}
    </TodoContext.Provider>
  );
};

// Custom hook to use TodoContext
export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodoContext must be used within a TodoProvider");
  }
  return context;
};

export default TodoContext;
