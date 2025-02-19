"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  const [token, setToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    setToken(localStorage.getItem("authToken"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setToken(null);
    router.push("/login");
  };

  return (
    <nav className="bg-blue-600 p-4 flex justify-between items-center">
      <Link href={"/"}><h1 className="text-white text-2xl font-bold">📚 BookStore</h1></Link>
      <div>
        {token ? (
          <Button onClick={handleLogout} className="bg-white text-blue-600">
            Logout
          </Button>
        ) : (
          <>
            <Link href="/login">
              <Button variant="outline" className="mr-3 text-blue-600 border-white">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-white text-blue-600">Sign Up</Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};
