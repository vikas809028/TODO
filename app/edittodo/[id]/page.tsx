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
  const [todo, setTodo] = useState({
    title: "",
    description: "",
    date: "",
  });

  const handleedittodo = async () => {
    try {
      const response = await axios.patch(`/api/todos/edittodo/${id}`, todo);
      router.push("/");
    } catch (error: any) {
      console.log("Todo not Edited", error.message);
    }
  };
  const handledelete = async () => {
    try {
      const response = await axios.delete(`/api/todos/deletetodo/${id}`);
      console.log("Todo Deleted", response.data);
      router.push("/");
    } catch (error: any) {
      console.log("Todo not Deleted", error.message);
      toast.error(error.message);
    }
  };
  const getTodo = async () => {
    try {
      const response = await axios.post(`/api/todos/gettodo/${id}`);
      const todo = await response.data.todo;
      setTodo({
        ...todo,
        title: todo.title,
        description: todo.description,
        date: todo.date,
      });
      console.log("Todo fetched", response.data.todo);
    } catch (error: any) {
      console.log("Todo not fetch", error.message);
    }
  };
  useEffect(() => {
    getTodo();
  }, []);
  return (
    <div className="w-full bg-[#f4f4f4] box-border mx-auto border-transparent">
      <div className="w-full bg-transparent flex items-center h-16">
        <button
          className="flex items-center w-100 h-9 font-bold text-2xl mx-auto"
          onClick={() => {
            router.push("/");
          }}
        >
          <IoArrowBack className="text-3xl me-2" />
          Back
        </button>
      </div>

      <div className="box-border bg-white pt-4 pe-2 ps-4 pb-100 w-100 mx-auto h-96  rounded-2xl">
        <div className="flex justify-between items-center">
          <input
            className="box-border p-2 border-2 rounded-lg border-[#f3efef] focus:outline-none "
            type="text"
            placeholder="Enter todo Here"
            value={todo.title}
            onChange={(e) => setTodo({ ...todo, title: e.target.value })}
          />
          <RiDeleteBin6Line
            className="text-2xl box-border shadow-lg hover:cursor-pointer"
            onClick={() => {
              handledelete();
            }}
          />
        </div>
        <div>
          <svg
            width="388"
            height="49"
            className="box-border"
            viewBox="0 0 388 49"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask id="path-1-inside-1_103_972" fill="white">
              <path d="M0 20C0 8.9543 8.9543 0 20 0H368C379.046 0 388 8.95431 388 20V49H0V20Z" />
            </mask>
            <path
              d="M0 0H388H0ZM388 50H0V48H388V50ZM0 49V0V49ZM388 0V49V0Z"
              fill="#0E1747"
              mask="url(#path-1-inside-1_103_972)"
            />
            <path
              d="M2 32V18H7.56098C8.63415 18 9.56504 18.35 10.3537 19.05C11.1423 19.75 11.5366 20.6333 11.5366 21.7C11.5366 22.3333 11.3659 22.9167 11.0244 23.45C10.6829 23.9833 10.2276 24.3917 9.65854 24.675V24.825C10.3577 25.0583 10.9228 25.475 11.3537 26.075C11.7846 26.675 12 27.35 12 28.1C12 29.2333 11.5732 30.1667 10.7195 30.9C9.86585 31.6333 8.86992 32 7.73171 32H2ZM4.09756 23.925H7.41463C7.98374 23.925 8.47561 23.7333 8.89024 23.35C9.30488 22.9667 9.5122 22.4833 9.5122 21.9C9.5122 21.3167 9.30488 20.8292 8.89024 20.4375C8.47561 20.0458 7.98374 19.85 7.41463 19.85H4.09756V23.925ZM4.09756 30.1H7.60976C8.22764 30.1 8.76423 29.8917 9.21951 29.475C9.6748 29.0583 9.90244 28.5333 9.90244 27.9C9.90244 27.2833 9.6748 26.7667 9.21951 26.35C8.76423 25.9333 8.22764 25.725 7.60976 25.725H4.09756V30.1Z"
              fill="black"
            />
            <path
              d="M26 32V29.8125H28.9357L32.75 20.1875H29.4286V18H38V20.1875H35.0643L31.25 29.8125H34.5714V32H26Z"
              fill="black"
            />
            <path
              d="M52 33V31.75H64V33H52ZM58 29.6667C56.5571 29.6667 55.3393 29.1875 54.3464 28.2292C53.3536 27.2708 52.8571 26.0972 52.8571 24.7083V18H54.5714V24.75C54.5714 25.6667 54.9 26.4375 55.5571 27.0625C56.2143 27.6875 57.0286 28 58 28C58.9714 28 59.7857 27.6875 60.4429 27.0625C61.1 26.4375 61.4286 25.6667 61.4286 24.75V18H63.1429V24.7083C63.1429 26.0972 62.6464 27.2708 61.6536 28.2292C60.6607 29.1875 59.4429 29.6667 58 29.6667Z"
              fill="black"
            />
            <path
              d="M85 32V30.8333H99V32H85ZM88.1889 28.7917V27.625H95.8306V28.7917H88.1889ZM85 25.5833V24.4167H99V25.5833H85ZM88.1889 22.375V21.2083H95.8306V22.375H88.1889ZM85 19.1667V18H99V19.1667H85Z"
              fill="black"
            />
            <path
              d="M113 32V30.8333H127V32H113ZM117.842 28.7917V27.625H127V28.7917H117.842ZM113 25.5833V24.4167H127V25.5833H113ZM117.842 22.375V21.2083H127V22.375H117.842ZM113 19.1667V18H127V19.1667H113Z"
              fill="black"
            />
            <path
              d="M141 32V30.8333H155V32H141ZM141 28.7917V27.625H155V28.7917H141ZM141 25.5833V24.4167H155V25.5833H141ZM141 22.375V21.2083H155V22.375H141ZM141 19.1667V18H155V19.1667H141Z"
              fill="black"
            />
            <path
              d="M176.992 32C176.719 32 176.486 31.8872 176.292 31.6617C176.097 31.4361 176 31.1678 176 30.8567C176 30.53 176.097 30.25 176.292 30.0167C176.486 29.7833 176.719 29.6667 176.992 29.6667C177.251 29.6667 177.475 29.7833 177.662 30.0167C177.85 30.25 177.944 30.53 177.944 30.8567C177.944 31.1678 177.85 31.4361 177.662 31.6617C177.475 31.8872 177.251 32 176.992 32ZM179.889 31.5333V30.1333H190V31.5333H179.889ZM176.992 26.1667C176.719 26.1667 176.486 26.0539 176.292 25.8283C176.097 25.6028 176 25.3267 176 25C176 24.6733 176.097 24.3972 176.292 24.1717C176.486 23.9461 176.719 23.8333 176.992 23.8333C177.251 23.8333 177.475 23.95 177.662 24.1833C177.85 24.4167 177.944 24.6889 177.944 25C177.944 25.3111 177.85 25.5833 177.662 25.8167C177.475 26.05 177.251 26.1667 176.992 26.1667ZM179.889 25.7V24.3H190V25.7H179.889ZM176.972 20.3333C176.7 20.3333 176.47 20.2206 176.282 19.995C176.094 19.7694 176 19.4933 176 19.1667C176 18.84 176.094 18.5639 176.282 18.3383C176.47 18.1128 176.7 18 176.972 18C177.244 18 177.475 18.1128 177.662 18.3383C177.85 18.5639 177.944 18.84 177.944 19.1667C177.944 19.4933 177.85 19.7694 177.662 19.995C177.475 20.2206 177.244 20.3333 176.972 20.3333ZM179.889 19.8667V18.4667H190V19.8667H179.889Z"
              fill="black"
            />
            <path
              d="M204 32V31.2562H205.633V30.6875H204.817V29.9437H205.633V29.375H204V28.6312H206.294V32H204ZM208.064 30.9281V29.6156H218V30.9281H208.064ZM204 26.6844V25.9844L205.458 24.0594H204V23.3156H206.294V24.0156L204.817 25.9406H206.294V26.6844H204ZM208.064 25.6125V24.3H218V25.6125H208.064ZM204.817 21.4125V18.7437H204V18H205.478V21.4125H204.817ZM208.064 20.2969V18.9844H218V20.2969H208.064Z"
              fill="black"
            />
            <path
              d="M243.552 18.6712L244.179 18L249.254 23.4318C249.478 23.6712 249.59 23.9651 249.59 24.3137C249.59 24.6623 249.478 24.9563 249.254 25.1956L246.658 27.974C246.435 28.2133 246.172 28.333 245.871 28.333C245.569 28.333 245.307 28.2133 245.083 27.974L242.488 25.1956C242.264 24.9563 242.152 24.6623 242.152 24.3137C242.152 23.9651 242.264 23.6712 242.488 23.4318L245.244 20.4818L243.552 18.6712ZM245.871 21.153L242.969 24.2591H248.773L245.871 21.153ZM250.8 28.5983C250.508 28.5983 250.26 28.4891 250.056 28.2706C249.852 28.052 249.75 27.7867 249.75 27.4745C249.75 27.2976 249.789 27.1051 249.867 26.897C249.944 26.6889 250.051 26.4755 250.188 26.257C250.265 26.1217 250.36 25.9761 250.472 25.82C250.584 25.6639 250.693 25.5182 250.8 25.3829C250.907 25.5182 251.016 25.6639 251.128 25.82C251.24 25.9761 251.335 26.1217 251.413 26.257C251.549 26.4755 251.656 26.6889 251.733 26.897C251.811 27.1051 251.85 27.2976 251.85 27.4745C251.85 27.7867 251.748 28.052 251.544 28.2706C251.34 28.4891 251.092 28.5983 250.8 28.5983ZM241 33V31.1113H252.667V33H241Z"
              fill="black"
            />
            <path
              d="M271.479 31.3334V21.4896H268.417V19.6667H276V21.4896H272.938V31.3334H271.479ZM266.229 31.3334V25.1354H264.333V23.3125H269.583V25.1354H267.688V31.3334H266.229Z"
              fill="black"
            />
          </svg>
        </div>
        <textarea
          className="focus:border-none focus:outline-none w-96 mt-5"
          onChange={(e) => {
            setTodo({ ...todo, description: e.target.value });
          }}
          value={todo.description}
          cols={30}
          rows={10}
        ></textarea>
      </div>

      <button
        className="bg-orange-400 box-border p-2 text-xl mt-5 w-100 flex mx-auto justify-center rounded-lg "
        onClick={handleedittodo}
      >
        save
      </button>
    </div>
  );
};

export default Addtodo;
