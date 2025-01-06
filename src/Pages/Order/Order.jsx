import axios from "axios";
import { useEffect, useRef, useState } from "react";

import { BsBoxes } from "react-icons/bs";
import {
  FaEllipsisV,
  FaEye,
  FaTrash,
  FaSearch,
  FaRegEdit,
  FaUser,
  FaShoppingCart,
  FaClock,
  FaTruck,
  FaUndo,
  FaCheck,
  FaTags,
} from "react-icons/fa";
import Datepicker from "react-tailwindcss-datepicker";
import { printInvoice } from "./InvoicePrint";
import AllSelectedBusiness from "../../Component/AllSelectedBusiness";
import InvoiceModal from "./InvoiceModal";
import { MdDeleteForever } from "react-icons/md";
import { CiMenuKebab } from "react-icons/ci";
import Footer_Backend from "../../Component/Backend/Footer_Backend";
import { IoIosSearch } from "react-icons/io";

const Order = () => {
  const token = localStorage.getItem("token");
  const [displayOrders, setDisplayOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [pageSize, setPageSize] = useState(10); // Default page size
  const [value, setValue] = useState({ startDate: null, endDate: null });
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const handleViewClick = (order) => {
  //   setSelectedOrder(order);
  //   setModalVisible(true);
  // };
  console.log(selectedBusiness);
  const handlePrint = () => {
    const printContent = document.getElementById("modal-content");
    const printWindow = window.open("", "", "height=600,width=800");
    printWindow.document.write(
      "<html><head><title>Print Order</title></head><body>"
    );
    printWindow.document.write(printContent.innerHTML);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
  };
  useEffect(() => {
    const fetchOrders = async () => {
      const localStorageKey = 'orders';
      const cachedData = localStorage.getItem(localStorageKey);
      const now = Date.now();

      if (cachedData) {
        const { timestamp, orders } = JSON.parse(cachedData);
        if (now - timestamp < 2 * 60 * 1000) {
          // Use cached data
          setDisplayOrders(orders);
          setFilteredOrders(orders);
          return;
        }
      }

      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://admin.attireidyll.com/api/online/orders/get`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.status) {
          const orders = response.data.data.data;
          setDisplayOrders(orders);
          setFilteredOrders(orders);

          localStorage.setItem(
            localStorageKey,
            JSON.stringify({ timestamp: now, orders })
          );
        } else {
          console.error("Failed to fetch orders:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false); // End loading
      }
    };

    fetchOrders();
  }, [ token]);

  console.log(displayOrders);

  useEffect(() => {
    if (selectedBusiness) {
      const filtered = displayOrders.filter(
        (order) => order.business_id === selectedBusiness
      );
      setFilteredOrders(filtered);
    } else {
      setFilteredOrders(displayOrders);
    }
  }, [selectedBusiness, displayOrders]);

  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value));
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedOrders([]); // Deselect all
    } else {
      setSelectedOrders(filteredOrders.map((order) => order.id)); // Select all
    }
    setSelectAll(!selectAll);
  };

  const handleSelectOrder = (id) => {
    if (selectedOrders.includes(id)) {
      setSelectedOrders(selectedOrders.filter((orderId) => orderId !== id));
    } else {
      setSelectedOrders([...selectedOrders, id]);
    }
  };

  const handlePrintInvoice = (order) => {
    printInvoice(order);
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  }

  function formatTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }

  // Slice the orders array based on pageSize
  const orders = filteredOrders.slice(0, pageSize);

  console.log(orders);

  return (
    <div>
      <div className="pb-8">
        <div className="flex shadow-md justify-between mt-1 mb-5 py-2 px-4 items-center">
          <h1 className="text-xl md:text-2xl font-semibold">Order</h1>
        </div>

        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 text-nowrap gap-4 my-4">
          {/* Statistics Cards */}
          {[
            {
              label: "Sales Today",
              value: 0,
              icon: <FaShoppingCart size={15} md:size={20} />,
              bgColor: "bg-green-100",
              textColor: "text-green-700",
            },
            {
              label: "Pending Orders",
              value: 0,
              icon: <FaClock size={15} md:size={20} />,
              bgColor: "bg-yellow-100",
              textColor: "text-yellow-700",
            },
            {
              label: "Deliveries",
              value: 0,
              icon: <FaTruck size={15} md:size={20} />,
              bgColor: "bg-purple-100",
              textColor: "text-purple-700",
            },
            {
              label: "Returns",
              value: 0,
              icon: <FaUndo size={15} md:size={20} />,
              bgColor: "bg-red-100",
              textColor: "text-red-700",
            },
            {
              label: "Confirmed",
              value: 0,
              icon: <FaCheck size={15} md:size={20} />,
              bgColor: "bg-teal-100",
              textColor: "text-teal-700",
            },
            {
              label: "Offers Today",
              value: 0,
              icon: <FaTags size={15} md:size={20} />,
              bgColor: "bg-pink-100",
              textColor: "text-pink-700",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className={`${stat.bgColor} ${stat.textColor} flex flex-col  cursor-pointer col-span-2 hover:bg-opacity-80 hover:shadow-lg transition-all duration-300 w-full p-6 rounded-lg  shadow-md gap-2 justify-center`}
            >
              <h2 className="text-3xl md:text-4xl font-semibold text-center">
                {stat.value}
              </h2>
              <div className="flex items-center justify-center gap-2">
                <span>{stat.icon}</span>
                <h2 className="font-medium text-sm md:text-base">
                  {stat.label}
                </h2>
              </div>
            </div>
          ))}
        </div>

        <div className="flex pt-4 flex-col md:flex-row gap-3 justify-between items-center">
          <div className=" flex items-center gap-3 ">
            <div>
              <select
                onChange={handlePageSizeChange}
                value={pageSize}
                className="border border-gray-300 rounded-lg md:text-lg font-bold px-4 py-1"
              >
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
            </div>

            <h2 className="bg-teal-500 text-nowrap cursor-pointer font-medium text-white hover:bg-teal-600 rounded-lg text-sm px-4 py-2">
              Print All Invoice
            </h2>

            <div>
              <div className="border relative z-30 border-gray-300 rounded-lg ">
                <Datepicker
                  value={value}
                  onChange={handleValueChange}
                  showFooter
                  primaryColor="teal"
                />
              </div>
            </div>
          </div>
          <div className="">
            <div className="flex space-x-4">
              <div className="flex rounded-md overflow-hidden w-full">
                <input
                  type="text"
                  className="w-full text-sm border border-gray-300 px-2  rounded-l-md rounded-r-none focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  placeholder="Search here"
                />
                <button className="bg-teal-500 text-white px-4 py-1 rounded-r-md flex items-center hover:bg-teal-700 transition">
                  <IoIosSearch className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto my-6">
          <div className="w-full">
            <table className="table text-nowrap">
              <thead className="text-base  text-gray-700 border-b-2">
                <tr>
                  <th className="">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAll}
                      className="size-3 md:size-3.5" // Adjust size for different screen sizes
                    />
                  </th>

                  <th className="">Date</th>
                  <th className="">Order ID</th>
                  <th className="">Customer</th>
                  <th className="">Items</th>

                  <th className="">Address</th>

                  <th className="">Total</th>
                  <th className="">Status</th>
                  <th className="">Action</th>
                </tr>
              </thead>

              <tbody className="text-sm  text-gray-700 font-medium">
                {isLoading ? ( // Check if data is still loading
                  <tr className="hover">
                    <td colSpan="13" className="text-center">
                      <span className="loading loading-ring loading-md"></span>
                      <h1>Loading Orders...</h1>
                    </td>
                  </tr>
                ) : orders.length > 0 ? ( // Check if orders array has data
                  orders.map((order, index) => (
                    <tr key={order.id} className="hover cursor-pointer">
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedOrders.includes(order.id)}
                          onChange={() => handleSelectOrder(order.id)}
                          className="size-3 md:size-3.5"
                        />
                      </td>
                      <td className="flex flex-col">
                        <span>{formatDate(order.created_at)}</span>
                        <span>{formatTime(order.created_at)}</span>
                      </td>
                      <td>{order.unique_id}</td>
                      <td className="flex flex-col">
                        <span>{order.c_name}</span>
                        <span>{order.c_phone}</span>
                      </td>

                      <td>
                        {Number(order?.s_product_qty) +
                          Number(order?.v_product_qty)}
                      </td>

                      <td>
                        {order.address.length > 20
                          ? `${order.address.substring(0, 15)}.....`
                          : order.address}
                      </td>

                      <td>{order.cod_amount}</td>
                      <td>{order.status}</td>
                      <td>
                        <div className="relative">
                          <div className="dropdown">
                            <button className="md:text-lg ml-5">
                              <CiMenuKebab />
                            </button>
                            <ul
                              tabIndex={0}
                              className="dropdown-content menu bg-base-100 rounded-box z-50 p-2 shadow absolute right-2"
                            >
                              <li>
                                <a>
                                  <FaEye className="text-teal-500 text-lg   pl-1" />
                                  View
                                </a>
                              </li>
                              <li
                                onClick={() => handlePrintInvoice(order)}
                                id="printInvoice"
                              >
                                <a>
                                  <FaRegEdit className="text-green-500 text-lg   pl-1" />
                                  Invoice
                                </a>
                              </li>
                              <li>
                                <a>
                                  <MdDeleteForever className="text-red-500 text-lg  " />
                                  Delete
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  // If orders array is empty
                  <tr>
                    <td colSpan="13" className="text-center">
                      <div className=" flex flex-col items-center ">
                        <p className=" my-4 text-xl font-semibold mr-4">
                          No orders found
                        </p>
                        <img
                          className=" w-[15%] animate-pulse "
                          src="https://cdn-icons-png.flaticon.com/256/4076/4076478.png"
                          alt="No Orders found"
                        />
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {modalVisible && (
            <InvoiceModal
              order={selectedOrder}
              onClose={() => setModalVisible(false)}
              onPrint={handlePrint}
            />
          )}
        </div>
      </div>

      <Footer_Backend />
    </div>
  );
};

export default Order;
