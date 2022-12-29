import React, { useState } from "react";
import { AiOutlineShopping } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { MdSpaceDashboard } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../contexts/AuthContext";
import useCartList from "../../hooks/useCartList";
import logo from "../../images/logo.png";
import Cart from "../Cart/Cart";

const Header = () => {
  const { cartLoading, cartError, cart, setCartReload } = useCartList();
  const [showCart, setShowCart] = useState(false);
  const [showDropDownMenu, setShowDropDownMenu] = useState(false);
  const { currentUser, logout } = useAuth();

  return (
    <>
      {/* This is an alert component to show user any kind of alert */}
      <ToastContainer position="top-center" />
      {/* main header part */}
      <nav className="py-2 flex justify-between">
        {/* Navbar logo part */}
        <Link to="/">
          <img src={logo} alt="Logo" className="w-14 cursor-pointer" />
        </Link>

        {/* Navbar menu part */}
        <div className="flex items-center space-x-5">
          {/* Navbar account section */}
          <div className="relative">
            {currentUser ? (
              <>
                <button
                  className="flex items-center hover:text-[#ff5659]"
                  onClick={() => setShowDropDownMenu(!showDropDownMenu)}
                >
                  <RxAvatar className="text-4xl" />
                  {currentUser.displayName}
                </button>
                {/* account dropdown menu */}
                <div
                  className={`absolute right-0 top-10 bg-white rounded-md shadow-lg font-semibold p-4 ${
                    showDropDownMenu ? "block" : "hidden"
                  }`}
                >
                  <div className="flex flex-col">
                    <Link
                      to="/dashboard"
                      className="flex items-center px-4 py-1 rounded-md text-gray-800 hover:bg-gray-200 hover:text-[#ff5659]"
                    >
                      <MdSpaceDashboard className="mr-2" />
                      Dashboard
                    </Link>
                    <button
                      className="flex items-center px-4 py-1 rounded-md text-gray-800 hover:bg-gray-200 hover:text-[#ff5659]"
                      onClick={logout}
                    >
                      <BiLogOut className="mr-2" /> Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <Link
                to="sign-in"
                className="px-5 py-2 border rounded-md font-semibold hover:bg-white hover:text-[#ff5659]"
              >
                Sign in
              </Link>
            )}
          </div>
          {/* Navbar account section end */}

          {/* Navbar Cart button */}
          {currentUser && (
            <button
              className="flex relative"
              onClick={() => {
                setCartReload(true);
                setShowCart(!showCart);
              }}
            >
              <AiOutlineShopping className="text-4xl hover:text-[#ff5659]" />
              <span className="absolute bg-rose-600 top-0 right-0 w-5 h-5 rounded-full flex items-center justify-center">
                {!cartLoading && !cartError && Object.keys(cart).length}
                {cartLoading && 0}
                {cartError && 0}
              </span>
            </button>
          )}
        </div>

        {/* Cart component */}
        <Cart showCart={showCart} setShowCart={setShowCart} />
      </nav>
    </>
  );
};

export default Header;
