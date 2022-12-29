import { getDatabase, ref, remove } from "firebase/database";
import React, { useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import useCustomerList from "../../../hooks/useCustomer";

const Customers = () => {
  const { customerLoading, customerError, customers, setCustomerReload } =
    useCustomerList();
  const [showModal, setShowModal] = useState(false);
  const [number, setNumber] = useState("+880");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClose = (e) => {
    if (e.target.id === "modalWrapper") setShowModal(false);
  };

  const db = getDatabase();
  const handleDelete = (id) => {
    remove(ref(db, `customers/${id}`));
    toast.success("customer deleted successfully!");
    setCustomerReload(true);
  };

  const handleAddCustomer = async (e) => {
    e.preventDefault();
    setLoading(true);
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
          setLoading(false);
          setShowModal(false);
          setCustomerReload(true);
          toast.success("Customer added successfully!");
        } else {
          console.log("Customer: ", inserted);
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log("Customer FirebaseDatabaseError: ", error);
        toast.error("Failed to create customer!");
      });
  };
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold mt-3 mb-8">CUSTOMER LIST</h1>

        <button
          onClick={() => setShowModal(true)}
          className="border-2 border-[#ff5659] text-[#ff5659] font-semibold px-3 py-2 rounded-md hover:bg-[#ff5659] hover:text-gray-200"
        >
          ADD CUSTOMER
        </button>
      </div>

      {/* Customers list table */}
      <div className="overflow-auto">
        <table className="w-full border-2 border-white rounded-lg">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="p-3 text-sm font-semibold text-left">No.</th>
              <th className="p-3 text-sm font-semibold text-left">Name</th>
              <th className="p-3 text-sm font-semibold text-left">Email</th>
              <th className="p-3 text-sm font-semibold text-left">Phone</th>
              <th className="p-3 text-sm font-semibold text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(customers).map((id, index) => (
              <tr key={id} className="even:bg-white">
                <td className="p-2">{++index}</td>
                <td className="p-2">{customers[id].name}</td>
                <td className="p-2">{customers[id].email}</td>
                <td className="p-2">{customers[id].number}</td>
                <td className="p-2">
                  <button
                    className="border-2 border-rose-600 text-rose-600 text-2xl p-1 rounded-md hover:bg-rose-600 hover:text-gray-100"
                    onClick={(e) => handleDelete(id)}
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}

            {!customerLoading && Object.keys(customers).length === 0 && (
              <tr className="text-2xl">
                <td>No Data Found!!</td>
              </tr>
            )}
            {customerError && (
              <tr className="text-2xl text-red-500">
                <td>There was as error!!</td>
              </tr>
            )}
            {customerLoading && (
              <tr>
                <td>
                  <ImSpinner2 className="animate-spin text-[#ff5659] font-extrabold text-3xl" />
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* add customer modal */}
        {showModal && (
          <div
            id="modalWrapper"
            className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
            onClick={handleClose}
          >
            <div className="w-[450px] bg-white py-2 px-4  rounded">
              <div className="text-xl font-semibold flex justify-between mb-4">
                <h3>Add a new customer</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-2xl font-semibold"
                >
                  X
                </button>
              </div>
              {/* from */}
              <form
                className="flex flex-col gap-4"
                onSubmit={handleAddCustomer}
              >
                <input
                  className="p-2 border-2 border-gray-600 rounded-md w-full"
                  type="tel"
                  name="phone"
                  pattern="^(?:(?:\+|00)88|01)?\d{11}"
                  title="Enter a valid Bangladeshi phone number"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  required
                />
                <input
                  className="p-2 border-2 border-gray-600 rounded-md w-full"
                  type="text"
                  name="name"
                  placeholder="name"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <input
                  className="p-2 border-2 border-gray-600 rounded-md w-full"
                  type="email"
                  name="email"
                  placeholder="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="border-2 border-gray-600 rounded-full text-gray-600 font-bold py-2 hover:bg-gray-600 hover:text-white"
                >
                  ADD
                </button>
              </form>
            </div>
          </div>
        )}
        {/* show spinner on loading */}
        {loading && (
          <div className="absolute top-0 left-0 bg-[#00000080] h-full w-full flex justify-center items-center">
            <ImSpinner2 className="animate-spin text-[#ff5659] font-extrabold text-5xl" />
          </div>
        )}
      </div>
    </>
  );
};

export default Customers;
