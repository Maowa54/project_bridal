// CheckOut.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import sampleImg from '../../../assets/package_image.png';

const CheckOut = () => {
  const location = useLocation();
  const selectedPackage = location.state?.selectedPackage;

  return (
    <div >
      <div className="w-full shadow py-4 flex pe-4 mb-10
      ">
                <h2 className="px-4 text-xl font-semibold">CheckOut Page</h2>
                
            </div>
            <div className="">
  {selectedPackage ? (
    <div key={selectedPackage.id} className="grid  grid-cols-1 md:grid-cols-12 gap-6 md:gap-16">
      <div className="flex col-span-1 md:col-span-4 px-4 md:px-10 py-24 md:py-8 custom-shadow justify-center">
        <div className="w-full flex justify-center">
          <div className="relative w-[90%] px-4 md:px-4 py-6 bg-white rounded-2xl shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] text-center">
            <div className="text-4xl md:text-2xl  text-center font-bold text-blue-600">
              <span className="text-3xl md:text-2xl">৳</span>{selectedPackage.price}
            </div>
            <h3 className="my-2 md:my-3 text-lg md:text-xl">{selectedPackage.name}</h3>
            <img src={sampleImg} alt="Package Image" className="w-16 md:w-20 mb-4 md:mb-5 mx-auto" />
            <ul className="p-0">
              <h1 className="my-1 md:my-2 text-sky-600">Business: {selectedPackage.business}</h1>
              <h1 className="my-1 md:my-2 text-sky-600">User: {selectedPackage.user}</h1>
              <h1 className="my-1 md:my-2 text-sky-600">SMS: {selectedPackage.sms}</h1>
              <h1 className={`my-1 md:my-2 ${selectedPackage.product ? 'text-sky-600' : 'text-gray-400'}`}>
                Product: {selectedPackage.product || 'N/A'}
              </h1>
              <h1 className={`my-1 md:my-2 ${selectedPackage.data ? 'text-sky-600' : 'text-gray-400'}`}>
                Data: {selectedPackage.data || 'N/A'}
              </h1>
            </ul>
            <div>
              <button 
                className="mt-4 md:mt-5 btn bg-white rounded-full border border-sky-500 text-sky-500 hover:text-black px-4 py-2"
              >
                Purchase The Plan Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-1 md:col-span-7">
        <div className="custom-shadow p-4 md:p-6 space-y-3">
          <h1 className="font-bold text-lg md:text-xl">Invoice & Contact Info</h1>
          <h1>Business Name: : Business Name:</h1>
          <h1>Phone Number: : 01710000001</h1>
          <h1>Email: example@gmail.com</h1>
          <h1>User Id: example@gmail.com</h1>
        </div>
        <div className="custom-shadow p-4 md:p-6 my-4 md:my-5 space-y-3">
          <h1 className="font-bold text-lg md:text-xl">Order Summary</h1>
          <h1>Package Name: : Silver:</h1>
          <h1>Package Price: : : 1000 BDT</h1>
          <hr />
          <h1>Total: 1000 BDT</h1>
        </div>
        <div>
          <h1 className="text-lg md:text-xl mb-2">Voucher</h1>
          <div className="flex flex-col gap-2 md:flex-row justify-between items-center space-y-3 md:space-y-0">
            <div className="flex space-x-3">
              <input type="text" className="input input-bordered w-full md:max-w-xs" />
              <button className="bg-sky-400 text-white py-2 md:py-3 px-4 md:px-5 rounded-lg">Apply</button>
            </div>
            <button className="bg-sky-400 text-white py-2 md:py-3 px-4 md:px-5 rounded-lg">Proceed To Apply</button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <p>No package selected</p>
  )}
</div>


   
    </div>
  );
};

export default CheckOut;
