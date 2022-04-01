import React from "react";
import ReactDOM from "react-dom";
import "./assets/index.scss";
import App from "./App";
import UserStateProvider from "./components/providers//UserStateProvider";
import { CookiesProvider } from "react-cookie";

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <UserStateProvider>
        <App />
      </UserStateProvider>
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
