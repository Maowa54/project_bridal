import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CiMenuKebab } from "react-icons/ci";
import { FaEye, FaRegEdit, FaTimes } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { Link } from "react-router-dom";
import Footer_Backend from "../../../Component/Backend/Footer_Backend";

const OnlineOrder = () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const [online, setOnline] = useState([]);
  const [confirm, setConfirm] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchCancelOrder = async (orderId) => {
    const formData = new FormData();
    formData.append("user_id", userId);
    formData.append("order_id", orderId);

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    setLoading(true); // Start loading
    try {
      const response = await axios.post(
        "https://admin.attireidyll.com/api/order/online/cancel",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: response.data.message || "Order canceled successfully!",
          showConfirmButton: false,
          timer: 2000,
        });

        // Fetch updated orders after successful cancellation
        await fetchOnlineOrders();
      } else {
        console.error("Cancellation failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error canceling order:", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  useEffect(() => {
    const fetchOnlineOrders = async () => {
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
          setOnline(orders);
        } else {
          console.error("Failed to fetch orders:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false); // End loading
      }
    };

    fetchOnlineOrders();
  }, [token]);

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedOrders([]); // Deselect all
    } else {
      setSelectedOrders(online.map((order) => order.id)); // Select all
    }
    setSelectAll(!selectAll);
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

  console.log(online);
  const orderIds = online?.map((item) => item.id);
  console.log(orderIds);

  const handleErrors = (newErrors) => {
    setErrors(newErrors);
  };

  const fetchConfirmOrder = async (orderId) => {
    const formData = new FormData();
    formData.append("user_id", userId);
    formData.append("order_id", orderId);

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    setLoading(true); // Start loading
    try {
      const response = await axios.post(
        "https://admin.attireidyll.com/api/order/online/confirm",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: response.data.message || " Added successfullyyyy!",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const openModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setIsModalOpen(false);
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
          `https://admin.attireidyll.com/api/order/online/delete/${id}`,
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
          setOnline((prevSms) => prevSms.filter((sms) => sms.id !== id));
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

  return (
    <div>
      <div className="flex  border border-gray-300 justify-between mt-1 px-4 py-3 items-center rounded">
        <h1 className="text-lg md:text-lg font-medium text-gray-700 ">
          Online Order{" "}
        </h1>
      </div>

      <div className="overflow-x-auto  my-6 ">
        <table className="min-w-full text-nowrap">
          <thead className="text-base  text-gray-600 -2">
            <tr>
              <th className="px-4 py-2 border-b border-gray-300 text-left text-sm font-medium text-gray-800">
                Date
              </th>
              <th className="px-4 py-2 border-b border-gray-300 text-left text-sm font-medium text-gray-800">
                Order ID
              </th>
              <th className="px-4 py-2 border-b border-gray-300 text-left text-sm font-medium text-gray-800">
                Customer Id
              </th>
              <th className="px-4 py-2 border-b border-gray-300 text-left text-sm font-medium text-gray-800">
                Items
              </th>
              <th className="px-4 py-2 border-b border-gray-300 text-left text-sm font-medium text-gray-800">
                Source
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
                Confirm Order
              </th>
              <th className="px-4 py-2 border-b border-gray-300 text-left text-sm font-medium text-gray-800">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="text-sm  text-gray-600 font-medium">
            {isLoading ? ( // Check if data is still loading
              <tr>
                <td colSpan="13" className="text-center">
                  <span className="loading loading-ring loading-md"></span>
                  <h1>Online Orders...</h1>
                </td>
              </tr>
            ) : online.length > 0 ? ( // Check if online array has data
              online.map((order, index) => (
                <tr key={order.id} className="hover border-b cursor-pointer">
                  <td className="px-4 py-2 border-gray-300 text-sm text-gray-600 flex flex-col">
                    <span>{formatDate(order.created_at)}</span>
                    <span>{formatTime(order.created_at)}</span>
                  </td>
                  <td className="px-4 py-2  border-gray-300 text-sm text-gray-600">
                    GL-{order.id}
                  </td>
                  <td className="flex flex-col px-4 py-2  border-gray-300 text-sm text-gray-600">
                    <span>{order.c_name}</span>
                    <span>{order.c_phone}</span>
                  </td>
                  <td className="px-4 py-2  border-gray-300 text-sm text-gray-600">
                    {Number(order?.s_product_qty) +
                      Number(order?.v_product_qty)}
                  </td>
                  <td className="px-4 py-2  border-gray-300 text-sm text-gray-600">
                    {order.source}
                  </td>
                  <td className="px-4 py-2  border-gray-300 text-sm text-gray-600">
                    {order.address.length > 20
                      ? `${order.address.substring(0, 15)}.....`
                      : order.address}
                  </td>
                  <td className="px-4 py-2  border-gray-300 text-sm text-gray-600">
                    {order.cod_amount}
                  </td>
                  <td className="px-3 py-2 border-gray-300 text-sm ">
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
                  </td>

                  <td className="px-4 py-2  border-gray-300 text-sm ">
                    <button
                      className=" bg-[#daf5e6] text-green-600 border border-[#daf5e6] hover:bg-[#daf5e6] rounded-lg flex gap-2 py-2 px-3"
                      onClick={() => fetchConfirmOrder(order.id)}
                    >
                      Confirm
                    </button>
                  </td>
                  <td className="px-4 py-2  border-gray-300 text-sm text-gray-600">
                    <div className="flex gap-2">
                      <Link
                        data-tooltip-id="ViewTooltipId"
                        to={{
                          pathname: "/orderdetails",
                        }}
                        state={{ order }}
                      >
                        <FaEye className="text-blue-500 text-lg pl-1" />
                      </Link>
                      <ReactTooltip
                        id="ViewTooltipId"
                        place="top"
                        content="View Details"
                        style={{
                          fontSize: "11px", // Adjust text size
                          padding: "4px 8px", // Adjust padding
                        }}
                      />

                      <button
                        data-tooltip-id="CancelTooltipId"
                        onClick={() => fetchCancelOrder(order.id)}
                      >
                        <FaTimes className="text-yellow-500 text-lg pl-1" />{" "}
                        {/* Yellow for Cancel */}
                      </button>
                      <ReactTooltip
                        id="CancelTooltipId"
                        place="top"
                        content="Cancel Order"
                        style={{
                          fontSize: "11px", // Adjust text size
                          padding: "4px 8px", // Adjust padding
                        }}
                      />
                      <button
                        data-tooltip-id="DeleteTooltipId"
                        onClick={() => handleDelete(order.id)}
                      >
                        <MdDeleteForever className="text-red-500 text-lg" />{" "}
                        {/* Red for Delete */}
                      </button>
                      <ReactTooltip
                        id="DeleteTooltipId"
                        place="top"
                        content="Delete "
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

        {isModalOpen && selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="modal modal-open">
              <div className="modal-box max-w-5xl p-6 overflow-y-auto">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">
                  Order Details
                </h3>

                {/* Order Details Section */}
                <div className="mb-6">
                  <p className="text-gray-600 mb-2">
                    <span className="font-medium">Order ID:</span> GL-
                    {selectedOrder.id}
                  </p>
                  <p className="text-gray-600 mb-2">
                    <span className="font-medium">COD Amount:</span>{" "}
                    {selectedOrder.cod_amount}৳
                  </p>
                  <p className="text-gray-600 mb-2">
                    <span className="font-medium">Address:</span>{" "}
                    {selectedOrder.address}
                  </p>
                </div>

                {/* Product Details Table */}
                <table className="table-auto w-full border-collapse border border-gray-300 text-left">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-2">#</th>
                      <th className="border border-gray-300 p-2">Image</th>
                      <th className="border border-gray-300 p-2">Name</th>
                      <th className="border border-gray-300 p-2">Price (৳)</th>
                      <th className="border border-gray-300 p-2">Code</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.online_order_products.map(
                      (product, index) => (
                        <tr key={product.id} className="hover:bg-gray-50">
                          <td className="border border-gray-300 p-2">
                            {index + 1}
                          </td>
                          <td className="border border-gray-300 p-2">
                            <img
                              src={`https://pub-c053b04a208d402dac06392a3df4fd32.r2.dev/image/${product.image}`}
                              alt={product.name}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                          </td>
                          <td className="border border-gray-300 p-2">
                            {product.name}
                          </td>
                          <td className="border border-gray-300 p-2">
                            {product.price}
                          </td>
                          <td className="border border-gray-300 p-2">
                            {product.code}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>

                {/* Modal Action */}
                <div className="modal-action mt-6 flex justify-end">
                  <button
                    className="btn btn-error text-white"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      
      <Footer_Backend  />
    </div>
  );
};

export default OnlineOrder;
