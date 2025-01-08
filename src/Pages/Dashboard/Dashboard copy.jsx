import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import userr from "../../../assets/file.png";
import { PieChart, Pie, Cell, Rectangle } from "recharts";
import { FaTruck, FaUser, FaCloudSun } from "react-icons/fa"; // Import desired icons

const RADIAN = Math.PI / 180;

// Sales Performance
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import Footer_Backend from "../../Component/Backend/Footer_Backend";

const yearlyData = [
  { name: "Jan", Target: 12000, Achieved: 10400 },
  { name: "Feb", Target: 11000, Achieved: 9000 },
  { name: "Mar", Target: 14000, Achieved: 12000 },
  { name: "Apr", Target: 15000, Achieved: 12500 },
  { name: "May", Target: 16000, Achieved: 13000 },
  { name: "Jun", Target: 17000, Achieved: 14000 },
  { name: "Jul", Target: 18000, Achieved: 15000 },
  { name: "Aug", Target: 19000, Achieved: 16000 },
  { name: "Sep", Target: 20000, Achieved: 17000 },
  { name: "Oct", Target: 21000, Achieved: 18000 },
  { name: "Nov", Target: 22000, Achieved: 19000 },
  { name: "Dec", Target: 23000, Achieved: 20000 },
];
// Employee data
const employees = [
  {
    name: "Employee Name",
    sales: "10000 ৳",
    image: "https://via.placeholder.com/50",
  },
  {
    name: "Employee Name",
    sales: "10000 ৳",
    image: "https://via.placeholder.com/50",
  },
  {
    name: "Employee Name",
    sales: "10000 ৳",
    image: "https://via.placeholder.com/50",
  },
  {
    name: "Employee Name",
    sales: "10000 ৳",
    image: "https://via.placeholder.com/50",
  },
  {
    name: "Employee Name",
    sales: "10000 ৳",
    image: "https://via.placeholder.com/50",
  },
];

// .......................

