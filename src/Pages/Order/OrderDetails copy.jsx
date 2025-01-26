/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import InvoiceModal from "./InvoiceModal";
import { printInvoice } from "./InvoicePrint";
import { jsPDF } from "jspdf";

const OrderDetails = () => {
  // const [openDropdown, setOpenDropdown] = useState(null); // Track open dropdown (null means none)

  // const toggleDropdown = (dropdown) => {
  //   if (openDropdown === dropdown) {
  //     // If the clicked dropdown is already open, close it
  //     setOpenDropdown(null);
  //   } else {
  //     // Otherwise, open the clicked dropdown
  //     setOpenDropdown(dropdown);
  //   }
  // };

  const location = useLocation();
  const order = location.state?.order; // Access the passed order details

  if (!order) {
    return <p>No order details available.</p>;
  }

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

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

  return (
    <div className="text-gray-800">
      <div className="flex  justify-between mt-1 px-4 py-3 rounded border border-gray-300 items-center">
        <h1 className="text-lg md:text-lg font-medium ">Order Details</h1>

        <div className="flex gap-3">
          <button
            onClick={() => handlePrintInvoice(order)}
            className="px-4 py-2 rounded text-white bg-gray-800 text-sm"
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
            className="px-4 py-2 rounded text-white bg-teal-600 text-sm"
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
          <div className="flex justify-between p-4">
            <div>
              <p className="text-sm md:text-base font-medium text-gray-800">
                Invoice{" "}
                <span className="text-teal-600">
                  {" "}
                  #Order ID: {order.unique_id}
                </span>
              </p>

              <p className="text-sm mt-2 font-meidum text-gray-600">
                Order Date: {formatDate(order.created_at)}
              </p>

              <p className="text-sm mt-2 font-meidum text-gray-600">
                <span>
                  <i className="fas fa-map-marker-alt mr-1"></i>
                </span>{" "}
                Default Location{" "}
              </p>
            </div>
            {/* 
            <div className="flex items-center gap-4 mt-4">
      <div className="flex flex-col">
        <label
          htmlFor="delivery-status"
          className="text-sm font-medium text-gray-600"
        >
          Delivery Status
        </label>
        <div className="relative">
          <div
            onClick={() => toggleDropdown("delivery")}
            className="cursor-pointer mt-1 block w-full rounded px-2 py-1 border border-gray-300 -sm focus:border-indigo-600 focus:ring-indigo-600 sm:text-sm"
          >
            <span className="flex justify-between">
              <span>Select Delivery Status</span>
              {openDropdown === "delivery" ? (
                <FaChevronUp className="text-gray-600" />
              ) : (
                <FaChevronDown className="text-gray-600" />
              )}
            </span>
          </div>

          {openDropdown === "delivery" && (
            <div className="absolute left-0 mt-1 w-full bg-white border border-gray-300 -lg z-10">
              <div className="p-2">
                <div className="cursor-pointer hover:bg-gray-100 p-2">Pending</div>
                <div className="cursor-pointer hover:bg-gray-100 p-2">Shipped</div>
                <div className="cursor-pointer hover:bg-gray-100 p-2">Delivered</div>
                <div className="cursor-pointer hover:bg-gray-100 p-2">Cancelled</div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="payment-status"
          className="text-sm font-medium text-gray-600"
        >
          Payment Status
        </label>
        <div className="relative">
          <div
            onClick={() => toggleDropdown("payment")}
            className="cursor-pointer mt-1 block w-full rounded px-2 py-1 border border-gray-300 -sm focus:border-indigo-600 focus:ring-indigo-600 sm:text-sm"
          >
            <span className="flex justify-between">
              <span>Select Payment Status</span>
              {openDropdown === "payment" ? (
                <FaChevronUp className="text-gray-600" />
              ) : (
                <FaChevronDown className="text-gray-600" />
              )}
            </span>
          </div>

          {openDropdown === "payment" && (
            <div className="absolute left-0 mt-1 w-full bg-white border border-gray-300 -lg z-10">
              <div className="p-2">
                <div className="cursor-pointer hover:bg-gray-100 p-2">Unpaid</div>
                <div className="cursor-pointer hover:bg-gray-100 p-2">Paid</div>
                <div className="cursor-pointer hover:bg-gray-100 p-2">Refunded</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div> */}
          </div>

          {/* Customer Info */}
          <div className="mt-1 flex justify-between p-4">
            <div>
              <p className="text-sm md:text-base  font-medium">
                {" "}
                Customer Info
              </p>

              <p className="text-sm mt-1 text-gray-600 ">
                Name: {order.c_name}
              </p>
              <p className="text-sm mt-1 text-gray-600 ">
                Email: poscustomer103@example.com{" "}
              </p>
              <p className="text-sm mt-1 text-gray-600">
                Phone:{order.c_phone}
              </p>
            </div>

            <div>
              <p className="text-sm md:text-base  font-medium">
                {" "}
                Shipping Address
              </p>
              <p className="text-sm mt-1 text-gray-600">
                {" "}
                {order.address.length > 20
                  ? `${order.address.substring(0, 15)}.....`
                  : order.address}
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b border-gray-300 text-left text-sm font-medium text-gray-800">
                    SL
                  </th>
                  <th className="px-4 py-2 border-b border-gray-300 text-left text-sm font-medium text-gray-800">
                    Product Image
                  </th>
                  <th className="px-4 py-2 border-b border-gray-300 text-left text-sm font-medium text-gray-800">
                    Product Name
                  </th>
                  <th className="px-4 py-2 border-b border-gray-300 text-left text-sm font-medium text-gray-800">
                    Product Price
                  </th>
                  <th className="px-4 py-2 border-b border-gray-300 text-left text-sm font-medium text-gray-800">
                    Product Code
                  </th>

                  <th className="px-4 py-2 border-b border-gray-300 text-left text-sm font-medium text-gray-800">
                    Qty{" "}
                  </th>
                  <th className="px-4 py-2 border-b border-gray-300 text-left text-sm font-medium text-gray-800">
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
                  // Split the s_product_qty string to get quantities for each product
                  const productQuantities = order?.s_product_qty
                    ?.split(",")
                    .map(Number);

                  // Get the quantity for the current product
                  const productQuantity = productQuantities[index];

                  // Calculate total price
                  const totalPrice = product.price * productQuantity;

                  return (
                    <tr key={product.id}>
                      <td className="px-4 py-2 border-b border-gray-300 text-sm text-gray-700">
                        {index + 1}
                      </td>
                      <td className="px-4 py-2 border-b border-gray-300 text-sm text-gray-700">
                        <img
                          src={`https://pub-c053b04a208d402dac06392a3df4fd32.r2.dev/Attire_Idyll/image/${product.image}`}
                          alt={product.name}
                          className="w-16 h-16 object-cover"
                        />
                      </td>
                      <td className="px-4 py-2 border-b border-gray-300 text-sm text-gray-700">
                        {product.name}
                      </td>
                      <td className="px-4 py-2 border-b border-gray-300 text-sm text-gray-700">
                        ৳{product.price.toFixed(2)}
                      </td>
                      <td className="px-4 py-2 border-b border-gray-300 text-sm text-gray-700">
                        {product.code}
                      </td>
                      <td className="px-4 py-2 border-b border-gray-300 text-sm text-gray-700">
                        {productQuantity} {/* Display the correct quantity */}
                      </td>
                      <td className="px-4 py-2 border-b border-gray-300 text-sm text-gray-700">
                        ৳{totalPrice.toFixed(2)} {/* Display the total price */}
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
                    <th className="px-4 py-2 border-gray-300 text-left text-sm font-medium text-gray-800">
                      Payment Method
                    </th>
                    <th className="px-4 py-2 border-gray-300 text-left text-sm font-medium text-gray-800">
                      Sub Total
                    </th>
                    <th className="px-4 py-2 border-gray-300 text-left text-sm font-medium text-gray-800">
                      Delivery Charge{" "}
                    </th>
                    <th className="px-4 py-2 border-gray-300 text-left text-sm font-medium text-gray-800">
                      Grand Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-3 text-sm text-gray-600">
                      Cash On Delivery
                    </td>
                    {/* Sub Total */}
                    <td className="px-6 py-3 text-sm text-gray-600">
                      ৳
                      {(
                        order?.order_products ||
                        order?.online_order_products ||
                        []
                      )
                        .reduce((acc, product, index) => {
                          // Ensure the quantity is handled properly (fallback to 1 if not provided)
                          const productQty =
                            order?.s_product_qty?.split(",")?.map(Number)[
                              index
                            ] ||
                            product.qty ||
                            1;
                          return acc + product.price * productQty;
                        }, 0)
                        .toFixed(2)}
                    </td>
                    {/* Delivery Charge */}
                    <td className="px-6 py-3 text-sm text-gray-600">
                      ৳ {order?.delivery_charge?.toFixed(2) || "0.00"}
                    </td>
                    {/* Grand Total */}
                    <td className="px-6 py-3 text-sm text-gray-600">
                      ৳
                      {(
                        (
                          order?.order_products ||
                          order?.online_order_products ||
                          []
                        ).reduce((acc, product, index) => {
                          const productQty =
                            order?.s_product_qty?.split(",")?.map(Number)[
                              index
                            ] ||
                            product.qty ||
                            1;
                          return acc + product.price * productQty;
                        }, 0) + (order?.delivery_charge || 0)
                      ).toFixed(2)}
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
