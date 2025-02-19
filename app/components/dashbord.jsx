
"use client";
import withAuth from "../withAuth";
import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AuthBooks from "./ListAuthBooks";
import { Navbar } from "./Navbar";

const BookForm = ({ fetchMyBooks }) => {
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    description: "",
    genre: "",
    publishedYear: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken")

      await axios.post("http://localhost:5000/api/v1/books/add", bookData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchMyBooks();
      setBookData({ title: "", author: "", description: "", genre: "", publishedYear: "" });
    } catch (error) {
      console.error("Error adding book", error);
    }
  };

  return (
    <div className="p-6 border rounded-md shadow-md mb-6">
      <h2 className="text-xl font-bold mb-3">Add New Book</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <Input placeholder="Title" value={bookData.title} onChange={(e) => setBookData({ ...bookData, title: e.target.value })} required />
        <Input placeholder="Author" value={bookData.author} onChange={(e) => setBookData({ ...bookData, author: e.target.value })} required />
        <Input placeholder="Description" value={bookData.description} onChange={(e) => setBookData({ ...bookData, description: e.target.value })} required />
        <Input placeholder="Genre" value={bookData.genre} onChange={(e) => setBookData({ ...bookData, genre: e.target.value })} required />
        <Input placeholder="Published Year" type="text" value={bookData.publishedYear} onChange={(e) => setBookData({ ...bookData, publishedYear: e.target.value })} required />
        <Button type="submit" className="w-full bg-blue-600 text-white">Add Book</Button>
      </form>
    </div>
  );
};

export const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-6">
        <BookForm fetchMyBooks={() => { }} />
      </div>
      <AuthBooks />
    </div>
  );
};


export default withAuth(Dashboard);


