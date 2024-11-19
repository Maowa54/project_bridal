import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { BsBoxes } from "react-icons/bs";
import { FaEllipsisV, FaEye, FaTrash , FaSearch, FaRegEdit } from "react-icons/fa";
import Datepicker from "react-tailwindcss-datepicker";
import { printInvoice } from './InvoicePrint'; 
import AllSelectedBusiness from "../../Component/AllSelectedBusiness";
import InvoiceModal from "./InvoiceModal";
import { MdDeleteForever } from "react-icons/md";
import { CiMenuKebab } from "react-icons/ci";




const Order = () => {
  const token = localStorage.getItem("token");
  const clientId = localStorage.getItem("clientId");
  const [displayOrders, setDisplayOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [pageSize, setPageSize] = useState(10); // Default page size
  const [value, setValue] = useState({ startDate: null, endDate: null });
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
const [modalVisible, setModalVisible] = useState(false);
const [isLoading, setIsLoading] = useState(false); 
// const handleViewClick = (order) => {
//   setSelectedOrder(order);
//   setModalVisible(true);
// };
console.log(selectedBusiness)
const handlePrint = () => {
  const printContent = document.getElementById('modal-content');
  const printWindow = window.open('', '', 'height=600,width=800');
  printWindow.document.write('<html><head><title>Print Order</title></head><body>');
  printWindow.document.write(printContent.innerHTML);
  printWindow.document.write('</body></html>');
  printWindow.document.close();
  printWindow.print();
};
useEffect(() => {
  const fetchOrders = async () => {
    
    const localStorageKey = `orders_${clientId}`;
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
      const response = await axios.get(`https://expressitplus.co.uk/api/orders/all/get/${clientId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.data.status) {
        const orders = response.data.data.data; 
        setDisplayOrders(orders); 
        setFilteredOrders(orders); 
        
        localStorage.setItem(localStorageKey, JSON.stringify({ timestamp: now, orders }));
      } else {
        console.error('Failed to fetch orders:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }finally {
      setIsLoading(false); // End loading
    }
  };

  fetchOrders();
}, [clientId, token]);

  console.log(displayOrders)

  useEffect(() => {
    if (selectedBusiness) {
      const filtered = displayOrders.filter(order => order.business_id === selectedBusiness);
      setFilteredOrders(filtered);
    } else {
      setFilteredOrders(displayOrders);
    }
  }, [selectedBusiness, displayOrders]);

  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value)); 
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedOrders([]); // Deselect all
    } else {
      setSelectedOrders(filteredOrders.map((order) => order.id)); // Select all
    }
    setSelectAll(!selectAll);
  };

  const handleSelectOrder = (id) => {
    if (selectedOrders.includes(id)) {
      setSelectedOrders(selectedOrders.filter((orderId) => orderId !== id));
    } else {
      setSelectedOrders([...selectedOrders, id]);
    }
  };

 

 
  

 

  const handlePrintInvoice = (order) => {
    printInvoice(order); 
  };




  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  }
  
  function formatTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  }





  // Slice the orders array based on pageSize
  const orders = filteredOrders.slice(0, pageSize);

console.log(orders)

  

  return (
    <div>
      <div className='flex shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] justify-between mt-3 px-6 py-2 items-center'>
        <h1 className="text-md md:text-2xl font-semibold">Order</h1>
        <AllSelectedBusiness onBusinessSelect={setSelectedBusiness} /> {/* Pass callback to handle business selection */}
      </div>

      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-4 my-4">
        {/* Statistics cards */}
        <div className="flex col-span-2 flex-col hover:bg-sky-400 hover:text-white w-full py-1 rounded-lg px-2 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] gap-3 justify-center">
    <h2 className="text-5xl text-center">0</h2>
    <div className="flex justify-center items-center gap-2">
      <BsBoxes size={25} color="skyblue" />
      <h2 className="text-md">All Order</h2>
    </div>
  </div>

  <div className="flex flex-col col-span-2 hover:bg-sky-400 hover:text-white w-full py-1 rounded-lg px-2 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] gap-3 justify-center">
    <h2 className="text-5xl text-center">0</h2>
    <div className="flex justify-center items-center gap-2">
      <BsBoxes size={25} color="skyblue" />
      <h2 className="text-md">Todays Offer</h2>
    </div>
  </div>

        <div className="flex flex-col col-span-2 hover:bg-sky-400 hover:text-white w-full py-1 rounded-lg px-2 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] gap-3 justify-center">
          <h2 className="text-5xl text-center">0</h2>
          <div className="flex justify-center items-center gap-2">
            <BsBoxes size={25} color="skyblue" />
            <h2 className="text-md">On Process</h2>
          </div>
        </div>

        <div className="flex flex-col col-span-2 hover:bg-sky-400 hover:text-white w-full py-1 rounded-lg px-2 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] gap-3 justify-center">
          <h2 className="text-5xl text-center">0</h2>
          <div className="flex justify-center items-center gap-2">
            <BsBoxes size={25} color="skyblue" />
            <h2 className="text-md">Total Delivery</h2>
          </div>
        </div>

        <div className="flex flex-col col-span-2 hover:bg-sky-400 hover:text-white w-full py-1 rounded-lg px-2 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] gap-3 justify-center">
          <h2 className="text-5xl text-center">0</h2>
          <div className="flex justify-center items-center gap-2">
            <BsBoxes size={25} color="skyblue" />
            <h2 className="text-md">Total Return</h2>
          </div>
        </div>

        <div className="flex flex-col col-span-2 hover:bg-sky-400 hover:text-white w-full py-1 rounded-lg px-2 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] gap-3 justify-center">
          <h2 className="text-5xl text-center">0</h2>
          <div className="flex justify-center items-center gap-2">
            <BsBoxes size={25} color="skyblue" />
            <h2 className="text-md">Confirm</h2>
          </div>
        </div>
      </div>



      <div className="flex pt-4 flex-col md:flex-row gap-3 justify-between items-center">
       <div className=" flex items-center gap-3 ">
       <div>
          <select onChange={handlePageSizeChange} value={pageSize} className="border border-gray-300 rounded-lg text-xl font-bold px-4 py-1">
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>

        <h2 className="bg-sky-500 cursor-pointer text-white hover:bg-green-500 rounded-lg text-md px-4 py-2">Print All Invoice</h2>

        <div>
          <div className="border relative z-30 border-gray-300 rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
            <Datepicker
              value={value}
              onChange={handleValueChange}
              showFooter
              primaryColor="teal"
            />
          </div>
        </div>
       </div>





        <div className="flex items-center">
            <input
              type="text"
              className="block w-full px-4 py-2 border border-gray-300 rounded-l-md shadow-md focus:outline-none sm:text-sm"
              placeholder="Search..."
            />
            <button className="px-4 py-3 bg-blue-600 text-white font-medium rounded-r-md hover:bg-blue-700">
              <FaSearch />
            </button>
          </div>
    
      </div>
      

      <div className="overflow-x-auto my-6">
    
        <div className="w-full">
          <table className="table mb-20">
            <thead className="md:text-[18px] text-gray-700 shadow-[rgba(0,_0,_0,_0.24)_0px_1px_5px]">
              <tr>
                <th className="">
                  <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
                </th>
                <th className="">Placed On</th>
                <th className="">Order By</th>
                <th className="">Order ID</th>
                <th className="">Customer Id</th>
                <th className=" ">Tracking Id</th>
                <th className="">Qty</th>
                <th className="">Source</th>
                <th className="">Address</th>
                <th className="p">Courier</th>
                
                <th className="">COD</th>
                <th className="">Status</th>
                <th className="">Action</th>
              </tr>
            </thead>

            <tbody className="md:text-[16px] text-gray-600 font-semibold">
  {isLoading ? ( // Check if data is still loading
    <tr>
      <td colSpan="13" className="text-center">
        <span className="loading loading-ring loading-md"></span>
        <h1>Loading Orders...</h1>
      </td>
    </tr>
  ) : orders.length > 0 ? ( // Check if orders array has data
    orders.map((order, index) => (
      <tr
        key={order.id}
        className={index % 2 === 1 ? 'shadow-[rgba(0,_0,_0,_0.24)_0px_1px_5px]' : ''}
      >
        <td>
          <input
            type="checkbox"
            checked={selectedOrders.includes(order.id)}
            onChange={() => handleSelectOrder(order.id)}
          />
        </td>
        <td className="flex flex-col">
          <span>{formatDate(order.created_at)}</span>
          <span>{formatTime(order.created_at)}</span>
        </td>
        <td className="text-center">{order.creator.name}</td>
        <td>{order.unique_id}</td>
        <td className="flex flex-col">
          <span>{order.c_name}</span>
          <span>{order.c_phone}</span>
        </td>
        <td className="text-center">n/a</td>
        <td>{Number(order?.s_product_qty) + Number(order?.v_product_qty)}</td>
        <td>{order.source}</td>
        <td>{order.address.length > 20 ? `${order.address.substring(0, 15)}.....` : order.address}</td>
        <td>{order.courier}</td>
        <td>{order.cod_amount}</td>
        <td>{order.status}</td>
        <td>
          <div className="relative">
            <div className="dropdown">
              <button className="text-[20px]">
                <CiMenuKebab />
              </button>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-50 p-2 shadow absolute right-2"
              >
                <li>
                  <a>
                    <FaEye className="text-blue-500 text-[20px] pl-1" />
                    View
                  </a>
                </li>
                <li onClick={() => handlePrintInvoice(order)} id="printInvoice">
                  <a>
                    <FaRegEdit className="text-green-500 text-[20px] pl-1" />
                    Invoice
                  </a>
                </li>
                <li>
                  <a>
                    <MdDeleteForever className="text-red-500 text-[20px]" />
                    Delete
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </td>
      </tr>
    ))
  ) : ( // If orders array is empty
    <tr>
      <td colSpan="13" className="text-center">
    
        <div className=" flex flex-col items-center ">
            <p className=' my-4 text-xl font-semibold mr-4'>No orders found</p>
            <img className=" w-[15%] animate-pulse " src="https://cdn-icons-png.flaticon.com/256/4076/4076478.png" alt="No Orders found" />
          </div>
      </td>
    </tr>
  )}
</tbody>


          </table>
        </div>
   
      {modalVisible && (
        <InvoiceModal
          order={selectedOrder}
          onClose={() => setModalVisible(false)}
          onPrint={handlePrint}
        />
      )}
    </div>



    </div>
  );
};

export default Order;
