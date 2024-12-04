import { useState, useEffect, useContext } from "react";
import Navbar from "../../Component/Frontend/Navbar";
import Footer from "../../Component/Frontend/Footer";
import axios from "axios";
import Swal from "sweetalert2";
import CustomSelect from "../../Component/Frontend/Checkout/CustomSelect";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../Component/Frontend/CartContext";
import SocialMedia from "../../Component/Frontend/SocialMedia";

const Order = () => {
  const [errors, setErrors] = useState({});

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const { cart, removeFromCart } = useContext(CartContext);

  const navigate = useNavigate(); // Initialize useNavigate

  const [loading, setLoading] = useState(false);

  // console.log(name);

  // console.log(phone);
  // console.log(address);
  // console.log(codAmount);

  const [products, setProducts] = useState([]);
  const [deliveryCharge, setDeliveryCharge] = useState(0);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("cart")) || [];
    setProducts(storedProducts);
  }, []);

  useEffect(() => {
    console.log(products);
  }, [products]);

  const totalPrice = cart.reduce((acc, product) => {
    const count = product.quantity ?? 1;
    const discountedPrice = product.price - (product.discount_amount ?? 0);
    return acc + discountedPrice * count; // Accumulate discounted total
  }, 0);

  const totalAmountWithDelivery =
    cart.reduce((acc, product) => {
      const count = product.quantity ?? 1;
      const discountedPrice = product.price - (product.discount_amount ?? 0);
      return acc + discountedPrice * count;
    }, 0) + deliveryCharge;

  const handleDeliveryChange = (e) => {
    const charge = e.target.value === "insideDhaka" ? 60 : 100;
    setDeliveryCharge(charge);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append(
      "product_ids",
      cart.map((product) => product.id)
    );
    formData.append(
      "s_product_qty",
      cart.map((product) => product.quantity)
    );
    formData.append("c_name", name);
    
    formData.append("c_phone", phone);
    // formData.append('courier', courier);
    // formData.append('note', note);
    formData.append("source", "online");
    formData.append("address", address);
    
    formData.append("delivery_charge", deliveryCharge);
    formData.append("note", note);
    formData.append("cod_amount", totalAmountWithDelivery);

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    +setLoading(true); // Start loading
    try {
      const response = await axios.post(
        "https://admin.attireidyll.com/api/public/order/create",
        formData,
        {}
      );

      console.log(response);
      if (response.data.status) {
        navigate("/thankyou");

        // Reset form fields
        setName("");
        setPhone("");
        setAddress("");
        setErrors({});
        setDeliveryCharge("");
        setNote("");
      }

      //  else if (response.data.type === 'invalid') {
      //     toast.error(response.data.message);
      //   }
      else {
        const newErrors = response.data.error || {};

        console.log(newErrors);
        setErrors(newErrors);
        // handleErrors(newErrors);

        // toast.error(Object.keys(response.data.error).map((field) => ` ${response.data.error[field][0]}`));
      }
    } catch (error) {
      console.error(
        "Error saving Order:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />

      <div className=" mx-auto md:px-4 pt-8 md:pt-20 ">
        <div className="md:w-[90%] mx-auto">
          <div className="grid grid-cols-12 mt-5 space-y-5 lg:space-y-0 lg:space-x-4">
            {/* Responsive table */}
            <div className="hidden md:block border md:rounded-md col-span-12 md:col-span-8 px-4 py-2">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-teal-600 px-2 py-3 font-semibold text-sm md:text-xl text-left">
                      Your Products
                    </th>
                    <th className="text-teal-600 px-2 py-3 font-semibold text-sm md:text-xl text-right">
                      Subtotal
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((product) => {
                    const count = product.quantity ?? 1; // Assume count is part of product or default to 1
                    const productTotalPrice =
                      (product.price - (product.discount_amount ?? 0)) * count; // Calculate individual product total

                    return (
                      <tr
                        key={product.id}
                        className="hover:bg-teal-50 border-b"
                      >
                        <td className="p-2  my-4 flex items-center">
                          <div className="relative">
                            <div className="absolute -top-4 -right-2">
                              <p className="flex items-center justify-center rounded-full bg-red-500 size-2 p-2 md:p-3 text-sm text-white">
                                {product.quantity}
                              </p>
                            </div>
                            <img
                              src={`https://admin.attireidyll.com/public/storage/product/${product?.image}`}
                              className="size-16 md:size-20"
                              alt={product?.name}
                            />
                          </div>
                          <div className="ms-2 md:ms-4">
                            <p className="mb-1 font-semibold">
                              {product.name}
                            </p>
                            <p className="font-meidum text-gray-600">
                              Price: {product.price}৳
                            </p>
                            {product.discount_amount && (
                              <p className="text-red-700 text-sm md:text-sm">
                                Discount: {product.discount_amount}৳
                              </p>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-2 text-sm md:text-base text-black font-medium text-right">
                          {productTotalPrice}৳
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Responsive form */}
            <div className=" col-span-12 md:col-span-4 mb-2 text-sm md:text-base ">
              <form
                onSubmit={handleSave}
                className="  border md:rounded-md px-4 py-2"
              >
                <h2 className="text-lg mb-2 md:text-xl font-semibold  text-teal-600">
                  Order Delivery Details
                </h2>
                <div className="mb-2">
                  <label
                    className="block text-gray-700 md:text-base text-sm font-semibold mb-2"
                    htmlFor="recipientName"
                  >
                    Name
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    id="customerName"
                    placeholder="Enter your name"
                    className="border mb-2 md:text-sm text-sm rounded w-full p-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />

                  {errors.c_name && (
                    <p className="text-red-500 text-sm">{errors.c_name[0]}</p>
                  )}
                </div>
                <div className="mb-2">
                  <label
                    className="block text-gray-700 md:text-base text-sm font-semibold mb-2"
                    htmlFor="phoneNumber"
                  >
                    Phone No
                  </label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    type="tel"
                    id="phoneNumber"
                    placeholder="Enter your phone number"
                    className="mb-2 border md:text-sm text-sm rounded w-full p-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />

                  {errors.c_phone && (
                    <p className="text-red-500 text-sm">{errors.c_phone[0]}</p>
                  )}
                </div>
                <div className="mb-1">
                  <label
                    className="block text-gray-700 md:text-base text-sm font-semibold mb-2"
                    htmlFor="address"
                  >
                    Delivery Address
                  </label>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    id="address"
                    placeholder="Enter your delivery address"
                    className=" border md:text-sm text-sm rounded w-full p-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  ></textarea>
                </div>

                {errors.address && (
                  <p className="text-red-500 text-sm">{errors.address[0]}</p>
                )}

                {/* Delivery Charge Selection */}
                <div className="mb-3">
                  <span className="block text-gray-700 md:text-base text-sm font-semibold mb-2">
                    Delivery Charge
                  </span>
                  <div className="text-nowrap grid grid-cols-1 md:grid-cols-2 md:text-base text-sm mb-2">
                    <label className="inline-flex items-center mr-4 mb-2 md:mb-0 ">
                      <input
                        type="radio"
                        className="form-radio required"
                        name="deliveryCharge"
                        value="insideDhaka"
                        required
                        onChange={handleDeliveryChange}
                      />
                      <span className="ml-1">Inside Dhaka-60</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio required"
                        name="deliveryCharge"
                        value="outsideDhaka"
                        required
                        onChange={handleDeliveryChange}
                      />
                      <span className="ml-1">Outside Dhaka-100</span>
                    </label>
                  </div>
                </div>

                <div className="mb-2">
                  <label
                    className="block text-gray-700 md:text-base text-sm font-semibold my-2"
                    htmlFor="paymentMethod"
                  >
                    Payment Method
                  </label>
                  <CustomSelect />
                </div>

                <div className="mb-1">
                  <label
                    className="block text-gray-700 md:text-base text-sm font-semibold mb-2"
                    htmlFor="address"
                  >
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    id="note"

                    placeholder="Enter your note"
                    className=" border md:text-sm text-sm rounded w-full p-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  ></textarea>
                </div>

                {/* Summary Section */}
                <div className="mt-4">
                  <h3 className="font-semibold text-lg md:text-xl text-teal-600 mb-3">
                    Order Summary
                  </h3>
                  <div className="mb-2 block md:hidden ">
                    {cart.map((product) => (
                      <div
                        key={product.id}
                        className="flex justify-between mb-2"
                      >
                        <p className="flex gap-2">
                          {product.name} <span>X {product.quantity}</span>
                        </p>
                        <p className="font-medium">{product.price}৳</p>
                      </div>
                    ))}
                  </div>
                  <p className="flex justify-between mb-2 text-sm md:text-base">
                    <span>Subtotal:</span>
                    <span>৳{totalPrice}</span>
                  </p>
                  <p className="flex justify-between text-sm md:text-base">
                    <span>Delivery Charge:</span>
                    <span>{deliveryCharge}৳</span>
                  </p>

                  <hr className="border border-gray-400 my-3" />
                  <p className="flex justify-between text-base md:text-lg font-semibold ">
                    <span>Total Amount:</span>
                    <span className="text-gray-600">
                      ৳{totalAmountWithDelivery}
                    </span>
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="text-center mt-6 mb-4">
                  <button
                    type="submit"
                    className="hidden md:block mx-auto w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold py-2 px-6 text-base  rounded-md "
                  >
                    <span className="me-2">Place Order</span>
                    <i className="fas fa-shopping-bag text-white text-base md:text-lg animate-bounce"></i>
                  </button>
                </div>

                <div
                  className="gap-2 mx-auto  md:hidden fixed flex flex-col items-center justify-center bottom-0 w-full bg-gradient-to-t from-gray-50 to-white shadow-lg z-50 
       px-6 py-4"
                >
                  <p className="flex justify-between text-base md:text-lg font-semibold ">
                    <span>Total Amount:</span>
                    <span className="text-yellow-600">
                      ৳{totalAmountWithDelivery}
                    </span>
                  </p>
                  <button
                    type="submit"
                    className="block mx-auto md:hidden  bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold py-2 px-6 text-lg rounded-full w-full"
                  >
                    <span className="me-2">Place Order</span>
                    <i className="fas fa-shopping-bag text-white text-lg animate-bounce"></i>
                  </button>
                </div>
              </form>
              <div
                className="gap-2 mx-auto  md:hidden fixed flex flex-col items-center justify-center bottom-0 w-full bg-gradient-to-t from-gray-50 to-white shadow-lg z-50 
       px-6 py-4"
              >
                <p className="flex justify-between text-base md:text-lg font-semibold ">
                  <span>Total Amount:</span>
                  <span className="text-yellow-600">
                    ৳{totalAmountWithDelivery}
                  </span>
                </p>
                <button
                  type="submit"
                  onClick={handleSave}
                  className="block mx-auto md:hidden  bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold py-2 px-6 text-lg rounded-full w-full"
                >
                  <span className="me-2">Place Order</span>
                  <i className="fas fa-shopping-bag text-white text-lg animate-bounce"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md:block">
        <Footer />
      </div>
    </div>
  );
};

export default Order;
