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
        const cacheKey = 'customers';
        const cacheTimeKey = 'customers_timestamp';
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
  }, [ token]);

  console.log(customers);

  return (
    <div>
      <div className="pb-8">
        <div className="flex shadow-md justify-between mt-1 px-4 py-2 items-center">
          <h1 className="text-xl md:text-2xl font-semibold">Customer</h1>
        </div>

        <div className="overflow-x-auto my-6">
          <div className="w-full">
            <table className="table text-nowrap">
              {/* head */}
              <thead className="text-base  text-gray-700 border-b-2">
                <tr>
                  <th className="">SL</th>
                  <th className="">User Name</th>
                  <th className="">Order ID</th>
                  <th className="">Date</th>
                  <th className="">Items</th>

                  <th className="">Phone No.</th>
                  <th className="">Location</th>
                  <th className="">Banned</th>
                </tr>
              </thead>
              <tbody className="text-sm  text-gray-700 font-medium">
                {customers.map((customer, index) => (
                  <tr key="" className="hover cursor-pointer">
                    <th className="text-gray-600">{index + 1}</th>
                    <td className="">{customer.c_name}</td>
                    <td className="">{customer.order_id}</td>
                    <td className="">{customer.created_at}</td>
                    <td className="">{customer.product_ids}</td>

                    <td className="">{customer.c_phone}</td>
                    <td className="">{customer.address}</td>
                    <td className="">
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
      </div>

      <Footer_Backend />
    </div>
  );
};

export default Customer;
