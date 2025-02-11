/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect } from "react";
import { IoArrowBack } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

interface Todo {
  title: string;
  description: string;
  date: string;
}

const Addtodo = () => {
  const { id } = useParams<{ id?: string }>();
  const router = useRouter();
  const [todo, setTodo] = useState<Todo>({
    title: "",
    description: "",
    date: "",
  });

  const handleEditTodo = async () => {
    try {
      await axios.patch(`/api/todos/edittodo/${id}`, todo);
      router.push("/");
    } catch (error: any) {
      console.log("Todo not Edited", error.message);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/todos/deletetodo/${id}`);
      toast.success("Todo Deleted Successfully");
      router.push("/");
    } catch (error: any) {
      console.log("Todo not Deleted", error.message);
      toast.error(error.message);
    }
  };

  const getTodo = async () => {
    try {
      const response = await axios.get(`/api/todos/gettodo/${id}`);
      setTodo(response.data.todo);
    } catch (error: any) {
      console.log("Todo not fetched", error.message);
    }
  };

  useEffect(() => {
    getTodo();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
      {/* Header Section */}
      <div className="w-full max-w-lg">
        <button
          className="flex items-center text-xl font-bold text-gray-800 hover:text-gray-600"
          onClick={() => router.push("/")}
        >
          <IoArrowBack className="text-2xl mr-2" /> Back
        </button>
      </div>

      {/* Todo Container */}
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6 mt-6">
        <div className="flex justify-between bg-white items-center">
          <input
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            type="text"
            placeholder="Enter todo title"
            value={todo.title}
            onChange={(e) => setTodo({ ...todo, title: e.target.value })}
          />
          <RiDeleteBin6Line
            className="text-red-500 bg-white  text-2xl ml-3 cursor-pointer hover:text-red-700"
            onClick={handleDelete}
          />
        </div>

        {/* Description */}
        <textarea
          className="w-full mt-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 resize-none"
          rows={4}
          placeholder="Enter description"
          value={todo.description}
          onChange={(e) => setTodo({ ...todo, description: e.target.value })}
        />

        {/* Date Picker */}
        <input
          type="date"
          className="w-full mt-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          value={todo.date}
          onChange={(e) => setTodo({ ...todo, date: e.target.value })}
        />

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <button
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-200"
            onClick={handleEditTodo}
          >
            Update Todo
          </button>
        </div>
      </div>
    </div>
  );
};

export default Addtodo;
