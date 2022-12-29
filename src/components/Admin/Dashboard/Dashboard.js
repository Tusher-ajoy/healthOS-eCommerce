import React from "react";
import { FaChartLine, FaDollarSign, FaGift } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import useOrderList from "../../../hooks/useOrderList";
import useProductList from "../../../hooks/useProductList";
import RecentOrders from "../RecentOrders/RecentOrders";

const Dashboard = () => {
  const { loading, error, products } = useProductList();
  const { ordersLoading, orderError, orders } = useOrderList();

  // calculating total products
  const totalProducts = Object.keys(products).length;
  if (error) {
    console.log(error);
  }

  //calculating total sales
  let totalSales = 0;
  if (!ordersLoading && !orderError) {
    Object.keys(orders).map(
      (orderId) => (totalSales += Number(orders[orderId].cost))
    );
  }
  if (orderError) {
    console.log(orderError);
  }

  return (
    <>
      <h1 className="text-3xl font-bold mt-3 mb-8">DASHBOARD</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className=" bg-white flex justify-around items-center py-4 rounded">
          <div className="text-2xl">
            <h1 className="font-bold">
              {loading ? (
                <ImSpinner2 className="animate-spin text-[#ff5659] font-extrabold text-3xl" />
              ) : (
                totalProducts
              )}
            </h1>
            <h6>Products</h6>
          </div>
          <div className="bg-gray-200 p-2 rounded-full text-3xl">
            <FaGift className="text-[#ff5659]" />
          </div>
        </div>
        <div className=" bg-white  flex justify-around items-center py-4 rounded">
          <div className="text-2xl">
            <h1 className="font-bold">
              {ordersLoading ? (
                <ImSpinner2 className="animate-spin text-[#ff5659] font-extrabold text-3xl" />
              ) : (
                totalSales
              )}
            </h1>
            <h6>Sales</h6>
          </div>
          <div className="bg-gray-200 p-2 rounded-full text-3xl">
            <FaDollarSign className="text-[#ff5659]" />
          </div>
        </div>
        <div className=" bg-white  flex justify-around items-center py-4 rounded">
          <div className="text-2xl">
            <h1 className="font-bold">%25</h1>
            <h6>Increase</h6>
          </div>
          <div className="bg-gray-200 p-2 rounded-full text-3xl">
            <FaChartLine className="text-[#ff5659]" />
          </div>
        </div>
      </div>

      {/* Recent orders */}
      <RecentOrders />
    </>
  );
};

export default Dashboard;
