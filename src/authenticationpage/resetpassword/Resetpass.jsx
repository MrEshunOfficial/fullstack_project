import { useState } from "react";

import { NavLink } from "react-router-dom";
import { AiFillEyeInvisible } from "react-icons/ai";
import { BiSolidShow } from "react-icons/bi";
import Generatepassword from "../Generatepassword";
import { useTheme } from "../../appContext/appContext";

export default function Resetpass() {
  const [seePassword, setSeePassword] = useState(false);
  const [paswordMatch, setPaswordMatch] = useState(false);
  const [showMatchingPassword, setShowMatchingPassword] = useState(false);

  const [resetDetail, setResetDetail] = useState([
    {
      newpassword: "",
      confirmPassword: "",
    },
  ]);

  const { themeMode } = useTheme();

  return (
    <section className="login-container">
      <div className="LoginPage ">
        <div
          className={`form--page border-r border-gray-400 ${
            themeMode === "light" ? "bg-teal-50" : "bg-inherit"
          }`}>
          <header className="loginHeader">
            <p>Provide new details</p>
            <h1>Password Reset</h1>
          </header>
          <form>
            <ul>
              <li>
                <label htmlFor="newpass">New password</label>
                <input
                  type={seePassword ? "text" : "password"}
                  name="newpass"
                  id="newpass"
                  placeholder="Enter new password"
                  maxLength={12}
                  pattern="[0-9a-zA-Z]"
                  value={resetDetail.password}
                  onChange={(e) => {
                    setResetDetail((prev) => ({
                      ...prev,
                      newpassword: e.target.value,
                    }));
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
                <label htmlFor="confNewPassword">Confirm Password</label>
                <input
                  type={seePassword ? "text" : "password"}
                  name="confNewPassword"
                  id="confNewPassword"
                  pattern="[0-9a-zA-Z]"
                  placeholder="Enter password again"
                  value={resetDetail.confirmPassword}
                  onChange={(e) => {
                    setResetDetail((prev) => ({
                      ...prev,
                      confirmPassword: e.target.value,
                    }));

                    e.target.value === resetDetail.newpassword
                      ? setPaswordMatch(true)
                      : setPaswordMatch(false);
                  }}
                  onKeyDown={() => {
                    setShowMatchingPassword(true);
                  }}
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
                  type="button"
                  disabled={!paswordMatch ? true : false}
                  className={`flex-1 h-11 rounded-lg bg-teal-950 text-white font-semibold duration-200 active:translate-y-0.5 hover:opacity-75 + ${
                    !paswordMatch ? " opacity-50" : "opacity-100"
                  }`}>
                  <NavLink to={"../Login"}>Submit</NavLink>
                </button>
                <button
                  type="reset"
                  className="flex-1 h-11 rounded-lg bg-orange-500 text-white font-semibold duration-200 active:translate-y-0.5 hover:opacity-75">
                  <NavLink to={"../Login"}>Back to Login</NavLink>
                </button>
              </li>
            </ul>
          </form>
        </div>
        <article className="page-two text-white">
          <Generatepassword />
        </article>
      </div>
    </section>
  );
}
