import React, { useState, useEffect } from "react";
import { CiMenuKebab } from "react-icons/ci";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaEye, FaRegEdit, FaPlus, FaMinus } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import toast from "react-hot-toast";
import Footer_Backend from "../../Component/Backend/Footer_Backend";

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

  return (
    <div>
      <div className="pb-8">
        <div className="flex shadow-md justify-between mt-1 px-4 py-2 items-center">
          <h1 className="text-xl md:text-2xl font-semibold">Variation</h1>
          <Link to="/product/variation/create">
            <button className="ml-auto bg-teal-500 hover:bg-teal-400 text-white font-semibold py-1 px-6  text-sm md:text-base rounded  transition duration-200">
              Add New
            </button>
          </Link>
        </div>

        <div className="overflow-x-auto my-6">
          <div className="w-full">
            <table className="table text-nowrap">
              <thead className="text-base  text-gray-700 border-b-2">
                <tr>
                  <th className="">SL</th>
                  <th className="">Variation Name</th>
                  <th className="">Value</th>
                  <th className="">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm  text-gray-700 font-medium">
                {variations.map((variation, index) => (
                  <tr key={variation.variation_id} className="hover">
                    <th className="text-gray-600">{index + 1}</th>
                    <td className="">{variation.variation_name}</td>
                    <td className=" w-[30%]">{variation.values.join(", ")}</td>
                    <td>
                      <div className="dropdown dropdown-end">
                      <button className="md:text-lg ml-5">
                      <CiMenuKebab />
                        </button>
                        <ul
                          tabIndex={0}
                          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                        >
                          <li>
                            <a>
                              <FaEye className="text-blue-500 text-lg   pl-1" />
                              View
                            </a>
                          </li>
                          <li>
                            <a onClick={() => openModal(variation)}>
                              <FaRegEdit className="text-green-500 text-lg   pl-1" />
                              Edit
                            </a>
                          </li>
                          <li>
                            <a
                              onClick={() =>
                                console.log("Delete", variation.variation_id)
                              }
                            >
                              <MdDeleteForever className="text-red-500 text-lg  " />
                              Delete
                            </a>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {modalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-md w-1/3">
              <h2 className="text-xl mb-4">Edit Variation</h2>
              <form onSubmit={handleEditSubmit}>
                <p className="mb-4">Value Name</p>
                <input
                  type="text"
                  name="variation_name"
                  className="form-control text-lowercase shadow-[0_3px_10px_rgb(0,0,0,0.2)] py-2 px-3 w-full focus:outline-none focus:border-none"
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
                      className="form-control text-lowercase shadow-[0_3px_10px_rgb(0,0,0,0.2)] py-2 px-3 w-[50%] focus:outline-none focus:border-none"
                      placeholder={`Enter value ${index + 1}`}
                      value={field.value}
                      onChange={(e) =>
                        handleInputChange(field.id, e.target.value)
                      }
                    />
                    {index === inputFields.length - 1 && (
                      <button
                        type="button"
                        className="ml-2 bg-sky-400 text-white px-2 py-2 cursor-pointer rounded-md"
                        onClick={handleAddField}
                      >
                        <FaPlus />
                      </button>
                    )}
                    {inputFields.length > 1 && (
                      <button
                        type="button"
                        className="ml-2 bg-slate-500 text-white px-2 py-2 cursor-pointer rounded-md"
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

      <Footer_Backend />
    </div>
  );
};

export default AllVariation;
