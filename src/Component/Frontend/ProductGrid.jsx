import { Link } from 'react-router-dom';

const ProductGrid = ({ products }) => {
  // Group products by category
  const categories = products.((acc, product) => {
    const categoryName = product.category.name; // Use the category name from the product object
    if (!acc[categoryName]) {
      acc[categoryName] = []; // Create an array for the category if it doesn't exist
    }
    acc[categoryName].push(product); // Add product to the respective category
    return acc;
  }, {});

  return (
    <div>
      {Object.keys(categories).map((categoryName) => (
        <div key={categoryName} className="mt-8 mb-3">
          <p className="text-lg md:text-xl lg:text-2xl font-medium">
            {categoryName} Wardrobe
          </p>

          <div className="mb-5">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
              {categories[categoryName].map((product) => (
                <div
                  key={product.id}
                  className="relative border rounded overflow-hidden shadow"
                >
                  <Link
                    to={{
                      pathname: '/singleProduct',
                    }}
                    state={{ product }}
                  >
                    <img
                      src={`https://admin.attireidyll.com/public/storage/product/${product.image}`}
                      alt={product.name}
                      className="w-[400px] h-[300px] object-cover"
                    />
                  </Link>

                  <div className="absolute bottom-0 w-full bg-opacity-60 bg-gray-200 p-1">
                    <a
                      className="font-medium text-xs md:text-sm my-2 hover:underline truncate w-full"
                      title={product.name}
                    >
                      {product.name}
                    </a>

                    <div className="flex justify-between">
                      <div>
                        <p className="col-span-1 md:text-lg font-bold">
                          ${product.price}
                        </p>
                        {product.discount_amount && (
                          <p className="col-span-1 text-red-700 font-medium text-xs md:text-sm line-through">
                            ${product.price - product.discount_amount}
                          </p>
                        )}
                      </div>

                      <Link
                        to={{
                          pathname: '/singleProduct',
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
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
