import {
  QueryObserverResult,
  useQuery,
  UseBaseMutationResult,
  useQueryClient,
  useMutation,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useTodoContext } from "../contexts/TodoProvider";
import {
  AddTodoItem,
  TodoItem,
  TodoResponse,
  UpdateTodoItem,
} from "../interfaces/Todo";
import { client } from "./client";
import { useId } from "react";
import { generateUniqueRandom } from "../utils/generateUniqueId";

const fetchTodos = async (
  userId: number | undefined
): Promise<AxiosResponse<TodoResponse, any>> => {
  return await client.get<TodoResponse>(
    userId ? `/todos/user/${userId}` : `/todos`
  );
};

export const useFetchTodos = (
  userId: number | undefined
): QueryObserverResult<TodoItem[], any> => {
  console.log("userId in Query ", userId);
  return useQuery<TodoItem[], any>({
    queryFn: async () => {
      const { data } = await fetchTodos(userId);
      return data?.todos ?? [];
    },
    queryKey: ["getTodos", userId],
  });
};

const addTodo = async (
  todo: AddTodoItem
): Promise<AxiosResponse<TodoItem, any>> => {
  return await client.post<TodoItem>("/todos/add", todo);
};

export const useAddTodo = (): UseBaseMutationResult<
  AxiosResponse<TodoItem, any>,
  unknown,
  AddTodoItem,
  unknown
> => {
  const { setTodos } = useTodoContext();

  //const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (todo: AddTodoItem) => addTodo(todo),
    onSuccess: (response) => {
      const newTodo = response.data;

      // queryClient.setQueryData(
      //   ["getTodos"],
      //   (oldData: TodoItem[] | undefined) => {
      //     if (!oldData) return [newTodo];

      //     return [newTodo, ...oldData];
      //   }
      // );
      setTodos((prevTodos) => {
        const existingIds = prevTodos?.map((todo) => todo.id);
        if (existingIds.includes(newTodo.id)) {
          const excludeSet = new Set(existingIds);
          newTodo.id = generateUniqueRandom(1000, 2000, excludeSet);
        }
        return [newTodo, ...prevTodos];
      }); // Using Context instead of Query Client to make newly added todos interative and avoid server error
    },
  });
};

const updateTodo = async (
  id: number,
  todo: UpdateTodoItem
): Promise<AxiosResponse<TodoItem, any>> => {
  return await client.put<TodoItem>(`/todos/${id}`, todo);
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  const { setTodos } = useTodoContext();

  return useMutation({
    mutationFn: ({ id, ...todo }: { id: number } & UpdateTodoItem) =>
      updateTodo(id, todo),
    onSuccess: (response) => {
      console.log("update resopnse", response);
      const updatedTodo = response.data;

      // queryClient.setQueryData(
      //   ["getTodos"],
      //   (oldData: TodoItem[] | undefined) => {
      //     if (!oldData) return [];

      //     return oldData.map((todo) =>
      //       todo.id === updatedTodo.id ? updatedTodo : todo
      //     );
      //   }
      // );
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === updatedTodo.id ? updatedTodo : todo
        )
      );
    },
    onError: (error: any, variables: { id: number } & UpdateTodoItem) => {
      // If server returns 404, we still update local state using the update payload
      if (error?.response?.status === 404) {
        const { id, ...rest } = variables;
        console.log("Id to Update ", id, rest);
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === id ? { ...todo, ...rest } : todo
          )
        );
      }
    },
  });
};

const deleteTodo = async (
  id: number
): Promise<AxiosResponse<TodoItem, any>> => {
  console.log("delete todo ", id);
  return await client.delete<TodoItem>(`/todos/${id}`);
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  const { setTodos } = useTodoContext();

  return useMutation({
    mutationFn: (id: number) => deleteTodo(id),
    onSuccess: (response) => {
      const newTodo = response.data;

      // queryClient.setQueryData(
      //   ["getTodos"],
      //   (oldData: TodoItem[] | undefined) => {
      //     if (!oldData) return [];

      //     return oldData?.filter((data) => data.id !== newTodo.id);
      //   }
      // );
      setTodos((prevTodos) =>
        prevTodos.filter((todo) => todo.id !== newTodo.id)
      );
    },
    onError: (error: any, id: number) => {
      // If server retuens the item doesn't exist error for todos added via Dummy API, remove it from state anyway
      if (error?.response?.status === 404) {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      }
    },
  });
};
