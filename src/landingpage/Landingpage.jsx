import "./Landingpage.css";
import { Routes, Route } from "react-router-dom";
import NavComponents from "./NavComponent";
import Setting from "../settingpage/Setting";
import Budget from "../budgetpage/Budget";
import Habit from "../Habitpage/Habit";
import SchedulePage from "../Schedulepage/container/SchedulePage";
import Shopping from "../shoppingpage/Shopping";
import Chatpage from "../Chatpage/ChatPage";
import Dashboard from "../dashboard/Dashboard";
import { ScheduleProvider } from "../appContext/appContext";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Landingpage() {
  const [schedules, setSchedules] = useState([]);

  const addTask = (task) => {
    setSchedules((prev) => [...prev, { id: uuidv4(), ...task }]);
  };

  const updateTask = (id, task) => {
    setSchedules((prev) =>
      prev.map((prevTask) => (prevTask.id === task.id ? task : prevTask))
    );
  };

  const deleteTask = (id) => {
    setSchedules((prev) => prev.filter((prevTask) => prevTask.id !== id));
  };

  const toggleCompleted = (id) => {
    setSchedules((prev) =>
      prev.map((prevTask) =>
        prevTask.id === id
          ? {
              ...prevTask,
              completed: !prevTask.completed,
              focused: false,
            }
          : prevTask
      )
    );
  };

  const urgentCheck = (id) => {
    setSchedules((prev) =>
      prev.map((prevTask) =>
        prevTask.id === id
          ? { ...prevTask, urgent: !prevTask.urgent }
          : prevTask
      )
    );
  };

  const focusChceck = (id) => {
    setSchedules((prev) =>
      prev.map((prevTask) =>
        prevTask.id === id
          ? { ...prevTask, focused: !prevTask.focused }
          : prevTask
      )
    );
  };

  // locale storage taskArray
  useEffect(() => {
    const schedules = JSON.parse(localStorage.getItem("schedules"));
    if (schedules && schedules.length > 0) {
      setSchedules(schedules);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("schedules", JSON.stringify(schedules));
  }, [schedules]);

  return (
    <ScheduleProvider
      ScheduleProvider
      value={{
        schedules,
        addTask,
        updateTask,
        deleteTask,
        toggleCompleted,
        urgentCheck,
        focusChceck,
      }}>
      <NavComponents>
        <Routes>
          <Route path="/*" element={<Dashboard />} />
          <Route path="/Setting/*" element={<Setting />} />
          <Route path="/Budget/*" element={<Budget />} />
          <Route path="/Habit/*" element={<Habit />} />
          <Route path="/SchedulePage/*" element={<SchedulePage />} />
          <Route path="/Shopping/*" element={<Shopping />} />
          <Route path="/Chatpage/*" element={<Chatpage />} />
        </Routes>
      </NavComponents>
    </ScheduleProvider>
  );
}
