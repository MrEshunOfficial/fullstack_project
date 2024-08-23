/* eslint-disable react/prop-types */
import WelcomePage from "./landingpage/WelcomePage";
import Landingpage from "./landingpage/Landingpage";
import Login from "./authenticationpage/loginpage/Login";
import Signup from "./authenticationpage/signuppage/Signup";
// import { v4 as uuidv4 } from "uuid";
import { GrSupport } from "react-icons/gr";
import { IoCall } from "react-icons/io5";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { IoIosMore } from "react-icons/io";
import { useState, useEffect } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";
import { RiUserSearchFill } from "react-icons/ri";
import { IoMdLocate } from "react-icons/io";
import Profile from "./authenticationpage/profilepage/Profile";
import Resetpass from "./authenticationpage/resetpassword/Resetpass";
import User from "./userroutes/User";

import { ThemeProvider, useTheme } from "./appContext/appContext";
import Notification from "./notification/Notification";

export default function App() {
  const [themeMode, setThemeMode] = useState("light");
  const [widthInput, setWidthInput] = useState(0);

  const onWidthExtend = () => {
    setWidthInput(widthInput === 0 ? "40%" : 0);
  };

  const darkTheme = () => {
    setThemeMode("dark");
  };

  const lightTheme = () => {
    setThemeMode("light");
  };

  const [loggedIn, setLoggedIn] = useState(true);

  useEffect(() => {
    document.body.classList.remove("dark", "light");
    document.body.classList.add(themeMode);
  }, [themeMode]);

  return (
    <ThemeProvider
      value={{
        themeMode,
        darkTheme,
        lightTheme,
        widthInput,
        onWidthExtend,
      }}>
      <AppContent loggedIn={loggedIn}>
        <Routes>
          <Route
            path="/Login/*"
            element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
          />
          <Route path="/Signup/*" element={<Signup />} />
          <Route path="/Profile/*" element={<Profile />} />
          <Route path="/Resetpass" element={<Resetpass />} />
          <Route path="/User" element={<User />}>
            <Route path=":userId" element={<User />} />
          </Route>
          {loggedIn && <Route path="/*" element={<Landingpage />} />}
          {!loggedIn && (
            <Route path="/*" element={<WelcomePage loggedIn={loggedIn} />} />
          )}
        </Routes>
      </AppContent>
    </ThemeProvider>
  );
}

function AppContent({ children, loggedIn }) {
  const [moreSet, setMoreSet] = useState(false);
  const [height, setHeight] = useState(0);
  const [Userheight, setUserheight] = useState(0);
  const [toggleOn, setToggleOn] = useState(false);
  const { themeMode, darkTheme, lightTheme } = useTheme();

  return (
    <main className="main-container">
      <header className="app--mainHeader">
        {loggedIn ? (
          <NavLink to={"./Landingpage"}>
            <h1 className="text-xl font-bold ">Dockris</h1>
          </NavLink>
        ) : (
          <NavLink to={"./WelcomePage"}>
            <h1 className="text-xl font-bold ">Dockris</h1>
          </NavLink>
        )}

        <div className=" flex items-center justify-end gap-3">
          <button
            type="button"
            className=" duration-300 hover:bg-gray-300 w-8 h-8 rounded-full flex items-center justify-center active:translate-y-0.5"
            onClick={() => {
              setMoreSet((prev) => !prev);
              setHeight(height === 0 ? "18rem" : 0);
              setUserheight(0);
            }}>
            {moreSet ? (
              <MdExpandLess className="w-6 h-6" />
            ) : (
              <MdExpandMore className="w-6 h-6" />
            )}
          </button>
          <button
            type="button"
            className="flex items-center w-10 h-10 text-sm rounded-full active:translate-y-0.5 duration-200 hover:opacity-75"
            onClick={() => {
              setUserheight(Userheight === 0 ? "13rem" : 0);
              setHeight(0);
            }}>
            <img
              src="https://images.pexels.com/photos/20470051/pexels-photo-20470051/free-photo-of-bearded-brunette-in-sunglasses.jpeg?"
              alt="Avatar"
              className=" w-full h-full object-cover rounded-full"
            />
          </button>
        </div>
        <article
          className={`aboutMenu + ${
            Userheight === 0 ? "opacity-0" : "opacity-100"
          }`}
          style={{ height: `${Userheight}` }}>
          <div className="w-full p-2 border-b border-slate-400 flex items-center justify-between ">
            <strong>Dockris</strong>
            <button
              type="button"
              className=" bg-orange-500 text-white h-8 w-max px-2 rounded text-sm">
              {!loggedIn ? (
                <NavLink to={"./Login"}>Login</NavLink>
              ) : (
                <NavLink to={"./Login"}>Logout</NavLink>
              )}
            </button>
          </div>
          <ul className=" w-full flex items-center justify-between gap-4 my-2">
            <li>
              <img
                src="https://images.pexels.com/photos/20470051/pexels-photo-20470051/free-photo-of-bearded-brunette-in-sunglasses.jpeg?"
                alt="Avatar"
                className=" w-20 h-16 rounded-full"
              />
            </li>
            <li className=" flex flex-col w-full">
              <h1 className=" text-lg font-bold">
                {!loggedIn ? "Login to see details" : "Christopher Eshun"}
              </h1>
              <span className=" text-sm text-gray-400">
                {!loggedIn
                  ? "username@gmail.com"
                  : "christophereshun91@gmail.com"}
              </span>
              <span className="w-full text-start text-sm text-blue-400 mt-2 hover:underline duration-150 cursor-pointer">
                {!loggedIn && (
                  <NavLink to={"./Login"}>Login to view full profile</NavLink>
                )}
                {loggedIn && (
                  <NavLink to={"./Profile"}>view full profile</NavLink>
                )}
              </span>
            </li>
          </ul>
          <div className="w-full p-2 border-t border-slate-400 flex items-center justify-center ">
            <button className="w-1/2 flex items-center justify-center">
              {!loggedIn ? (
                <NavLink to={"./Signup"}>Register</NavLink>
              ) : (
                <NavLink to={"./Signup"}>add account</NavLink>
              )}
            </button>
          </div>
        </article>
        <article
          className={`aboutMenu + ${
            height === 0 ? "opacity-0" : "opacity-100"
          }`}
          style={{ height: `${height}` }}>
          <h1 className="w-full p-2 border-b border-slate-400 flex items-center justify-between ">
            <strong>Dockris</strong>
            <span className="flex items-center justify-end gap-3">
              <IoIosMore className=" hover:bg-gray-600 p-1 w-6 h-6 rounded-full" />
              <span
                onClick={() => {
                  setToggleOn((prev) => !prev);
                  themeMode === "light" ? darkTheme() : lightTheme();
                }}>
                {toggleOn ? (
                  <MdDarkMode className="w-5 h-5" />
                ) : (
                  <MdOutlineDarkMode className="w-5 h-5" />
                )}
              </span>
            </span>
          </h1>
          <ul className=" menu--lists">
            <li>
              <IoCall /> contact developer
            </li>
            <li>
              <GrSupport /> support/contribute
            </li>
            <li>
              <RiUserSearchFill /> about Dockris
            </li>
            <li>
              <IoMdLocate /> Locate Us
            </li>
          </ul>
          <div className="w-full p-2 border-t border-slate-400 flex items-center justify-center ">
            <button className="w-1/2 flex items-center justify-center">
              Close
            </button>
          </div>
        </article>
      </header>
      <section
        className={`child-components ${
          themeMode === "light" ? "light" : "dark"
        }`}>
        {children}
      </section>

      <Notification />
    </main>
  );
}
