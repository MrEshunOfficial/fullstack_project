import { useRef, useState } from "react";
import "./Signup.css";
import { NavLink, useNavigate } from "react-router-dom";
import { AiFillEyeInvisible } from "react-icons/ai";
import { BiSolidShow } from "react-icons/bi";
import Generatepassword from "../Generatepassword";
import { useTheme } from "../../appContext/appContext";

export default function Signup() {
  const [paswordMatch, setPaswordMatch] = useState(false);
  const [seePassword, setSeePassword] = useState(false);
  const [generatePassword, setGeneratePassword] = useState(false);
  const [showMatchingPassword, setShowMatchingPassword] = useState(false);

  const { themeMode } = useTheme();

  const newPasswordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const navigateUser = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    const formData = new formData(e.target);
    const { Username, userMail, Password, confirmPassword } =
      Object.fromEntries(formData);

    console.log(Username);

    navigateUser("../Login");
  };
  const [userDetails, setUserDetails] = useState([
    {
      // Username: "",
      // userMail: "",
      // Password: "",
      // confirmPassword: "",
    },
  ]);
  return (
    <section className="login-container">
      <div className="LoginPage ">
        <div
          className={`form--page border-r + ${
            themeMode === "light" ? "bg-teal-50" : "bg-inherit "
          }`}>
          <header className="loginHeader">
            <p>Provide details</p>
            <h1>Signup</h1>
          </header>
          <form onSubmit={handleSignup}>
            <ul>
              <li>
                <label htmlFor="userName">Full Name</label>
                <input
                  type="text"
                  name="Username"
                  id="userName"
                  placeholder="enter your full name"
                  value={userDetails.name}
                  onChange={(e) => {
                    setUserDetails((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }));
                  }}
                />
              </li>
              <li>
                <label htmlFor="userMail">Enter Mail</label>
                <input
                  type="email"
                  name="userMail"
                  id="userMail"
                  placeholder="user@gmail.com"
                  value={userDetails.email}
                  onChange={(e) => {
                    setUserDetails((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }));
                  }}
                />
              </li>
              <li>
                <label htmlFor="Password">
                  Password
                  <button
                    type="button"
                    className=" duration-150 text-sm text-gray-500 hover:opacity-75 active:translate-y-0.5"
                    onClick={() => {
                      setGeneratePassword((prev) => !prev);
                    }}>
                    {generatePassword
                      ? "Close generator"
                      : "Click to generate a new password"}
                  </button>
                </label>
                <input
                  type={seePassword ? "text" : "password"}
                  name="Password"
                  id="Password"
                  minLength={8}
                  maxLength={12}
                  placeholder="Enter your password"
                  value={userDetails.password}
                  onChange={(e) => {
                    setUserDetails((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }));
                    e.target.value === userDetails.confirmPassword
                      ? setPaswordMatch(true)
                      : setPaswordMatch(false);
                  }}
                  ref={newPasswordRef}
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
                <label htmlFor="CPassword">Confirm Password</label>
                <input
                  type={seePassword ? "text" : "password"}
                  name="confirmPassword"
                  id="CPassword"
                  placeholder="Enter password Again"
                  value={userDetails.confirmPassword}
                  onChange={(e) => {
                    setUserDetails((prev) => ({
                      ...prev,
                      confirmPassword: e.target.value,
                    }));

                    e.target.value === userDetails.password
                      ? setPaswordMatch(true)
                      : setPaswordMatch(false);
                    e.target.value === ""
                      ? setShowMatchingPassword(false)
                      : setShowMatchingPassword(true);
                  }}
                  ref={confirmPasswordRef}
                />
              </li>

              {showMatchingPassword && (
                <li>
                  {!paswordMatch && (
                    <span className="text-orange-600">
                      Password do not match
                    </span>
                  )}
                  {paswordMatch && (
                    <span className="text-green-600">Password matches</span>
                  )}
                </li>
              )}
              <li
                style={{ display: "flex", flexDirection: "row" }}
                className=" gap-2">
                <button
                  type="submit"
                  disabled={!paswordMatch ? true : false}
                  className={`flex-1 h-11 rounded-lg bg-teal-950 text-white font-semibold duration-200 active:translate-y-0.5 hover:opacity-75 + ${
                    !paswordMatch ? " opacity-50" : "opacity-100"
                  }`}>
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
                  position: "relative",
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
        <div className="page-two text-white">
          {!generatePassword && (
            <>
              <h1 className="text-4xl font-semibold">Let go together...!</h1>
              <p className="w-3/4 text-center text-balance my-4">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae
                dolor nemo libero necessitatibus deleniti illum adipisci,
                quibusdam.
              </p>
              <p className=" flex items-center justify-center gap-2">
                Have an account already?
                <NavLink
                  to={"../Login"}
                  className={"text-orange-500 hover:underline"}>
                  Login Instead
                </NavLink>
              </p>
            </>
          )}
          {generatePassword && <Generatepassword />}
        </div>
      </div>
    </section>
  );
}
