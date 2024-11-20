import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "../Component/Frontend/Header";
import Footer from "../Component/Frontend/Footer.Jsx";
import AddToCart from "../Component/Frontend/AddToCart";
import axios from "axios";

const SingleProduct = () => {
  const [products, setProducts] = useState([]);

  const location = useLocation();
  const { product } = location.state || {}; // Get the product passed from ProductsPage
  if (!product) {
    return <p>Product not found</p>;
  }

  // console.log(product);

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
        "https://expressitplus.co.uk/api/all/product/get"
      );

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

  const filterProductsByCategory = (data, categoryId) => {
    const category = data.find((cat) => cat.category_id === categoryId);
    return category ? category.products : [];
  };

  // Example usage:
  const CategoryProducts = filterProductsByCategory(
    products,
    product.category_id
  );
  console.log(CategoryProducts);



  //count starts
  const [count, setCount] = useState(1);

  const increment = () => setCount(count + 1);

  const decrement = () => {
    if (count > 1) setCount(count - 1);
  };
  
  //count ends

  

  const handleCart = () => {
    const existingProducts = JSON.parse(localStorage.getItem("products")) || [];

    // Check if product already exists in cart
    const productIndex = existingProducts.findIndex(
      (item) => item.id === product.id
    );

    if (productIndex >= 0) {
      // If the product is already in cart, update the quantity
      existingProducts[productIndex].count += count;
    } else {
      // Add the new product with quantity
      existingProducts.push({ ...product, count });
    }

    localStorage.setItem("products", JSON.stringify(existingProducts));
  };

  
  // Assuming product_variation is part of the product object
  const variations = product.product_variation;

  const [activeSection, setActiveSection] = useState("description");

  // State to manage the modal visibility
  const [showModal, setShowModal] = useState(false);
  const handleAddToCart = () => setShowModal(true);
  const [isPopupVisible, setPopupVisible] = useState(false);

  const closeModal = () => setShowModal(false);

  const handleButtonClick = () => setPopupVisible(true);
  const handleClosePopup = () => setPopupVisible(false);

  const [isModalOpen, setIsModalOpen] = useState(false); // State to handle modal visibility

  const handleViewCart = () => {
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseCart = () => {
    setIsModalOpen(false); // Close the modal
  };

  const [rating, setRating] = useState(0); // State to hold the selected rating
  const [hover, setHover] = useState(0); // State to hold the hovered rating

  return (
    <div>
      <Header />

      <div className="container mx-auto flex">
        <div className="w-[90%] mx-auto">
          <div className="mt-4">
            <ul className="text-xs md:text-sm flex space-x-2  ">
              <li className="hover:text-blue-800 list-none">
                <a href="/home">Home</a>
              </li>
              <li className="list-none">/</li>
              <li className="hover:text-blue-800 list-none">
                <a href="#">New In</a>
              </li>
              <li className="list-none">/</li>
              <li className="hover:text-blue-800 list-none">
                <a href="#">
                  (Product 1) Sample - Clothing And Accessory Boutiques For Sale
                </a>
              </li>
            </ul>
          </div>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Image Section */}
            <div className="">
              <img
                src={`https://expressitplus.co.uk/public/storage/product/${product.image}`}
                alt={product.name}
                className=" w-[450px] h-[500px]"
              />
            </div>
            {/* Product Info */}
            <div className="">
              <p className="text-base font-semibold md:text-lg">
                {product.name}
              </p>
              <div className="flex mt-2 space-x-4">
                <div
                  className="flex items-center space-x-1 text-xs md:text-sm cursor-pointer"
                  onMouseLeave={() => setHover(0)} // Reset hover when mouse leaves
                >
                  {[...Array(5)].map((_, index) => {
                    const starIndex = index + 1; // Star index (1 to 5)
                    return (
                      <i
                        key={index}
                        className={`fas fa-star ${
                          starIndex <= (hover || rating)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        } hover:scale-125`}
                        onClick={() => setRating(starIndex)} // Set rating on click
                        onMouseEnter={() => setHover(starIndex)} // Set hover rating
                      ></i>
                    );
                  })}
                </div>
                <div className="text-xs md:text-sm ">
                  <p>
                    ({rating} Review{rating !== 1 ? "s" : ""})
                  </p>
                </div>
              </div>

              <div className="mt-2">
                <p className="py-2 text-justify text-xs md:text-sm">
                  {product.description}
                </p>

                <div className="mt-2"></div>
                <p className="font-bold text-lg md:text-xl mt-4"></p>
              </div>

              {/* Variations */}
              <div className="mt-4">
                {variations.map((variation) => (
                  <div key={variation.id} className="mb-3 flex space-x-2">
                    <p className="text-sm md:text-base mr-6">
                      {variation.variation.name}:
                    </p>
                    {variation.variaton_values
                      .split(",")
                      .map((value, index) => (
                        <button key={index} className="rounded border px-4">
                          {value.trim()}
                        </button>
                      ))}
                  </div>
                ))}
              </div>

              <div className="flex space-x-3 mt-4  items-center  ">
                <p className="text-sm md:text-base ">Quantity:</p>
                <div className="flex items-center ">
                  <button
                    onClick={decrement}
                    className="size-8 md:text-lg font-semibold bg-black text-white hover:bg-gray-800"
                  >
                    -
                  </button>
                  <span className="text-sm md:text-base pt-1 text-center border border-black size-8 font-medium">
                    {count}
                  </span>
                  <button
                    onClick={increment}
                    className="size-8 md:text-lg font-semibold bg-black text-white hover:bg-gray-800"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-6">
                {/* Size Guide Button */}
                <button
                  onClick={handleButtonClick}
                  className="inline-flex text-nowrap justify-center items-center w-full sm:w-auto text-sm md:text-base hover:underline"
                >
                  <img
                    src="/component/measuring-tape.svg"
                    alt="Measuring Tape"
                    className="w-5 h-5 mr-2"
                  />
                  Size Guide
                </button>

                {isPopupVisible && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg p-4 shadow-lg w-full max-w-lg relative">
                      <button
                        className="absolute top-2 right-5 text-lg text-gray-800 hover:text-gray-500"
                        onClick={handleClosePopup}
                      >
                        <i className="fas fa-times"></i>
                      </button>
                      <h2 className="text-lg font-bold mb-4">Size Guide</h2>
                      <div className="overflow-x-auto">
                        <table className="min-w-full">
                          <thead>
                            <tr className="bg-gray-100">
                              <th className="border border-gray-300 p-2">
                                Size
                              </th>
                              <th className="border border-gray-300 p-2">
                                Bust (inches)
                              </th>
                              <th className="border border-gray-300 p-2">
                                Waist (inches)
                              </th>
                              <th className="border border-gray-300 p-2">
                                Hip (inches)
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="border border-gray-300 p-2">S</td>
                              <td className="border border-gray-300 p-2">
                                32-34
                              </td>
                              <td className="border border-gray-300 p-2">
                                26-28
                              </td>
                              <td className="border border-gray-300 p-2">
                                36-38
                              </td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 p-2">M</td>
                              <td className="border border-gray-300 p-2">
                                34-36
                              </td>
                              <td className="border border-gray-300 p-2">
                                28-30
                              </td>
                              <td className="border border-gray-300 p-2">
                                38-40
                              </td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 p-2">L</td>
                              <td className="border border-gray-300 p-2">
                                36-38
                              </td>
                              <td className="border border-gray-300 p-2">
                                30-32
                              </td>
                              <td className="border border-gray-300 p-2">
                                40-42
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-4">
                <button
                  className="inline-flex justify-center text-nowrap items-center w-full sm:w-auto px-5 py-2 text-sm md:text-base bg-transparent border border-[#82251F] text-[#82251F] rounded-lg font-semibold hover:bg-[#82251F] hover:text-white transition-colors duration-300 ease-in-out hover:scale-105 "
                  onClick={() => {
                    handleAddToCart(); // Close the modal
                    handleCart(product);
                  }}
                >
                  <i className="fas fa-shopping-cart mr-2"></i>Add To Cart
                </button>
                {/* Modal for Add to Cart Confirmation */}
                {showModal && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-y-auto">
                    <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg mx-4 sm:mx-0 sm:my-8">
                      <h2 className="text-base md:text-lg font-bold text-center flex justify-center items-center">
                        Your item has been successfully added to the cart!
                        <span className="ml-2 inline-flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-green-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </span>
                      </h2>
                      <div className="flex  justify-around mt-4 ">
                        <button
                          className="px-4  text-sm md:text-base font-medium hover:underline text-nowrap"
                          onClick={closeModal}
                        >
                          Continue Shopping
                        </button>
                        <button
                          className="px-4 py-2 text-xs md:text-sm bg-teal-700 text-white rounded hover:bg-teal-600"
                          onClick={handleViewCart} // When clicked, open the modal
                        >
                          View Cart
                        </button>
                        {isModalOpen && <AddToCart onClose={handleCloseCart} />}{" "}
                      </div>
                    </div>
                  </div>
                )}

                <Link to="/order" onClick={handleCart}>
                  <button className="buy-button inline-flex justify-center items-center w-full text-nowrap sm:w-auto px-8 py-2 text-sm md:text-base bg-[#82251F] border-[#82251F] text-white font-semibold rounded-lg hover:bg-gradient-to-t from-[#58221e] via-[#94241c] to-[#ca5340] transform transition-transform duration-300 ease-in-out hover:scale-105">
                    <i className="fas fa-shopping-bag mr-2"></i> Buy Now
                  </button>
                </Link>
              </div>

              <div className="mt-6 flex space-x-3">
                <div>
                  <i className="fas fa-truck"></i>
                </div>
                <div>
                  <p className="text-sm md:text-base">
                    {" "}
                    Free Shipping <br />{" "}
                    <span className="text-xs md:text-sm">
                      {" "}
                      Free standard shipping on orders over $99 Estimated to be
                      delivered on 12/01/2022 - 15/10/2022
                    </span>
                  </p>
                </div>
              </div>

              <div className="mt-2 flex space-x-3">
                <div>
                  <i className="fas fa-reply"></i>
                </div>
                <div>
                  <p className="text-sm md:text-base">
                    Return Policy <br />{" "}
                    <button className="text-xs md:text-sm hover:underline">
                      {" "}
                      Learn More{" "}
                    </button>
                  </p>
                </div>
              </div>

              <div className="mt-2 flex space-x-3">
                <div>
                  <i className="ml-1 fas fa-file-alt"></i>
                </div>
                <div>
                  <p className="text-sm md:text-base">
                    Title <br />{" "}
                    <button className="text-xs md:text-sm hover:underline">
                      {" "}
                      Learn More{" "}
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-lg md:text-xl mt-8 mb-3 font-semibold">
            <p>Pairs Well With</p>
          </div>

          <div className=" mb-5">
            <div className="grid sm:grid-cols-2  md:grid-cols-4 lg:grid-cols-5 gap-5 ">
              {CategoryProducts.filter((item) => item.id !== product.id) // Exclude the selected product
                .map((product) => (
                  <div
                    key={product.id}
                    className="relative border rounded-lg overflow-hidden shadow"
                  >
                    <Link
                      to={{
                        pathname: "/singleProduct",
                      }}
                      state={{ product }}
                    >
                      <img
                        src={`https://expressitplus.co.uk/public/storage/product/${product.image}`}
                        alt={product.title}
                        className="w-[400px] h-[300px] object-cover"
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
                          {product.oldPrice && ( // Conditionally render oldPrice if it exists
                            <p className="col-span-1 text-red-700 font-medium text-xs md:text-sm line-through">
                              {product.oldPrice}
                            </p>
                          )}
                        </div>
                        <Link
                          to={{
                            pathname: "/singleProduct",
                            state: { product }, // Pass the product object to the SingleProduct page
                          }}
                          className="mt-auto ms-auto"
                        >
                          <button className="text-nowrap px-2 py-1 text-xs md:text-sm hover:bg-gradient-to-t from-[#63241f] via-[#ce352a] to-[#d15c4a] bg-[#82251F] border-[#82251F] text-white rounded-sm transform transition-transform duration-300 ease-in-out hover:scale-105">
                            Buy Now
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className="flex justify-center">
              <button className="my-5 text-sm md:text-base hover:underline font-medium">
                See More
              </button>
            </div>
          </div>

          <hr className="border" />
          <div className="text-lg md:text-xl my-3 text-center font-semibold">
            <p>Related Pruducts</p>
          </div>
          <hr className="mb-6 border" />

          <div className=" mb-5">
            <div className="grid sm:grid-cols-2  md:grid-cols-4 lg:grid-cols-5 gap-5 ">
              {CategoryProducts.filter((item) => item.id !== product.id) // Exclude the selected product
                .map((product) => (
                  <div
                    key={product.id}
                    className="relative border rounded-lg overflow-hidden shadow"
                  >
                    <Link
                      to={{
                        pathname: "/singleProduct",
                      }}
                      state={{ product }}
                    >
                      <img
                        src={`https://expressitplus.co.uk/public/storage/product/${product.image}`}
                        alt={product.title}
                        className="w-[400px] h-[300px] object-cover"
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
                          {product.oldPrice && ( // Conditionally render oldPrice if it exists
                            <p className="col-span-1 text-red-700 font-medium text-xs md:text-sm line-through">
                              {product.oldPrice}
                            </p>
                          )}
                        </div>
                        <Link
                          to={{
                            pathname: "/singleProduct",
                            state: { product }, // Pass the product object to the SingleProduct page
                          }}
                          className="mt-auto ms-auto"
                        >
                          <button className="text-nowrap px-2 py-1 text-xs md:text-sm hover:bg-gradient-to-t from-[#63241f] via-[#ce352a] to-[#d15c4a] bg-[#82251F] border-[#82251F] text-white rounded-sm transform transition-transform duration-300 ease-in-out hover:scale-105">
                            Buy Now
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className="flex justify-center">
              <button className="mt-5 text-sm md:text-base hover:underline font-medium">
                See More
              </button>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex flex-wrap justify-between  space-x-2">
              {[
                { name: "Description", section: "description" },
                { name: "Additional Info", section: "add_info" },
                { name: "Shipping & Return", section: "shipping" },
                { name: "Custom Tab", section: "tab" },
                { name: "Review", section: "review" },
              ].map((item) => (
                <button
                  key={item.section}
                  className={`flex items-center text-sm md:text-lg px-3 py-2 font-medium hover:bg-gray-100 hover:text-gray-600 transition duration-200 ease-in-out ${
                    activeSection === item.section ? "bg-gray-200" : ""
                  }`}
                  onClick={() => setActiveSection(item.section)}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          <hr className="mb-4 border" />

          <div className="mb-5 text-justify text-sm md:text-base overflow-hidden  h-[200px] md:h-[150px]">
            {activeSection === "description" && (
              <p className="description">
                The product is crafted from premium materials, ensuring both
                durability and comfort. Available in various colors and sizes,
                it showcases a modern design that complements any lifestyle.
                Whether for everyday use or special occasions, this versatile
                product is built to meet your needs and comes with a one-year
                warranty for added peace of mind.
              </p>
            )}
            {activeSection === "add_info" && (
              <p className="add_info">
                This product measures 1.5 ft and weighs approximately 1.5 lbs.
                It is made from 100% cotton, making it both soft and breathable.
                For care, it is recommended to machine wash cold and tumble dry
                low to maintain its quality.
              </p>
            )}
            {activeSection === "shipping" && (
              <p className="shipping">
                We provide free shipping on orders over $50, with standard
                delivery times ranging from 5 to 7 business days. For those
                needing their items sooner, express shipping options are
                available. If you’re not entirely satisfied with your purchase,
                you can return it within 30 days for a full refund, ensuring a
                worry-free shopping experience.
              </p>
            )}
            {activeSection === "tab" && (
              <p className="tab">
                In this section, you can explore various customization options
                for your product, such as personalized engraving or unique color
                combinations. For more details on customization and
                personalization, please contact our customer service team, who
                will be happy to assist you.
              </p>
            )}
            {activeSection === "review" && (
              <p className="review">
                Customer feedback is invaluable to us! Currently, this product
                has an average rating of ★★★★☆ based on numerous reviews.
                Customers appreciate its comfort and stylish design, with
                comments like, “Great product! Very comfortable and stylish”
                from Jane D., and “I love the color options! Perfect for my
                needs” from John S. We encourage you to leave your own review to
                help others make informed decisions.
              </p>
            )}
          </div>
        </div>
      </div>
      {/* Cart Modal */}

      <Footer />
    </div>
  );
};

export default SingleProduct;
