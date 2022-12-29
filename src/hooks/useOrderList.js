import {
  get,
  getDatabase,
  limitToLast,
  orderByKey,
  query,
  ref,
} from "firebase/database";
import { useEffect, useState } from "react";

export default function useOrderList(limit = null) {
  const [ordersLoading, setOrderLoading] = useState(true);
  const [orderError, setOrderError] = useState(false);
  const [orders, setOrders] = useState({});
  useEffect(() => {
    //database related works
    async function fetchOrders() {
      const db = getDatabase();

      const orderRef = ref(db, "orders");

      // const orderQuery = query(orderRef, orderByKey());
      const orderQuery = limit
        ? query(orderRef, orderByKey(), limitToLast(limit))
        : query(orderRef, orderByKey());

      try {
        setOrderError(false);
        setOrderLoading(true);
        //request firebase database
        const snapshot = await get(orderQuery);
        setOrderLoading(false);
        if (snapshot.exists()) {
          setOrders({ ...snapshot.val() });
        } else {
          setOrderError(true);
          setOrderLoading(false);
          console.log("Do not get any data");
        }
      } catch (error) {
        console.log(error);
        setOrderLoading(false);
        setOrderError(true);
      }
    }
    fetchOrders();
  }, [limit]);

  return {
    ordersLoading,
    orderError,
    orders,
  };
}
