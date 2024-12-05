import axios from "axios";
import { useEffect, useRef, useState } from "react";
// import { FaSortAmountDown } from "react-icons/fa";
import Swal from "sweetalert2";
import { ImSpinner10 } from "react-icons/im";
import toast from "react-hot-toast";

const Default = ({
  totalPrice,
  singleQuantity,
  variationQuantity,
  removeAllProducts,
  businessId,
  productStock,
  productVariations,
  handleErrors,
}) => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const clientId = localStorage.getItem("clientId");
  console.log(businessId);
  const [inputValue, setInputValue] = useState("");
  const [advance, setAdvance] = useState("");
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("%");
  const [isNoteVisible, setIsNoteVisible] = useState(false);
  const dropdownRef = useRef(null);

  const [deliveryCharge, setDeliveryCharge] = useState("");
  const [subtotal, setSubtotal] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [courier, setCourier] = useState("");
  const [note, setNote] = useState("");
  const [source, setSource] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const toggleDropdown = (e) => {
    e.preventDefault();
    setDropdownOpen(!isDropdownOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setDropdownOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setDeliveryCharge(value);
  };

  const deliveryChargeNum = Number(deliveryCharge) || 0;
  const totalPriceNum = Number(totalPrice) || 0;
  const advanceNum = Number(advance) || 0;

  useEffect(() => {
    let discountAmount = 0;

    if (inputValue) {
      if (selectedOption === "%") {
        discountAmount = (totalPriceNum * parseFloat(inputValue)) / 100;
      } else if (selectedOption === "Fixed") {
        discountAmount = parseFloat(inputValue);
      }
    }

    const newSubtotal = totalPriceNum + deliveryChargeNum - discountAmount;
    setSubtotal(newSubtotal);
  }, [inputValue, selectedOption, totalPriceNum, deliveryChargeNum]);

  const dueAmount = subtotal - advanceNum;

  const cacheKey = `orders_${clientId}`;
  const cacheTimeKey = `orders_${clientId}_timestamp`;

  const handleSave = async (e) => {
    e.preventDefault();

    if (totalPrice === 0) {
      Swal.fire({
        position: "top-end",
        icon: "warning",
        title: "Please select a Product",
        showConfirmButton: true,
        timer: 2000,
      });
      return;
    }
    if (
      Array.isArray(productStock) &&
      productStock.length === 1 &&
      productStock[0] === 0
    ) {
      Swal.fire({
        position: "top-end",
        timer: 2000,
        icon: "warning",
        title: "Product Stock is Empty",
        showConfirmButton: true,
      });
      return;
    }

    const formData = new FormData();
    formData.append("client_id", clientId);
    formData.append("user_id", userId);
    formData.append("business_id", businessId);
    formData.append("product_ids", productVariations);
    formData.append("s_product_qty", singleQuantity);
    formData.append("v_product_qty", variationQuantity);
    formData.append("c_name", customerName);
    formData.append("c_phone", phoneNumber);
    formData.append("courier", courier);
    formData.append("note", note);
    formData.append("source", source);
    formData.append("address", address);
    formData.append("created_by", userId);
    formData.append("advance", advance);
    formData.append("discount_amount", inputValue);
    formData.append("delivery_charge", deliveryCharge);
    formData.append("cod_amount", dueAmount);

    setLoading(true); // Start loading
    try {
      const response = await axios.post(
        "https://admin.attireidyll.com/api/order/create",
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
          title: response.data.message || "Order created successfully!",
          showConfirmButton: false,
          timer: 2000,
        });

        localStorage.removeItem(cacheKey);
        localStorage.removeItem(cacheTimeKey);

        // Reset form fields
        setCustomerName("");
        setPhoneNumber("");
        setCourier("");
        setAddress("");
        setNote("");
        setSource("");
        setAdvance("");
        setErrors({});
        setDeliveryCharge("");
        removeAllProducts();
        handleErrors("");
      }

      //  else if (response.data.type === 'invalid') {
      //     toast.error(response.data.message);
      //   }
      else {
        const newErrors = response.data.error || {};
        setErrors(newErrors);
        handleErrors(newErrors);

        toast.error(
          Object.keys(response.data.error).map(
            (field) => ` ${response.data.error[field][0]}`
          )
        );
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
      <form onSubmit={handleSave}>
        <div className="">
          <div className="flex gap-3  md:flex-row">
            {/* phone */}
            <div className=" flex-1">
              <label
                htmlFor="phone"
                className="block  text-[14px] md:text-[16px] font-semibold  text-gray-600 dark:text-white"
              >
                Customer Phone
              </label>

              <input
                type="text"
                id="first_name"
                className="bg-white
            shadow-[rgba(0,_0,_0,_0.20)_0px_2px_6px] h-8
              text-[14px] md:text-[16px] font-semibold rounded-lg w-full p-1"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              {errors.c_phone && (
                <p className="text-red-500 text-sm">{errors.c_phone[0]}</p>
              )}
            </div>

            <div className=" flex-1">
              <label
                htmlFor="first_name"
                className="block  text-[14px] md:text-[16px] font-semibold  text-gray-600 dark:text-white"
              >
                Customer name
              </label>

              <input
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                type="text"
                id="first_name"
                className="bg-white shadow-[rgba(0,_0,_0,_0.20)_0px_2px_6px]  text-[14px] md:text-[16px] font-semibold rounded-lg w-full p-1"
              />
              {errors.c_name && (
                <p className="text-red-500 text-sm">{errors.c_name[0]}</p>
              )}
            </div>
          </div>

          {/* source */}

          <div className="flex gap-4 flex-row">
            <div className="flex-1 mx-auto">
              <h2 className="block  text-[14px] md:text-[16px] font-semibold  text-gray-600 dark:text-white">
                Source{" "}
              </h2>
              <select
                className="border h-9 border-gray-300 shadow-[rgba(0,_0,_0,_0.20)_0px_2px_6px]  text-gray-900 text-[14px] md:text-[16px] rounded-lg   block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={source}
                onChange={(e) => setSource(e.target.value)}
              >
                <option value="">select source</option>

                <option value="Facebook">Facebook</option>
                <option value="Instagram">Instagram</option>
                <option value="WhatsApp">WhatsApp</option>
                <option value="Phone Call">Phone Call</option>
              </select>
              {errors.source && (
                <p className="text-red-500 text-sm">{errors.source[0]}</p>
              )}
            </div>

            <div className="flex-1 mx-auto">
              <h2 className="block  text-[14px] md:text-[16px] font-semibold  text-gray-600 dark:text-white">
                Courier{" "}
              </h2>
              <select
                className="border h-9 border-gray-300 shadow-[rgba(0,_0,_0,_0.20)_0px_2px_6px]  text-gray-900 text-[14px] md:text-[16px] rounded-lg   block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={courier}
                onChange={(e) => setCourier(e.target.value)}
              >
                <option value="">select courier</option>
                <option value="redx">RedX</option>
                <option value="steadfast">Steed Fast</option>
                <option value="sundarban">Sunderban</option>
                <option value="SA-paribahan">SA-Paribahan</option>
                <option value="office-delivery">Office Delivery</option>
              </select>
              {errors.courier && (
                <p className="text-red-500 text-sm">{errors.courier[0]}</p>
              )}
            </div>
          </div>
        </div>
        <div className="flex md:flex-col flex-row gap-2">
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <label className="block text-[14px] md:text-[16px] font-semibold text-gray-600">
                Address
              </label>
              <div className="form-control">
                <label className="label gap-1 cursor-pointer">
                  <span className="label-text">Add Note</span>
                  <input
                    type="checkbox"
                    className="toggle toggle-info scale-75"
                    checked={isNoteVisible}
                    onChange={() => setIsNoteVisible(!isNoteVisible)}
                  />
                </label>
              </div>
            </div>

            {/* address */}
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="appearance-none h-16 md:h-12  border shadow-[rgba(0,_0,_0,_0.20)_0px_2px_6px] rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-1"
            ></textarea>

            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address[0]}</p>
            )}

            {/*note  */}
            {isNoteVisible && (
              <div className="mt-2">
                <label className="block text-[14px] md:text-[16px] font-semibold text-gray-600 dark:text-white">
                  Note
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="appearance-none h-16 md:h-12 border shadow-[rgba(0,_0,_0,_0.20)_0px_2px_6px] rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-1"
                ></textarea>
                {errors.note && (
                  <p className="text-red-500 text-sm">{errors.note[0]}</p>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="">
          <div className="  ">
            <div className="flex justify-between items-center">
              <h2 className="block   text-[15px]  font-semibold whitespace-nowrap  text-gray-600 dark:text-white">
                Advanced Paid{" "}
              </h2>
              <div className="flex justify-end ">
                <div className="form-control">
                  <label className="label gap-1 cursor-pointer">
                    <span className="label-text whitespace-nowrap">
                      Full Paid
                    </span>
                    <input
                      type="checkbox"
                      className="toggle toggle-info scale-75 "
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className=" flex  justify-between lg:flex-row gap-1 ">
              <div className="flex  items-center">
                <input
                  type="number"
                  value={advance}
                  onChange={(e) => setAdvance(e.target.value)}
                  className="w-full border shadow-[rgba(0,_0,_0,_0.20)_0px_2px_6px] h-8 pl-2 border-gray-300 rounded-l-md"
                />
                {errors.advance && (
                  <p className="text-red-500 text-sm">{errors.advance[0]}</p>
                )}

                <button className="px-2  h-8 bg-[#28DEFC] text-white rounded-r-md hover:bg-blue-600 ">
                  ৳
                </button>
              </div>

              <div className="  ">
                <div className="relative w-full" ref={dropdownRef}>
                  <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    className="px-1 pl-2 shadow-[rgba(0,_0,_0,_0.20)_0px_2px_6px] input input-bordered w-full h-8"
                    placeholder="Discount"
                  />

                  {errors.discount_amount && (
                    <p className="text-red-500 text-sm">
                      {errors.discount_amount[0]}
                    </p>
                  )}

                  <button
                    className="rounded-lg bg-[#28DEFC] text-white absolute right-0 top-0 rounded-l-none h-8"
                    onClick={toggleDropdown}
                  >
                    <div className="flex items-center px-2 gap-2">
                      <h1>{selectedOption}</h1>
                      {/* <FaSortAmountDown /> */}
                    </div>
                  </button>
                  {isDropdownOpen && (
                    <div className="dropdown-content absolute right-0 w-36 bg-white border border-gray-300 rounded shadow-lg">
                      <a
                        href="#"
                        className="block px-4 py-2 text-gray-800"
                        onClick={() => handleOptionClick("Fixed")}
                      >
                        Fixed
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-gray-800"
                        onClick={() => handleOptionClick("%")}
                      >
                        %
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="block text-[14px] md:text-[16px] font-semibold text-gray-600 dark:text-white">
            Delivery Charge
          </h2>
          <div className="flex rounded-lg justify-between  items-center shadow-[rgba(0,_0,_0,_0.20)_0px_2px_6px] border border-slate-100 px-1 md:py-2 py-0">
            <div className="form-control">
              <label className="cursor-pointer gap-1 label">
                <input
                  type="radio"
                  name="deliveryCharge"
                  value="80"
                  onChange={handleChange}
                  className="radio radio-info"
                />
                <span className="text-sm">Inside Dhaka ৳ 80</span>
              </label>
            </div>
            {errors.deliveryCharge && (
              <p className="text-red-500 text-sm">{errors.deliveryCharge[0]}</p>
            )}

            <div className="form-control">
              <label className="cursor-pointer gap-1 label">
                <input
                  type="radio"
                  name="deliveryCharge"
                  value="150"
                  onChange={handleChange}
                  className="radio radio-info"
                />
                <span className="text-sm">Outside Dhaka ৳ 150</span>
              </label>
            </div>
          </div>
        </div>

        <div>
          <div className="md:mt-2 mb-5 mt-0">
            {deliveryChargeNum > 0 && (
              <div className="flex justify-between items-center">
                <h1 className="md:text-[15px] text-[13px] text-gray-400">
                  Delivery Charge
                </h1>
                <h1 className="text-gray-400 text-[14px]">
                  <span className="text-[15px] md:text-[12px]">৳</span>{" "}
                  {deliveryChargeNum}
                </h1>
              </div>
            )}

            {totalPriceNum > 0 && (
              <div className="flex justify-between items-center">
                <h1 className="md:text-[15px] text-[13px] text-gray-400">
                  Order Price
                </h1>
                <h1 className="text-gray-400 text-[14px]">
                  <span className="text-[15px] md:text-[12px]">৳</span>{" "}
                  {totalPriceNum}
                </h1>
              </div>
            )}

            {inputValue && (
              <div className="flex justify-between items-center mt-2">
                <h1 className="md:text-[15px] text-[13px] text-gray-400">
                  Discount
                </h1>
                <h1 className="text-gray-400 text-[14px]">
                  {inputValue ? (
                    <span>
                      {selectedOption === "%"
                        ? `${inputValue}%`
                        : `৳${inputValue}`}
                    </span>
                  ) : (
                    <>
                      <span className="text-[15px] md:text-[12px]">৳</span> 0
                    </>
                  )}
                </h1>
              </div>
            )}
            {advance && advance > 0 && (
              <div className="flex justify-between items-center">
                <h1 className="md:text-[15px] text-[13px] text-gray-400">
                  Advance
                </h1>
                <h1 className="text-gray-400 text-[14px]">
                  <span className="text-[15px] md:text-[12px]">৳</span>{" "}
                  {advanceNum}
                </h1>
              </div>
            )}
            {totalPriceNum > 0 && (
              <div className="flex justify-between items-center">
                <h1 className="md:text-[15px] text-[13px] text-gray-400">
                  Due
                </h1>
                <h1 className="text-gray-400 text-[14px]">
                  <span className="text-[15px] md:text-[12px]">৳</span>{" "}
                  {dueAmount}
                </h1>
              </div>
            )}

            {totalPriceNum > 0 && (
              <div className="flex justify-between items-center">
                <h1 className="md:text-[15px] text-[13px] text-gray-500">
                  Subtotal
                </h1>
                <h1 className="text-gray-500 text-[14px]">
                  <span className="text-[15px] md:text-[12px]">৳</span>{" "}
                  {dueAmount}
                </h1>
              </div>
            )}

            <div className="my-5">
              <button
                type="submit"
                className="w-full rounded-lg px-2 py-3 text-white bg-[#28DEFC] hover:bg-[#444CB4] flex justify-between items-center"
                disabled={loading} // Disable button while loading
                onClick={handleSave}
              >
                {loading ? (
                  <div className="flex justify-center w-full">
                    <ImSpinner10
                      className="animate-spin text-white"
                      size={20}
                    />
                    <span className="px-2">Processing...</span>
                  </div>
                ) : (
                  <>
                    <h1 className="text-[18px] font-semibold">
                      Complete Order
                    </h1>
                    <h1 className="text-[18px] font-bold">
                      <span className="text-[18px] font-bold">৳</span>{" "}
                      {dueAmount}
                    </h1>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Default;
