import React from "react";
import { Link } from "react-router-dom";
import notFound from "../../images/notFound.jpg";

const NotFound = () => {
  return (
    <div
      className="h-screen bg-cover bg-center flex justify-center items-center"
      style={{ backgroundImage: `url(${notFound})` }}
    >
      <Link
        className="px-8 py-3 rounded-md font-semibold bg-black text-white hover:bg-white hover:border hover:text-[#ff5659]"
        to="/"
      >
        &#8592; GO BACK
      </Link>
    </div>
  );
};

export default NotFound;
