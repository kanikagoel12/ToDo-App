import { useState } from "react";
import { useTodos } from "@/hooks/useTodos";
import type { Todo, TodoStatus, TodoDifficulty, TodoPriority } from "@/types/todo";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
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
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleChange = (field: keyof typeof formData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateTodo(Number(editingId), formData); // Pass id and data separately
      setEditingId(null);
    } else {
      addTodo(formData);
    }
    setFormData({
      title: "",
      description: "",
      status: "todo",
      dueDate: new Date(),
      difficulty: "Easy",
      priority: "Low",
    });
  };

  const handleEdit = (todo: Todo) => {
    setEditingId(String(todo.id)); // Store as string
    setFormData({
      title: todo.title,
      description: todo.description,
      status: todo.status,
      dueDate: new Date(todo.dueDate),
      difficulty: todo.difficulty,
      priority: todo.priority,
    });
  };

  return (
    <div className="flex min-h-[80vh]">
      {/* Left: Form */}
      <form onSubmit={handleSubmit} className="w-1/2 p-8 flex flex-col gap-4 bg-white">
        <Label>Title:</Label>
        <Input
          placeholder="Title"
          value={formData.title}
          onChange={e => handleChange("title", e.target.value)}
          required
        />
        <Label>Description:</Label>
        <Textarea
          placeholder="Description"
          value={formData.description}
          onChange={e => handleChange("description", e.target.value)}
          required
        />
        {/* Status Dropdown */}
        <Label>Status:</Label>
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
        <Label>Difficulty:</Label>
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
        <Label>Priority:</Label>
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
        <Button type="submit">{editingId ? "Update Todo" : "Add Todo"}</Button>
      </form>
      {/* Right: Todo List */}
      <div className="w-1/2 p-8 bg-gray-50 flex flex-col gap-4 bg-gradient-to-br from-blue-200 to-purple-300">
        {todos.map(todo => (
          <Card key={todo.id} className="flex justify-between items-center p-4">
            <div>
              <CardTitle>{todo.title}</CardTitle>
              <CardDescription>
                <p>{todo.description}</p>
              </CardDescription>
            </div>
            <div className="flex gap-2 justify-between w-full mt-4">
              <div className="left gap-3 flex w-5 h-7" >
                <Badge className={
                  todo.status === "done" ? "bg-green-500 text-white" :
                    todo.status === "in-progress" ? "bg-yellow-500 text-white" :
                      "bg-gray-500 text-white"
                }>{todo.status}</Badge>
                <Badge className={
                  todo.difficulty === "Easy" ? "bg-green-400 text-white" :
                    todo.difficulty === "Medium" ? "bg-yellow-200 text-white" :
                      "bg-red-400 text-white"
                }>{todo.difficulty}</Badge>
                <Badge className={
                  todo.priority === "High" ? "bg-red-500 text-white" :
                    todo.priority === "Medium" ? "bg-yellow-500 text-white" :
                      "bg-blue-500 text-white"
                }>{todo.priority}</Badge>
                <Badge className="bg-purple-200 text-purple-800">{new Date(todo.dueDate).toLocaleDateString()}</Badge>
              </div>
              <div className="right gap-2 flex">
                <Button size="icon" variant="ghost" onClick={() => handleEdit(todo)}>
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="ghost" onClick={() => deleteTodo(todo.id)}>
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}