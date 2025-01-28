import axios from "axios";
import { useEffect, useRef, useState } from "react";

import { BsBoxes } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Tooltip as ReactTooltip } from "react-tooltip";

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
  FaPrint,
} from "react-icons/fa";
import Datepicker from "react-tailwindcss-datepicker";
import { printInvoice } from "./InvoicePrint";
import AllSelectedBusiness from "../../Component/AllSelectedBusiness";
import InvoiceModal from "./InvoiceModal";
import { MdDeleteForever } from "react-icons/md";
import { CiMenuKebab } from "react-icons/ci";
import Footer_Backend from "../../Component/Backend/Footer_Backend";
import { IoIosSearch } from "react-icons/io";
import Swal from "sweetalert2";

const Order = () => {
  const token = localStorage.getItem("token");
  const [displayOrders, setDisplayOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  // const [pageSize, setPageSize] = useState(50); // Default page size
  const [value, setValue] = useState({ startDate: null, endDate: null });
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const orders = filteredOrders.slice(startIndex, endIndex);

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when items per page changes
  };
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
      const localStorageKey = "orders";
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
          `https://admin.attireidyll.com/api/orders/all/get`,
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
  }, [token]);

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

  // const handlePageSizeChange = (event) => {
  //   setPageSize(Number(event.target.value));
  // };

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

  const handleDelete = async (id) => {
    // Show a confirmation dialog
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.delete(
          `https://admin.attireidyll.com/api/order/delete/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.status) {
          Swal.fire(
            "Deleted!",
            response.data.message || "Order deleted successfullyyy."
          );

          // Remove the deleted SMS from the state
          setDisplayOrders((prevSms) => prevSms.filter((sms) => sms.id !== id));
        } else {
          Swal.fire(
            "Error!",
            response.data.message || "Failed to delete order.",
            "error"
          );
        }
      } catch (error) {
        console.error(
          "Error deleting order:",
          error.response ? error.response.data : error.message
        );
        Swal.fire("Error!", "Failed to delete order.", "error");
      }
    }
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

  console.log(orders);

  return (
    <div>
      <div className="">
        <div className="flex rounded border border-gray-300 justify-between mt-1 px-4 py-3 items-center ">
          <h1 className="text-lg md:text-lg font-medium text-gray-700 ">
            Order
          </h1>
        </div>

        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 text-nowrap gap-4 my-4">
          {/* Statistics Cards */}
          {[
            {
              label: "Sales Today",
              value: 0,
              icon: <FaShoppingCart size={15} md:size={20} />,
              bgColor: "bg-teal-100",
              textColor: "text-teal-700",
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
              bgColor: "bg-green-100",
              textColor: "text-green-700",
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

        <div className="overflow-x-auto  my-6 ">
          <table className="min-w-full text-nowrap">
            <thead className=" border-b">
              <tr>
                <th className="px-4 py-2 border-b border-gray-300 text-left text-sm font-medium text-gray-800">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                    className="size-3 md:size-3.5" // Adjust size for different screen sizes
                  />
                </th>

                <th className="px-4 py-2 border-b border-gray-300 text-left text-sm font-medium text-gray-800">
                  Date
                </th>
                <th className="px-4 py-2 border-b border-gray-300 text-left text-sm font-medium text-gray-800">
                  Order ID
                </th>
                <th className="px-4 py-2 border-b border-gray-300 text-left text-sm font-medium text-gray-800">
                  Customer
                </th>
                <th className="px-4 py-2 border-b border-gray-300 text-left text-sm font-medium text-gray-800">
                  Items
                </th>

                <th className="px-4 py-2 border-b border-gray-300 text-left text-sm font-medium text-gray-800">
                  Address
                </th>

                <th className="px-4 py-2 border-b border-gray-300 text-left text-sm font-medium text-gray-800">
                  Total
                </th>
                <th className="px-4 py-2 border-b border-gray-300 text-left text-sm font-medium text-gray-800">
                  Status
                </th>
                <th className="px-4 py-2 border-b border-gray-300 text-left text-sm font-medium text-gray-800">
                  Action
                </th>
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
                  <tr key={order.id} className="hover border-b cursor-pointer">
                    <td className="px-4 py-2  text-sm text-gray-600">
                      <input
                        type="checkbox"
                        checked={selectedOrders.includes(order.id)}
                        onChange={() => handleSelectOrder(order.id)}
                        className="size-3 md:size-3.5"
                      />
                    </td>
                    <td className="flex flex-col px-4 py-2  text-sm text-gray-600">
                      <span>{formatDate(order.created_at)}</span>
                      <span>{formatTime(order.created_at)}</span>
                    </td>
                    <td className="px-4 py-2  text-sm text-gray-600">
                      {order.unique_id}
                    </td>
                    <td className="flex flex-col px-4 py-2  text-sm text-gray-600">
                      <span>{order.c_name}</span>
                      <span>{order.c_phone}</span>
                    </td>
                    <td className="px-4 py-2  text-sm text-gray-600">
                      {Number(order?.s_product_qty) +
                        Number(order?.v_product_qty)}
                    </td>
                    <td className="px-4 py-2  text-sm text-gray-600">
                      {order.address.length > 20
                        ? `${order.address.substring(0, 15)}.....`
                        : order.address}
                    </td>
                    <td className="px-4 py-2  text-sm text-gray-600">
                      {order.cod_amount}
                    </td>
                    <td className="px-2 py-2 border-gray-300 text-sm ">
                      <span
                        className={`inline-block px-3 py-1 rounded-full font-medium ${
                          order.status === "order_placed"
                            ? "bg-yellow-100 text-yellow-800"
                            : order.status === "online_order"
                            ? "bg-green-100 text-blue-800"
                            : order.status === "cancel"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {order.status === "order_placed"
                          ? "Processing"
                          : order.status === "online_order"
                          ? "Online"
                          : order.status === "cancel"
                          ? "Cancelled"
                          : "Unknown"}
                      </span>
                    </td>{" "}
                    <td className="px-4 py-2  text-sm text-gray-600">
                      <div className="flex gap-2">
                        <Link
                          data-tooltip-id="viewTooltipId"
                          to={{
                            pathname: "/orderdetails",
                          }}
                          state={{ order }}
                        >
                          <FaEye className="text-teal-500 text-lg   pl-1" />
                        </Link>

                        <ReactTooltip
                          id="viewTooltipId"
                          place="top"
                          content="View Details"
                          style={{
                            fontSize: "11px", // Adjust text size
                            padding: "4px 8px", // Adjust padding
                          }}
                        />

                        <button
                          data-tooltip-id="printTooltipId"
                          onClick={() => handlePrintInvoice(order)}
                          id="printInvoice"
                        >
                          <FaPrint className="text-green-500 text-lg   pl-1" />
                        </button>

                        <ReactTooltip
                          id="printTooltipId"
                          place="top"
                          content="Print Invoice"
                          style={{
                            fontSize: "11px", // Adjust text size
                            padding: "4px 8px", // Adjust padding
                          }}
                        />

                        <button
                          data-tooltip-id="deleteTooltipId"
                          onClick={() => handleDelete(order.id)}
                        >
                          <MdDeleteForever className="text-red-500 text-lg  " />
                        </button>
                        <ReactTooltip
                          id="deleteTooltipId"
                          place="top"
                          content="Delete"
                          style={{
                            fontSize: "11px", // Adjust text size
                            padding: "4px 8px", // Adjust padding
                          }}
                        />
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

          {/* Pagination */}
          <div className="flex flex-col md:flex-row justify-between px-4 items-center mt-4">
            <div className="text-sm mb-2 md:mb-0">
              Showing {startIndex + 1} to{" "}
              {Math.min(endIndex, filteredOrders.length)} of{" "}
              {filteredOrders.length} entries
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
                disabled={currentPage === totalPages}
              >
                Next »
              </button>
            </div>
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