const Dashboard = () => {
  const token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(false);

  const [chartData] = useState({
    options: {
      chart: {
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: "60%",
          },
        },
      },
      labels: ["Sales"],
    },

    series: [52],
  });

  // Most Sold Items

  const items = [
    { name: "Jeans", percentage: 70 },
    { name: "Shirts", percentage: 40 },
    { name: "Belts", percentage: 60 },
    { name: "Caps", percentage: 80 },
    { name: "Others", percentage: 20 },
  ];

  const targetAmount = 10500;
  const [amount, setAmount] = useState(0); // Starting from 0
  const incrementValue = 500; // Smaller increment for smoother counting
  const intervalTime = 10; // Interval time in milliseconds (0.01 seconds)

  useEffect(() => {
    const timer = setInterval(() => {
      setAmount((prevAmount) => {
        // If the target amount is reached, stop incrementing
        if (prevAmount >= targetAmount) {
          clearInterval(timer);
          return targetAmount;
        }
        // Otherwise, increment smoothly
        return Math.min(prevAmount + incrementValue, targetAmount);
      });
    }, intervalTime);

    // Clear the timer when the component is unmounted
    return () => clearInterval(timer);
  }, []);
  // Latest Orders
  const employees = [
    {
      name: "Employee Name",
      sales: "10000",
      image: "https://via.placeholder.com/50",
      orderId: "#11232",
      date: "Jun 29,2022",
      customerName: "Obaydul Kader",
      status: "Delivered",
    },
    {
      name: "Employee Name",
      sales: "10000",
      image: "https://via.placeholder.com/50",
      orderId: "#11232",
      date: "Jun 29,2022",
      customerName: "Obaydul Kader",
      status: "Delivered",
    },
    {
      name: "Employee Name",
      sales: "10000",
      image: "https://via.placeholder.com/50",
      orderId: "#11232",
      date: "Jun 29,2022",
      customerName: "Obaydul Kader",
      status: "Delivered",
    },
    {
      name: "Employee Name",
      sales: "10000",
      image: "https://via.placeholder.com/50",
      orderId: "#11232",
      date: "Jun 29,2022",
      customerName: "Obaydul Kader",
      status: "Delivered",
    },
    {
      name: "Employee Name",
      sales: "10000",
      image: "https://via.placeholder.com/50",
      orderId: "#11232",
      date: "Jun 29,2022",
      customerName: "Obaydul Kader",
      status: "Delivered",
    },
  ];

  // Low Stock
  const notice = [
    {
      title: "Upcoming....",
      status: "Unread",
      image: "assets/notice.png",
    },
    {
      title: "Upcoming....",
      status: "Unread",
      image: "assets/notice.png",
    },
    {
      title: "Upcoming....",
      status: "Unread",
      image: "assets/notice.png",
    },
    {
      title: "Upcoming....",
      status: "Unread",
      image: "assets/notice.png",
    },
    {
      title: "Upcoming....",
      status: "Unread",
      image: "assets/notice.png",
    },
  ];

  // Sales By Traffic Source
  const source = [
    {
      title: "Direct",
      status: "Upcoming Sales",
      image: "assets/Direct.png",
    },
    {
      title: "Search",
      status: "Upcoming Sales",
      image: "assets/Search.png",
    },
    {
      title: "Social",
      status: "Upcoming Sales",
      image: "assets/Social.png",
    },
    {
      title: "Referrals",
      status: "Upcoming Sales",
      image: "assets/Raferral.png",
    },
  ];

  // Delivery Report
  const [value, setValue] = useState(70); // Set the initial filled value

  // Calculate data based on the state value
  const data = [
    { name: "Filled", value: value, color: "#32A386" }, // Red color for filled portion
    { name: "Empty", value: 100 - value, color: "#f0f0f0" }, // Gray color for empty portion
  ];

  const cx = 130;
  const cy = 100;
  const iR = 50;
  const oR = 90;

  const needle = (value, cx, cy, iR, oR, color) => {
    const length = (iR + 2 * oR) / 3;
    const ang = 180.0 * (1 - value / 100);
    const sin = Math.sin(-RADIAN * ang);
    const cos = Math.cos(-RADIAN * ang);
    const r = 5;
    const x0 = cx + 5;
    const y0 = cy + 5;
    const xba = x0 + r * sin;
    const yba = y0 - r * cos;
    const xbb = x0 - r * sin;
    const ybb = y0 + r * cos;
    const xp = x0 + length * cos;
    const yp = y0 + length * sin;

    return [
      <circle
        key="needle-circle"
        cx={x0}
        cy={y0}
        r={r}
        fill={color}
        stroke="none"
      />,
      <path
        key="needle-path"
        d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`}
        stroke="none"
        fill={color}
      />,
    ];
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
        setGreeting("Good Morning");
      } else if (currentHour < 17) {
        setGreeting("Good Noon");
      } else if (currentHour < 22) {
        setGreeting("Good Evening");
      } else {
        setGreeting("Good Night");
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

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  }
  // Stock Get

  const [getStock, setGetStock] = useState([]);

  const [counts, setCounts] = useState([]);

  const counting = async () => {
    try {
      const cacheKey = "count";
      const cacheTimeKey = "count_timestamp";
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
  }, [token]);

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
  }, [token]);

  console.log(getStock);

  // get order

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const localStorageKey = "orders";
      const cachedData = localStorage.getItem(localStorageKey);
      const now = Date.now();

      if (cachedData) {
        const { timestamp, orders } = JSON.parse(cachedData);
        if (now - timestamp < 2 * 60 * 1000) {
          // Use cached data
          setOrders(orders);

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
          setOrders(orders);

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

  console.log(orders);
  const [mostSoldCategories, setMostSoldCategories] = useState([]);
  const [courierCounts, setCourierCounts] = useState([]);
  const [salesBySource, setSalesBySource] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cacheKey = "dashboardData";
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
  }, [token]);
  const sourceImages = {
    facebook: "assets/facebook.png",
    instagram: "assets/insta.jpg",
    phone_call: "assets/phone.png",
  };
  const getCourierIcon = (courierName) => {
    switch (courierName) {
      case "steadfast":
        return (
          <img src="/assets/Stadefast.png" alt="Pathao" className="w-6 h-6" />
        );
      case "redx":
        return <img src="/assets/redex.png" alt="Pathao" className="w-6 h-6" />;
      case "office-delivery":
        return (
          <img src="/assets/officelogo.png" alt="Pathao" className="w-6 h-6" />
        );
      case "SA-paribahan":
        return (
          <img
            src="/assets/sa-poribohon.jpg"
            alt="SA-Poribohon"
            className="w-6 h-6"
          />
        );
      case "sundarban":
        return (
          <img src="/assets/sunderban.jpg" alt="Pathao" className="w-6 h-6" />
        );
      case "Another Courier":
        return <FaUser className="w-6 h-6" />; // Example icon for another courier
      // Add more cases as needed
      default:
        return <FaUser className="w-6 h-6" />; // Fallback icon
    }
  };

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

  const initialChartSeries = mostSoldCategories
    ? mostSoldCategories.map((item) => item.total_sales)
    : [];

  const initialTotal = initialChartSeries.reduce((a, b) => a + b, 0);

  const [chartSeries, setChartSeries] = useState(initialChartSeries);
  // Static color array (you can customize this as needed)
  const staticColors = [
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#F8D800",
    "#8E44AD",
    "#FF8C00",
    "#1F77B4",
    "#FF6F61",
    "#76D7C4",
    "#F39C12",
    "#C0392B",
    "#9B59B6",
  ];
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: "donut",
    },
    labels: mostSoldCategories
      ? mostSoldCategories.map((item) => item.category_name)
      : [],
    colors: mostSoldCategories
      ? mostSoldCategories.map(
          (_, index) => staticColors[index % staticColors.length]
        )
      : [],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 100,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    legend: {
      show: false, // Disable the default legend
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              show: true,
              label: "Total",
              formatter: () => initialTotal, // Show initial total dynamically
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false, // Disable the percentage values
    },
  });

  const [categoryCount, setCategoryCount] = useState(
    mostSoldCategories ? mostSoldCategories.length : 0
  );

  // Update chart data dynamically when `mostSoldCategories` changes
  useEffect(() => {
    if (mostSoldCategories && mostSoldCategories.length > 0) {
      // Map the categories to static colors (cycle through staticColors array if needed)
      const assignedColors = mostSoldCategories.map(
        (_, index) => staticColors[index % staticColors.length]
      );

      const updatedSeries = mostSoldCategories.map((item) => item.total_sales);
      const updatedTotal = updatedSeries.reduce((a, b) => a + b, 0);

      setChartOptions((prevOptions) => ({
        ...prevOptions,
        labels: mostSoldCategories.map((item) => item.category_name),
        colors: assignedColors, // Use fixed colors
        plotOptions: {
          ...prevOptions.plotOptions,
          pie: {
            ...prevOptions.plotOptions.pie,
            donut: {
              ...prevOptions.plotOptions.pie.donut,
              labels: {
                ...prevOptions.plotOptions.pie.donut.labels,
                total: {
                  show: true,
                  label: "Total",
                  formatter: () => updatedTotal, // Update total dynamically
                },
              },
            },
          },
        },
      }));

      setChartSeries(updatedSeries);
      setCategoryCount(mostSoldCategories.length); // Update the count
    }
  }, [mostSoldCategories]);

  console.log(chartSeries);
  console.log(chartOptions.labels);
  return (
    <div>
      <div>
        <div className=" relative">
          <div className="bg-teal-500 text-white mb-4 shadow-md flex flex-col md:flex-row md:justify-between  items-center rounded-md min-w-[320px] w-full">
            <div className="flex items-center p-3">
              <div className="flex flex-col justify-center items-center space-y-1">
                <FaCloudSun size={25} />
                <h1>Partly Cloudly</h1>
              </div>
              <div className="border-l-2 border-dashed h-16 mx-4"></div>
              <div className="ml-5">
                <h1>{currentDate}</h1>
                <div className="md:flex md:flex-col  lg:block">
                  <big className="text-2xl font-semibold">{greeting}</big>
                  <small className=" mx-2">
                    Here's What Happening in your store today!
                  </small>
                </div>
              </div>
            </div>

            <div className="flex items-center mb-2flex-row">
              <div className="md:absolute static right-20 bottom-2 ">
                <img src={userr} className="w-32" alt="" />
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

        <div>
          <div className="grid text-white font-semibold grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-5 md:ml-0">
            <div className="card p-4 custom-shadow bg-gradient-to-r from-[#78D8CE] to-[#36D1BB] relative">
              <div className=" ">
                <h2 className="card-title px-5 py-1 ">Todays Sale</h2>
                <div className="flex px-5 items-center justify-between">
                  <h2 className="text-2xl whitespace-nowrap flex items-center gap-3">
                    {Math.floor(counts.todaySell)}
                    <span className="text-xl"> ৳</span>
                  </h2>
                </div>
              </div>
              <div>
                <h1 className="p-3 rounded-b-md text-white">
                  <span className="px-5 py-1 rounded-full mr-2">10%</span>{" "}
                  increase from the last day
                </h1>
              </div>
              {/* SVG Image at the rightmost corner */}
              <img
                src="https://demo.bootstrapdash.com/purple-new/themes/assets/images/dashboard/circle.svg"
                alt="Circle"
                className="absolute top-0 -right-4 size-44"
              />
            </div>

            <div className="card p-4 bg-base-100 custom-shadow bg-gradient-to-r from-[#FFB996] to-[#FF8D96] relative">
              <div className=" ">
                <h2 className="card-title px-5 py-1 ">This Month Sale</h2>
                <div className="flex px-5 items-center justify-between">
                  <h2 className="text-2xl whitespace-nowrap flex items-center gap-3">
                    {Math.floor(counts.this_month_sell)}
                    <span className="text-xl"> ৳</span>
                  </h2>
                </div>
              </div>
              <div>
                <h1 className="p-3 rounded-b-md text-white">
                  <span className="px-5 py-1 rounded-full mr-2">10%</span>{" "}
                  increase from the last day
                </h1>
              </div>
              {/* SVG Image at the rightmost corner */}
              <img
                src="https://demo.bootstrapdash.com/purple-new/themes/assets/images/dashboard/circle.svg"
                alt="Circle"
                className="absolute top-0 -right-4 size-44"
              />
            </div>

            <div className="card p-4 custom-shadow bg-gradient-to-r from-[#87C5F7] to-[#3E9DEA] relative">
              <div className=" ">
                <h2 className="card-title px-5 py-1 ">Total Sale</h2>
                <div className="flex px-5 items-center justify-between">
                  <h2 className="text-2xl whitespace-nowrap flex items-center gap-3">
                    {Math.floor(counts.totalSell)}
                    <span className="text-xl"> ৳</span>
                  </h2>
                </div>
              </div>
              <div>
                <h1 className="p-3 rounded-b-md text-white">
                  <span className="px-5 py-1 rounded-full mr-2">10%</span>{" "}
                  increase from the last day
                </h1>
              </div>
              {/* SVG Image at the rightmost corner */}
              <img
                src="https://demo.bootstrapdash.com/purple-new/themes/assets/images/dashboard/circle.svg"
                alt="Circle"
                className="absolute top-0 -right-4 size-44"
              />
            </div>

            
          </div>
        </div>

        {/* Third Row */}

        <div className="grid grid-cols-12 gap-4 mt-6">
          {/* Latest Orders */}
          <div className="col-span-12 lg:col-span-9 p-5 rounded-lg custom-shadow overflow-auto">
            {/* Header with Buttons */}
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-semibold">Latest Orders</h2>

              {/* Filter Buttons */}
            </div>

            {/* Table Structure */}
            <table className="min-w-full bg-[#EFEFEF] rounded-sm">
              {/* Table Header */}
              <thead className=" text-gray-600">
                <tr className="bg-[#EFEFEF] font-semibold">
                  <th className="px-4 py-2 text-left">Photo</th>
                  <th className="px-4 py-2 text-left">Product Name</th>
                  <th className="px-4 py-2 text-left">Order ID</th>
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Customer Name</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Amount</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {orders?.slice(0, 5).map((order, index) => (
                  <tr key={index} className="bg-white">
                    <td className="px-4 py-2">
                      {order?.order_products?.length > 0 ? (
                        <img
                          src={`https://admin.attireidyll.com/public/storage/product/${order.order_products[0].image}`}
                          alt={order.order_products[0].name}
                          className="w-12 h-12 rounded object-cover"
                        />
                      ) : (
                        // <img
                        //   src={`https://admin.attireidyll.com/public/storage/product/${order?.order_variable_products[0]?.product?.image}`}
                        //   alt={order.order_products[0].name}
                        //   className="w-12 h-12 rounded object-cover"
                        // />
                        // <span>n/a</span>
                        <div>
                          {order.order_variable_products.map((pr) => (
                            <div key={pr.id}>
                              <img
                                src={`https://admin.attireidyll.com/public/storage/product/${pr?.product?.image}`}
                                alt="imageee"
                                className="w-12 h-12 rounded object-cover"
                              />
                              {/* <span>{pr.product.name}</span> */}
                            </div>
                          ))}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {order?.order_products.length > 0
                        ? order?.order_products[0].name
                        : "N/A"}
                    </td>
                    <td className="px-4 py-2">{order?.id}</td>
                    <td className="px-4 py-2">
                      {formatDate(order?.created_at)}
                    </td>
                    <td className="px-4 py-2">{order?.c_name}</td>
                    <td className="px-4 py-2">{order?.status}</td>
                    <td className="px-4 py-2">{order?.cod_amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Notice Stock */}
          <div className="col-span-12 lg:col-span-3 space-y-1 bg-white custom-shadow rounded-lg p-4 overflow-auto">
            <h2 className="text-xl font-semibold mb-4">Notice</h2>

            {/* Table */}
            <table className="w-full table-auto">
              {/* Table Header */}
              <thead className="bg-[#EFEFEF]">
                <tr className="rounded-sm">
                  <th className="text-left pl-16 py-2">Title</th>
                  <th className="text-right px-3 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {notice.map((notice, index) => (
                  <tr key={index}>
                    <td className="flex items-center space-x-2 px-2 py-2">
                      <img
                        src={notice.image}
                        alt="Employee"
                        className="w-12 h-12 rounded object-cover"
                      />
                      <span className="font-medium">{notice.title}</span>
                    </td>
                    <td className="px-2 py-2 text-right font-semibold">
                      {notice.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Forth Row */}

        <div className="grid grid-cols-12 gap-4 mt-6">
          {/* Sales By Social Source */}
          <div className="col-span-12 lg:col-span-3 space-y-1  custom-shadow rounded-lg p-4 overflow-auto">
            <h2 className="text-xl font-semibold mb-3">
              Sales By Social Source
            </h2>

            {/* Table structure */}
            <table className="min-w-full bg-white">
              <tbody>
                {salesBySource.map((socialmedia, index) => (
                  <tr key={index}>
                    {/* Box with centered image */}
                    <td className="px-4 py-2">
                      <div className="w-12 h-12 bg-gray-200 flex items-center justify-center rounded">
                        <img
                          src={sourceImages[socialmedia?.source]}
                          alt="Social Media"
                          className="w-8 h-8 rounded object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      <span className="font-medium">{socialmedia?.source}</span>
                    </td>
                    <td className="px-4 py-2 text-right">
                      <span className="font-semibold">
                        {socialmedia?.total_sales}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Sales By Traffic Source Stock */}

          <div className="col-span-12 lg:col-span-3 space-y-1 custom-shadow rounded-lg p-4 overflow-auto">
            <h2 className="text-xl font-semibold mb-3">
              Sales By Traffic Source
            </h2>

            <table className="min-w-full">
              <tbody>
                {source.map((source, index) => (
                  <tr key={index}>
                    {/* Box with centered image */}
                    <td className="flex items-center space-x-2 px-4 py-2">
                      <div className="w-12 h-12 bg-gray-200 flex items-center justify-center rounded">
                        <img
                          src={source.image}
                          alt="Source"
                          className="w-8 h-8 rounded object-cover"
                        />
                      </div>
                      <span className="font-medium">{source.title}</span>
                    </td>
                    {/* Status column */}
                    <td className="text-right font-semibold px-4 py-2">
                      {source.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Delivery Report */}

          <div className="col-span-12 lg:col-span-6 custom-shadow rounded-lg overflow-x-auto">
            <h2 className="text-xl font-semibold mb-4 p-5">Delivery Report</h2>
            {/* Map over courierCounts to create a chart for each courier */}
            <div className="flex flex-row ">
              {courierCounts
                .sort((a, b) => b.percentage - a.percentage) // Sort by percentage in descending order
                .map((courier, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="flex items-center justify-between w-[70%] mt-2">
                      {/* Replace the image with an icon */}
                      {getCourierIcon(courier?.courier)}
                      <span className="font-semibold">{courier?.courier}</span>
                      <span className="font-medium">{courier?.total}</span>
                    </div>

                    <PieChart width={250} height={250}>
                      <Rectangle
                        x={0}
                        y={0}
                        width={400}
                        height={500}
                        fill="#f0f0f0"
                      />

                      <Pie
                        dataKey="value"
                        startAngle={180}
                        endAngle={0}
                        data={[
                          { value: courier?.percentage },
                          { value: 100 - courier?.percentage },
                        ]}
                        cx={cx}
                        cy={cy}
                        innerRadius={iR}
                        outerRadius={oR * 0.7}
                        fill="#e0e0e0"
                        stroke="none"
                      >
                        {[
                          { value: courier?.percentage },
                          { value: 100 - courier?.percentage },
                        ].map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={
                              index === 0
                                ? courier?.courier === "redx"
                                  ? "#FF0000"
                                  : courier?.courier === "steadfast"
                                  ? "#32a386"
                                  : courier?.courier === "office-delivery"
                                  ? "#00FFFF"
                                  : courier?.courier === "SA-paribahan"
                                  ? "green"
                                  : courier?.courier === "sundarban"
                                  ? "#fdb14d"
                                  : "#0000FF"
                                : "#e0e0e0"
                            }
                          />
                        ))}
                      </Pie>
                      {needle(courier?.percentage, cx, cy, iR, oR, "#444CB4")}
                      <text
                        x={cx - 55}
                        y={cy + 30}
                        textAnchor="middle"
                        fontSize={16}
                        fill="#000"
                      >
                        0%
                      </text>
                      <text
                        x={cx + 70}
                        y={cy + 30}
                        textAnchor="middle"
                        fontSize={16}
                        fill="#000"
                      >
                        100%
                      </text>
                      <text
                        x={cx}
                        y={cy + 35}
                        textAnchor="middle"
                        fontSize={20}
                        fill="#000"
                      >
                        {courier?.percentage.toFixed(2)}%
                      </text>
                    </PieChart>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <Footer_Backend />
    </div>
  );
};

export default Dashboard;
