import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./ContextApi/AuthContext";
import SnackBarContextProvider from "./ContextApi/SnackBarContext";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <SnackBarContextProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </SnackBarContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
