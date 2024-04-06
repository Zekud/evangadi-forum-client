import React from "react";
import logo2 from "../assets/Logo_2.png";
function Footer() {
  return (
    <div className="flex flex-col text-center gap-10 items-center w-full    bg-tertiary md:flex-row md:justify-between md:text-start p-10">
      <img src={logo2} alt="logo" />
      <p className="text-sm text-gray-400">
        Copyright © 2022. All rights reserved.
      </p>
      <span className="text-white flex flex-col">
        <h1 className="text-lg">Contact Info</h1>
        <p className="text-sm text-gray-400">Phone: +91 1234567890</p>
        <p className="text-sm text-gray-400">Email: 8QHj2@example.com</p>
        <p className="text-sm text-gray-400">
          Address: 123 Main Street, Anytown, USA
        </p>
      </span>
    </div>
  );
}

export default Footer;
