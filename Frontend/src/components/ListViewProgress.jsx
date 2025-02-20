import React from "react";
import checkmark from "../assets/checkmark.png";
import { useContext } from "react";
import { TaskContext } from "../Contexts/TaskContext";
import { BsThreeDotsVertical } from "react-icons/bs";

const ListViewProgress = () => {
  const {
    inProgressTasks,
    setUpdateTaskToggle,
    setSelectElement,
    setViewTaskTitle,
    setViewTask
    
  } = useContext(TaskContext);

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
      {inProgressTasks.length == 0 ? (
        <div className="w-full h-[30vw] md:h-[20vw] bg-[#F1F1F1]">
          <div>
            <div className="flex justify-center items-center h-[20vw]">
              No Tasks in Progress
            </div>
          </div>
        </div>
      ) : (
        <div>
          {inProgressTasks.map((item, index) => (
            <div
              key={index}
              className="w-full bg-[#F1F1F1] px-2 gap-2 py-4 border-b-[1px] border-gray-300"
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
                <div onClick={() => {setViewTask(true); 
                setViewTaskTitle(item.title)}}><BsThreeDotsVertical /></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListViewProgress;
