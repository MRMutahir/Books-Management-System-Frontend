"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch Books API
  const fetchBooks = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/books/list?page=${page}&limit=5&search=${search}`
      );
      // console.log("response", response)
      const { books, totalPages } = response.data.data;
      setBooks(books);
      setTotalPages(totalPages);
    } catch (err) {
      setError("Failed to fetch books.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBooks();
  }, [page, search]);

  return (
    <div>
   
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold text-center mb-4">Books</h1>

        {/* Search Bar */}
        <div className="flex justify-between items-center mb-4">
          <Input
            type="text"
            placeholder="Search books..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-72"
          />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Genre</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan="3" className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan="3" className="text-center text-red-500">
                  {error}
                </TableCell>
              </TableRow>
            ) : (
              books?.map((book) => (
                <TableRow key={book._id}>
                  <TableCell className="font-medium">{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.genre}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>


        <div className="flex justify-between mt-4">
          <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
            Previous
          </Button>
          <span className="text-lg font-medium">
            Page {page} of {totalPages}
          </span>
          <Button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Books;
