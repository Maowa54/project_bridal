import React, { useState, useEffect } from "react";
import Select from "react-select";
import Datepicker from "react-tailwindcss-datepicker";
import { useNavigate } from 'react-router-dom';


import { IoClose } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import CategoryItems from "../../Component/CategoryItems";
import SelectedBusiness from "../../Component/SelectedBusiness";
import ImageDrawer from "../../Component/Product/ImageDrawer";


import axios from "axios";
import toast from "react-hot-toast";

const CreateProduct = () => {
  const [image, setImage] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const navigate = useNavigate();


  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const productImage = (id) => {
    setImage(id);

    console.log(id);
  };

  // Update selected image when an image is selected

  const [name, setName] = useState("");
  const [short_desc, setShort_desc] = useState("");
  const [category_id, setCategoryId] = useState("");


  const [businessId, setBusinessId] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [status, setStatus] = useState("");

  const [code, setCode] = useState("");
  const [buyingPrice, setBuyingPrice] = useState("");
  const [discountAmount, setDiscountAmount] = useState("");
  const [upload_by, setUpload_by] = useState("");
  
  const generateRandomCode = () => {
    const randomCode = Math.floor(
      10000000 + Math.random() * 90000000
    ).toString();
    setCode(randomCode);
  };

  // Call generateRandomCode when the component mounts
  useEffect(() => {
    generateRandomCode();
  }, []);

  const handleCategoryIdChange = (id) => {
    setCategoryId(id);
  };

  const handleBusinessIdChange = (id) => {
    setBusinessId(id);
    // console.log('Updated category_id:', id);
  };

  const [isOpen, setIsOpen] = useState(false);

  const clientId = localStorage.getItem("clientId");
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  // const [selectedFile, setSelectedFile] = useState(null);

  const [images, setImages] = useState([]);

  const [errors, setErrors] = useState({});

  const handleSave = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("client_id", clientId);
    formData.append("user_id", userId);
    formData.append("name", name);
    formData.append("short_desc", short_desc);
    formData.append("category_id", category_id);
    formData.append("image", image);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("code", code);
    formData.append("is_published", status);
    formData.append("business_ids", businessId);
    formData.append("discount_amount", discountAmount);
    formData.append("buying_price", "400");
    formData.append("has_variation", 0);
    formData.append("is_discount", 0);

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    try {
      const response = await axios.post(
        "https://expressitplus.co.uk/api/product/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);

      if (response.data.status) {
        toast.success(response.data.message || "product upload successfully!", {
          duration: 2000,
          position: "top-right",
        });

        // Reset form fields
        setName("");

        setPrice("");
        setStock("");
        setDiscountAmount("");

        setBusinessId("");
        setCategoryId("");
        setShort_desc("");

        setErrors({});


        navigate("/product/all-product");

     
      } else {
        setErrors(response.data.error || {});

        console.log(response.data.error);
      }
    } catch (error) {
      console.error(
        "Error saving business:",
        error.response ? error.response.data : error.message
      );
      toast.error(
        "An error occurred while saving the business. Please try again."
      );
    }
  };

  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });

  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };

  // for image upload

  const [variationsData, setVariationsData] = useState([]);

  useEffect(() => {
    const fetchVariation = async () => {
      try {
        const response = await axios.get(
          `https://expressitplus.co.uk/api/product/variation/values/${clientId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.status) {
          setVariationsData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching variationsData:", error);
      }
    };
    fetchVariation();
  }, [token, clientId]);

  // console.log(variationsData);


  const [variationId, setVariationId] = useState("");

  const [variationValuesId, setVariationValuesId] = useState("");



  const [hasVariations, setHasVariations] = useState(false);
  const [variations, setVariations] = useState([
    {
      selectedVariation: null,
      options: [],
      selectedValues: [],
      price: "",
      stock: "",
      discount: "",
      code: "",
    },
  ]);

  // const variationOptions = [
  //   { value: 'color', label: 'Color' },
  //   { value: 'size', label: 'Size' },
  //   // Add more variations if needed
  // ];

  const variationOptions = variationsData.map((variation) => {
    return {
      value: variation.name.toLowerCase(), // Convert name to lowercase to match the 'value' format
      label: variation.name.charAt(0).toUpperCase() + variation.name.slice(1), // Capitalize the first letter for 'label'
      variationValues: variation.variation_values.map((v) => ({
        id: v.id,
        name: v.name.trim(), // Remove any extra spaces in the name
      })),
    };
  });

  const handleCheckboxChange = () => {
    setHasVariations(!hasVariations);
  };

  const handleVariationChange = (selectedOption, index) => {
    const updatedVariations = [...variations];
    updatedVariations[index].selectedVariation = selectedOption;
    updatedVariations[index].options = getOptionsForVariation(
      selectedOption.value
    );
    setVariations(updatedVariations);
  };

  const handleValuesChange = (selectedOptions, index) => {
    const updatedVariations = [...variations];
    updatedVariations[index].selectedValues = selectedOptions;
    setVariations(updatedVariations);
  };

  const handleInputChange = (e, index, field) => {
    const updatedVariations = [...variations];
    updatedVariations[index][field] = e.target.value;
    setVariations(updatedVariations);
  };

  const handleDelete = (index) => {
    const updatedVariations = variations.filter((_, i) => i !== index);
    setVariations(updatedVariations);
  };

  const addVariation = () => {
    setVariations([
      ...variations,
      {
        selectedVariation: null,
        options: [],
        selectedValues: [],
        price: "",
        stock: "",
        discount: "",
        code: "",
      },
    ]);
  };

  const getOptionsForVariation = (variationType) => {
    // Find the variation object that matches the variationType
    const variation = variationsData.find(
      (v) => v.name.toLowerCase() === variationType.toLowerCase()
    );

    if (!variation) {
      return [];
    }

    // Return formatted options for the variation
    return variation.variation_values.map((value) => ({
      value: value.name.toLowerCase().trim(),
      label: value.name.charAt(0).toUpperCase() + value.name.slice(1).trim(), // Capitalize the first letter for 'label'
    }));
  };

  const generateCombinations = () => {
    const selectedVariations = variations.filter(
      (v) => v.selectedValues.length > 0
    );
    if (selectedVariations.length === 0) return [];

    // Generate all combinations using reduce
    const combinations = selectedVariations.reduce((acc, currVariation) => {
      const newCombinations = [];
      currVariation.selectedValues.forEach((value) => {
        if (acc.length === 0) {
          newCombinations.push([value]);
        } else {
          acc.forEach((existingCombination) => {
            newCombinations.push([...existingCombination, value]);
          });
        }
      });
      return newCombinations;
    }, []);

    return combinations;
  };

  const combinations = generateCombinations();

  // handle Svae .............

  return (
    <div id="section-1" className="mx-4 md:mx-10">
      <div className="w-full shadow py-4 flex pe-4 mb-4">
        <h2 className="px-4 text-xl font-semibold">Create Product</h2>
      </div>

      <div id="section-1">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* "Select Option" Div */}
          <div className="md:col-span-1 order-1 md:order-2">
            <div className="mb-4 bg-white p-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
              <label
                htmlFor="dropdown"
                className="block text-sm font-medium text-gray-700"
              >
                Select Option
              </label>
              <SelectedBusiness onBusinessIdChange={handleBusinessIdChange} />

              {errors.business_ids && (
                <p className="text-red-500 text-sm">{errors.business_ids[0]}</p>
              )}
            </div>
          </div>

          {/* Left Side Content */}

          <form
            onSubmit={handleSave}
            className="md:col-span-2 order-2 md:order-1"
          >
            <div className="mb-4">
              <label
                htmlFor="Product_name"
                className="block text-sm font-medium text-gray-700"
              >
                Product Name
              </label>
              <input
                name="name"
                type="text"
                className="mt-1 block w-full rounded-3 shadow-[0_3px_10px_rgb(0,0,0,0.2)] border-gray-300 p-2"
                id="Product_name"
                value={name}
                placeholder="Product Name"
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name[0]}</p>
              )}
              <span className="text-red-500 error-text product_name_error"></span>
            </div>

            <div className="mb-4">
              <label
                htmlFor="short_desc"
                className="block text-sm font-medium text-gray-700"
              >
                Short Description
              </label>
              <textarea
                value={short_desc}
                onChange={(e) => setShort_desc(e.target.value)}
                name="short_desc"
                id="short_desc"
                className="mt-1 w-full rounded-3 h-36 p-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
              />
            </div>
            {/* {errors.short_desc && (
              <p className="text-red-500 text-sm">{errors.short_desc[0]}</p>
            )} */}

            <div className="mb-4 " id="">
              <label
                htmlFor="category_id"
                className="block text-sm font-medium text-gray-700 required"
              >
                Image
              </label>

              <div className="relative">
                {/* Drawer Toggle Button */}
                <button
                  type="button"
                  onClick={toggleDrawer}
                  className="rounded w-full flex flex-col items-center cursor-pointer bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] py-3"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="70"
                    height="70"
                    viewBox="0 0 80 80"
                    fill="none"
                    className="mb-2"
                  >
                    {image ? (
                      <image
                        href={`https://expressitplus.co.uk/public/storage/product/${image}`}
                        width="90"
                        height="70"
                      />
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="70"
                        height="70"
                        viewBox="0 0 80 80"
                        fill="none"
                        className="mb-2"
                      >
                        <circle cx="40" cy="40" r="40" fill="#D9D9D9" />
                        <line
                          x1="20"
                          y1="40"
                          x2="60"
                          y2="40"
                          stroke="white"
                          strokeWidth="4"
                        />
                        <line
                          x1="40"
                          y1="20"
                          x2="40"
                          y2="60"
                          stroke="white"
                          strokeWidth="4"
                        />
                      </svg>
                    )}
                  </svg>

                  <div className="mt-2 text-center">Add Image</div>
                </button>
              </div>
              {errors.image && (
              <p className="text-red-500 text-sm mx-4">{errors.image[0]}</p>
            )}
            </div>          
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
              id="section-3"
            >
              <div>
                <div className="mb-3 px-4 py-2 h-28 bg-white flex flex-col shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                  <label
                    htmlFor="category_id"
                    className="block text-sm font-medium text-gray-700 required"
                  >
                    Product Category
                  </label>
                  <CategoryItems onCategoryIdChange={handleCategoryIdChange} />
                  {errors.category_id && (
                    <p className="text-red-500 text-sm">
                      {errors.category_id[0]}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <div className="mb-3 px-4 py-2 h-28 bg-white flex flex-col shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                  <label
                    htmlFor="product_status"
                    className="block text-sm font-medium text-gray-700 required"
                  >
                    Product Status
                  </label>
                  <select
                    name="product_status"
                    id="product_status"
                    className="form-select rounded-lg shadow border-gray-300 py-1 px-2"
                    onChange={(e) => setStatus(e.target.value)}

                  >
                    <option value="1">On</option>
                    <option value="0">Off</option>
                  </select>
                  <span className="text-danger error-text product_status_error"></span>
                </div>
              </div>
            </div>

            {/* variation code start */}

            <div className="col-span-12 mb-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
              <div className="mb-3 py-2 pb-3 shadow bg-white flex-shrink-0">
                <div className="flex justify-between mb-2">
                  <div className="mx-4 my-2">Price, Stock, Code</div>
                  <div className="mx-4 my-2 flex items-center">
                    <input
                      type="checkbox"
                      className="toggle toggle-info scale-75"
                      checked={hasVariations}
                      onChange={handleCheckboxChange}
                      aria-label="Toggle Variations"
                    />
                    <span className="ml-2">Has Variations?</span>
                  </div>
                </div>

                {!hasVariations && (
                  <div className="container-fluid">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mx-5">
                      <div className="mb-2">
                        <label
                          htmlFor="price"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Price
                        </label>
                        <input
                          type="number"
                          className="form-control rounded-lg shadow border border-gray-300 p-2 w-full"
                          id="price"
                          placeholder="Enter price"
                          aria-label="Price"
                          onChange={(e) => setPrice(e.target.value)}
                        />
                        {errors.price && (
                          <p className="text-red-500 text-sm">
                            {errors.price[0]}
                          </p>
                        )}
                      </div>

                      <div className="mb-2">
                        <label
                          htmlFor="stock"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Stock
                        </label>
                        <input
                          type="number"
                          className="form-control rounded-lg shadow border border-gray-300 p-2 w-full"
                          id="stock"
                          placeholder="Enter stock"
                          aria-label="Stock"
                          onChange={(e) => setStock(e.target.value)}
                        />
                        {errors.stock && (
                          <p className="text-red-500 text-sm">
                            {errors.stock[0]}
                          </p>
                        )}
                      </div>

                      <div className="mb-2">
                        <label
                          htmlFor="code"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Code
                        </label>
                        <input
                          type="text"
                          className="form-control rounded-lg shadow border border-gray-300 p-2 w-full"
                          id="code"
                          placeholder="Enter code"
                          aria-label="Code"
                          value={code} // Set the input field value to the generated code
                          onChange={(e) => setCode(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {hasVariations && (
                <div className="mb-4 py-4 bg-white shadow">
                  <div className="mx-5">
                    {variations.map((variation, index) => (
                      <div key={index} className="">
                        <div className="mb-6">
                          <div className="flex gap-4">
                            <div className="flex-1">
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Select Variation
                              </label>
                              <Select
                                options={variationOptions}
                                className="rounded-lg shadow border border-gray-300"
                                placeholder="Select a variation"
                                isSearchable
                                onChange={(selectedOption) =>
                                  handleVariationChange(selectedOption, index)
                                }
                                value={variation.selectedVariation}
                              />
                            </div>

                            <div className="flex-1">
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Select Values
                              </label>
                              <Select
                                options={variation.options || []}
                                className="rounded-lg shadow border border-gray-300"
                                placeholder="Select values"
                                isSearchable
                                isMulti
                                onChange={(selectedOptions) =>
                                  handleValuesChange(selectedOptions, index)
                                }
                                value={variation.selectedValues}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={addVariation}
                      className="text-blue-500 hover:text-blue-700 focus:outline-none mb-6"
                    >
                      + Add another variation
                    </button>
                  </div>

                  <div className="mx-4 mb-6 overflow-x-auto">
                    <div className="border rounded p-2 bg-gray-100">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Variation & Value
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Price
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Stock
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Discount
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Code
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Remove
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {combinations.map((combination, combIndex) => (
                            <tr key={`comb-${combIndex}`}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {combination.map((value, i) => (
                                  <span key={i} className="block">
                                    {value.label}
                                  </span>
                                ))}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <input
                                  type="number"
                                  value={combination.price || ""}
                                  onChange={(e) =>
                                    handleInputChange(e, combIndex, "price")
                                  }
                                  className="form-control rounded-lg shadow border border-gray-300 p-2"
                                  placeholder="Enter price"
                                />
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <input
                                  type="number"
                                  value={combination.stock || ""}
                                  onChange={(e) =>
                                    handleInputChange(e, combIndex, "stock")
                                  }
                                  className="form-control rounded-lg shadow border border-gray-300 p-2"
                                  placeholder="Enter stock"
                                />
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <input
                                  type="number"
                                  value={combination.discount || ""}
                                  onChange={(e) =>
                                    handleInputChange(e, combIndex, "discount")
                                  }
                                  className="form-control rounded-lg shadow border border-gray-300 p-2"
                                  placeholder="Enter discount"
                                />
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <input
                                  type="text"
                                  value={combination.code || ""}
                                  onChange={(e) =>
                                    handleInputChange(e, combIndex, "code")
                                  }
                                  className="form-control rounded-lg shadow border border-gray-300 p-2"
                                  placeholder="Enter code"
                                />
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <button
                                  onClick={() => handleDelete(combIndex)}
                                  className="text-red-500 hover:text-red-700 focus:outline-none"
                                >
                                  Remove
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* variation code end */}

            <div className="mb-4 my-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white">
              <div className="card-body p-4" id="section-7">
                <h5 className="mb-4 text-lg font-semibold">Product Discount</h5>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                  <div className="col-span-1">
                    <div className="mb-3">
                      <label className="form-label">Date Range</label>
                      <div className=" shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                        <Datepicker
                          value={value}
                          onChange={handleValueChange}
                          showShortcuts={true}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-span-1">
                    <div className="mb-3">
                      <label className="form-label">Discount Amount</label>
                      <input
                        type="number"
                        name="discount_value"
                        defaultValue=""
                        className="form-control text-lowercase shadow-[0_3px_10px_rgb(0,0,0,0.2)] py-2 px-3 w-full"
                        onChange={(e) => setDiscountAmount(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-span-1">
                    <div className="mb-3">
                      <label className="form-label">Percent Or Fixed</label>
                      <select
                        name="variations[2][code]"
                        className="form-control shadow-[0_3px_10px_rgb(0,0,0,0.2)] py-2 px-3 w-full"
                      >
                        <option value="percent">Percent %</option>
                        <option value="fixed">Fixed</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <button
                className="btn bg-[#28DEFC] hover:bg-[#28DEFC] text-white px-6 text-lg"
                type="submit"
              >
                Save
              </button>
            </div>
          </form>
        </div>


           {/* Bottom Drawer */}

           <ImageDrawer
          isOpen={isDrawerOpen}
          toggleDrawer={toggleDrawer}
          productImage={productImage}
        />

        {/* end Bottom Drawer */}

      </div>
    </div>
  );
};

export default CreateProduct;