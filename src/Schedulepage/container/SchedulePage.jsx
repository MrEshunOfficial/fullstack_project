//css imports
import "./SchedulePage.css";

//icon imports
import { FaTasks } from "react-icons/fa";
import { MdOutlineLocalPrintshop } from "react-icons/md";
import { IoShareSocialSharp } from "react-icons/io5";
import { IoNotifications } from "react-icons/io5";
import { MdDownloadDone } from "react-icons/md";
import { MdOutlinePendingActions } from "react-icons/md";
import { TbUrgent } from "react-icons/tb";
import { IoMdAdd } from "react-icons/io";
import { FaSearch } from "react-icons/fa";

// module imports
import { useTheme } from "../../appContext/appContext";
import { UseSchedule } from "../../appContext/appContext";

import moment from "moment";
import { useEffect, useRef, useState } from "react";

// component imports
import Input from "./inputpage/Input";
import Output from "./outputpage/Output";

export default function SchedulePage() {
  const { schedules } = UseSchedule();
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = () => {
    const searchedList = schedules.filter((item) =>
      item.taskName.includes(searchTerm)
    );
    console.log(searchedList);
  };

  const sortOptions = [
    "All",
    "completed",
    "pending",
    "urgent",
    "normal",
    "most recent",
  ];

  const dateOptions = [
    moment().format("dddd, MMMM D"),
    moment().add(1, "days").format("dddd, MMMM D"),
    moment().add(2, "days").format("dddd, MMMM D"),
    moment().add(3, "days").format("dddd, MMMM D"),
    moment().add(4, "days").format("dddd, MMMM D"),
    moment().add(5, "days").format("dddd, MMMM D"),
    moment().add(6, "days").format("dddd, MMMM D"),
  ];

  const newYear = new Date().getFullYear();
  const newMonth = new Date().getMonth();
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

  const currentMonth = `${monthArray[newMonth]}, ${newYear}`;
  const currentDay = moment().format("dddd, MMMM D");

  const [status, setStatus] = useState("All");
  const [sortedTasks, setSortedTasks] = useState([]);

  //scroll to view
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [sortedTasks]);

  const { themeMode, widthInput, onWidthExtend } = useTheme();

  const totalTask = schedules.length;
  const totalDone = schedules.filter((task) => task.completed === true).length;
  const totalPending = schedules.filter(
    (task) => task.completed === false
  ).length;
  const totalUrgent = schedules.filter((task) => task.urgent === true).length;

  useEffect(() => {
    switch (status) {
      case "completed":
        setSortedTasks(schedules.filter((task) => task.completed === true));
        break;
      case "pending":
        setSortedTasks(schedules.filter((task) => task.completed === false));
        break;
      case "urgent":
        setSortedTasks(schedules.filter((task) => task.urgent === true));
        break;
      case "normal":
        setSortedTasks(schedules.filter((task) => task.urgent === false));
        break;
      case "most recent":
        setSortedTasks(
          schedules.filter(
            (task) => task.dateCreated === moment().format("dddd, MMMM D")
          )
        );
        break;
      default:
        setSortedTasks(schedules);
        break;
    }
  }, [schedules, status]);

  return (
    <section className="schedule-parent-folder">
      <header className="schedule-main-head">
        <div className=" flex-1 flex flex-col gap-1 items-start justify-start">
          <strong className="text-2xl">Schedules</strong>
          <strong className=" text-gray-500">
            Current month: {currentMonth}
          </strong>
        </div>
        <ul className="w-max h-12 flex items-center justify-center p-2 border rounded-md shadow-2xl">
          <li className=" w-max flex items-center justify-center rounded-lg p-1 gap-3 ">
            <span data-count={0} className="notify-count relative p-1">
              <IoNotifications />
            </span>
            <span className="total">
              <FaTasks />: {totalTask}
            </span>
            <span className="completed">
              <MdDownloadDone />: {totalDone}
            </span>
            <span className="pending">
              <MdOutlinePendingActions />: {totalPending}
            </span>
            <span className="urgent">
              <TbUrgent />: {totalUrgent}
            </span>
          </li>
          <li className="w-max flex items-center justify-center rounded-lg p-1 gap-3 ">
            <span>
              <MdOutlineLocalPrintshop />
            </span>
            <span>
              <IoShareSocialSharp />
            </span>
            <select
              name="sortBy"
              id="sortBy"
              onChange={(e) => {
                setStatus(e.target.value);
              }}
              className="w-max p-1 bg-transparent focus:outline-none capitalize">
              {sortOptions.map((sortOptions) => {
                return (
                  <option key={sortOptions} value={sortOptions}>
                    {sortOptions}
                  </option>
                );
              })}
            </select>
            <form
              className="w-max flex items-center justify-center gap-1"
              onSubmit={handleSearch}>
              <input
                type="search"
                value={searchTerm}
                className="w-max p-2 bg-transparent focus:outline-none capitalize border rounded-lg text-sm"
                placeholder="search tasks..."
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                type="submit"
                className=" p-2 rounded-full active:translate-y-0.5 hover:bg-gray-300 w-9 h-9 flex items-center justify-center duration-300">
                <FaSearch />
              </button>
            </form>
          </li>
        </ul>
        <div className=" flex-1 flex gap-1 items-center justify-end">
          <button
            type="button"
            className={`w-max px-2 h-10 shadow-2xl rounded-md border font-bold + ${
              themeMode === "light"
                ? "hover:bg-teal-950 hover:text-white"
                : "hover:bg-orange-500 hover:text-white"
            }  duration-300 active:translate-y-0.5`}
            onClick={onWidthExtend}>
            <h1 className="text-sm">
              {widthInput === 0 ? (
                <span className="flex items-center gap-2">
                  <IoMdAdd /> Create New
                </span>
              ) : (
                "close"
              )}
            </h1>
          </button>
        </div>
      </header>
      <div>{searchTerm}</div>
      <section className="output-container">
        <header className="output-containerhead">
          {dateOptions.map((dateOptions) => {
            return (
              <li
                key={dateOptions}
                className={`weekdays + ${
                  themeMode === "light"
                    ? "bg-teal-950 text-white"
                    : "bg-gray-400 "
                } `}
                style={{
                  backgroundColor: currentDay === dateOptions ? "tomato" : "",
                }}>
                <p className="text-sm">{dateOptions}</p>
              </li>
            );
          })}
        </header>
        <section className=" input-output-box">
          <section className={`schedule--output`}>
            {sortedTasks.map((task) => {
              return <Output key={task.id} task={task} {...task} />;
            })}

            <div ref={endRef}></div>
          </section>
          <section
            className={`schedule--Input + ${
              widthInput === 0 ? " opacity-0" : " opacity-100"
            }`}
            style={{
              width: `${widthInput}`,
              transition: "all 0.4s ease-in-out",
            }}>
            {<Input inputWidth={widthInput} />}
          </section>
        </section>
      </section>
    </section>
  );
}
