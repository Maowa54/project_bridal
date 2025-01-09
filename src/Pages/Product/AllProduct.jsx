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

const AllProduct = () => {
  const navigate = useNavigate();
  const [productsToDisplay, setProductsToDisplay] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(5);
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
      <div className="pb-8">
        <div className="flex flex-col rounded md:flex-row md:items-center justify-between shadow-md mt-1 mb-5 py-2 px-4">
          <h1 className="text-xl md:text-2xl text-nowrap font-semibold">
            All Products
          </h1>
          <div className="flex md:justify-end text-sm font-medium mt-3 md:mt-0">
            <Link
              to="/product/createproduct"
              className="flex items-center px-4 py-2 bg-teal-500 hover:bg-teal-400 text-white rounded shadow focus:outline-none focus:ring-2 mr-4"
            >
              <FaPlus className="mr-2" />
              Create
            </Link>
            <button className="flex items-center px-4 py-2 bg-gray-500 hover:bg-gray-400 text-white rounded shadow focus:outline-none focus:ring-2">
              <FaFilter className="mr-2" />
              Filter
            </button>
          </div>
        </div>

        <div className="mt-4 flex flex-col md:flex-row md:items-center justify-between  px-1">
          <div className="flex space-x-3 mb-2 md:mb-0">
            <select
              className="rounded border border-[#2B2F67] bg-white shadow-md h-8 w-24 md:w-20 flex"
              id="paginate_input"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="200">200</option>
            </select>
            <button className="bg-gray-500 hover:bg-gray-400 text-sm md:text-base text-white px-4 py-1 rounded shadow-md flex items-center transition">
              <FaFileExport className="mr-2" />
              Export
            </button>
          </div>

          <form className="w-full md:w-auto mt-2 md:mt-0">
            <div className="max-w-xl w-full">
              <div className="flex space-x-4">
                <div className="flex rounded-md overflow-hidden w-full">
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

        <div className="overflow-x-auto overflow-y-hidden my-6">
          <div className="w-full">
            <table className="table text-nowrap">
              <thead className="text-base  text-gray-700 border-b-2">
                <tr>
                  <th className="">SL</th>
                  <th className="">Image</th>
                  <th className="">name</th>
                  <th className="">Type</th>
                  <th className="">Code</th>
                  <th className="">Category</th>
                  <th className="">Product Cost</th>
                  <th className="">Stock</th>
                  <th className="">Action</th>
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
                    <tr key={product.id} className="hover cursor-pointer">
                      <th className="text-gray-600">
                        {startIndex + index + 1}
                      </th>

                      <td>
                        <img
                          src={`https://pub-c053b04a208d402dac06392a3df4fd32.r2.dev/Attire_Idyll/image/${product.image}`}
                          alt="Logo"
                          className="h-12 w-12"
                        />
                      </td>
                      <td className="">{product.name}</td>

                      <td className="">
                        {product.has_variation === 1 ? "Variant" : "Single"}
                      </td>
                      <td className="">{product.code}</td>
                      <td className="">
                        {product.category ? product.category.name : "N/A"}
                      </td>
                      <td className="">
                        {product.has_variation === 1
                          ? `৳${priceRange.minPrice} - ৳${priceRange.maxPrice}`
                          : `৳${product.price}`}
                      </td>
                      <td className="">{totalStock}pc</td>
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
                                <FaEye className="text-teal-500 text-lg pl-1" />
                                View
                              </a>
                            </li>
                            <li>
                              <a onClick={() => handleEdit(product.id)}>
                                <FaRegEdit className="text-yellow-500 text-lg pl-1" />
                                Edit
                              </a>
                            </li>
                            <li>
                              <a onClick={() => handleDelete(product.id)}>
                                <MdDeleteForever className="text-red-500 text-lg" />
                                Delete
                              </a>
                            </li>
                          </ul>
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
                  className="p-2 text-sm font-semibold text-teal-600 border border-teal-600 rounded-lg hover:bg-teal-100 disabled:opacity-50"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                >
                  « Previous
                </button>
                <span className="text-sm font-semibold">{currentPage}</span>
                <button
                  className="px-4 py-2 text-sm font-semibold text-teal-600 border border-teal-600 rounded-lg hover:bg-teal-100 disabled:opacity-50"
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
      </div>
      <Footer_Backend />
    </div>
  );
};

export default AllProduct;
