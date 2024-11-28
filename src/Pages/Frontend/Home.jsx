import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SocialMedia from "../../Component/Frontend/SocialMedia";
import Navbar from "../../Component/Frontend/Navbar";
import Footer from "../../Component/Frontend/Footer";
import ImageCarousel from "../../Component/Frontend/Home/ImageCarousel";


const Home = () => {


  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  //For categories
  const fetchCategoryData = async () => {
    try {
      const cacheKey = "allCategories";
      const cacheTimeKey = "allCategories_timestamp";
      const cacheValidityDuration = 60 * 60 * 1000; // 1 hour

      const cachedData = localStorage.getItem(cacheKey);
      const cachedTimestamp = localStorage.getItem(cacheTimeKey);
      const now = Date.now();

      if (
        cachedData &&
        cachedTimestamp &&
        now - parseInt(cachedTimestamp) < cacheValidityDuration
      ) {
        // Use cached data if it's still valid
        setCategories(JSON.parse(cachedData));
        return;
      }

      // Fetch data if cache is not valid
      const response = await axios.get(
        "https://admin.attireidyll.com/api/all/category/get"
      );

      if (response.data.status) {
        const fetchedCategories = response.data.data;

        // Cache fetched data and timestamp
        localStorage.setItem(cacheKey, JSON.stringify(fetchedCategories));
        localStorage.setItem(cacheTimeKey, now.toString());

        setCategories(fetchedCategories);
      }
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };

  useEffect(() => {
    fetchCategoryData();
  }, []);

  console.log(categories);

  //For Products
  const fetchApiData = async () => {
    try {
      const cacheKey = "allProducts";
      const cacheTimeKey = "allProducts_timestamp";
      const cacheValidityDuration = 60 * 60 * 1000; // 1 hour

      const cachedData = localStorage.getItem(cacheKey);
      const cachedTimestamp = localStorage.getItem(cacheTimeKey);
      const now = Date.now();

      if (
        cachedData &&
        cachedTimestamp &&
        now - parseInt(cachedTimestamp) < cacheValidityDuration
      ) {
        // Use cached data if it's still valid
        setProducts(JSON.parse(cachedData));
        return;
      }
      // Fetch data if cache is not valid
      const response = await axios.get(
        "https://admin.attireidyll.com/api/all/product/get"
      );

      if (response.data.status) {
        const fetchedProducts = response.data.data.data;

        // Cache fetched data and timestamp
        localStorage.setItem(cacheKey, JSON.stringify(fetchedProducts));
        localStorage.setItem(cacheTimeKey, now.toString());

        setProducts(fetchedProducts);
      }
    } catch (error) {
      console.error("Error fetching API data:", error);
    }
  };

  useEffect(() => {
    fetchApiData();
    const storedProducts = localStorage.getItem('allProducts');

    console.log()
  }, []);
  console.log(products);

  const [visibleCount, setVisibleCount] = useState(3); // Initially display 3 products
  const batchSize = 3; // Number of products to show per "View More"

  const handleViewMore = () => {
    setVisibleCount((prev) => Math.min(prev + batchSize, products.length)); // Show next batch
  };

  return (
    <div className=" ">
      <Navbar />
      <div className="container mx-auto">
        <div className="w-[90%] mx-auto overflow-hidden relative">
          <SocialMedia />
            <ImageCarousel/>
          {/* Buttons Section */}
          <div className="mt-8">
            {/* Top Row: First Three Buttons */}
            <div className="w-full md:w-[45%] mx-auto mt-4 flex flex-col md:flex-row justify-center gap-5 text-sm md:text-base">
              {categories.slice(0, 3).map((category) => (
                <Link
                  to={{
                    pathname: "/allProduct",
                  }}
                  state={{ category }}
                  key={category.id}
                  className="w-full md:flex-1 px-4 py-1 border border-gray-800 font-medium hover:bg-gradient-to-b from-teal-500 to-teal-700 hover:text-white hover:border-teal-400 rounded text-center transition"
                >
                  {category.name}
                </Link>
              ))}
            </div>

            {/* Bottom Row: Bridal Button */}
            <div className="w-full md:w-[60%] mx-auto mt-4 flex justify-center text-sm md:text-base">
              <Link
                to={{
                  pathname: "/allProduct",
                }}
                state={{ category: categories[3] }} // Assuming "Bridal" is the 4th category
                key={categories[3]?.id}
                className="w-full px-4 py-1 border border-gray-800 font-medium hover:bg-gradient-to-b from-teal-500 to-teal-700 hover:text-white hover:border-teal-400 rounded text-center transition"
              >
                {categories[3]?.name}
              </Link>
            </div>
          </div>

          {/* Brand Section */}
          <div className="mt-7">
            <div className="flex items-center">
              <img
                src="/assets/Images/logo.png"
                alt="Brand Logo"
                className="mr-2 w-8 h-auto"
              />
              <h5 className="mb-0 text-lg md:text-xl font-semibold">
                THE BRAND
              </h5>
            </div>
            <p className="mt-2 text-justify text-sm md:text-base leading-relaxed">
              The vision of our clothing brand is to inspire confidence,
              authenticity, and individuality in every person who wears our
              garments. We aim to create a diverse range of fashion pieces that
              empower individuals to express their unique personalities and
              embrace their personal style. Our vision is grounded in the belief
              that fashion should be inclusive, sustainable, and ethically
              produced. We strive to cultivate a community where creativity
              thrives, and where every customer feels seen, heard, and
              celebrated.
            </p>
          </div>

          {/* Video Section */}
          <div className="flex justify-center mt-6">
            <div className="w-full  ">
              <div className="relative overflow-hidden">
                <video
                  controls
                  autoPlay
                  muted
                  loop
                  className="w-full h-auto mx-auto lg:w-4/5"
                >
                  <source
                    src="/assets/Videos/Bridal_video.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>

          {/* Client Gallery Section */}
          <div className="flex justify-center items-center mt-5">
            <img
              src="/assets/Images/logo.png"
              alt="Brand Logo"
              className="mr-2 w-8 h-auto"
            />
            <h5 className="text-lg md:text-xl font-semibold">CLIENT GALLERY</h5>
            <img
              src="/assets/Images/logo.png"
              alt="Brand Logo"
              className="ml-2 w-8 h-auto"
            />
          </div>
          <div>
            <p className="text-sm md:text-base text-center mt-3">
              The vision of our clothing brand is to inspire confidence,
              authenticity,
              <br />
              and individuality in every person who wears our garments.{" "}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8 justify-items-center">
            {products.slice(0, visibleCount).map((product) => (
              <div className="mb-2" key={product.id}>
                <Link
                to= {`/singleproduct/${product.name}-${product.id}`}
                >
                  <img
                    src={`https://admin.attireidyll.com/public/storage/product/${product.image}`}
                    className="w-full h-auto transition-transform duration-300 ease-in-out hover:scale-105"
                    alt={product.name || "Product"}
                  />
                </Link>
              </div>
            ))}
          </div>

          {/* View More Button */}
          {visibleCount < products.length && (
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
      </div>
      <Footer />
    </div>
  );
};

export default Home;
