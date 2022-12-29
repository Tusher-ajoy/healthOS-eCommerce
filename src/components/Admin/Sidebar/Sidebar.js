import React from "react";
import { FaClipboardList, FaList } from "react-icons/fa";
import { MdPeopleAlt, MdSpaceDashboard } from "react-icons/md";
import { Link } from "react-router-dom";
import logo from "../../../images/logo.png";

const Sidebar = ({ showSidebar }) => {
  return (
    <div
      className={`w-[300px] bg-white h-screen p-4 flex flex-col space-y-4 ${
        showSidebar ? "block md:hidden" : "hidden md:block"
      }`}
    >
      <img src={logo} alt="" className="w-1/2 mx-auto" />
      <Link
        to=""
        className="flex text-gray-700 items-center p-2 font-semibold rounded hover:bg-gray-200 hover:text-[#ff5659]"
      >
        <MdSpaceDashboard className="mr-2" /> Dashboard
      </Link>
      <Link
        to="customer-list"
        className="flex text-gray-700 items-center p-2 font-semibold rounded hover:bg-gray-200 hover:text-[#ff5659]"
      >
        <MdPeopleAlt className="mr-2" /> Customers List
      </Link>
      <Link
        to="order-list"
        className="flex text-gray-700 items-center p-2 font-semibold rounded hover:bg-gray-200 hover:text-[#ff5659]"
      >
        <FaClipboardList className="mr-2" /> Order List
      </Link>
      <Link
        to="product-list"
        className="flex text-gray-700 items-center p-2 font-semibold rounded hover:bg-gray-200 hover:text-[#ff5659]"
      >
        <FaList className="mr-2" /> Product List
      </Link>
    </div>
  );
};

export default Sidebar;
