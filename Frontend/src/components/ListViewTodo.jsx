import React, { useState, useEffect } from "react";
import Add from "../assets/plus.svg";
import checkmark from "../assets/checkmark.png";
import { useContext } from "react";
import { TaskContext } from "../Contexts/TaskContext";
import { BsThreeDotsVertical } from "react-icons/bs";

const ListViewTodo = () => {
  const { todoTasks, setUpdateTaskToggle, setSelectElement, setViewTaskTitle,
    setViewTask, setTaskToggle } =
    useContext(TaskContext);

  function handleClick(e) {
    if (e.target.checked) {
      setSelectElement((prev) => [...prev, e.target.value]);
    } else {
      setSelectElement((prev) =>
        prev.filter((item) => item !== e.target.value)
      );
    }

    setUpdateTaskToggle(true);
  }

  return (
    <div>
      {todoTasks.length == 0 ? (
        <div className="w-full h-[30vw] md:h-[20vw] bg-[#F1F1F1]">
          <div>
            <div className="w-full flex gap-2 items-center px-2 border-b-1 border-gray-300 py-1">
              <div>
                <img src={Add} alt="" />
              </div>
              <div onClick={() => setTaskToggle(true)}>Add Task</div>
            </div>

            <div className="flex justify-center items-center h-[20vw]">
              No Tasks in To-do
            </div>
          </div>
        </div>
      ) : (
        <div>
          {todoTasks.map((item, index) => (
            <div
              key={index}
              className="w-full bg-[#F1F1F1] px-2  gap-2 py-4 border-b-[1px] border-gray-300 "
            >
              <div className="flex justify-between">
                <div className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    name={item.title}
                    id={item.title}
                    value={item.title}
                    onClick={(e) => handleClick(e)}
                  />
                  <div>
                    <img src={checkmark} alt="" />
                  </div>
                  <label htmlFor={item.title}>{item.title}</label>
                </div>
                <div
                  onClick={() => {
                    setViewTask(true);
                    setViewTaskTitle(item.title);
                  }}
                >
                  <BsThreeDotsVertical />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListViewTodo;
