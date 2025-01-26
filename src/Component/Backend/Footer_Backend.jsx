import React from 'react';

const Footer_Backend = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        {/* Your content goes here */}
      </div>

      <footer className="w-full bg-white mt-auto">
        <div className="font-medium shadow-lg rounded text-gray-600 text-sm px-4 py-2 flex flex-col md:flex-row justify-between items-center gap-2">
          <a
            href="https://expressitbd.net/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-center md:text-left"
          >
            <p className="text-sm">
              Designed and developed by{" "}
              <span className="ml-1 font-airstrip text-nowrap font-semibold text-blue-800 hover:text-blue-700">
                Express{" "}
                <span className="relative font-sans text-base md:text-lg text-white font-bold bg-pink-700 px-1 mr-1">
                  IT
                  <span className="absolute border-l-[5px] border-l-transparent border-r-transparent border-t-[5px] border-t-pink-700 right-0 top-full"></span>
                </span>
                bd
              </span>
            </p>
          </a>
          <span className="mr-0 md:mr-2 font-semibold text-center">
            <span className="mr-2">Attire Idyll</span> v1.0.0
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Footer_Backend;
