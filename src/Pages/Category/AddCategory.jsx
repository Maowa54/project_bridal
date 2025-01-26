import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ImSpinner10 } from "react-icons/im";
import Footer_Backend from "../../Component/Backend/Footer_Backend";
import { Link } from "react-router-dom";
import CategoryItems from "../../Component/CategoryItems";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const cacheKey = "categories";
  const cacheTimeKey = "categories_timestamp";
  const [category_id, setCategoryId] = useState("");

  const handleCategoryIdChange = (id) => {
    setCategoryId(id);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setErrors({ name: ["Category name is required."] });
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("parent_id", category_id);
    formData.append("name", name);
    formData.append("image", "");

    // console.log(formData);

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    try {
      const response = await axios.post(
        "https://admin.attireidyll.com/api/category/store",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status) {
        toast.success(
          response.data.message || "Category created successfully!"
        );
        setErrors({});

        localStorage.removeItem(cacheKey);
        localStorage.removeItem(cacheTimeKey);
        navigate("/category");
      } else {
        setErrors(response.data.error || {});
      }
    } catch (error) {
      console.error("Error saving category:", error.message);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <div>
        <div className="mt-1 px-4 py-3 rounded border border-gray-300 items-center">
          <h1 className=" md:text-lg font-medium ">Create Category</h1>
        </div>
        <form onSubmit={handleSave} className="rounded  mt-5 p-4">
          <div className="mb-6 w-full md:w-1/2 bg-white flex flex-col ">
            <label
              htmlFor="category_id"
              className="block  font-medium text-gray-800 mb-2"
            >
              Parent Category
            </label>
            <CategoryItems onCategoryIdChange={handleCategoryIdChange} />
            {errors.category_id && (
              <p className="text-red-600 text-sm ">{errors.category_id[0]}</p>
            )}
          </div>

          <label
            htmlFor="category-name"
            className="mb-2 block text-sm md:text-base font-medium"
          >
            Category Name
          </label>
          <input
            id="category-name"
            type="text"
            className="form-control text-sm border rounded border-gray-300 py-2 px-3 w-full md:w-1/2 focus:outline-none"
            placeholder="Enter category name "
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name[0]}</p>
          )}

          <div className="flex justify-end mt-6 py-6 gap-4">
            <button
              type="submit"
              className="rounded bg-teal-500 hover:bg-teal-400 text-white px-4 py-2 font-medium text-sm "
              disabled={loading}
            >
              {loading ? (
                <div className="flex justify-center items-center">
                  <ImSpinner10 className="animate-spin" size={20} />
                  <span className="px-2">Saving...</span>
                </div>
              ) : (
                "Save"
              )}
            </button>
            <Link
              className="rounded  bg-gray-500 hover:bg-gray-400 text-white px-4 py-2 font-medium text-sm "
              to="/category"
            >
              Back
            </Link>
          </div>
        </form>
      </div>
      <Footer_Backend />
    </div>
  );
};

export default AddCategory;
