import { NavLink } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoSettingsSharp } from "react-icons/io5";
import { BiSolidData } from "react-icons/bi";
import { ImTarget } from "react-icons/im";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { MdLocalGroceryStore } from "react-icons/md";
import { IoIosChatboxes } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { useTheme } from "../appContext/appContext";
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";

import PropTypes from "prop-types";
NavComponents.propTypes = {
  children: PropTypes.node,
};

export default function NavComponents({ children }) {
  const navElement = [
    {
      icon: <MdDashboard />,
      id: uuidv4(),
      tittle: "Dashboard",
      path: "./Dashboard",
    },
    {
      icon: <RiCalendarScheduleFill />,
      id: uuidv4(),
      tittle: "Schedules",
      path: "./SchedulePage",
    },
    {
      icon: <BiSolidData />,
      id: uuidv4(),
      tittle: "My Budgets",
      path: "./Budget",
    },
    {
      icon: <ImTarget />,
      id: uuidv4(),
      tittle: "Habit Tracker",
      path: "./Habit",
    },
    {
      icon: <MdLocalGroceryStore />,
      id: uuidv4(),
      tittle: "Go Shopping",
      path: "./Shopping",
    },
    {
      icon: <IoIosChatboxes />,
      id: uuidv4(),
      tittle: "Conversations",
      path: "./Chatpage",
    },
    {
      icon: <IoSettingsSharp />,
      id: uuidv4(),
      tittle: "Setting",
      path: "./Setting",
    },
  ];

  const { themeMode, darkTheme, lightTheme } = useTheme();

  const [toggleOn, setToggleOn] = useState(false);

  const onThemeChange = () => {
    setToggleOn((prev) => !prev);
    if (themeMode === "light") {
      darkTheme();
    } else {
      lightTheme();
    }
  };

  const [extendwidth, setExtendwidth] = useState(false);

  return (
    <div className="landing--page">
      <nav
        className={`navigation + ${
          themeMode === "light" ? "light" : "dark"
        } + ${extendwidth ? "extend-css" : ""}`}>
        <div className=" flex items-center justify-start gap-2 w-full h-12 border-b border-gray-600 ">
          <span
            onClick={() => {
              setExtendwidth((prev) => !prev);
            }}>
            <GiHamburgerMenu />
          </span>
          <span className={`text-sm + ${extendwidth ? "hidden" : "flex"}`}>
            Dockris Productivity
          </span>
        </div>
        <div className="w-full flex flex-col items-start justify-center gap-2">
          {navElement.map((elements) => {
            return (
              <NavLink
                key={elements.id}
                to={elements.path}
                className={({ isActive }) =>
                  `flex items-center justify-start gap-2 h-11 w-full p-2 rounded-lg font-semibold + ${
                    isActive && themeMode === "dark"
                      ? "bg-teal-50 text-black"
                      : isActive && themeMode === "light"
                      ? "bg-teal-950 text-white"
                      : ""
                  }
                  }`
                }>
                <span className="text-xl">{elements.icon}</span>
                <span
                  className={`text-sm + ${extendwidth ? "hidden" : "flex"}`}>
                  {elements.tittle}
                </span>
              </NavLink>
            );
          })}
        </div>
        <div
          className="h-12 w-full flex items-center justify-center gap-4 border border-gray-500 rounded-full cursor-pointer hover:translate-y-0.5 duration-300"
          onClick={onThemeChange}>
          <span>
            {toggleOn ? (
              <MdDarkMode className="w-6 h-6" />
            ) : (
              <MdOutlineDarkMode className="w-6 h-6" />
            )}
          </span>
          <p>
            {themeMode === "light" ? (
              <span className={`text-md + ${extendwidth ? "hidden" : "flex"}`}>
                Light Mode
              </span>
            ) : (
              <span className={`text-md + ${extendwidth ? "hidden" : "flex"}`}>
                Dark Mode
              </span>
            )}
          </p>
        </div>
      </nav>
      <section className="page-container">{children}</section>
    </div>
  );
}
