import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AddToCart = ({ onClose }) => {
  const [products, setProducts] = useState([]); // State to store the product

  // Fetch products from localStorage when the component mounts
  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts)); // Set state with parsed JSON
    }
  }, []);

  // Function to handle product removal
  const handleRemoveProduct = (productId) => {
    const updatedProducts = products.filter(product => product.id !== productId);
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts)); // Update localStorage
  };

  // Calculate subtotal and total
  const subtotal = products.reduce((total, product) => total + product.price, 0);
  const total = subtotal; // Additional costs can be added if needed

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end items-start z-50 overflow-y-auto">
      <div className="bg-white w-full sm:w-[400px] p-6 rounded-sm">
        <div className="flex justify-between items-center">
          <h3 className="text-base md:text-lg font-bold">Shopping Cart</h3>
          <button
            className="fas fa-close text-base md:text-xl hover:text-gray-500"
            onClick={onClose} // Close the modal on clicking this button
            aria-label="Close"
          >
          </button>
        </div>
        <p className="mt-3 text-sm md:text-base">
          Only $714.00 away from Free Shipping
        </p>

        {/* Product List */}
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="relative flex items-start mt-4">
              <img
                src={`https://admin.attireidyll.com/public/storage/product/${product.image}`} 
                alt={product.title}
                className="w-24 h-24 mr-4 sm:w-32 sm:h-28"
              />
              <div className="flex flex-col justify-between text-xs md:text-sm">
                <span className="block font-semibold">{product.title}</span>
                {/* <span>{product.color} / {product.size}</span> */}
                <span className="font-semibold ">{product.name} x {product.count}</span>

                <span className="font-semibold">৳{product.price}</span>
              </div>
              {/* Close button */}
              <button 
                className="absolute top-0 right-0 text-gray-500 hover:text-gray-800 focus:outline-none"
                onClick={() => handleRemoveProduct(product.id)}
                aria-label="Remove product"
              >
                &times;
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-sm mt-4">Your cart is empty.</p>
        )}

        <div className="border-t border-gray-300 mt-4 mb-4"></div>
        <div className="flex justify-between font-medium text-sm md:text-base">
          <p>Subtotal:</p>
          <p>৳{subtotal.toFixed(2)}</p> {/* Format subtotal */}
        </div>

        <div className="flex justify-between font-medium text-sm md:text-base">
          <p>Total:</p>
          <p>৳{total.toFixed(2)}</p> {/* Format total */}
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
  );
};

export default AddToCart;
