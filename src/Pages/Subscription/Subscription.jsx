import sampleImg from '../../../assets/package_image.png'; 
import { TbMessage } from "react-icons/tb";
import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { Link } from 'react-router-dom';

const Subscription = () => {

  const [packages, setPackages] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState(0); 
  const [selectedPackage, setSelectedPackage] = useState(null);

  const fetchApiData = async () => {
    try {
      const response = await axios.get(
        `https://admin.attireidyll.com/api/package/all/get`,
      
      );
      if (response.data.status) {
        setPackages(response.data.data);
        console.log("API Data fetched: ", response.data.data);
      }
    } catch (error) {
      console.error("Error fetching API data:", error);
    }
  };

  useEffect(() => {
    fetchApiData();
  }, []);

  console.log(packages)



  const handlePurchaseClick = (pkg) => {
    setSelectedPackage(pkg); // Set the selected package
  };
  



  return (


    <div>

<div className="w-full shadow py-4 flex pe-4">
                <h2 className="px-4 text-xl font-semibold">Packages & Subscription</h2>
                
            </div>
            <div className="flex flex-col md:flex-row md:gap-5 lg:gap-10 justify-center my-7">
       {packages.map((pkg) => (
        <div key={pkg.id} className="flex flex-col items-center col-md-4 mb-4">
          <div className="flex justify-center">
            <div className="w-full flex justify-center">
              <div className="relative w-full px-8 md:px-10 py-6 bg-white rounded-2xl shadow-lg text-center">
                <div className="text-5xl font-bold text-blue-600">
                  <span className="text-4xl">৳</span>{pkg.price}
                </div>
                <h3 className="my-3 text-xl">{pkg.name}</h3>
                <img src={sampleImg} alt="Package Image" className="w-20 mb-5 mx-auto" />
                <ul className="p-0">
                  <h1 className="my-2 text-sky-600">Business: {pkg.business}</h1>
                  <h1 className="my-2 text-sky-600">User: {pkg.user}</h1>
                  <h1 className="my-2 text-sky-600">SMS: {pkg.sms}</h1>
                  <h1 className={`my-2 ${pkg.product ? 'text-sky-600' : 'text-gray-400'}`}>
                    Product: {pkg.product || 'N/A'}
                  </h1>
                  <h1 className={`my-2 ${pkg.data ? 'text-sky-600' : 'text-gray-400'}`}>
                    Data: {pkg.data || 'N/A'}
                  </h1>
                </ul>
                <div>
                  <button 
                    className="mt-5 btn bg-white rounded-full border border-sky-500 text-sky-500 hover:text-black" 
                    onClick={() => handlePurchaseClick(pkg)} // Handle click event
                  >
                    Purchase The Plan Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>

    <div className="px-4 custom-shadow py-4">
                <h2 className="text-2xl font-semibold">Message Count</h2>

                <h2 className=' text-xl mt-6'>Message Remaining <input type='text' className=' border h-10 shadow-md md:mx-3 px-4 border-gray-100' /> </h2>


                <div className=' grid lg:grid-cols-12 md:grid-cols-6 grid-cols-2 gap-5 mt-5'>
                    <div className=' col-span-2 custom-shadow  flex  flex-col items-center rounded-xl space-y-2 py-4 px-2'>
                        <TbMessage   size={28} color='blue'/>
                        <h1><span className=' font-semibold'>5,000</span> Message</h1>
                        <h1>BDT : <span className=' font-semibold'>0.28 / SMS</span></h1>
                    </div>
                    <div className=' col-span-2 custom-shadow  flex  flex-col items-center rounded-xl space-y-2 py-4 px-2'>
                        <TbMessage   size={28} color='blue'/>
                        <h1><span className=' font-semibold'>10,000</span> Message</h1>
                        <h1>BDT : <span className=' font-semibold'>0.25 / SMS</span></h1>
                    </div>
                    <div className=' col-span-2 custom-shadow  flex  flex-col items-center rounded-xl space-y-2 py-4 px-2'>
                        <TbMessage   size={28} color='blue'/>
                        <h1><span className=' font-semibold'>20,000</span> Message</h1>
                        <h1>BDT : <span className=' font-semibold'>0.20 / SMS</span></h1>
                    </div>
                    <div className=' col-span-2 custom-shadow  flex  flex-col items-center rounded-xl space-y-2 py-4 px-2'>
                        <TbMessage   size={28} color='blue'/>
                        <h1><span className=' font-semibold'>22,000</span> Message</h1>
                        <h1>BDT : <span className=' font-semibold'>0.18 / SMS</span></h1>
                    </div>
                    <div className=' col-span-2 custom-shadow  flex  flex-col items-center rounded-xl space-y-2 py-4 px-2'>
                        <TbMessage   size={28} color='blue'/>
                        <h1><span className=' font-semibold'>25,000</span> Message</h1>
                        <h1>BDT : <span className=' font-semibold'>0.15 / SMS</span></h1>
                    </div>
                    <div className=' col-span-2 custom-shadow  flex  flex-col items-center rounded-xl space-y-2 py-4 px-2'>
                        <TbMessage   size={28} color='blue'/>
                        <h1><span className=' font-semibold'>30,000</span> Message</h1>
                        <h1>BDT : <span className=' font-semibold'>0.10 / SMS</span></h1>
                    </div>

                </div>

                <h1 className=' text-center mt-5 '>Select a package and continue to purchase message</h1>

                
            </div>
   
            <div className="w-full shadow py-4 flex my-4">
  <h2 className="px-4 text-xl font-semibold">
    Total Payable: {selectedPackage ? `${selectedPackage.price} BDT` : '0 BDT'}
  </h2>
  <div className="ml-auto flex items-center">
    {selectedPackage ? (
     <Link 
     to="/checkout"
     state={{ selectedPackage }}
     className='btn bg-sky-400 hover:bg-green-400 text-white text-xl'
   >
     Make Purchase
   </Link>
    ) : (
      <button 
        className='btn bg-sky-400 hover:bg-green-400 text-white text-xl'
        disabled
      >
        Make Purchase
      </button>
    )}
  </div>
</div>

    </div>
  )
}

export default Subscription
