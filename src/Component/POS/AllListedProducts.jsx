import React, { useState, useEffect } from "react";
import { FaTimesCircle, FaSearch, FaPlus, FaMinus } from "react-icons/fa";

const ProductList = ({
  filteredProducts,
  setAddedProducts,
  onIdChange,
  selectedCategoryId,
}) => {
  const [products] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedVariations, setSelectedVariations] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [keepAdding, setKeepAdding] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [currentStock, setCurrentStock] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [currentId, setCurrentId] = useState(0);
  // console.log(filteredProducts);
  // console.log(selectedCategoryId);
  // Filter products based on selectedCategoryId
  const displayProducts = selectedCategoryId
    ? filteredProducts.filter(
        (product) => product.category_id === selectedCategoryId
      )
    : filteredProducts;
  // console.log(displayProducts);
  useEffect(() => {
    // Re-filter products when selectedCategoryId changes
  }, [selectedCategoryId, filteredProducts]);

  const openModal = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setSelectedVariations({});

    if (product.product_variation.length === 0) {
      setCurrentPrice(product.price);
      setCurrentStock(product.stock);
    } else {
      const prices = product.variation_combinations.map(
        (variation) => variation.price
      );
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);

      setCurrentPrice(
        minPrice === maxPrice ? minPrice : `${minPrice} - ${maxPrice}`
      );
      setCurrentStock(0);
    }

    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  const handleAddProduct = () => {
    if (selectedProduct) {
      const selectedValues = Object.values(selectedVariations).join(",");

      // Check if the product has variations and if all variations are selected
      const hasAllVariations =
        selectedProduct.product_variation.length === 0 ||
        Object.keys(selectedVariations).length ===
          selectedProduct.product_variation.length;

      if (hasAllVariations) {
        const selectedValues = Object.values(selectedVariations).join(",");

        setAddedProducts((prevAddedProducts) => {
          // Find if the product with the same id and variations already exists
          const existingProductIndex = prevAddedProducts.findIndex(
            (product) =>
              product.id === selectedProduct.id &&
              product.variationValues === selectedValues
          );

          if (existingProductIndex !== -1) {
            // Update the existing product's quantity and total price
            const updatedProducts = [...prevAddedProducts];
            updatedProducts[existingProductIndex] = {
              ...updatedProducts[existingProductIndex],
              quantity:
                updatedProducts[existingProductIndex].quantity + quantity,
              totalPrice:
                updatedProducts[existingProductIndex].price *
                (updatedProducts[existingProductIndex].quantity + quantity),
            };
            return updatedProducts;
          }

          // Add the new product if it doesn't exist
          const productWithQuantity = {
            ...selectedProduct,
            variationValues: selectedValues,
            quantity,
            totalPrice: currentPrice * quantity,
            price: currentPrice,
            stock: currentStock,
          };

          return [...prevAddedProducts, productWithQuantity];
        });

        if (!keepAdding) {
          closeModal();
        } else {
          setQuantity(1);
        }

        // Play beep sound
        const audio = new Audio("/beepSound.wavv");
        audio.play();
      }
    }
  };

  const handleVariationChange = (variationType, value) => {
    const updatedVariations = { ...selectedVariations, [variationType]: value };
    setSelectedVariations(updatedVariations);

    const sortedSelectedValues = Object.values(updatedVariations)
      .sort()
      .join(",");

    const combination = selectedProduct.variation_combinations.find(
      (combo) =>
        combo.values.split(",").sort().join(",") === sortedSelectedValues
    );

    if (combination) {
      const newId = `v${combination.id}`;
      setCurrentId(newId);
      onIdChange(newId);

      setCurrentPrice(combination.price);
      setCurrentStock(combination.stock);
    } else {
      setCurrentPrice(selectedProduct.price);
      setCurrentStock(selectedProduct.stock);
    }
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const hasAllVariationsSelected =
    selectedProduct &&
    (selectedProduct.product_variation.length === 0 ||
      Object.keys(selectedVariations).length ===
        selectedProduct.product_variation.length);

  return (
    <div>
      <div className="mt-16 flex items-center gap-2 justify-between">
        <h1 className="text-2xl whitespace-nowrap">All Listed Products</h1>
        <div className="">
          <form className="flex items-center justify-end">
            <div className="relative w-full">
              <input
                type="search"
                id="default-search"
                className="block w-full px-4 py-2 text-sm font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none leading-relaxed"
                placeholder="Search here..."
              />
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-500" />
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="py-6">
        {(selectedCategoryId ? displayProducts : filteredProducts).length >
        0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-5  gap-2">
            {(selectedCategoryId ? displayProducts : filteredProducts).map(
              (product) => {
                if (product.variation_combinations.length > 0) {
                  const prices = product.variation_combinations.map(
                    (variation) => variation.price
                  );
                  const stocks = product.variation_combinations.map(
                    (variation) => variation.stock
                  );

                  const minPrice = Math.min(...prices);
                  const maxPrice = Math.max(...prices);

                  const totalStock = stocks.reduce(
                    (acc, stock) => acc + stock,
                    0
                  );

                  return (
                    <div
                      key={product.id}
                      onClick={() => openModal(product)}
                      className="flex  md:flex-row xl:flex-row  items-center gap-1 p-1 shadow-lg bg-white    rounded-lg cursor-pointer"
                    >
                      <img
                        src={`https://pub-c053b04a208d402dac06392a3df4fd32.r2.dev/Attire_Idyll/image/${product.image}`}
                        alt={product.name}
                        className="w-[50%] rounded-md"
                      />
                      <div className=" ">
                        <div className="flex flex-wrap gap-1">
                          <h2 className="text-sm font-semibold">
                            {product.name.length > 6
                              ? product.name.slice(0, 6) + "..."
                              : product.name}
                          </h2>{" "}
                          <h2 className="text-xs text-gray-400 font-semibold">
                            ({totalStock})
                          </h2>
                        </div>
                        <p className="text-gray-600 font-semibold">
                          {minPrice === maxPrice
                            ? `৳ ${minPrice}`
                            : `৳ ${minPrice} - ${maxPrice}`}
                        </p>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div
                      key={product.id}
                      onClick={() => openModal(product)}
                      className="flex p-1  md:flex-row xl:flex-row  items-center gap-1 shadow-lg bg-white    rounded-lg cursor-pointer"
                    >
                      <img
                        src={`https://pub-c053b04a208d402dac06392a3df4fd32.r2.dev/Attire_Idyll/image/${product.image}`}
                        alt={product.name}
                        className="w-[50%] rounded-md"
                      />
                      <div className="  text-center sm:text-left">
                        <div className="flex flex-wrap gap-1">
                          <h2 className="text-sm font-semibold">
                            {product.name.length > 6
                              ? product.name.slice(0, 6) + "..."
                              : product.name}
                          </h2>{" "}
                          <h2 className="text-xs text-gray-400 font-semibold">
                            ({product.stock})
                          </h2>
                        </div>
                        <p className="text-gray-600 font-semibold">
                          ৳ {product.price}
                        </p>
                      </div>
                    </div>
                  );
                }
              }
            )}
          </div>
        ) : (
          <img
            className="mx-auto"
            src="https://bofrike.in/wp-content/uploads/2021/08/no-product.png"
            alt="No products available."
          />
        )}
      </div>

      <div>
        {modalOpen && selectedProduct && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg w-96">
              <div className="flex md:justify-between items-center">
                <div className="flex">
                  <label className="flex items-center">
                    <span className="whitespace-nowrap text-sm">
                      Keep Adding Products
                    </span>
                    <input
                      className="toggle toggle-info scale-75"
                      type="checkbox"
                      checked={keepAdding}
                      onChange={() => setKeepAdding(!keepAdding)}
                    />
                  </label>
                </div>
                <div>
                  <button
                    className="py-2 px-4 rounded-md text-sky-400 hover:text-pink-500"
                    onClick={closeModal}
                  >
                    <FaTimesCircle size={24} />
                  </button>
                </div>
              </div>

              <div className="flex gap-5 mt-4">
                <div>
                  <img
                    src={`https://pub-c053b04a208d402dac06392a3df4fd32.r2.dev/Attire_Idyll/image/${selectedProduct.image}`}
                    alt={selectedProduct.name}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                </div>

                <div className="flex-1 space-y-3">
                  {/* <h2 className="text-xl font-semibold">{currentId}</h2> */}

                  <h2 className="text-xl font-semibold">
                    {selectedProduct.name}
                  </h2>
                  <h2 className="text-sm font-semibold">
                    Price: ৳{currentPrice}
                  </h2>

                  {selectedProduct.product_variation.length > 0 ? (
                    <div className="space-y-3">
                      {selectedProduct.product_variation.map(
                        (variation, index) => (
                          <div className="flex flex-col" key={index}>
                            <h3 className="text-sm font-semibold">
                              {variation.variation.name}
                            </h3>
                            <div className="flex gap-3">
                              {variation.variaton_values
                                .split(",")
                                .map((value, i) => (
                                  <button
                                    key={i}
                                    onClick={() =>
                                      handleVariationChange(
                                        variation.variation.name,
                                        value
                                      )
                                    }
                                    className={`py-1 px-3 rounded ${
                                      selectedVariations[
                                        variation.variation.name
                                      ] === value
                                        ? "bg-sky-400 text-white"
                                        : "bg-gray-200 hover:bg-sky-400 hover:text-white"
                                    }`}
                                  >
                                    {value}
                                  </button>
                                ))}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  ) : (
                    <p className="text-sm font-semibold">
                      No variations available
                    </p>
                  )}

                  <h3 className="text-sm font-semibold">
                    Available Stock: {currentStock}
                  </h3>

                  <div className="flex w-20 h-7 bg-gray-200 py-1 rounded-full items-center justify-center space-x-0 md:space-x-2">
                    <button
                      onClick={handleDecreaseQuantity}
                      className="bg-slate-200 text-gray-800 p-1 rounded-full hover:text-white hover:bg-sky-400"
                    >
                      <FaMinus size={10} />
                    </button>
                    <span className="text-sm">{quantity}</span>
                    <button
                      onClick={handleIncreaseQuantity}
                      className="bg-slate-200 text-gray-800 p-1 rounded-full hover:text-white hover:bg-sky-400"
                    >
                      <FaPlus size={10} />
                    </button>
                  </div>

                  <div className="mt-3">
                    <button
                      onClick={handleAddProduct}
                      className={`${
                        hasAllVariationsSelected
                          ? "bg-sky-400 hover:bg-blue-600"
                          : "bg-gray-500 cursor-not-allowed"
                      } text-white px-4 py-2 rounded`}
                      disabled={!hasAllVariationsSelected}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
