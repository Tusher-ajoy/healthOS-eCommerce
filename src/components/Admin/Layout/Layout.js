import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

// Admin dashboard layout
const Layout = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <div className="w-full h-screen flex bg-gray-200 text-gray-700">
      {/* Sidebar components */}
      <Sidebar showSidebar={showSidebar} />

      {/* main content */}
      <div className="w-full px-2">
        {/* Header menu */}
        <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        <ToastContainer position="top-center" />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
