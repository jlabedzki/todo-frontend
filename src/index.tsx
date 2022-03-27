import React from "react";
import ReactDOM from "react-dom";
import "./assets/index.css";
import App from "./App";
import axios from "axios";
import UserStateProvider from "./components/providers//UserStateProvider";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;

ReactDOM.render(
  <React.StrictMode>
    <UserStateProvider>
      <App />
    </UserStateProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
