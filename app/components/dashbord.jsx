
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const BookForm = ({ fetchMyBooks }) => {
    const [bookData, setBookData] = useState({
      title: "",
      author: "",
      description: "",
      genre: "",
      publishedYear: "",
      user: "123", 
    });
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await axios.post("http://localhost:5000/api/v1/books/add", bookData);
        fetchMyBooks();
        setBookData({ title: "", author: "", description: "", genre: "", publishedYear: "", user: "123" });
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
          <Input placeholder="Published Year" type="number" value={bookData.publishedYear} onChange={(e) => setBookData({ ...bookData, publishedYear: e.target.value })} required />
          <Button type="submit" className="w-full bg-blue-600 text-white">Add Book</Button>
        </form>
      </div>
    );
  };
  
  const MyBooks = () => {
    const [myBooks, setMyBooks] = useState([]);
  
    const fetchMyBooks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/books/list?user=123");
        setMyBooks(response.data.data.books);
      } catch (error) {
        console.error("Error fetching books", error);
      }
    };
  
    useEffect(() => {
      fetchMyBooks();
    }, []);
  
    return (
      <div className="p-6 border rounded-md shadow-md">
        <h2 className="text-xl font-bold mb-3">My Books</h2>
        <ul>
          {myBooks.map((book) => (
            <li key={book._id} className="border-b py-2">{book.title} by {book.author}</li>
          ))}
        </ul>
      </div>
    );
  };
  
  export const Dashbord = () => {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto p-6">
          <BookForm fetchMyBooks={() => {}} />
          <MyBooks />
        </div>
      </div>
    );
  };