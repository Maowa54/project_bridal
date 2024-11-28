
import React, { useState, useEffect } from "react";

import axios from "axios";
import toast from "react-hot-toast";

import { CiMenuKebab } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const User = () => {

  const [editData, setEditData] = useState([]);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [businesses, setBusinesses] = useState([]);


  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPassword, setEditPassword] = useState('');
  const [editConfirmPassword, setEditConfirmPassword] = useState('');

  const [editbusinesses, setEditBusinesses] = useState([]);


  const [users, setUsers] = useState([]);


  const [errors, setErrors] = useState({});


  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const clientId = localStorage.getItem("clientId");

  const [currentPage, setCurrentPage] = useState(1);




  const fetchBusinesses = async () => { 
    try {
      const response = await axios.get(`https://admin.attireidyll.com/api/business/index/${clientId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setBusinesses(response.data.data || []);
    } catch (error) {
      console.error('Error fetching businesses:', error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    fetchBusinesses();
  }, [token]);


  const fetchUser = async () => { 
    try {
      const response = await axios.get(`https://admin.attireidyll.com/api/user/get_all/${clientId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setUsers(response.data.data || []);
    } catch (error) {
      console.error('Error fetching users:', error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [token]);

  const handleSave = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("client_id", clientId);
    formData.append("user_id", userId);
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("pass", password);
    formData.append("business_id", 2);

    formData.append("confirm_pass", confirmPassword);

    // for (let [key, value] of formData.entries()) {
    //   console.log(`${key}: ${value}`);
    // }
    try {
      const response = await axios.post(
        "https://admin.attireidyll.com/api/user/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );

      console.log(response);


      if (response.data.status) {


        toast.success(
          response.data.message || "Business created successfully!",
          {
            duration: 2000,
            position: "top-right",
          }
        );

        // Reset form fields
        setName("");
        setPhone("");
        setPassword("");
        setConfirmPassword("");
        setEmail("");
        setErrors({});
        document.getElementById("my_modal_3").close();

        // Refresh the businesses list
        fetchUser();
      } else {
        setErrors(response.data.error || {});
      }
    } catch (error) {
      console.error(
        "Error saving business:",
        error.response ? error.response.data : error.message
      );
      toast.error(
        "An error occurred while saving the business. Please try again."
      );
    }
  };


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});


  const handleEdit = (user) => {


    console.log(user);
    setSelectedUser(user);



    setEditName(user.name);
    setEditEmail(user.email);
    setEditPhone(user.phone);
    setEditPassword(user.pass);
    setEditConfirmPassword(user.pass);



    setIsModalOpen(true); // Open the modal
  };




  const handleEditSave = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("client_id", clientId);
    formData.append("user_id", userId);
    formData.append("name", editName);
    formData.append("phone", editPhone);
    formData.append("email", editEmail);
    formData.append("pass", editPassword);
    formData.append("business_id", 2);

    formData.append("confirm_pass", editConfirmPassword);

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    try {
      const response = await axios.post(
        "https://admin.attireidyll.com/api/user/update",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );

      console.log(response);


      if (response.data.status) {


        toast.success(
          response.data.message || "User Edited successfully!",
          {
            duration: 2000,
            position: "top-right",
          }
        );

        // Reset form fields
        setEditName("");
        setEditPhone("");
        setEditEmail("");
        setEditConfirmPassword("");
        setEditPassword("");
        setErrors({});
        setIsModalOpen(false);
        
        fetchUser();
      } else {
        setErrors(response.data.error || {});
      }
    } catch (error) {
      console.error(
        "Error saving business:",
        error.response ? error.response.data : error.message
      );
      toast.error(
        "An error occurred while saving the business. Please try again."
      );
    }
  };
  

  const closeModal = () => {
    setIsModalOpen(false);
  };


  return (
    <div className=" mx-4 md:mx-10 flex flex-col justify-between">
      <div className="flex-grow">
        <div className="w-full shadow py-4 flex pe-4">
          <h2 className="px-4 text-xl font-semibold">User</h2>
          <div className="ml-auto flex items-center">
           

            <button
              className="bg-[#28DEFC] text-white font-semibold py-1 px-6 mr-5 rounded cursor-pointer"
              onClick={() => document.getElementById("my_modal_3").showModal()}
            >
              Add
            </button>

          <form onSubmit={handleSave}>

            <dialog id="my_modal_3" className="modal">
              <div className="modal-box px-2">
                <div className="flex justify-between items-center px-6 mb-2">
                  <p className="text-2xl">
                    <b>Add User</b>
                  </p>
                  <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost text-3xl">
                      <IoClose />
                    </button>
                  </form>
                </div>
                <div className="w-full max-w-md mx-auto mb-4">
                  <label className="text-gray-700 text-sm font-bold mb-2">
                    User Name
                  </label>
                  <input
                    className="shadow  border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
                    id="username"
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                {errors.name && <p className="text-red-500 text-sm">{errors.name[0]}</p>}
                </div>

                <div className="w-full max-w-md mx-auto mb-4">
                  <label className="text-gray-700 text-sm font-bold mb-2">
                    User Phone Number
                  </label>
                  <input
                    className="shadow  border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
                    id="usernumber"
                    type="number"
                    placeholder="Enter your number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                    {errors.phone && <p className="text-red-500 text-sm">{errors.phone[0]}</p>}

                </div>






                <div className="w-full max-w-md mx-auto mb-4">
                  <label className="text-gray-700 text-sm font-bold mb-2">
                    User Mail
                  </label>
                  <input
                    className="shadow  border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
                    id="useremail"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                   {errors.email && <p className="text-red-500 text-sm">{errors.email[0]}</p>}

                </div>

                <div className="w-full max-w-md mx-auto mb-4">
                  <label className="text-gray-700 text-sm font-bold mb-2">
                    User Password
                  </label>
                  <input
                    className="shadow  border rounded w-full py-2 px-3 text-gray-700 focus:outline-none "
                    id="userpassword"
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                   {errors.pass && <p className="text-red-500 text-sm">{errors.pass[0]}</p>}

                </div>


                <div className="w-full max-w-md mx-auto mb-4">
                  <label className="text-gray-700 text-sm font-bold mb-2">
                    Confirm Password
                  </label>
                  <input
                    className="shadow  border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
                    id="confirmpassword"
                    type="password"
                    placeholder="Enter password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                {errors.confirm_pass && <p className="text-red-500 text-sm">{errors.confirm_pass[0]}</p>}

                </div>

                <div className="modal-action  px-5">
                  <button
                   type="submit"
                    className="btn bg-[#28DEFC] hover:bg-[#28DEFC] text-white"
                  >
                    Save
                  </button>
                </div>
              </div>
            </dialog>

          </form>

          
            <select
              name="category_id"
              className="shadow-md border border-gray-300 rounded-lg py-1 px-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              id="category_id"
            >
              <option value="" disabled selected>
                Business Name
              </option>
              <option value="1">Business Name 1</option>
              <option value="2">Business Name 2</option>
              <option value="3">Business Name 3</option>
              <option value="4">Business Name 4</option>
              <option value="5">Business Name 5</option>
            </select>
          </div>
        </div>

        <div className="mt-6 flex-grow">
          <table className="table mb-24">
            <thead>
              <tr>
                <th className="text-[15px]">SL</th>
                <th className="text-[15px]">Name</th>
                <th className="text-[15px]">Number</th>
                <th className="text-[15px]">Mail</th>
                <th className="text-[15px]">Password</th>
                <th className="text-[15px]">Action</th>
              </tr>
            </thead>
            <tbody>

            {users.map((user, index) => (

              <tr className="hover">
                <th className="text-[15px]">{index + 1}</th>
                <td className="text-[15px]">{user.name}</td>
                <td className="text-[15px]">{user.phone}</td>
                <td className="text-[15px]">{user.email}</td>
                <td className="text-[15px]">{user.pass}</td>
                <td>
                  <div className="dropdown">
                    <button className="text-[20px]">
                      <CiMenuKebab />
                    </button>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                    >
                    
                      <li>
                        <a onClick={() => handleEdit(user)}>
                          <FaRegEdit className="text-green-500 text-[20px] pl-1" />
                          Edit
                        </a>
                      </li>
                      <li>
                        <a onClick={() => handleDelete(index)}>
                          <MdDeleteForever className="text-red-500 text-[20px]" />
                          Delete
                        </a>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>

           ))}

            </tbody>
          </table>

          {isModalOpen && (
        <dialog id="" className="modal w-full" open>
          <form  onSubmit={handleEditSave} >
            <div className="modal-box px-13 ">
              <div className="flex justify-between items-center  mb-2">
                <p className="text-2xl">
                  <b>Edit User</b>
                </p>
                <button
                  type="button"
                  onClick={closeModal}
                  className="btn btn-sm btn-circle btn-ghost text-3xl"
                >
                  <IoClose />
                </button>
              </div>

              {/* Form fields */}
              <div className="w-full max-w-md mx-auto mb-4">
                <label className="text-gray-700 text-sm font-bold mb-2">
                  User Name
                </label>
                <input
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
                  id="username"
                  type="text"
                  placeholder="Enter name"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
              
              </div>

              <div className="w-full max-w-md mx-auto mb-4">
                <label className="text-gray-700 text-sm font-bold mb-2">
                  User Phone Number
                </label>
                <input
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
                  id="usernumber"
                  type="number"
                  placeholder="Enter your number"
                  value={editPhone}  onChange={(e) => setEditPhone(e.target.value)}
                />
                {/* {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone[0]}</p>
                )} */}
              </div>

              <div className="w-full max-w-md mx-auto mb-4">
                <label className="text-gray-700 text-sm font-bold mb-2">
                  User Mail
                </label>
                <input
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
                  id="useremail"
                  type="email"
                  placeholder="Enter your email"
                  value={editEmail}  onChange={(e) => setEditEmail(e.target.value)}
                />
                {/* {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email[0]}</p>
                )} */}
              </div>

              <div className="w-full max-w-md mx-auto mb-4">
                <label className="text-gray-700 text-sm font-bold mb-2">
                  User Password
                </label>
                <input
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
                
                  type="password"
                  placeholder="Enter password"
                  value={editPassword}  onChange={(e) => setEditPassword(e.target.value)}
                />
                {/* {errors.pass && (
                  <p className="text-red-500 text-sm">{errors.pass[0]}</p>
                )} */}
              </div>

              <div className="w-full max-w-md mx-auto mb-4">
                <label className="text-gray-700 text-sm font-bold mb-2">
                  Confirm Password
                </label>
                <input
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
            
                  type="password"
                  placeholder="Confirm password"
                  value={editConfirmPassword}  onChange={(e) => setEditConfirmPassword(e.target.value)}
                />
            
              </div>

              {/* Modal action buttons */}
              <div className="modal-action ">
                <button
                  type="submit"
                  className="btn bg-[#28DEFC] hover:bg-[#28DEFC] text-white"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </dialog>
      )}
        </div>
      </div>

      <div className="flex justify-center items-center mt-20 mb-10">
        
      </div>
    </div>
  );
};

export default User;