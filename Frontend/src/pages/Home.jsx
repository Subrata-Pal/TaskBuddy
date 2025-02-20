import React, { createContext, useState, useEffect } from "react";
import Header from "../components/Header";
import arrowDown from "../assets/chevron-down.png";
import search from "../assets/search.svg";
import ArrowUp from "../assets/chevron-down.svg";
import ListViewTodo from "../components/ListViewTodo";
import ListViewProgress from "../components/ListViewProgress";
import ListViewComplete from "../components/ListViewComplete";
import CreateTask from "../components/CreateTask";
import { TaskContext } from "../Contexts/TaskContext";
import axios from "axios";
import { api_url } from "../utils/constants";
import UpdateTask from "../components/UpdateTask";
import ViewEditTask from "../components/ViewEditTask";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";

const Home = () => {
  const [taskToggle, setTaskToggle] = useState(false);
  const [refreshTasks, setRefreshTasks] = useState(false); // State to trigger useEffect
  const [todoTasks, setTodoTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [completedTask, setCompletedTasks] = useState([]);
  const [updateTaskToggle, setUpdateTaskToggle] = useState(false);
  const [selectElement, setSelectElement] = useState([]);
  const [viewTask, setViewTask] = useState(false);
  const [viewTaskTitle, setViewTaskTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("default");
  const [arrow, setArrow] = useState({
    todo: true,
    inProgress: true,
    completed: true,
  });
  const [filter, setFilter] = useState(0);

  // Fetch tasks when the component mounts or when refreshTasks changes
  useEffect(() => {
    async function fetchAllTasks() {
      try {
        const result = await axios.get(`${api_url}/tasks`);
        const allTasks = result.data.tasks;

        const todos = allTasks?.filter((elem) => elem.status === "todo");
        setTodoTasks(todos);

        const inprogress = allTasks?.filter(
          (elem) => elem.status === "in-progress"
        );
        setInProgressTasks(inprogress);

        const completed = allTasks?.filter(
          (elem) => elem.status === "completed"
        );
        setCompletedTasks(completed);
      } catch (err) {
        console.log(err);
      }
    }
    fetchAllTasks();
  }, [refreshTasks]); // Add refreshTasks as a dependency

  function handleCategories(e) {
    const val = e.target.value;
    setSelectedCategory(val);
    if (val === "todo") {
      setFilter(1);
    } else if (val === "in-progress") {
      setFilter(2);
    } else {
      setFilter(3);
    }
  }

  return (
    <TaskContext.Provider
      value={{
        filter,
        viewTaskTitle,
        setViewTaskTitle,
        setViewTask,
        taskToggle,
        todoTasks,
        inProgressTasks,
        completedTask,
        updateTaskToggle,
        setUpdateTaskToggle,
        selectElement,
        setSelectElement,
        setRefreshTasks,
        refreshTasks,
        setTaskToggle,
      }}
    >
      <div className={`${(taskToggle || viewTask) ===  true ? "bg-gray-500 h-screen overflow-hidden" : ""}  relative`}>
        <Header />

        <div className={`${(taskToggle || viewTask) ===  true  ? " bg-gray-500 invisible" : ""} w-full flex justify-end`}>
          <div
            onClick={() => setTaskToggle(true)}
            className="text-white text-sm mt-4 bg-[#7B1984] rounded-4xl px-4 py-2 mx-4"
          >
            ADD TASK
          </div>
        </div>

        <div className="w-[95%] mx-auto my-4 mb-8">
          <div className="flex flex-col text-sm">
            <div className="text-gray-600">Filter by:</div>
            <div className="flex gap-2 mt-2">
              <div className="flex items-center gap-2 px-2 py-1 rounded-3xl border border-gray-400">
                <div>
                  <select
                    name="task"
                    id="task"
                    className="text-gray-600 flex justify-center items-center"
                    onChange={(e) => handleCategories(e)}
                    value={selectedCategory}
                  >
                    <option value="default" selected default hidden>
                      Categories
                    </option>
                    <option value="todo">TO-DO</option>
                    <option value="in-progress">In-Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-2 px-2 py-1 rounded-3xl border border-gray-400">
                <div className="text-gray-600" onClick={() => {setFilter(0); setSelectedCategory("default");}}>
                  Clear
                </div>
              </div>
            </div>
          </div>

          

          {filter === 0 && (
            <>
              <div
                className={`${
                  arrow.todo ? "rounded-t-xl" : "rounded-xl"
                } flex flex-col bg-[#FAC3FF] border-0  mt-8 ${(taskToggle || viewTask) ===  true ? "invisible " : ""}`}
              >
                <div className="flex justify-between items-center font-semibold px-2 py-1">
                  <div>Todo ({todoTasks.length})</div>
                  <div
                    className="text-3xl"
                    onClick={() =>
                      setArrow((prev) => ({ ...prev, todo: !prev.todo }))
                    }
                  >
                    {arrow.todo ? (
                      <MdOutlineKeyboardArrowDown />
                    ) : (
                      <MdKeyboardArrowUp />
                    )}
                  </div>
                </div>

                <div>{arrow.todo && <ListViewTodo />}</div>
              </div>

              <div
                className={`${
                  arrow.inProgress ? "rounded-t-xl" : "rounded-xl"
                } flex flex-col bg-[#85D9F1] border-0 rounded-t-xl mt-4 ${(taskToggle || viewTask) ===  true ? "invisible " : ""}`}
              >
                <div className="flex justify-between items-center font-semibold px-2 py-1">
                  <div>In-Progress ({inProgressTasks.length})</div>
                  <div
                    className="text-3xl"
                    onClick={() =>
                      setArrow((prev) => ({
                        ...prev,
                        inProgress: !prev.inProgress,
                      }))
                    }
                  >
                    {arrow.inProgress ? (
                      <MdOutlineKeyboardArrowDown />
                    ) : (
                      <MdKeyboardArrowUp />
                    )}
                  </div>
                </div>

                <div>{arrow.inProgress && <ListViewProgress />}</div>
              </div>

              <div
                className={`${
                  arrow.completed ? "rounded-t-xl" : "rounded-xl"
                } flex flex-col bg-[#CEFFCC] border-0 rounded-t-xl mt-4 ${(taskToggle || viewTask) ===  true ? "invisible" : ""}`}
              >
                <div className="flex justify-between items-center font-semibold px-2 py-1">
                  <div>Completed ({completedTask.length})</div>
                  <div
                    className="text-3xl"
                    onClick={() =>
                      setArrow((prev) => ({
                        ...prev,
                        completed: !prev.completed,
                      }))
                    }
                  >
                    {arrow.completed ? (
                      <MdOutlineKeyboardArrowDown />
                    ) : (
                      <MdKeyboardArrowUp />
                    )}
                  </div>
                </div>

                <div>{arrow.completed && <ListViewComplete />}</div>
              </div>
            </>
          )}

          {filter === 1 && (
            <div
              className={`${
                arrow.todo ? "rounded-t-xl" : "rounded-xl"
              } flex flex-col bg-[#FAC3FF] border-0  mt-8 ${(taskToggle || viewTask) ===  true ? " invisible" : ""}`}
            >
              <div className="flex justify-between items-center font-semibold px-2 py-1">
                <div>Todo ({todoTasks.length})</div>
                <div
                  className="text-3xl"
                  onClick={() =>
                    setArrow((prev) => ({ ...prev, todo: !prev.todo }))
                  }
                >
                  {arrow.todo ? (
                    <MdOutlineKeyboardArrowDown />
                  ) : (
                    <MdKeyboardArrowUp />
                  )}
                </div>
              </div>

              <div>{arrow.todo && <ListViewTodo />}</div>
            </div>
          )}

          {filter === 2 && (
            <div
              className={`${
                arrow.inProgress ? "rounded-t-xl" : "rounded-xl"
              } flex flex-col bg-[#85D9F1] border-0 rounded-t-xl mt-4 ${(taskToggle || viewTask) ===  true ? "invisible " : ""}`}
            >
              <div className="flex justify-between items-center font-semibold px-2 py-1">
                <div>In-Progress ({inProgressTasks.length})</div>
                <div
                  className="text-3xl"
                  onClick={() =>
                    setArrow((prev) => ({
                      ...prev,
                      inProgress: !prev.inProgress,
                    }))
                  }
                >
                  {arrow.inProgress ? (
                    <MdOutlineKeyboardArrowDown />
                  ) : (
                    <MdKeyboardArrowUp />
                  )}
                </div>
              </div>

              <div>{arrow.inProgress && <ListViewProgress />}</div>
            </div>
          )}

          {filter === 3 && (
            <div
              className={`${
                arrow.completed ? "rounded-t-xl" : "rounded-xl"
              } flex flex-col bg-[#CEFFCC] border-0 rounded-t-xl mt-4 ${(taskToggle || viewTask) ===  true ? "invisible " : ""}`}
            >
              <div className="flex justify-between items-center font-semibold px-2 py-1">
                <div>Completed ({completedTask.length})</div>
                <div
                  className="text-3xl"
                  onClick={() =>
                    setArrow((prev) => ({
                      ...prev,
                      completed: !prev.completed,
                    }))
                  }
                >
                  {arrow.completed ? (
                    <MdOutlineKeyboardArrowDown />
                  ) : (
                    <MdKeyboardArrowUp />
                  )}
                </div>
              </div>

              <div>{arrow.completed && <ListViewComplete />}</div>
            </div>
          )}

          <div>
            {updateTaskToggle && (
              <div className="mt-6 w-full">
                <UpdateTask />
              </div>
            )}
          </div>
        </div>

        <div
          className={
            taskToggle ? "visible" : "translate-x-[700px] hidden"
          }
        >
          <CreateTask
            setTaskToggle={setTaskToggle}
            setRefreshTasks={setRefreshTasks}
          />
          </div>

        <div
          className={
            viewTask ? " visible" : "translate-x-[700px] hidden"
          }
        >
          <ViewEditTask />
        </div>
      </div>
    </TaskContext.Provider>
  );
};

export default Home;
