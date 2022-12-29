import React, { useState } from "react";
import { BiHomeAlt, BiLogOut } from "react-icons/bi";
import { HiBars3CenterLeft, HiChevronDown } from "react-icons/hi2";
import { RxAvatar } from "react-icons/rx";
import { Link } from "react-router-dom";

import { useAuth } from "../../../contexts/AuthContext";

const Header = ({ showSidebar, setShowSidebar }) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const { currentUser, logout } = useAuth();
  return (
    <div className="flex justify-between items-center font-semibold py-2">
      <div>
        <HiBars3CenterLeft
          onClick={() => setShowSidebar(!showSidebar)}
          className="text-4xl cursor-pointer hover:text-[#ff5659]"
        />
      </div>

      <div
        className="flex items-center space-x-1 cursor-pointer hover:text-[#ff5659]"
        onClick={() => setShowDropDown(!showDropDown)}
      >
        <RxAvatar className="text-2xl" />
        <p>{currentUser.displayName}</p>
        <HiChevronDown className="text-xl" />
      </div>
      {/* Drop down menu */}
      <div
        className={`absolute right-2 top-10 bg-white rounded-md shadow-lg p-4 ${
          showDropDown ? "block" : "hidden"
        }`}
      >
        <div className="flex flex-col">
          <Link
            to="/"
            className="flex items-center px-4 py-1 rounded-md text-gray-800 hover:bg-gray-200 hover:text-[#ff5659]"
          >
            <BiHomeAlt className="mr-2" /> Home
          </Link>
          <Link
            onClick={logout}
            className="flex items-center px-4 py-1 rounded-md text-gray-800 hover:bg-gray-200 hover:text-[#ff5659]"
          >
            <BiLogOut className="mr-2" /> Logout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
