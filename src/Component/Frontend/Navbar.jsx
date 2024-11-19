import { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css"; // Import Bootstrap Icons
import "@fortawesome/fontawesome-free/css/all.min.css"; // Import Font Awesome CSS
import { Link } from "react-router-dom";
import Count from "./Count";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openPanel = () => {
    setIsOpen(true);
  };

  const closePanel = () => {
    setIsOpen(false);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [count, setCount] = useState(1);

  const handleViewCart = () => setIsModalOpen(true);
  const closeCart = () => setIsModalOpen(false);

  const handleCountChange = (newCount) => {
    setCount(newCount);
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
                <span className="absolute top-2 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-600 text-white rounded-full size-4 flex items-center justify-center text-xs font-bold">
                  2{" "}
                </span>
              </button>
             <Link to="/admin/category">
             <button>
              <i className="bi bi-person text-lg"></i>
             </button>
             </Link>
            </div>
          </div>
        </nav>
      </div>

      {/* Cart Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end items-start z-50 overflow-y-auto">
          <div className="bg-white w-full sm:w-[400px] p-6 rounded-sm">
            <div className="flex justify-between">
              <h3 className="text-base md:text-lg font-bold">Shopping Cart</h3>
              <button
                className="fas fa-close text-base md:text-xl hover:text-gray-500"
                onClick={closeCart}
              ></button>
            </div>
            <p className="mt-3 text-sm md:text-base">
              Only $714.00 away from Free Shipping
            </p>

            {/* Product Item */}
            <div className="flex items-start mt-4">
              <img
                src="/assets/Images/Rectangle 41 (1).png"
                alt="Product"
                className="w-24 h-24 mr-4 sm:w-32 sm:h-28"
              />
              <div className="flex flex-col justify-between text-xs md:text-sm">
                <span className="block font-semibold">
                  (Product 1) Sample - Clothing And Accessory Boutiques For Sale
                </span>
                <span>Gray / XS</span>
                <span className="font-semibold">৳188</span>
                <div className="flex items-center mt-2">
                  <Count
                    initialValue={count}
                    onCountChange={handleCountChange}
                  />
                </div>
              </div>
            </div>

            {/* Additional Product Items */}
            <div className="flex items-start mt-4 mb-8">
              <img
                src="/assets/Images/Rectangle 41 (1).png"
                alt="Product"
                className="w-24 h-24 mr-4 sm:w-32 sm:h-28"
              />
              <div className="flex flex-col justify-between text-xs md:text-sm">
                <span className="block font-semibold">
                  (Product 2) Sample - Clothing And Accessory Boutiques For Sale
                </span>
                <span>Gray / XS</span>
                <span className="font-semibold">৳188</span>
                <div className="flex items-center mt-2">
                  <Count
                    initialValue={count}
                    onCountChange={handleCountChange}
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-gray-300 mt-4 mb-4"></div>
            <div className="flex justify-between text-sm md:text-base">
              <p>Subtotal:</p>
              <p>$180</p>
            </div>
            <div className="flex justify-between text-sm md:text-base">
              <p>Total:</p>
              <p>$180</p>
            </div>

            <div className="flex justify-center mt-6 md:mt-9 md:mb-3 text-sm md:text-base">
              <Link to="/order">
                <button className="px-12 py-1 md:px-16 md:py-2 text-white text-nowrap rounded bg-gradient-to-b from-teal-500 to-teal-700 hover:scale-105">
                  Check Out
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
