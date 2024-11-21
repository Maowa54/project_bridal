import { useState, useEffect ,} from "react";
import Sidebar from "./Sidebar";
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import { FaBars } from "react-icons/fa";
import MainContent from "./MainContent";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Register/Login/Login";
import Otp from "../Pages/Register/Otp";
import { IoIosNotifications } from "react-icons/io";
import axios from "axios";
import Order from "../Pages/Frontend/Order";

import AllProduct from "../Pages/Frontend/Allproduct";
import Home from "../Pages/Frontend/Home";
import Singleproduct from "../Pages/Frontend/Singleproduct";
import ThankYou from "../Pages/Frontend/ThankYou";
import Navbar from "../Component/Frontend/Navbar";
import Footer from "../Component/Frontend/Footer";
import PreOrder from "../Pages/Frontend/PreOrder";

// Scroll to top component to ensure page scrolls to top on route change
const ScrollToTop = () => {
  const location = useLocation(); // Get current location (path)
  
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when route changes
  }, [location]); // Trigger effect when location changes
  
  return null;
};


function App() {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [hasRendered, setHasRendered] = useState(false);


  useEffect(() => {
    if (token) {
      const fetchUserData = async () => {
        try {
          const clientId = localStorage.getItem("clientId");
          if (!clientId) {
            setError("Please log in.");
            return;
          }
          const response = await axios.get(
            `https://admin.attireidyll.com/api/dashboard/${clientId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          response.data.status
            ? setUserInfo(response.data.data)
            : setError(response.data.message);
        } catch (error) {
          setError("Error fetching user data.");
          console.error("Error:", error);
        }
      };
      fetchUserData();
    }
  }, [token]);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 900);
      setIsSidebarOpen(window.innerWidth >= 900);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    setHasRendered(true);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const handleSidebarItemClick = () => isSmallScreen && setIsSidebarOpen(false);

  return (
    <div className="relative">
      <Router>
      <ScrollToTop /> {/* Add ScrollToTop component here */}

        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/allProduct" element={<AllProduct />} />
          <Route path="/singleProduct" element={<Singleproduct />} />
          <Route path="/preorder" element={<PreOrder />} />

          <Route path="/Order" element={<Order />} />
          <Route path="/thankyou" element={<ThankYou />} />

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/otp" element={<Otp />} />
          <Route
            path="/*"
            element={
              token ? (
                hasRendered && (
                  <div className="">
                    <Sidebar
                      isOpen={isSidebarOpen}
                      closeSidebar={handleSidebarItemClick}
                    />
                    {isSmallScreen && isSidebarOpen && (
                      <div
                        className="fixed inset-0 bg-black opacity-50 z-10"
                        onClick={toggleSidebar}
                      ></div>
                    )}
                    <div
                      className={`flex-1 min-h-screen transition-all ${
                        isSidebarOpen && !isSmallScreen ? "ml-64" : "ml-0"
                      } ${isSidebarOpen && isSmallScreen ? "shadow-xl" : ""}`}
                    >
                      <header
                        className={`fixed top-0 left-0 right-0 bg-gradient-custom text-white p-4 flex justify-between items-center z-20 transition-all ${
                          isSidebarOpen && isSmallScreen ? "shadow-lg" : ""
                        }`}
                        style={{
                          height: "60px",
                          marginLeft:
                            isSidebarOpen && !isSmallScreen ? "16rem" : "0",
                        }}
                      >
                        <div className="flex gap-3">
                          <button onClick={toggleSidebar} className="text-xl">
                            {isSidebarOpen ? (
                              <HiMiniBars3CenterLeft />
                            ) : (
                              <FaBars />
                            )}
                          </button>
                          <h1 className="text-2xl">Panda Pos</h1>
                        </div>
                        <button className="text-xl">
                          <IoIosNotifications size={30} />
                        </button>
                      </header>
                      <main className="pt-16 p-4">
                        <MainContent userInfo={userInfo} error={error} />
                      </main>
                    </div>
                  </div>
                )
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
     
      </Router>
    </div>
  );
}

export default App;
