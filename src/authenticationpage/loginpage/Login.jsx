/* eslint-disable react/prop-types */
import { useState } from "react";
import "./Login.css";
import { NavLink, useNavigate } from "react-router-dom";
import { AiFillEyeInvisible } from "react-icons/ai";
import { BiSolidShow } from "react-icons/bi";

import { useTheme } from "../../appContext/appContext";
import { toast } from "react-toastify";

export default function Login({ setLoggedIn }) {
  const [correctPassword, setCorrectPassword] = useState(false);
  const [seePassword, setSeePassword] = useState(false);

  const [loginDetails, setLoginDetails] = useState([
    {
      id: Date.now(),
      email: "",
      password: "",
    },
  ]);

  // const passwordCorrect = () => {};
  const { themeMode } = useTheme();
  const navigateUser = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    correctPassword && setLoggedIn(true);
    correctPassword ? toast.success("Success") : toast.error("Error");
    correctPassword && navigateUser("../../Landingpage");
  };

  return (
    <section className="login-container">
      <div className="LoginPage ">
        <div
          className={`form--page border-r + ${
            themeMode === "light" ? "bg-teal-50" : "bg-inherit "
          }`}>
          <header className="loginHeader ">
            <p>Provide Login details</p>
            <h1>Login</h1>
          </header>
          <form onSubmit={handleSubmit}>
            <ul>
              <li>
                <label htmlFor="userName">Email</label>
                <input
                  type="email"
                  name="userName"
                  id="userName"
                  value={loginDetails.email}
                  onChange={(e) => {
                    setLoginDetails((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }));
                  }}
                  placeholder="please enter your email address"
                />
              </li>
              <li>
                <label htmlFor="Password">Password</label>
                <input
                  type={seePassword ? "text" : "password"}
                  name="Password"
                  id="Password"
                  minLength={8}
                  maxLength={12}
                  placeholder="Enter your password"
                  value={loginDetails.password}
                  onChange={(e) => {
                    setLoginDetails((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }));

                    e.target.value === "DoQVADZa"
                      ? setCorrectPassword(true)
                      : setCorrectPassword(false);
                  }}
                />
                <span
                  className="view--password"
                  onClick={() => {
                    setSeePassword((prev) => !prev);
                  }}>
                  {seePassword ? (
                    <BiSolidShow className="w-5 h-5" />
                  ) : (
                    <AiFillEyeInvisible className="w-5 h-5" />
                  )}
                </span>
              </li>
              <li>
                {correctPassword ? (
                  <span className="text-green-600">Password Correct</span>
                ) : (
                  <span className="text-black text-xs">
                    Enter correct password
                  </span>
                )}
              </li>
              <li style={{ display: "flex", flexDirection: "row" }}>
                <div className=" flex flex-1 items-center justify-start gap-2">
                  <label htmlFor="keepme" style={{ width: "max-content" }}>
                    Keep me logged in
                  </label>
                  <input type="checkbox" name="keepme" id="keepme" />
                </div>
                <div className=" flex flex-1 items-center justify-end gap-2">
                  <span className=" w-max">Forgot your password?</span>
                  <NavLink
                    to={"../Resetpass"}
                    className={"hover:underline text-blue-600 text-md"}>
                    Click to Reset
                  </NavLink>
                </div>
              </li>
              <li
                style={{ display: "flex", flexDirection: "row" }}
                className=" gap-2">
                <button
                  type="submit"
                  disabled={!correctPassword ? true : false}
                  className="flex-1 h-11 rounded-lg bg-teal-950 text-white font-semibold duration-200 active:translate-y-0.5 hover:opacity-75">
                  Submit
                </button>
                <button
                  type="reset"
                  className="flex-1 h-11 rounded-lg bg-orange-500 text-white font-semibold duration-200 active:translate-y-0.5 hover:opacity-75">
                  Cancel
                </button>
              </li>

              <li
                className=""
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingTop: "10px",
                }}>
                <strong className="text-center capitalize text-sm">
                  or sign in with
                </strong>
                <button
                  type="button"
                  className="w-1/2 h-12 rounded-full border border-gray-500 font-semibold duration-200 active:translate-y-0.5 hover:opacity-85 mt-2">
                  Google
                </button>
              </li>
            </ul>
          </form>
        </div>
        <article className="page-two text-white">
          <h1 className="text-4xl font-semibold">Welcome Back, Friend</h1>
          <p className="w-3/4 text-center text-balance my-4">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae
            dolor nemo libero necessitatibus deleniti illum adipisci, quibusdam.
          </p>
          <p className=" flex items-center justify-center gap-2">
            {`You don't have an account yet?`}
            <NavLink
              to={"../Signup"}
              className={"text-yellow-500 hover:underline"}>
              Signup Instead
            </NavLink>
          </p>
        </article>
      </div>
    </section>
  );
}
