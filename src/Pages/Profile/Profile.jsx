import React, { useRef } from "react";

const Profile = () => {
  // Create a ref for the hidden file input
  const fileInputRef = useRef(null);

  // Handle button click to trigger the file input click
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  return (
    <div className="mx-4 md:mx-10">
      <div className="w-full shadow py-4 flex pe-4">
        <h2 className="px-4 text-xl font-semibold">Add Business</h2>
      </div>

      <div className="shadow-[0_1px_10px_rgb(0,0,0,0.1)] py-4 pe-4 mt-5 px-5 flex flex-col md:flex-row">
        <div className="w-[100%] md:w-[50%]">
          <div className="w-[100%] mb-4">
            <p>User Name</p>
            <input
              type="text"
              className="shadow-[0_2px_10px_rgb(0,0,0,0.1)] md:w-[90%] w-[100%] py-2"
            />
          </div>

          <div className="w-[100%] mb-4">
            <p>Phone Number</p>
            <input
              type="Number"
              className="shadow-[0_2px_10px_rgb(0,0,0,0.1)] md:w-[90%] w-[100%] py-2"
            />
          </div>

          <div className="w-[100%] mb-4">
            <p>Email</p>
            <input
              type="mail"
              className="shadow-[0_2px_10px_rgb(0,0,0,0.1)] md:w-[90%] w-[100%] py-2"
            />
          </div>
        </div>

        <div className=" flex flex-col md:flex-row md:justify-between justify-center  w-[100%] md:w-[50%]">
        <div className=" mb-4 flex flex-col items-center mt-5 md:mt-0">
          <p>Profile Photo</p>
          <div className="mt-5">
            <div className="w-40 h-40 rounded-full bg-gray-100 shadow-lg"></div>
          </div>
          <div>
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }} // Hide the file input
        onChange={(e) => console.log(e.target.files[0])} // Handle file selection
      />

      {/* Button that triggers file input */}
      <button
        className="w-20 h-8 bg-[#28DEFC] mt-4 text-white rounded"
        onClick={handleButtonClick}
      >
        <b>Upload</b>
      </button>
    </div>        </div>

        <div className=" mb-4 mt-5 md:mt-0">
          <p>Joined at : 01/02/2024</p>
          <p>Package : Standard</p>
        </div>
        </div>
      
      </div>

      <div className=" shadow-[0_1px_10px_rgb(0,0,0,0.1)] py-4 pe-4 mt-5 px-5">
        <div className="w-[100%] mb-4 flex items-center gap-4">
          <p>Referral Link</p>
          <input
            type="text"
            className="shadow-[0_2px_10px_rgb(0,0,0,0.1)] md:w-[40%] w-[100%] py-2"
          />
        </div>
      </div>

      <div className="ml-auto flex items-center mt-5 justify-end">
          {/* The button to open modal */}
          <button className=" bg-[#28DEFC] text-white font-semibold py-3 px-6 rounded cursor-pointer">
            Update
          </button>
        </div>  
    </div>
  );
};

export default Profile;
