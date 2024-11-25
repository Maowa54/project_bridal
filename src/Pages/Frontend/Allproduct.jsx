import { Link, useLocation } from "react-router-dom";
import RangeSlider from "../../Component/Frontend/Allproduct/RangeSlider";
import SocialMedia from "../../Component/Frontend/SocialMedia";
import Footer from "../../Component/Frontend/Footer";
import Navbar from "../../Component/Frontend/Navbar";
import { useEffect, useState } from "react";
const AllProduct = () => {
  const location = useLocation();
  const { category } = location.state || {};
  if (!category) {
    return <p>Category not found</p>;
  }
  console.log(category);

  const [products, setProducts] = useState([]);
  const [CategoryProducts, setCategoryProducts] = useState([]);

  useEffect(() => {
    const storedProducts = localStorage.getItem("allProducts");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  useEffect(() => {
    console.log("Updated products state:", products);
  }, [products]);

  useEffect(() => {
    if (category) {
      const filtered = products.filter((p) => p.category_id === category.id);
      setCategoryProducts(filtered);
    }
  }, [products, category]);

  console.log(CategoryProducts);

  return (
    <div>
      <Navbar />

      <div className="container mx-auto ">
        <div className="w-[90%] mx-auto mt-5">
          <SocialMedia />
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
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

              <div>
                <RangeSlider />
              </div>
            </div>

            {/* Product Images Section */}
            <div className="lg:col-span-9 col-span-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {CategoryProducts.map((product) => (
                  <div className="mb-2" key={product.id}>
                    <Link   to= {`/singleproduct/${product.name}-${product.id}`} state={{ product }}>
                      <img
                        src={`https://admin.attireidyll.com/public/storage/product/${product.image}`}
                        alt={product.name || "Product image"}
                        className="w-full h-auto transition-transform duration-300 ease-in-out hover:scale-105"
                        />
                    </Link>
                  </div>
                ))}
              </div>

              {/* View More Button */}
              <div className="text-center my-5">
                <Link
                  to=""
                  className=" px-7 py-1 text-sm md:text-base border hover:bg-gradient-to-b from-teal-500 to-teal-700 hover:text-white hover:border-teal-500 border-gray-800 rounded"
                >
                  View More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AllProduct;
