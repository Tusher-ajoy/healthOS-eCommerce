import {
  get,
  getDatabase,
  limitToFirst,
  orderByKey,
  query,
  ref,
} from "firebase/database";
import { useEffect, useState } from "react";

export default function useProductList(limit = null) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [productsReload, setProductsReload] = useState(false);
  const [products, setProducts] = useState({});
  useEffect(() => {
    //database related works
    async function fetchProducts() {
      const db = getDatabase();
      //if product id given return only one product otherwise whole product list;
      const productRef = ref(db, "product");

      const productQuery = limit
        ? query(productRef, orderByKey(), limitToFirst(limit))
        : query(productRef, orderByKey());

      try {
        setError(false);
        setLoading(true);
        //request firebase database
        const snapshot = await get(productQuery);
        setLoading(false);
        if (snapshot.exists()) {
          setProducts({ ...snapshot.val() });
        } else {
          setError(true);
          setLoading(false);
          console.log("Do not get any data");
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(true);
      }
    }
    fetchProducts();
    productsReload && fetchProducts();
  }, [limit, productsReload]);

  return {
    loading,
    error,
    products,
    setProductsReload,
  };
}
