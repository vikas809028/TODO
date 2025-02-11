"use client";
import React, { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

const Addtodo = () => {
  function formatDate(date: Date): string {
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  }

  const today = new Date();
  const date = formatDate(today);
  const router = useRouter();
  const [todo, setTodo] = useState({
    title: "",
    description: "",
    date: date,
  });

  const handleAddtodo = async () => {
    try {
      const response = await axios.post("/api/todos/addtodo", todo);
      console.log("Todo added", response.data);
      router.push("/");
    } catch (error: any) {
      console.log("Todo not added", error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#f4f4f4] flex flex-col items-center justify-start px-4 py-6 sm:px-6 md:px-8 lg:px-10">
      {/* Top Bar */}
      <div className="w-full flex items-center justify-between max-w-3xl">
        <button
          className="flex items-center text-xl font-bold sm:text-2xl"
          onClick={() => router.push("/")}
        >
          <IoArrowBack className="text-2xl sm:text-3xl mr-2" />
          Back
        </button>
      </div>

      {/* Main Box */}
      <div className="w-full max-w-3xl bg-white shadow-lg p-6 rounded-lg mt-6">
        {/* Title Input & Delete Button */}
        <div className="flex justify-between bg-white items-center mb-4">
          <input
            className="w-full p-3 border-2 border-gray-200 rounded-lg text-lg focus:outline-none focus:border-gray-400"
            type="text"
            placeholder="Enter todo here..."
            value={todo.title}
            onChange={(e) => setTodo({ ...todo, title: e.target.value })}
          />
          <RiDeleteBin6Line
            className="text-2xl ml-3 text-gray-600 hover:text-red-500 cursor-pointer"
            onClick={() => router.push("/")}
          />
        </div>

        {/* Description Input */}
        <textarea
          className="w-full p-3 border-2 border-gray-200 rounded-lg text-lg focus:outline-none focus:border-gray-400"
          rows={4}
          placeholder="Enter description..."
          value={todo.description}
          onChange={(e) => setTodo({ ...todo, description: e.target.value })}
        ></textarea>

        {/* Add Todo Button */}
        <button
          onClick={handleAddtodo}
          className="w-full mt-4 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg text-lg font-semibold transition duration-200"
        >
          Add Todo
        </button>
      </div>
    </div>
  );
};

export default Addtodo;
