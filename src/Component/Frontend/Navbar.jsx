import { useEffect, useState, useContext, useRef } from "react";
import "bootstrap-icons/font/bootstrap-icons.css"; // Import Bootstrap Icons
import "@fortawesome/fontawesome-free/css/all.min.css"; // Import Font Awesome CSS
import { Link } from "react-router-dom";

import AddToCart from "./AddToCart";

import { CartContext } from "./CartContext";

const Navbar = () => {
  const [categories, setCategories] = useState([]);
  const sidepanelRef = useRef(null);

  const { cartCount } = useContext(CartContext);

  useEffect(() => {
    const storedCategories = localStorage.getItem("allCategories");
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    }
  }, []);

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
  const handleClickOutside = (e) => {
    if (sidepanelRef.current && !sidepanelRef.current.contains(e.target)) {
      setIsOpen(false); // Close side panel if clicked outside
    }
  };

  // Add event listener to document on mount and clean up on unmount
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  

  return (
    <div className="shadow ">
    <div className=" mx-auto">
      <nav className="lg:px-20 py-4 mx-auto transition-all duration-50 ease-in-out w-full bg-white fixed top-0  z-50 shadow">
        <div className="flex flex-wrap items-center justify-between mx-auto ">
          <div className="text-center">
            <button
              className="openbtn px-3 md:px-4 text-gray-800 text-lg md:text-2xl font-medium  hover:text-gray-500 focus:outline-none"
              onClick={openPanel}
            >
              <img
                src="/assets/Images/menus.png"
                alt=""
                className="size-4 md:size-5"
              />
            </button>

            <div
              ref={sidepanelRef}
              className={`sidepanel w-48 md:w-72 fixed top-0 left-0 h-full bg-white shadow-xl  transition-transform duration-500 ease-in-out overflow-hidden py-6 px-6 z-50 ${
                isOpen ? "translate-x-0" : "-translate-x-full"
              }`}
              onClick={(e) => e.stopPropagation()} // Prevent click inside panel from closing
            >
              {/* Close button */}
              <button
                className="absolute top-3 md:top-6 right-3 md:right-6 text-xl md:text-3xl text-gray-700 hover:text-gray-900 focus:outline-none"
                onClick={closePanel}
              >
                &times;
              </button>

              {/* Side panel content */}
              <div className="space-y-3 md:space-y-6">
                {/* Category links */}
                <ul className="mt-6 md:mt-16 space-y-2 md:space-y-4">
                  {categories.map((category) => (
                    <li key={category.id} onClick={closePanel}>
                      <Link
                        to={{
                          pathname: "/allProduct",
                        }}
                        state={{ category }}
                        className="block px-2 md:px-6 text-nowrap py-3 text-sm md:text-lg text-gray-700 hover:text-white hover:bg-gradient-to-r from-teal-400 to-teal-600 rounded-lg transition-all duration-300 transform hover:scale-105"
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="flex-1 flex justify-center items-center">
            <Link to="/">
              <img
                src="/assets/Images/Frame.png"
                alt="Logo"
                className="max-w-[160px] md:max-w-[200px] lg:max-w-[240px] h-auto object-contain"
              />
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="absolute bottom-4 md:bottom-5 left-7 md:left-8">
                <p className="flex size-2 items-center justify-center rounded-full bg-red-500  p-2 text-[0.7rem] md:text-sm  text-white">
                  {cartCount || 0}
                </p>
              </div>

              <button
                aria-label="View Cart"
                onClick={handleViewCart}
                className=" text-black px-4 hover:text-gray-500 focus:outline-none "
              >
                <i className="bi bi-cart text-xl md:text-2xl"></i>
              </button>
            </div>
            {isModalOpen && <AddToCart isModalOpen={isModalOpen} onClose={handleCloseCart} />}

          </div>
        </div>
      </nav>
    </div>
  </div>
  );
};

export default Navbar;