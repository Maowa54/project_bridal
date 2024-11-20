import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SocialMedia from "../../Component/Frontend/SocialMedia";
import Navbar from "../../Component/Frontend/Navbar";
import Footer from "../../Component/Frontend/Footer";

const Home = () => {
  const images = [
    "/assets/Images/Bride-1.png",
    "/assets/Images/bride-12.png",
    "/assets/Images/bride-13.png",
    "/assets/Images/bride-14.png",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [images.length]);

  const [products, setProducts] = useState([]);

  const fetchApiData = async () => {
    try {
      const cacheKey = 'allProducts';
      const cacheTimeKey = 'allProducts_timestamp';
      const cacheValidityDuration = 60 * 60 * 1000; // 1 hour
  
      const cachedData = localStorage.getItem(cacheKey);
      const cachedTimestamp = localStorage.getItem(cacheTimeKey);
      const now = Date.now();
  
      if (cachedData && cachedTimestamp && (now - parseInt(cachedTimestamp) < cacheValidityDuration)) {
        // Use cached data if it's still valid
        setProducts(JSON.parse(cachedData));
        return;
      }
      // Fetch data if cache is not valid
      const response = await axios.get(
        "https://expressitplus.co.uk/api/all/product/get"
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
  }, []);

  const [visibleCount, setVisibleCount] = useState(3); // Initially display 3 products
  const batchSize = 3; // Number of products to show per "View More"

  const handleViewMore = () => {
    setVisibleCount((prev) => Math.min(prev + batchSize, products.length)); // Show next batch
  };

  console.log(products);

  return (
    <div>
      <Navbar/>
      <div className="container mx-auto">
        <div className="w-[90%] mx-auto overflow-hidden relative">
          <SocialMedia />

          {/* Carousel Inner */}
          <div className="relative flex">
            {images.map((image, index) => (
              <div
                key={index}
                className={`w-full flex-shrink-0 transition-transform duration-700 ease-in-out ${
                  index === currentIndex ? "block" : "hidden"
                }`}
              >
                <img
                  src={image}
                  alt={`Bride Slide ${index + 1}`}
                  className="w-full object-cover"
                />
              </div>
            ))}

            {/* Indicators inside the carousel images */}
            <div className="absolute bottom-2 md:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`border-2 size-2 md:size-3  rounded-full transition duration-300 ease-in-out 
                ${
                  index === currentIndex
                    ? "bg-teal-900 border-teal-900"
                    : "bg-white"
                }`}
                  onClick={() => setCurrentIndex(index)} // Change slide on click
                  aria-label={`Slide ${index + 1}`}
                ></button>
              ))}
            </div>
          </div>

          {/* Buttons Section */}
          <div className="mt-8">
            <div className="w-full text-gray-800 md:w-[45%] mx-auto mt-4 flex flex-col md:flex-row justify-center gap-5 text-sm md:text-base">
              <Link
                to="/allproduct"
                className="w-full  md:flex-1 px-4 py-1 border border-gray-800 font-medium hover:bg-gradient-to-b from-teal-500 to-teal-700 hover:text-white hover:border-teal-400 rounded text-center transition"
              >
                WOMAN
              </Link>
              <Link
                to="/allproduct"
                className="w-full md:flex-1 px-4 py-1 border border-gray-800 font-medium hover:bg-gradient-to-b from-teal-500 to-teal-700 hover:text-white hover:border-teal-400 rounded text-center transition"
              >
                MAN
              </Link>
              <Link
                to="/allproduct"
                className="w-full text-nowrap md:flex-1 px-4 py-1 border border-gray-800 font-medium hover:bg-gradient-to-b from-teal-500 to-teal-700 hover:text-white hover:border-teal-400 rounded text-center transition"
              >
                KIDS & FAMILY
              </Link>
            </div>
          </div>

          {/* Bridal Button */}
          <div className="w-full md:w-[60%] mx-auto mt-4 flex justify-center text-sm md:text-base">
            <div className="w-full">
              <Link
                to="/allproduct"
                className="w-full font-medium px-4 py-1 border border-gray-800 text-gray-800 hover:bg-gradient-to-b from-teal-500 to-teal-700 hover:text-white hover:border-teal-400 rounded block text-center transition"
              >
                Bridal
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
                  to={{
                    pathname: "/singleProduct",
                  }}
                  state={{ product }}
                >
                  <img
                    src={`https://expressitplus.co.uk/public/storage/product/${product.image}`}
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
      <Footer/>
    </div>
  );
};

export default Home;
