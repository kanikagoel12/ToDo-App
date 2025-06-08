export type TodoStatus = "todo" | "in-progress" | "done";
export type TodoDifficulty = "Easy" | "Medium" | "Hard";
export type TodoPriority = "Low" | "Medium" | "High";

export interface Todo {
  id: number;
  title: string;
  description: string;
  status: TodoStatus;
  dueDate: Date;
  difficulty: TodoDifficulty;
  priority: TodoPriority;
}