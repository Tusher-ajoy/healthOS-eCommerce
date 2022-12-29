import { getDatabase, ref, remove, update } from "firebase/database";
import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";
import useCartList from "../../hooks/useCartList";

const CartItem = ({ item, id }) => {
  const { setCartReload } = useCartList();
  const { imgUrl, title, quantity, totalPrice, price } = item;
  let [productQuantity, setProductQuantity] = useState(Number(quantity));
  let [productTotalPrice, setProductTotalPrice] = useState(Number(totalPrice));

  const { currentUser } = useAuth();

  const db = getDatabase();

  const handleDelete = (id) => {
    if (currentUser) {
      remove(ref(db, `cart/cart-${currentUser.uid}/${id}`));
      toast.success("Item deleted, refresh to see changes!");
      setCartReload(true);
    }
  };

  const handleMinus = () => {
    if (productQuantity === 1) {
      toast.error("Product quantity can't be less then 1");
    } else {
      setProductQuantity(--productQuantity);
      setProductTotalPrice(productQuantity * price);
      update(ref(db, `cart/cart-${currentUser.uid}/${id}`), {
        quantity: productQuantity,
        totalPrice: productTotalPrice,
      });
    }
  };
  const handlePlus = () => {
    setProductQuantity(++productQuantity);
    setProductTotalPrice(productQuantity * price);
    update(ref(db, `cart/cart-${currentUser.uid}/${id}`), {
      quantity: productQuantity,
      totalPrice: productTotalPrice,
    });
  };

  return (
    <div className="flex justify-between space-x-3 items-start">
      <img src={imgUrl} alt="" className="w-44 h-32" />
      <div className="space-y-2">
        <div className="flex justify-between font-bold">
          <h1>{title}</h1>
          <AiOutlineClose
            className="text-xl cursor-pointer hover:text-[#ff5659]"
            onClick={() => handleDelete(id)}
          />
        </div>
        <div className="flex justify-between items-center">
          <div className="border px-3 py-2 space-x-2">
            <button onClick={handleMinus}>
              <AiOutlineMinus />
            </button>
            <span>{productQuantity}</span>
            <button onClick={handlePlus}>
              <AiOutlinePlus />
            </button>
          </div>
          <h2 className="font-bold">${productTotalPrice}</h2>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
