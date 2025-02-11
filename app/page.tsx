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
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");
  const todosPerPage = 5;

  const getTodos = async () => {
    setLoading(true); // Start loading
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
      setLoading(false); // Stop loading after data is fetched
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
    <div className="w-full  lg:my-0 border-[1px] border-gray-100 md:w-8/12 lg:w-6/12 mx-auto">
      <Header />

      <div className="relative min-h-[89.5vh] lg:min-h-[89.5vh]">
        <header className="flex  py-4 w-full bg-gray-200 items-center justify-between">
          <button
            type="button"
            onClick={() => router.push("/Addtodo")}
            className="text-black flex p-2 rounded-lg sm:mb-0 sm:mr-2 items-center space-x-1"
          >
            <RiStickyNoteAddLine className="me-2 text-xl" />
            <span className="text-sm sm:text-base">TODO</span>
          </button>
          <div className="flex   items-center justify-end px-2 w-full">
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="py-2 px-4 rounded-l-lg text-sm"
            />
            <button className="p-2 bg-blue-600 text-xl rounded-r-lg text-white flex items-center justify-center">
              <SlMagnifier />
            </button>
          </div>
        </header>

        {/* Loading Indicator */}
        {loading ? (
          <div className="flex justify-center items-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
          </div>
        ) : (
          <>
            {/* Todo List */}
            <div className="flex mt-4  flex-col p-2 gap-2">
              {todos.map((todo) => (
                <div
                  key={todo._id}
                  className="p-4 bg-gray-50 rounded-lg shadow-md hover:cursor-pointer flex flex-col"
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
            <div className="w-full bg-blue-500 rounded-lg flex justify-between items-center mt-6 absolute bottom-0 left-0 right-0 p-4">
              <button
                className="bg-gray-100 rounded-full p-2 flex items-center"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                <GrLinkPrevious />
              </button>
              <span className="text-sm text-white sm:text-base">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="bg-gray-100 rounded-full p-2 flex items-center"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                <GrLinkNext />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Todo;
