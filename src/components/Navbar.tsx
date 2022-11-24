import React from "react";
import logo from "../logo.svg";

const Navbar = () => {
  console.log("navbar render");
  return (
    <div>
      <div className="flex justify-center">
        <img src={logo} className="App-logo" alt="logo" />
      </div>
    </div>
  );
};

export default Navbar;
