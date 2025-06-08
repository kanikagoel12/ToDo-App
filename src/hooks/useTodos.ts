import { useState } from "react";
import type {Todo} from "../types/todo";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (todo: Omit<Todo, "id">) => {
    setTodos((prev) => [
      ...prev,
      { ...todo, id: Date.now() }
    ]);
  };

  const updateTodo = (id: number, updated: Partial<Todo>) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updated } : t))
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  return { todos, addTodo, updateTodo, deleteTodo };
}