"use client";
import React, { useEffect, useState } from "react";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { SlMagnifier } from "react-icons/sl";
import { RiStickyNoteAddLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import axios from "axios";
import Header from "./components/Header";

// Define the Todo interface
interface Todo {
  _id: string;
  title: string;
  description: string;
  date: string;
}

const Todo = () => {
  const router = useRouter();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");
  const todosPerPage = 5;

  const getTodos = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/todos/search", {
        page: currentPage,
        limit: todosPerPage,
        search: search,
      });
      setTodos(response.data.todos);
      setTotalPages(Math.ceil(response.data.totalTodos / todosPerPage));
    } catch (error) {
      console.error("Error fetching todos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTodos();
  }, [currentPage, search]);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-gray-100">
      {/* Fixed Header */}
      <Header />
      
      {/* Search and Add Todo Bar */}
      <div className="w-full max-w-4xl px-4 bg-gray-100 h-[10vh] flex items-center justify-between py-3 sticky top-0">
        <button
          type="button"
          onClick={() => router.push("/Addtodo")}
          className="flex items-center space-x-2 px-3 py-2 bg-blue-500 text-white rounded-lg"
        >
          <RiStickyNoteAddLine className="text-xl bg-blue-500" />
          <span className="text-sm sm:text-base bg-blue-500">Add</span>
        </button>
        <div className="flex items-center bg-gray-200 rounded-lg overflow-hidden">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-2 text-sm outline-none bg-transparent"
          />
          <button className="p-2 bg-blue-600 text-white">
            <SlMagnifier className="bg-blue-600 " />
          </button>
        </div>
      </div>

      {/* Todo List Container - Scrollable */}
      <div className="flex-grow bg-white w-full max-w-4xl px-4 py-4 overflow-y-auto scrollbar-none">
        {loading ? (
          <div className="flex justify-center items-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
          </div>
        ) : (
          <div className="space-y-4 bg-white">
            {todos.map((todo) => (
              <div
                key={todo._id}
                className="p-4 bg-white rounded-lg shadow-md cursor-pointer"
                onClick={() => router.push(`/edittodo/${todo._id}`)}
              >
                <h2 className="font-bold bg-white text-lg">{todo.title}</h2>
                <p className="text-sm text-gray-600 bg-white">{todo.description}</p>
                <span className="text-xs text-gray-500 bg-white">{todo.date}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Fixed Pagination */}
      <div className="w-full max-w-4xl bg-blue-500 text-white flex justify-between items-center p-3 sticky bottom-0">
        <button
          className="bg-gray-100 text-gray-700 rounded-full p-2 flex items-center disabled:opacity-50"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          <GrLinkPrevious />
        </button>
        <span className="text-sm bg-blue-500 sm:text-base">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="bg-gray-100 text-gray-700 rounded-full p-2 flex items-center disabled:opacity-50"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          <GrLinkNext />
        </button>
      </div>
    </div>
  );
};

export default Todo;
