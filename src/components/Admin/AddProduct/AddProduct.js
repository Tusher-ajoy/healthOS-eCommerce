import React, { useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState();
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    if (title && category && description && brand && price) {
      //image hosting
      const data = new FormData();
      data.append("image", image);
      const url = `https://api.imgbb.com/1/upload?key=5077cbc8e0bc6f12e02afbf19865c31f`;
      await fetch(url, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.success) {
            //get hosted image url
            const imgUrl = result.data.url;

            //send all data to database
            fetch(
              "https://ecommerce-dev-e0a61-default-rtdb.asia-southeast1.firebasedatabase.app/product.json",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  title,
                  imgUrl,
                  category,
                  description,
                  brand,
                  price,
                }),
              }
            )
              .then((res) => res.json())
              .then((inserted) => {
                if (inserted.name) {
                  setLoading(false);
                  toast.success("Product added successfully");
                  navigate("/dashboard/product-list");
                }
              })
              .catch((error) => {
                setLoading(false);
                console.log("FirebaseDatabaseError: ", error);
                toast.error("Failed to add product!");
              });
          }
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
          toast.error("Failed to upload image!");
        });
    }
  }

  return (
    <>
      <h1 className="text-3xl font-bold mt-3 mb-8">ADD A PRODUCT</h1>

      {/* show spinner on loading */}
      {loading && (
        <div className="absolute top-0 left-0 bg-[#00000080] h-screen w-screen flex justify-center items-center">
          <ImSpinner2 className="animate-spin text-[#ff5659] font-extrabold text-5xl" />
        </div>
      )}

      {/* add from */}
      <form className="md:w-1/2" onSubmit={handleSubmit}>
        <label htmlFor="title">Enter product title:</label>
        <input
          className="p-2 border rounded-md mb-3 w-full "
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          name="title"
          placeholder="title"
          required
        />
        <label htmlFor="title">Enter product image:</label>
        <input
          className="rounded-md mb-3 w-full cursor-pointer bg-white file:bg-gray-600 file:border-0 file:p-2 file:cursor-pointer file:text-gray-300 hover:file:bg-gray-500"
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          name="image"
          // required
        />

        <label htmlFor="category">Enter category:</label>
        <select
          className="p-2 border rounded-md mb-3 w-full"
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value=""></option>
          <option value="men">Men Product</option>
          <option value="women">Women Product</option>
        </select>

        <label htmlFor="description">Enter description:</label>
        <input
          className="p-2 border rounded-md mb-3 w-full"
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          name="description"
          placeholder="description"
          required
        />
        <label htmlFor="brand">Enter brand:</label>
        <input
          className="p-2 border rounded-md mb-3 w-full"
          onChange={(e) => setBrand(e.target.value)}
          type="text"
          name="brand"
          placeholder="brand"
          required
        />
        <label htmlFor="price">Enter price:</label>
        <input
          className="p-2 border rounded-md mb-3 w-full"
          onChange={(e) => setPrice(e.target.value)}
          type="number"
          name="price"
          placeholder="price"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="mb-4 border-2 border-gray-600 rounded-xl text-gray-600 font-semibold py-2 w-full hover:bg-gray-600 hover:text-white"
        >
          SUBMIT
        </button>
      </form>
    </>
  );
};

export default AddProduct;
