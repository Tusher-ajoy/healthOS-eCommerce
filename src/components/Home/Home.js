import React from "react";
import { ImSpinner2 } from "react-icons/im";
import { Link } from "react-router-dom";
import useProductList from "../../hooks/useProductList";
import banner from "../../images/banner.jpg";
import ProductCard from "../ProductCard/ProductCard";
import Footer from "../Shared/Footer";
import Header from "../Shared/Header";

const Home = () => {
  const { loading, error, products } = useProductList(8);
  return (
    <>
      {/* Home front part */}
      <div
        className="h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="container mx-auto text-white">
          {/* Header or navbar component */}
          <Header />

          {/*Front main part */}
          <div className="max-w-lg mt-32">
            <h1 className="text-4xl py-4 font-bold">Make Yourself at Home</h1>
            <p className="mb-8">
              We create{" "}
              <span className="font-bold text-[#ff5659]">
                HIGH QUALITY PRODUCTS
              </span>{" "}
              that are used & loved by thousands of customers
            </p>
            <Link
              className="px-5 py-2 border rounded-md font-semibold hover:bg-white hover:text-[#ff5659]"
              to="products"
            >
              DISCOVER NOW &#8594;
            </Link>
          </div>
        </div>
      </div>
      {/* Home front part end */}

      {/* Featured Products Section */}
      <div className="container mx-auto py-20 text-center">
        <h1 className="text-4xl text-black font-bold my-2">
          OUR FEATURED PRODUCTS
        </h1>
        <p className="text-black mb-4">
          Lorem quis bibendum auctor, nisi elit consequat ipsum
        </p>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {Object.keys(products).map((id) => (
            <ProductCard
              key={id}
              productId={id}
              imgUrl={products[id].imgUrl}
              title={products[id].title}
              price={products[id].price}
            />
          ))}

          {!loading && Object.keys(products).length === 0 && (
            <div className="text-2xl">No Data Found!!</div>
          )}
          {error && (
            <div className="text-2xl text-red-500">There was as error!!</div>
          )}
          {loading && (
            <div>
              <ImSpinner2 className="animate-spin text-[#ff5659] font-extrabold text-3xl" />
            </div>
          )}
        </div>
        {Object.keys(products).length >= 8 && (
          <Link
            className="px-5 py-2 border-2 border-black text-black rounded-md font-semibold hover:bg-black hover:text-[#ff5659]"
            to="products"
          >
            BROWSE MORE &#8594;
          </Link>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Home;
