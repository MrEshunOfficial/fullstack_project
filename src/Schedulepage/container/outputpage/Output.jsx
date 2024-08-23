/* eslint-disable react/prop-types */
import { FaTasks } from "react-icons/fa";

import { FaTag } from "react-icons/fa";
// import { BiCategory } from "react-icons/bi";
import { LuAlarmCheck } from "react-icons/lu";
import { BsCalendar2Date } from "react-icons/bs";
import { MdCategory } from "react-icons/md";
import { TbCalendarRepeat } from "react-icons/tb";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaLayerGroup } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";

// import moment from "moment";
import { FaRegSave } from "react-icons/fa";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { HiOutlineShare } from "react-icons/hi";
import { BsPrinter } from "react-icons/bs";
import { MdCenterFocusStrong } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import "./Output.css";
import { useState, useEffect, useRef, useCallback } from "react";
import { CiPlay1 } from "react-icons/ci";
import { CiPause1 } from "react-icons/ci";
import { RxReset } from "react-icons/rx";

import { UseSchedule } from "../../../appContext/appContext";
import { useTheme } from "../../../appContext/appContext";
// import moment from "moment";

export default function Output(props) {
  const [editprops, setEditprops] = useState(false);

  const [newTask, setNewTask] = useState(props.task.taskName);

  const { updateTask, deleteTask, toggleCompleted, urgentCheck, focusChceck } =
    UseSchedule();

  const handleEdit = () => {
    updateTask(props.task.id, { ...props.task, taskName: newTask });
    setEditprops(!editprops);
  };

  const onComplete = () => {
    toggleCompleted(props.id);
  };

  const handleDelete = () => {
    deleteTask(props.id);
  };

  const handleUrgent = () => {
    urgentCheck(props.id);
  };
  const onFocus = () => {
    focusChceck(props.id);
    clearInterval(timeInterval);
    setIsPlaying(false);
    onResetTimer();
  };

  const { themeMode } = useTheme();

  // const currentTime = moment().format("HH:mm A");

  const editActiveRef = useRef(null);
  const onTaskEdit = () => {
    setEditprops((prev) => !prev);
    editActiveRef.current.select();
  };

  const [targetHour, setTargetHour] = useState(0);
  const [targetMin, setTargetMin] = useState(0);
  const [timeInterval, setTimeInterval] = useState(null);
  const [timer, setTimer] = useState(0);

  const [isPlaying, setIsPlaying] = useState(false);
  const [focusTargetInput, setFocusTargetInput] = useState(false);

  const startTimer = () => {
    setTimeInterval(
      setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 500)
    );

    setIsPlaying((prev) => !prev);
    setFocusTargetInput(true);
  };

  const onPauseTimer = () => {
    clearInterval(timeInterval);
    setIsPlaying((prev) => !prev);
  };

  const onResetTimer = useCallback(() => {
    setTimer(0);
    setTimeCovered(0);
  }, []);

  const [timeCovered, setTimeCovered] = useState(0);

  useEffect(() => {
    if (timer >= 60) {
      setTimeCovered((prev) => prev + 1);
      setTimer(0);
    } else if (timeCovered === targetHour && timer === targetMin) {
      clearInterval(timeInterval);
      setTimer(0);
      setTimeCovered(0);
    }
  }, [onResetTimer, targetHour, targetMin, timeCovered, timeInterval, timer]);

  return (
    <div
      className={`taskComponent + ${
        props.completed ? " opacity-50" : "opacity-100"
      } + ${props.urgent ? " urgent--style " : ""} + 
      ${
        themeMode === "light"
          ? " border-b border-gray-600"
          : "border-b border-gray-300"
      }`}>
      <div
        className={`sm:hidden event-title + ${
          props.urgent ? " bg-orange-600" : " bg-slate-700 "
        }`}>
        <p>
          <span>
            <FaLayerGroup className="w-4 h-4" />
            <span className=" font-semibold">Type: </span>
          </span>
          <strong>{props.taskType}</strong>
        </p>
        <p>
          <span>
            <MdCategory className="w-4 h-4" />
            <span className=" font-semibold">Category: </span>
          </span>
          <strong>{props.taskCategory}</strong>
        </p>
        <p>
          <span>
            <FaTag className="w-4 h-4" />
            <span className=" font-semibold">Title: </span>
          </span>
          <strong>{props.taskTitle}</strong>
        </p>
      </div>
      <div className=" task-description ">
        <div className="task">
          <div className="w-full flex items-center justify-start gap-2 capitalize">
            <span className=" flex items-center justify-start gap-2">
              <FaTasks />
              props:
            </span>
            {!editprops && (
              <strong className=" flex-1">{props.taskName}</strong>
            )}
            {editprops && (
              <form
                action="post"
                className=" flex-1"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleEdit();
                }}>
                <input
                  type="text"
                  name="editprops"
                  id="editprops"
                  value={newTask}
                  placeholder={props.taskName}
                  onChange={(e) => {
                    setNewTask(e.target.value);
                  }}
                  readOnly={!editprops}
                  ref={editActiveRef}
                  className="w-full p-2 indent-2 rounded-md border focus:outline-none font-medium bg-inherit"
                />
              </form>
            )}
            <button
              className={`edit-task + ${
                props.completed ? "opacity-50" : "opacity-100"
              }`}
              disabled={props.completed ? true : false}
              onClick={onTaskEdit}>
              {!editprops ? <AiOutlineEdit /> : <FaRegSave />}
            </button>
          </div>
        </div>

        <div className="task-reminder">
          <p className="w-max p-1 flex flex-col items-start ">
            <span className="flex items-center justify-start gap-1  font-semibold border-l-4 px-1 border-blue-400">
              <LuAlarmCheck />
              Venue
            </span>
            <span
              className={`reminders + ${
                themeMode === "light" ? " text-gray-600" : "text-gray-300"
              } + ${props.urgent ? "text-white" : ""}`}>
              {props.taskVenue}
            </span>
          </p>
          <p className="w-max p-1 flex flex-col items-start">
            <span className="flex items-center justify-start gap-1  font-semibold border-l-4 px-1 border-blue-400">
              <LuAlarmCheck />
              Due Time
            </span>
            <span
              className={`reminders + ${
                themeMode === "light" ? " text-gray-600" : "text-gray-300"
              } + ${props.urgent ? "text-white" : ""}`}>
              {props.scheduleTime}
            </span>
          </p>
          <p className="w-max p-1 flex flex-col items-start">
            <span className="flex items-center justify-start gap-1 font-semibold border-l-4 px-1 border-blue-400">
              <BsCalendar2Date />
              Schedule date
            </span>
            <span
              className={`reminders + ${
                themeMode === "light" ? " text-gray-600" : "text-gray-300"
              } + ${props.urgent ? "text-white" : ""}`}>
              {props.calenderDate}
            </span>
          </p>
          <p className="w-max p-1 flex flex-col items-start">
            <span className="flex items-center justify-start gap-1 font-semibold border-l-4 px-1 border-blue-400">
              <TbCalendarRepeat /> Repeat Schedule
            </span>
            <span
              className={`reminders + ${
                themeMode === "light" ? " text-gray-600" : "text-gray-300"
              } + ${props.urgent ? "text-white" : ""}`}>
              {props.repeatDate === "Select date"
                ? props.repeatCalenderDate + "@" + props.repeatscheduleTime
                : props.repeatDate === "Select days"
                ? [...props.repeatDaysArray]
                : props.repeatDate}
            </span>
          </p>
        </div>
      </div>
      <div className=" task--management ">
        <div className="flex flex-col justify-between w-full h-16 relative">
          <strong className="h-6 p-1 text-xs">
            Created on:
            {props.dateCreated}
          </strong>
          {props.focused && !focusTargetInput ? (
            <form className="focus-container">
              <div className=" flex-1 flex items-center justify-between text-sm">
                <strong>Set Target: </strong>
                <div className="w-max flex items-center justify-start gap-1">
                  <label htmlFor="Target">hrs: {targetHour}</label>
                  <input
                    type="range"
                    name="Target"
                    id="Target"
                    min={0}
                    max={12}
                    defaultValue={0}
                    value={targetHour}
                    onChange={(e) => {
                      setTargetHour(e.target.value);
                    }}
                  />
                </div>
                <div className="w-max flex items-center justify-end gap-1">
                  <label htmlFor="Target">min: {targetMin}</label>
                  <input
                    type="range"
                    name="Target"
                    id="Target"
                    defaultValue={0}
                    value={targetMin}
                    min={0}
                    max={59}
                    onChange={(e) => {
                      setTargetMin(e.target.value);
                    }}
                  />
                </div>
                <span className="start" onClick={startTimer}>
                  <MdCenterFocusStrong />
                </span>
              </div>
            </form>
          ) : props.focused && focusTargetInput ? (
            <div className="focus-container">
              <div className=" w-max flex items-center justify-start text-sm gap-1">
                <span>Target:</span> <span>{targetHour} hrs</span>,
                <span>{targetMin} mins</span>
              </div>
              <div className=" flex-1 flex items-center justify-center text-nowrap text-sm">
                <span>{timeCovered} hrs</span>, <span>{timer} mins</span>
              </div>
              <div className=" w-max flex items-center justify-end gap-2">
                {!isPlaying ? (
                  <span className="play" onClick={startTimer}>
                    <CiPlay1 />
                  </span>
                ) : (
                  <span className="pause" onClick={onPauseTimer}>
                    <CiPause1 />
                  </span>
                )}

                <span className="reset" onClick={onResetTimer}>
                  <RxReset />
                </span>
              </div>
              <span
                className="exit ml-2"
                onClick={() => {
                  onResetTimer();
                  setFocusTargetInput(false);
                  setIsPlaying(false);
                  clearInterval(timeInterval);
                }}>
                <MdCenterFocusStrong />
              </span>
            </div>
          ) : (
            <div className=" w-full flex items-center justify-center p-2 text-gray-400 font-semibold capitalize">
              focus on this task for a period of time
            </div>
          )}
        </div>
        <div className="container-box">
          <div className=" box-one">
            <span
              className=" flex items-center justify-center gap-1"
              onClick={onFocus}>
              <MdCenterFocusStrong
                className={` + ${isPlaying ? "onstartFocus" : " opacity-50"}`}
              />
              <span className="text-sm">
                {props.focused ? "Focus Active" : "Set to Focused "}
              </span>
            </span>
            <span
              className=" flex items-center justify-center "
              onClick={() => {
                handleUrgent();
              }}>
              {props.urgent ? (
                <span className=" flex items-center justify-start gap-1">
                  <FaStar />
                  <span className="text-sm">Urgent Schedule</span>
                </span>
              ) : (
                <span className=" flex items-center justify-start gap-1">
                  <FaRegStar />
                  <span className="text-sm">Normal Schedule</span>
                </span>
              )}
            </span>
            <span
              className=" flex items-center justify-center gap-1"
              onClick={() => {
                onComplete();
              }}>
              {props.completed ? (
                <span className=" flex items-center justify-start gap-1">
                  <FaCheckCircle />
                  <span className="text-sm">completed</span>
                </span>
              ) : (
                <span className=" flex items-center justify-start gap-1">
                  <MdOutlineRadioButtonUnchecked />
                  <span className="text-sm">Pending</span>
                </span>
              )}
            </span>
          </div>
          <ul
            className={`box-two  text-white + ${
              props.urgent ? " bg-orange-600" : " bg-slate-700"
            }`}>
            <li className="share">
              <HiOutlineShare />
            </li>
            <li className="print">
              <BsPrinter />
            </li>
            <li
              className={`delete ${
                props.urgent ? "hover:text-orange-200" : "hover:text-orange-500"
              }  duration-300`}
              onClick={handleDelete}>
              <AiOutlineDelete />
            </li>
            <li className="custome">
              <MdOutlineDashboardCustomize />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
