import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa';

const Invoice = () => {
  const [isSelected, setIsSelected] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleSelect = () => {
    setIsSelected(!isSelected); // Toggle the selected state
  };


  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };
  return (
    <div className="mx-4 md:mx-10">
      <div className="w-full shadow py-4 flex pe-4 mb-5">
        <h2 className="px-4 text-xl font-semibold">Invoice Setup</h2>
        <div className="ml-auto flex items-center">
          <select
            name="category_id"
            className="shadow-md border border-gray-300 rounded-lg py-1 px-2 text-gray-700 focus:outline-none focus:ring-2   transition duration-150 ease-in-out"
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

      <div className="shadow-[0_3px_10px_rgb(0,0,0,0.1)] px-10 pb-4 mb-4">
        <br />
        <div className="mb-3 text-xl font-semibold">Business Name Name</div>
        <div className=" flex justify-between flex-col md:flex-row ">
         
<div>
    {/* Toggle and Status */}
    <div className="flex items-center justify-center  mb-4">
          <h1 className="mr-2">{isSelected ? 'Active' : 'InActive'}</h1>
          <input
            type="checkbox"
            className="toggle"
            checked={isSelected}
            onChange={handleToggleSelect}
          />
        </div>

<div className="w-[300px] h-[300px] overflow-auto relative">
 
      <div className="p-4 bg-white rounded-lg shadow-lg">
       

        {/* Existing content */}
        <div className="grid grid-cols-2 gap-16 mb-8">
          <div>
            <div className="bg-gradient-to-r from-blue-500 to-green-400 px-1 transform -skew-x-12">
              <h2 className="text-xl font-bold text-white transform skew-x-12">INVOICE</h2>
            </div>
            <div className="mt-2 text-xs">
              <p>Invoice to:</p>
              <p className="font-semibold">Dwyane Clark</p>
              <p>24 Dummy Street Area,</p>
              <p>Location, Lorem Ipsum, 570XX59x</p>
            </div>
          </div>
          <div className="text-right">
            <div
              className="bg-gradient-to-r from-blue-500 to-green-400 px-1 transform"
              style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 100%, 0 100%)' }}
            >
              <h2 className="text-sm font-bold text-white">Brand Name</h2>
            </div>
            <p className="text-xs">TAGLINE SPACE HERE</p>
            <div className="mt-4 text-xs">
              <p>
                Invoice #: <span className="font-semibold">52148</span>
              </p>
              <p>
                Date: <span className="font-semibold">01 / 02 / 2020</span>
              </p>
            </div>
          </div>
        </div>
        {/* Table content */}
        <div className="border-t-2 border-b-2 border-gray-200">
          <table className="table-auto w-full text-left text-xs">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-1 px-2">SL.</th>
                <th className="py-1 px-2">Item Description</th>
                <th className="py-1 px-2">Price</th>
                <th className="py-1 px-2">Qty.</th>
                <th className="py-1 px-2">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-1 px-2">1</td>
                <td className="py-1 px-2">Lorem Ipsum Dolor</td>
                <td className="py-1 px-2">$50.00</td>
                <td className="py-1 px-2">1</td>
                <td className="py-1 px-2">$50.00</td>
              </tr>
              {/* Additional rows */}
            </tbody>
          </table>
        </div>
        {/* Footer content */}
        <div className="grid grid-cols-2 mt-4 text-xs">
          <div>
            <p className="font-semibold">Thank you for your business</p>
            <div className="mt-2">
              <p>Payment Info:</p>
              <p>Account #: 1234 5678 9012</p>
              <p>A/C Name: Lorem Ipsum</p>
              <p>Bank Details: Add your bank details</p>
            </div>
            <div className="mt-2">
              <p className="font-semibold">Terms & Conditions</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dignissim pretium consectetur.</p>
            </div>
          </div>
          <div className="text-right">
            <p>
              Sub Total: <span className="font-semibold">$220.00</span>
            </p>
            <p>
              Tax: <span className="font-semibold">0.00%</span>
            </p>
            <p>
              Total: <span className="font-semibold">$220.00</span>
            </p>
          </div>
        </div>
        {/* <div className="mt-4 flex justify-end space-x-4">
          <button onClick={handleEditClick} className="px-4 py-2 bg-blue-500 text-white rounded">
            Edit
          </button>
        </div> */}
        {/* Tick mark display */}
        {isSelected && (
          <div className="absolute top-24 right-24 text-white bg-sky-400 p-3 rounded-full cursor-pointer">
            <FaCheck size={24} />
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-lg font-bold mb-4">Edit Invoice</h3>
            {/* Modal content goes here */}
            <p>Edit the details of the invoice here...</p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>





<div className="w-[300px] h-[300px] mx-auto bg-gray-50 shadow-md p-4 rounded-lg overflow-auto flex flex-col justify-between">
  
  <div>
    <div className="flex justify-between items-center mb-4">
      <div>
        <h1 className="text-lg font-bold text-gray-800">HOTEL<span className="text-yellow-500">.</span></h1>
        <p className="text-xs text-gray-600">For Your Vacation</p>
      </div>
      <div className="text-right">
        <h2 className="text-xl font-extrabold text-gray-800">INVOICE</h2>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-2 mb-4 text-gray-700 text-xs">
      <div>
        <p><span className="font-semibold">Invoice No:</span> 000 00123</p>
        <p><span className="font-semibold">Date:</span> 26/06/2023</p>
      </div>
      <div>
        <p><span className="font-semibold">Invoice to:</span></p>
        <p>Luke Coursey</p>
        <p>35 Street Area, London</p>
      </div>
    </div>

    <div className="border border-gray-300 rounded-lg overflow-hidden mb-4">
      <div className="grid grid-cols-4 bg-gray-800 text-white font-bold text-center py-1 text-xs">
        <p>Item Name</p>
        <p>Price</p>
        <p>Qty</p>
        <p>Total</p>
      </div>
      <div className="grid grid-cols-4 text-center py-1 border-b text-gray-800 text-xs">
        <p>Lorem ipsum</p>
        <p>$10.00</p>
        <p>1</p>
        <p>$10.00</p>
      </div>
    </div>

    <div className="flex justify-end mb-4">
      <div className="w-full text-xs">
        <div className="flex justify-between py-1 border-b text-gray-700">
          <p className="font-semibold">Subtotal</p>
          <p>$50.00</p>
        </div>
        <div className="flex justify-between py-1 border-b text-gray-700">
          <p className="font-semibold">Tax</p>
          <p>0.00%</p>
        </div>
        <div className="flex justify-between py-1 text-gray-700">
          <p className="font-semibold">Grand Total</p>
          <p>$50.00</p>
        </div>
      </div>
    </div>
  </div>

  <div className="flex justify-between items-center mt-4">
    <button className="bg-blue-500 text-white py-1 px-3 rounded-lg text-xs hover:bg-blue-600">Edit</button>
    <button className="bg-green-500 text-white py-1 px-3 rounded-lg text-xs hover:bg-green-600">Select</button>
  </div>
</div>











    
        </div>
        <div className="flex justify-end gap-4">
          <div className="flex justify-end mt-4">
            <button className="btn bg-[#28DEFC] hover:bg-[#28DEFC] text-white px-6 text-lg">
              View
            </button>
          </div>
          <div className="flex justify-end mt-4">
            <button className="btn bg-[#28DEFC] hover:bg-[#28DEFC] text-white px-6 text-lg">
              Save
            </button>
          </div>
        </div>
      </div>

          
    </div>
  );
};

export default Invoice;


