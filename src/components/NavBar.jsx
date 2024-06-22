import React, { useContext, useRef, useState } from "react";
import logo1 from "../assets/Logo_1.png";
import { AuthContext } from "../ContextApi/AuthContext";
import { Link } from "react-router-dom";
function NavBar() {
  const { user } = useContext(AuthContext);
  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  }
  return (
    <div className="w-full  items-center sticky top-0 z-10 ">
      <nav className="navbar navbar-expand-lg w-full text-center flex flex-col gap-10 md:justify-between pl-10 pr-[200px] py-10 bottom-2 bg-white shadow-md md:flex-row">
        <span className="text-3xl font-bold md:text-start">
          <Link to="/">
            <img src={logo1} alt="logo" className="w-[150px]" />
          </Link>
        </span>
        <div className="flex gap-3 items-center  md:text-start">
          <span className=" hover:text-primary ">
            <a href="#">How it works</a>
          </span>
          {user?.userName && (
            <button
              onClick={handleLogout}
              className="btn bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary"
            >
              Logout
            </button>
          )}
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
//
