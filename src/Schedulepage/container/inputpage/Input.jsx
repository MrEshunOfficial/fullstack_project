/* eslint-disable react/prop-types */
import "./Input.css";
import { IoCloseSharp } from "react-icons/io5";
import { BsFillCalendarDateFill } from "react-icons/bs";
import moment from "moment";
import Calendar from "react-calendar";
import { useState } from "react";
import { FaTasks } from "react-icons/fa";

import { UseSchedule } from "../../../appContext/appContext";
import { useTheme } from "../../../appContext/appContext";

export default function Input(props) {
  // const currentDate = moment().format("dddd, MMMM D");
  const [showCallender, setShowCallender] = useState(false);
  const [showDays, setShowdays] = useState(false);
  const [showRepeatDate, setShowRepeatDate] = useState(false);
  const [hideRepeat, setHideRepeat] = useState(false);

  const [calenderDate, setCalenderDate] = useState(new Date());
  const [repeatCalenderDate, setRepeatCalenderDate] = useState(new Date());
  const [repeatDate, setRepeatDate] = useState("");

  const onDateChanged = (calenderDate) => {
    setCalenderDate(calenderDate);
    setShowCallender((prev) => !prev);
  };
  const onRepeatChanged = (repeatCalenderDate) => {
    setRepeatCalenderDate(repeatCalenderDate);
    setHideRepeat((prev) => !prev);
  };

  const [hour, setHout] = useState("");
  const [minutes, setMinutes] = useState("");

  const timeValue = `${hour}:${minutes}`;
  const scheduleTime = moment(timeValue, "HH:mm").format("HH:mm A");

  const [repeathour, setrepeatHour] = useState("");
  const [repeatminutes, setrepeatMinutes] = useState("");

  const repeatimeValue = `${repeathour}:${repeatminutes}`;
  const repeatscheduleTime = moment(repeatimeValue, "HH:mm").format("HH:mm A");

  const reminderHours = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23,
  ];

  const reminderMinutes = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
    40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58,
    59,
  ];

  const repeatArray = [
    { id: Math.random(), title: "None", name: "repeat" },
    { id: Math.random(), title: "daily", name: "repeat" },
    { id: Math.random(), title: "weekly", name: "repeat" },
    { id: Math.random(), title: "monthly", name: "repeat" },
    { id: Math.random(), title: "Select days", name: "repeat" },
    { id: Math.random(), title: "Select date", name: "repeat" },
  ];
  const scheduleType = [
    { id: Math.random() * 5, Type: "Daily Routine", name: "schedule-type" },
    { id: Math.random() * 5, Type: "Appointment", name: "schedule-type" },
    { id: Math.random() * 5, Type: "Events", name: "schedule-type" },
  ];

  const repeatDays = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];
  const taskManagerArray = ["Category", "Title", "Task", "Venue"];

  const [taskCategory, setTaskCategory] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [taskName, setTaskName] = useState("");
  const [taskVenue, setTaskVenue] = useState("");

  const [components, setComponent] = useState([
    {
      ComName: "cateGory",
      id: 1,
      state: true,
    },
    { ComName: "titleComp", id: 2, state: false },
    { ComName: "taskCom", id: 3, state: false },
    { ComName: "venueComp", id: 4, state: false },
  ]);

  const onStateChange = (index) => {
    setComponent(
      components.map((item, i) => {
        item.state = false;
        if (index === i) {
          return { ...item, state: !item.state };
        }
        return item;
      })
    );
  };

  // const dateCreated = moment().format("dddd, MMMM D");

  const repeatDaysArray = [];
  const { onWidthExtend } = useTheme();
  const { addTask } = UseSchedule();
  const [taskType, settaskType] = useState("");

  const submitValues = (e) => {
    e.preventDefault();
    addTask({
      calenderDate: calenderDate.toDateString(),
      repeatCalenderDate: repeatCalenderDate.toDateString(),
      repeatDate: repeatDate,
      repeatDaysArray: [repeatDaysArray],
      scheduleTime: scheduleTime,
      repeatscheduleTime: repeatscheduleTime,
      taskCategory: taskCategory,
      taskTitle: taskTitle,
      taskName: taskName,
      taskVenue: taskVenue,
      dateCreated: moment().format("dddd, MMMM D"),
      taskType: taskType,
      completed: false,
      urgent: false,
      focused: false,
    });
    onWidthExtend();
    props.handleScrollToItem();
  };

  return (
    <>
      <div className="w-full h-12 flex items-center justify-between p-2 border-b border-gray-500 text-2xl">
        <strong>Add Schedule</strong>
        <strong
          className="duration-300 flex items-center justify-center border w-9 h-9 rounded-full shadow-xl hover:bg-orange-500 hover:text-white active:translate-y-0.5"
          onClick={onWidthExtend}>
          <IoCloseSharp />
        </strong>
      </div>
      <section className=" input-content">
        <header className="sub-header">
          <strong>Schedule Type </strong>
          <div className="event--types">
            {scheduleType.map((item, index) => {
              return (
                <div key={index}>
                  <input
                    type="radio"
                    id={item.id}
                    name={item.name}
                    value={item.Type}
                    onChange={(e) => {
                      settaskType(e.target.value);
                    }}
                  />
                  <label htmlFor={item.id}>{item.Type}</label>
                </div>
              );
            })}
          </div>
        </header>
        <div className="reminder">
          <strong>Reminder Date & Time</strong>
          <div className="event--reminder">
            <div
              className="date-label duration-300 active:translate-y-0.5"
              onClick={() => {
                setShowCallender((prev) => !prev);
              }}>
              <label htmlFor="eventDate">
                <BsFillCalendarDateFill />
              </label>
              <div className="calender-box">
                <span>{calenderDate.toDateString()}</span>
              </div>
            </div>
            <div className="time--label">
              <div className=" flex-1 flex items-center justify-center px-1 gap-2">
                <h1>Hour: </h1>
                <select
                  onChange={(e) => {
                    setHout(e.target.value);
                  }}>
                  {reminderHours.map((item) => {
                    return (
                      <option value={item} key={item}>
                        {item}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className=" flex-1 flex border-l-2 items-center justify-center px-1 gap-2">
                <h1>Minute: </h1>
                <select
                  onChange={(e) => {
                    setMinutes(e.target.value);
                  }}>
                  {reminderMinutes.map((item) => {
                    return (
                      <option value={item} key={item}>
                        {item}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className=" px-1 flex-1 flex border-l-2 items-center justify-center">
                <span>{scheduleTime}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="calender">
          {showCallender && (
            <Calendar onChange={onDateChanged} value={calenderDate} />
          )}
        </div>
        <div className="repeat-task">
          <h1>Repeat Schedule </h1>
          <ul className="repeat--days">
            {repeatArray.map((element, index) => {
              return (
                <li key={index}>
                  <input
                    type="radio"
                    id={element.id}
                    name={element.name}
                    value={element.title}
                    onChange={(e) => {
                      setRepeatDate(e.target.value);
                      element.title === "Select days"
                        ? setShowdays(true)
                        : setShowdays(false);

                      element.title === "Select date"
                        ? setShowRepeatDate(true)
                        : setShowRepeatDate(false);
                    }}
                  />
                  <label htmlFor={element.id}>{element.title}</label>
                </li>
              );
            })}
          </ul>
        </div>
        {showDays && (
          <div className="repeat-task">
            <strong>Days to Repeat </strong>
            <ul className="repeat--days">
              {repeatDays.map((element, index) => {
                return (
                  <li key={index}>
                    <input
                      type="checkbox"
                      id={index}
                      value={element.title} // Fixed
                      onChange={(e) => {
                        e.target.checked &&
                          repeatDaysArray.push(e.target.value);
                      }}
                    />
                    <label htmlFor={index}>{element.title}</label>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {showRepeatDate && (
          <div className="reminder">
            <strong>Repeat Date & Time</strong>
            <div className="event--reminder">
              <div
                className="repeatdate-label duration-300 active:translate-y-0.5"
                onClick={() => {
                  setHideRepeat((prev) => !prev);
                }}>
                <label htmlFor="eventDate">
                  <BsFillCalendarDateFill />
                </label>
                <div className="calender-box">
                  <span>{repeatCalenderDate.toDateString()}</span>
                </div>
              </div>
              <div className="repeattime--label">
                <div className=" flex-1 flex items-center justify-center px-1 gap-2">
                  <h1>Hour: </h1>
                  <select
                    onChange={(e) => {
                      setrepeatHour(e.target.value);
                    }}>
                    {reminderHours.map((item) => {
                      return (
                        <option value={item} key={item}>
                          {item}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className=" flex-1 flex border-l-2 items-center justify-center px-1 gap-2">
                  <h1>Minute: </h1>
                  <select
                    onChange={(e) => {
                      setrepeatMinutes(e.target.value);
                    }}>
                    {reminderMinutes.map((item) => {
                      return (
                        <option value={item} key={item}>
                          {item}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className=" px-1 flex-1 flex border-l-2 items-center justify-center">
                  <span>{repeatscheduleTime}</span>
                </div>
              </div>
            </div>
          </div>
        )}
        {hideRepeat && (
          <Calendar onChange={onRepeatChanged} value={repeatCalenderDate} />
        )}
        <header className="task-disc w-full h-12 mt-1 rounded flex items-center justify-center gap-6 text-sm">
          {taskManagerArray.map((item, index) => {
            return (
              <button
                type="button"
                key={index}
                onClick={() => {
                  onStateChange(index);
                }}>
                {item}
              </button>
            );
          })}
        </header>
        <div className="task-description">
          {components.map((item) => {
            return (
              item.state && (
                <div
                  key={item.id}
                  className=" w-full h-full flex items-center justify-center ">
                  {item.ComName === "cateGory" && (
                    <TaskCategory
                      taskCategory={taskCategory}
                      setTaskCategory={setTaskCategory}
                    />
                  )}
                  {item.ComName === "titleComp" && (
                    <TaskTitle
                      taskTitle={taskTitle}
                      setTaskTitle={setTaskTitle}
                    />
                  )}
                  {item.ComName === "taskCom" && (
                    <TaskComponents
                      taskName={taskName}
                      setTaskName={setTaskName}
                    />
                  )}
                  {item.ComName === "venueComp" && (
                    <Venue taskVenue={taskVenue} setTaskVenue={setTaskVenue} />
                  )}
                </div>
              )
            );
          })}
        </div>
      </section>
      <div className="w-full flex items-center justify-center p-2">
        <button
          onClick={submitValues}
          type="button"
          className=" duration-300 border w-1/4 h-12 rounded-full shadow-xl hover:bg-teal-950 hover:text-white active:translate-y-0.5">
          <strong>Submit</strong>
        </button>
      </div>
    </>
  );
}

// eslint-disable-next-line react/prop-types
function TaskCategory({ taskCategory, setTaskCategory }) {
  const Category = [
    { id: Math.random() * 100, taskGroup: "Academics", name: "cates" },
    { id: Math.random() * 100, taskGroup: "Work Schedule", name: "cates" },
    { id: Math.random() * 100, taskGroup: "Religious Activity", name: "cates" },
    { id: Math.random() * 100, taskGroup: "Personal Routines", name: "cates" },
  ];

  return (
    <>
      <div className="w-2/5 h-full flex flex-col items-center justify-center bg-slate-800  text-white">
        <strong className="w-full h-12 p-2 border-b text-left text-lg flex items-center gap-2">
          <FaTasks />
          Select Category
        </strong>

        <ul className="w-full flex items-center justify-start mt-10 flex-col flex-1 gap-2 border-white">
          {Category.map((item, index) => {
            return (
              <li
                key={index}
                className=" w-full h-10 flex items-center justify-start gap-4 p-2 border-b">
                <span className=" h-full ">
                  <input
                    type="radio"
                    id={item.id}
                    name={item.name}
                    value={item.taskGroup}
                    onChange={(e) => {
                      setTaskCategory(e.target.value);
                    }}
                  />
                </span>
                <label htmlFor={item.id} className="w-full h-full">
                  {item.taskGroup}
                </label>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex-1 h-full flex flex-col gap-2 items-center justify-center p-2 font-bold">
        <strong className=" w-full h-12 flex items-center justify-center">
          {taskCategory}
        </strong>
        <div className="w-full flex-1 flex flex-col items-center justify-center">
          <label
            htmlFor="taskCategory"
            className="w-full text-left flex items-center gap-2 mb-2">
            Enter Custome Category
          </label>
          <input
            type="text"
            name="taskCategory"
            id="taskCategory"
            value={taskCategory}
            onChange={(e) => {
              setTaskCategory(e.target.value);
            }}
            placeholder="please type a Category"
            className="rounded-md shadow-2xl p-2 w-full h-12 border bg-inherit focus:outline-none"
          />
        </div>
      </div>
    </>
  );
}
function TaskTitle({ taskTitle, setTaskTitle }) {
  const Title = [
    { id: Math.random() * 10, taskDisc: "Examination", name: "topic" },
    { id: Math.random() * 10, taskDisc: "Slides", name: "topic" },
    { id: Math.random() * 10, taskDisc: "Tutorials", name: "topic" },
    { id: Math.random() * 10, taskDisc: "Practicals", name: "topic" },
  ];
  return (
    <>
      <div className="w-2/5 h-full flex flex-col items-center justify-center bg-slate-800  text-white">
        <strong className="w-full h-12 p-2 border-b text-left text-lg flex items-center gap-2">
          <FaTasks />
          Select Title
        </strong>

        <ul className="w-full flex items-center justify-start mt-10 flex-col flex-1 gap-2 ">
          {Title.map((item) => {
            return (
              <li
                key={item.id}
                className=" w-full h-10 flex items-center justify-start gap-4 p-2 border-b">
                <span className=" h-full ">
                  <input
                    type="radio"
                    value={item.taskDisc}
                    id={item.id}
                    name={item.name}
                    onChange={(e) => {
                      setTaskTitle(e.target.value);
                    }}
                  />
                </span>
                <label htmlFor={item.id} className="w-full h-full">
                  {item.taskDisc}
                </label>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex-1 h-full flex flex-col items-center justify-center p-2 font-bold">
        <strong className=" w-full h-12 flex items-center justify-center">
          {taskTitle}
        </strong>
        <div className="w-full flex-1 flex flex-col items-center justify-center">
          <label
            htmlFor="taskTitle"
            className="w-full text-left flex items-center gap-2 mb-2">
            Enter Custome Title
          </label>
          <input
            type="text"
            name="taskTitle"
            id="taskTitle"
            value={taskTitle}
            onChange={(e) => {
              setTaskTitle(e.target.value);
            }}
            placeholder="please type a title"
            className="rounded-md shadow-2xl p-2 w-full h-12 border bg-inherit focus:outline-none"
          />
        </div>
      </div>
    </>
  );
}

function TaskComponents({ taskName, setTaskName }) {
  return (
    <>
      <div className="w-2/5 h-full flex flex-col items-center justify-center bg-black  text-white">
        <strong className="w-1/2 text-left text-2xl flex items-center gap-2">
          <FaTasks />
          Task
        </strong>
        <p className=" w-1/2 text-left text-nowrap">What do you want to do</p>
      </div>
      <div className="flex-1 h-full flex flex-col items-center justify-center p-2 font-bold">
        <strong className=" w-full h-12 flex items-center justify-center">
          {taskName}
        </strong>
        <div className="w-full flex-1 flex flex-col items-center justify-center">
          <label
            htmlFor="taskInput"
            className="w-full text-left flex items-center gap-2 mb-2">
            Enter Task
          </label>
          <input
            type="text"
            name="mainTask"
            id="mainTask"
            value={taskName}
            onChange={(e) => {
              setTaskName(e.target.value);
            }}
            placeholder="please type a task"
            className="rounded-md shadow-2xl p-2 w-full h-12 border bg-inherit focus:outline-none"
          />
        </div>
      </div>
    </>
  );
}
function Venue({ taskVenue, setTaskVenue }) {
  return (
    <>
      <div className="w-2/5 h-full flex flex-col items-center justify-center bg-black  text-white">
        <strong className="w-1/2 text-left text-2xl flex items-center gap-2">
          <FaTasks />
          Venue
        </strong>
        <p className=" w-1/2 text-left text-nowrap">Will will it take place?</p>
      </div>
      <div className="flex-1 h-full flex flex-col items-center justify-center p-2 font-bold">
        <strong className="  w-full h-12 flex items-center justify-center">
          {taskVenue}
        </strong>
        <div className="w-full flex-1 flex flex-col items-center justify-center">
          <label
            htmlFor="venue"
            className="w-full text-left flex items-center gap-2 mb-2">
            Enter Venue
          </label>
          <input
            type="text"
            name="venue"
            id="venue"
            value={taskVenue}
            onChange={(e) => {
              setTaskVenue(e.target.value);
            }}
            placeholder="please enter task venue e.g lecture Hall"
            className="rounded-md shadow-2xl p-2 w-full h-12 border bg-inherit focus:outline-none"
          />
        </div>
      </div>
    </>
  );
}
