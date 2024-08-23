import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "react-calendar/dist/Calendar.css";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
