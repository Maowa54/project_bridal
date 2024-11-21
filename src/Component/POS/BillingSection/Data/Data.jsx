import  { useState ,useEffect} from 'react';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import axios from 'axios';
import { ImSpinner10 } from "react-icons/im";
const Data = ({handleErrors ,businessId}) => {


  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const clientId = localStorage.getItem("clientId");


  const [customerName, setCustomerName] = useState('');


  const [phoneNumber, setPhoneNumber] = useState('');

  const [source, setSource] = useState('');
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
  
 
   
  
    const formData = new FormData();
    formData.append('client_id', clientId);
    formData.append('user_id', userId);
    formData.append('business_id', businessId);
    formData.append('c_name', customerName);
    formData.append('c_phone', phoneNumber);
    formData.append('source', source);
  
    formData.append('address', address);
  
  
    setLoading(true); // Start loading
    try {
      const response = await axios.post('https://admin.attireidyll.com/api/order/data', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (response.data.status) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: response.data.message || "Order created successfully!",
          showConfirmButton: false,
          timer: 2000
        });

        localStorage.removeItem(cacheKey);
        localStorage.removeItem(cacheTimeKey);
  
        // Reset form fields
        setCustomerName('');
        setPhoneNumber('');
   
        setAddress('');
       
        setSource('');
      
        setErrors({});
      
        removeAllProducts();
        handleErrors('');
      }
      
    //  else if (response.data.type === 'invalid') {
    //     toast.error(response.data.message);
    //   }
      
      else {


        const newErrors = response.data.error || {};
        setErrors(newErrors);
        handleErrors(newErrors);

        toast.error(Object.keys(response.data.error).map((field) => ` ${response.data.error[field][0]}`));


      }
    } catch (error) {
      console.error('Error saving Order:', error.response ? error.response.data : error.message);
    } finally {
      setLoading(false); // Stop loading after completion or error
    }
  };



  return (
    <div className="w-full mx-auto py-3 ">
      <form onSubmit={handleSave}  className="space-y-4">
      <div className='flex gap-3  md:flex-row'>


{/* phone */}
<div className=' flex-1'>


  <label htmlFor="phone" className="block  text-[14px] md:text-[16px] font-semibold  text-gray-600 dark:text-white">Customer Phone</label>

  <input type="text" id="first_name" className="bg-white
shadow-[rgba(0,_0,_0,_0.20)_0px_2px_6px] h-8
  text-[14px] md:text-[16px] font-semibold rounded-lg w-full p-1"
    value={phoneNumber}  onChange={(e) => setPhoneNumber(e.target.value)}
  />
                {errors.c_phone && <p className="text-red-500 text-sm">{errors.c_phone[0]}</p>}



</div>





<div className=' flex-1'>
  <label htmlFor="first_name" className="block  text-[14px] md:text-[16px] font-semibold  text-gray-600 dark:text-white">Customer name</label>

  <input 
  value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
   type="text" id="first_name" className="bg-white shadow-[rgba(0,_0,_0,_0.20)_0px_2px_6px]  text-[14px] md:text-[16px] font-semibold rounded-lg w-full p-1" />
                 {errors.c_name && <p className="text-red-500 text-sm">{errors.c_name[0]}</p>}

</div>


</div>
        <div>
        <label htmlFor="first_name" className="block  text-[14px] md:text-[16px] font-semibold  text-gray-600 dark:text-white">Address</label>
        <textarea  value={address}
  onChange={(e) => setAddress(e.target.value)}
      className="appearance-none h-16 md:h-12  border shadow-[rgba(0,_0,_0,_0.20)_0px_2px_6px] rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-1"
    ></textarea> 
            {errors.address && <p className="text-red-500 text-sm">{errors.address[0]}</p>}
        </div>
        <div className="flex-1 mx-auto">
              <h2 className='block  text-[14px] md:text-[16px] font-semibold  text-gray-600 dark:text-white'>Source </h2>
              <select
 
  className="border h-9 border-gray-300 shadow-[rgba(0,_0,_0,_0.20)_0px_2px_6px]  text-gray-900 text-[14px] md:text-[16px] rounded-lg   block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  value={source}
  onChange={(e) => setSource(e.target.value)}
>

<option value="">select source</option>

  <option value="Facebook">Facebook</option>
  <option value="Instagram">Instagram</option>
  <option value="WhatsApp">WhatsApp</option>
  <option value="Phone Call">Phone Call</option>
</select>
{errors.source && <p className="text-red-500 text-sm">{errors.source[0]}</p>}


            </div>
        {/* <button
          type="submit"
          className="w-full py-2 px-4 bg-[#28DEFC] text-white font-semibold rounded-md shadow-md hover:bg-sky-500 focus:ring focus:ring-indigo-200"
        >
          Save
        </button> */}

<button
    type="submit"
    className="w-full rounded-lg px-2 py-3 text-white bg-[#28DEFC] hover:bg-[#444CB4] "
    disabled={loading} // Disable button while loading

  >
    {loading ? (
      <div className='flex justify-center w-full'>
        <ImSpinner10 className='animate-spin text-white' size={20} />
        <span className='px-2'>Saving.......</span>
      </div>
    ) : (
      <>
        <h1 cclassName="w-full py-2 px-4 bg-[#28DEFC] text-white font-semibold rounded-md shadow-md hover:bg-sky-500 focus:ring focus:ring-indigo-200">Save</h1>
        
      </>
    )}
  </button>
      </form>
    </div>
  );
};

export default Data;
