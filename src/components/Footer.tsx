export function Footer() {
  return (
    <footer className="w-full py-4 text-center text-gray-500 bg-white border-t">
      &copy; {new Date().getFullYear()} TodoApp. All rights reserved.
    </footer>
  );
}