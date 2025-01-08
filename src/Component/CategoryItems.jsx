import React, { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";

const CategoryItems = ({ categoryId = null, onCategoryIdChange }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCategories = async () => {
      if (!token) {
        console.error("No token found.");
        return;
      }
      
      try {
        const response = await axios.get(`https://admin.attireidyll.com/api/category/get_all`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
    
        const categories = response.data.data || [];
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
      if (category.children && category.children.length > 0) {
        category.children.forEach((child) => {
          acc.push({ label: `-- ${child.name}`, value: child.id });
          
          // Add grandchildren categories
          if (child.children && child.children.length > 0) {
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
      setSelectedCategory(selectedOption);
      onCategoryIdChange(selectedOption.value); // Call parent function if needed
    } else {
      setSelectedCategory(null); // Clear selection if none selected
    }
  };

  return (
    <div>
      <Select
        options={categoryOptions}
        value={selectedCategory} // Control the selected category value
        placeholder="Select a category"
        className="text-sm"
        isClearable
        onChange={handleCategoryChange}
      />
    </div>
  );
};

export default CategoryItems;
