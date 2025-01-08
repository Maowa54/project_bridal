import React, { useState, useEffect } from "react";
import Select from "react-select";
import Datepicker from "react-tailwindcss-datepicker";
import { useNavigate } from "react-router-dom";

import CategoryItems from "../../Component/CategoryItems";
import ImageDrawer from "../../Component/Product/ImageDrawer";

import { useLocation } from "react-router-dom";

import axios from "axios";
import toast from "react-hot-toast";
import ProductSelectedBusiness from "./ProductSelectedBusiness";
import { RiDeleteBinLine } from "react-icons/ri";
import StockLocation from "../../Component/Product/StockLocation";
import VideoDrawer from "../../Component/Product/VideoDrawer";
import { MdClose } from "react-icons/md";

const EditProduct = () => {
  const [image, setImage] = useState("");

  const location = useLocation();

  const [editProduct, setEditProduct] = useState(
    location.state?.editProduct || null
  );

  useEffect(() => {
    if (!editProduct) {
      console.log("No product data found, loading fallback data.");
      // Handle fallback logic if necessary
    } else {
      setImage(editProduct.image);

      setCategoryId(editProduct.category_id);
      setSelectedImages(editProduct.product_images);

      const variation_ids = editProduct.product_variation.map(
        (item) => item.variation_id
      );
      const variation_values = editProduct.product_variation.map((item) =>
        item.variaton_values.split(",")
      );

      setVariationIds(variation_ids);
      setVariationValuesIds(variation_values);
      // Debugging line
    }
  }, [editProduct]);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [variationImageIdx, setVariationImageIdx] = useState(null);

  const toggleDrawer = () => {
    setVariationImageIdx(null);
    setIsDrawerOpen(!isDrawerOpen);
  };

  const productImage = (id) => {
    setImage(id);
  };

  // Update selected image when an image is selected

  const [name, setName] = useState(editProduct?.name || "");
  const [orderStatus, setOrderStatus] = useState(
    editProduct?.pre_order?.toString() || "0" // Ensure it's a string
  );
  const [status, setStatus] = useState(editProduct?.is_published || "");

  const [short_desc, setShort_desc] = useState(editProduct?.short_desc || "");
  const [category_id, setCategoryId] = useState(editProduct?.category_id || "");

  const [stockLocationId, setStockLocationId] = useState(
    editProduct?.stock_location_id || ""
  );
  const [businessId, setBusinessId] = useState("");
  const [price, setPrice] = useState(editProduct?.price || "");
  const [stock, setStock] = useState(editProduct?.stock || "");

  const [code, setCode] = useState(editProduct?.code || "");
  const [buyingPrice, setBuyingPrice] = useState(
    editProduct?.buying_price || ""
  );
  const [discountAmount, setDiscountAmount] = useState(
    editProduct?.discount_amount || ""
  );
  const [discountType, setDiscountType] = useState(
    editProduct?.discount_type || "fixed"
  );
  const [upload_by, setUpload_by] = useState("");
  const [discountDate, setDiscountDate] = useState(null);

  const generateVariationRandomCode = () => {
    const code = editProduct?.variation_combinations[0]?.code;
    if (code) {
      return code;
    } else {
      return editProduct?.code; // Generates a 10-digit number as a string
    }
  };

  const handleLocationIdChange = (id) => {
    setStockLocationId(id);
  };

  const handleCategoryIdChange = (categoryId) => {
    console.log("Selected category ID:", categoryId);
    // Update the product with the selected category
    // For example, set it in your product state or update form data
    setEditProduct((prevState) => ({
      ...prevState,
      category_id: categoryId,
    }));
  };

  const handleBusinessIdChange = (id) => {
    setBusinessId(id);
  };

  const [isOpen, setIsOpen] = useState(false);

  const clientId = localStorage.getItem("clientId");
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  // const [selectedFile, setSelectedFile] = useState(null);

  const [images, setImages] = useState([]);

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
  const [variationsDataSet, setVariationsDataSet] = useState([]);
  const [variationIds, setVariationIds] = useState([]);
  const [variationValuesIds, setVariationValuesIds] = useState([]);
  const [hasVariations, setHasVariations] = useState(false);
  const [changeVariations, setChangeVariations] = useState(false);
  const [variations, setVariations] = useState([
    {
      selectedVariation: null,
      options: [],
      selectedValues: [],
      buying_price: "",
      price: "",
      stock: "",
      discount: "",
      discount_type: "",
      discount_date: "",
      vimage: "",
      code: "",
    },
  ]);

  const variationOptions = variationsData.map((variation) => ({
    id: variation.id,
    value: variation.name.toLowerCase(),
    label: variation.name.charAt(0) + variation.name.slice(1),
    variationValues: variation.variation_values.map((v) => ({
      id: v.id,
      name: v.name.trim(),
    })),
  }));

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

  const handleValuesChange = (selectedOptions, index) => {
    const updatedVariations = [...variations];
    updatedVariations[index].selectedValues = selectedOptions.map((option) => ({
      ...option,
      buying_price: option.buying_price || 0,
      price: option.price || 0,
      stock: option.stock || 0,
      discount: option.discount || 0,
      discount_type: option.discount_type || "fixed",
      discount_date: option.discount_date || "",
      vimage: option.vimage || "",
    }));
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
    setVariationIds((prevVariationId) => {
      const variationId = updatedVariations[index].selectedVariation.id;

      // Ensure the variationId is only added after selecting values
      if (!prevVariationId.includes(variationId) && selectedValues.length > 0) {
        return [...prevVariationId, variationId]; // Append new id if values are selected
      }
      return prevVariationId; // If already present or no values selected, return unchanged
    });
  };

  const navigate = useNavigate();

  // Handle input change for price, stock, discount, and code in combinations
  const handleInputChange = (e, index, field) => {
    const updatedCombinations = [...combinations]; // Copy the current combinations state
    updatedCombinations[index][field] = e.target.value; // Update the specific field
    setCombinations(updatedCombinations); // Update state with new combinations
  };

  const handleCombinationDelete = (combination, index) => {
    const updatedCombinations = combinations.filter((_, i) => i !== index);
    setCombinations(updatedCombinations);
  };

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

  const variationImageSelect = (name, index) => {
    const updatedCombinations = [...combinations]; // Copy the current combinations state
    updatedCombinations[index]["vimage"] = name; // Update the specific field
    setCombinations(updatedCombinations);
  };

  const variationImageRemove = (index) => {
    const updatedCombinations = [...combinations]; // Copy the current combinations state
    updatedCombinations[index]["vimage"] = ""; // Update the specific field
    setCombinations(updatedCombinations);
  };

  const handleRemoveImage = (imagess, id) => {
    const updatedImages = imagess.filter((image) => image.id !== id);
    setSelectedImages(updatedImages);
  };

  //image variations upload
  const handleVariationImage = (index) => {
    setVariationImageIdx(index);
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleChangeVariationsValue = () => {
    const existingVariations = editProduct.product_variation.map((pv) => ({
      selectedVariation: {
        id: pv.variation.id,
        value: pv.variation.name.toLowerCase(),
        label:
          pv.variation.name.charAt(0).toUpperCase() +
          pv.variation.name.slice(1),
      },
      options: getOptionsForVariation(pv.variation.name.toLowerCase()),
      selectedValues: pv.variaton_values.split(",").map((value) => ({
        value: value.toLowerCase().trim(),
        label: value.charAt(0).toUpperCase() + value.slice(1).trim(),
        buying_price: pv.buying_price || 0,
        price: pv.price || 0,
        stock: pv.stock || 0,
        discount: pv.discount || 0,
        discount_type: pv.discount_type || "fixed",
        discount_date: pv.discount_date || "",
        vimage: pv.vimage || "",
      })),
    }));

    setVariations(existingVariations);
    setChangeVariations(true);
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
          discount: "",
          discount_type: "",
          discount_date: "",
          vimage: "",
          code: "",
        },
      ]);
    }
  };

  const getOptionsForVariation = (variationType) => {
    const variation = variationsDataSet?.find(
      (v) => v.name.toLowerCase() == variationType.toLowerCase()
    );

    const variationFind = variation?.variation_values.map((value) => ({
      value: value.name.toLowerCase().trim(),
      label: value.name.charAt(0).toUpperCase() + value.name.slice(1).trim(),
    }));
    return variationFind ? variationFind : [];
  };

  const [combinations, setCombinations] = useState([]); // Define combinations state

  const generateCombinations = () => {
    // Filter variations with selected values
    const selectedVariations = variations.filter(
      (v) => v.selectedValues.length > 0
    );

    if (selectedVariations.length === 0) return [];

    // Generate combinations
    const generatedCombinations = selectedVariations.reduce(
      (acc, currVariation) => {
        const newCombinations = [];
        currVariation.selectedValues.forEach((selectedValue) => {
          if (acc.length === 0) {
            // Base case: Initialize combinations
            newCombinations.push({
              values: [selectedValue.value], // Only the "value" field for matching
              buying_price: 0,
              price: 0, // Default; will be updated later
              stock: 0, // Default; will be updated later
              discount: 0,
              discount_type: "",
              discount_percent: "",
              discount_date: "",
              vimage: "", // Default; will be updated later
              code: generateVariationRandomCode(), // Temporary code
            });
          } else {
            // Combine with existing combinations
            acc.forEach((existingCombination) => {
              const combinedValues = [
                ...existingCombination.values,
                selectedValue.value,
              ];
              newCombinations.push({
                values: combinedValues,
                buying_price: 0,
                price: 0, // Default; will be updated later
                stock: 0, // Default; will be updated later
                discount: 0,
                discount_type: "", // Default; will be updated later
                discount_date: "", // Default; will be updated later
                vimage: "",
                code: generateVariationRandomCode(), // Temporary code
              });
            });
          }
        });
        return newCombinations;
      },
      []
    );

    // Merge generated combinations with the existing data
    const finalCombinations = generatedCombinations.map(
      (generatedCombination) => {
        // Find a match in the combinations data
        const matchingCombination = combinations.find((combination) =>
          combination.values.every(
            (value, index) => value === generatedCombination.values[index]
          )
        );

        // Merge attributes
        return {
          ...generatedCombination,
          buying_price: matchingCombination
            ? matchingCombination.buying_price
            : 0,
          price: matchingCombination ? matchingCombination.price : 0,
          stock: matchingCombination ? matchingCombination.stock : 0,
          discount: matchingCombination ? matchingCombination.discount : 0,
          discount_date: matchingCombination
            ? matchingCombination.discount_date
            : "",
          discount_type: matchingCombination
            ? matchingCombination.discount_type
            : "fixed",
          vimage: matchingCombination ? matchingCombination.vimage : "",
          code: matchingCombination
            ? matchingCombination.code
            : generatedCombination.code,
        };
      }
    );
    return finalCombinations;
  };

  // Video Drawer
  const [selectedVideoName, setSelectedVideoName] = useState(
    editProduct?.video || ""
  );

  const [isVideoDrawerOpen, setIsVideoDrawerOpen] = useState(false);

  const handleVideoSelect = (videoName) =>
    setSelectedVideoName(videoName || editProduct.video);

  const handleVideoDelete = () => {
    setSelectedVideoName("");
  };

  const toggleVideoDrawer = () => {
    setIsVideoDrawerOpen(!isVideoDrawerOpen);
  };

  // Generate combinations and store in state
  useEffect(() => {
    setCombinations(generateCombinations());
  }, [variations]);

  const [hasVariation, setHasVariation] = useState(0);

  const handleSave = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    // formData.append("client_id", clientId);
    formData.append("user_id", userId);
    formData.append("product_id", editProduct.id);
    formData.append("name", name);
    formData.append("short_desc", short_desc);
    formData.append("category_id", category_id);
    formData.append("image", image);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("code", code);
    formData.append("buying_price", buyingPrice);
    formData.append("is_published", status);
    formData.append("has_variation", hasVariation);
    formData.append("pre_order", orderStatus);

    formData.append("video", selectedVideoName);
    formData.append(
      "more_images",
      selectedImages.map((image) => image.id).join(",")
    );
    formData.append("discount_amount", discountAmount);
    formData.append("discount_type", discountType);
    formData.append("discount_date", discountDate);
    formData.append("is_discount", 0);
    formData.append("stock_location_id", stockLocationId);
    formData.append("variation_ids", JSON.stringify(variationIds));
    formData.append("variation_values", JSON.stringify(variationValuesIds));
    formData.append("combinations", JSON.stringify(combinations));

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    try {
      const response = await axios.post(
        "https://admin.attireidyll.com/api/product/update",
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

  // edit logic

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
          setVariationsDataSet(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching variationsData:", error);
      }
    };
    fetchVariation();
  }, [token]);

  console.log(editProduct);

  // Initial setup when productData is loaded
  useEffect(() => {
    if (editProduct?.has_variation) {
      setHasVariations(true);
      setHasVariation(1);

      const existingCombinations = editProduct.variation_combinations.map(
        (comb) => ({
          values: comb.values.split(",").map((v) => v.trim()),
          buying_price: parseFloat(comb.buying_price || 0),
          price: parseFloat(comb.price || 0),
          stock: parseInt(comb.stock || 0),

          discount:
            comb.discount_type === "fixed"
              ? parseFloat(comb.discount || 0)
              : parseFloat(comb.discount_percent || 0),

          vimage: comb.image || "",
          discount_type: comb.discount_type || "fixed",
          discount_date: comb.discount_date || "",
          code: comb.code,
        })
      );

      setCombinations(existingCombinations);
    }
  }, [editProduct, variationsDataSet]);
  console.log("Pre-order Value:", orderStatus);


  return (
    <div id="section-1" className="">
      <div className="w-full rounded-lg shadow border border-gray-300 p-2 py-4 flex pe-4 mb-4">
        <h2 className="px-4 text-xl font-semibold">Edit Product</h2>
      </div>

      <div id="section-1">
        <form
          onSubmit={handleSave}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 "
        >
          {/* "Select Option" Div */}
          <div className="md:col-span-1 order-1 md:order-2">
            {/* <div className="px-4 pt-2 pb-4 mb-5 bg-white flex flex-col shadow">
              <label
                htmlFor="category_id"
                className="block text-sm font-medium text-gray-700 required"
              >
                Stock Location
              </label>
              <StockLocation
                locationId={editProduct?.stock_location_id}

                onLocationIdChange={handleLocationIdChange} />
              {errors.stock_location_id && (
                <p className="text-red-500 text-sm">
                  {errors.stock_location_id[0]}
                </p>
              )}
            </div> */}

            <div className="mb-2 px-4 py-3 h-28 bg-white flex flex-col border border-gray-300 rounded-md shadow-sm transition duration-300 ease-in-out hover:border-teal-400 ">
              <label
                htmlFor="product_pre_order"
                className="block text-base font-semibold text-gray-800 mb-4"
              >
                Pre Order
              </label>
              <select
                name="pre_order"
                id="product_pre_order"
                className="form-select text-sm rounded-md border border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 py-2 px-3 focus:outline-none"
                value={orderStatus} // Bind to state
                onChange={(e) => setOrderStatus(e.target.value)} // Update state
              >
                <option value="0">Off</option>
                <option value="1">On</option>
              </select>
              <span className="text-red-600 text-sm error-text product_pre_order_error"></span>
            </div>



            <div className="relative rounded-lg shadow border hover:border-blue-500 focus:outline-none  focus:ring-blue-500 border-gray-300 p-2 w-full">
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
                    className="rounded w-full flex flex-col items-center cursor-pointer bg-white hover:text-red-500 duration-300 shadow py-3"
                  >
                    Remove
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      toggleVideoDrawer();
                    }}
                    className="rounded w-full flex flex-col items-center mt-2 cursor-pointer bg-white shadow py-3"
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
                  className="rounded w-full flex flex-col items-center cursor-pointer bg-white  py-3"
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
                  <div className="mt-2 text-center">Add Video</div>
                </button>
              )}
            </div>
          </div>

          {/* Left Side Content */}

          <div className="md:col-span-3 order-2 md:order-1">
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
                className="form-control rounded-lg border hover:border-blue-500 focus:outline-none  focus:ring-blue-500 border-gray-300 p-2 w-full"
                id="Product_name"
                defaultValue={editProduct.name}
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
                defaultValue={editProduct.short_desc}
                onChange={(e) => setShort_desc(e.target.value)}
                name="short_desc"
                id="short_desc"
                className="form-control rounded-lg border hover:border-blue-500 focus:outline-none  focus:ring-blue-500 border-gray-300 p-2 w-full h-36"
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

              {/* ------------------------------ */}
              <div className="relative">
                {/* Drawer Toggle Button */}
                <div
                  type="button"
                  className="w-full flex flex-col items-center cursor-pointer bg-white rounded-lg shadow border hover:border-blue-500 focus:outline-none  focus:ring-blue-500 border-gray-300 p-2 mt-1"
                >
                  {selectedImages ? (
                    <div className="flex flex-wrap gap-2 justify-center">
                      {selectedImages.map((img, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={`https://pub-c053b04a208d402dac06392a3df4fd32.r2.dev/Attire_Idyll/image/${img.name}`}
                            alt={`Selected ${(index, img.id)}`}
                            className="rounded border shadow-sm h-40 w-auto"
                          />
                          {/* Remove Icon */}
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
                    </div>
                  ) : (
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
                  )}

                  <span onClick={toggleDrawer} className="mt-2 text-center">
                    Add Image
                  </span>
                </div>
              </div>

              {errors.image && (
                <p className="text-red-500 text-sm mx-4">{errors.image[0]}</p>
              )}
            </div>

            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
              id="section-3"
            >
              <div className="mb-3 px-4 pt-2 pb-4 bg-white flex flex-col rounded-lg shadow border border-gray-300 p-2 w-full">
                <label
                  htmlFor="category_id"
                  className="block text-sm font-medium text-gray-700 required"
                >
                  Product Category
                </label>
                <CategoryItems
                  categoryId={editProduct?.category_id}
                  onCategoryIdChange={handleCategoryIdChange}
                />
                {errors.category_id && (
                  <p className="text-red-500 text-sm">
                    {errors.category_id[0]}
                  </p>
                )}
              </div>

              <div className="mb-3 px-4 pt-2 pb-4 bg-white flex flex-col rounded-lg shadow border focus:outline-none   border-gray-300 p-2 w-full">
                <label
                  htmlFor="product_status"
                  className="block text-sm font-medium text-gray-700 required"
                >
                  Product Status
                </label>
                <select
                  name="product_status"
                  id="product_status"
                  defaultValue={editProduct.is_published}
                  className="form-control items-center bg-white flex flex-col rounded-lg shadow border hover:border-blue-500 focus:outline-none focus:ring-blue-500 border-gray-300 px-2 py-2.5 w-full"
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="1">On</option>
                  <option value="0">Off</option>
                </select>
                <span className="text-danger error-text product_status_error"></span>
              </div>
            </div>

            {/* variation code start */}

            {/* variation code start */}

            <div className="col-span-12 mb-4 rounded-lg shadow border border-gray-300">
              <div className="py-4 shadow bg-white flex-shrink-0">
                <div className="flex justify-between mb-2">
                  <div className="px-4 text-lg font-semibold">
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
                    <span className="ml-2">Has Variations?</span>
                  </div>
                </div>

                {!hasVariations && (
                  <>
                    <div className="px-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mx-5 items-center">
                        <div className="col-span-1">
                          <div className="mb-2">
                            <label className="form-label mb-1">
                              Cost Price
                            </label>
                            <input
                              type="number"
                              className="form-control rounded-lg shadow border hover:border-blue-500 focus:outline-none  focus:ring-blue-500 border-gray-300 p-2 w-full"
                              placeholder="Enter cost price"
                              defaultValue={editProduct?.buying_price || ""}
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
                            className="block font-medium text-gray-700 mb-1"
                          >
                            Stock
                          </label>
                          <input
                            type="number"
                            className="form-control rounded-lg shadow border hover:border-blue-500 focus:outline-none  focus:ring-blue-500 border-gray-300 p-2 w-full"
                            id="stock"
                            defaultValue={editProduct?.stock || ""}
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
                            className="block font-medium text-gray-700 mb-1"
                          >
                            Code
                          </label>
                          <input
                            type="text"
                            className="form-control rounded-lg shadow border hover:border-blue-500 focus:outline-none  focus:ring-blue-500 border-gray-300 p-2 w-full"
                            id="code"
                            placeholder="Enter code"
                            aria-label="Code"
                            value={code} // Set the input field value to the generated code
                            onChange={(e) => setCode(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className=" shadow-sm rounded-md hover:border-blue-500 focus:outline-none  focus:ring-blue-500 bg-white">
                      <div className="card-body p-4" id="section-7">
                        <h5 className="text-lg font-semibold">Discount</h5>

                        <div className="grid grid-cols-1 gap-3 md:grid-cols-4 items-center px-4">
                          <div className="col-span-1">
                            <div className="mb-3">
                              <label className="form-label mb-1">
                                Selling Price
                              </label>
                              <input
                                id="price"
                                type="number"
                                placeholder="Enter price"
                                aria-label="Price"
                                defaultValue={editProduct?.price || ""}
                                className="form-control rounded-lg shadow border hover:border-blue-500 focus:outline-none  focus:ring-blue-500 border-gray-300 p-2 w-full"
                                onChange={(e) => setPrice(e.target.value)}
                              />
                            </div>
                            {errors.price && (
                              <p className="text-red-500 text-sm">
                                {errors.price[0]}
                              </p>
                            )}
                          </div>
                          <div className="col-span-1">
                            <div className="mb-3">
                              <label className="form-label mb-1">
                                Discount Amount
                              </label>
                              <input
                                type="number"
                                name="discount_value"
                                defaultValue={
                                  editProduct?.discount_amount || ""
                                }
                                placeholder="Enter Discount price"
                                className="form-control rounded-lg shadow border hover:border-blue-500 focus:outline-none  focus:ring-blue-500 border-gray-300 p-2 w-full"
                                onChange={(e) =>
                                  setDiscountAmount(e.target.value)
                                }
                              />
                            </div>
                          </div>

                          <div className="col-span-1">
                            <div className="mb-3">
                              <label className="form-label mb-1">
                                Percent Or Fixed
                              </label>
                              <select
                                name="discount_type"
                                className="h-10 form-control rounded-lg shadow border hover:border-blue-500 focus:outline-none  focus:ring-blue-500 border-gray-300 p-2 w-full"
                                defaultValue="fixed"
                                onChange={(e) =>
                                  setDiscountType(e.target.value)
                                }
                              >
                                <option value="fixed">Fixed</option>
                                <option value="percent">Percent</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-span-1">
                            <div className="mb-3">
                              <label className="form-label mb-1">
                                Discount Date
                              </label>
                              <input
                                type="date"
                                defaultValue={editProduct?.discount_date || ""}
                                onClick={(e) => e.target.showPicker()}
                                className="form-control rounded-lg shadow border hover:border-blue-500 focus:outline-none  focus:ring-blue-500 border-gray-300 px-2 py-1.5 w-full"
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
                  <div className="mb-4 py-4 bg-white shadow">
                    <div className="flex justify-between mb-2">
                      <div className="mx-4 my-2">Variations</div>

                      {!changeVariations && (
                        <div className="mx-4 my-2 flex items-center">
                          <input
                            type="checkbox"
                            className="toggle toggle-info scale-75"
                            checked={changeVariations}
                            onChange={handleChangeVariationsValue}
                            aria-label="Toggle Variations"
                          />
                          <span className="ml-2">Change Variations</span>
                        </div>
                      )}
                    </div>
                    <div className="mx-5">
                      {changeVariations && (
                        <>
                          {variations.map((variation, index) => (
                            <div key={index} className="">
                              <div className="mb-6">
                                <div className="flex gap-4">
                                  <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                      Select Variation
                                    </label>
                                    <div className="flex flex-row-reverse gap-2">
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleVariationDelete(
                                            variation,
                                            index
                                          )
                                        }
                                        className="text-gray-500 hover:text-red-700 focus:outline-none"
                                      >
                                        X
                                      </button>
                                      <Select
                                        options={variationOptions}
                                        className="rounded-lg border border-gray-300 w-full"
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
                                    </div>
                                  </div>

                                  <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                      Select Values
                                    </label>
                                    <Select
                                      id="variation_value_ids"
                                      options={variation.options}
                                      // options={variation.options || variationsData}
                                      className="rounded-lg border border-gray-300 basic-multi-select"
                                      placeholder="Select values"
                                      isSearchable
                                      required
                                      isMulti
                                      onChange={(selectedOptions) =>
                                        handleValuesChange(
                                          selectedOptions,
                                          index
                                        )
                                      }
                                      value={variation.selectedValues}
                                      // value={variation.selectedValues || variationsData}
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
                        </>
                      )}
                    </div>

                    <div className="mx-4 mb-6 overflow-x-auto">
                      <div className="border rounded p-2 bg-gray-100">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Variation & Value
                              </th>
                              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Image
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
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {combinations.map((combination, combIndex) => (
                              <tr key={`comb-${combIndex}`} className="">
                                <td className="py-4 bg-gray-50 rounded px-3">
                                  <div className="capitalize text-center flex gap-2 items-center">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleCombinationDelete(
                                          combination,
                                          combIndex
                                        )
                                      }
                                      className="text-red-500 hover:text-red-700 focus:outline-none"
                                    >
                                      <RiDeleteBinLine />
                                    </button>
                                    <div className="whitespace-nowrap">
                                      {combination.values.map((value, i) => (
                                        <span key={i} className="block">
                                          {value}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                </td>

                                <td className="whitespace-nowrap border-dashed border-2">
                                  {combination.vimage ? (
                                    <div className="relative group">
                                      <img
                                        src={`https://pub-c053b04a208d402dac06392a3df4fd32.r2.dev/${clientId}/image/${combination.vimage}`}
                                        className="rounded border h-20"
                                      />
                                      <button
                                        type="button"
                                        className="absolute -top-1 -right-1 flex items-center justify-center bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                        onClick={() =>
                                          variationImageRemove(combIndex)
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
                                      <span>Add Image</span>
                                    </div>
                                  )}
                                </td>
                                <td className="px-2 py-4 whitespace-nowrap">
                                  <input
                                    type="number"
                                    min="0"
                                    required
                                    value={combination.buying_price || ""}
                                    onChange={(e) =>
                                      handleInputChange(
                                        e,
                                        combIndex,
                                        "buying_price"
                                      )
                                    }
                                    className="form-control rounded-lg shadow border border-gray-300 p-2  w-[100px]"
                                    placeholder="cost price"
                                  />
                                </td>

                                <td className="px-2 py-4 whitespace-nowrap">
                                  <input
                                    type="number"
                                    required
                                    min="0"
                                    value={combination.price || ""}
                                    onChange={(e) =>
                                      handleInputChange(e, combIndex, "price")
                                    }
                                    className="form-control rounded-lg shadow border border-gray-300 p-2  w-[100px]"
                                    placeholder="price"
                                  />
                                </td>
                                <td className="px-2 py-4 whitespace-nowrap">
                                  <input
                                    type="number"
                                    required
                                    min="0"
                                    value={combination.stock || ""}
                                    onChange={(e) =>
                                      handleInputChange(e, combIndex, "stock")
                                    }
                                    className="form-control rounded-lg shadow border border-gray-300 p-2 w-[100px]"
                                    placeholder="stock"
                                  />
                                </td>

                                <td className="px-2 py-4 whitespace-nowrap">
                                  <input
                                    type="number"
                                    min="0"
                                    // value={editProduct.combinations[combIndex].discount_type == "fixed" ? editProduct.combinations[combIndex].discount || "" : editProduct.combinations[combIndex].discount_percent || ""}
                                    value={combination.discount || ""}
                                    onChange={(e) =>
                                      handleInputChange(
                                        e,
                                        combIndex,
                                        "discount"
                                      )
                                    }
                                    className="form-control rounded-lg shadow border border-gray-300 p-2 w-[100px]"
                                    placeholder="Discount Taka"
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
                                    defaultValue="fixed"
                                    className="form-control items-center bg-white flex flex-col rounded-lg shadow border hover:border-blue-500 focus:outline-none focus:ring-blue-500 border-gray-300 px-2 py-2.5 w-[120]"
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
                                    // value={formatToDateInputValue(Date(combination.discount_date)) || ""} // Ensure proper format before rendering
                                    value={combination.discount_date || ""} // Ensure proper format before rendering
                                    onChange={(e) =>
                                      handleInputChange(
                                        e,
                                        combIndex,
                                        "discount_date"
                                      )
                                    }
                                    className="form-control rounded-lg shadow border border-gray-300 p-2 w-[100px]"
                                    placeholder="date"
                                  />
                                </td>

                                <td className="px-2 py-4 whitespace-nowrap">
                                  <input
                                    type="text"
                                    value={combination.code || ""}
                                    onChange={(e) =>
                                      handleInputChange(e, combIndex, "code")
                                    }
                                    className="form-control rounded-lg shadow border border-gray-300 p-2 w-[100px]"
                                    placeholder="Enter code"
                                  />
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
            <div className="flex justify-end mt-4">
              <button
                className="btn bg-[#28DEFC] hover:bg-[#28DEFC] text-white px-6 text-lg"
                type="submit"
              >
                Update
              </button>
            </div>
          </div>
        </form>

        {/* Bottom Drawer */}

        <ImageDrawer
          isOpen={isDrawerOpen}
          toggleDrawer={toggleDrawer}
          productImage={productImage}
          funSelectedImages={funSelectedImages}
          variationImageIdx={variationImageIdx && variationImageIdx}
          variationImageSelect={variationImageSelect}
        />

        <VideoDrawer
          onVideoSelect={handleVideoSelect} // Pass the handler to VideoDrawer
          isOpen={isVideoDrawerOpen}
          toggleDrawer={toggleVideoDrawer}
          // productImage={productImage}
        />
        {/* end Bottom Drawer */}
      </div>
    </div>
  );
};

export default EditProduct;
