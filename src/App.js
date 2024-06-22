import React, { useEffect, createContext, useState, useContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AskQuestion from "./pages/AskQuestion";
import SingleQuestion from "./pages/SingleQuestion";
import { AuthContext } from "./ContextApi/AuthContext";
function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const storedUser = localStorage.getItem("user");
  const parsedUser = storedUser ? JSON.parse(storedUser) : null;
  //return user.userName ? children : navigate("/login");
  useEffect(() => {
    if (!user || !parsedUser?.userName) {
      console.log("User not found");
      return navigate("/login");
    }
  }, [user, navigate]);

  //return user.userName ? children : null;
  return children;
}
function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          // <ProtectedRoute>
          <Home />
          // </ProtectedRoute>
        }
      />
      <Route
        path="/question/:id"
        element={
          <ProtectedRoute>
            <SingleQuestion />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ask"
        element={
          <ProtectedRoute>
            <AskQuestion />
          </ProtectedRoute>
        }
      />
      <Route
        path="*"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
