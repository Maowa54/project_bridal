/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import InvoiceModal from "./InvoiceModal";
import { printInvoice } from "./InvoicePrint";
import { jsPDF } from "jspdf";
import Swal from "sweetalert2";
import axios from "axios";
import Select from "react-select";

const OrderDetails = () => {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    return <p>No order details available.</p>;
  }

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const [orderProducts, setOrderProducts] = useState(
    order?.order_products || []
  );
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [online, setOnline] = useState([]);

  // Fetch products from API with cache
  const fetchApiData = async () => {
    try {
      const cacheKey = "allProducts";
      const cacheTimeKey = "allProducts_timestamp";
      const cacheValidityDuration = 60 * 60 * 1000; // 1 hour

      const cachedData = localStorage.getItem(cacheKey);
      const cachedTimestamp = localStorage.getItem(cacheTimeKey);
      const now = Date.now();

      if (
        cachedData &&
        cachedTimestamp &&
        now - parseInt(cachedTimestamp) < cacheValidityDuration
      ) {
        // Use cached data if it's still valid
        setProducts(JSON.parse(cachedData));
        return;
      }

      // Fetch data if cache is not valid
      const response = await axios.get(
        "https://admin.attireidyll.com/api/all/product/get"
      );

      if (response.data.status) {
        const fetchedProducts = response.data.data.data;

        // Cache fetched data and timestamp
        localStorage.setItem(cacheKey, JSON.stringify(fetchedProducts));
        localStorage.setItem(cacheTimeKey, now.toString());

        setProducts(fetchedProducts);
      }
    } catch (error) {
      console.error("Error fetching API data:", error);
    }
  };

  useEffect(() => {
    fetchApiData();
  }, []);

  const handleAddProduct = () => {
    if (selectedProduct) {
      // Check if the selected product is already in the list
      const isProductInOrder = orderProducts.some(
        (orderProduct) => orderProduct.id === selectedProduct.id
      );

      if (isProductInOrder) {
        Swal.fire({
          icon: "error",
          title: "Product already in the list!",
          text: "This product has already been added to the order.",
        });
        return;
      }

      // Add selected product to the table with default quantity 1
      setOrderProducts((prevProducts) => [
        ...prevProducts,
        { ...selectedProduct, quantity: 1 },
      ]);
      setQuantities((prevQuantities) => [...prevQuantities, 1]);

      Swal.fire({
        icon: "success",
        title: "Product added successfully!",
        text: `${selectedProduct.name} has been added to your order.`,
      });

      setSelectedProduct(""); // Clear selection
    } else {
      Swal.fire({
        icon: "warning",
        title: "No product selected",
        text: "Please select a product to add to the order.",
      });
    }
  };

  useEffect(() => {
    if (token) {
      fetchOnlineOrders();
    }
  }, [token]);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  // Quantity handling logic
  const initialQuantities = order?.s_product_qty?.split(",").map(Number) || [];

  const [quantities, setQuantities] = useState(initialQuantities);

  const handleQuantityChange = (index, change) => {
    setQuantities((prevQuantities) => {
      const updatedQuantities = [...prevQuantities];
      updatedQuantities[index] = Math.max(1, updatedQuantities[index] + change); // Ensure quantity doesn't go below 1
      return updatedQuantities;
    });
  };

  // const handleProductChange = (selectedOption) => {
  //   if (selectedOption) {
  //     setSelectedProduct(selectedOption); // Store the full product object
  //   } else {
  //     setSelectedProduct(""); // Clear the selection
  //   }
  // };

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

  // Cancel order function
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
      doc.text(productTotal.toString(), 180, yOffset);

      yOffset += 10;
    });

    // Delivery Charge
    const deliveryCharge = order?.delivery_charge || 0;
    yOffset += 10;
    doc.text(`Delivery Charge:  Tk ${deliveryCharge}`, 20, yOffset); // Ensure the proper character

    // Total Amount (including Delivery Charge)
    const finalTotal = totalAmount + deliveryCharge; // Adding delivery charge to the total amount
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
      <div className="flex flex-col gap-2 md:flex-row  justify-between mt-1 px-5 py-3 rounded border border-gray-300 items-center">
        <h1 className=" md:text-lg font-medium ">Order Details</h1>

        <div className="flex gap-3">
          <button
            onClick={() => handlePrintInvoice(order)}
            className="px-3 py-2 rounded text-white bg-gray-800 text-xs md:text-sm"
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
            className="px-3 py-2 rounded text-white bg-teal-500 font-medium hover:bg-teal-600 text-xs md:text-sm"
          >
            <span>
              <i className="fas fa-download mr-2 text-white"></i>
            </span>
            Download Invoice
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:-cols-2 mt-4 gap-2 md:gap-4">
        <div className=" border border-gray-300 rounded  ">
          <div className="bg-white rounded  p-3 md:p-6 space-y-6">
            {/* Invoice Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="space-y-2">
                <p className="text-sm md:text-base font-medium text-gray-800">
                  <span className="text-teal-600">
                    #Order ID: {order.unique_id}
                  </span>
                </p>
                <p className="text-sm text-gray-500">
                  <span className="text-gray-600 font-medium">Order Date:</span>{" "}
                  {formatDate(order.created_at)}
                </p>
                <p className="text-sm text-gray-500">
                  <span className="text-gray-600 font-medium">Order Time:</span>{" "}
                  {formatTime(order.created_at)}
                </p>
              </div>

              {/* Add Product Section */}
              <div className="mt-2  md:mt-0 md:mb-2">
                <p className="text-sm md:text-base mb-2 font-medium text-gray-800">
                  Add More Product{" "}
                  <span className="ml-2 font-medium text-teal-600 ">+</span>{" "}
                </p>
                <div className="flex justify-between gap-2">
                  <Select
                    options={products.map((product) => ({
                      label: product.name, // Show product name
                      value: product.id, // Store product id
                      ...product, // Include all product data for later use
                    }))}
                    value={
                      selectedProduct
                        ? {
                            label: selectedProduct.name,
                            value: selectedProduct.id,
                          }
                        : null
                    }
                    placeholder="Select or type a product"
                    className="text-xs md:text-sm w-full"
                    isClearable
                    onChange={(option) => setSelectedProduct(option || "")} // Store selected product
                  />

                  <button
                    className="rounded px-2 md:px-3 py-2 bg-teal-500 text-white text-nowrap text-xs md:text-sm font-medium"
                    onClick={handleAddProduct}
                  >
                    Add Product
                  </button>
                </div>
              </div>
            </div>

            {/* Customer Info Section */}
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="space-y-2">
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
              <div className="p-1">
                <p className="text-sm md:text-base text-nowrap font-medium text-gray-800">
                  Confirm Or Cancel Order?
                </p>
                <div className="flex gap-4 mt-4">
                  <button
                    onClick={() => fetchConfirmOrder(order.id)}
                    className="px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded hover:bg-teal-700 focus:ring-2 focus:ring-teal-500"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => fetchCancelOrder(order.id)}
                    className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700 focus:ring-2 focus:ring-red-500"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border-t border-gray-300 mt-4">
              <thead>
                <tr>
                  <th className="p-3 border-b border-gray-300 text-left text-sm font-medium text-gray-800">
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
                    Quantity
                  </th>
                  <th className="px-3 py-2 border-b border-gray-300 text-left text-sm font-medium text-gray-800">
                    Total Price
                  </th>
                  <th className="px-3 py-2 border-b border-gray-300 text-left text-sm font-medium text-gray-800">
                    Remove
                  </th>
                </tr>
              </thead>
              <tbody>
                {orderProducts.map((product, index) => {
                  const totalPrice = product.price * quantities[index];

                  // Function to handle product removal
                  const handleRemoveProduct = () => {
                    const updatedOrderProducts = [...orderProducts];
                    const updatedQuantities = [...quantities];

                    // Remove the product and its quantity
                    updatedOrderProducts.splice(index, 1);
                    updatedQuantities.splice(index, 1);

                    // Update state
                    setOrderProducts(updatedOrderProducts);
                    setQuantities(updatedQuantities);
                  };

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
                        ৳{product.price}
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
                          <span>{quantities[index]}</span>
                          <button
                            onClick={() => handleQuantityChange(index, 1)}
                            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="px-3 py-2 border-b border-gray-300 text-sm text-gray-700 text-nowrap">
                        ৳{totalPrice}
                      </td>
                      <td className="px-3 py-2 border-b border-gray-300 text-sm text-gray-700 text-nowrap">
                        <button
                          onClick={handleRemoveProduct}
                          className="px-4 py-1 text-red-500 rounded"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
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
                  <tr className="transition-colors">
                    {/* Payment Method */}
                    <td className="px-4 py-3 text-sm text-gray-700 text-nowrap">
                      Cash On Delivery
                    </td>

                    {/* Calculate Sub Total */}
                    <td className="px-4 py-3 text-sm text-gray-700 text-nowrap">
                      ৳
                      {(() => {
                        const subTotal = orderProducts.reduce(
                          (acc, product, index) =>
                            acc + product.price * quantities[index],
                          0
                        );
                        return subTotal.toFixed(2); // Format to 2 decimal places
                      })()}
                    </td>

                    {/* Delivery Charge */}
                    <td className="px-4 py-3 text-sm text-gray-700 text-nowrap">
                      ৳
                      {order?.delivery_charge !== undefined &&
                      order?.delivery_charge !== null
                        ? order.delivery_charge.toFixed(2)
                        : "0.00"}
                    </td>

                    {/* Calculate Grand Total */}
                    <td className="px-4 py-3 text-sm text-teal-600 font-semibold text-nowrap">
                      ৳
                      {(() => {
                        const subTotal = orderProducts.reduce(
                          (acc, product, index) =>
                            acc + product.price * quantities[index],
                          0
                        );
                        const grandTotal =
                          subTotal + (order?.delivery_charge || 0);
                        return grandTotal.toFixed(2); // Format to 2 decimal places
                      })()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
