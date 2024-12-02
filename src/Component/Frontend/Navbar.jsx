import { useEffect, useState , useContext} from "react";
import "bootstrap-icons/font/bootstrap-icons.css"; // Import Bootstrap Icons
import "@fortawesome/fontawesome-free/css/all.min.css"; // Import Font Awesome CSS
import { Link } from "react-router-dom";

import AddToCart from "./AddToCart";

import { CartContext } from "./CartContext";

const Navbar = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const { cartCount } = useContext(CartContext);

  useEffect(() => {
    const storedCategories = localStorage.getItem("allCategories");
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    }
  }, []);

  useEffect(() => {
    const storedProducts = localStorage.getItem("allProducts");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  useEffect(() => {
    const storedProducts = localStorage.getItem("cart");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts)); // Set state with parsed JSON
    }
  }, []);

  const totalProductCount = products.reduce(
    (total, product) => total + product.count,
    0
  );

  // console.log(products)

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
    <div className="shadow " >
      <div className=" mx-auto">
        <nav className="lg:px-20  px-4 py-3 md:py-4 mx-auto transition-all duration-50 ease-in-out w-full bg-white fixed top-0  z-50 shadow">
          <div className="flex flex-wrap items-center justify-between mx-auto ">
            <div className="text-center">
              <button
                className="openbtn  text-gray-800 text-lg md:text-2xl font-medium  hover:text-gray-500 focus:outline-none"
                onClick={openPanel}
              >
                <i className="fas fa-bars "></i>{" "}
              </button>

              <div
                className={`sidepanel w-52 md:w-64 fixed top-0 left-0 h-full bg-white shadow-xl transition-transform duration-700 ease-in-out overflow-hidden py-3 md:py-10 z-50 ${
                  isOpen ? "translate-x-0" : "-translate-x-full"
                }`}
              >
                <button
                  className="absolute top-4 font-medium right-6 text-2xl md:text-4xl text-gray-800 hover:text-gray-500  focus:outline-none"
                  onClick={closePanel}
                >
                  &times;
                </button>
                <ul className="mt-10 space-y-2">
                  {categories.map((category) => (
                    <li key={category.id} onClick={closePanel}>
                      <Link
                        to={{
                          pathname: "/allProduct",
                        }}
                        state={{ category }}
                        className="block px-2 md:px-8 py-2 text-sm md:text-xl text-gray-800 hover:bg-teal-700 hover:text-white transition-colors hover:bg-gradient-to-b from-teal-400 to-teal-700 transform hover:scale-105 duration-300"
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex-1 flex justify-center items-center">
              <Link to="/">
                <img
                  src="/assets/Images/Frame.png"
                  alt="Logo"
                  className="max-w-[140px] md:max-w-[200px] lg:max-w-[240px] h-auto object-contain"
                />
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute bottom-3 md:bottom-5 left-3 md:left-4">
                  <p className="flex size-2 items-center justify-center rounded-full bg-red-500  p-2 text-[0.5rem] md:text-xs  text-white">
                    {cartCount || 0}
                  </p>
                </div>

                <button
                  aria-label="View Cart"
                  onClick={handleViewCart}
                  className=" text-black  hover:text-gray-500 focus:outline-none"
                >
                  <i className="bi bi-cart   md:text-xl lg:text-2xl"></i>
                </button>
              </div>
              {isModalOpen && <AddToCart onClose={handleCloseCart} />}

              <Link to="/login">
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
