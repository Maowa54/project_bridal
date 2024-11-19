import React, { useState,useEffect } from 'react'

import axios from 'axios';
import {  FaEllipsisV,FaTrash , FaEye } from 'react-icons/fa'; 
import { printInvoice } from '../Order/InvoicePrint'; 
import { SlNote } from "react-icons/sl";





const FollowUp = () => {




  const token = localStorage.getItem('token');
  const clientId = localStorage.getItem('clientId');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // Initialize loading state
  const [error, setError] = useState(null); 
  
  const [selectAll, setSelectAll] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState([]);

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedOrders([]); // Deselect all
    } else {
      setSelectedOrders(orders.map((order) => order.id)); // Select all
    }
    setSelectAll(!selectAll);
  };
  const handlePrintInvoice = (order) => {
    printInvoice(order); // Call the imported printInvoice function
  };

  const toggleDropdown = (e, order) => {
    const dropdownMenu = e.currentTarget.nextElementSibling;
    dropdownMenu.classList.toggle("hidden");
    
    // Attach the click event for printing invoice
    const printButton = dropdownMenu.querySelector('#printInvoice');
    if (printButton) {
      printButton.onclick = () => handlePrintInvoice(order);
    }
  };

 useEffect(() => {
  const fetchOrders = async () => {
    try {
      const cacheKey = `orders_${clientId}`;
      const cacheTimeKey = `orders_${clientId}_timestamp`;
      const cacheValidityDuration = 2 * 60 * 60 * 1000; // 2 hours

      const cachedData = localStorage.getItem(cacheKey);
      const cachedTimestamp = localStorage.getItem(cacheTimeKey);
      const now = Date.now();

      if (cachedData && cachedTimestamp && (now - cachedTimestamp < cacheValidityDuration)) {
        // Use cached data if still valid
        setOrders(JSON.parse(cachedData));
        setLoading(false);
        return;
      }

      // Otherwise, make the API call
      const response = await axios.get(`https://expressitplus.co.uk/api/orders/all/get/${clientId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.status) {
        const fetchedOrders = response.data.data; // Access the 'data' array
        setOrders(fetchedOrders);

        // Cache the data and timestamp
        localStorage.setItem(cacheKey, JSON.stringify(fetchedOrders));
        localStorage.setItem(cacheTimeKey, now.toString());
      } else {
        console.error('Failed to fetch orders:', response.data.message);
        setError(response.data.message);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('Failed to fetch orders. Please try again later.');
    } finally {
      setLoading(false); // Stop loading after the process finishes
    }
  };

  fetchOrders();
}, [clientId, token]);

console.log(orders);


  const handleAddNoteClick = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  }
  
  function formatTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;






  return (
    <div>
   




    <div className="overflow-x-auto my-6">
        {orders.length > 0 ? (
          <div className="w-full">
            <table className="table">
              <thead>
                <tr className="text-[14px]">
                  <th className="px-2 py-2">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th className="px-3 py-2">Placed On</th>
                  <th className="px-2 py-2">Order By</th>
                  <th className="px-2 py-2">Customer Id</th>
                  <th className="px-2 py-2">Courier</th>
               
               
                  <th className="px-2 py-2">Address</th>
                  <th className="px-4 py-2">Add Note</th>
                  <th className="px-2 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr
                    key={order.id}
                    className={index % 2 === 1 ? 'shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]' : ''}
                  >
                    <td className="px-2 py-2">
                      <input
                        type="checkbox"
                        checked={selectedOrders.includes(order.id)}
                        onChange={() => handleSelectOrder(order.id)}
                      />
                    </td>
                  
                    
                    <td className="flex flex-col">
                      <span>{formatDate(order.created_at)}</span>
                      <span>{formatTime(order.created_at)}</span>
                    </td>

                    <td className="px-2 py-2">
                      {order.creator.name}
                    </td>
                    <td className="flex flex-col">
                      <span>{order.c_name}</span>
                      <span>{order.c_phone}</span>
                    </td>

                    <td className="px-2 py-2">{order.courier} </td>

                      
                    <td className="px-2 py-2">{order.address}</td>
                    <td className=" py-2">
                <button className=' ml-5' onClick={() => handleAddNoteClick(order)}>
                  <SlNote className="text-blue-500" />
                </button>
              </td>
                  
                    <td className="relative">
                      <FaEllipsisV className="cursor-pointer" onClick={(e) => toggleDropdown(e, order)} />
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 hidden">
                        <ul className="menu menu-compact">
                          <li>
                            <a onClick={() => handlePrintInvoice(order)} id="printInvoice" className="flex items-center space-x-2 p-2 hover:bg-gray-100">
                              <FaEye color="blue" />
                              <span>Invoice</span>
                            </a>
                          </li>
                          <li>
                            <a className="flex items-center space-x-2 p-2 hover:bg-gray-100">
                              <FaTrash  color="red"/>
                              <span>Delete</span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No orders found.</p>
        )}
      </div>
      
      
    </div>
  )
}

export default FollowUp
