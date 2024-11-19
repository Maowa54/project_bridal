import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link for navigation

import Carousel from "../Component/Frontend/Carousel";
import Header from "../Component/Frontend/Header";
import Footer from "../Component/Frontend/Footer.Jsx";

const Home = () => {
  const [products, setProducts] = useState([]);

  // const fetchApiData = async () => {
  //   try {
  //     const response = await axios.get(
  //       "https://admin.trendy.pandapos.software/api/all/product/get"
  //     );

  //     console.log(response.data.data);
  //     if (response.data.status) {
  //       setProducts(response.data.data);
  //       console.log(response.data.data);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching API data:", error);
  //   }
  // };
  // console.log(products);

  // useEffect(() => {
  //   fetchApiData();
  // }, []);

  // Create a mapping of categories to products
  // const productsByCategory = products.reduce((acc, product) => {
  //   // Use the product's category name as the key
  //   const category = product.category || "Uncategorized"; // Fallback if category is undefined
  //   if (!acc[category]) {
  //     acc[category] = [];
  //   }
  //   acc[category].push(product);
  //   return acc;
  // }, {});


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
      const response = await axios.get("https://admin.trendy.pandapos.software/api/all/product/get");
  
      if (response.data.status) {
        const fetchedProducts = response.data.data;
  
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

  console.log(products);

  

  return (
    <div>
      <Header />
      <div className="container mx-auto flex">
        <div className="w-[90%] mx-auto">
          {/* Image Container */}
          <div className="flex justify-center mb-4">
            <img
              className="w-full h-auto"
              src="/component/image8_10ad161c-1f97-4863-88ea-65413bc0b94f.png"
              alt="Hero Img"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[40%_60%] gap-3">
            {/* Left Section (40% on md and up, full width on small screens) */}
            <div className="bg-[#82251F] p-4 text-white mb-5 md:mb-0 flex flex-col items-start">
              <p className="text-4xl md:text-7xl font-extrabold mt-8">
                Fire Up <br /> The{" "}
                <span className="bg-gradient-to-r from-[#FF6402] to-[#FFA100] bg-clip-text text-transparent">
                  Deals
                </span>
              </p>
              <p className="mt-8 font-medium text-sm">
                Exclusive Offers You Can't Resist—Shop Now and Save Big!
              </p>
              <button className="mt-8 text-lg px-4 md:px-11 py-2 bg-[#FF9600] hover:bg-[#FF7F02] hover:underline font-bold text-white rounded-full">
                Shop Now
              </button>
            </div>

            <div>
              <Carousel />
            </div>
          </div>

          <div className=" mt-8 mb-3">
          <p className="text-2xl  font-semibold">
            Explore Our Popular Categories
          </p>
        </div>

        
        <div className=" grid gap-2  grid-cols-7 lg:grid-cols-10 shadow-md p-2 mb-4">
          {/* First Row */}

          {/* First Column - 40% width */}
          <div className="col-span-3 lg:col-span-4 bg-[rgba(0,95,115,0.4)] bg-opacity-30">
            <div className="text-[#676767] p-2 md:p-3">
              <p className="mb-0 text-sm md:text-base lg:text-lg">
                Home & Livings
              </p>
              <p className="text-base md:text-xl lg:text-2xl font-bold mt-[-4px] md:mt-[-7px]">
                Kitchen Essentials
              </p>
            </div>
            <br />
            <div className="w-full flex justify-end">
              <img
                src="/component/pot.png"
                alt="Item 2"
                className="object-cover"
              />
            </div>
          </div>

          {/* Second Column - 20% width */}
          <div className="col-span-2 bg-[#DC4E8A] bg-opacity-30">
            <div className="text-[#676767] p-2 md:p-3">
              <p className="text-sm md:text-base lg:text-lg">Gadget</p>
              <p className="text-base md:text-xl lg:text-2xl font-bold mt-[-4px] md:mt-[-7px]">
                Headset
              </p>
            </div>
            <div className="w-full flex justify-center">
              <img
                src="/component/compressed_e0b445dfb8100f071ebaacc87b467dfd-removebg-preview.png"
                alt="Item 2"
                className="object-cover"
              />
            </div>
          </div>

          {/* Third Column - 20% width */}
          <div className="col-span-2 bg-[#93D2BD] bg-opacity-30 flex flex-col justify-between h-full">
            <div className="w-full flex justify-center items-center">
              <img
                src="/component/shoe1.png"
                alt="Item 2"
                className="my-6 object-cover"
              />
            </div>
            <div className="text-[#676767] p-2 md:p-3 self-start">
              <p className="text-sm md:text-base lg:text-lg">Men</p>
              <p className="text-base md:text-xl lg:text-2xl font-bold mt-[-4px] md:mt-[-7px]">
                Sneaker
              </p>
            </div>
          </div>

          {/* Fourth Column - 20% width */}
          <div className="col-span-2 bg-[#FEF9C4] bg-opacity-80">
            <div className="text-[#676767] p-2 md:p-3">
              <p className="text-sm md:text-base lg:text-lg">Kids</p>
              <p className="text-base md:text-xl lg:text-2xl font-bold mt-[-4px] md:mt-[-7px]">
                Toys
              </p>
            </div>
            <div className="w-full flex justify-center">
              <img
                src="/component/toy.png"
                alt="Item 2"
                className="object-cover"
              />
            </div>
          </div>

          {/* Second Row */}

          {/* First Column - 20% width */}
          <div className="col-span-2 bg-[#CA6702] bg-opacity-30">
            <div className="w-full flex justify-center">
              <img
                src="/component/Bag.png"
                alt="Item 2"
                className="mt-5 object-cover"
              />
            </div>
            <div className="text-[#676767] p-2">
              <p className="text-sm md:text-base lg:text-lg flex justify-end">
                Women
              </p>
              <p className="text-base md:text-xl lg:text-2xl font-bold flex justify-end ">
                Luxury Bag
              </p>
            </div>
          </div>

          {/* Second Column - 30% width */}
          <div className="col-span-3 bg-[#E5743C] bg-opacity-50">
            <div className="text-[#676767] p-2 md:p-3">
              <p className="text-sm md:text-base lg:text-lg">Beauty</p>
              <p className="text-base md:text-xl lg:text-2xl font-bold mt-[-4px] md:mt-[-7px]">
                Luxury Perfumes
              </p>
            </div>
            <div className="w-full flex justify-center">
              <img
                src="/component/360_F_603389392_zrDAzdlTpoeGKLTSYXX0jbpBSLff4gq8-removebg-preview.png"
                alt="Item 2"
                className="object-cover"
              />
            </div>
          </div>

          {/* Third Column - 50% width */}
          <div className="col-span-7 lg:col-span-5 bg-[#9FFDFF] bg-opacity-70">
            <div className="text-[#676767] p-2 md:p-3">
              <p className="text-sm md:text-base lg:text-lg justify-center flex">
                Home & Living
              </p>
              <p className="text-base md:text-xl lg:text-2xl font-bold mt-[-4px] md:mt-[-7px] justify-center flex">
                Home Decoration
              </p>
            </div>
            <div className="w-full flex justify-center">
              <img
                src="/component/360_F_605366035_66Q1dSndzGiSefoUtxOqD42haBIvTyw8-removebg-preview.png"
                alt="Item 2"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className=" ">
                {/* Display products grouped by category */}
          {products.map((product) => (
            <div key={product} className="mb-5">
              <div className="mt-8 mb-3">
                <p className="text-lg md:text-xl lg:text-2xl font-medium">
                  {product.category} {/* Use the category name directly from the product data */}
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
                {product.products.map((product) => (
                  <div
                    key={product.id}
                    className="relative border rounded overflow-hidden shadow"
                  >
                    <Link
                      to={{
                        pathname: "/singleProduct",
                      }}
                      state={{ product }}
                    >
                      <img
                        src={`https://admin.trendy.pandapos.software/public/storage/product/${product.image}`}
                        alt={product.title}
                        className="w-full h-auto object-cover"
                      />
                    </Link>

                    <div className="absolute bottom-0 w-full bg-opacity-60 bg-gray-200 p-1">
                      <a
                        className="font-medium text-xs md:text-sm my-2 hover:underline truncate w-full"
                        title={product.title}
                      >
                        {product.title}
                      </a>

                      <div className="flex justify-between">
                        <div>
                          <p className="col-span-1 md:text-lg font-bold">
                            {product.price}
                          </p>
                          <p className="col-span-1 text-red-700 font-medium text-xs md:text-sm line-through">
                            {product.oldPrice}
                          </p>
                        </div>

                        <Link
                          to={{
                            pathname: "/singleProduct",
                          }}
                          state={{ product }}
                          className="mt-auto ms-auto"
                        >
                          <button className="px-2 py-1 text-xs md:text-sm hover:bg-gradient-to-t from-[#63241f] via-[#ce352a] to-[#d15c4a] bg-[#82251F] border-[#82251F] text-white rounded-sm transform transition-transform duration-300 ease-in-out hover:scale-105">
                            Buy Now
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center">
                <button className="mt-5 text-sm md:text-base font-medium hover:underline hover:text-gray-700">
                  See More
                </button>
              </div>
            </div>
          ))}
              </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
