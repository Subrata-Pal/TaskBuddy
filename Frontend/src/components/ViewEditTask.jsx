import React, { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { api_url } from "../utils/constants";
import { useContext } from "react";
import { TaskContext } from "../Contexts/TaskContext";
import { LuDownload } from "react-icons/lu";

const ViewEditTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [status, setStatus] = useState("");
  const [dueDate, setDueDate] = useState("");

  const {
    inProgressTasks,
    setUpdateTaskToggle,
    setSelectElement,
    selectElement,
    setRefreshTasks,
    setViewTask,
    viewTaskTitle,
  } = useContext(TaskContext);

  useEffect(() => {
    
    async function fetchAllTasks() {
      try {
       
        const result = await axios.get(
          `${api_url}/task?title=${encodeURIComponent(viewTaskTitle)}`
        );
        const task = result.data.task;
      
        if (task) {
          setTitle(task.title || "");
          setDescription(task.description || "");
          setSelectedCategory(task.category || "");
          setStatus(task.status || "");
          setDueDate(task.dueDate ? task.dueDate.split("T")[0] : ""); // Format date for input fields
        }
      } catch (err) {
        console.log(err);
      }
    }

    if(viewTaskTitle !== undefined)
    {
        fetchAllTasks();
    }
    
  }, [viewTaskTitle]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };



  async function submitHandler(e)
  {
    e.preventDefault();


    try {
        const result = await axios.put(
          `${api_url}/updateTask?title=${encodeURIComponent(viewTaskTitle)}`,
          {
            title,
            description,
            status,
            dueDate,
          }
        );
        const value = result.data;
        setViewTask(false);
        setRefreshTasks((prev => !prev) );
      } catch (err) {
        console.log(err);
      }

  }

  const {filter} = useContext(TaskContext);


  return (
    <div className={`bg-gray-50 w-screen min-h-[90vh] sm:w-[50%] md:w-[80%] 
      pt-6 border-0 md:rounded-t-4xl absolute top-1/2 left-1/2 
      -translate-x-1/2 -translate-y-1/2 md:rounded-b-4xl 
      max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100`}>
      <div className="w-[92%] mx-auto">
        <div className="w-full flex justify-between items-center border-b-[0.1px] border-gray-300 py-6">
          <div className="font-semibold text-xl">Details</div>
          <div className="text-xl" onClick={() => setViewTask(false)}>
            <RxCross2 />
          </div>
        </div>

        <div className="mt-4">
          <form action="" onSubmit={(e) => submitHandler(e)}>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              name=""
              id=""
              placeholder="Task title"
              required
              className="w-full bg-gray-100 border border-gray-300 outline-none rounded-xl px-4 py-2 mb-6"
            />

            <div className="p-4 border-0 rounded-lg bg-gray-200">
              <textarea
                className="w-full h-28 p-3 border bg-gray-100 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Description"
                maxLength={300}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              <span className="text-sm text-gray-500">
                {description.length}/300 characters
              </span>
            </div>

            <div className="my-4">
              <div>Task Category*</div>
              <div className="flex gap-2 mt-2">
              {
                  ["Work","Personal"].map((category) => ( <div
                    key={category}
                    onClick={() => handleCategorySelect(category)}
                    className={`px-4 py-1 border rounded-2xl border-gray-300 cursor-pointer 
                      ${selectedCategory === category ? "bg-purple-600 text-white" : "bg-white text-black"}`}
                  >
                    {category}
                  </div>))
                }
              </div>
            </div>

            <div className="my-4">
              <div>Due on*</div>
              <div className="mt-2">
                <input
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  type="date"
                  name="date"
                  required
                  id=""
                  className="border border-gray-300 rounded-xl px-2 py-1 w-[60%] bg-gray-100"
                  placeholder="DD/MM/YY"
                />
              </div>
            </div>

            <div>
              <div className="mb-2">Task Status*</div>
              <div className="mb-4">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  required
                  name=""
                  id=""
                  className="border border-gray-300 rounded-xl px-2 py-1 w-[60%] bg-gray-100"
                >
                  <option value="">Choose</option>
                  <option value="todo">todo</option>
                  <option value="in-progress">in-progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            <div className="mb-10">
              
            </div>

            <div className="flex justify-end px-4 py-4 bg-[#F1F1F1]">
              <div className="flex gap-2">
                <div className="px-6 py-2 bg-white rounded-full">
                  Cancel
                </div>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#7B1984] rounded-full text-white"
                >
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ViewEditTask;
