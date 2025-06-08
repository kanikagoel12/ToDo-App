import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white shadow">
      <div className="flex items-center gap-2">
        <img src="/logo.svg" alt="Logo" className="h-8" />
        <span className="font-bold text-xl">TodoApp</span>
      </div>
      <nav className="flex gap-4">
        <Link to="/"><Button variant="ghost">Home</Button></Link>
        <Link to="/manage"><Button variant="ghost">Manage ToDos</Button></Link>
      </nav>
    </header>
  );
}