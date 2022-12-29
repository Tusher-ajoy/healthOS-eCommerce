import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";
import useCartList from "../../hooks/useCartList";

const ProductCard = ({ productId, imgUrl, title, price }) => {
  const { setCartReload } = useCartList();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleAddToCart = async () => {
    //Check user is login. If login simply add to user cart otherwise navigate to login page
    if (currentUser) {
      setLoading(true);

      //create cart item along with all details
      let cartItem = {
        quantity: 1,
        productId,
        imgUrl,
        title,
        price,
      };
      cartItem["totalPrice"] = Number(price) * Number(cartItem.quantity);

      //sending to database
      const url = `https://ecommerce-dev-e0a61-default-rtdb.asia-southeast1.firebasedatabase.app/cart/cart-${currentUser.uid}.json`;
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cartItem),
      })
        .then((res) => res.json())
        .then((inserted) => {
          if (inserted.name) {
            setLoading(false);
            toast.success("Item added to cart, refresh to see changes!");
            setCartReload(true);
          } else {
            console.log("Cart: ", inserted);
            toast.success("Something went wrong");
            setLoading(false);
          }
        })
        .catch((error) => {
          setLoading(false);
          console.log("Cart FirebaseDatabaseError: ", error);
          toast.error("Add to cart Failed!!");
        });
    } else {
      navigate("/sign-in");
    }
  };
  return (
    <div className="p-5 cursor-pointer">
      {/* image section */}
      <div className="relative overflow-hidden">
        <img src={imgUrl} alt="" className="w-full h-64" />

        {/* show buy and cart button on image hover */}
        <div className="absolute mb-2 h-full w-full flex justify-around items-end -bottom-10 hover:bottom-0 opacity-0 hover:opacity-100 transition-all duration-300">
          <button
            className="rounded-md font-semibold text-gray-600 bg-white p-2 hover:text-[#ff5659]"
            onClick={() =>
              navigate("/checkout", {
                state: { productIds: [productId], totalPrice: price },
              })
            }
          >
            Buy now
          </button>
          <button
            className="rounded-md font-semibold text-white bg-gray-600 p-2 hover:text-[#ff5659]"
            onClick={handleAddToCart}
            disabled={loading}
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* title section */}
      <p className="text-xs text-gray-500 mt-4">Top Rated</p>
      <p
        className="text-gray-700 hover:underline"
        onClick={() => navigate(`/products/${productId}`)}
      >
        {title}
      </p>
      <p className="font-semibold">${price}</p>
    </div>
  );
};

export default ProductCard;
