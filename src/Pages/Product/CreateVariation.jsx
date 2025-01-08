import React, { useState, useEffect } from 'react';
import axios from "axios";
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

import {FaPlus , FaMinus}  from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import Footer_Backend from '../../Component/Backend/Footer_Backend';
const CreateVariation = () => {
  const navigate = useNavigate();
  const [variationName, setVariationName] = useState('');
  const [inputFields, setInputFields] = useState([{ id: 1, value: '' }]);
  const [errors, setErrors] = useState({});

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");


  const cacheKey = `variations_${userId}`;
  const cacheTimeKey = `variations_${userId}_timestamp`;



  

  const handleAddField = () => {
    setInputFields(prevFields => [...prevFields, { id: prevFields.length + 1, value: '' }]);
  };

  const handleInputChange = (id, newValue) => {
    setInputFields(prevFields =>
      prevFields.map(field =>
        field.id === id ? { ...field, value: newValue } : field
      )
    );
  };

  const handleDeleteField = (id) => {
    setInputFields(prevFields => prevFields.filter(field => field.id !== id));
  };

  const handleSave = async () => {
    // Clear errors before validation
    setErrors({});
  
    const variationData = {
      user_id: userId,
      name: variationName,
      value: inputFields.map(field => field.value).filter(value => value.trim() !== '').join(', '),
    };
    
    console.log(variationData);
  
    try {
      const response = await axios.post(`https://admin.attireidyll.com/api/variation_add`, variationData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (response.data.status) {
        console.log("Variation added successfully!");
        toast.success(response.data.message);


         localStorage.removeItem(cacheKey);
        localStorage.removeItem(cacheTimeKey);

        
        // Reset form fields after successful submission
        setVariationName('');
        setInputFields([{ id: 1, value: '' }]);
        navigate('/product/variation');
      } else if (response.data.error) {
        if (response.data.error && typeof response.data.error === 'object') {
          setErrors({});
          Object.keys(response.data.error).forEach((field) => {
            setErrors((prevErrors) => ({
              ...prevErrors,
              [field]: response.data.error[field][0],
            }));
          });
  
          toast.error(Object.keys(response.data.error).map((field) => ` ${response.data.error[field][0]}`));
        } else {
          console.error("Unexpected error format:", response.data.error);
        }
        console.log(response.data.error);
      }
    } catch (error) {
      console.error("Error saving variation:", error);
      toast.error("An error occurred while saving the variation.");
    }
  };
  

  return (
 
   <div>
      <div>
      <div className="flex shadow-md justify-between mt-1 mb-5 py-2 px-4 items-center">
                 <h1 className="text-xl md:text-2xl font-semibold">Create Variation</h1>
                
               </div>

      <div className="rounded-md shadow h-auto mt-5 px-5 pt-5 pb-5">
        <p className="mb-4 text-sm md:text-base font-semibold">Value Name</p>
        <input
          type="text"
          name="variation_name"
          className="form-control text-sm text-lowercase border shadow py-2 px-3 w-[50%] focus:outline-none "
          placeholder="Enter variation name"
          value={variationName}
          onChange={(e) => setVariationName(e.target.value)}
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}

        <p className="mb-4 mt-5 text-sm md:text-base font-semibold">Value</p>
        {inputFields.map((field, index) => (
          <div key={field.id} className="flex items-center mb-2">
            <input
              type="text"
              className="form-control text-sm text-lowercase border shadow py-2 px-3 w-[50%] focus:outline-none"
              placeholder={`Enter value ${field.id}`}
              value={field.value}
              onChange={(e) => handleInputChange(field.id, e.target.value)}
            />
            {index === inputFields.length - 1 && (
              <button
                type="button"
                className="ml-2  bg-teal-500 hover:bg-teal-400 text-white  px-2 py-2 cursor-pointer rounded-md"
                onClick={handleAddField}
              >
                <FaPlus/>
              </button>
            )}
            {inputFields.length > 1 && (
              <button
                type="button"
                className="ml-2 bg-slate-500 text-white  px-2 py-2 cursor-pointer rounded-md"
                onClick={() => handleDeleteField(field.id)}
              >
                 <FaMinus/>
              </button>
            )}
          </div>
        ))}

        {errors.value && <p className="text-red-500 text-sm mt-1">{errors.value}</p>}

        <div className="flex gap-4 justify-end mt-5">
          <button
            className="rounded bg-teal-500 hover:bg-teal-400 text-white px-4 py-2 font-semibold text-sm md:text-base"
            onClick={handleSave}
          >
            Save
          </button>
          <Link
            className="rounded bg-gray-500 hover:bg-gray-400 text-white px-4 py-2 font-semibold text-sm md:text-base"
            to="/product/variation"
          >
            Back
          </Link>
        </div>
      </div>
      </div>
      <Footer_Backend/>
   </div>
  
  );
};

export default CreateVariation;
