import React, { useEffect, useState , useRef } from 'react';
import { IoIosSearch } from "react-icons/io";
import { CiMenuKebab } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { FaEye,FaCheck, FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import axios from 'axios';
import Select from "react-select";
import { IoClose } from 'react-icons/io5';
import toast from 'react-hot-toast';
import AllSelectedBusiness from '../../Component/AllSelectedBusiness';

const Category = () => {
  const token = localStorage.getItem("token");
  const clientId = localStorage.getItem("clientId");

  const [categories, setCategories] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [editSelectedOptions, setEditSelectedOptions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [imageFile, setImageFile] = useState(null); // Add state for the image file
  const fileInputRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);


  const [editSelectedImage, setEditSelectedImage] = useState(''); 


  // Toggle the drawer state
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };


  // Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
        try {
           

            // Make API call to fetch categories
            const response = await axios.get(`https://expressitplus.co.uk/api/category/get_all`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            const categories = response.data.data || [];
            setCategories(categories); // Set state
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    fetchCategories();
}, [token, clientId]);


// Call fetchCategories in useEffect to load categories on mount
// useEffect(() => {
//     fetchCategories();
// }, [token, clientId]);




 
 



  const [selectedValue, setSelectedValue] = useState(''); 

  const handleEditChange = (selected) => {
    setEditSelectedOptions(selected);
    setSelectedValue(selected.value); 
    };

  console.log(selectedValue); 
  // Close Modal
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentCategory(null);
    setImageFile(null); 
  };

  

  const [items, setItems] = useState([]);
  const [selectedImage, setSelectedImage] = useState(''); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/items.json');
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  

  
  // const [editItems, setEditItems] = useState([]);
  const [editName, setEditName] = useState(''); 

  const [editId, setEditId] = useState(''); 

  const [editSelectedCategory, setEditSelectedCategory] = useState({});
  
  const [errors, setErrors] = useState({});

 
  const handleEdit = (category) => {
    console.log(category);
  
    setEditSelectedCategory(category);  
    setEditName(category.name); 

    setEditId(category.id); 

    setEditSelectedImage(category.image);  
  
    setIsModalOpen(true); 
  };

 


    const handleSelect = (id) => {
    const selectedItem = items.find((item) => item.id === id);


    console.log(selectedItem);
    setSelectedImage(selectedItem.imageUrl); 
    
    setEditSelectedImage(selectedItem.imageUrl);
    // Update selected image URL
  };
  const handleEditSave = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", editName);
    formData.append("image", editSelectedImage);
    formData.append("category_id", editId);


    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
        const response = await axios.post(
            "https://expressitplus.co.uk/api/category/update",
            formData,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );

        if (response.data.status) {
            // Update the local state and local storage
            setCategories((prevCategories) => {
                const updatedCategories = prevCategories.map(category => 
                    category.id === editId 
                        ? { ...category, name: editName, image: editSelectedImage } 
                        : category
                );

                // Update local storage with new categories
                localStorage.setItem(`categories_${clientId}`, JSON.stringify(updatedCategories));
                return updatedCategories; // Return the updated categories
            });

            toast.success(response.data.message || "Categoryyyyyy updated successfully!");
            setErrors({});
            setIsModalOpen(false);
        } else {
            setErrors(response.data.error || {});
        }
    } catch (error) {
        console.error("Error saving categories:", error.response ? error.response.data : error.message);
        toast.error("An error occurred while saving the business. Please try again.");
    }
};



  return (
    <div className="mx-4 md:mx-10">
      <div className="w-full shadow py-4 flex pe-4">
        <h2 className="px-4 text-xl font-semibold">Category</h2>
        <div className="ml-auto flex items-center">
          <Link to="/category/addcategory" className="bg-[#28DEFC] text-white font-semibold py-1 px-6 mr-5 rounded cursor-pointer">Add</Link>
          <div className="w-auto">
           
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <select className="rounded border border-[#2B2F67] bg-white shadow-md h-8 w-20 flex items-center justify-center" id="paginate_input">
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50" selected>50</option>
            <option value="100">100</option>
            <option value="200">200</option>
            <option value="400">400</option>
            <option value="500">500</option>
          </select>
        </div>

        <form>
          <div className="max-w-xl w-full">
            <div className="flex space-x-4">
              <div className="flex rounded-md w-full">
                <input
                  type="text"
                  className="w-full border border-gray-300 p-1 rounded-l-md rounded-r-none focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  placeholder="Search here"
                />
                <button className="bg-[#28DEFC] text-white px-4 py-1 rounded-r-md flex items-center">
                  <IoIosSearch className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className="mt-6">
        <table className="table mb-24">
          <thead>
            <tr>
              <th className="text-[15px]">SL</th>
              <th className="text-[15px]">Image</th>
              <th className="text-[15px]">Name</th>
              <th className="text-[15px]">Business</th>
              <th className="text-[15px]">Action</th>
            </tr>
          </thead>
          <tbody>
          {categories.length > 0 ? categories.map((category, index) => (
    <tr key={category.id} className="hover">
        <th className="text-[15px]">{index + 1}</th>
        <td>
            <img src={category.image} alt={category.name} className="h-12 w-12" />
        </td>
        <td className="text-[15px]">{category.name}</td>
        <td className="text-[15px]">Business</td>
        <td>
            <div className="dropdown">
                <button className="text-[20px]">
                    <CiMenuKebab />
                </button>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                    <li>
                        <a>
                            <FaEye className="text-blue-500 text-[20px] pl-1" />
                            View
                        </a>
                    </li>
                    <li>
                        <a onClick={() => handleEdit(category)}>
                            <FaRegEdit className="text-green-500 text-[20px] pl-1" />
                            Edit
                        </a>
                    </li>
                    <li>
                        <a>
                            <MdDeleteForever className="text-red-500 text-[20px]" />
                            Delete
                        </a>
                    </li>
                </ul>
            </div>
        </td>
    </tr>
)) : (
    <tr>
        <td colSpan={5} className="text-center"><span className="loading loading-ring loading-md"></span></td>
    </tr>
)}

          </tbody>
        </table>
      </div>

      {/* Edit Category Modal */}
    {/* Edit Category Modal */}
    {isModalOpen && (
  <div className="modal modal-open">
    <div className="modal-box">
     
      <form onSubmit={handleEditSave}>
    <div className=' flex justify-between'>
    <h2 className="font-bold text-xl mb-4">Edit Category</h2>
        
        <div className="w-auto">
   
   {/* <Select
        options={allEditOptions} 
        
        onChange={handleEditChange}
        value={editSelectedOptions} 
        placeholder="Select businesses..."
      />
           {errors.business_ids && <p className="text-red-500 text-sm">{errors.business_ids[0]}</p>} */}
   
           
   
   </div>
    </div>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            className="form-control text-lowercase shadow-[0_3px_10px_rgb(0,0,0,0.2)] py-2 px-3 w-[100%] focus:outline-none focus:border-none"
            required
          />
        </div>

        <div>
          <button type='button'
            onClick={toggleDrawer} // This opens the drawer
            className="rounded w-full flex flex-col items-center cursor-pointer shadow-[0_3px_10px_rgb(0,0,0,0.2)] py-3"
          >
            <div className="relative">
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="w-20 h-20 object-cover rounded-full"
                />
              ) : editSelectedImage ? (
                <img
                  src={editSelectedImage}
                  alt="Current"
                  className="w-20 h-20 object-cover rounded-full"
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="70"
                  height="70"
                  viewBox="0 0 80 80"
                  fill="none"
                  className="mb-2"
                >
                  <circle cx="40" cy="40" r="40" fill="#D9D9D9" />
                  <line
                    x1="20"
                    y1="40"
                    x2="60"
                    y2="40"
                    stroke="white"
                    strokeWidth="4"
                  />
                  <line
                    x1="40"
                    y1="20"
                    x2="40"
                    y2="60"
                    stroke="white"
                    strokeWidth="4"
                  />
                </svg>
              )}
            </div>
            <div className="mt-2 text-center">Add Image</div>
          </button>
        </div>

        <div className="modal-action">
          <button type="button" className="btn" onClick={closeModal}>
            Cancel
          </button>
          <button type="submit" className="btn bg-sky-400 text-white">
            Edit
          </button>
        </div>
      </form>
    </div>

    <div
      className={`fixed inset-x-0 bottom-0 bg-white shadow-lg transition-transform transform h-[90%] ${
        isOpen ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="p-6 h-full flex flex-col">
        <div className="overflow-auto">
          {/* Search Bar */}
          <div className="px-4 my-4 w-full text-lg font-semibold bg-gray-100 h-16 flex items-center shadow-md rounded-lg">
            <p className="text-gray-800">Previously uploaded files</p>

            <div className="flex justify-end items-center ml-auto gap-5">
              <div className="flex items-center">
                <input
                  type="text"
                  className="border border-gray-300 rounded-l-md py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Search for..."
                />
                <button className="bg-[#28DEFC] text-white rounded-r-md py-2 px-4 transition duration-200 hover:bg-[#28DEFC]">
                  Search
                </button>
              </div>

              <button
                className="mr-4 text-[30px] cursor-pointer hover:text-[#28DEFC]"
                onClick={toggleDrawer} // This closes the drawer
                aria-label="Close"
              >
                <IoClose />
              </button>
            </div>
          </div>

          {/* Second Set of Image Thumbnails */}
          <div className="flex mb-3 justify-between">
            <div className="flex flex-wrap gap-4">


            {items.map((item) => (
                    <div key={item.id} className="flex flex-col items-center">
                      <div
                        className={`relative flex items-center justify-center text-white w-40 h-40 cursor-pointer ${
                          selectedImage === item.imageUrl ? "border-2 border-blue-500" : ""
                        }`}
                        onClick={() => handleSelect(item.id)}
                      >
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                        {selectedImage === item.imageUrl && (
                          <div className="absolute top-0 right-0 p-2">
                            <FaCheck className="text-green-800" />
                          </div>
                        )}
                      </div>
                      <p>{item.name}</p>
                    </div>
                  ))}

           
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex-grow flex items-end justify-center">
        <button
  type="button" // or remove type="submit" for buttons that don't need to submit the form
  onClick={(e) => {
    e.preventDefault(); // Prevent form submission
    toggleDrawer(); // Close the drawer when you save the image selection
    setSelectedImage(editSelectedImage); // Save the selected image
  }}
  className="bg-[#28DEFC] text-white px-4 py-2 rounded w-80"
>
  Save
</button>
        </div>
      </div>
    </div>
  </div>
)}


    </div>
  );
};

export default Category;
