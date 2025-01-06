import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";
import { ImSpinner10 } from "react-icons/im";
import Swal from "sweetalert2";

export default function VideoDrawer({ isOpen, toggleDrawer, productVideo, onVideoSelect }) {

  const [video, setVideo] = useState([]);


  const [videos, setVideos] = useState([]);
  const [errors, setErrors] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedTopIndex, setSelectedTopIndex] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [videoProduct, setVideoProduct] = useState("");

  // useEffect(() => {
  //   if (videoProduct) {
  //     productVideo(videoProduct);
  //   }
  // }, [videoProduct, productVideo]);

  const clientId = localStorage.getItem("clientId");
  const token = localStorage.getItem("token");



  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setSelectedFile(URL.createObjectURL(e.target.files[0]));
      setVideo(e.target.files[0]);
    }
  };



  // const handleFileChange = (e) => {
  //   if (e.target.files[0]) {
  //     setSelectedFile(URL.createObjectURL(e.target.files[0]));
  //   }
  // };

  const handleVideoUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      toast.error("Please select a video first!");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("video", video);

    for (let [key, value] of formData.entries()) {
    }

    try {
      const response = await axios.post(
        "https://admin.attireidyll.com/api/product/video/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.status) {
        toast.success(response.data.message || "Video uploaded successfully!", {
          duration: 2000,
          position: "top-right",
        });

        setErrors({});
        setSelectedFile(null); // Clear the selected file after upload
        fetchVideos(); // Refresh video list
      } else {
        setErrors(response.data.error || {});
      }
    } catch (error) {
      console.error(
        "Error uploading video:",
        error.response ? error.response.data : error.message
      );
      toast.error(
        "An error occurred while uploading the video. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchVideos = async () => {
    try {
      const response = await axios.get(
        `https://admin.attireidyll.com/api/product/video/get`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setVideos(response.data.data || []);
    } catch (error) {
      console.error(
        "Error fetching videos:",
        error.response ? error.response.data : error.message
      );
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);


  const handleVideoSelect = (id) => {


    const selectedVideo = videos.find((video) => video.id === id);

    if (selectedVideo) {

      setSelectedTopIndex(id);
    }
  };



  const handleDeleteVideo = async (id) => {
    // Show a confirmation dialog
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.delete(
          `https://admin.attireidyll.com/api/product/video/delete/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response)
        if (response.data.status) {
          Swal.fire(
            "Deleted!",
            response.data.message || "Video deleted successfully.",
            "success"
          );
          fetchVideos();

        } else {
          Swal.fire(
            "Error!",
            response.data.message || "Video to delete Image.",
            "error"
          );
        }
      } catch (error) {
        console.error(
          "Error deleting Video:",
          error.response ? error.response.data : error.message
        );
        Swal.fire("Error!", "Failed to delete Video.", "error");
      }
    }
  };

  return (
    <div
      className={`fixed z-50 inset-0 bottom-0 bg-white shadow-lg transition-transform transform h-[100%] ${isOpen ? "translate-y-0" : "translate-y-full"
        }`}
    >
      <div className="h-screen flex flex-col justify-between pb-40 overflow-y-scroll">

        <div className="px-4 mb-6 w-full text-lg  bg-gray-100 h-16 flex items-center justify-between shadow-md rounded-lg">
          <span className="text-gray-800 font-semibold">Recently uploaded files</span>
          <div className="flex justify-end">
            <button
              className="mr-4 text-[30px] cursor-pointer hover:text-[#28DEFC]"
              onClick={toggleDrawer}
            >
              <IoClose />
            </button>
          </div>
        </div>

        <div className="flex justify-between mx-4 gap-2">
          <div className="flex flex-row gap-3">
            {videos.slice(0, 3).map((video) => (
              <div
                key={video.id}
                className={`relative bg-white shadow w-full cursor-pointer transition duration-200 border-2 ${selectedTopIndex === video.id
                  ? "border-blue-500"
                  : ""
                  }`}
                onClick={() => {
                  handleVideoSelect(video.id, videos);
                  onVideoSelect(video.name);
                }}>
                <video
                  src={`https://pub-c053b04a208d402dac06392a3df4fd32.r2.dev/video/${video.name}`}
                  alt={video.name || "Video"} // Use a meaningful alt tag
                  className="h-40 w-full object-cover"
                ></video>
                <div className="w-full p-3 bg-white shadow-md text-sm">
                  <span>{video.name || "Image Name"}</span>
                </div>
                {selectedTopIndex === video.id && (
                  <div className="absolute flex items-center justify-center w-5 h-5 bg-green-500 text-white rounded-full top-2 right-2">
                    ✓ {/* Checkmark symbol */}
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => handleDeleteVideo(video.id)} className="rounded relative w-full cursor-pointer bg-white hover:text-red-500 duration-300 shadow py-1 border border-gray-500 hover:border-red-500 font-light"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            {selectedFile && (
              <div className="ml-4">
                <video
                  src={selectedFile}
                  className="h-52 w-auto border-2 border-blue-500"
                  controls
                ></video>
              </div>
            )}
            <div className="flex justify-center items-center border-4 border-dashed border-[#606BD0] bg-white h-52 w-full">
              <form onSubmit={handleVideoUpload}>
                <div className="text-center px-2">
                  <input
                    type="file"
                    className="block h-10 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                    accept="video/*"
                    onChange={handleFileChange}
                  />
                  <button
                    className="mt-3 bg-blue-500 text-white py-2 px-4 rounded"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex justify-center w-full">
                        <ImSpinner10
                          className="animate-spin text-white"
                          size={20}
                        />
                        <span className="px-2">Uploading...</span>
                      </div>
                    ) : (
                      <h1 className="font-bold">Upload</h1>
                    )}
                  </button>
                  {errors.video && (
                    <p className="text-red-500 text-sm">
                      {errors.video[0]}
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="px-4 my-4 text-lg bg-gray-100 h-16 flex items-center justify-between shadow-md rounded-lg">
          <span className="text-gray-800 font-semibold">Previously uploaded files</span>
        </div>

        <div className="mx-4">
          <div className="w-full">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 grid-flow-row">
              {videos.slice(3).map((video) => (
                <div
                  key={video.id}
                  className={`relative bg-white shadow w-full cursor-pointer transition duration-200 border-2 ${selectedTopIndex === video.id
                    ? "border-blue-500"
                    : ""
                    }`}
                  onClick={() => {
                    handleVideoSelect(video.id, videos);
                    onVideoSelect(video.name);
                  }}>
                  <video
                    src={`https://pub-c053b04a208d402dac06392a3df4fd32.r2.dev/video/${video.name}`}
                    alt={video.name || "Video"} // Use a meaningful alt tag
                    className="h-40 w-full object-cover"
                  ></video>
                  <div className="w-full p-3 bg-white shadow-md text-sm">
                    <span>{video.name || "Image Name"}</span>
                  </div>
                  {selectedTopIndex === video.id && (
                    <div className="absolute flex items-center justify-center w-5 h-5 bg-green-500 text-white rounded-full top-2 right-2">
                      ✓ {/* Checkmark symbol */}
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => handleDeleteVideo(video.id)} className="rounded relative w-full cursor-pointer bg-white hover:text-red-500 duration-300 shadow py-1 border border-gray-500 hover:border-red-500"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 right-0 left-0 w-full text-center bg-white py-2 shadow">
          <button
            type="submit"
            onClick={toggleDrawer}
            className="bg-[#28DEFC] text-white px-4 py-2 rounded w-80"
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );
}
