/* eslint-disable no-unused-vars */
import { createContext, useContext } from "react";

export const ThemeContext = createContext({
  themeMode: "light",
  darkTheme: () => {},
  lightTheme: () => {},
  widthInput: 0,
  onWidthExtend: () => {},
});

export const ThemeProvider = ThemeContext.Provider;
export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ScheduleContext = createContext({
  schedules: [
    {
      id: 1,
      calenderDate: "",
      repeatCalenderDate: "",
      repeatDate: "",
      repeatDaysArray: "",
      scheduleTime: "",
      repeatscheduleTime: "",
      taskCategory: "",
      taskTitle: "work",
      taskName: "go back",
      taskVenue: "",
      dateCreated: "",
      taskType: "",
      completed: false,
      urgent: false,
      focused: false,
    },
  ],

  addTask: (id) => {},
  updateTask: (id, task) => {},
  deleteTask: (id) => {},
  toggleCompleted: (id) => {},
  urgentCheck: (id) => {},
  focusChceck: (id) => {},
  // reminderCheck: (id) => {},
});

export const UseSchedule = () => {
  return useContext(ScheduleContext);
};

export const ScheduleProvider = ScheduleContext.Provider;
