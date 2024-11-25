import { useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css"; // Import Bootstrap Icons
import "@fortawesome/fontawesome-free/css/all.min.css"; // Import Font Awesome CSS
import { Link } from "react-router-dom";

import AddToCart from "./AddToCart";

const Navbar = (  ) => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);




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

  // Function to handle product removal


  // Calculate subtotal and total

  const [totalProductCount, setTotalProductCount] = useState(0);

  useEffect(() => {
    // Recalculate the total product count whenever products change
    const newTotal = products.reduce((sum, product) => sum + product.count, 0);
    setTotalProductCount(newTotal);
  }, [products]); // Dependency array ensures this runs when products change


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
    <div className="shadow">
      <div className="container mx-auto">
        <nav className="w-[90%] mx-auto  py-2">
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
  {categories.map((category) => (
    <li key={category.id}>
      <Link
        to={{
          pathname: "/allProduct",
        }}
        state={{ category }}
        className="block px-8 py-2 text-lg md:text-xl text-gray-800 hover:bg-teal-700 hover:text-white transition-colors hover:bg-gradient-to-b from-teal-400 to-teal-700 transform hover:scale-105 duration-300"
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
                  className="max-w-[150px] md:max-w-[200px] lg:max-w-[240px] h-auto object-contain"
                />
              </Link>
            </div>

            <div className="flex items-center space-x-4">
     <div className="relative">
    
  <div className="bottom-5 absolute left-4">
    <p className="flex size-2 items-center justify-center rounded-full bg-red-500 p-2 text-xs text-white">
 {totalProductCount}
    </p>
  </div>

              <button
                aria-label="View Cart"
                onClick={handleViewCart}
                className=" text-black text-2xl hover:text-gray-500 focus:outline-none"
              >
                <i className="bi bi-cart text-lg md:text-xl lg:text-2xl"></i>
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
