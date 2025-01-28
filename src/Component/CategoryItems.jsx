import React, { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";

const CategoryItems = ({ categoryId = null, onCategoryIdChange }) => {
  const [categories, setCategories] = useState([]); // Raw categories from API
  const [categoryOptions, setCategoryOptions] = useState([]); // Flattened options for Select
  const [selectedCategory, setSelectedCategory] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCategories = async () => {
      if (!token) {
        console.error("No token found.");
        return;
      }

      try {
        const response = await axios.get("https://admin.attireidyll.com/api/category/get_all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const categories = response.data.data || [];
        setCategories(categories);
        setCategoryOptions(flattenCategories(categories));
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [token]);

  useEffect(() => {
    if (categoryId && categories.length > 0) {
      const selected = categories.find(category => category.id === categoryId);
      setSelectedCategory(selected ? { value: selected.id, label: selected.name } : null);
    }
  }, [categoryId, categories]);

  const flattenCategories = (categories) => {
    const processedIds = new Set(); // Prevent duplicates

    const processCategory = (category, prefix = "") => {
      if (processedIds.has(category.id)) return [];

      processedIds.add(category.id);
      const result = [
        { label: `${prefix}${category.name}`, value: category.id },
      ];

      if (category.children && category.children.length > 0) {
        category.children.forEach(child => {
          result.push(...processCategory(child, `${prefix}-- `));
        });
      }

      return result;
    };

    return categories.flatMap(category => processCategory(category));
  };

  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption);
    if (selectedOption) {
      onCategoryIdChange?.(selectedOption.value); // Optional callback
    } else {
      onCategoryIdChange?.(null);
    }
  };

  return (
    <div>
      <Select
        options={categoryOptions}
        value={selectedCategory}
        placeholder="Select a category"
        className="text-sm"
        isClearable
        onChange={handleCategoryChange}
      />
    </div>
  );
};

export default CategoryItems;
