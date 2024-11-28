import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../Component/Frontend/Navbar";
import Footer from "../../Component/Frontend/Footer";

const ThankYou = () => {
  const [fadeIn, setFadeIn] = useState(false);

  // Trigger fade-in animation after page loads
  useEffect(() => {
    setTimeout(() => setFadeIn(true), 200); // Delay to trigger fade-in effect
  }, []);

  return (
  <div>
    <Navbar/>
    <div className="flex flex-col justify-center items-center text-center px-4 py-20">
      <div
        className={` p-6  transition-opacity duration-1000 ease-in-out ${
          fadeIn ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Animated Thank You Text */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-teal-500 to-green-700 mb-4 animate-bounce">
          Thank You!
        </h1>

        {/* Animated Subtext */}
        <p className="text-sm md:text-base lg:text-lg text-gray-600 mb-8">
          Your order has been successfully placed
        </p>

        {/* Buttons with Hover Effects */}
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link to="/">
            <button className="w-full sm:w-auto px-6 py-2 text-sm md:text-base bg-gradient-to-r from-green-500 via-teal-500 to-green-700 text-white rounded-lg hover:bg-gradient-to-l hover:from-teal-400 hover:to-teal-600 transition duration-300 ease-in-out transform hover:scale-105">
              Back to Home
            </button>
          </Link>

          <Link to="/order">
            <button className="w-full sm:w-auto px-6 py-2 text-sm md:text-base border border-teal-500 text-teal-500 rounded-lg hover:bg-green-100 transition duration-300 ease-in-out transform hover:scale-105">
              View Orders
            </button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className=" text-nowrap text-gray-500 text-xs md:text-sm lg:text-base flex items-center justify-center space-x-2">
        <span>©2024</span>
        <a
          href=""
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal-800 hover:text-teal-500 text-lg  font-bold"
        >
        Attire Idyll
        </a>
        <span>All rights reserved.</span>
      </div>
    </div>
    <Footer/>
  </div>
  );
};

export default ThankYou;
