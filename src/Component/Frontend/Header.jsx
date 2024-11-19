import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { IoMenu } from "react-icons/io5";
import { Link } from "react-router-dom";
import AddToCart from "./AddToCart";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false); // State to handle modal visibility

  const handleViewCart = () => {
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseCart = () => {
    setIsModalOpen(false); // Close the modal
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="bg-white  py-0 md:py-3 shadow mb-5">
      <div className="w-[90%] mx-auto flex items-center justify-between py-3">
        {/* Mobile Navigation Button (Visible on small screens) */}
        <div className="flex items-center lg:hidden mr-3">
          <button onClick={toggleDropdown} className="text-2xl text-gray-700">
            <IoMenu />
          </button>
        </div>

        {/* Logo */}
        <div className="mr-5">
          <Link to="/">
            <img
              src="/component/Logo_ExpressITbd.png"
              alt="ExpressITbd Logo"
              className="h-10"
            />
          </Link>
        </div>

        {/* Navigation Menu */}
        <nav className="hidden lg:flex text-gray-700  text-sm font-medium">
          <Link
            to="/allproduct"
            className="px-3 py-2 hover:bg-gray-100 hover:text-gray-500"
          >
            MEN
          </Link>
          <Link
            to="/allproduct"
            className="px-3 py-2 hover:bg-gray-100 hover:text-gray-500"
          >
            WOMEN
          </Link>
          <Link
            to="/allproduct"
            className="px-3 py-2 hover:bg-gray-100 hover:text-gray-500"
          >
            KIDS
          </Link>
          <Link
            to="/allproduct"
            className="px-3 py-2 hover:bg-gray-100 hover:text-gray-500"
          >
            HOME & LIVINGS
          </Link>
          <Link
            to="/allproduct"
            className="px-3 py-2 hover:bg-gray-100 hover:text-gray-500"
          >
            BEAUTY
          </Link>
          <Link
            to="/allproduct"
            className="px-3 py-2 hover:bg-gray-100 hover:text-gray-500"
          >
            GADGET
          </Link>
        </nav>

        {/* Search Bar */}
        <div className="hidden md:flex flex-grow justify-center mx-5">
          <div className="relative w-full max-w-md ">
            <input
              type="text"
              placeholder="Search product here"
              className="w-full text-sm py-2 pl-4 pr-10 border border-gray-300 rounded-full focus:outline-none   hover:ring-1  hover:ring-gray-300 transition duration-200"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 text-2xl">
              <IoIosSearch />
            </button>
          </div>
        </div>

        <div className="block md:hidden mx-1">
          <button className=" text-gray-607 text-2xl">
            <IoIosSearch />
          </button>
        </div>

        {/* Icons Section */}
        <div className=" lg:flex items-center space-x-4">
          <button
            className="text-gray-700 hover:text-gray-900 text-2xl "
            onClick={handleViewCart}
          >
            <IoCartOutline />
          </button>
          {isModalOpen && <AddToCart onClose={handleCloseCart} />}

          <Link to="/login">
            <button className="text-gray-600 hover:text-gray-900 text-2xl">
              <CgProfile />
            </button>
          </Link>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        {isDropdownOpen && (
          <nav className="bg-white border-t border-gray-200">
            <div className="flex flex-col space-y-2 px-4 py-2 text-sm font-medium text-gray-700">
              <a href="#">MEN</a>
              <a href="#">WOMEN</a>
              <a href="#">KIDS</a>
              <a href="#">HOME & LIVINGS</a>
              <a href="#">BEAUTY</a>
              <a href="#">Gadget</a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
