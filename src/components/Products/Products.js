import React from "react";
import { ImSpinner2 } from "react-icons/im";
import useProductList from "../../hooks/useProductList";
import ProductCard from "../ProductCard/ProductCard";
import Footer from "../Shared/Footer";
import Header from "../Shared/Header";

const Products = () => {
  const { loading, error, products } = useProductList();
  return (
    <>
      <div className="container mx-auto">
        {/* Header menu */}
        <Header />

        <h1 className="text-gray-600 font-bold text-4xl text-center mb-5">
          All Products
        </h1>
        <hr />

        {/* main section */}
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
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Products;
