import { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp, FaTimesCircle } from 'react-icons/fa';
import BillingSection from '../../Component/POS/BillingSection/BillingSection';
import Carousel from '../../Component/POS/Carousel/Carousel';
import AllListedProducts from '../../Component/POS/AllListedProducts';
import axios from 'axios';
import SelectedBusiness from '../../Component/SelectedBusiness';

const Pos = () => {
  const token = localStorage.getItem("token");
  const clientId = localStorage.getItem("clientId");
  const [addedProducts, setAddedProducts] = useState(() => {
    const savedProducts = localStorage.getItem('addedProducts');
    return savedProducts ? JSON.parse(savedProducts) : [];
  });

  useEffect(() => {
    localStorage.setItem('addedProducts', JSON.stringify(addedProducts));
  }, [addedProducts]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScreenWide, setIsScreenWide] = useState(window.innerWidth > 600);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const cacheKey = `categories_${clientId}`;
        const cacheTimeKey = `categories_${clientId}_timestamp`;
        const cacheValidityDuration = 2 * 60 * 60 * 1000; // 2 hours
    
        const cachedData = localStorage.getItem(cacheKey);
        const cachedTimestamp = localStorage.getItem(cacheTimeKey);
    
        const now = Date.now();
    
        if (cachedData && cachedTimestamp && (now - cachedTimestamp < cacheValidityDuration)) {
          setCategories(JSON.parse(cachedData));
          return;
        }
    
        const response = await axios.get(`https://admin.attireidyll.com/api/category/get_all/${clientId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
    
        const categories = response.data.data || [];
        localStorage.setItem(cacheKey, JSON.stringify(categories));
        localStorage.setItem(cacheTimeKey, now.toString());
        setCategories(categories);
    
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
  
    fetchCategories();
  }, [token, clientId]);

  const [selectedBusiness, setSelectedBusiness] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);

  useEffect(() => {
    if (selectedBusiness.length > 0) {
      const filtered = categories.filter((category) => {
        const businessIds = category.business_id ? category.business_id.split(',') : [];
        return selectedBusiness.some(
          (business) => business.id.toString() && businessIds.includes(business.id.toString())
        );
      });
      setFilteredCategories(filtered);
    } else {
      setFilteredCategories(categories);
    }
  }, [selectedBusiness, categories]);

  const handleSelectBusinesses = (businesses) => {
    setSelectedBusiness(businesses);
  };

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const cacheKey = `products_${clientId}`;
        const cacheTimeKey = `products_${clientId}_timestamp`;
        const cacheValidityDuration = 2 * 60 * 60 * 1000; // 2 hours
  
        const cachedData = localStorage.getItem(cacheKey);
        const cachedTimestamp = localStorage.getItem(cacheTimeKey);
  
        const now = Date.now();
  
        if (cachedData && cachedTimestamp && (now - cachedTimestamp < cacheValidityDuration)) {
          setProducts(JSON.parse(cachedData));
          return;
        }
  
        const response = await fetch(`https://admin.attireidyll.com/api/product/get/${clientId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const result = await response.json();
        if (result.status) {
          const products = result.data.data;
          localStorage.setItem(cacheKey, JSON.stringify(products));
          localStorage.setItem(cacheTimeKey, now.toString());
          setProducts(products);
        } else {
          console.error('Failed to fetch products:', result.message);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
  
    fetchProducts();
  }, [clientId, token]);

  useEffect(() => {
    if (selectedBusiness.length > 0) {
      const filtered = products.filter(product =>
        selectedBusiness.some(business => product.business_id === business.id)
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [selectedBusiness, products]);

  useEffect(() => {
    const handleResize = () => setIsScreenWide(window.innerWidth > 600);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isScreenWide) {
      setIsDropdownOpen(false);
    }
  }, [isScreenWide]);

  const [currentId, setCurrentId] = useState(null);

  const handleIdChange = (id) => {
    setCurrentId(id); 
    console.log(id); 
  };

  const handleDeleteOption = (index) => {
    const updatedOptions = selectedOptions.filter((_, i) => i !== index);
    setSelectedOptions(updatedOptions);
  };

  const calculateTotalPrice = () => {
    return selectedOptions.reduce((total, option) => total + (option.quantity * option.price), 0).toFixed(2);
  };

  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const handleCategoryClick = (id) => {
    console.log("Category ID from parent:", id);
    setSelectedCategoryId(id); 
  };

  useEffect(() => {
    // Reset selectedCategoryId when selectedBusiness changes
    setSelectedCategoryId(null);
  }, [selectedBusiness]);

  return (
    <div className={`grid px-2 lg:grid-cols-12 grid-cols-1 gap-3 ${isDropdownOpen ? 'overflow-hidden' : ''}`}>
      <div className='col-span-8 bg-[#f7f7fc] px-3 py-2 rounded-xl'>
        <div className='flex justify-end lg:hidden'>
          <SelectedBusiness 
            onSelectBusinesses={handleSelectBusinesses} 
            setAddedProducts={setAddedProducts}
            businessId={0} 
          />
        </div>
        <div>
          <Carousel filteredCategories={filteredCategories} onCategoryClick={handleCategoryClick} />
          <AllListedProducts products={products} filteredProducts={filteredProducts} onIdChange={handleIdChange} selectedCategoryId={selectedCategoryId} setAddedProducts={setAddedProducts} />
        </div>
      </div>
      <div className='col-span-4'>
        <div className="lg:hidden">
          <button
            onClick={toggleDropdown}
            className="w-full bg-sky-400 fixed bottom-0 right-0 ml-3 text-white font-semibold py-4 px-4 rounded flex justify-between items-center"
          >
            Billing Section
            {isDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        </div>
        <div className="hidden lg:block">
          <BillingSection
            selectedBusiness={selectedBusiness}
            onSelectBusinesses={handleSelectBusinesses}
            businessId={selectedBusiness[0]?.id}
            options={selectedOptions} 
            setAddedProducts={setAddedProducts} 
            addedProducts={addedProducts}
            onDeleteOption={handleDeleteOption} 
            totalPrice={calculateTotalPrice()} 
            currentId={currentId}
          />
        </div>
      </div>
      {isDropdownOpen && (
        <div className="fixed inset-0 bg-white z-50 overflow-auto">
          <button
            onClick={toggleDropdown}
            className="absolute top-4 right-4 text-gray-600 hover:text-red-500"
          >
            <FaTimesCircle size={24} />
          </button>
          <div className="p-4">
            <BillingSection
              selectedBusiness={selectedBusiness}
              businessId={selectedBusiness[0]?.id}

              onSelectBusinesses={handleSelectBusinesses}
              options={selectedOptions} 
              setAddedProducts={setAddedProducts} 
              addedProducts={addedProducts}
              onDeleteOption={handleDeleteOption} 
              totalPrice={calculateTotalPrice()} 
              currentId={currentId}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Pos;
