import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { ImSpinner2 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import useCartList from "../../hooks/useCartList";
import CartItem from "../CartItem/CartItem";

const Cart = ({ showCart, setShowCart }) => {
  const { cartLoading, cartError, cart } = useCartList();
  const navigate = useNavigate();
  if (cartError) {
    console.log("Error in Cart: ", cartError);
  }
  let productIds = [];
  let totalPrice = 0;
  if (!cartError && !cartLoading) {
    for (let id in cart) {
      productIds.push(cart[id].productId);
      totalPrice += cart[id].totalPrice;
    }
  }
  return (
    <>
      {/* Cart shadow part */}
      <div
        onClick={() => setShowCart(!showCart)}
        className={`absolute inset-0 w-full h-full bg-gray-900 opacity-50 duration-500 ease-in transition-all ${
          showCart ? "" : "invisible"
        }`}
      ></div>

      {/* Cart main part */}
      <div
        className={`absolute w-96 h-screen overflow-y-scroll p-5 space-y-4 bg-white text-gray-500 right-0 top-0 duration-500 ease-in transition-all ${
          showCart ? "" : "invisible"
        }`}
      >
        {cartLoading ? (
          <div className="flex justify-center items-center">
            <ImSpinner2 className="animate-spin text-[#ff5659] font-extrabold text-5xl" />
          </div>
        ) : (
          <>
            <div className="flex justify-between">
              <h2 className="text-xl font-bold">
                SHOPPING BAG ({Object.keys(cart).length})
              </h2>
              <AiOutlineClose
                className="text-3xl cursor-pointer hover:text-[#ff5659]"
                onClick={() => setShowCart(!showCart)}
              />
            </div>
            {Object.keys(cart).map((id) => (
              <CartItem key={id} item={cart[id]} id={id} />
            ))}
            <hr />
            <button
              onClick={() =>
                navigate("/checkout", {
                  state: { productIds, totalPrice },
                })
              }
              className="py-2 px-5 rounded-sm bg-gray-700 text-white w-full hover:bg-gray-600 hover:text-gray-100"
            >
              CHECKOUT
            </button>
          </>
        )}

        {/* show spinner on loading */}
      </div>
    </>
  );
};

export default Cart;
