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
  return user ? children : navigate("/login");
}
function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login />} />
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
