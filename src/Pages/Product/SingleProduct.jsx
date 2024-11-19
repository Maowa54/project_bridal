import React from 'react'
import shoee from '../../assets/shoee.jfif'
import { FaBackward } from 'react-icons/fa'
const SingleProduct = () => {
    return (
        <div>


            <div className='w-[13%] my-5 mx-auto'>

                <div >
                    <img className=' ' src={shoee} alt="s" />

                </div>
                <div >
                    <h1 >Name :</h1>
                    <h1  >Category :</h1>
                </div>

            </div>



            <div className=' flex  gap-6'>

                <h1 className=" shadow-[rgba(0,_0,_0,_0.20)_0px_2px_6px]  text-[14px] md:text-[16px] font-semibold rounded-lg w-full p-2" >Stock : </h1>
                <h1 className=" shadow-[rgba(0,_0,_0,_0.20)_0px_2px_6px]  text-[14px] md:text-[16px] font-semibold rounded-lg w-full p-2" >Code : </h1>
                <h1 className=" shadow-[rgba(0,_0,_0,_0.20)_0px_2px_6px]  text-[14px] md:text-[16px] font-semibold rounded-lg w-full p-2" > Discount : </h1>
                <h1 className=" shadow-[rgba(0,_0,_0,_0.20)_0px_2px_6px]  text-[14px] md:text-[16px] font-semibold rounded-lg w-full p-2" > Discount Rate : </h1>

            </div>

            <div className=' mt-16 mb-5'>
                <h1 className=' font-bold text-2xl'>Variation & Value</h1>


                {/* <div className='flex gap-6 mt-5'>

                    <div>
                    <h1 className="shadow-[rgba(0,_0,_0,_0.20)_0px_2px_6px] text-[14px] md:text-[16px] font-semibold rounded-lg w-full p-2">Variation:</h1>
  <h1 className="shadow-[rgba(0,_0,_0,_0.20)_0px_2px_6px] text-[14px] md:text-[16px] font-semibold rounded-lg w-full p-2">Costing Price:</h1>
  <h1 className="shadow-[rgba(0,_0,_0,_0.20)_0px_2px_6px] text-[14px] md:text-[16px] font-semibold rounded-lg w-full p-2">Selling Price:</h1>
  <h1 className="shadow-[rgba(0,_0,_0,_0.20)_0px_2px_6px] text-[14px] md:text-[16px] font-semibold rounded-lg w-full p-2">Stock:</h1>

  <h1 className="shadow-[rgba(0,_0,_0,_0.20)_0px_2px_6px] text-[14px] md:text-[16px] font-semibold rounded-lg w-full p-2">Code:</h1>
                    </div>
 
  <h1 className="shadow-[rgba(0,_0,_0,_0.20)_0px_2px_6px] text-[14px] md:text-[16px] font-semibold rounded-lg w-full p-2">Discount:</h1>
  <h1 className="shadow-[rgba(0,_0,_0,_0.20)_0px_2px_6px] text-[14px] md:text-[16px] font-semibold rounded-lg w-full p-2">Discount Rate:</h1>
</div> */}
   <div className=' flex mb-6  gap-6'>

<h1 className=" shadow-[rgba(0,_0,_0,_0.20)_0px_2px_6px]  text-[14px] md:text-[16px] font-semibold rounded-lg w-full p-2" >Stock : </h1>
<h1 className=" shadow-[rgba(0,_0,_0,_0.20)_0px_2px_6px]  text-[14px] md:text-[16px] font-semibold rounded-lg w-full p-2" >Code : </h1>
<h1 className=" shadow-[rgba(0,_0,_0,_0.20)_0px_2px_6px]  text-[14px] md:text-[16px] font-semibold rounded-lg w-full p-2" > Discount : </h1>
<h1 className=" shadow-[rgba(0,_0,_0,_0.20)_0px_2px_6px]  text-[14px] md:text-[16px] font-semibold rounded-lg w-full p-2" > Discount Rate : </h1>

</div>

<div className=' flex  gap-6'>

<h1 className=" shadow-[rgba(0,_0,_0,_0.20)_0px_2px_6px]  text-[14px] md:text-[16px] font-semibold rounded-lg w-full p-2" >Stock : </h1>
<h1 className=" shadow-[rgba(0,_0,_0,_0.20)_0px_2px_6px]  text-[14px] md:text-[16px] font-semibold rounded-lg w-full  p-2" >Code : </h1>
<h1 className=" shadow-[rgba(0,_0,_0,_0.20)_0px_2px_6px]  text-[14px] md:text-[16px] font-semibold rounded-lg w-full  p-2" > Discount : </h1>
<h1 className="   text-[14px] md:text-[16px] font-semibold rounded-lg w-full p-2" > </h1>

</div>

            </div>

            <div className=' flex justify-end'>
                <button className=' shadow-[rgba(0,_0,_0,_0.20)_0px_2px_6px]  text-[14px] md:text-[16px] font-semibold rounded-lg mt-4  px-3 py-2 flex gap-3'><FaBackward size={25} /> Go Back </button>
            </div>



        </div>
    )
}

export default SingleProduct
