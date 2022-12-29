import React, { useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";
import useProductList from "../../hooks/useProductList";
import ProductSuggestion from "../ProductSuggestion/ProductSuggestion";
import Footer from "../Shared/Footer";
import Header from "../Shared/Header";

const ProductDetails = () => {
  const { id } = useParams();
  const { loading, error, products } = useProductList();
  const [cartLoading, setCartLoading] = useState(false);
  const navigate = useNavigate();

  const { currentUser } = useAuth();

  // handle add to cart
  const handleAddToCart = async () => {
    const imgUrl = products[id].imgUrl;
    const title = products[id].title;
    const price = products[id].price;

    //create cart item along with all details
    let cartItem = {
      quantity: 1,
      id,
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
          setCartLoading(false);
          toast.success("Item added to cart, refresh to see changes!");
        } else {
          console.log("Cart: ", inserted);
          toast.success("Something went wrong");
          setCartLoading(false);
        }
      })
      .catch((error) => {
        setCartLoading(false);
        console.log("Cart FirebaseDatabaseError: ", error);
        toast.error("Add to cart Failed!!");
      });
  };

  return (
    <>
      <div className="container mx-auto">
        {/* Header menu */}
        <Header />

        {/* product details */}
        {!loading && Object.keys(products).length === 0 && (
          <div className="text-2xl">No Data Found!!</div>
        )}
        {error && (
          <div className="text-2xl text-red-500">There was as error!!</div>
        )}
        {loading ? (
          <div className="flex justify-center items-center">
            <ImSpinner2 className="animate-spin text-[#ff5659] font-extrabold text-5xl" />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 text-gray-600 lg:grid-cols-3">
            <img src={products[id].imgUrl} alt="" className="h-96 w-full" />
            <div className="space-y-2 lg:col-span-2">
              <h1 className="text-lg font-bold">{products[id].title}</h1>
              <p className="text-sm">{products[id].description}</p>
              <h6 className="font-bold">Brand : {products[id].brand}</h6>
              <h6 className="font-bold">${products[id].price}</h6>
              <div className="md:space-x-4 space-y-2">
                <button
                  className="border-2 border-gray-600 mr-2 font-semibold rounded p-2 hover:text-white hover:bg-gray-600"
                  onClick={() =>
                    navigate("/checkout", {
                      state: { productIds: [id] },
                    })
                  }
                >
                  Buy now
                </button>
                <button
                  className="rounded-md font-semibold border-2 border-gray-600 text-white bg-gray-600 p-2 hover:bg-gray-500 hover:border-gray-500"
                  onClick={handleAddToCart}
                  disabled={cartLoading}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Suggestion section */}
        {!loading && (
          <div className="my-10 mt-20 text-gray-600">
            <h1 className="font-bold text-2xl">RELATED PRODUCTS</h1>
            <ProductSuggestion />
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default ProductDetails;
