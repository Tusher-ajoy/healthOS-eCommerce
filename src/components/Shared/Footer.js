import React from "react";
import logo from "../../images/logo.png";

const Footer = () => {
  return (
    <div className="bg-black py-10">
      <div className="container py-5 text-gray-400 mx-auto grid grid-cols-1 gap-4 md:grid-cols-4 items-center">
        <div>
          <img src={logo} className="w-20" alt="" />
          <p>
            Fringilla urna porttitor rhoncus dolor purus luctus venenatis lectus
            magna fringilla diam maecenas ultricies mi eget mauris.
          </p>
        </div>
        <div className="flex flex-col">
          <h5 className="text-white font-semibold text-lg">About us</h5>
          <a href="#career">Career</a>
          <a href="#stores">Our stores</a>
          <a href="#trams">Trams & Conditions</a>
          <a href="#privacy">Privacy Policy</a>
        </div>
        <div className="flex flex-col">
          <h5 className="text-white font-semibold text-lg">Customer care</h5>
          <a href="#help">Help Center</a>
          <a href="#order">Track your order</a>
          <a href="#bulk-order">Corporate & Bulk Purchase</a>
          <a href="#return">Returns & Refund</a>
        </div>
        <div>
          <h5 className="text-white font-semibold text-lg">Contact us</h5>
          <p>Sonar Bengali resident, Godabagh, Keraniganj, Dhaka-1310</p>
          <p>Email: tusherajoy@gmail.com</p>
          <p>+880 171 6044001</p>
        </div>
      </div>
      <hr />
      <p className="mt-5 text-center text-gray-400">
        eCommerce © 2022. All Rights Reserved
      </p>
    </div>
  );
};

export default Footer;
