import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AllSelectedBusiness from "../../Component/AllSelectedBusiness";
import Footer_Backend from "../../Component/Backend/Footer_Backend";

const Customer = () => {

  const token = localStorage.getItem("token");
  const [customers, setCustomers] = useState([]); // Raw data
  const [filteredCustomers, setFilteredCustomers] = useState([]); // Derived data
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Calculate pagination details
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCustomers = filteredCustomers.slice(startIndex, endIndex);

  // Handle items per page change
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page
  };

  // Fetch customers from API or cache
  useEffect(() => {
    const fetchCustomers = async () => {
      const cacheKey = "customers";
      const cacheTimeKey = "customers_timestamp";
      const cacheValidityDuration = 2 * 60 * 60 * 1000; // 2 hours

      try {
        // Check localStorage for cached data
        const cachedData = localStorage.getItem(cacheKey);
        const cachedTimestamp = localStorage.getItem(cacheTimeKey);
        const now = Date.now();

        if (
          cachedData &&
          cachedTimestamp &&
          now - cachedTimestamp < cacheValidityDuration
        ) {
          const parsedData = JSON.parse(cachedData);
          setCustomers(parsedData);
          setFilteredCustomers(parsedData);
          return;
        }

        // If no valid cache, fetch from API
        const response = await axios.get(
          `https://admin.attireidyll.com/api/customer/get`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const fetchedCustomers = response.data.data || [];
        localStorage.setItem(cacheKey, JSON.stringify(fetchedCustomers));
        localStorage.setItem(cacheTimeKey, now.toString());

        setCustomers(fetchedCustomers);
        setFilteredCustomers(fetchedCustomers);
      } catch (error) {
        console.error(
          "Error fetching customers:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchCustomers();
  }, [token]);




  return (
    <div>
      <div className="pb-8">
        <div className="flex  justify-between mt-1 px-4 py-3 border border-gray-300 items-center rounded">
          <h1 className="text-lg md:text-lg font-medium text-gray-700 ">
            Customer
          </h1>
        </div>

        <div className=" mt-4 flex items-center gap-3 ">
          <div>
            <select
              className="rounded border text-sm border-[#2B2F67] bg-white -md h-8 w-24 md:w-20 flex"
              id="paginate_input"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
            >
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="200">200</option>
              <option value="300">300</option>
              <option value="400">400</option>
              <option value="500">500</option>
            </select>
          </div>
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
                    {startIndex + index + 1}
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
     {/* Pagination */}
     <div className="flex flex-col md:flex-row justify-between px-4 items-center mt-4">
        <div className="text-sm mb-2 md:mb-0">
          Showing {filteredCustomers.length > 0 ? startIndex + 1 : 0} to{" "}
          {Math.min(endIndex, filteredCustomers.length)} of{" "}
          {filteredCustomers.length} entries
        </div>
        <div className="flex items-center gap-2">
          <button
            className="px-2 py-1 text-sm font-semibold text-teal-600 border border-teal-600 rounded hover:bg-teal-100 disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            « Previous
          </button>
          <span className="text-sm font-semibold bg-teal-600 text-white px-3 py-1 border border-teal-600 rounded">
            {currentPage}
          </span>
          <button
            className="px-4 py-1 text-sm font-semibold text-teal-600 border border-teal-600 rounded hover:bg-teal-100 disabled:opacity-50"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages || totalPages === 0}
          >
            Next »
          </button>
        </div>
      </div>
        </div>
      </div>

      <Footer_Backend />
    </div>
  );
};

export default Customer;
