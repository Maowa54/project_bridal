import axios from 'axios';
import React, { useEffect, useState } from 'react'

const SmsHistory = () => {
    const token = localStorage.getItem("token");
    const clientId = localStorage.getItem("clientId");

    const [histories, setHistories] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchStockHistories = async () => {
        try {
            const response = await axios.get(`https://expressitplus.co.uk/api/sms/history/get/${clientId}`, {
                headers: {
                  'Authorization': `Bearer ${token}`,
                },
              });
          if (response.data.status) {
            console.log(response.data.status); 
            console.log(response.data.data); 
            setHistories(response.data.data); 
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false); 
        }
      };
  
      fetchStockHistories();
    }, []);
  console.log(histories)
    if (loading) {
      return <div>Loading...</div>; 
    }
  return (
    <div>
       <div>

<div className="w-full shadow py-4 flex pe-4">
                <h2 className="px-4 text-xl font-semibold">SMS History</h2>
              
            </div>

            <div>
          <select  className="border  border-sky-300 mt-4 rounded-lg text-xl font-bold px-4 py-1">
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>


        {/* Table */}
        <div className="overflow-x-auto">
      <table className="table w-full mt-8">
       
        <thead className="md:text-[18px] text-gray-700 shadow-[rgba(0,_0,_0,_0.24)_0px_1px_5px]">
          <tr>
            <th>SL</th>
            <th>Sender Id</th>
            <th>Phone Number</th>
            <th>Message Title</th>
            <th>Date & Time</th>
            <th>Action</th>
          </tr>
        </thead>
        {/* Table Body */}
        <tbody className="md:text-[16px] font-semibold text-gray-500 ">
        {histories.length > 0 ? (
  histories.map((history, index) => (
    <tr key={history.id}>
      <td>{index + 1}</td>
      <td>{history.sender_id}</td>
      <td>{history.number}</td>
      <td>{history.message}</td>
    
      <td>{new Date(history.updated_at).toLocaleString()}</td>

      <td >
        <button className='bg-sky-400 text-white px-5 py-1 rounded-lg'>View</button>
      </td>
    </tr>
  ))
) : (
  <tr>
    <td colSpan="6" className="text-center">
        <img className=' text-center mx-auto w-[20%]' src="https://www.spireskills.com/assets/images/no-records.png" alt="No record found" srcset="" />
    </td>
  </tr>
)}

        </tbody>
      </table>
    </div>
    </div>
    </div>
  )
}

export default SmsHistory
