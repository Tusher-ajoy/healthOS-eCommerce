import { getDatabase, ref, remove } from "firebase/database";
import React from "react";
import { ImSpinner2 } from "react-icons/im";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import useProductList from "../../../hooks/useProductList";

const Products = () => {
  const { loading, error, products, setProductsReload } = useProductList();

  const db = getDatabase();
  const handleDelete = (id) => {
    remove(ref(db, `product/${id}`));
    toast.success("Product deleted successfully!");
    setProductsReload(true);
  };
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold mt-3 mb-8">PRODUCT LIST</h1>

        <Link
          to="/dashboard/add-product"
          className="border-2 border-[#ff5659] text-[#ff5659] font-semibold px-3 py-2 rounded-md hover:bg-[#ff5659] hover:text-gray-200"
        >
          ADD PRODUCT
        </Link>
      </div>

      {/* Product list table */}
      <div className="overflow-auto">
        <table className="w-full border-2 border-white rounded-lg">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="p-3 text-sm font-semibold text-left">No.</th>
              <th className="p-3 text-sm font-semibold text-left">Title</th>
              <th className="p-3 text-sm font-semibold text-left">Image</th>
              <th className="p-3 text-sm font-semibold text-left">Category</th>
              <th className="p-3 text-sm font-semibold text-left">Brand</th>
              <th className="p-3 text-sm font-semibold text-left">Price</th>
              <th className="p-3 text-sm font-semibold text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(products).map((id, index) => (
              <tr key={id} className="even:bg-gray-300">
                <td className="p-2">{++index}</td>
                <td className="p-2">{products[id].title}</td>
                <td className="p-2 text-green-500">
                  <img src={products[id].imgUrl} alt="" className="w-10 h-10" />
                </td>
                <td className="p-2">{products[id].category} Cloths</td>
                <td className="p-2">{products[id].brand}</td>
                <td className="p-2">${products[id].price}</td>
                <td className="p-2">
                  <button
                    className="border-2 border-rose-600 text-rose-600 text-2xl p-1 rounded-md hover:bg-rose-600 hover:text-gray-100"
                    onClick={() => handleDelete(id)}
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
            {!loading && Object.keys(products).length === 0 && (
              <tr className="text-2xl">
                <td>No Data Found!!</td>
              </tr>
            )}
            {error && (
              <tr className="text-2xl text-red-500">
                <td>There was as error!!</td>
              </tr>
            )}
            {loading && (
              <tr>
                <td>
                  <ImSpinner2 className="animate-spin text-[#ff5659] font-extrabold text-3xl" />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Products;
