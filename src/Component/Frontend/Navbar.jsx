import { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css"; // Import Bootstrap Icons
import "@fortawesome/fontawesome-free/css/all.min.css"; // Import Font Awesome CSS
import { Link } from "react-router-dom";
import Count from "./Count";
import AddToCart from "./AddToCart";



const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openPanel = () => {
    setIsOpen(true);
  };

  const closePanel = () => {
    setIsOpen(false);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleViewCart = () => {
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseCart = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="shadow">
      <div className="container mx-auto">
        <nav className="w-[90%] mx-auto bg-white mt-3">
          <div className="flex flex-wrap items-center justify-between mx-auto py-3">
            <div className="text-center">
              <button
                className="openbtn  text-gray-800 text-2xl font-medium  hover:text-gray-500 focus:outline-none"
                onClick={openPanel}
              >
                <i className="fas fa-bars"></i>{" "}
              </button>

              <div
                className={`sidepanel w-full md:w-64 fixed top-0 left-0 h-full bg-white shadow-xl transition-transform duration-700 ease-in-out overflow-hidden pt-10 z-50 ${
                  isOpen ? "translate-x-0" : "-translate-x-full"
                }`}
              >
                <button
                  className="absolute top-7 font-medium right-6 text-4xl text-gray-800 hover:text-gray-500  focus:outline-none"
                  onClick={closePanel}
                >
                  &times;
                </button>
                <ul className="mt-10 space-y-2">
                  <li>
                    <Link
                      to="/allproduct"
                      className="block px-8 py-2 text-lg md:text-xl text-gray-800 hover:bg-teal-700 hover:text-white transition-colors hover:bg-gradient-to-b from-teal-400 to-teal-700  transform hover:scale-105 duration-300"
                    >
                      Men
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/allproduct"
                      className="block px-8 py-2 text-lg md:text-xl text-gray-800 hover:bg-teal-700 hover:text-white transition-colors hover:bg-gradient-to-b from-teal-300 to-teal-700  transform hover:scale-105 duration-300"
                    >
                      Women
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/allproduct"
                      className="block px-8 py-2 text-lg md:text-xl text-gray-800 hover:bg-teal-700 hover:text-white transition-colors hover:bg-gradient-to-b from-teal-300 to-teal-600  transform hover:scale-105 duration-300"
                    >
                      Kids & Family
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/allproduct"
                      className="block px-8 py-2 text-lg md:text-xl text-gray-800 hover:bg-teal-700 hover:text-white transition-colors hover:bg-gradient-to-b from-teal-300 to-teal-700 transform hover:scale-105 duration-300"
                    >
                      Bridal
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/preorder"
                      className="block px-8 py-2 text-lg md:text-xl text-gray-800 hover:bg-teal-700 hover:text-white transition-colors hover:bg-gradient-to-b from-teal-300 to-teal-700 transform hover:scale-105 duration-300"
                    >
                      Pre Order
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex-1 flex justify-center items-center">
              <Link to="/">
                <img
                  src="/assets/Images/Frame.png"
                  alt="Logo"
                  className="max-w-[150px] md:max-w-[200px] lg:max-w-[240px] h-auto object-contain"
                />
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <button
                aria-label="View Cart"
                onClick={handleViewCart}
                className="relative text-black text-2xl hover:text-gray-500 focus:outline-none"
              >
                <i className="bi bi-cart text-lg md:text-xl lg:text-2xl"></i>
              
              </button>
              {isModalOpen && <AddToCart onClose={handleCloseCart} />}

             <Link to="/admin/category">
             <button>
              <i className="bi bi-person text-lg"></i>
             </button>
             </Link>
            </div>
          </div>
        </nav>
      </div>

      
    </div>
  );
};

export default Navbar;
