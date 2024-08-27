"use client";
import React, { useEffect, useState } from "react";
import { GrLinkNext } from "react-icons/gr";
import { GrLinkPrevious } from "react-icons/gr";
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
    <div className="bg-[#f4f4f4] w-full mx-auto h-[650px] mt-5 relative">
      <header>
        <div className="w-100 h-22 mx-auto flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              router.push("/Addtodo");
            }}
            className="text-white flex p-3 rounded-lg bg-black me-2 items-center space-x-1"
          >
            <RiStickyNoteAddLine className="me-2 text-xl" />
            TODO
          </button>
          <input
            type="text"
            placeholder="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="py-2 px-2 text-base bg-transparent me-1"
          />
          <span className="items-center p-4 text-2xl rounded-lg bg-white">
            <SlMagnifier />
          </span>
        </div>
      </header>
      {todos.map((todo) => (
        <div
          key={todo._id}
          className="bg-white py-1 px-2 mx-auto my-2 rounded-lg w-100 hover:cursor-pointer"
          onClick={() => {
            router.push(`/edittodo/${todo._id}`);
          }}
        >
          <h2 className="font-bold text-lg">{todo.title}</h2>
          <div className="flex py-1">
            <p className="w-64">{todo.description}</p>
            <div className="flex items-center text-sm">{todo.date}</div>
          </div>
        </div>
      ))}
      <div className="w-100 mx-auto flex justify-between items-center mt-4 absolute bottom-2 left-4">
        <button
          className="bg-white rounded-lg py-2 px-4"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          <GrLinkPrevious />
        </button>
        <span className="px-4">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="bg-white rounded-lg py-2 px-4"
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
