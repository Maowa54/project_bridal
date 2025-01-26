import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AllSelectedBusiness from "../../Component/AllSelectedBusiness";
import Footer_Backend from "../../Component/Backend/Footer_Backend";

const Customer = () => {
  const [customers, setCustomers] = useState([]);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const cacheKey = "customers";
        const cacheTimeKey = "customers_timestamp";
        const cacheValidityDuration = 1 * 60 * 60 * 1000; // 2 hours

        const cachedData = localStorage.getItem(cacheKey);
        const cachedTimestamp = localStorage.getItem(cacheTimeKey);

        const now = Date.now();

        if (
          cachedData &&
          cachedTimestamp &&
          now - cachedTimestamp < cacheValidityDuration
        ) {
          setCustomers(JSON.parse(cachedData));
          return;
        }

        // Otherwise, make the API call
        const response = await axios.get(
          `https://admin.attireidyll.com/api/customer/get`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const customers = response.data.data || [];
        localStorage.setItem(cacheKey, JSON.stringify(customers));
        localStorage.setItem(cacheTimeKey, now.toString());
        setCustomers(customers);
      } catch (error) {
        console.error(
          "Error fetching customers:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchCustomers();
  }, [token]);

  console.log(customers);

  return (
    <div>
      <div className="pb-8">
        <div className="flex  justify-between mt-1 px-4 py-3 border border-gray-300 items-center rounded">
          <h1 className="text-lg md:text-lg font-medium text-gray-700 ">
            Customer
          </h1>
        </div>

        <div className="overflow-x-auto  my-6 ">
          <table className="min-w-full text-nowrap">
            {/* head */}
            <thead className="">
              <tr>
                <th className="px-4 py-2 border-b border-gray-300 text-left text-sm font-medium text-gray-800">
                  SL
                </th>
                <th className="px-4 py-2 border-b border-gray-300 text-left text-sm font-medium text-gray-800">
                  User Name
                </th>
                <th className="px-4 py-2 border-b border-gray-300 text-left text-sm font-medium text-gray-800">
                  Order ID
                </th>
                <th className="px-4 py-2 border-b border-gray-300 text-left text-sm font-medium text-gray-800">
                  Date
                </th>
                <th className="px-4 py-2 border-b border-gray-300 text-left text-sm font-medium text-gray-800">
                  Items
                </th>

                <th className="px-4 py-2 border-b border-gray-300 text-left text-sm font-medium text-gray-800">
                  Phone No.
                </th>
                <th className="px-4 py-2 border-b border-gray-300 text-left text-sm font-medium text-gray-800">
                  Location
                </th>
                <th className="px-4 py-2 border-b border-gray-300 text-left text-sm font-medium text-gray-800">
                  Banned
                </th>
              </tr>
            </thead>
            <tbody className="">
              {customers.map((customer, index) => (
                <tr key="" className="hover cursor-pointer">
                  <th className="px-4 py-2 border-b border-gray-300 text-sm text-gray-700">
                    {index + 1}
                  </th>
                  <td className="px-4 py-2 border-b border-gray-300 text-sm text-gray-700">
                    {customer.c_name}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300 text-sm text-gray-700">
                    {customer.order_id}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300 text-sm text-gray-700">
                    {customer.created_at}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300 text-sm text-gray-700">
                    {customer.product_ids}
                  </td>

                  <td className="px-4 py-2 border-b border-gray-300 text-sm text-gray-700">
                    {customer.c_phone}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300 text-sm text-gray-700">
                    {customer.address}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      className="toggle toggle-info scale-75"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
   
        <Footer_Backend />
 
    </div>
  );
};

export default Customer;
