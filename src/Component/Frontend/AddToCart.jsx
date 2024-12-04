import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "./CartContext";
import { IoClose } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";

import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const AddToCart = ({ onClose }) => {
  const {
    cart,
   
    removeFromCart,
    updateCartItem,
    handleDecreaseQuantity,
    handleIncreaseQuantity,
  } = useContext(CartContext);
 
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-opacity-50"
      onClick={handleBackdropClick}
    >
      <div
        className=" relative flex ms-auto flex-col md:w-96 h-screen bg-white shadow-lg "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 flex absolute w-full justify-between items-center border-b bg-white shadow-md">
  {/* Cart Header with Icon */}
  <div className="flex items-center space-x-2">
    
    <span className="text-yellow-500 ">
      <i className="fas fa-shopping-cart text-lg md:text-2xl"></i>
    </span>
    <h2 className="text-sm md:text-lg font-semibold">Your Cart</h2>
  </div>

  {/* Close Button with Animation */}
  <button
    onClick={onClose}
    className="text-gray-600 hover:text-[#C43882] transition-transform duration-300 ease-in-out transform hover:scale-110"
  >
    <IoClose className="text-lg md:text-2xl" />
  </button>
</div>


        {/* Scrollable Product List */}
        <div className="flex-1 p-4 mt-12 md:mt-16 overflow-y-auto">
          <ul className="space-y-4">
            {cart.map((product) => (
              <li key={product.id} className="flex items-center space-x-6">
                <img
                  src={`https://admin.attireidyll.com/public/storage/product/${product.image}`}
                  alt={product.title}
                  className="size-14 md:size-20"
                />
                <div className="flex-1">
                  <p className="font-semibold text-gray-800 text-sm md:text-base">{product.name}</p>
                  
                  <p className="text-yellow-700 text-xs md:text-sm ">৳{product.price}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center mt-1">
                      <button
                        onClick={() => handleDecreaseQuantity(product.id)}
                        className="size-5 md:size-6 rounded-l-md px-3   text-xs md:text-sm  font-semibold bg-teal-700 text-white hover:bg-teal-600 flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="size-5 md:size-6 text-xs md:text-sm font-medium px-3 flex items-center justify-center border border-teal-700">
                      {product.quantity}
                      </span>
                      <button
                        onClick={() => handleIncreaseQuantity(product.id)}
                        className="size-5 md:size-6 rounded-r-md text-xs md:text-sm font-semibold  bg-teal-700 text-white hover:bg-teal-600 flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => removeFromCart(product.id)}
                    >
                      <RiDeleteBin6Line className="md:text-lg" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="border-t p-4 sticky bottom-0 bg-white shadow-lg">
          <div className="flex items-center justify-between">
            <p className="md:text-lg font-semibold">Subtotal:</p>
            <p className="md:text-lg font-semibold">
              ৳ {cart.reduce((acc, product) => acc + product.price, 0)}
            </p>
          </div>
          <Link
            onClick={onClose}
            to="/checkout"
            className="mt-4 text-center font-semibold py-2 md:py-3 rounded-md bg-gradient-to-r from-teal-500 to-teal-800 border border-teal-200 text-white flex gap-3 justify-center items-center shadow-lg text-sm md:text-lg"
          >
            Check Out
            <span className="animate-icon ">
              <MdKeyboardDoubleArrowRight  color="white" className="text-lg md:text-3xl"/>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AddToCart;
