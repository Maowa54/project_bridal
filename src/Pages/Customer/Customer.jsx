import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AllSelectedBusiness from "../../Component/AllSelectedBusiness";

const Customer = () => {


  const [customers, setCustomers] = useState([]);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const clientId = localStorage.getItem("clientId");

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const cacheKey = `customers_${clientId}`;
        const cacheTimeKey = `customers_${clientId}_timestamp`;
        const cacheValidityDuration = 1 * 60 * 60 * 1000; // 2 hours
  
        const cachedData = localStorage.getItem(cacheKey);
        const cachedTimestamp = localStorage.getItem(cacheTimeKey);
  
        const now = Date.now();
  
        if (cachedData && cachedTimestamp && (now - cachedTimestamp < cacheValidityDuration)) {
          setCustomers(JSON.parse(cachedData));
          return;
        }
  
        // Otherwise, make the API call
        const response = await axios.get(`https://expressitplus.co.uk/api/customer/get/${clientId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
  
        const customers = response.data.data || [];
        localStorage.setItem(cacheKey, JSON.stringify(customers));
        localStorage.setItem(cacheTimeKey, now.toString());
        setCustomers(customers);
      } catch (error) {
        console.error('Error fetching customers:', error.response ? error.response.data : error.message);
      }
    };
  
    fetchCustomers();
  }, [clientId, token]);





  console.log(customers)


  return (
    <div className="mx-4 md:mx-10">
      <div className="w-full shadow py-4 flex pe-4 mb-5">
        <h2 className="px-4 text-xl font-semibold">Customer</h2>
        <div className="ml-auto flex items-center">
          <AllSelectedBusiness/>
        </div>
      </div>

      <div className="overflow-auto xl:overflow-hidden mt-6 mb-5">
        <table className="table mb-24">
          {/* head */}
          <thead>
            <tr>
              <th className="text-[15px]">SL</th>
              <th className="text-[15px]">User Name</th>
              <th className="text-[15px]">Order ID</th>
              <th className="text-[15px]">Date</th>
              <th className="text-[15px]">Items</th>
              <th className="text-[15px]">Source</th>
              <th className="text-[15px]">Phone No.</th>
              <th className="text-[15px]">Location</th>
              <th className="text-[15px]">Banned</th>
            </tr>
          </thead>
          <tbody>

          {customers.map((customer, index) => (


            <tr className="hover">
              <th className="text-[15px]">{index + 1}</th>
              <td className="text-[15px]">{customer.c_name}</td>
              <td className="text-[15px]">{customer.order_id}</td>
              <td className="text-[15px]">{customer.created_at}</td>
              <td className="text-[15px]">{customer.product_ids}</td>
              <td className="text-[15px]">{customer.source}</td>
              <td className="text-[15px]">{customer.c_phone}</td>
              <td className="text-[15px]">{customer.address}</td>
              <td className="text-[15px]"><input
                      type="checkbox"
                      className="toggle toggle-info scale-75"

                    /></td>
            </tr>

           ))}

          
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Customer;
