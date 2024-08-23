/* eslint-disable react/prop-types */
import "./Dashboard.css";
import { NavLink } from "react-router-dom";
import { UseSchedule, useTheme } from "../appContext/appContext";
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";
import { TbMessageCircle2 } from "react-icons/tb";
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";
import { useState } from "react";
import { BsCalendarDate } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { FaRegCircle } from "react-icons/fa6";
import { FaCircleCheck } from "react-icons/fa6";
import { FaCircle } from "react-icons/fa6";

export default function Dashboard() {
  const { schedules, toggleCompleted, deleteTask } = UseSchedule();

  const totalTask = schedules.length;
  const totalDone = schedules.filter((task) => task.completed === true).length;
  const totalPending = schedules.filter(
    (task) => task.completed === false
  ).length;
  const totalUrgent = schedules.filter((task) => task.urgent === true).length;

  const { themeMode } = useTheme();
  const [toggleOn, setToggleOn] = useState(false);

  const onComplete = (task) => {
    toggleCompleted(task.id);
  };

  const handleDelete = (task) => {
    deleteTask(task.id);
  };

  const newDate = new Date();
  const thisDayOfWeek = newDate.getUTCDate();
  const thisMonth = newDate.getMonth();
  const thisYear = newDate.getFullYear();

  const monthArray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <section className=" w-full h-full flex flex-col item-center justify-between">
      <header className=" w-full h-auto flex items-center justify-center border-b border-gray-400">
        <div className="flex-1 flex flex-col items-start justify-start">
          <p className="text-lg font-bold">welcome</p>
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>
        <div className="flex-1 flex items-center justify-end gap-2">
          <form className="w-max flex items-center justify-center gap-1 border rounded-full px-2">
            <input
              type="search"
              className="w-max p-2 bg-inherit focus:outline-none capitalize rounded-lg text-sm"
              placeholder="search..."
            />
            <button
              type="submit"
              className=" p-2 rounded-full active:translate-y-0.5 hover:bg-gray-300 w-9 h-9 flex items-center justify-center duration-300">
              <FaSearch />
            </button>
          </form>
          <button
            type="button"
            className="text-black duration-300 bg-gray-300 w-8 h-8 rounded-full flex items-center justify-center active:translate-y-0.5">
            <TbMessageCircle2 />
          </button>
          <button
            type="button"
            className="text-black duration-300 bg-gray-300 w-8 h-8 rounded-full flex items-center justify-center active:translate-y-0.5"
            onClick={() => {
              setToggleOn((prev) => !prev);
            }}>
            <span>
              {toggleOn ? (
                <MdDarkMode className="w-5 h-5" />
              ) : (
                <MdOutlineDarkMode className="w-5 h-5" />
              )}
            </span>
          </button>
        </div>
      </header>
      <section className="w-full flex-1 flex items-center justify-between">
        <div className="h-full flex-1 flex flex-col p-1 gap-2">
          <div className="w-full flex-1 flex items-center justify-center gap-2 p-1">
            <div className="flex-1 h-full flex flex-col items-center justify-around ">
              <div className=" flex items-center justify-center gap-2 h-1/6">
                <span
                  className={`border text-xl w-12 h-10 rounded-full flex items-center justify-center font-bold + ${
                    themeMode === "light"
                      ? "  border-slate-400"
                      : " border-slate-600"
                  }`}>
                  {thisDayOfWeek}
                </span>
                <div className="w-full flex items-center gap-4 h-16">
                  <p className=" flex flex-col mx-2">
                    <span className="font-semibold">
                      {monthArray[thisMonth]},
                    </span>
                    <span>{thisYear}</span>
                  </p>
                  <NavLink
                    to={"../Schedulepage/container/SchedulePage"}
                    className="h-10 flex items-center justify-center gap-3 bg-slate-700 text-white px-2 rounded-full active:translate-y-0.5 duration-300">
                    <span className=" text-sm">Open Schedules</span>
                    <MdOutlineSubdirectoryArrowRight />
                  </NavLink>
                  <button
                    type="button"
                    className="w-10 h-10 rounded-full border border-slate-400 flex items-center justify-center">
                    <BsCalendarDate />
                  </button>
                </div>
              </div>
              <div className="flex-1 w-full flex flex-col">
                <div className="flex-1 w-full flex items-center justify-between gap-2">
                  <div className=" h-3/4 flex-1 flex justify-center flex-col items-center bg-teal-50 rounded-lg text-black">
                    Total Tasks <br />
                    <strong className="text-3xl">{totalTask}</strong>
                  </div>
                  <div className=" h-3/4 w-1/4 flex justify-center flex-col items-center bg-orange-500 text-white rounded-lg">
                    Urgent <br />
                    <strong className="text-3xl">{totalUrgent}</strong>
                  </div>
                </div>
                <div className=" flex-1 w-full flex items-center justify-between gap-2">
                  <div className=" h-3/4 flex-1 flex justify-center flex-col items-center bg-slate-600 text-white rounded-lg">
                    Completed <br />
                    <strong className="text-3xl">{totalDone}</strong>
                  </div>
                  <div className="h-3/4 flex-1 flex justify-center flex-col items-center bg-slate-600 text-white rounded-lg">
                    Pending <br />
                    <strong className="text-3xl">{totalPending}</strong>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 h-full flex flex-col items-center justify-between shadow-2xl border border-gray-300 rounded-lg">
              <div className="w-full flex items-center justify-center h-1/6">
                <strong>Current Schedules</strong>
              </div>
              <ul className=" w-full flex-1 rounded-lg overflow-y-scroll overflow-x-hidden p-2">
                {schedules.map((task) => {
                  return (
                    <li
                      key={task.id}
                      className={`h-11 w-full flex items-center justify-between px-2 rounded-md my-2 duration-500 + ${
                        themeMode === "light"
                          ? "bg-gray-200 p-1"
                          : "bg-gray-600 p-1"
                      } + ${task.completed ? "line-through opacity-60" : ""}`}>
                      <p className=" flex items-center gap-2 justify-start">
                        <button
                          onClick={() => {
                            onComplete(task);
                          }}>
                          {!task.completed ? (
                            <FaRegCircle />
                          ) : (
                            <FaCircleCheck />
                          )}
                        </button>
                        {task.taskName}
                      </p>
                      <p className=" flex items-center gap-2 justify-start text-sm">
                        <FaCircle
                          className={`${
                            task.focused ? "onstartFocus text-xs" : "hidden"
                          }`}
                        />

                        {!task.focused ? (
                          <span>due time: {task.scheduleTime}</span>
                        ) : (
                          "Focus in progress"
                        )}
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          handleDelete(task);
                        }}
                        className="text-orange-500 active:translate-y-0.5 duration-300 hover:opacity-75">
                        <FaTrash />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="w-full flex-1 bg-black text-white">1</div>
        </div>
        <div className="h-full flex-1 flex flex-col p-1">1</div>
      </section>
    </section>
  );
}
