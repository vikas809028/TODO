"use client";
import React, { useEffect, useState } from "react";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { SlMagnifier } from "react-icons/sl";
import { RiStickyNoteAddLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import axios from "axios";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");
  const todosPerPage = 5;

  const getTodos = async () => {
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
    }
  };

  useEffect(() => {
    getTodos();
  }, [currentPage, search]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="bg-[#f4f4f4] w-full h-52 mx-auto min-h-screen mt-5 relative p-4">
      <header className="flex flex-col sm:flex-row items-center justify-between w-full mb-4">
        <button
          type="button"
          onClick={() => router.push("/Addtodo")}
          className="text-white flex p-2 rounded-lg bg-black mb-4 sm:mb-0 sm:mr-2 items-center space-x-1"
        >
          <RiStickyNoteAddLine className="me-2 text-xl" />
          <span className="text-sm sm:text-base">TODO</span>
        </button>
        <div className="flex items-center w-full sm:w-auto">
          <input
            type="text"
            placeholder="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="py-2 px-4 w-full sm:w-auto text-sm sm:text-base bg-white border rounded-lg"
          />
          <button className="ml-2 p-2 text-2xl rounded-lg bg-white flex items-center justify-center">
            <SlMagnifier />
          </button>
        </div>
      </header>

      {/* Todo List */}
      <div className="flex flex-col gap-2">
        {todos.map((todo) => (
          <div
            key={todo._id}
            className="bg-white p-4 rounded-lg shadow-md hover:cursor-pointer flex flex-col"
            onClick={() => router.push(`/edittodo/${todo._id}`)}
          >
            <h2 className="font-bold text-base sm:text-lg">{todo.title}</h2>
            <div className="flex flex-col mt-1">
              <p className="text-sm sm:text-base">{todo.description}</p>
              <span className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2">
                {todo.date}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="w-full flex justify-between items-center mt-6 absolute bottom-4 left-0 right-0 p-4">
        <button
          className="bg-white rounded-lg py-2 px-4 flex items-center"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          <GrLinkPrevious />
        </button>
        <span className="text-sm sm:text-base">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="bg-white rounded-lg py-2 px-4 flex items-center"
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
