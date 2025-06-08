import { useState } from "react";
import { useTodos } from "@/hooks/useTodos";
import type {Todo, TodoStatus, TodoDifficulty, TodoPriority} from "@/types/todo";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Pencil, Trash2 } from "lucide-react";

const statusOptions: TodoStatus[] = ["todo", "in-progress", "done"];
const difficultyOptions: TodoDifficulty[] = ["Easy", "Medium", "Hard"];
const priorityOptions: TodoPriority[] = ["Low", "Medium", "High"];

export default function Manage() {
  const { todos, addTodo, updateTodo, deleteTodo } = useTodos();
  const [formData, setFormData] = useState<Omit<Todo, "id">>({
    title: "",
    description: "",
    status: "todo",
    dueDate: new Date(),
    difficulty: "Easy",
    priority: "Low",
  });

  const handleChange = (field: keyof typeof formData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTodo(formData);
    setFormData({
      title: "",
      description: "",
      status: "todo",
      dueDate: new Date(),
      difficulty: "Easy",
      priority: "Low",
    });
  };

  return (
    <div className="flex min-h-[80vh]">
      {/* Left: Form */}
      <form onSubmit={handleSubmit} className="w-1/2 p-8 flex flex-col gap-4 bg-white">
        <Input
          placeholder="Title"
          value={formData.title}
          onChange={e => handleChange("title", e.target.value)}
          required
        />
        <Textarea
          placeholder="Description"
          value={formData.description}
          onChange={e => handleChange("description", e.target.value)}
          required
        />
        {/* Status Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">{formData.status}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {statusOptions.map(opt => (
              <DropdownMenuItem key={opt} onClick={() => handleChange("status", opt)}>
                {opt}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        {/* Difficulty Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">{formData.difficulty}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {difficultyOptions.map(opt => (
              <DropdownMenuItem key={opt} onClick={() => handleChange("difficulty", opt)}>
                {opt}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        {/* Priority Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">{formData.priority}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {priorityOptions.map(opt => (
              <DropdownMenuItem key={opt} onClick={() => handleChange("priority", opt)}>
                {opt}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Input
          type="date"
          value={formData.dueDate.toISOString().split("T")[0]}
          onChange={e => handleChange("dueDate", new Date(e.target.value))}
          required
        />
        <Button type="submit">Add Todo</Button>
      </form>
      {/* Right: Todo List */}
      <div className="w-1/2 p-8 bg-gray-50 flex flex-col gap-4">
        {todos.map(todo => (
          <Card key={todo.id} className="flex justify-between items-center p-4">
            <div>
              <CardTitle>{todo.title}</CardTitle>
              <CardContent>
                <p>{todo.description}</p>
                <div className="flex gap-2 text-sm mt-2">
                  <span>Status: {todo.status}</span>
                  <span>Difficulty: {todo.difficulty}</span>
                  <span>Priority: {todo.priority}</span>
                  <span>Due: {todo.dueDate.toLocaleDateString()}</span>
                </div>
              </CardContent>
            </div>
            <div className="flex gap-2">
              <Button size="icon" variant="ghost">
                <Pencil className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="ghost" onClick={() => deleteTodo(todo.id)}>
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}