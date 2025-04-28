export interface TodoResponse {
  limit: number;
  total: number;
  skip: number;
  todos: TodoItem[];
}

export interface TodoItem {
  id: number;
  todo?: string;
  completed?: boolean;
  userId?: string;
}

export interface AddTodoItem {
  todo: string;
  completed?: boolean;
  userId?: number;
}

export interface UpdateTodoItem {
  completed: boolean;
}
