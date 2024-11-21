import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { FaFileExport } from "react-icons/fa";
import { CiMenuKebab } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Link } from 'react-router-dom';
import axios from "axios";
import AllSelectedBusiness from "../../Component/AllSelectedBusiness";



const AllStock = () => {
  const token = localStorage.getItem("token");
  const clientId = localStorage.getItem("clientId");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // or whatever number of items you want per page
  const totalItems = 100; // replace with the actual number of items
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const [loading, setLoading] = useState(true);


  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };



  // get

  const [productsToDisplay, setProductsToDisplay] = useState([]);



  const fetchProducts = async () => {
    try {
      const response = await axios.get(`https://admin.attireidyll.com/api/product/get/${clientId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const fetchedProducts = response.data.data.data || [];
      setProductsToDisplay(fetchedProducts);
      // setFilteredProducts(fetchedProducts); 
    } catch (error) {
      console.error('Error fetching products:', error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [token, clientId]);

  console.log(productsToDisplay)


  const passProduct = (product)=> {
  
    console.log(product)
   
  }

  return (




    <div>
   
      <div className="mx-4 md:mx-10">

<div className="w-full shadow py-4 flex pe-4">
        <h2 className="px-4 text-xl font-semibold">Stock</h2>
        <div className="ml-auto flex items-center">
          <Link to="/stock/add" className="bg-[#28DEFC] text-white font-semibold py-1 px-6 mr-5 rounded cursor-pointer">Add Stock</Link>

          <AllSelectedBusiness/>
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center">
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
          <button className="bg-green-400 text-white px-4 py-1 rounded shadow-md flex items-center hover:bg-green-500 transition">
            <FaFileExport className="mr-2" />
            Export
          </button>
        </div>

        <div className="flex gap-3">
        

          <select
            name="category_id"
            className="shadow-md border border-gray-300 rounded-lg py-1 px-2 text-gray-700 focus:outline-none focus:ring-2   transition duration-150 ease-in-out"
            id="category_id"
          >
            <option value="" disabled selected>
              Stock type
            </option>
            <option value="1">Stock in</option>
            <option value="2">Low Stock</option>
            <option value="3">Out Of Stock</option>
          </select>
          <form>
            <div className="max-w-xl w-full">
              <div className="flex space-x-4">
                <div className="flex rounded-md overflow-hidden w-full">
                  <input
                    type="text"
                    className="w-full border border-gray-300 p-1 rounded-l-md rounded-r-none focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    placeholder="Search here"
                  />
                  <button className="bg-[#28DEFC] text-white px-4 py-1 rounded-r-md flex items-center ">
                    <IoIosSearch className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      

      <div className="overflow-auto xl:overflow-hidden mt-6 mx-5 pb-20">
        <table className="table mb-24">
          <thead>
            <tr>
              <th className="text-[15px]">SL</th>
              <th className="text-[15px]">Image</th>
              <th className="text-[15px]">Product Name</th>
              <th className="text-[15px]">Code</th>
              <th className="text-[15px]">Transaction type</th>
              <th className="text-[15px]">Stock</th>
              <th className="text-[15px]">Date</th>
              <th className="text-[15px]">Action</th>
            </tr>
          </thead>
          <tbody>
          {productsToDisplay.map((product, index) => (
            <tr key={product.id} className="hover">
              <th className="text-[15px]">{index + 1}</th>
              <td>
              <img
                                    src={`https://admin.attireidyll.com/public/storage/product/${product.image}`}// Update the path as necessary
                                    alt={product.name}
                                    className="h-16 w-16 object-cover"
                                />
              </td>
              <td className="text-[15px]">{product.name}</td>
              <td className="text-[15px]">{product.code}</td>
              <td className="text-[15px]"> <p className="flex justify-center text-white rounded-md bg-[#8ADE57] text-[15px] w-[40%] py-3">Stock In</p></td>
              <td className="text-[15px]">{product.stock}</td>
              <td className="text-[15px]">{new Date(product.updated_at).toLocaleString()}</td>
              <div className="dropdown dropdown-end">
                <td>
                  <button className="text-[20px]">
                    <CiMenuKebab />
                  </button>
                </td>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                >
                  <li>
  <Link 
    to={{
      pathname: "/stock/add",
    }} 
    state={{ product }} 
  >
    <FaEye className="text-blue-500 text-[20px] pl-1" />
    Adjust
  </Link>
</li>

                  <li>
                    <Link  to={{
      pathname: "/stock/log",
    }} 
    state={{ product }} >
                      <FaRegEdit className="text-green-500 text-[20px] pl-1" />
                      Log
                    </Link>
                  </li>
                
                </ul>
              </div>
            </tr>
                ))}
          </tbody>
        </table>
      </div>

      

      <div className="flex justify-center items-center mt-20 mb-10">
        <div className="join">
          <button
            className="join-item btn text-sm w-14 h-7 hover:bg-[#28DEFC] hover:text-white"
            onClick={handlePrevious}
            disabled={currentPage === 1}
          >
            «
          </button>
          <button className="join-item btn text-sm w-14 h-7 hover:bg-[#28DEFC] hover:text-white">
            {currentPage}
          </button>
          <button
            className="join-item btn text-sm w-14 h-7 hover:bg-[#28DEFC] hover:text-white"
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            »
          </button>
        </div>
      </div>
    </div>

  </div>


   
  );
};

export default AllStock;

