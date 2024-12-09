import { useEffect, useState, useContext, useRef } from "react";
import "bootstrap-icons/font/bootstrap-icons.css"; // Import Bootstrap Icons
import "@fortawesome/fontawesome-free/css/all.min.css"; // Import Font Awesome CSS
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import AddToCart from "./AddToCart";
import { CartContext } from "./CartContext";

const Navbar = () => {
  const {
    cart,
    removeFromCart,
    updateCartItem,
    handleDecreaseQuantity,
    handleIncreaseQuantity,
  } = useContext(CartContext);

  const [categories, setCategories] = useState([]);
  const sidepanelRef = useRef(null);
  const cartPanelRef = useRef(null);
  const { cartCount } = useContext(CartContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false); // Left panel state
  const [isCartOpen, setIsCartOpen] = useState(false); // Right panel state

  useEffect(() => {
    const storedCategories = localStorage.getItem("allCategories");
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    }
  }, []);

  useEffect(() => {
    if (isMenuOpen || isCartOpen) {
      document.body.classList.add("overflow-hidden"); // Disable background scroll
    } else {
      document.body.classList.remove("overflow-hidden"); // Enable background scroll
    }

    // Clean up when component unmounts
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isMenuOpen, isCartOpen]);

  const openMenuPanel = () => {
    setIsMenuOpen(true);
  };

  const closeMenuPanel = () => {
    setIsMenuOpen(false);
  };

  const openCartPanel = () => {
    setIsCartOpen(true);
  };

  const closeCartPanel = () => {
    setIsCartOpen(false);
  };

  const handleClickOutside = (e) => {
    // Close both panels if clicked outside
    if (
      sidepanelRef.current &&
      !sidepanelRef.current.contains(e.target) &&
      cartPanelRef.current &&
      !cartPanelRef.current.contains(e.target)
    ) {
      setIsMenuOpen(false);
      setIsCartOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="shadow">
      <div className=" mx-auto">
        <nav className="lg:px-24 px-4 py-4 mx-auto transition-all duration-50 ease-in-out w-full bg-white fixed top-0 z-50 shadow">
          <div className="flex flex-wrap items-center justify-between mx-auto">
            {/* Left Side Panel (Menu) */}
            <div className="text-center">
              <button
                className="openbtn text-gray-800 text-lg md:text-2xl font-medium hover:text-gray-500 focus:outline-none"
                onClick={openMenuPanel}
              >
                <img
                  src="/assets/Images/menus.png"
                  alt=""
                  className="size-4 md:size-5"
                />
              </button>

              {/* Menu Side Panel (Slide-in from Left) */}
              <div
                ref={sidepanelRef}
                className={`sidepanel w-48 md:w-72 fixed top-0 left-0 h-full bg-white shadow-xl transition-transform duration-500 ease-in-out overflow-hidden z-50 ${
                  isMenuOpen ? "translate-x-0" : "-translate-x-full"
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  className="absolute top-3 md:top-6 right-3 md:right-6 text-xl md:text-3xl text-gray-700 hover:text-gray-900 focus:outline-none"
                  onClick={closeMenuPanel}
                >
                  &times;
                </button>

                {/* Menu Content */}
                <div className="space-y-3 md:space-y-6">
                  {/* Category links */}
                  <ul className="mt-6 md:mt-16 space-y-2 md:space-y-4">
                    {categories.map((category) => (
                      <li key={category.id} onClick={closeMenuPanel}>
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

            {/* Center Logo */}
            <div className="flex-1 flex justify-center items-center">
              <Link to="/">
                <img
                  src="/assets/Images/Frame.png"
                  alt="Logo"
                  className="max-w-[160px] md:max-w-[200px] lg:max-w-[240px] h-auto object-contain"
                />
              </Link>
            </div>


           {/* Right Side Panel (Cart) */}
<div className="flex flex-col items-center space-x-4 inset-0">
  {/* Cart Icon with Counter */}
  <div className="relative">
    <div className="absolute bottom-4 md:bottom-5 left-3 md:left-4">
      <p className="flex items-center justify-center size-4 md:size-5 rounded-full bg-red-500 text-xs md:text-sm text-white">
        {cartCount || 0}
      </p>
    </div>
    <button
      aria-label="View Cart"
      onClick={openCartPanel}
      className="text-black hover:text-gray-500 focus:outline-none"
    >
      <i className="bi bi-cart text-xl md:text-2xl"></i>
    </button>
  </div>

  {/* Cart Side Panel */}
  <div
    ref={cartPanelRef}
    className={`fixed  inset-0 h-screen w-full md:w-96 bg-white shadow-xl transition-transform duration-500 ease-in-out overflow-hidden py-2 z-50 "
    }`}
    onClick={(e) => e.stopPropagation()}
  >
    {/* Header */}
    <div className="p-4 flex justify-between items-center border-b bg-white">
      <div className="flex items-center space-x-2">
        <i className="fas fa-shopping-cart text-yellow-500 text-lg md:text-2xl"></i>
        <h2 className="text-lg md:text-xl font-semibold">Your Cart</h2>
      </div>
      <button
        className="text-gray-600 hover:text-[#C43882] transform hover:scale-110 transition-transform duration-300"
        onClick={closeCartPanel}
      >
        <IoClose className="text-xl md:text-2xl" />
      </button>
    </div>

    {/* Product List */}
    <div className="flex-1 p-4  overflow-y-auto">
      <ul className="space-y-5">
        {cart.map((product) => (
          <li key={product.id} className="flex items-center space-x-6">
            <img
              src={`https://admin.attireidyll.com/public/storage/product/${product.image}`}
              alt={product.name}
              className="w-16 h-16 md:w-20 md:h-20"
            />
            <div className="flex-1">
              <p className="font-semibold text-gray-800 md:text-lg">
                {product.name}
              </p>
              <p className="text-yellow-700 text-sm md:text-base">
                ৳{product.unitPrice}
              </p>
              <div className="flex justify-between items-center mt-1">
                <div className="flex items-center">
                  <button
                    onClick={() => handleDecreaseQuantity(product.id)}
                    className="w-6 h-6 text-sm md:text-base font-semibold bg-teal-600 text-white rounded-l flex items-center justify-center hover:bg-teal-700"
                  >
                    -
                  </button>
                  <span className="w-6 h-6 text-sm md:text-base font-medium flex items-center justify-center border border-teal-600 text-teal-700">
                    {product.quantity}
                  </span>
                  <button
                    onClick={() => handleIncreaseQuantity(product.id)}
                    className="w-6 h-6 text-sm md:text-base font-semibold bg-teal-600 text-white rounded-r flex items-center justify-center hover:bg-teal-700"
                  >
                    +
                  </button>
                </div>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => removeFromCart(product.id)}
                >
                  <RiDeleteBin6Line className="text-lg md:text-xl" />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>

    {/* Footer */}
    <div className="border-t p-4 bg-white shadow-lg fixed bottom-0 w-full">
      <div className="flex items-center justify-between">
        <p className="text-lg md:text-xl font-semibold">Subtotal:</p>
        <p className="text-lg md:text-xl font-semibold">
          ৳ {cart.reduce((acc, product) => acc + product.price, 0)}
        </p>
      </div>
      <Link
    onClick={closeCartPanel}
    to="/checkout"
    className="mt-4 text-center font-semibold py-3 rounded-md bg-gradient-to-r from-teal-500 to-teal-800 border border-teal-200 text-white flex items-center justify-center gap-3 text-lg md:text-xl"
    style={{ marginBottom: "env(safe-area-inset-bottom)" }} // Ensures space for mobile safe area
  >
    Check Out
    <MdKeyboardDoubleArrowRight className="text-2xl md:text-3xl" />
  </Link>
    </div>
  </div>
</div>

          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
