import { useEffect, useState } from "react";
import userr from "../../../assets/file.png";
import Footer_Backend from "../../Component/Backend/Footer_Backend";
import { Link } from "react-router-dom";
import {
  FaCheck,
  FaClock,
  FaCloudSun,
  FaEye,
  FaRegEdit,
  FaShoppingCart,
  FaTruck,
  FaUndo,
  FaArrowDown,
  FaTimesCircle,
  FaDollarSign,
  FaCreditCard,
  FaCalendarAlt,
  FaChartBar,
  FaChartLine,
  FaCashRegister,
  FaCheckCircle,
  FaUsers,
  FaEnvelope,
  FaFolder,
  FaTimes,
  FaCalendar,
} from "react-icons/fa";
import { Tooltip as ReactTooltip } from "react-tooltip";

import axios from "axios";
import { Doughnut, Line } from "react-chartjs-2"; // Combined imports for charts
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
} from "chart.js";
import { MdDeleteForever } from "react-icons/md";
import { CiMenuKebab } from "react-icons/ci";
import Swal from "sweetalert2";

// Register all required ChartJS components once
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title
);

const Dashboard = () => {
  const token = localStorage.getItem("token");
  const clientId = localStorage.getItem("clientId");

  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("Last 7 Days"); // Default value

  const handleOptionClick = (value) => {
    setSelectedValue(value); // Update the selected value
    setIsOpen(false); // Close the dropdown
  };

  const [currentDate, setCurrentDate] = useState("");
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const updateGreetingAndDate = () => {
      // Create a new Date object and convert it to Dhaka time
      const dhakaDate = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Dhaka",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(new Date());

      setCurrentDate(dhakaDate);

      // Get the current hour in Dhaka time
      const currentHour = new Date().toLocaleString("en-BD", {
        timeZone: "Asia/Dhaka",
        hour: "numeric",
        hour12: false,
      });

      // Set the greeting based on the current hour
      if (currentHour < 5) {
        setGreeting("Good Morning!");
      } else if (currentHour < 17) {
        setGreeting("Good Noon!");
      } else if (currentHour < 22) {
        setGreeting("Good Evening!");
      } else {
        setGreeting("Good Night!");
      }
    };

    updateGreetingAndDate(); // Initial call to set the date and greeting immediately
    const intervalId = setInterval(updateGreetingAndDate, 1000 * 60 * 60); // Update every hour

    return () => clearInterval(intervalId); // Clean up on component unmount
  }, []);

  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      // Create a new Date object and convert it to Dhaka time, formatted to show only hours and minutes in 12-hour format
      const dhakaTime = new Date().toLocaleString("en-BD", {
        timeZone: "Asia/Dhaka",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true, // Set to true for 12-hour format
        // Add 'dayPeriod' to get AM/PM
        hourCycle: "h12", // Ensure 12-hour cycle for consistency
      });
      setCurrentTime(dhakaTime);
    };

    // Update time every second
    const intervalId = setInterval(updateTime, 1000);
    updateTime(); // Initial call to set the time immediately

    return () => clearInterval(intervalId); // Clean up on component unmount
  }, []);

  const [pageSize, setPageSize] = useState(10); // Default page size

  const [displayOrders, setDisplayOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      const localStorageKey = "orders";
      const cachedData = localStorage.getItem(localStorageKey);
      const now = Date.now();

      if (cachedData) {
        const { timestamp, orders } = JSON.parse(cachedData);
        if (now - timestamp < 2 * 60 * 1000) {
          // Use cached data
          setDisplayOrders(orders);
          setFilteredOrders(orders);
          return;
        }
      }

      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://admin.attireidyll.com/api/orders/all/get`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.status) {
          const orders = response.data.data.data;
          setDisplayOrders(orders);
          setFilteredOrders(orders);

          localStorage.setItem(
            localStorageKey,
            JSON.stringify({ timestamp: now, orders })
          );
        } else {
          console.error("Failed to fetch orders:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false); // End loading
      }
    };

    fetchOrders();
  }, [token]);

  console.log(displayOrders);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  }

  function formatTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }

  // Slice the orders array based on pageSize
  const orders = filteredOrders.slice(0, pageSize);

  console.log(orders);

  orders.forEach((order, index) => {
    console.log(`Order ${index + 1}:`, order.order_products);
  });

  const [getStock, setGetStock] = useState([]);

  const [counts, setCounts] = useState([]);

  const counting = async () => {
    try {
      const cacheKey = `count${clientId}`;
      const cacheTimeKey = `count${clientId}_timestamp`;
      const cacheValidityDuration = 60 * 60 * 1000; // 1 hour

      const cachedData = localStorage.getItem(cacheKey);
      const cachedTimestamp = localStorage.getItem(cacheTimeKey);

      const now = Date.now();

      // if (cachedData && cachedTimestamp && (now - cachedTimestamp < cacheValidityDuration)) {
      //   // Use cached data if within the validity duration
      //   setGetStock(JSON.parse(cachedData));
      //   return;
      // }

      // Otherwise, make the API call
      const response = await axios.get(
        `https://admin.attireidyll.com/api/dashboard/count`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // const counts = response.data.data || [];

      setCounts(response.data.data);

      // console.log(counts);

      // console.log(counts.this_month_sell);

      // Store the fetched data in cache along with the timestamp
      localStorage.setItem(cacheKey, JSON.stringify(counts));
      localStorage.setItem(cacheTimeKey, now.toString());

      // localStorage.removeItem(cacheKey);
      // localStorage.removeItem(cacheTimeKey);

      // Update the state with the fetched data
      // setGetStock(products);
    } catch (error) {
      console.error(
        "Error fetching products:",
        error.response ? error.response.data : error.message
      );
    }
  };

  useEffect(() => {
    counting();
  }, [token, clientId]);

  const fetchProducts = async () => {
    try {
      // const cacheKey = `getStock${clientId}`;
      // const cacheTimeKey = `getStock${clientId}_timestamp`;
      // const cacheValidityDuration = 60 * 60 * 1000; // 1 hour

      // const cachedData = localStorage.getItem(cacheKey);
      // const cachedTimestamp = localStorage.getItem(cacheTimeKey);

      // const now = Date.now();

      // if (
      //   cachedData &&
      //   cachedTimestamp &&
      //   now - cachedTimestamp < cacheValidityDuration
      // ) {
      //   // Use cached data if within the validity duration
      //   setGetStock(JSON.parse(cachedData));
      //   return;
      // }

      // Otherwise, make the API call
      const response = await axios.get(
        `https://admin.attireidyll.com/api/product/get`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const products = response.data?.data.data || [];

      setGetStock(products);
    } catch (error) {
      console.error(
        "Error fetching products:",
        error.response ? error.response.data : error.message
      );
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [token, clientId]);

  console.log(getStock);

  // get order

  console.log(orders);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cacheKey = `dashboardData_${clientId}`;
        const cachedData = localStorage.getItem(cacheKey);
        const cacheTimestamp = localStorage.getItem(`${cacheKey}_timestamp`);
        const cacheExpiryTime = 1 * 60 * 1000; // Cache expiry time: 5 minutes

        // Check if cached data is available and not expired
        if (
          cachedData &&
          cacheTimestamp &&
          Date.now() - cacheTimestamp < cacheExpiryTime
        ) {
          const { mostSoldCategories, courierCounts, salesBySource } =
            JSON.parse(cachedData);
          setMostSoldCategories(mostSoldCategories);
          setCourierCounts(courierCounts);
          setSalesBySource(salesBySource);
          console.log("Loaded data from cache");
        } else {
          // Fetch fresh data from the API
          const response = await axios.get(
            `https://admin.attireidyll.com/api/dashboard/count`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          // Destructure and store the data
          const { mostSoldCategories, courierCounts, salesBySource } =
            response.data.data;
          setMostSoldCategories(mostSoldCategories);
          setCourierCounts(courierCounts);
          setSalesBySource(salesBySource);

          // Save the new data to localStorage
          const newCacheData = {
            mostSoldCategories,
            courierCounts,
            salesBySource,
          };
          localStorage.setItem(cacheKey, JSON.stringify(newCacheData));
          localStorage.setItem(`${cacheKey}_timestamp`, Date.now());
          console.log("Fetched new data and updated cache");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [clientId, token]);

  const [users, setUsers] = useState([]);

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
  console.log(users);

  const cards = [
    {
      icon: FaArrowDown,
      value: "0",
      label: "Picked Up Orders",
      textColor: "text-blue-800",
      iconBg: "bg-blue-100",
    },
    {
      icon: FaTimes,
      value: "2",
      label: "Cancelled Orders",
      textColor: "text-orange-800",
      iconBg: "bg-orange-100",
    },
    {
      icon: FaTruck,
      value: "1",
      label: "Out For Delivery",
      textColor: "text-yellow-800",
      iconBg: "bg-yellow-100",
    },
    {
      icon: FaDollarSign,
      value: "62",
      label: "Paid Orders",
      textColor: "text-green-800",
      iconBg: "bg-green-100",
    },
    {
      icon: FaCreditCard,
      value: "134",
      label: "Unpaid Orders",
      textColor: "text-blue-800",
      iconBg: "bg-blue-100",
    },
    {
      icon: FaCalendarAlt,
      value: "৳0.00",
      label: "Today's Earning",
      textColor: "text-orange-800",
      iconBg: "bg-orange-100",
    },

    {
      icon: FaChartLine,
      value: "৳0.00",
      label: "This Year Earning",
      textColor: "text-green-800",
      iconBg: "bg-green-100",
    },
    {
      icon: FaCalendar,
      value: "543",
      label: "Today's Product Sale",
      textColor: "text-orange-800",
      iconBg: "bg-orange-100",
    },

    {
      icon: FaShoppingCart,
      value: "543",
      label: "Total Product Sale",
      textColor: "text-orange-800",
      iconBg: "bg-orange-100",
    },
    {
      icon: FaCheckCircle,
      value: "0",
      label: "This Month's Product Sale",
      textColor: "text-green-800",
      iconBg: "bg-green-100",
    },
    {
      icon: FaChartBar,
      value: "0",
      label: "This Year's Product Sale",
      textColor: "text-blue-800",
      iconBg: "bg-blue-100",
    },
    {
      icon: FaUsers,
      value: "101",
      label: "Total Customers",
      textColor: "text-orange-800",
      iconBg: "bg-orange-100",
    },

    {
      icon: FaFolder,
      value: "14",
      label: "Total Categories",
      textColor: "text-green-800",
      iconBg: "bg-green-100",
    },
  ];

  const handleDelete = async (id) => {
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
          `https://admin.attireidyll.com/api/order/delete/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.status) {
          Swal.fire(
            "Deleted!",
            response.data.message || "Order deleted successfullyyy."
          );

          // Remove the deleted SMS from the state
          setDisplayOrders((prevSms) => prevSms.filter((sms) => sms.id !== id));
        } else {
          Swal.fire(
            "Error!",
            response.data.message || "Failed to delete order.",
            "error"
          );
        }
      } catch (error) {
        console.error(
          "Error deleting order:",
          error.response ? error.response.data : error.message
        );
        Swal.fire("Error!", "Failed to delete order.", "error");
      }
    }
  };

  return (
    <div className="">
      {/* header */}

      <div className=" relative">
        <div className="bg-[#18D4AB] text-white mb-4 shadow-md flex flex-col md:flex-row md:justify-between  items-center rounded-md min-w-[320px] w-full">
          <div className="flex items-center p-3">
            <div className="hidden md:flex flex-col justify-center items-center space-y-1">
              <FaCloudSun size={25} className="text-yellow-400" />
              <h1 className="font-medium">Partly Cloudly</h1>
            </div>
            <div className="md:border-l-2 border-dashed h-16 md:mx-4"></div>
            <div className="ml-5">
              <h1 className="font-semibold">{currentDate}</h1>
              <div className="md:flex md:flex-col  lg:block">
                <big className="text-lg md:text-2xl font-semibold">
                  {greeting}
                </big>
                <small className="font-medium mx-2">
                  Here's What Happening in your store today!
                </small>
              </div>
            </div>
          </div>

          <div className="flex items-center mb-2 flex-row">
            <div className="md:absolute static right-20 bottom-2 ">
              <img src={userr} className="w-16 md:w-32" alt="" />
            </div>
            <div className="mt-2 mr-2">
              <h1>Every Time</h1>
              <h1 className="font-semibold md:text-xl text-xs">
                {currentTime}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-2 ">
        <div className="grid font-semibold grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-3">
          {[
            {
              title: "Sales Today",
              count: Math.floor(counts.todaySell),
              unit: "৳",
              icon: "fa-solid fa-chart-line",
            },

            {
              title: "Total Sales",
              count: Math.floor(counts.totalSell),
              unit: "৳",
              dropdown: true,
            },

            {
              title: "Total Orders",
              count: Math.floor(counts.todays_orders),
              unit: "",
              icon: "fa-solid fa-box",
            },

            {
              title: "Top 4 Category Sales",
              count: Math.floor(counts.this_month_sell),
              unit: "",
              pieChartData: {
                labels: ["Bridal", "Woman", "Kids", "Man "],
                datasets: [
                  {
                    data: [30, 25, 20, 15, 10], // Replace with your actual data
                    backgroundColor: [
                      "#FF5733",
                      "#33FF57",
                      "#3357FF",
                      "#FF33A1",
                      "#FFDA33",
                    ],
                  },
                ],
              },
            },
          ].map((card, index) => (
            <div
              key={index}
              className="card border  shadow transform rounded overflow-hidden flex flex-col"
            >
              <div className="px-3 py-2 flex-grow">
                <p className="card-title text-gray-500 text-sm md:text-base">
                  {card.title}{" "}
                </p>
                <div className="flex items-center justify-between mt-2">
                  {card.pieChartData ? (
                    <div className="flex items-center justify-between">
                      {/* Doughnut Chart on the left side */}
                      <div className="size-14 mr-4">
                        <Doughnut
                          data={card.pieChartData}
                          options={{
                            responsive: true,
                            plugins: {
                              legend: {
                                display: false, // Hide legend inside the chart
                              },
                            },
                            cutout: "75%", // Adjust the thickness (higher value = thinner)
                          }}
                        />
                      </div>

                      {/* Custom Legend on the right side with scrolling */}
                      <div className="flex justify-between text-gray-600 text-xs">
                        {/* Left Column */}
                        <ul className="space-y-1 mr-2">
                          {card.pieChartData.labels
                            .slice(
                              0,
                              Math.ceil(card.pieChartData.labels.length / 2)
                            )
                            .map((label, idx) => (
                              <li key={idx} className="flex items-center">
                                {/* Rounded color circle */}
                                <span
                                  className="inline-block w-2 h-2 rounded-full mr-2"
                                  style={{
                                    backgroundColor:
                                      card.pieChartData.datasets[0]
                                        .backgroundColor[idx],
                                  }}
                                ></span>
                                {label}
                              </li>
                            ))}
                        </ul>

                        {/* Right Column */}
                        <ul className="space-y-1">
                          {card.pieChartData.labels
                            .slice(
                              Math.ceil(card.pieChartData.labels.length / 2)
                            )
                            .map((label, idx) => (
                              <li
                                key={
                                  idx +
                                  Math.ceil(card.pieChartData.labels.length / 2)
                                }
                                className="flex items-center"
                              >
                                {/* Rounded color circle */}
                                <span
                                  className="inline-block w-2 h-2 rounded-full mr-2"
                                  style={{
                                    backgroundColor:
                                      card.pieChartData.datasets[0]
                                        .backgroundColor[
                                        idx +
                                          Math.ceil(
                                            card.pieChartData.labels.length / 2
                                          )
                                      ],
                                  }}
                                ></span>
                                {label}
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <h2 className="text-xl md:text-3xl font-semibold text-gray-800 flex items-center gap-2">
                      {card.count}
                      <span className="text-xl">{card.unit}</span>
                    </h2>
                  )}
                </div>
              </div>
              <div className="bg-teal-100 text-sm text-teal-800 p-2 mt-auto">
                <span className="bg-teal-700 text-white px-2 py-1 rounded-full text-sm font-medium mr-1">
                  10%
                </span>
                increase from the last day
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <div className="grid grid-cols-12 gap-6 ">
          {/* Sales Graph Section */}
          <div className="col-span-12 md:col-span-9   rounded ">
            <div className="border  shadow px-4 pt-4 pb-12 rounded">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Sales This Month
              </h3>
              <div className="w-full">
                <Line
                  data={{
                    labels: ["Week 1", "Week 2", "Week 3", "Week 4"], // Example labels
                    datasets: [
                      {
                        label: "Sales (৳)",
                        data: [15000, 20000, 18000, 25000], // Example data
                        borderColor: "#4CAF50",
                        backgroundColor: "rgba(76, 175, 80, 0.2)",
                        tension: 0.4,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: true,
                        position: "top",
                      },
                    },
                    scales: {
                      x: {
                        grid: {
                          display: false,
                        },
                      },
                      y: {
                        grid: {
                          color: "#e4e4e4",
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 text-nowrap justify-between gap-4 mt-4">
              {/* Statistics Cards */}
              {[
                {
                  label: "Confirmed Orders",
                  value: 0,
                  icon: <FaCheck size={13} />,
                  bgColor: "bg-green-100",
                  textColor: "text-green-700",
                },
                {
                  label: "Pending Orders",
                  value: 0,
                  icon: <FaClock size={15} />,
                  bgColor: "bg-yellow-100",
                  textColor: "text-yellow-700",
                },
                {
                  label: "Deliveries",
                  value: 0,
                  icon: <FaTruck size={15} />,
                  bgColor: "bg-purple-100",
                  textColor: "text-purple-700",
                },

                {
                  label: "Returned Orders",
                  value: 0,
                  icon: <FaUndo size={15} />,
                  bgColor: "bg-red-100",
                  textColor: "text-red-700",
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className={`${stat.bgColor} ${stat.textColor} flex flex-col border cursor-pointer hover:bg-opacity-80 hover:shadow-lg transition-all duration-300 w-full p-6 rounded  shadow-md gap-2 justify-center`}
                >
                  <h2 className="text-2xl md:text-3xl font-semibold text-center">
                    {stat.value}
                  </h2>
                  <div className="flex items-center justify-center gap-2">
                    <span>{stat.icon}</span>
                    <h2 className="font-medium text-sm md:text-base">
                      {stat.label}
                    </h2>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Selling Products Section */}
          <div className="col-span-12 md:col-span-3  rounded border shadow-md">
            <div className="bg-teal-100 px-3 py-4">
              <h3 className="md:text-xl text-teal-800 font-bold">
                Top-Selling Products
              </h3>
              <h3 className="text-xs text-nowrap text-gray-500 mt-1 ">
                We have listed 15 total products
              </h3>
            </div>
            <div className="max-h-72  overflow-y-auto scrollbar-customize">
              <ul className=" ">
                {[
                  {
                    name: "Product A",
                    sales: 120,
                    image: "/public/assets/Images/kids-clothing.jpg",
                  },
                  {
                    name: "Product B",
                    sales: 95,
                    image: "/public/assets/Images/woo.jpg",
                  },
                  {
                    name: "Product C",
                    sales: 80,
                    image: "/public/assets/Images/men-clothing.jpg",
                  },
                  {
                    name: "Product D",
                    sales: 75,
                    image: "/public/assets/Images/men-clothing.png",
                  },
                  {
                    name: "Product E",
                    sales: 60,
                    image: "/public/assets/Images/women-clothing.jpg",
                  },
                  {
                    name: "Product F",
                    sales: 50,
                    image: "/public/assets/Images/kids-clothing.jpg",
                  },
                  {
                    name: "Product G",
                    sales: 30,
                    image: "/public/assets/Images/kids-clothing.jpg",
                  },
                  {
                    name: "Product H",
                    sales: 25,
                    image: "/public/assets/Images/kids-clothing.jpg",
                  },
                  // Add more products as needed
                ].map((product, index) => (
                  <li
                    key={index}
                    className="flex items-center   rounded py-2 px-4 border-b"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="ml-4">
                      <span className="text-gray-600 text-sm font-medium">
                        {product.name}
                      </span>
                      <div className="text-xs text-gray-500">
                        Sold: {product.sales} Items
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 border  rounded">
        <div className="flex p-4 border-b justify-between">
          <div>
            <h2 className="font-semibold text-lg md:text-xl">Recent Orders</h2>
            <h2 className=" text-sm  text-gray-500 mt-1">
              10 Most Recent Orders
            </h2>
          </div>
          <div className="flex items-center justify-center">
            <Link to="/order">
              <button className="px-3 py-2 text-sm rounded  text-white bg-teal-500 hover:bg-teal-600">
                <i className="far fa-eye mr-2"></i>View All
              </button>
            </Link>
          </div>
        </div>

        <div className="overflow-x-auto overflow-y-hidden mt-2">
          <div className="w-full">
            <table className="table text-nowrap">
              <thead className="text-base  text-gray-700 border-b">
                <tr>
                  <th className="">Date</th>
                  <th className="">Order ID</th>
                  <th className="">Customer</th>
                  <th className="">Qty</th>

                  <th className="">Address</th>

                  <th className="">Total</th>
                  <th className="">Status</th>
                  <th className="">Action</th>
                </tr>
              </thead>

              <tbody className="text-sm  text-gray-700 font-medium">
                {isLoading ? ( // Check if data is still loading
                  <tr className="hover">
                    <td colSpan="13" className="text-center">
                      <span className="loading loading-ring loading-md"></span>
                      <h1>Loading Orders...</h1>
                    </td>
                  </tr>
                ) : orders.length > 0 ? ( // Check if orders array has data
                  orders.slice(0, 10).map((order, index) => (
                    <tr key={order.id} className="hover cursor-pointer">
                      <td className="flex flex-col">
                        <span>{formatDate(order.created_at)}</span>
                        <span>{formatTime(order.created_at)}</span>
                      </td>
                      <td>{order.unique_id}</td>
                      <td className="flex flex-col">
                        <span>{order.c_name}</span>
                        <span>{order.c_phone}</span>
                      </td>
                      <td>
                        {Number(order?.s_product_qty) +
                          Number(order?.v_product_qty)}
                      </td>
                      <td>
                        {order.address.length > 20
                          ? `${order.address.substring(0, 15)}.....`
                          : order.address}
                      </td>
                      <td>{order.cod_amount}</td>
                      <td className="px-2 py-2 border-gray-300 text-sm ">
                        <span
                          className={`inline-block px-3 py-1 rounded-full font-medium ${
                            order.status === "order_placed"
                              ? "bg-yellow-100 text-yellow-800"
                              : order.status === "online_order"
                              ? "bg-green-100 text-blue-800"
                              : order.status === "cancel"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {order.status === "order_placed"
                            ? "Processing"
                            : order.status === "online_order"
                            ? "Online"
                            : order.status === "cancel"
                            ? "Cancelled"
                            : "Unknown"}
                        </span>
                      </td>{" "}
                      <td className="px-4 py-2  text-sm">
                        <div className="relative">
                          <div className="flex  gap-2 md:text-lg ">
                            <Link
                              data-tooltip-id="viewTooltipId"
                              to={{
                                pathname: "/orderdetails",
                              }}
                              state={{ order }}
                            >
                              <FaEye className="text-teal-500 text-lg  " />
                            </Link>

                            <ReactTooltip
                              id="viewTooltipId"
                              place="top"
                              content="View Details"
                              style={{
                                fontSize: "11px", // Adjust text size
                                padding: "4px 8px", // Adjust padding
                              }}
                            />

                            <button
                              data-tooltip-id="DeleteTooltipId"
                              onClick={() => handleDelete(order.id)}
                              className=""
                            >
                              <MdDeleteForever className="text-red-500 text-lg  " />
                            </button>

                            <ReactTooltip
                              id="DeleteTooltipId"
                              place="top"
                              content=" Delete"
                              style={{
                                fontSize: "11px", // Adjust text size
                                padding: "4px 8px", // Adjust padding
                              }}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  // If orders array is emptyF
                  <tr>
                    <td colSpan="13" className="text-center">
                      <div className=" flex flex-col items-center ">
                        <p className=" mt-4 text-xl font-semibold mr-4">
                          No orders found
                        </p>
                        <img
                          className=" w-[15%] animate-pulse "
                          src="https://cdn-icons-png.flaticon.com/256/4076/4076478.png"
                          alt="No Orders found"
                        />
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 ">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`flex border  items-center p-4 rounded-lg shadow `}
          >
            <div
              className={`flex  items-center justify-center w-12 h-12 rounded-full ${card.iconBg} text-xl`}
            >
              <card.icon className={card.textColor} />
            </div>
            <div className="ml-4">
              <h4 className="text-2xl font-semibold text-gray-800">
                {card.value}
              </h4>
              <p className="text-sm text-gray-500">{card.label}</p>
            </div>
          </div>
        ))}
      </div>
      <Footer_Backend />
    </div>
  );
};

export default Dashboard;
