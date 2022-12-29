import { getDatabase, ref, remove } from "firebase/database";
import React, { useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";
import useProductList from "../../hooks/useProductList";
import Footer from "../Shared/Footer";
import Header from "../Shared/Header";

const Checkout = () => {
  const { products } = useProductList();
  const [number, setNumber] = useState("+880");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [onLoading, setOnLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);

  const { updateUserProfile, currentUser } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  //get total price and product ids
  const productIds = location?.state?.productIds;
  const totalPrice = location?.state?.totalPrice;
  let orderDescription = "";
  for (let i = 0; i < productIds.length; i++) {
    orderDescription = orderDescription + ", " + products[productIds[i]]?.title;
  }

  //handle checkout-from submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setOnLoading(true);

    /*                       **send all data to database**                               */

    //fetching for order
    await fetch(
      "https://ecommerce-dev-e0a61-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address: {
            city,
            country,
            street,
          },
          buyer: {
            name,
            email,
            number,
          },
          cost: totalPrice,
          orderDate: new Date(),
          productIds,
          orderDescription,
          status: "SHIPPED",
        }),
      }
    )
      .then((res) => res.json())
      .then((inserted) => {
        if (inserted.name) {
          setOnLoading(true);
        } else {
          console.log("order error :", inserted);
          setOnLoading(false);
          setFetchError(true);
        }
      })
      .catch((error) => {
        setOnLoading(false);
        console.log("Order FirebaseDatabaseError: ", error);
        setFetchError(true);
        toast.error("Failed to place order!");
      });

    //create customer if not in the database and update user
    if (!currentUser.displayName) {
      await updateUserProfile(name);
      await fetch(
        "https://ecommerce-dev-e0a61-default-rtdb.asia-southeast1.firebasedatabase.app/customers.json",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            number,
          }),
        }
      )
        .then((res) => res.json())
        .then((inserted) => {
          if (inserted.name) {
            setOnLoading(true);
          } else {
            console.log("Customer: ", inserted);
            setOnLoading(false);
            setFetchError(true);
          }
        })
        .catch((error) => {
          setOnLoading(false);
          console.log("Customer FirebaseDatabaseError: ", error);
          setFetchError(true);
          toast.error("Failed to create customer!");
        });
    }

    //after successfully place order navigate to home page with a successful message
    if (!fetchError) {
      const db = getDatabase();
      remove(ref(db, `cart/cart-${currentUser.uid}`));
      toast.success("Order placed successfully!");
      setOnLoading(false);
      navigate("/");
    }
  };
  return (
    <>
      <div className="container mx-auto">
        {/* Header menu */}
        <Header />

        <h1 className="text-3xl my-5 text-gray-500 font-bold text-center">
          SHIPPING INFORMATION
        </h1>

        {/* Checkout form */}
        <form
          className="flex flex-col gap-4 bg-gray-200 rounded-md p-5 my-5 drop-shadow-lg md:w-1/2 md:mx-auto"
          onSubmit={handleSubmit}
        >
          <input
            className="p-2 border rounded-md"
            type="text"
            name="name"
            placeholder="name"
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            className="p-2 border rounded-md"
            type="email"
            name="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="p-2 border rounded-md"
            placeholder="phone"
            type="tel"
            name="phone"
            pattern="^(?:(?:\+|00)88|01)?\d{11}"
            title="Enter a valid Bangladeshi phone number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
          />
          <input
            className="p-2 border rounded-md"
            type="text"
            name="country"
            placeholder="country"
            onChange={(e) => setCountry(e.target.value)}
            required
          />
          <input
            className="p-2 border rounded-md"
            type="text"
            name="city"
            placeholder="city"
            onChange={(e) => setCity(e.target.value)}
            required
          />
          <input
            className="p-2 border rounded-md"
            type="text"
            name="street"
            placeholder="street address"
            onChange={(e) => setStreet(e.target.value)}
            required
          />
          <p className="text-sm">
            Total payable amount :{" "}
            <span className="font-bold">${totalPrice}</span>
          </p>
          <button
            type="submit"
            className="rounded-md text-gray-800 border-2 border-gray-800 font-bold py-2 hover:text-white hover:bg-gray-800"
          >
            PLACE ORDER
          </button>
        </form>
        {/* Checkout form  end*/}
      </div>

      {/* show spinner on loading */}
      {onLoading && (
        <div className="absolute top-0 left-0 bg-[#00000080] h-full w-full flex justify-center items-center">
          <ImSpinner2 className="animate-spin text-[#ff5659] font-extrabold text-5xl" />
        </div>
      )}

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Checkout;
