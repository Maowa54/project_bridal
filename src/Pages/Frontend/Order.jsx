import { useState, useEffect } from "react";
import Navbar from "../../Component/Frontend/Navbar";
import Footer from "../../Component/Frontend/Footer";

const Order = () => {
  const [products, setProducts] = useState([]);
  const [deliveryCharge, setDeliveryCharge] = useState(0);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(storedProducts);
  }, []);

  const increment = (index) => {
    const updatedProducts = [...products];
    updatedProducts[index].count += 1;
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts)); // Update localStorage
  };

  const decrement = (index) => {
    const updatedProducts = [...products];
    if (updatedProducts[index].count > 1) {
      updatedProducts[index].count -= 1;
      setProducts(updatedProducts);
      localStorage.setItem("products", JSON.stringify(updatedProducts)); // Update localStorage
    }
  };

  const totalPrice = products.reduce((acc, product) => {
    const productTotalPrice =
      (product.price - (product.discount_amount ?? 0)) * product.count;
    return acc + productTotalPrice;
  }, 0);

  const totalAmountWithDelivery = totalPrice + deliveryCharge;

  const handleDeliveryChange = (e) => {
    const charge = e.target.value === "insideDhaka" ? 60 : 100;
    setDeliveryCharge(charge);
  };

  const handleRemoveProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4">
        <div className="w-[90%] mx-auto">
          <div className="flex flex-col lg:flex-row mt-5 space-y-5 lg:space-y-0 lg:space-x-8">
            {/* Responsive table */}
            <div className="overflow-x-auto w-full lg:w-[70%]">
              <table className="min-w-full bg-white  rounded overflow-hidden text-sm md:text-base text-nowrap shadow-md">
                <thead className="">
                  <tr className="bg-gray-100 text-gray-700  border-b">
                    <th className="py-2 px-4 min-w-[220px]  text-left ">
                      Product
                    </th>
                    <th className="py-2 px-4 text-center">Price</th>
                    <th className="py-2 px-4  text-center">Discount</th>
                    <th className="py-2 px-4  text-center">Quantity</th>
                    <th className="py-2 px-4 text-center">Total</th>
                    <th className="py-2 px-4  text-center rounded-tr-lg">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="text-xs md:text-sm">
                  {products.map((product, index) => {
                    const count = product.count ?? 1; // Assume count is part of product or default to 1
                    const productTotalPrice =
                      (product.price - (product.discount_amount ?? 0)) * count; // Calculate individual product total

                    return (
                      <tr key={index} className="hover:bg-gray-50  border-b">
                        <td className="p-2 flex items-center w-[200px]">
                          <img
                            src={`https://expressitplus.co.uk/public/storage/product/${product?.image}`}
                            className="size-20"
                            alt={product?.name}
                          />
                          <div className="text-xs md:text-sm">
                            <span className="mb-1 text-sm md:text-base font-semibold pl-2">
                              {product.name}
                            </span>
                            <span className="block pl-2">
                              Brand: {product.brand}
                            </span>
                            <span className="block pl-2">
                              Color: {product.color}
                            </span>
                          </div>
                        </td>
                        <td className="py-2 px-4 border-b text-center">
                          {product.price}৳
                        </td>
                        <td className="py-2 px-4 border-b text-center">
                          {product.discount_amount
                            ? `${product.discount_amount}৳`
                            : "N/A"}
                        </td>
                        <td>
                          <div className="flex items-center justify-center">
                            <button
                              onClick={() => decrement(index)}
                              className="h-7 w-7 text-base font-semibold bg-black text-white hover:bg-gray-800 flex items-center justify-center"
                            >
                              -
                            </button>
                            <span className="h-7 w-7 text-base font-medium flex items-center justify-center border border-black">
                              {product.count}
                            </span>
                            <button
                              onClick={() => increment(index)}
                              className="h-7 w-7 text-base font-semibold bg-black text-white hover:bg-gray-800 flex items-center justify-center"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="py-2 px-4 border-b text-center">
                          {productTotalPrice}৳
                        </td>
                        <td className="py-2 px-4 border-b text-center">
                          <button>
                            <i
                              className="px-4 text-red-500 fas fa-trash"
                              onClick={() => handleRemoveProduct(index)}
                            ></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Responsive form */}
            <div className="w-full lg:w-[30%] mb-2 text-sm md:text-base">
              <form className="bg-white shadow-md rounded-lg px-2 py-2">
                <h2 className="text-sm md:text-base font-bold mb-1">
                  Order Delivery Details
                </h2>
                <div className="mb-2">
                  <label
                    className="block text-gray-700 md:text-sm text-xs font-bold mb-2"
                    htmlFor="recipientName"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="recipientName"
                    placeholder="Enter recipient's name"
                    className="shadow appearance-none border md:text-sm text-xs rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-2">
                  <label
                    className="block text-gray-700 md:text-sm text-xs font-bold mb-2"
                    htmlFor="phoneNumber"
                  >
                    Phone No
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    placeholder="Enter phone number"
                    className="shadow appearance-none border md:text-sm text-xs rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-1">
                  <label
                    className="block text-gray-700 md:text-sm text-xs font-bold mb-2"
                    htmlFor="address"
                  >
                    Delivery Address
                  </label>
                  <textarea
                    id="address"
                    placeholder="Enter delivery address"
                    className="shadow appearance-none border md:text-sm text-xs rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  ></textarea>
                </div>

                {/* Delivery Charge Selection */}
                <div className="mb-2">
                  <span className="block text-gray-700 md:text-sm text-xs font-bold mb-2">
                    Delivery Charge
                  </span>
                  <div className="text-nowrap grid grid-cols-1 md:grid-cols-2 md:text-sm text-xs">
                    <label className="inline-flex items-center mr-4">
                      <input
                        type="radio"
                        className="form-radio required"
                        name="deliveryCharge"
                        value="insideDhaka"
                        required
                        onChange={handleDeliveryChange}
                      />
                      <span className="ml-1">Inside Dhaka-60</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio required"
                        name="deliveryCharge"
                        value="outsideDhaka"
                        required
                        onChange={handleDeliveryChange}
                      />
                      <span className="ml-1">Outside Dhaka-100</span>
                    </label>
                  </div>
                </div>

                <div className="mb-3">
                  <label
                    className="block text-gray-700 md:text-sm text-xs font-bold mb-2"
                    htmlFor="paymentMethod"
                  >
                    Payment Method
                  </label>
                  <select
                    id="paymentMethod"
                    className="shadow border md:text-sm text-xs rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  >
                    <option value="" disabled selected>
                      Select an option
                    </option>
                    <option value="cashOnDelivery">Cash on Delivery</option>
                    <option value="prepaid">Prepaid</option>
                  </select>
                </div>

                {/* Summary Section */}
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <h3 className="font-bold mb-2">Order Summary</h3>
                  <p className="flex justify-between">
                    <span>Total Price:</span>
                    <span>{totalPrice}৳</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Delivery Charge:</span>
                    <span>{deliveryCharge}৳</span>
                  </p>

                  <hr className="border border-gray-400 my-2" />
                  <p className="flex justify-between font-bold">
                    <span>Total Amount:</span>
                    <span>{totalAmountWithDelivery}৳</span>
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="text-center mt-4">
                  <button
                  
                    type="submit"
                    className="bg-gradient-to-r from-teal-500 to-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Place Order
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Order;
