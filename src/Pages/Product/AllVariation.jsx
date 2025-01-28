import React, { useState, useEffect } from "react";
import { CiMenuKebab } from "react-icons/ci";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaEye, FaRegEdit, FaPlus, FaMinus } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import toast from "react-hot-toast";
import Footer_Backend from "../../Component/Backend/Footer_Backend";
import { Tooltip as ReactTooltip } from "react-tooltip";
import Swal from "sweetalert2";

const AllVariation = () => {
  const [selectedVariation, setSelectedVariation] = useState(null);
  const [variations, setVariations] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [variationName, setVariationName] = useState("");
  const [inputFields, setInputFields] = useState([]);
  const [errors, setErrors] = useState({});
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAllVariations = async () => {
      try {
        const response = await axios.get(
          `https://admin.attireidyll.com/api/get_all_variation`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const variations = response.data.data || [];
        setVariations(variations);
      } catch (error) {
        console.error("Error fetching variations:", error);
      }
    };

    fetchAllVariations();
  }, [token, userId]);

  const openModal = (variation) => {
    setVariationName(variation.variation_name);
    setInputFields(
      variation.values.map((value, index) => ({ id: index, value }))
    );
    setSelectedVariation(variation);
    setModalOpen(true);
  };

  const handleInputChange = (id, value) => {
    setInputFields(
      inputFields.map((field) =>
        field.id === id ? { ...field, value } : field
      )
    );
  };

  const handleAddField = () => {
    setInputFields([...inputFields, { id: inputFields.length, value: "" }]);
  };

  const handleDeleteField = (id) => {
    setInputFields(inputFields.filter((field) => field.id !== id));
  };

  const closeModal = () => {
    setModalOpen(false);
    setVariationName("");
    setInputFields([]);
    setErrors({});
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const updatedValues = inputFields
      .map((field) => field.value.trim())
      .filter((value) => value !== "");

    if (updatedValues.length === 0) {
      setErrors({ apiError: "At least one value must be provided." });
      return;
    }

    const valuesString = updatedValues.join(",");

    const submitData = {
      variation_id: selectedVariation.variation_id,
      user_id: userId,
      name: variationName.trim(),
      value: valuesString,
    };

    try {
      const response = await axios.post(
        "https://admin.attireidyll.com/api/variation/update",
        submitData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status) {
        // Update the variations state locally
        const updatedVariation = {
          ...selectedVariation,
          variation_name: variationName.trim(),
          values: updatedValues,
        };

        setVariations(
          variations.map((v) =>
            v.variation_id === selectedVariation.variation_id
              ? updatedVariation
              : v
          )
        );

        toast.success(
          response.data.message || "Variation updated successfully"
        );
        closeModal();
      } else {
        setErrors({ apiError: response.data.message });
      }
    } catch (error) {
      console.error("Error updating variation:", error);
      setErrors({ apiError: "Failed to update variation." });
    }
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
          `https://admin.attireidyll.com/api/variation/delete/${variation_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        if (response.data.status) {
          Swal.fire(
            "Deleted!",
            response.data.message || "variation deleted successfully.",
            "success"  // Added success to indicate proper action
          );
  
          // Corrected the state update to setUsers instead of setDisplayOrders
          setVariations((prevUsers) => prevUsers.filter((variation) => variation_id !== id));
        } else {
          Swal.fire(
            "Error!",
            response.data.message || "Failed to delete variation.",
            "error"
          );
        }
      } catch (error) {
        console.error(
          "Error deleting variation:",
          error.response ? error.response.data : error.message
        );
        Swal.fire("Error!", "Failed to delete variation.", "error");
      }
    }
  };
  

  return (
    <div>
      <div className="pb-8">
        <div className="flex  border border-gray-300 justify-between mt-1 px-4 py-3 rounded items-center">
          <h1 className="text-lg md:text-lg font-medium text-gray-700 ">
            Variation{" "}
          </h1>{" "}
          <Link to="/product/variation/create">
            <button className="ml-auto bg-teal-500 hover:bg-teal-400 text-white font-medium py-1 px-4  text-sm  rounded  transition duration-200">
              Add New
            </button>
          </Link>
        </div>

        <div className="overflow-x-auto  my-6 ">
          <table className="min-w-full text-nowrap">
            <thead className="">
              <tr>
                <th className="px-4 py-2 border-b border-gray-300 text-left text-sm font-medium text-gray-800">
                  SL
                </th>
                <th className="px-4 py-2 border-b border-gray-300 text-left text-sm font-medium text-gray-800">
                  Variation Name
                </th>
                <th className="px-4 py-2 border-b border-gray-300 text-left text-sm font-medium text-gray-800">
                  Value
                </th>
                <th className="px-4 py-2 border-b border-gray-300 text-left text-sm font-medium text-gray-800">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="">
              {variations.map((variation, index) => (
                <tr
                  key={variation.variation_id}
                  className="hover border-b cursor-pointer"
                >
                  <td className="px-4 py-2  text-sm text-gray-700">
                    {index + 1}
                  </td>
                  <td className="px-4 py-2  text-sm text-gray-700">
                    {variation.variation_name}
                  </td>
                  <td className=" px-4 py-2  text-sm text-gray-700">
                    {variation.values.join(", ")}
                  </td>
                  <td className="px-4 py-2  text-sm text-gray-700">
                    <div className="flex gap-2">
                    

                      <button
                        data-tooltip-id="editTooltipId"
                        onClick={() => openModal(variation)}
                      >
                        <FaRegEdit className="text-green-500 text-lg   pl-1" />
                      </button>
                      <ReactTooltip
                        id="editTooltipId"
                        place="top"
                        content="Edit"
                        style={{
                          fontSize: "11px", // Adjust text size
                          padding: "4px 8px", // Adjust padding
                        }}
                      />
                      <button
                        data-tooltip-id="DeleteTooltipId"
                        onClick={() => handleDelete(variation.variation_id)}
                      >
                        <MdDeleteForever className="text-red-500 text-lg  " />
                      </button>
                      <ReactTooltip
                        id="DeleteTooltipId"
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
              ))}
            </tbody>
          </table>
        </div>

        {modalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded -md w-1/3">
              <h2 className="text-xl mb-4">Edit Variation</h2>
              <form onSubmit={handleEditSubmit}>
                <p className="mb-4">Value Name</p>
                <input
                  type="text"
                  name="variation_name"
                  className="form-control text-lowercase -[0_3px_10px_rgb(0,0,0,0.2)] py-2 px-3 w-full focus:outline-none focus:border-none"
                  placeholder="Enter variation name"
                  value={variationName}
                  onChange={(e) => setVariationName(e.target.value)}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}

                <p className="mb-4 mt-5">Value</p>
                {inputFields.map((field, index) => (
                  <div key={field.id} className="flex items-center mb-2">
                    <input
                      type="text"
                      className="form-control text-lowercase -[0_3px_10px_rgb(0,0,0,0.2)] py-2 px-3 w-[50%] focus:outline-none focus:border-none"
                      placeholder={`Enter value ${index + 1}`}
                      value={field.value}
                      onChange={(e) =>
                        handleInputChange(field.id, e.target.value)
                      }
                    />
                    {index === inputFields.length - 1 && (
                      <button
                        type="button"
                        className="ml-2 bg-sky-400 text-white px-2 py-2 cursor-pointer rounded"
                        onClick={handleAddField}
                      >
                        <FaPlus />
                      </button>
                    )}
                    {inputFields.length > 1 && (
                      <button
                        type="button"
                        className="ml-2 bg-slate-500 text-white px-2 py-2 cursor-pointer rounded"
                        onClick={() => handleDeleteField(field.id)}
                      >
                        <FaMinus />
                      </button>
                    )}
                  </div>
                ))}

                {errors.apiError && (
                  <p className="text-red-500 text-sm mt-1">{errors.apiError}</p>
                )}
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    type="button"
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      <div className="pt-56">
        <Footer_Backend />
      </div>{" "}
    </div>
  );
};

export default AllVariation;
