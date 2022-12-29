import React from "react";
import { ImSpinner2 } from "react-icons/im";
import useOrderList from "../../../hooks/useOrderList";

const Orders = () => {
  const { ordersLoading, orderError, orders } = useOrderList();
  return (
    <>
      <h1 className="text-3xl font-bold mt-3 mb-8">ORDER LIST</h1>

      {/* Order list table */}
      <div className="overflow-auto">
        <table className="w-full border-2 border-white rounded-lg">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="p-3 text-sm font-semibold text-left">No.</th>
              <th className="p-3 text-sm font-semibold text-left">Details</th>
              <th className="p-3 text-sm font-semibold text-left">Status</th>
              <th className="p-3 text-sm font-semibold text-left">Date</th>
              <th className="p-3 text-sm font-semibold text-left">Price</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(orders).map((id, index) => (
              <tr key={id} className="even:bg-white">
                <td className="p-2">{++index}</td>
                <td className="p-2">{orders[id].orderDescription}</td>
                <td className="p-2">
                  <span
                    className={`p-1 rounded-sm ${
                      orders[id].status === "DELIVERED" && "bg-green-300"
                    } ${orders[id].status === "CANCELLED" && "bg-red-300"} ${
                      orders[id].status === "SHIPPED" && "bg-blue-300"
                    }`}
                  >
                    {orders[id].status}
                  </span>
                </td>
                <td className="p-2">
                  {new Date(orders[id].orderDate).toDateString()}
                </td>
                <td className="p-2">${orders[id].cost}</td>
              </tr>
            ))}

            {!ordersLoading && Object.keys(orders).length === 0 && (
              <tr className="text-2xl">
                <td>No Data Found!!</td>
              </tr>
            )}
            {orderError && (
              <tr className="text-2xl text-red-500">
                <td>There was as error!!</td>
              </tr>
            )}
            {ordersLoading && (
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

export default Orders;
