import { useState } from "react";
import Payment from "../../Component/Frontend/Checkout/Payment";
import Count from "../../Component/Frontend/Count"; // Import Count component
import Navbar from "../../Component/Frontend/Navbar";
import Footer from "../../Component/Frontend/Footer";

const Order = () => {
  const [count, setCount] = useState(1); // Initial count value

  const handleCountChange = (newCount) => {
    setCount(newCount); // Update count in the Order component
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4">
        <div className="w-[90%] mx-auto">
          <div className="flex flex-col lg:flex-row mt-5 space-y-5 lg:space-y-0 lg:space-x-8">
            {/* Responsive table */}
            <div className="overflow-x-auto w-full lg:w-[70%]">
              <table className="min-w-full bg-white border border-gray-200 rounded-t-2xl overflow-hidden text-sm md:text-base text-nowrap shadow-md">
                <thead className="shadow">
                  <tr className="bg-gray-100 text-gray-700">
                    <th className="py-2 px-4 min-w-[220px] border-b text-left rounded-tl-lg">
                      Product
                    </th>
                    <th className="py-2  px-4 border-b text-center">Price</th>
                    <th className="py-2 px-4 border-b text-center">Discount</th>
                    <th className="py-2 px-4 border-b text-center">Count</th>
                    <th className="py-2 px-4 border-b text-center">Total</th>
                    <th className="py-2 px-4 border-b text-center rounded-tr-lg">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="text-xs md:text-sm">
                  {[...Array(4)].map((_, index) => (
                    <tr className="hover:bg-gray-50" key={index}>
                      <td className="py-2 px-4 border-b flex items-center">
                        <img
                          src="/assets/Images/Rectangle 41 (1).png" // Replace with your image URL
                          alt="Product"
                          className="w-16 h-16 object-cover mr-2"
                        />
                        <div className="text-xs md:text-sm">
                          <span className="block mb-1 text-sm md:text-base font-semibold">
                            Product Name
                          </span>
                          <span className="block">Brand: Product Brand</span>
                          <span className="block">Color: Product Color</span>
                        </div>
                      </td>
                      <td className="py-2 px-4 border-b text-center">100৳</td>
                      <td className="py-2 px-4 border-b text-center">0৳</td>
                      <td className="py-2 px-4 border-b text-center">
                        <Count
                          initialValue={count}
                          onCountChange={handleCountChange}
                        />
                      </td>
                      <td className="py-2 px-4 border-b text-center">100৳</td>
                      <td className="py-2 px-4 border-b text-center">
                        <i className="px-4 text-red-500 fas fa-trash"></i>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Responsive form */}
            <div className="w-full lg:w-[30%] mb-2 text-sm md:text-base">
              <form className="bg-white shadow-md rounded-lg px-2 py-2">
                {" "}
                {/* Reduced padding here */}
                <h2 className="text-sm md:text-base font-bold mb-1">
                  Order Delivery Details
                </h2>
                <div className="mb-2">
                  <label
                    className="block text-gray-700  md:text-sm text-xs  font-bold mb-2"
                    htmlFor="recipientName"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="recipientName"
                    placeholder="Enter recipient's name"
                    className="shadow appearance-none border md:text-sm text-xs  rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-2">
                  <label
                    className="block text-gray-700 md:text-sm text-xs  font-bold mb-2"
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
                    className="block text-gray-700 md:text-sm text-xs  font-bold mb-2"
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
                <div className="mb-2">
                  <span className="block text-gray-700  md:text-sm text-xs font-bold mb-2">
                    Delivery Charge
                  </span>
                  <div className=" text-nowrap grid grid-cols-1 md:grid-cols-2 md:text-sm text-xs">
                    <label className="inline-flex items-center mr-4">
                      <input
                        type="radio"
                        className="form-radio"
                        name="deliveryCharge"
                        value="insideDhaka"
                        required
                      />
                      <span className="ml-1">Inside Dhaka-60</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio"
                        name="deliveryCharge"
                        value="outsideDhaka"
                        required
                      />
                      <span className="ml-1">Outside Dhaka-100</span>
                    </label>
                  </div>
                </div>
                <div className="mb-3">
                  <label
                    className="block text-gray-700 md:text-sm text-xs  font-bold mb-2"
                    htmlFor="deliveryDetail"
                  >
                    Payment Method
                  </label>
                  <select
                    id="deliveryDetail"
                    className="shadow border md:text-sm text-xs rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  >
                    <option value="" disabled selected>
                      Select an option
                    </option>
                    <option value="cashOnDelivery">Cash on Delivery</option>
                    <option value="prepaid">Prepaid</option>
                    <option value="bankTransfer">Bank Transfer</option>
                    <option value="mobilePayment">Mobile Payment</option>
                  </select>
                </div>
              </form>
            </div>
          </div>

          {/* Payment Component */}
          <div className="flex lg:justify-end mt-2">
            <Payment />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Order;
