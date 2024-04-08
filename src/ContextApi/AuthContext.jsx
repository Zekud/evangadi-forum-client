import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosConfig from "../Config/axiosConfig";
export const AuthContext = createContext();
function AuthContextProvider({ children }) {
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
    } catch (error) {
      //console.log(error.response.data.msg);
      navigate("/login");
    }
  }

  useEffect(() => {
    checkUser();
  }, [Authorization]);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
