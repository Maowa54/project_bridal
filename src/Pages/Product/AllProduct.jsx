import React, { useState, useEffect } from "react";
import { FaPlus, FaFilter } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { FaFileExport } from "react-icons/fa";
import { CiMenuKebab } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import axios from "axios";
import AllSelectedBusiness from "../../Component/AllSelectedBusiness";
import Swal from "sweetalert2";
import Footer_Backend from "../../Component/Backend/Footer_Backend";
import { Tooltip as ReactTooltip } from "react-tooltip";

const AllProduct = () => {
  const navigate = useNavigate();
  const [productsToDisplay, setProductsToDisplay] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const token = localStorage.getItem("token");

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `https://admin.attireidyll.com/api/products/get`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const fetchedProducts = response.data.data.data || [];
      setProductsToDisplay(fetchedProducts);
      setFilteredProducts(fetchedProducts); // Set initial filtered products
    } catch (error) {
      console.error(
        "Error fetching products:",
        error.response ? error.response.data : error.message
      );
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [token]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const products = filteredProducts.slice(startIndex, endIndex);

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when items per page changes
  };

  const handleEdit = (id) => {
    const productToEdit = products.find((product) => product.id === id);
    if (productToEdit) {
      navigate("/product/edit-product", {
        state: { editProduct: productToEdit },
      });
    } else {
      console.error("Product not found");
    }
  };

  const getPriceRange = (variations) => {
    const prices = variations.map((variation) => variation.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    return { minPrice, maxPrice };
  };

  // console.log(products);

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
        const response = await axios.get(
          `https://admin.attireidyll.com/api/product/delete/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.status) {
          Swal.fire(
            "Deleted!",
            response.data.message || "Product deleted successfully.",
            "success"
          );

          // Remove the deleted SMS from the state

          // setProductsToDisplay((prevProd) => prevProd.filter((product) => product.id !== id));

          fetchProducts();
        } else {
          Swal.fire(
            "Error!",
            response.data.message || "Failed to delete SMS.",
            "error"
          );
        }
      } catch (error) {
        console.error(
          "Error deleting SMS:",
          error.response ? error.response.data : error.message
        );
        Swal.fire("Error!", "Failed to delete product.", "error");
      }
    }
  };

  return (
    <div>
      <div className="">
        <div className="flex  border justify-between mt-1 px-4 py-3 border-gray-300 items-center rounded">
          <h1 className="text-lg md:text-lg font-medium text-gray-700 ">
            All Products
          </h1>

          <div className="flex md:justify-end text-sm font-medium mt-3 md:mt-0">
            <Link
              to="/product/createproduct"
              className="flex items-center text-sm px-4 py-2 bg-teal-500 hover:bg-teal-400 text-white rounded  focus:outline-none focus:ring-2 mr-4"
            >
              <FaPlus className="mr-2" />
              Create
            </Link>
            <button className="flex items-center text-sm px-4 py-2 bg-gray-500 hover:bg-gray-400 text-white rounded  focus:outline-none focus:ring-2">
              <FaFilter className="mr-2" />
              Filter
            </button>
          </div>
        </div>

        <div className="mt-4 flex flex-col md:flex-row md:items-center justify-between  px-1">
          <div className="flex space-x-3 mb-2 md:mb-0">
            <select
              className="rounded border text-sm border-[#2B2F67] bg-white -md h-8 w-24 md:w-20 flex"
              id="paginate_input"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
            >
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="200">200</option>
              <option value="300">300</option>
              <option value="400">400</option>
              <option value="500">500</option>
            </select>
            <button className="bg-gray-500 hover:bg-gray-400 text-sm  text-white px-4 py-1 rounded -md flex items-center transition">
              <FaFileExport className="mr-2" />
              Export
            </button>
          </div>

          <form className="w-full md:w-auto mt-2 md:mt-0">
            <div className="max-w-xl w-full">
              <div className="flex space-x-4">
                <div className="flex rounded overflow-hidden w-full">
                  <input
                    type="text"
                    className="w-full text-sm border border-gray-300 px-2 rounded-l-md rounded-r-none focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    placeholder="Search here"
                  />
                  <button className="bg-teal-500 text-white px-4 py-1 rounded-r-md flex items-center hover:bg-teal-700 transition">
                    <IoIosSearch className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="overflow-x-auto  my-6 ">
          <table className="min-w-full text-nowrap">
            <thead className="">
              <tr>
                <th className="px-4 py-2 border-b border-gray-300 text-left text-sm font-medium text-gray-800">
                  SL
                </th>
                <th className="px-4 py-2 border-b border-gray-300 text-left text-sm font-medium text-gray-800">
                  Image
                </th>
                <th className="px-4 py-2 border-b border-gray-300 text-left text-sm font-medium text-gray-800">
                  name
                </th>
                <th className="px-4 py-2 border-b border-gray-300 text-left text-sm font-medium text-gray-800">
                  Type
                </th>
                <th className="px-4 py-2 border-b border-gray-300 text-left text-sm font-medium text-gray-800">
                  Code
                </th>
                <th className="px-4 py-2 border-b border-gray-300 text-left text-sm font-medium text-gray-800">
                  Category
                </th>
                <th className="px-4 py-2 border-b border-gray-300 text-left text-sm font-medium text-gray-800">
                  Product Cost
                </th>
                <th className="px-4 py-2 border-b border-gray-300 text-left text-sm font-medium text-gray-800">
                  Stock
                </th>
                <th className="px-4 py-2 border-b border-gray-300 text-left text-sm font-medium text-gray-800">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="text-sm  text-gray-700 font-medium">
              {products.map((product, index) => {
                // Calculate price range for products with variations
                const priceRange =
                  product.has_variation === 1
                    ? getPriceRange(product.variation_combinations)
                    : null;

                const totalStock =
                  product.has_variation === 1
                    ? product.variation_combinations.reduce(
                        (sum, variation) => sum + variation.stock,
                        0
                      )
                    : product.stock;

                return (
                  <tr
                    key={product.id}
                    className="hover border-b cursor-pointer"
                  >
                    <td className="px-4 py-2  text-sm text-gray-600">
                      {startIndex + index + 1}
                    </td>

                    <td className="px-4 py-2  text-sm text-gray-600">
                      <img
                        src={`https://pub-c053b04a208d402dac06392a3df4fd32.r2.dev/Attire_Idyll/image/${product.image}`}
                        alt="Logo"
                        className="h-12 w-12"
                      />
                    </td>
                    <td className="px-4 py-2  text-sm text-gray-600">
                      {product.name}
                    </td>

                    <td className="px-4 py-2  text-sm text-gray-600">
                      {product.has_variation === 1 ? "Variant" : "Single"}
                    </td>
                    <td className="px-4 py-2  text-sm text-gray-600">
                      {product.code}
                    </td>
                    <td className="px-4 py-2  text-sm text-gray-600">
                      {product.category ? product.category.name : "N/A"}
                    </td>
                    <td className="px-4 py-2  text-sm text-gray-600">
                      {product.has_variation === 1
                        ? `৳${priceRange.minPrice} - ৳${priceRange.maxPrice}`
                        : `৳${product.price}`}
                    </td>
                    <td className="px-4 py-2  text-sm text-gray-600">
                      {totalStock}pc
                    </td>
                    <td className="px-4 py-2  text-sm text-gray-600">
                      <div className="flex gap-2">
                        <Link
                          to={`/singleproduct/${product.name}-${product.id}`}
                          data-tooltip-id="viewTooltipId"
                        >
                          <FaEye className="text-teal-500 text-lg pl-1" />
                        </Link>
                        <ReactTooltip
                          id="viewTooltipId"
                          place="top"
                          content="View Details"
                          style={{
                            fontSize: "11px", // Adjust text size
                            padding: "4px 8px", // Adjust padding
                          }}
                        />

                        <button
                          data-tooltip-id="editTooltipId"
                          onClick={() => handleEdit(product.id)}
                        >
                          <FaRegEdit className="text-yellow-500 text-lg pl-1" />
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
                          data-tooltip-id="deleteTooltipId"
                          onClick={() => handleDelete(product.id)}
                        >
                          <MdDeleteForever className="text-red-500 text-lg" />
                        </button>
                        <ReactTooltip
                          id="deleteTooltipId"
                          place="top"
                          content="Delete "
                          style={{
                            fontSize: "11px", // Adjust text size
                            padding: "4px 8px", // Adjust padding
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex flex-col md:flex-row justify-between px-4 items-center mt-4">
            <div className="text-sm mb-2 md:mb-0">
              Showing {startIndex + 1} to{" "}
              {Math.min(endIndex, filteredProducts.length)} of{" "}
              {filteredProducts.length} entries
            </div>
            <div className="flex items-center gap-2">
              <button
                className="px-2 py-1 text-sm font-semibold text-teal-600 border border-teal-600 rounded hover:bg-teal-100 disabled:opacity-50"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                « Previous
              </button>
              <span className="text-sm font-semibold bg-teal-600 text-white px-3 py-1 border border-teal-600 rounded">
                {currentPage}
              </span>
              <button
                className="px-4 py-1  text-sm font-semibold text-teal-600 border border-teal-600 rounded hover:bg-teal-100 disabled:opacity-50"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                Next »
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer_Backend />
    </div>
  );
};

export default AllProduct;
