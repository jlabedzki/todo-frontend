import React from "react";
import ReactDOM from "react-dom";
import "./assets/index.scss";
import App from "./App";
import AuthProvider from "./context/AuthProvider";
import { CookiesProvider } from "react-cookie";

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
