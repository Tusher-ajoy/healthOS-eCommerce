import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import { useEffect, useState } from "react";

export default function useCustomerList() {
  const [customerLoading, setCustomerLoading] = useState(true);
  const [customerError, setCustomerError] = useState(false);
  const [customerReload, setCustomerReload] = useState(false);
  const [customers, setCustomers] = useState({});
  useEffect(() => {
    //database related works
    async function fetchCustomers() {
      const db = getDatabase();

      const orderRef = ref(db, "customers");

      const orderQuery = query(orderRef, orderByKey());

      try {
        setCustomerError(false);
        setCustomerLoading(true);
        //request firebase database
        const snapshot = await get(orderQuery);
        setCustomerLoading(false);
        if (snapshot.exists()) {
          setCustomers({ ...snapshot.val() });
        } else {
          setCustomerError(true);
          setCustomerLoading(false);
          console.log("Do not get any data");
        }
      } catch (error) {
        console.log(error);
        setCustomerLoading(false);
        setCustomerError(true);
      }
    }
    fetchCustomers();
    customerReload && fetchCustomers();
  }, [customerReload]);

  return {
    customerLoading,
    customerError,
    customers,
    setCustomerReload,
  };
}
