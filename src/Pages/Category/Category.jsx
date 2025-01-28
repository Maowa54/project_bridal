import React, { useEffect, useState, useRef } from "react";
import { IoIosSearch } from "react-icons/io";
import { CiMenuKebab } from "react-icons/ci";
import { Link } from "react-router-dom";
import { FaEye, FaCheck, FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import axios from "axios";
import Select from "react-select";
import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";
import Footer_Backend from "../../Component/Backend/Footer_Backend";
import Swal from "sweetalert2";
import { Tooltip as ReactTooltip } from "react-tooltip";

const Category = () => {
  const token = localStorage.getItem("token");
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editName, setEditName] = useState("");
  const [editId, setEditId] = useState("");
  const [errors, setErrors] = useState({});
  // Other states and refs...

  // Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `https://admin.attireidyll.com/api/category/get_all`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const categoriesData = response.data.data || [];
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, [token]);

  // Handle Edit
  const handleEdit = (category) => {
    setEditId(category.id);
    setEditName(category.name);
    setIsModalOpen(true);
  };

  const handleEditSave = async (e) => {
    e.preventDefault();
    if (!editName.trim()) {
      setErrors({ name: "Category name is required." });
      return;
    }
    try {
      const formData = new FormData();
      formData.append("name", editName);
      formData.append("image", "N/A"); // Adjust as needed
      formData.append("category_id", editId);

      const response = await axios.post(
        "https://admin.attireidyll.com/api/category/update",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.status) {
        // Recursive function to update category in state
        const updateCategoryInState = (categoriesList) => {
          return categoriesList.map((cat) => {
            if (cat.id === editId) {
              return { ...cat, name: editName };
            }
            if (cat.children && cat.children.length > 0) {
              return { ...cat, children: updateCategoryInState(cat.children) };
            }
            return cat;
          });
        };

        setCategories((prevCategories) => {
          const updatedCategories = updateCategoryInState(prevCategories);
          localStorage.setItem("categories", JSON.stringify(updatedCategories));
          return updatedCategories;
        });

        toast.success(
          response.data.message || "Category updated successfully!"
        );
        setErrors({});
        setIsModalOpen(false);
      } else {
        setErrors(response.data.error || {});
      }
    } catch (error) {
      console.error(
        "Error saving category:",
        error.response ? error.response.data : error.message
      );
    }
  };

  // Handle Delete
  const handleDelete = async (id) => {
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
          `https://admin.attireidyll.com/api/category/delete/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.data.status) {
          Swal.fire(
            "Deleted!",
            response.data.message || "Category deleted successfully."
          );
          // Recursive function to remove category from state
          const removeCategoryFromState = (categoriesList) => {
            return categoriesList
              .filter((cat) => cat.id !== id)
              .map((cat) => ({
                ...cat,
                children: cat.children
                  ? removeCategoryFromState(cat.children)
                  : [],
              }));
          };

          setCategories((prevCategories) =>
            removeCategoryFromState(prevCategories)
          );
        } else {
          Swal.fire(
            "Error!",
            response.data.message || "Failed to delete category.",
            "error"
          );
        }
      } catch (error) {
        console.error(
          "Error deleting category:",
          error.response ? error.response.data : error.message
        );
        Swal.fire("Error!", "Failed to delete category.", "error");
      }
    }
  };

  const renderCategories = (
    categoriesList,
    level = 0,
    parentIndices = [],
    processedIds = new Set()
  ) => {
    return categoriesList.map((category, index) => {
      // Skip duplicates
      if (processedIds.has(category.id)) return null;
      processedIds.add(category.id);

      const currentIndices = [...parentIndices, index + 1];
      const sl = currentIndices.join(".");

      return (
        <React.Fragment key={category.id}>
          <tr className="hover text-nowrap cursor-pointer">
            {/* SL Column */}
            <td className="px-4 py-2 border-b border-gray-300 text-sm text-gray-700">
              {sl}
            </td>
            {/* Name Column */}
            <td
              className="px-4 py-2 border-b border-gray-300 text-sm text-gray-700"
              style={{ paddingLeft: `${level * 20}px` }}
            >
              {level > 0 && <span className="mr-2 text-gray-500">—</span>}
              {category.name}
            </td>
            {/* Action Column */}
            <td className="px-4 py-2 border-b border-gray-300 text-sm text-gray-700">
              <div className="flex gap-2 justify-center">
                <button
                  data-tooltip-id={`editTooltip-${category.id}`}
                  onClick={() => handleEdit(category)}
                >
                  <FaRegEdit className="text-green-500 text-lg pl-1" />
                </button>
                <ReactTooltip
                  id={`editTooltip-${category.id}`}
                  place="top"
                  content="Edit"
                  style={{
                    fontSize: "11px",
                    padding: "4px 8px",
                  }}
                />
                <button
                  data-tooltip-id={`deleteTooltip-${category.id}`}
                  onClick={() => handleDelete(category.id)}
                >
                  <MdDeleteForever className="text-red-500 text-lg" />
                </button>
                <ReactTooltip
                  id={`deleteTooltip-${category.id}`}
                  place="top"
                  content="Delete"
                  style={{
                    fontSize: "11px",
                    padding: "4px 8px",
                  }}
                />
              </div>
            </td>
          </tr>
          {/* Render Children Recursively */}
          {category.children &&
            category.children.length > 0 &&
            renderCategories(
              category.children,
              level + 1,
              currentIndices,
              processedIds
            )}
        </React.Fragment>
      );
    });
  };
  return (
    <div>
      <div className="">
        <div className="flex  justify-between mt-1 px-4 py-3 rounded border border-gray-300 items-center">
          <h1 className=" md:text-lg font-medium ">Category</h1>
          <Link to="/category/addcategory">
            <button className="ml-auto bg-teal-500 hover:bg-teal-400 text-white font-medium py-1 px-4  text-sm  rounded  transition duration-200">
              Add New
            </button>
          </Link>
        </div>

        <div className="mt-4 px-1 gap-2 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <select
              className="rounded border border-[#2B2F67] bg-white shadow-md h-8 w-20 flex items-center justify-center"
              id="paginate_input"
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50" selected>
                50
              </option>
              <option value="100">100</option>
              <option value="200">200</option>
              <option value="400">400</option>
              <option value="500">500</option>
            </select>
          </div>

          <form>
            <div className="max-w-xl  w-full">
              <div className="flex space-x-4">
                <div className="flex rounded-md w-full">
                  <input
                    type="text"
                    className="w-full border text-sm border-gray-300 p-1 rounded-l-md rounded-r-none focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    placeholder="Search here"
                  />
                  <button className="bg-teal-500 hover:bg-teal-400 text-white px-4 py-1 rounded-r-md flex items-center">
                    <IoIosSearch className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="overflow-x-auto my-6">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b border-gray-300 text-sm font-medium text-gray-800 text-left">
                  SL
                </th>
                <th className="px-4 py-2 border-b border-gray-300 text-sm font-medium text-gray-800 text-left">
                  Name
                </th>
                <th className="px-4 py-2 border-b border-gray-300 text-sm font-medium text-gray-800 text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.length > 0 ? (
                renderCategories(categories)
              ) : (
                <tr>
                  <td
                    colSpan={3}
                    className="text-center px-4 py-2 text-sm text-gray-600"
                  >
                    <span className="loading loading-ring loading-md"></span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Edit Category Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-1/3">
              <h2 className="text-xl mb-4">Edit Category</h2>
              <form onSubmit={handleEditSave}>
                <div className="mb-4">
                  <label className="block text-gray-700">Category Name</label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">{errors.name}</p>
                  )}
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="mr-4 px-4 py-2 bg-gray-300 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded"
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

export default Category;
