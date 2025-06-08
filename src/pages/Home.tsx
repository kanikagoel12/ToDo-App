import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-blue-200 to-purple-300">
      <h1 className="text-4xl font-bold mb-4 text-center">
        Everything you need to manage your daily tasks in one place
      </h1>
      <Link to="/manage">
        <Button className="mb-8">Get Started</Button>
      </Link>
      <div className="flex gap-6">
        <Card>
          <CardContent>
            <CardTitle>Organize Tasks</CardTitle>
            <p>Easily add, edit, and delete your todos.</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <CardTitle>Prioritize</CardTitle>
            <p>Set priority and difficulty for each task.</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <CardTitle>Track Progress</CardTitle>
            <p>Update status and due dates to stay on track.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}