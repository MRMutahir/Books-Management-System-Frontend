import Link from "next/link";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 flex justify-between items-center">
      <h1 className="text-white text-2xl font-bold">📚 BookStore</h1>
      <div>
        <Link href="/login">
          <Button variant="outline" className="mr-3 text-blue-600 border-white">
            Login
          </Button>
        </Link>
        <Link href="/signup">
          <Button className="bg-white text-blue-600">Sign Up</Button>
        </Link>
      </div>
    </nav>
  );
};
