import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { FaCloudSun } from "react-icons/fa";
import userr from "../../../assets/file.png";
import { PieChart, Pie, Cell, Rectangle } from "recharts";

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

  const chartOptions = {
    chart: {
      type: "bar",
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May"],
    },
    yaxis: {
      labels: {
        formatter: (value) => `${value}k`,
      },
    },
    fill: {
      opacity: 1,
    },
    colors: ["#4667de", "#90caf9"],
  };

  // Most Sold Items
  const items = [
    { name: "Jeans", percentage: 70 },
    { name: "Shirts", percentage: 40 },
    { name: "Belts", percentage: 60 },
    { name: "Caps", percentage: 80 },
    { name: "Others", percentage: 20 },
  ];

  // Low Stock
  const stock = [
    {
      name: "Employee Name",
      sales: "10000",
      image: "assets/kids-clothing.jpg",
    },
    {
      name: "Employee Name",
      sales: "10000",
      image: "assets/kids-clothing.jpg",
    },
    {
      name: "Employee Name",
      sales: "10000",
      image: "assets/kids-clothing.jpg",
    },
    {
      name: "Employee Name",
      sales: "10000",
      image: "assets/kids-clothing.jpg",
    },
    {
      name: "Employee Name",
      sales: "10000",
      image: "assets/kids-clothing.jpg",
    },
  ];

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
      title: "Title goes here",
      status: "Unread",
      image: "assets/notice.png",
    },
    {
      title: "Title goes here",
      status: "Unread",
      image: "assets/notice.png",
    },
    {
      title: "Title goes here",
      status: "Unread",
      image: "assets/notice.png",
    },
    {
      title: "Title goes here",
      status: "Unread",
      image: "assets/notice.png",
    },
    {
      title: "Title goes here",
      status: "Unread",
      image: "assets/notice.png",
    },
  ];

  // Sales By Social Source
  const socialmedia = [
    {
      title: "Facebook",
      sale: "805 Sales",
      image: "assets/facebook.png",
    },
    {
      title: "What's App",
      sale: "805 Sales",
      image: "assets/whatsapp.png",
    },
    {
      title: "Instagram",
      sale: "5 Sales",
      image: "assets/whatsapp.png",
    },
    {
      title: "Phone Call",
      sale: "805 Sales",
      image: "assets/phone.png",
    },
  ];

  // Sales By Traffic Source
  const source = [
    {
      title: "Direct",
      status: "805 Sales",
      image: "assets/Direct.png",
    },
    {
      title: "Search",
      status: "805 Sales",
      image: "assets/Search.png",
    },
    {
      title: "Social",
      status: "5 Sales",
      image: "assets/Social.png",
    },
    {
      title: "Referrals",
      status: "805 Sales",
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

  return (
    <div>
      {/* header */}

      <div className=" relative">
        <div className="bg-sky-400 text-white mb-4 shadow-md flex flex-col md:flex-row md:justify-between  items-center rounded-md min-w-[320px] w-full">
          <div className="flex items-center p-3">
            <div className="flex flex-col justify-center items-center space-y-1">
              <FaCloudSun size={25} />
              <h1>Partly Cloudy</h1>
            </div>
            <div className="border-l-2 border-dashed h-16 mx-4"></div>
            <div className="ml-5">
              <h1>25 September 2024</h1>
              <h1 className="">
                <big className="text-2xl font-bold">Good Morning </big>
                <small>Here's What Happening in your store today!</small>
              </h1>
            </div>
          </div>

          <div className="flex items-center mb-2flex-row">
            <div className="md:absolute static right-20 bottom-2 z-50">
              <img src={userr} className="w-32 md:w-40" alt="" />
            </div>
            <div className="mt-2">
              <h1>Every Time</h1>
              <h1 className="font-bold md:text-xl text-xs">10 : 30 AM</h1>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-5 ml-5 md:ml-0">
          <div className="card  custom-shadow">
            <div className=" ">
              <h2 className="card-title px-5 py-1 ">Todays Sale</h2>
              <div className=" flex px-5 items-center justify-between">
                <h2 className=" font-bold text-4xl whitespace-nowrap">
                  1050 BDT
                </h2>
                <ReactApexChart
                  options={chartData.options}
                  series={chartData.series}
                  type="radialBar"
                  height={150}
                />
              </div>
            </div>

            <div>
              <h1 className=" bg-sky-400 p-3 rounded-b-md text-white">
                {" "}
                <span className=" bg-blue-700  px-5 py-1 rounded-full mr-2">
                  10%{" "}
                </span>{" "}
                increase from the last day
              </h1>
            </div>
          </div>
          <div className="card   bg-base-100 custom-shadow">
            <div className=" ">
              <h2 className="card-title px-5 py-1 ">This Month Sale</h2>
              <div className=" flex px-5 items-center justify-between">
                <h2 className=" font-bold text-4xl whitespace-nowrap">
                  1050 BDT
                </h2>
                <ReactApexChart
                  options={chartData.options}
                  series={chartData.series}
                  type="radialBar"
                  height={150}
                />
              </div>
            </div>

            <div>
              <h1 className=" bg-sky-400 p-3 rounded-b-md text-white">
                {" "}
                <span className=" bg-blue-700  px-5 py-1 rounded-full mr-2">
                  10%{" "}
                </span>{" "}
                increase from the last day
              </h1>
            </div>
          </div>
          <div className="card  custom-shadow">
            <div className=" ">
              <h2 className="card-title px-5 py-1 ">Total Sale</h2>
              <div className=" flex px-5 items-center justify-between">
                <h2 className=" font-bold text-4xl whitespace-nowrap">
                  1050 BDT
                </h2>
                <ReactApexChart
                  options={chartData.options}
                  series={chartData.series}
                  type="radialBar"
                  height={150}
                />
              </div>
            </div>

            <div>
              <h1 className=" bg-sky-400 p-3 rounded-b-md text-white">
                {" "}
                <span className=" bg-blue-700  px-5 py-1 rounded-full mr-2">
                  10%{" "}
                </span>{" "}
                increase from the last day
              </h1>
            </div>
          </div>

          <div className="card  bg-base-100 custom-shadow">
            <div className=" ">
              <h2 className="card-title px-5 py-1 ">Total Order</h2>
              <div className=" flex px-5 items-center justify-between">
                <h2 className=" font-bold text-4xl whitespace-nowrap">
                  1050 BDT
                </h2>
                <ReactApexChart
                  options={chartData.options}
                  series={chartData.series}
                  type="radialBar"
                  height={150}
                />
              </div>
            </div>

            <div>
              <h1 className=" bg-sky-400 p-3 rounded-b-md text-white">
                {" "}
                <span className=" bg-blue-700  px-5 py-1 rounded-full mr-2">
                  10%{" "}
                </span>{" "}
                increase from the last day
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Sales Performance */}

      <div className="grid grid-cols-12 gap-4 mt-6">
        {/* Sales Performance */}
        <div className="col-span-12 lg:col-span-6 p-5 rounded-lg custom-shadow">
          <h2 className="text-xl font-bold mb-3">Sales Performance</h2>
          <div className="flex flex-col md:flex-row items-start">
            {" "}
            {/* Flex container to align items */}
            <div className="flex-1 space-y-2 ">
              {" "}
              {/* Employee list */}
              {employees.map((employee, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <img
                    src={employee.image}
                    alt="Employee"
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div className="flex justify-between w-[100%] md:w-[70%] gap-12 md:gap-0">
                    <span className="font-medium ">{employee.name}</span>
                    <span className="font-bold">{employee.sales}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full md:w-1/2">
              {" "}
              {/* Parent div with responsive width */}
              <ResponsiveContainer width="100%" height={250}>
                <b className="xl:hidden flex justify-center text-lg font-semibold text-gray-700 whitespace-nowrap">
                  Yearly Target
                </b>
                <BarChart
                  data={yearlyData}
                  margin={{
                    top: 10,
                    right: 30,
                    bottom: 15,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                  <XAxis dataKey="name" tick={{ fill: "#333" }} />
                  <YAxis
                    tick={{ fill: "#333" }}
                    domain={[0, "dataMax"]}
                    tickCount={5}
                    interval="preserveStartEnd"
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#333", color: "#fff" }}
                  />
                  <Legend verticalAlign="top" height={36} />
                  <Bar dataKey="Target" fill="#28DEFC" />
                  <Bar dataKey="Achieved" fill="pink" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Most Sold Items */}
        <div className="col-span-12 lg:col-span-3 bg-white custom-shadow rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Most Sold Items</h3>
          {items.map((item, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">{item.name}</span>
                <span className="text-sm font-medium">{item.percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-500 h-2.5 rounded-full"
                  style={{ width: `${item.percentage}%` }} // Corrected here
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Low Stock */}
        <div className="col-span-12 lg:col-span-3 space-y-1 bg-white custom-shadow rounded-lg p-4 overflow-auto">
          <h2 className="text-xl font-bold mb-3">Low Stock</h2>

          {/* Table Header */}
          <div className="flex items-center font-bold mb-2 bg-[#EFEFEF] px-2 rounded-sm py-2">
            <span className="">Photo</span> {/* Column for employee name */}
            <span className="ml-4">Product Name</span>{" "}
            {/* Column for employee name */}
            <span className="flex-1 text-right">Stock</span>{" "}
            {/* Column for sales */}
          </div>

          {stock.map((stock, index) => (
            <div key={index} className="flex items-center space-x-2">
              <img
                src={stock.image}
                alt="Employee"
                className="w-12 h-12 rounded object-cover"
              />
              <div className="flex justify-between w-[100%] px-2">
                <span className="font-medium">{stock.name}</span>
                <span className="font-bold text-right">{stock.sales}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Third Row */}

      <div className="grid grid-cols-12 gap-4 mt-6">
        {/* Latest Orders */}
        <div className="col-span-12 lg:col-span-9 p-5 rounded-lg custom-shadow overflow-auto">
          {/* Header with Buttons */}
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-bold">Latest Orders</h2>

            {/* Filter Buttons */}
            <div className="flex space-x-2">
              <button className="px-4">All</button>
              <button className="px-4">Monthly</button>
              <button className="px-4">Weekly</button>
              <button className="px-4">Today</button>
            </div>
          </div>

          {/* Table Structure */}
          <table className="min-w-full bg-[#EFEFEF] rounded-sm">
            {/* Table Header */}
            <thead>
              <tr className="bg-[#EFEFEF] font-bold">
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
              {employees.map((employee, index) => (
                <tr key={index} className="bg-white">
                  <td className="px-4 py-2">
                    <img
                      src={employee.image}
                      alt="Employee"
                      className="w-12 h-12 rounded object-cover"
                    />
                  </td>
                  <td className="px-4 py-2">{employee.name}</td>
                  <td className="px-4 py-2">{employee.orderId}</td>
                  <td className="px-4 py-2">{employee.date}</td>
                  <td className="px-4 py-2">{employee.customerName}</td>
                  <td className="px-4 py-2">{employee.status}</td>
                  <td className="px-4 py-2">{employee.sales}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Notice Stock */}
        <div className="col-span-12 lg:col-span-3 space-y-1 bg-white custom-shadow rounded-lg p-4 overflow-auto">
          <h2 className="text-xl font-bold mb-4">Notice</h2>

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
                  <td className="px-2 py-2 text-right font-bold">
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
          <h2 className="text-xl font-bold mb-3">Sales By Social Source</h2>

          {/* Table structure */}
          <table className="min-w-full bg-white">
            <tbody>
              {socialmedia.map((socialmedia, index) => (
                <tr key={index}>
                  {/* Box with centered image */}
                  <td className="px-4 py-2">
                    <div className="w-12 h-12 bg-gray-200 flex items-center justify-center rounded">
                      <img
                        src={socialmedia.image}
                        alt="Social Media"
                        className="w-8 h-8 rounded object-cover"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    <span className="font-medium">{socialmedia.title}</span>
                  </td>
                  <td className="px-4 py-2 text-right">
                    <span className="font-bold">{socialmedia.sale}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Sales By Traffic Source Stock */}

        <div className="col-span-12 lg:col-span-3 space-y-1 custom-shadow rounded-lg p-4 overflow-auto">
          <h2 className="text-xl font-bold mb-3">Sales By Traffic Source</h2>

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
                  <td className="text-right font-bold px-4 py-2">
                    {source.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Delivery Report */}
        <div className="col-span-12 lg:col-span-6 custom-shadow rounded-lg overflow-x-auto flex flex-nowrap ">
          {/* Each chart is inside a container */}
          <div className="w-[250px] flex-shrink-0 flex flex-col items-center pt-0 mt-0 justify-center">
          <div className="flex items-center justify-between w-[70%] mt-2">
      <img src="/assets/Stadefast.png" alt="Pathao" className="w-6 h-6" />
      <span className="font-bold">Stadefast</span>
      <span className="font-medium">{value}</span>
    </div>
            <PieChart width={250} height={250}>
              <Pie
                dataKey="value"
                startAngle={180}
                endAngle={0}
                data={data}
                cx={cx}
                cy={cy}
                innerRadius={iR}
                outerRadius={oR * 0.7}
                fill="#8884d8"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              {needle(value, cx, cy, iR, oR, "#EB5757")}
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
                {value}%
              </text>
            </PieChart>
          </div>

          {/* Repeat for the other charts */}
          <div className=" w-[250px] flex-shrink-0 flex flex-col items-center pt-0 mt-0 justify-center">
          <div className="flex items-center justify-between w-[70%] mt-2">
      <img src="/assets/Pathao.png" alt="Pathao" className="w-6 h-6" />
      <span className="font-bold">Pathao</span>
      <span className="font-medium">{value}</span>
    </div>
            <PieChart width={250} height={250}>
              <Rectangle x={0} y={0} width={400} height={500} fill="#f0f0f0" />
              <Pie
                dataKey="value"
                startAngle={180}
                endAngle={0}
                data={data}
                cx={cx}
                cy={cy}
                innerRadius={iR}
                outerRadius={oR * 0.7}
                fill="#8884d8"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              {needle(value, cx, cy, iR, oR, "#EB5757")}
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
                {value}%
              </text>
            </PieChart>
          </div>

                
          <div className=" w-[250px] flex-shrink-0 flex flex-col items-center pt-0 mt-0 justify-center">
          <div className="flex items-center justify-between w-[70%] mt-2">
      <img src="/assets/redex.png" alt="Pathao" className="w-6 h-6" />
      <span className="font-bold">RedEx</span>
      <span className="font-medium">{value}</span>
    </div>
            <PieChart width={250} height={250}>
              <Rectangle x={0} y={0} width={400} height={500} fill="#f0f0f0" />
              <Pie
                dataKey="value"
                startAngle={180}
                endAngle={0}
                data={data}
                cx={cx}
                cy={cy}
                innerRadius={iR}
                outerRadius={oR * 0.7}
                fill="#8884d8"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              {needle(value, cx, cy, iR, oR, "#EB5757")}
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
                {value}%
              </text>
            </PieChart>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
