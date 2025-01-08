import React, { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";

const CategoryItems = ({ categoryId = null, onCategoryIdChange }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // const cacheKey = "categories";
        // const cacheTimeKey = "categories_timestamp";
        // const cacheValidityDuration = 2 * 60 * 60 * 1000; // 2 hours
    
        // const cachedData = localStorage.getItem(cacheKey);
        // const cachedTimestamp = localStorage.getItem(cacheTimeKey);
    
        // const now = Date.now();
    
        // if (cachedData && cachedTimestamp && (now - cachedTimestamp < cacheValidityDuration)) {
        //   // Use cached data if within the validity duration
        //   setCategories(JSON.parse(cachedData));
        //   return;
        // }
    
        // Otherwise, make the API call
        const response = await axios.get(`https://admin.attireidyll.com/api/category/get_all`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
    
        const categories = response.data.data || [];
    
        // localStorage.setItem(cacheKey, JSON.stringify(categories));
        // localStorage.setItem(cacheTimeKey, now.toString());
  
        setCategories(categories);
    
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
  
    fetchCategories();
  }, [token]);

  // Update selected category when categoryId prop changes
  useEffect(() => {
    if (categoryId) {
      const selected = categories.find(category => category.id === categoryId);
      setSelectedCategory(selected ? { value: selected.id, label: selected.name } : null);
    }
  }, [categoryId, categories]);

  const flattenCategories = (categories) => {
    return categories.reduce((acc, category) => {
      // Add the parent category
      acc.push({ label: category.name, value: category.id });
      
      // Add children categories
      if (category.children) {
        category.children.forEach((child) => {
          acc.push({ label: `-- ${child.name}`, value: child.id });
          
          // Add grandchildren categories
          if (child.children) {
            child.children.forEach((grandchild) => {
              acc.push({ label: `---- ${grandchild.name}`, value: grandchild.id });
            });
          }
        });
      }
      
      return acc;
    }, []);
  };

  const categoryOptions = flattenCategories(categories);

  const handleCategoryChange = (selectedOption) => {
    console.log(selectedOption);
    if (selectedOption) {
      // Handle category change logic

      
      setSelectedCategory(selectedOption.value);
      onCategoryIdChange(selectedOption.value); // Call parent function if needed
    } else {
      setSelectedCategory(null); // Clear selection if none selected
    }
  };

  return (
    <div>
      <Select
        options={categoryOptions}
      
        placeholder="Select a category"
        className="text-sm"
        isClearable
        onChange={handleCategoryChange}
      />
    </div>
  );
};

export default CategoryItems;
