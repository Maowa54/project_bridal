/* eslint-disable react-hooks/rules-of-hooks */
import { Link, useLocation } from "react-router-dom";
import SocialMedia from "../../Component/Frontend/SocialMedia";
import RangeSlider from "../../Component/Frontend/Allproduct/RangeSlider";

import Footer from "../../Component/Frontend/Footer";
import Navbar from "../../Component/Frontend/Navbar";
import { useEffect, useState } from "react";
import ScrollToTopButton from "../../Component/Frontend/ScrollToTopButton";

const AllProduct = () => {
  const location = useLocation();
  const { category } = location.state || {};
  if (!category) {
    return <p>Category not found</p>;
  }

  const [products, setProducts] = useState([]);
  const [CategoryProducts, setCategoryProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(9);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [values, setValues] = useState([0, 10000]);

  useEffect(() => {
    const storedProducts = localStorage.getItem("allProducts");
    if (storedProducts) {
      const parsedProducts = JSON.parse(storedProducts);
      setProducts(parsedProducts);
    }
  }, []);

  useEffect(() => {
    if (category && products.length) {
      // Filter products by the current category
      const filtered = products.filter((p) => p.category_id === category.id);
      setCategoryProducts(filtered);

      // Update the dynamic MIN and MAX prices for the current category
      if (filtered.length > 0) {
        const prices = filtered.map((p) => p.price);
        setMinPrice(Math.min(...prices));
        setMaxPrice(Math.max(...prices));
        setValues([Math.min(...prices), Math.max(...prices)]);
      }
    }
  }, [products, category]);

  useEffect(() => {
    // Filter products by the price range
    if (category && products.length) {
      const filtered = products.filter(
        (p) =>
          p.category_id === category.id &&
          p.price >= values[0] &&
          p.price <= values[1]
      );
      setCategoryProducts(filtered);
    }
  }, [values, category, products]);

  const handleViewMore = () => {
    setVisibleCount((prevCount) => prevCount + 3);
  };

  return (
    <div>
      <Navbar />
      <ScrollToTopButton />

      <div className="container mx-auto ">
        <div className="w-[90%] mx-auto ">
          <SocialMedia />
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-20 md:pt-24">
            {/* Sidebar - Category and Price Filter */}
            <div className="md:col-span-3 col-span-12 hidden lg:block">
              <div className="flex items-center mb-3">
                <Link
                  to="/"
                  className="mr-2 text-gray-800 text-base md:text-lg no-underline hover:text-gray-400 transition-colors font-medium duration-300"
                >
                  Home
                </Link>
                <span className="text-gray-800 text-lg">/</span>
                <a
                  href="#"
                  className="ml-2 text-gray-800 text-base md:text-lg no-underline hover:text-gray-400 transition-colors font-medium duration-300"
                >
                  {category.name}
                </a>
              </div>

              <div className="my-2 shadow px-4 py-2">
                <h5 className="whitespace-nowrap py-2 font-medium text-base md:text-lg">
                  Product Category
                </h5>
                <hr className="my-1" />
                <div>
                  {/* Casual Category */}
                  <a
                    href="#"
                    className="text-gray-800 no-underline block mt-2 hover:bg-gray-200 transition"
                  >
                    <div className="flex items-center p-2">
                      <img
                        src="/assets/Images/logo.png"
                        alt="Brand Logo"
                        className="mr-2 w-5 h-5 object-contain"
                      />
                      <p className="mb-0 text-sm md:text-base">Casual</p>
                    </div>
                  </a>

                  {/* Party Wear Category */}
                  <a
                    href="#"
                    className="text-gray-800 no-underline block mt-2 hover:bg-gray-200 transition"
                  >
                    <div className="flex items-center p-2">
                      <img
                        src="/assets/Images/logo.png"
                        alt="Brand Logo"
                        className="mr-2 w-5 h-5 object-contain"
                      />
                      <p className="mb-0 text-sm md:text-base">Party Wear</p>
                    </div>
                  </a>

                  {/* Luxury Formals Category */}
                  <a
                    href="#"
                    className="text-gray-800 no-underline block mt-2 hover:bg-gray-200 transition"
                  >
                    <div className="flex items-center p-2">
                      <img
                        src="/assets/Images/logo.png"
                        alt="Brand Logo"
                        className="mr-2 w-5 h-5 object-contain"
                      />
                      <p className="mb-0 text-sm md:text-base">
                        Luxury Formals
                      </p>
                    </div>
                  </a>

                  {/* Saree Category */}
                  <a
                    href="#"
                    className="text-gray-800 no-underline block mt-2 hover:bg-gray-200 transition"
                  >
                    <div className="flex items-center p-2">
                      <img
                        src="/assets/Images/logo.png"
                        alt="Brand Logo"
                        className="mr-2 w-5 h-5 object-contain"
                      />
                      <p className="mb-0 text-sm md:text-base">Saree</p>
                    </div>
                  </a>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center lg:col-span-3">
                <RangeSlider
                  minPrice={minPrice}
                  maxPrice={maxPrice}
                  values={values}
                  onChange={setValues}
                />
              </div>
            </div>

            {/* Product Images Section */}
            {CategoryProducts.length > 0 && (
              <div className="lg:col-span-9 col-span-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {CategoryProducts.slice(0, visibleCount).map((product) => (
                    <div className="mb-2" key={product.id}>
                      <Link
                         to={`/singleproduct/${product.name}-${product.id}`}
                         state={{ product }}
                      >
                        <img
                          src={`https://pub-c053b04a208d402dac06392a3df4fd32.r2.dev/Attire_Idyll/image/${product.image}`}
                          alt={product.name || "Product image"}
                          className="w-full h-auto transition-transform duration-300 ease-in-out hover:scale-105"
                        />
                      </Link>
                    </div>
                  ))}
                </div>

                {/* View More Button */}
                {visibleCount < CategoryProducts.length && (
                  <div className="text-center my-5">
                    <button
                      onClick={handleViewMore}
                      className="px-7 py-1 font-medium text-sm md:text-base border hover:bg-gradient-to-b from-teal-500 to-teal-700 hover:text-white hover:border-teal-400 border-gray-800 rounded"
                    >
                      View More
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AllProduct;
