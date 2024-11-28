import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Count from "../../Component/Frontend/Count";
import SocialMedia from "../../Component/Frontend/SocialMedia";
import Navbar from "../../Component/Frontend/Navbar";
import Footer from "../../Component/Frontend/Footer";

const Singleproduct = () => {

   const [products, setProducts] = useState([]);
   const [CategoryProducts, setCategoryProducts] = useState([]);


   useEffect(() => {
    const storedProducts = localStorage.getItem('allProducts');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
      
    }
  }, []);

  useEffect(() => {
    console.log('Updated products state:', products);
  }, [products]);
   

  const location = useLocation();
  const { product } = location.state || {};
  if (!product) {
    return <p>Product not found</p>;
  }

  useEffect(() => {
    if (product) {
      const filtered = products.filter(
        (p) => p.category_id === product.category_id
      );
      setCategoryProducts(filtered);
    }
  }, [products, product]);




  console.log(CategoryProducts);

  const [mainImage, setMainImage] = useState("/assets/Images/bride-5.png");
  const thumbnails = ["bride-6.png", "bride-7.png", "bride-8.png"];

  // const product = {
  //   name: "EMERALD ROSE",
  //   description:
  //     "Minimalistic, sophisticated color combinations will give you an elegant look with this intricate piece. Very quality full stone work and fine jardosi is the main work pattern for this one with bit of self color sequence .",
  //   price: "9750 BDT",
  //   details: {
  //     color: "Green",
  //     fabric: "Maslin",
  //     kamiz: "Maslin",
  //     dupatta: "Maslin",
  //     inner: "Silk",
  //     pant: "Silk",
  //   },
  // };

  const [showModal, setShowModal] = useState(false);
  const handleAddToCart = () => setShowModal(true);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for the cart modal

  const closeModal = () => setShowModal(false);
  const closeCart = () => setIsModalOpen(false);

  const handleButtonClick = () => setPopupVisible(true);
  const handleClosePopup = () => setPopupVisible(false);
  const handleViewCart = () => setIsModalOpen(true); // Open cart modal

  // Close cart modal

  const [count, setCount] = useState(1); // Initial count value

  const handleCountChange = (newCount) => {
    setCount(newCount); // Update count in the Order component
  };

  return (
    <div>
    <Navbar/>
    <div className="container mx-auto flex">
        <SocialMedia />
        <div className="w-[90%] mx-auto">
          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Image Section */}
            <div className="text-center">
              <img
                src={`https://expressitplus.co.uk/public/storage/product/${product.image}`}
                alt={product.name}
                className="max-h-[560px] w-[90%] transition-transform duration-300 ease-in-out hover:scale-105 mx-auto object-cover"
              />
              <div className="mt-5 grid grid-cols-3 gap-4">
                {thumbnails.map((src, idx) => (
                  <img
                    key={idx}
                    src={`/assets/Images/${src}`}
                    alt={`Dress Thumbnail ${idx + 1}`}
                    className="max-h-[200px] w-full object-cover transition-transform duration-300 ease-in-out hover:scale-110 hover:shadow-lg cursor-pointer"
                    onClick={() => setMainImage(`Images/${src}`)} // Change main image on click
                  />
                ))}
              </div>
            </div>
            {/* Product Info */}
            <div className="mt-1">
              <p className="text-xl font-semibold md:text-2xl">
                {product.name}
              </p>
              <div className="mt-4">
                <p className="font-semibold text-lg md:text-xl">
                  Price - {product.price}
                </p>
                <p className="py-2 text-justify text-sm md:text-base">
                  {product.short_desc}
                </p>
              </div>
              {/* <div className="mt-4">
                {Object.entries(product.details).map(([key, value]) => (
                  <p key={key} className="mb-1 md:text-lg text-base">
                    {key.charAt(0).toUpperCase() + key.slice(1)} - {value}
                  </p>
                ))}
              </div> */}
              {/* Buttons */}
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
                <button
                  className="inline-flex justify-center text-nowrap items-center w-full sm:w-auto px-5 py-2 text-sm md:text-base bg-transparent border border-teal-700 text-teal-700 rounded-lg font-semibold hover:bg-teal-700 hover:text-white transition-colors duration-300 ease-in-out hover:scale-105 hover:shadow-2xl shadow"
                  onClick={handleAddToCart}
                >
                  <i className="fas fa-shopping-cart mr-2 "></i>Add To Cart
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
                          className="px-4 py-2  text-xs md:text-sm bg-teal-700 text-white rounded hover:bg-teal-600 text-nowrap"
                          onClick={() => {
                            closeModal(); // Close the modal
                            handleViewCart(); // Open the cart
                          }}
                        >
                          View Cart
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <Link to="/order">
                  <button className="inline-flex justify-center items-center w-full text-nowrap sm:w-auto px-8 py-2 text-sm md:text-base bg-gradient-to-r from-teal-500 to-teal-700 border border-teal-200 text-white font-semibold rounded-lg transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
                    <i className="fas fa-shopping-bag mr-2"></i>Buy Now
                  </button>
                </Link>

                <button
                  className="inline-flex text-nowrap justify-center items-center w-full sm:w-auto text-sm md:text-base hover:underline"
                  onClick={handleButtonClick}
                >
                  <img
                    src="/assets/Images/measuring-tape.svg"
                    alt="Measuring Tape"
                    className="w-5 h-5 mr-2 "
                  />
                  Size Guide
                </button>

                {/* Size Chart Popup */}
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

              <div className="mt-6">
                <p className="py-2 text-justify text-sm md:text-base ">
                <span className="font-semibold"> Care : </span>  Dry Clean Only Preserve: in air tight poly.{" "}
                </p>
              </div>
              <div className="">
                <p className="py-2 text-justify text-sm md:text-base">
                 <span className="font-semibold"> Disclaimer:</span> Product colour may slightly vary due to
                  photographic lighting sources or your monitor setting. Lace
                  and/or Embellishments and Fabric or Material may vary
                  depending on availability.
                </p>{" "}
              </div>
            </div>
          </div>

          <div className="text-xl md:text-2xl mt-6 font-semibold">
            <p>You May Also Like</p>
          </div>
          {/* Client Images */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4 justify-items-center">
            <div className="mb-2">
              <Link to="/singleProduct">
                <img
                  src="/assets/Images/Bride-2.png"
                  alt="Client wearing bridal attire 1"
                  className="w-full h-auto transition-transform duration-300 ease-in-out hover:scale-105"
                />
              </Link>
            </div>
            <div className="mb-2">
              <Link to="/singleProduct">
                <img
                  src="/assets/Images/Bride-3.png"
                  alt="Client wearing bridal attire 2"
                  className="w-full h-auto transition-transform duration-300 ease-in-out hover:scale-105"
                />
              </Link>
            </div>
            <div className="mb-2">
              <Link to="/singleProduct">
                <img
                  src="/assets/Images/bride-4.png"
                  alt="Client wearing bridal attire 3"
                  className="w-full h-auto transition-transform duration-300 ease-in-out hover:scale-105"
                />
              </Link>
            </div>
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

        {/* Cart Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end items-start z-50 overflow-y-auto">
            <div className="bg-white w-full sm:w-[400px] p-6 rounded-sm    ">
              <div className="flex justify-between">
                <h3 className="text-base md:text-lg font-bold">
                  Shopping Cart
                </h3>
                <button
                  className="fas fa-close text-base md:text-xl hover:text-gray-500"
                  onClick={closeCart}
                ></button>
              </div>
              <p className="mt-3 text-sm md:text-base">
                Only $714.00 away from Free Shipping
              </p>

              <div className="flex items-start mt-4">
                <img
                  src="/assets/Images/Rectangle 41 (1).png"
                  alt="Product"
                  className="w-24 h-24 mr-4 sm:w-32 sm:h-28"
                />
                <div className="flex flex-col justify-between text-xs md:text-sm">
                  <span className="block font-semibold">
                    (Product 1) Sample - Clothing And Accessory Boutiques For
                    Sale
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

              <div className="flex items-start mt-4 mb-8">
                <img
                  src="/assets/Images/Rectangle 41 (1).png"
                  alt="Product"
                  className="w-24 h-24 mr-4 sm:w-32 sm:h-28"
                />
                <div className="flex flex-col justify-between text-xs md:text-sm">
                  <span className="block font-semibold">
                    (Product 2) Sample - Clothing And Accessory Boutiques For
                    Sale
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
              <div className="flex justify-between font-medium  text-sm md:text-base">
                <p>Subtotal:</p>
                <p>$180</p>
              </div>
              <div className="flex justify-between font-medium text-sm md:text-base">
                <p>Total:</p>
                <p>$180</p>
              </div>

              <div className="flex justify-center mt-6 md:mt-9 md:mb-3 text-sm md:text-base">
                <Link to="/order">
                  <button className="px-12 py-1 md:px-16 md:py-2 text-nowrap text-white bg-gradient-to-b from-teal-500 to-teal-700 rounded-md hover:scale-105">
                    Check Out
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    <Footer/>
  </div>
  );
};

export default Singleproduct;
