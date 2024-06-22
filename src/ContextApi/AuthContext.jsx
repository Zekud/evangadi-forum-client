import React, { createContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axiosConfig from "../Config/axiosConfig";

export const AuthContext = createContext();
function AuthContextProvider({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const Authorization = localStorage.getItem("token");
  const [user, setUser] = useState({});
  async function checkUser() {
    if (!Authorization) return navigate("/login");

    try {
      const { data } = await axiosConfig.get("/users/checkUser", {
        headers: {
          Authorization: `Bearer ${Authorization}`,
        },
      });
      setUser(data);
      delete data.userId;
      localStorage.setItem("user", JSON.stringify(data));
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  }

  useEffect(() => {
    checkUser();
  }, [Authorization, navigate, location.pathname]);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
