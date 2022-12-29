import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function useCartList() {
  const [cartLoading, setCartLoading] = useState(true);
  const [cartError, setCartError] = useState(false);
  const [cartReload, setCartReload] = useState(false);
  const [cart, setCart] = useState({});
  const { currentUser } = useAuth();

  useEffect(() => {
    //database related works
    async function fetchCart() {
      const db = getDatabase();

      const cartRef = ref(db, `cart/cart-${currentUser.uid}`);

      const cartQuery = query(cartRef, orderByKey());

      try {
        setCartError(false);
        setCartLoading(true);
        //request firebase database
        const snapshot = await get(cartQuery);
        setCartLoading(false);
        if (snapshot.exists()) {
          setCart({ ...snapshot.val() });
        } else {
          setCartError(false);
          setCartLoading(false);
          console.log("Database is empty");
          setCart({});
        }
      } catch (error) {
        console.log(error);
        setCartLoading(false);
        setCartError(true);
      }
    }
    currentUser && fetchCart();
    cartReload && fetchCart();
  }, [currentUser, cartReload]);
  return {
    cartLoading,
    cartError,
    cart,
    setCartReload,
  };
}
