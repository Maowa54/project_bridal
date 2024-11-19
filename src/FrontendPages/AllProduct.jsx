import { Link } from "react-router-dom";
import RangeSlider from "../Component/Frontend/RangeSlider";
import { useState } from "react";
import Footer from "../Component/Frontend/Footer";
import Header from "../Component/Frontend/Header";

const AllProduct = () => {
  const productsWomen = [
    {
      id: 1,
      image: "/component/Soft-Amber-Chiffon-Dress-3.png",
      title: "Wrist Watch Meant for Men",
      price: "৳1900",
      oldPrice: "৳3900",
    },
    {
      id: 2,
      image: "/component/Soft-Amber-Chiffon-Dress-3.png",
      title: "Wrist Watch Meant for Men",
      price: "৳1900",
      oldPrice: "৳3900",
    },
    {
      id: 3,
      image: "/component/Soft-Amber-Chiffon-Dress-3.png",
      title: "Wrist Watch Meant for Men",
      price: "৳1900",
      oldPrice: "৳3900",
    },
    {
      id: 4,
      image: "/component/Soft-Amber-Chiffon-Dress-3.png",
      title: "Wrist Watch Meant for Men",
      price: "৳1900",
      oldPrice: "৳3900",
    },
    {
      id: 5,
      image: "/component/Soft-Amber-Chiffon-Dress-3.png",
      title: "Wrist Watch Meant for Men",
      price: "৳1900",
      oldPrice: "৳3900",
    },
    {
      id: 6,
      image: "/component/Soft-Amber-Chiffon-Dress-3.png",
      title: "Wrist Watch Meant for Men",
      price: "৳1900",
      oldPrice: "৳3900",
    },
    {
      id: 7,
      image: "/component/Soft-Amber-Chiffon-Dress-3.png",
      title: "Wrist Watch Meant for Men",
      price: "৳1900",
      oldPrice: "৳3900",
    },
    {
      id: 8,
      image: "/component/Soft-Amber-Chiffon-Dress-3.png",
      title: "Wrist Watch Meant for Men",
      price: "৳1900",
      oldPrice: "৳3900",
    },
    {
      id: 9,
      image: "/component/Soft-Amber-Chiffon-Dress-3.png",
      title: "Wrist Watch Meant for Men",
      price: "৳1900",
      oldPrice: "৳3900",
    },
    {
      id: 10,
      image: "/component/Soft-Amber-Chiffon-Dress-3.png",
      title: "Wrist Watch Meant for Men",
      price: "৳1900",
      oldPrice: "৳3900",
    },
    {
      id: 11,
      image: "/component/Soft-Amber-Chiffon-Dress-3.png",
      title: "Wrist Watch Meant for Men",
      price: "৳1900",
      oldPrice: "৳3900",
    },
    {
      id: 12,
      image: "/component/Soft-Amber-Chiffon-Dress-3.png",
      title: "Wrist Watch Meant for Men",
      price: "৳1900",
      oldPrice: "৳3900",
    },
    {
      id: 13,
      image: "/component/Soft-Amber-Chiffon-Dress-3.png",
      title: "Wrist Watch Meant for Men",
      price: "৳1900",
      oldPrice: "৳3900",
    },
    {
      id: 14,
      image: "/component/Soft-Amber-Chiffon-Dress-3.png",
      title: "Wrist Watch Meant for Men",
      price: "৳1900",
      oldPrice: "৳3900",
    },

    {
      id: 15,
      image: "/component/Soft-Amber-Chiffon-Dress-3.png",
      title: "Wrist Watch Meant for Men",
      price: "৳1900",
      oldPrice: "৳3900",
    },
  ];
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isProductOpen, setIsProductOpen] = useState(false);

  const toggleCategoryDropdown = () => {
    setIsCategoryOpen(!isCategoryOpen);
  };

  const toggleProductDropdown = () => {
    setIsProductOpen(!isProductOpen);
  };
  return (
    <div>
        <Header/>
        <div className="container mx-auto flex">
      <div className="w-[90%] mx-auto">
        <div className="flex items-center mb-3">
          <Link
            to="/"
            className="mr-2 text-gray-800 text-xs  md:text-sm no-underline hover:text-gray-400 transition-colors font-medium duration-300"
          >
            Home
          </Link>
          <span className="text-gray-800 ">/</span>
          <a
            href="allproduct"
            className="ml-2 text-gray-800 text-xs md:text-sm  no-underline hover:text-gray-400 transition-colors font-medium duration-300"
          >
            Women
          </a>
        </div>

        <div className="mb-2">
          <p className="font-medium text-lg md:text-xl">Women's Wardrobe</p>
        </div>

        <hr className="mb-5 border border-gray-400" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Sidebar - Category and Price Filter */}
          <div className="md:col-span-3 col-span-12 hidden lg:block">

          <div className="mb-4 px-4 py-2 shadow rounded border">
      <div className="flex justify-between mb-2  cursor-pointer"
            onClick={toggleCategoryDropdown}>
        <div>
          <h3 className="font-medium"
           
          >
            Categories
          </h3>
        </div>
        <div>
          {/* Toggle Button */}
          <button
            onClick={toggleCategoryDropdown}
            className="focus:outline-none"
          >
            {isCategoryOpen ? (
              <i className="fas fa-chevron-up mr-2" />
            ) : (
              <i className="fas fa-chevron-down mr-2" />
            )}
          </button>
        </div>
      </div>
      <hr className="mb-2 border-gray-400" />
      {/* Dropdown Content */}
      {isCategoryOpen && (
        <div className="flex flex-col ">
          <a href="#" className="p-2 hover:bg-gray-200 hover:text-gray-500 hover:scale-105 transition-colors">
            Category 1
          </a>
          <a href="#" className="p-2 hover:bg-gray-200 hover:text-gray-500 hover:scale-105 transition-colors">
            Category 2
          </a>
          <a href="#" className="p-2 hover:bg-gray-200 hover:text-gray-500 hover:scale-105 transition-colors">
            Category 3
          </a>
          <a href="#" className="p-2 hover:bg-gray-200 hover:text-gray-500 hover:scale-105 transition-colors">
            Category 4
          </a>
        </div>
      )}
    </div>

            <div className=" my-4 px-4 py-2 shadow rounded border">
            <div className="flex justify-between mb-2  cursor-pointer"
            onClick={toggleProductDropdown}>                <div>
                  <h3 className="font-medium"
                 
                  >
                Product Type

                  </h3>
                </div>
              <div className="">
                  {/* Toggle Button */}
                  <button
                  onClick={toggleProductDropdown}
                  className="focus:outline-none"
                  >
                  {isProductOpen ? (
                    <i className="fas fa-chevron-up mr-2" />
                  ) : (
                    <i className="fas fa-chevron-down mr-2" />
                  )}
                </button>
              </div>
              </div>
              <hr className="mb-2 border-gray-400" />
              {/* Dropdown Content */}
              {isProductOpen && (
                <div className="text-sm">
                  <div className="flex items-center mb-2 p-2">
                    <input
                      type="checkbox"
                      id="type1"
                      className="form-checkbox size-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="type1" className="ml-2">
                      Type 1
                    </label>
                  </div>
                  <div className="flex items-center mb-2 p-2">
                    <input
                      type="checkbox"
                      id="type2"
                      className="form-checkbox size-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="type2" className="ml-2">
                      Type 3
                    </label>
                  </div>
                  <div className="flex items-center mb-2 p-2">
                    <input
                      type="checkbox"
                      id="type3"
                      className="form-checkbox size-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="type3" className="ml-2">
                      Type 4
                    </label>
                  </div>
                  <div className="flex items-center mb-2 p-2">
                    <input
                      type="checkbox"
                      id="type4"
                      className="form-checkbox size-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="type4" className="ml-2">
                      Type 5
                    </label>
                  </div>
                  <div className="flex items-center mb-2 p-2">
                    <input
                      type="checkbox"
                      id="type5"
                      className="form-checkbox size-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="type5" className="ml-2">
                      Type 6
                    </label>
                  </div>
                  <div className="flex items-center mb-2 p-2">
                    <input
                      type="checkbox"
                      id="type6"
                      className="form-checkbox size-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="type6" className="ml-2">
                      Type 7
                    </label>
                  </div>
                  <div className="flex items-center mb-2 p-2">
                    <input
                      type="checkbox"
                      id="type7"
                      className="form-checkbox size-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="type7" className="ml-2">
                      Type 8
                    </label>
                  </div>
                </div>
              )}
            </div>
            
            <div className="my-4 px-4 py-2 rounded shadow border">
              <h3 className="mb-1">Availability</h3>
              <hr className="mb-2 border-gray-400" />

              <div className="flex items-center  p-2">
                <input
                  type="radio"
                  id="in-stock"
                  name="availability"
                  className="form-radio  text-blue-600 border-gray-300  focus:ring-blue-500"
                />
                <label htmlFor="in-stock" className="ml-2">
                  In Stock
                </label>
              </div>

              <div className="flex items-center  p-2">
                <input
                  type="radio"
                  id="out-of-stock"
                  name="availability"
                  className="form-radio  text-blue-600 border-gray-300  focus:ring-blue-500"
                />
                <label htmlFor="out-of-stock" className="ml-2">
                  Out of Stock
                </label>
              </div>
            </div>

            <div className="my-4 px-4 py-2 rounded shadow border">
              <h3 className="mb-1">Sizes</h3>
              <hr className="mb-2 border-gray-400" />

              <div className="grid grid-cols-3 mt-3 mb-2 gap-4">
                <button className="px-1 py-1 text-sm md:text-base rounded-sm hover:text-white  hover:bg-blue-600 hover:border-blue-600 border border-gray-700">
                  XS
                </button>
                <button className="px-3 py-1 text-sm md:text-base rounded-sm hover:text-white  hover:bg-blue-600 hover:border-blue-600 border border-gray-700">
                  S
                </button>
                <button className="px-3 py-1 text-sm md:text-base rounded-sm hover:text-white  hover:bg-blue-600 hover:border-blue-600 border border-gray-700">
                  M
                </button>
                <button className="px-3 py-1 text-sm md:text-base rounded-sm hover:text-white  hover:bg-blue-600 hover:border-blue-600 border border-gray-700">
                  L
                </button>
                <button className="px-2  py-1 text-sm md:text-base rounded-sm hover:text-white hover:bg-blue-600 hover:border-blue-600 border border-gray-700">
                  XL
                </button>
                <button className="px-1 py-1 text-sm md:text-base rounded-sm hover:text-white hover:bg-blue-600 hover:border-blue-600 border border-gray-700">
                  XXL
                </button>
              </div>
            </div>

            <div className="">
              <RangeSlider />{" "}
            </div>
          </div>

          {/* Product card Section */}
          <div className="lg:col-span-9 col-span-12">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
              {productsWomen.map((product) => (
                <div
                  key={product.id}
                  className="relative border rounded-lg overflow-hidden shadow"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-[600px] h-[300px] object-cover"
                  />
                  <div className="absolute bottom-0 w-full bg-opacity-60 bg-gray-200 p-1">
                    <a
                      className="font-medium text-xs md:text-sm my-2 hover:underline truncate w-full"
                      title={product.title}
                    >
                      {product.title}
                    </a>

                    <div className="flex justify-between">
                      <div>
                        <p className="col-span-1 md:text-lg font-bold">
                          {product.price}
                        </p>
                        <p className="col-span-1 text-red-700 font-medium text-xs md:text-sm line-through">
                          {product.oldPrice}
                        </p>
                      </div>
                      <div className="mt-auto ms-auto">
                        <button className="   text-nowrap  px-2 py-1 text-xs md:text-sm hover:bg-[#b1352d] bg-[#82251F] border-[#82251F] text-white  rounded-sm transform transition-transform duration-300 ease-in-out hover:scale-105 ">
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default AllProduct;
