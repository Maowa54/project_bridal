import React, { useState, useEffect } from "react";

import axios from "axios";
import toast from "react-hot-toast";

import { CiMenuKebab } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import Footer_Backend from "../../../Component/Backend/Footer_Backend";

const User = () => {
  const [editData, setEditData] = useState([]);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [editConfirmPassword, setEditConfirmPassword] = useState("");

  const [users, setUsers] = useState([]);

  const [errors, setErrors] = useState({});

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        `https://admin.attireidyll.com/api/user/get_all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers(response.data.data || []);
    } catch (error) {
      console.error(
        "Error fetching users:",
        error.response ? error.response.data : error.message
      );
    }
  };

  useEffect(() => {
    fetchUser();
  }, [token]);

  const handleSave = async (e) => {
    e.preventDefault();

    const formData = new FormData();
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
    formData.append("user_id", userId);
    formData.append("name", editName);
    formData.append("phone", editPhone);
    formData.append("email", editEmail);
    formData.append("pass", editPassword);
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
        toast.success(response.data.message || "User edited successfully!", {
          duration: 2000,
          position: "top-right",
        });

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
        "Error editing user:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="pb-8">
        <div>
          <div className="flex rounded shadow-md justify-between mt-1 mb-5 py-2 px-4 items-center">
            <h1 className="text-xl md:text-2xl font-semibold">User</h1>
            <button
              onClick={() => document.getElementById("my_modal_3").showModal()}
              className="ml-auto bg-teal-500 hover:bg-teal-400 text-white font-semibold py-1 px-6  text-sm md:text-base rounded  transition duration-200"
            >
              Add New
            </button>
          </div>

          <form onSubmit={handleSave}>
            <dialog id="my_modal_3" className="modal">
              <div className="modal-box px-2">
                <div className="flex justify-between items-center px-4 mb-2">
                  <p className="text-2xl  ">
                    <b>Add User</b>
                  </p>
                  <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost text-xl md:text-2xl">
                      <IoClose />
                    </button>
                  </form>
                </div>
                <div className="w-full max-w-md mx-auto mb-4">
                  <label className="text-gray-700 text-sm font-bold mb-2">
                    User Name
                  </label>
                  <input
                    className="shadow  text-sm border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
                    id="username"
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">{errors.name[0]}</p>
                  )}
                </div>

                <div className="w-full max-w-md mx-auto mb-4">
                  <label className="text-gray-700 text-sm font-bold mb-2">
                    User Phone Number
                  </label>
                  <input
                    className="shadow text-sm border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
                    id="usernumber"
                    type="number"
                    placeholder="Enter your number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm">{errors.phone[0]}</p>
                  )}
                </div>

                <div className="w-full max-w-md mx-auto mb-4">
                  <label className="text-gray-700 text-sm font-bold mb-2">
                    User Mail
                  </label>
                  <input
                    className="shadow text-sm border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
                    id="useremail"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email[0]}</p>
                  )}
                </div>

                <div className="w-full max-w-md mx-auto mb-4">
                  <label className="text-gray-700 text-sm font-bold mb-2">
                    User Password
                  </label>
                  <input
                    className="shadow text-sm border rounded w-full py-2 px-3 text-gray-700 focus:outline-none "
                    id="userpassword"
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {errors.pass && (
                    <p className="text-red-500 text-sm">{errors.pass[0]}</p>
                  )}
                </div>

                <div className="w-full max-w-md mx-auto mb-4">
                  <label className="text-gray-700 text-sm font-bold mb-2">
                    Confirm Password
                  </label>
                  <input
                    className="shadow text-sm border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
                    id="confirmpassword"
                    type="password"
                    placeholder="Enter password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  {errors.confirm_pass && (
                    <p className="text-red-500 text-sm">
                      {errors.confirm_pass[0]}
                    </p>
                  )}
                </div>

                <div className="modal-action  px-5">
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm rounded font-semibold bg-teal-500 hover:bg-teal-400 text-white"
                  >
                    Save
                  </button>
                </div>
              </div>
            </dialog>
          </form>
        </div>

        <div className="overflow-x-auto overflow-y-hidden my-6">
          <div className="w-full">
            <table className="table text-nowrap">
              <thead className="text-base  text-gray-700 border-b-2">
                <tr>
                  <th className="">SL</th>
                  <th className="">Name</th>
                  <th className="">Number</th>
                  <th className="">Mail</th>
                  <th className="">Password</th>
                  <th className="">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm  text-gray-700 font-medium">
                {users.map((user, index) => (
                  <tr key={user.id || index} className="hover">
                    <th className="text-gray-600">{index + 1}</th>
                    <td className="">{user.name || "No Name"}</td>
                    <td className="">{user.phone || "No Phone"}</td>
                    <td className="">{user.email || "No Email"}</td>
                    <td className="">{user.pass || "No Password"}</td>
                    <td>
                      <div className="dropdown">
                        <button className="md:text-lg ml-5">
                          <CiMenuKebab />
                        </button>
                        <ul
                          tabIndex={0}
                          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                        >
                          <li>
                            <a onClick={() => handleEdit(user)}>
                              <FaRegEdit className="text-green-500 text-lg pl-1" />
                              Edit
                            </a>
                          </li>
                          <li>
                            <a>
                              <MdDeleteForever className="text-red-500 text-lg" />
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
                <form onSubmit={handleEditSave}>
                  <div className="modal-box px-13 ">
                    <div className="flex justify-between items-center  mb-2">
                      <p className="text-2xl">
                        <b>Edit User</b>
                      </p>
                      <button
                        type="button"
                        onClick={closeModal}
                        className="btn btn-sm btn-circle btn-ghost text-2xl"
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
                        className="shadow text-sm border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
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
                        className="shadow border text-sm rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
                        id="usernumber"
                        type="number"
                        placeholder="Enter your number"
                        value={editPhone}
                        onChange={(e) => setEditPhone(e.target.value)}
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
                        className="shadow border text-sm rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
                        id="useremail"
                        type="email"
                        placeholder="Enter your email"
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
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
                        className="shadow border text-sm rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
                        type="password"
                        placeholder="Enter password"
                        value={editPassword}
                        onChange={(e) => setEditPassword(e.target.value)}
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
                        className="shadow border text-sm rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
                        type="password"
                        placeholder="Confirm password"
                        value={editConfirmPassword}
                        onChange={(e) => setEditConfirmPassword(e.target.value)}
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
      </div>
      <Footer_Backend />
    </div>
  );
};

export default User;
