/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import InvoiceModal from "./InvoiceModal";
import { printInvoice } from "./InvoicePrint";
import { jsPDF } from "jspdf";
import Swal from "sweetalert2";
import axios from "axios";

const OrderDetails = () => {
  const location = useLocation();
  const order = location.state?.order; // Access the passed order details

  if (!order) {
    return <p>No order details available.</p>;
  }
  const token = localStorage.getItem("token");

  const userId = localStorage.getItem("userId");


  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(false);

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

  const initialQuantities = order?.s_product_qty?.split(",").map(Number) || [];

  const [quantities, setQuantities] = useState(initialQuantities);

  const handleQuantityChange = (index, change) => {
    setQuantities((prevQuantities) => {
      const updatedQuantities = [...prevQuantities];
      updatedQuantities[index] = Math.max(1, updatedQuantities[index] + change); // Prevent quantity from being less than 1
      return updatedQuantities;
    });
  };

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
  const handlePrintInvoice = (order) => {
    printInvoice(order);
  };

  const handleDownloadInvoice = (order) => {
    const doc = new jsPDF();
    let yOffset = 60;

    // Title
    doc.setFontSize(16);
    doc.text(`Invoice for Order: ${order.id}`, 20, 20);
    doc.setFontSize(12);

    // Customer Information
    doc.text(`Customer Name: ${order.c_name}`, 20, 30);
    doc.text(`Address: ${order.address}`, 20, 40);
    doc.text(`Phone: ${order.c_phone}`, 20, 50);

    // Products Table Header
    doc.text("Products:", 20, 60);
    doc.text("Product Name", 20, yOffset);
    doc.text("Price", 100, yOffset);
    doc.text("Quantity", 140, yOffset);
    doc.text("Total", 180, yOffset);

    // Split the s_product_qty string to get quantities for each product
    const productQuantities = order?.s_product_qty?.split(",").map(Number);

    // Products Details
    yOffset += 10;
    let totalAmount = 0;
    order?.order_products?.forEach((product, index) => {
      const price = product.price ? product.price : 0; // Use 0 if price is not available
      const quantity = productQuantities[index] || 0; // Use the quantity from s_product_qty
      const productTotal = price * quantity; // Calculate total for the product

      // Add product total to overall total amount
      totalAmount += productTotal;

      // Display product details in the invoice
      doc.text(product.name || "Unknown Product", 20, yOffset);
      doc.text(price.toString(), 100, yOffset);
      doc.text(quantity.toString(), 140, yOffset);
      doc.text(productTotal.toFixed(2).toString(), 180, yOffset);

      yOffset += 10;
    });

    // Delivery Charge
    const deliveryCharge = order?.delivery_charge || 0;
    yOffset += 10;
    doc.text(`Delivery Charge:  Tk ${deliveryCharge.toFixed(2)}`, 20, yOffset); // Ensure the proper character

    // Total Amount (including Delivery Charge)
    const finalTotal = (totalAmount + deliveryCharge).toFixed(2); // Adding delivery charge to the total amount
    yOffset += 10;
    doc.text(`Total Amount:  Tk ${finalTotal}`, 20, yOffset); // Ensure the proper character

    // Save as PDF
    doc.save(`invoice_${order.id}.pdf`);
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

  return (
    <div className="text-gray-800">
      <div className="flex  justify-between mt-1 px-3 py-3 rounded border border-gray-300 items-center">
        <h1 className="text-lg md:text-lg font-medium ">Order Details</h1>

        <div className="flex gap-3">
          <button
            onClick={() => handlePrintInvoice(order)}
            className="px-3 py-2 rounded text-white bg-gray-800 text-sm"
          >
            {" "}
            <span>
              <i className="fas fa-print mr-2 text-white"></i>
            </span>
            Print
          </button>

          {modalVisible && (
            <InvoiceModal
              order={selectedOrder}
              onClose={() => setModalVisible(false)}
              onPrint={handlePrint}
            />
          )}
          <button
            onClick={() => handleDownloadInvoice(order)}
            className="px-3 py-2 rounded text-white bg-teal-600 text-sm"
          >
            <span>
              <i className="fas fa-download mr-2 text-white"></i>
            </span>
            Download Invoice
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 mt-4 gap-4">
        <div className="col-span-12 md:col-span-9 border border-gray-300 rounded  ">
          <div className="bg-white rounded shadow-lg p-6 space-y-6">
            {/* Invoice Section */}
            <div className="grid grid-cols-2">
              <div className="space-y-2">
                <p className="text-sm md:text-base font-medium text-gray-800">
                  Invoice{" "}
                  <span className="text-teal-600">
                    #Order ID: {order.unique_id}
                  </span>
                </p>
                <p className="text-sm text-gray-500">
                  <span className="text-gray-600 font-medium">Order Date:</span>{" "}
                  {formatDate(order.created_at)}
                </p>
                <p className="text-sm text-gray-600">
                  <i className="fas fa-map-marker-alt mr-1 text-teal-600"></i>
                  Default Location
                </p>
              </div>

              <div className="">
                <p className="text-sm md:text-base font-medium mb-1 text-gray-700">
                  Add More Product{" "}
                  <span className="ml-2 text-lg text-teal-600 cursor-pointer hover:scale-105 transform transition">
                    +
                  </span>
                </p>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="Enter Product Name or ID"
                    className="flex-grow px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <button className="px-4 py-2 text-nowrap text-sm font-medium bg-teal-600 text-white rounded hover:bg-teal-700 focus:ring-2 focus:ring-teal-500">
                    Add Product
                  </button>
                </div>
              </div>
            </div>

            {/* Customer Info Section */}
            <div className="grid grid-cols-2">
              <div className="space-y-2 w-1/2">
                <p className="text-sm md:text-base font-medium text-gray-800">
                  Customer Info
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Name:</span> {order.c_name}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Phone No:</span> {order.c_phone}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Address:</span>{" "}
                  {order.address.length > 20
                    ? `${order.address.substring(0, 15)}.....`
                    : order.address}
                </p>
              </div>

              <div className="space-y-2 w-1/2">
                <p className="text-sm md:text-base text-nowrap font-medium text-gray-800">
                  Ready to Confirm Your Order?
                </p>
                <button
                  onClick={() => fetchConfirmOrder(order.id)}
                  className="px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 "
                >
                  Confirm Order
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border-t border-gray-300">
              <thead>
                <tr>
                  <th className="px-3 py-2 border-b border-gray-300 text-left text-sm font-medium text-gray-800">
                    SL
                  </th>
                  <th className="px-3 py-2 border-b border-gray-300 text-left text-sm font-medium text-gray-800">
                    Product Image
                  </th>
                  <th className="px-3 py-2 border-b border-gray-300 text-left text-sm font-medium text-gray-800">
                    Product Name
                  </th>
                  <th className="px-3 py-2 border-b border-gray-300 text-left text-sm font-medium text-gray-800">
                    Product Price
                  </th>
                  <th className="px-3 py-2 border-b border-gray-300 text-left text-sm font-medium text-gray-800">
                    Product Code
                  </th>
                  <th className="px-3 py-2 border-b border-gray-300 text-left text-sm font-medium text-gray-800">
                    Qty
                  </th>
                  <th className="px-3 py-2 border-b border-gray-300 text-left text-sm font-medium text-gray-800">
                    Total Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {(
                  order?.order_products ||
                  order?.online_order_products ||
                  []
                ).map((product, index) => {
                  const productQuantity = quantities[index] || 1;
                  const totalPrice = product.price * productQuantity;

                  return (
                    <tr key={product.id}>
                      <td className="px-3 py-2 border-b border-gray-300 text-sm text-gray-700 text-nowrap">
                        {index + 1}
                      </td>
                      <td className="px-3 py-2 border-b border-gray-300 text-sm text-gray-700 text-nowrap">
                        <img
                          src={`https://pub-c053b04a208d402dac06392a3df4fd32.r2.dev/Attire_Idyll/image/${product.image}`}
                          alt={product.name}
                          className="w-16 h-16 object-cover"
                        />
                      </td>
                      <td className="px-3 py-2 border-b border-gray-300 text-sm text-gray-700 text-nowrap">
                        {product.name}
                      </td>
                      <td className="px-3 py-2 border-b border-gray-300 text-sm text-gray-700 text-nowrap">
                        ৳{product.price.toFixed(2)}
                      </td>
                      <td className="px-3 py-2 border-b border-gray-300 text-sm text-gray-700 text-nowrap">
                        {product.code}
                      </td>
                      <td className="px-3 py-2 border-b border-gray-300 text-sm text-gray-700 text-nowrap">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleQuantityChange(index, -1)}
                            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                          >
                            -
                          </button>
                          <span>{productQuantity}</span>
                          <button
                            onClick={() => handleQuantityChange(index, 1)}
                            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="px-3 py-2 border-b border-gray-300 text-sm text-gray-700 text-nowrap">
                        ৳{totalPrice.toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="my-4 px-6">
              <table className="min-w-full table-auto rounded bg-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border-gray-300 text-left text-sm font-medium text-gray-800 text-nowrap">
                      Payment Method
                    </th>
                    <th className="px-4 py-2 border-gray-300 text-left text-sm font-medium text-gray-800 text-nowrap">
                      Sub Total
                    </th>
                    <th className="px-4 py-2 border-gray-300 text-left text-sm font-medium text-gray-800 text-nowrap">
                      Delivery Charge
                    </th>
                    <th className="px-4 py-2 border-gray-300 text-left text-sm font-medium text-gray-800 text-nowrap">
                      Grand Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className=" transition-colors">
                    {/* Payment Method */}
                    <td className="px-4 py-3 text-sm text-gray-700  text-nowrap">
                      Cash On Delivery
                    </td>

                    {/* Calculate Sub Total */}
                    <td className="px-4 py-3 text-sm text-gray-700 text-nowrap">
                      ৳
                      {(() => {
                        const subTotal = (
                          order?.order_products ||
                          order?.online_order_products ||
                          []
                        ).reduce(
                          (acc, product, index) =>
                            acc + product.price * (quantities[index] || 1),
                          0
                        );
                        return subTotal.toFixed(2);
                      })()}
                    </td>

                    {/* Delivery Charge */}
                    <td className="px-4 py-3 text-sm text-gray-700 text-nowrap">
                      ৳ {order?.delivery_charge?.toFixed(2) || "0.00"}
                    </td>

                    {/* Calculate Grand Total */}
                    <td className="px-4 py-3 text-sm  text-teal-600 font-semibold  text-nowrap">
                      ৳
                      {(() => {
                        const subTotal = (
                          order?.order_products ||
                          order?.online_order_products ||
                          []
                        ).reduce(
                          (acc, product, index) =>
                            acc + product.price * (quantities[index] || 1),
                          0
                        );
                        const grandTotal =
                          subTotal + (order?.delivery_charge || 0);
                        return grandTotal.toFixed(2);
                      })()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-span-12 md:col-span-3">
          <div className="p-4 border border-gray-300 rounded">
            {" "}
            <p className="text-sm md:text-base font-medium"> Order logs</p>
            <p className="text-sm mt-1 text-teal-600 font-medium">
              No logs found
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
