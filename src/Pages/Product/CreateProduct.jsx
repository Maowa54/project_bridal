import React, { useState, useEffect } from "react";
import Select from "react-select";
import Datepicker from "react-tailwindcss-datepicker";
import { useNavigate } from "react-router-dom";

import { ImSpinner10 } from "react-icons/im";

import { IoClose } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import CategoryItems from "../../Component/CategoryItems";
import ImageDrawer from "../../Component/Product/ImageDrawer";

import axios from "axios";
import toast from "react-hot-toast";
import StockLocation from "../../Component/Product/StockLocation";
import { FaPlus } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import VideoDrawer from "../../Component/Product/VideoDrawer";
import { MdClose } from "react-icons/md";
import Footer_Backend from "../../Component/Backend/Footer_Backend";

const CreateProduct = () => {
  const [images, setImages] = useState([]);

    const [orderStatus, setOrderStatus] = useState(0);
  

  const [selectedVideoName, setSelectedVideoName] = useState("");

  const handleVideoSelect = (videoName) => {
    setSelectedVideoName(videoName);
  };

  const [image, setImage] = useState("");

  const productImage = (images) => {
    setImages(images);
  };

  const [selectedImages, setSelectedImages] = useState([]);

  const funSelectedImages = (id, imagess) => {
    const selectedImage = imagess.find((image) => image.id === id);

    if (selectedImage) {
      setSelectedImages((prevSelectedImages) => {
        // Check if the image is already selected
        if (prevSelectedImages.some((image) => image.id === id)) {
          // If already selected, remove it from the selection
          return prevSelectedImages.filter((image) => image.id !== id);
        } else {
          // If not selected, add it to the selection
          return [...prevSelectedImages, selectedImage];
        }
      });

      setImages(selectedImages); // Handle the product image
    }
  };

  const variationImageSelect = (name, index) => {
    const updatedCombinations = [...combinations]; // Copy the current combinations state
    updatedCombinations[index]["vimage"] = name; // Update the specific field
    setCombinations(updatedCombinations);
  };

  const variationImageRemove = (index) => {
    const updatedCombinations = [...combinations]; // Copy the current combinations state
    updatedCombinations[index]["vimage"] = null; // Update the specific field
    setCombinations(updatedCombinations);
  };

  const handleRemoveImage = (imagess, id) => {
    const updatedImages = imagess.filter((image) => image.id !== id);
    setSelectedImages(updatedImages);
  };

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [isVideoDrawerOpen, setIsVideoDrawerOpen] = useState(false);

  const navigate = useNavigate();

  const [variationImageIdx, setVariationImageIdx] = useState(null);

  const toggleDrawer = () => {
    setVariationImageIdx(null);
    setIsDrawerOpen(!isDrawerOpen);
  };

  //image
  const handleVariationImage = (index) => {
    setVariationImageIdx(index);
    setIsDrawerOpen(!isDrawerOpen);
  };

  const toggleVideoDrawer = () => {
    setIsVideoDrawerOpen(!isVideoDrawerOpen);
  };

  const handleVideoDelete = () => {
    setSelectedVideoName("");
  };

  // Update selected image when an image is selected

  const clientId = localStorage.getItem("clientId");
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [short_desc, setShort_desc] = useState("");
  const [category_id, setCategoryId] = useState("");

  const [stockLocationId, setStockLocationId] = useState("");

  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [status, setStatus] = useState("");

  const [code, setCode] = useState("");
  const [buyingPrice, setBuyingPrice] = useState("");
  const [discountAmount, setDiscountAmount] = useState("");
  const [discountType, setDiscountType] = useState("");

  const [discountDate, setDiscountDate] = useState("");

  const [upload_by, setUpload_by] = useState("");

  const generateRandomCode = () => {
    const prefix = "EPP";
    const randomNumber = Math.floor(
      10000000 + Math.random() * 90000000
    ).toString();
    const randomCode = `${prefix}${randomNumber}`;
    setCode(randomCode);
  };

  useEffect(() => {
    generateRandomCode();
  }, []);

  const handleCategoryIdChange = (id) => {
    setCategoryId(id);
  };

  const handleLocationIdChange = (id) => {
    setStockLocationId(id);
  };

  const [isOpen, setIsOpen] = useState(false);

  // const [selectedFile, setSelectedFile] = useState(null);

  const [errors, setErrors] = useState({});

  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });

  const handleValueChange = (newValue) => {
    setValue(newValue);
  };

  // for image upload

  const [variationsData, setVariationsData] = useState([]);

  useEffect(() => {
    const fetchVariation = async () => {
      try {
        const response = await axios.get(
          `https://admin.attireidyll.com/api/product/variation/values`,
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

  const [variationIds, setVariationIds] = useState([]);
  const [variationValuesIds, setVariationValuesIds] = useState([]);
  const [hasVariations, setHasVariations] = useState(false);
  const [variations, setVariations] = useState([
    {
      selectedVariation: null,
      options: [],
      selectedValues: [],
      price: "",
      stock: "",
      discount: "",
      discount_type: "fixed",
      discount_date: "",
      vimage: "",
      code: "",
    },
  ]);

  // IF one variation selected then it will not show here again
  // const [variationsDataFilter, setVariationsDataFilter] = useState([]);

  // useEffect(() => {
  //   // Function to filter unmatched variations
  //   const getUnmatchedVariations = (variations, variationsData) => {
  //     return variationsData.filter(data => {
  //       // Check if this data matches any variation's selectedVariation.id
  //       const matchingVariation = variations.find(
  //         variation => variation.selectedVariation.id === data.id
  //       );

  //       if (!matchingVariation) return true; // No matching variation found

  //       // Check if all selectedValues match the variation_values
  //       const hasMismatch = matchingVariation.selectedValues.some(selectedValue => {
  //         return !data.variation_values.some(
  //           value => value.name.trim() === selectedValue.value.trim()
  //         );
  //       });

  //       return hasMismatch; // Include in filter if mismatch exists
  //     });
  //   };

  //   // Update the state with unmatched variations
  //   const unmatchedVariations = getUnmatchedVariations(variations, variationsData);

  //   setVariationsDataFilter(unmatchedVariations);
  // }, [variations, variationsData]); // Dependencies

  const variationOptions = variationsData.map((variation) => ({
    id: variation.id,
    value: variation.name.toLowerCase(),
    label: variation.name.toLowerCase(),
    variationValues: variation.variation_values.map((v) => ({
      id: v.id,
      name: v.name.trim(),
    })),
  }));

  // const [selectedVariationsOptions, setSelectedVariationsOptions] = useState([]);

  // useEffect(() => {
  //   const filteredVariations = variationsData.map((variation) => {
  //     const isSelected = variations.filter(
  //       (v) => v.selectedVariation.value !== variation.name.toLowerCase()
  //     );
  //   });

  //   setSelectedVariationsOptions(isSelected);
  // }, [variations, variationsData]);

  const handleCheckboxChange = (e) => {
    // e.preventDefault()
    setHasVariations(!hasVariations);
    setHasVariation(e.target.checked ? 1 : 0);
  };

  const handleVariationChange = (selectedOption, index) => {
    const selectedVariationCheck = variations.find((variation, i) => {
      return variation?.selectedVariation?.id === selectedOption?.id;
    });
    if (!selectedVariationCheck) {
      // Fix Id's Prblems in the same field
      setVariationIds((prevVariationId) => {
        return prevVariationId.filter((_, i) => i !== index); // Remove the ID
      });

      const updatedVariations = [...variations];
      updatedVariations[index].selectedVariation = selectedOption;
      updatedVariations[index].options = getOptionsForVariation(
        selectedOption.value
      );
      updatedVariations[index].selectedValues = [];
      setVariations(updatedVariations);
    }
  };
  console.log(variations);
  console.log(variationIds);

  const handleVariationDelete = (variation, index) => {
    // Step 1: Remove the variation at the specified index
    const deleteVariations = variations.filter((_, i) => i !== index);
    setVariations(deleteVariations);

    // Step 2: Remove variation ID if present
    setVariationIds((prevVariationId) => {
      const variationId = variations[index]?.selectedVariation?.id; // Safely access the ID
      return prevVariationId.filter((id) => id !== variationId); // Remove the ID
    });

    // Step 3: Remove corresponding variation values
    setVariationValuesIds((prevVariationValuesId) => {
      return prevVariationValuesId.filter((_, i) => i !== index); // Remove values at the same index
    });
  };

  const handleValuesChange = (selectedOptions, index) => {
    const updatedVariations = [...variations];
    updatedVariations[index].selectedValues = selectedOptions;
    setVariations(updatedVariations);

    const selectedValues = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];

    setVariationValuesIds((prevVariationValuesId) => {
      const updatedVariationValues = [...prevVariationValuesId];
      updatedVariationValues[index] = selectedValues; // Replace or add the values for the specific index
      return updatedVariationValues;
    });

    // Once values are selected, we add the variation ID
    setVariationIds((prevVariationId, i) => {
      const variationId = updatedVariations[index].selectedVariation.id;

      // if (prevVariationId) {
      //   return prevVariationId.filter((id, i) => i !== index);
      // }
      if (!prevVariationId.includes(variationId) && selectedValues.length > 0) {
        return [...prevVariationId, variationId]; // Append new id if values are selected
      }
      return prevVariationId; // If already present or no values selected, return unchanged
    });
  };

  // Handle input change for price, stock, discount, and code in combinations
  const handleInputChange = (e, index, field) => {
    const updatedCombinations = [...combinations]; // Copy the current combinations state
    updatedCombinations[index][field] = e.target.value; // Update the specific field
    setCombinations(updatedCombinations); // Update state with new combinations
  };

  const handleDelete = (combination, index) => {
    const updatedVariations = combinations.filter((_, i) => i !== index);
    setCombinations(updatedVariations);
  };

  const addVariation = () => {
    if (variations.length < variationsData.length) {
      setVariations([
        ...variations,
        {
          selectedVariation: null,
          options: [],
          selectedValues: [],
          buying_price: "",
          price: "",
          stock: "",
          discount_date: "",
          discount_type: "fixed",
          discount: "",
          vimage: "",
          code: "",
        },
      ]);
    }
  };

  const getOptionsForVariation = (variationType) => {
    const variation = variationsData.find(
      (v) => v.name.toLowerCase() === variationType.toLowerCase()
    );

    if (!variation) {
      return [];
    }

    return variation.variation_values.map((value) => ({
      value: value.name.toLowerCase().trim(),
      label: value.name.charAt(0).toUpperCase() + value.name.slice(1).trim(),
    }));
  };

  const [combinations, setCombinations] = useState([]); // Define combinations state

  // Function to generate combinations
  const generateCombinations = () => {
    const selectedVariations = variations.filter(
      (v) => v.selectedValues.length > 0
    );
    if (selectedVariations.length === 0) return [];

    const combinations = selectedVariations.reduce((acc, currVariation) => {
      const newCombinations = [];
      currVariation.selectedValues.forEach((value) => {
        if (acc.length === 0) {
          newCombinations.push({
            values: [value],
            buying_price: "",
            price: "",
            stock: "",
            discount_date: "",
            discount_type: "",
            discount: "",
            vimage: "",
            code: code,
          });
        } else {
          acc.forEach((existingCombination) => {
            newCombinations.push({
              values: [...existingCombination.values, value],

              buying_price: existingCombination.buying_price || "",

              price: existingCombination.price || "",
              stock: existingCombination.stock || "",
              discount_date: existingCombination.discount_date || "",
              discount_type: existingCombination.discount_type || "fixed",
              discount: existingCombination.discount || "",
              vimage: existingCombination.vimage || "",
              code: code,
            });
          });
        }
      });
      return newCombinations;
    }, []);

    return combinations;
  };

  // Generate combinations and store in state
  useEffect(() => {
    setCombinations(generateCombinations());
  }, [variations]);

  const cacheKey = "allProducts";
  const cacheTimeKey = "allProducts_timestamp";

  const [hasVariation, setHasVariation] = useState(0);

  const handleSave = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("user_id", userId);

    formData.append("created_by", userId);

    formData.append("name", name);
    formData.append("short_desc", short_desc);
    formData.append("category_id", category_id);
    formData.append("pre_order", orderStatus);

    formData.append("image", selectedImages[0]?.name || "");

    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("code", code);
    formData.append("is_published", status);
    formData.append("has_variation", hasVariation);

    formData.append("discount_date", discountDate);

    formData.append("discount_type", discountType);

    formData.append(
      "more_images",
      selectedImages.map((image) => image.id).join(",")
    );

    formData.append("video", selectedVideoName);

    formData.append("discount_amount", discountAmount);
    formData.append("buying_price", buyingPrice);
    formData.append("is_discount", 0);

    formData.append("stock_location_id", "2");

    formData.append("variation_ids", JSON.stringify(variationIds));
    formData.append("variation_values", JSON.stringify(variationValuesIds));
    formData.append("combinations", JSON.stringify(combinations));

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "https://admin.attireidyll.com/api/product/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status) {
        toast.success(response.data.message || "product upload successfully!", {
          duration: 2000,
          position: "top-right",
        });

        localStorage.removeItem(cacheKey);
        localStorage.removeItem(cacheTimeKey);

        // Reset form fields
        setName("");

        setPrice("");
        setStock("");
        setDiscountAmount("");

        setCategoryId("");
        setShort_desc("");
        setOrderStatus("");

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
    } finally {
      setLoading(false);
    }
  };

  // setVariationValuesId(variations.selectedValues)

  // handle Svae .............

  return (
    <div id="section-1" className=" text-gray-700">
      <div className="flex  justify-between mt-1 mb-5 px-4 py-3 border border-gray-300  items-center rounded">
          <h1 className="text-lg md:text-lg font-medium text-gray-700 ">
            Create Product
          </h1>
        </div>

      <div id="section-1">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-2">
          {/* "Select Option" Div */}
          <div className="md:col-span-1 order-1 md:order-3">
            {/* <div className="bg-white flex flex-col mb-5">
              <label
                htmlFor="category_id"
                className="block text-sm font-medium text-gray-700 required"
              >
                Stock Location
              </label>
              <StockLocation onLocationIdChange={handleLocationIdChange} />
              {errors.stock_location_id && (
                <p className="text-red-500 text-sm">
                  {errors.stock_location_id[0]}
                </p>
              )}
            </div> */}
             <div className="mb-4 px-4 py-3  h-28 bg-white flex flex-col border border-gray-300 rounded transition duration-300 ease-in-out hover:border-teal-400 ">
                <label
                  htmlFor="product_status"
                  className="block text-sm  font-medium  mb-4"
                >
                  Pre Order
                </label>
                <select
                  name="product_status"
                  id="product_status"
                  className="form-select text-sm rounded-md border border-gray-300  focus:border-teal-500 focus:ring-teal-500 py-2 px-3  focus:outline-none"
                  onChange={(e) => setOrderStatus(e.target.value)}
                >
                  <option value="0">Off</option>
                  <option value="1">On</option>
                </select>
                <span className="text-red-600 text-sm error-text product_status_error"></span>
              </div>

            {/* <div className="relative rounded border hover:border-teal-500 focus:outline-none  focus:ring-teal-500 border-gray-300 p-2 w-full"> */}
            <div className="relative rounded   border hover:border-teal-500 focus:outline-none  focus:ring-teal-500 border-gray-300 p-2 w-full">
              {/* Drawer Toggle Button */}

              {selectedVideoName ? (
                <div className="relative text-center">
                  <video
                    src={`https://pub-c053b04a208d402dac06392a3df4fd32.r2.dev/video/${selectedVideoName}`}
                    width="350"
                    height="450"
                    autoPlay
                    muted
                    loop
                    className="mb-2"
                  >
                    Your browser does not support the video tag.
                  </video>
                  <button
                    type="button"
                    onClick={() => {
                      handleVideoDelete();
                    }}
                    className="rounded w-full flex flex-col items-center cursor-pointer bg-white text-red-500  py-3"
                  >
                    Remove
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      toggleVideoDrawer();
                    }}
                    className="rounded w-full flex flex-col items-center mt-2 cursor-pointer bg-white  py-3"
                  >
                    Change Video
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    toggleVideoDrawer();
                  }}
                  className="rounded w-full flex flex-col items-center cursor-pointer bg-white  py-2"
                >
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
                  <div className="mt-2 text-center text-sm">Add Video</div>
                </button>
              )}
            </div>
          </div>

          {/* Left Side Content */}

          <form
            onSubmit={handleSave}
            className="md:col-span-3 order-2 md:order-1"
          >
            <div className="mb-4">
              <label
                htmlFor="Product_name"
                className="block text-sm  font-medium "
              >
                Product Name
              </label>
              <input
                name="name"
                type="text"
                className="form-control text-sm rounded border hover:border-teal-500 focus:outline-none  focus:ring-teal-500 border-gray-300 p-2 w-full mt-1"
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
                className="block  text-sm  font-medium"
              >
                Short Description
              </label>
              <textarea
                value={short_desc}
                onChange={(e) => setShort_desc(e.target.value)}
                name="short_desc"
                id="short_desc"
                className="form-control text-sm  rounded border hover:border-teal-500 focus:outline-none  focus:ring-teal-500 border-gray-300 p-2 w-full mt-1 h-36"
              />
            </div>
            {/* {errors.short_desc && (
              <p className="text-red-500 text-sm">{errors.short_desc[0]}</p>
            )} */}

            <div className="mb-4 " id="">
              <label
                htmlFor="category_id"
                className="block  text-sm  font-medium required"
              >
                Image
              </label>

              <div className="relative">
                {/* Drawer Toggle Button */}
                <div className="w-full flex flex-col items-center cursor-pointer bg-white rounded border hover:border-teal-500 focus:outline-none  focus:ring-teal-500 border-gray-300 p-2 mt-1">
                  <div className="flex flex-wrap gap-2 justify-center items-center">
                    {selectedImages.length > 0 &&
                      selectedImages.map((img, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={`https://pub-c053b04a208d402dac06392a3df4fd32.r2.dev/Attire_Idyll/image/${img.name}`}
                            alt={`Selected ${index + 1}`}
                            className="rounded border  h-40 w-auto"
                          />
                          {/* Remove Image */}
                          <button
                            type="button"
                            className="absolute -top-1 -right-1 flex items-center justify-center bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() =>
                              handleRemoveImage(selectedImages, img.id)
                            }
                          >
                            <MdClose />
                          </button>
                        </div>
                      ))}
                    <div className="text-center">
                      <svg
                        onClick={toggleDrawer}
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
                      <span onClick={toggleDrawer} className="mt-2 text-sm text-center">
                        Add Image
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {errors.image && (
                <p className="text-red-500 text-sm mx-4">{errors.image[0]}</p>
              )}
            </div>
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 "
              id="section-3"
            >
              <div className="mb-3 px-4 pt-2 pb-4 bg-white flex flex-col rounded border hover:border-teal-500 focus:outline-none  focus:ring-teal-500 border-gray-300 p-2 w-full">
                <label
                  htmlFor="category_id"
                  className="block mb-2  text-sm  font-medium required"
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

              <div>
                <div className="mb-3 px-4 pt-2 pb-4 bg-white flex flex-col rounded border hover:border-teal-500 focus:outline-none  focus:ring-teal-500 border-gray-300 p-2 w-full">
                  <label
                    htmlFor="product_status"
                    className="block mb-2 text-sm  font-medium required"
                  >
                    Product Status
                  </label>
                  <select
                    name="product_status"
                    id="product_status"
                    className="form-control text-sm rounded border  focus:outline-none  focus:ring-teal-500 border-gray-300 p-2 w-full"
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

            <div className="col-span-12 mb-4 rounded  border-gray-300 ">
              <div className="py-4 rounded border hover:border-teal-500  bg-white flex-shrink-0">
                <div className="flex justify-between mb-2">
                  <div className="px-4  font-medium">
                    Price, Stock, Code
                  </div>
                  <div className="px-4 flex items-center">
                    <input
                      type="checkbox"
                      className="toggle toggle-info scale-75"
                      checked={hasVariations}
                      onChange={handleCheckboxChange}
                      aria-label="Toggle Variations"
                    />
                    <span className="ml-2 font-medium">Has Variations?</span>
                  </div>
                </div>

                {!hasVariations && (
                  <>
                    <div className="container-fluid">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mx-5 items-center">
                        <div className="col-span-1">
                          <div className="mb-3">
                            <label className="form-label  text-sm  font-medium">Cost Price</label>
                            <input
                              type="number"
                              className="form-control text-sm rounded border hover:border-teal-500 focus:outline-none  focus:ring-teal-500 border-gray-300 p-2 w-full"
                              id="price"
                              placeholder="Enter cost price"
                              aria-label="Price"
                              onChange={(e) => setBuyingPrice(e.target.value)}
                            />

                            {errors.buying_price && (
                              <p className="text-red-500 text-sm">
                                {errors.buying_price[0]}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="mb-2">
                          <label
                            htmlFor="stock"
                            className="block   text-sm  font-medium"
                          >
                            Stock
                          </label>
                          <input
                            type="number"
                            className="form-control text-sm rounded border hover:border-teal-500 focus:outline-none  focus:ring-teal-500 border-gray-300 p-2 w-full"
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
                            className="block text-sm  font-medium"
                          >
                            Code
                          </label>
                          <input
                            type="text"
                            className="form-control text-sm  rounded border hover:border-teal-500 focus:outline-none  focus:ring-teal-500 border-gray-300 p-2 w-full"
                            id="code"
                            placeholder="Enter code"
                            aria-label="Code"
                            value={code} // Set the input field value to the generated code
                            onChange={(e) => setCode(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className=" -sm rounded-md hover:border-teal-500 focus:outline-none  focus:ring-teal-500 bg-white">
                      <div className="card-body p-4" id="section-7">
                        <h5 className=" font-medium">Discount</h5>

                        <div className="grid grid-cols-1 gap-3 md:grid-cols-4 items-center">
                          <div className="mb-2">
                            <label
                              htmlFor="Selling price"
                              className="block text-sm  font-medium"
                            >
                              Selling Price
                            </label>
                            <input
                              type="number"
                              className="form-control text-sm rounded border hover:border-teal-500 focus:outline-none  focus:ring-teal-500 border-gray-300 p-2 w-full"
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

                          <div className="col-span-1">
                            <div className="mb-3">
                              <label className="form-label  text-sm  font-medium">
                                Discount Amount
                              </label>
                              <input
                                type="number"
                                name="discount_value"
                                defaultValue=""
                                className="form-control text-sm  rounded border hover:border-teal-500 focus:outline-none  focus:ring-teal-500 border-gray-300 p-2 w-full"
                                onChange={(e) =>
                                  setDiscountAmount(e.target.value)
                                }
                              />
                            </div>
                          </div>

                          <div className="col-span-1">
                            <div className="mb-3">
                              <label className="form-label  text-sm  font-medium">
                                Percent Or Fixed
                              </label>
                              <select
                                name="discount_type"
                                className="h-10 form-control text-sm rounded border hover:border-teal-500 focus:outline-none  focus:ring-teal-500 border-gray-300 p-2 w-full"
                                onChange={(e) =>
                                  setDiscountType(e.target.value)
                                }
                                defaultValue="fixed"
                              >
                                <option value="fixed">Fixed</option>
                                <option value="percent">Percent</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-span-1">
                            <div className="mb-3">
                              <label className="form-label  text-sm  font-medium">
                                Discount Date
                              </label>
                              <input
                                type="date"
                                onClick={(e) => e.target.showPicker()}
                                className="form-control text-sm  rounded border hover:border-teal-500 focus:outline-none  focus:ring-teal-500 border-gray-300 p-2 w-full"
                                placeholder="Enter discount"
                                onChange={(e) =>
                                  setDiscountDate(e.target.value)
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {hasVariations && (
                  <div className="mb-4 py-2 bg-white ">
                    <div className="mx-5">
                      {variations.map((variation, index) => (
                        <div key={index} className="">
                          <div className="mb-4">
                            <div className="flex gap-4">
                              <div className="flex-1">
                                <label className="block  text-sm  font-medium mb-2">
                                  Select Variation
                                </label>
                                <div className="flex gap-2">
                                  <Select
                                    options={variationOptions}
                                    className="form-control text-sm roundedborder hover:border-teal-500 focus:outline-none  focus:ring-teal-500 border-gray-300 w-full"
                                    placeholder="Select a variation"
                                    isSearchable
                                    onChange={(selectedOption) =>
                                      handleVariationChange(
                                        selectedOption,
                                        index
                                      )
                                    }
                                    value={variation.selectedVariation}
                                  />
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleVariationDelete(variation, index)
                                    }
                                    className="text-gray-500 mx-2 hover:text-red-700 focus:outline-none"
                                  >
                                    X
                                  </button>
                                </div>
                              </div>

                              <div className="flex-1">
                                <label className="block  text-sm  font-medium mb-2">
                                  Select Values
                                </label>
                                <Select
                                  id="variation_value_ids"
                                  options={variation.options || []}
                                  className="form-control text-sm  roundedborder hover:border-teal-500 focus:outline-none  focus:ring-teal-500 border-gray-300 w-full"
                                  placeholder="Select values"
                                  isSearchable
                                  required
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
                        className="text-teal-500 text-sm  font-medium hover:text-teal-700 focus:outline-none mb-4"
                      >
                        + Add another variation
                      </button>
                    </div>
                    <div className="mx-4 mb-6 overflow-x-auto ">
                      <div className="border rounded p-2 bg-gray-100">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr className="text-center">
                              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Variation & Value
                              </th>
                              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Costing Price
                              </th>
                              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                selling Price
                              </th>
                              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Stock
                              </th>
                              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Image
                              </th>
                              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Discount
                              </th>
                              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Discount Type
                              </th>
                              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Discount Date
                              </th>
                              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Code
                              </th>
                              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Remove
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {combinations.map((combination, combIndex) => (
                              <tr key={`comb-${combIndex}`}>
                                <td className="capitalize text-center flex gap-2 items-center py-4">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleDelete(combination, combIndex)
                                    }
                                    className="text-red-500 hover:text-red-700 focus:outline-none"
                                  >
                                    <RiDeleteBinLine />
                                  </button>
                                  <div className="whitespace-nowrap">
                                    {combination.values.map((value, i) => (
                                      <span key={i} className="block">
                                        {value.label}
                                      </span>
                                    ))}
                                  </div>
                                </td>
                                <td className="px-2 py-4 whitespace-nowrap">
                                  <input
                                    required
                                    type="number"
                                    min="0"
                                    value={combination.buying_price || ""}
                                    onChange={(e) =>
                                      handleInputChange(
                                        e,
                                        combIndex,
                                        "buying_price"
                                      )
                                    }
                                    className="form-control roundedborder hover:border-teal-500 focus:outline-none  focus:ring-teal-500 border-gray-300 p-2 w-[100px]"
                                    placeholder="cost price"
                                  />
                                </td>

                                <td className="px-2 py-4 whitespace-nowrap">
                                  <input
                                    required
                                    type="number"
                                    min="0"
                                    value={combination.price || ""}
                                    onChange={(e) =>
                                      handleInputChange(e, combIndex, "price")
                                    }
                                    className="form-control roundedborder hover:border-teal-500 focus:outline-none  focus:ring-teal-500 border-gray-300 p-2 w-[100px]"
                                    placeholder="price"
                                  />
                                </td>
                                <td className="px-2 py-4 whitespace-nowrap">
                                  <input
                                    required
                                    type="number"
                                    min="0"
                                    value={combination.stock || ""}
                                    onChange={(e) =>
                                      handleInputChange(e, combIndex, "stock")
                                    }
                                    className="form-control roundedborder hover:border-teal-500 focus:outline-none  focus:ring-teal-500 border-gray-300 p-2 w-[100px]"
                                    placeholder="stock"
                                  />
                                </td>

                                <td className="whitespace-nowrap">
                                  {combination.vimage ? (
                                    <div className="relative group">
                                      <img
                                        src={`https://pub-c053b04a208d402dac06392a3df4fd32.r2.dev/Attire_Idyll/image/${combination.vimage}`}
                                        className="rounded border max-h-20"
                                      />
                                      <button
                                        type="button"
                                        className="absolute -top-1 -right-1 flex items-center justify-center bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                        onClick={() =>
                                          handleRemoveImage(
                                            selectedImages,
                                            img.id
                                          )
                                        }
                                      >
                                        <MdClose />
                                      </button>
                                    </div>
                                  ) : (
                                    <div
                                      onClick={() => {
                                        handleVariationImage(combIndex);
                                      }}
                                      className="flex flex-col items-center justify-center"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="30"
                                        height="30"
                                        viewBox="0 0 80 80"
                                        fill="none"
                                      >
                                        <circle
                                          cx="40"
                                          cy="40"
                                          r="40"
                                          fill="#D9D9D9"
                                        />
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
                                      <span className="text-sm">Add Image</span>
                                    </div>
                                  )}
                                </td>

                                <td className="px-2 py-4 whitespace-nowrap">
                                  <input
                                    type="number"
                                    min="0"
                                    value={combination.discount || ""}
                                    onChange={(e) =>
                                      handleInputChange(
                                        e,
                                        combIndex,
                                        "discount"
                                      )
                                    }
                                    className="form-control roundedborder hover:border-teal-500 focus:outline-none  focus:ring-teal-500 border-gray-300 p-2 w-[100px]"
                                    placeholder="discount"
                                  />
                                </td>
                                <td className="px-2 py-4 whitespace-nowrap">
                                  <select
                                    name="discount_type"
                                    id="discount_type"
                                    onChange={(e) =>
                                      handleInputChange(
                                        e,
                                        combIndex,
                                        "discount_type"
                                      )
                                    }
                                    defaultValue={
                                      combination.discount || "fixed"
                                    }
                                    className="form-control rounded-sm -sm border border-gray-300 px-2 py-3 w-[120px]"
                                  >
                                    <option value="fixed">Fixed</option>
                                    <option value="percent">
                                      Percentage %
                                    </option>
                                  </select>
                                </td>

                                <td className="px-2 py-4 whitespace-nowrap">
                                  <input
                                    type="date"
                                    value={combination.discount_date || ""}
                                    onClick={(e) => e.target.showPicker()}
                                    onChange={(e) =>
                                      handleInputChange(
                                        e,
                                        combIndex,
                                        "discount_date"
                                      )
                                    }
                                    className="form-control roundedborder hover:border-teal-500 focus:outline-none  focus:ring-teal-500 border-gray-300 p-2 w-[100px]"
                                    placeholder="date"
                                  />
                                </td>

                                <td className="px-2 py-4 whitespace-nowrap">
                                  <input
                                    type="text"
                                    value={code}
                                    onChange={(e) =>
                                      handleInputChange(e, combIndex, "code")
                                    }
                                    className="form-control roundedborder hover:border-teal-500 focus:outline-none  focus:ring-teal-500 border-gray-300 p-2 w-[100px]"
                                    placeholder="Enter code"
                                  />
                                </td>
                                <td className="px-2 py-4 whitespace-nowrap">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleDelete(combination, combIndex)
                                    }
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
            </div>

            {/* variation code end */}

            <div className="flex justify-end my-5">
              <button
                className=" bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 text-sm  rounded font-medium "
                type="submit"
              >
                {loading ? (
                  <div className="flex justify-center w-full">
                    <ImSpinner10
                      className="animate-spin text-white"
                      size={20}
                    />
                    <span className="px-2">Saving...</span>
                  </div>
                ) : (
                  <>Save</>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Bottom Drawer */}

        <ImageDrawer
          isOpen={isDrawerOpen}
          funSelectedImages={funSelectedImages}
          toggleDrawer={toggleDrawer}
          productImage={productImage}
          variationImageIdx={variationImageIdx && variationImageIdx}
          variationImageSelect={variationImageSelect}
        />

        {/* end Bottom Drawer */}

        {/* Bottom video Drawer */}

        <VideoDrawer
          onVideoSelect={handleVideoSelect} // Pass the handler to VideoDrawer
          isOpen={isVideoDrawerOpen}
          toggleDrawer={toggleVideoDrawer}
          // productImage={productImage}
        />

        {/* end Bottom video Drawer */}
      </div>

      
      <Footer_Backend />
    </div>
  );
};

export default CreateProduct;
