import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../Component/Frontend/Navbar";
import Footer from "../../Component/Frontend/Footer";

const SocialMediaButtons = () => {
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButtons(true);
    }, 2000); // Show buttons after 2 seconds

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, []);

  return (
    <>
      {showButtons && (
        <div className="fixed top-1/2 right-0 transform -translate-y-1/2 flex flex-col px-2 text-sm md:text-base">
          <a
            href="https://www.facebook.com/attireidyllbd/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="w-full pl-3 py-1 bg-blue-600 text-white hover:bg-blue-700 transition-colors hover:scale-105 duration-300 ease-in-out">
              <i className="fab fa-facebook-f mr-3"></i> {/* Facebook Icon */}
            </button>
          </a>
          <a
            href="https://www.instagram.com/attire_idyll/channel/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="w-full pl-2 py-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:scale-105 transition-transform duration-300 ease-in-out">
              <i className="fab fa-instagram mr-2"></i> {/* Instagram Icon */}
            </button>
          </a>
        </div>
      )}
    </>
  );
};

const PreOrder = () => {
  const [mainImage, setMainImage] = useState("/assets/Images/bride-5.png");
  const thumbnails = ["bride-6.png", "bride-7.png", "bride-8.png"];

  const product = {
    name: "EMERALD ROSE",
    description:
      "Minimalistic, sophisticated color combinations will give you an elegant look with this intricate piece. Very quality full stone work and fine jardosi is the main work pattern for this one with bit of self color sequence .",
    price: "9750 BDT",
    details: {
      color: "Green",
      fabric: "Maslin",
      kamiz: "Maslin",
      dupatta: "Maslin",
      inner: "Silk",
      pant: "Silk",
    },
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto flex">
        <div className="w-[90%] mx-auto">
          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Image Section */}
            <div className="text-center">
              <img
                src={mainImage}
                alt="Dress Picture"
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
                  {product.description}
                </p>
              </div>
              <div className="mt-4">
                {Object.entries(product.details).map(([key, value]) => (
                  <p key={key} className="mb-1 md:text-lg text-base">
                    {key.charAt(0).toUpperCase() + key.slice(1)} - {value}
                  </p>
                ))}
              </div>
              <div className="">
                <img src="/Images/Chart-Woman.jpg" alt="" className="w-[80%]" />
              </div>

              {/* Buttons */}
              <div className="mt-8">
                <a
                  href="https://wa.me/01632460342"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="flex items-center justify-center  px-16 md:px-24 py-1 md:py-2 border border-gray-900 hover:border-green-700 text-sm text-nowrap md:text-lg hover:text-white rounded-lg hover:bg-green-700 transition-colors hover:scale-105 duration-300 ease-in-out group hover:shadow-xl">
                    <i className=" fab fa-whatsapp text-xl text-green-500 mr-2 group-hover:text-white"></i>
                    Chat Now{" "}
                  </button>
                </a>
              </div>

              <div className="mt-6">
                <p className="py-2 text-justify text-sm md:text-base">
                  Care: Dry Clean Only Preserve: in air tight poly.{" "}
                </p>
              </div>
              <div className="">
                <p className="py-2 text-justify text-sm md:text-base">
                  Disclaimer: Product colour may slightly vary due to
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
              className=" px-7 py-1 text-sm md:text-base border hover:bg-teal-700 hover:text-white hover:border-teal-700 border-gray-800 rounded"
            >
              View More
            </Link>
          </div>
        </div>
        <SocialMediaButtons />
      </div>
      <Footer />
    </div>
  );
};

export default PreOrder;
