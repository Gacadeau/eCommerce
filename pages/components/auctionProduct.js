import { data } from 'autoprefixer';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react'

// Product component to display product details
const AuctionProduct = ({id}) => {
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState(null);
    const [myprice,setMyprice]=useState(1)
    const [isLoading,setIsLoading]=useState(true)
    const {data: session, status:status} = useSession()
  
    // Function to handle quantity change
    const handleQuantityChange = (e) => {
      setQuantity(parseInt(e.target.value));
    };
    const fetchproduct = async ()=>{
      console.log('object',id);
      try{
      const response = await fetch(`/api/auction/${id}`);
      if(!response.ok){
        throw new Error('Failed to fetch this product');
      }
        const data = await response.json();
        console.log("objectui",data);
        setProduct(data);
        setIsLoading(false)
    }
    catch(error){
      console.error('Error fetching product:', error);
      }
    }
   useEffect(()=>{
    fetchproduct();
    
   },[])
   
    // Function to handle add to cart button click
    const handleUpdateCAution = async () => {
     console.log("rsf",myprice,product.data.unit_price);
      if(myprice>product.data.unit_price){
        console.log('objet');
        const response = await fetch('/api/updateCaution', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
             total:myprice,
             id:product.data.id
          })
        })
        const data = await response.json()
        if (response.ok) {
          if (data.success) {
            console.log("objectop");
            fetchproduct();
            setMyprice(0)
          } else {
            console.error('Error of adding');
          }
      }
   }
   else{
    setMyprice(0)
   };
  }
  //Countdown Timer
  const [deadline, setDeadline] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
    isReached : false,
  })

  useEffect(() => {

          function countdown() {
              const now = new Date().getTime();
              const deadlineTime = new Date(new Date('2024-05-04T12:12:00')).getTime();
              const remainingTime = deadlineTime - now;
  
              if (remainingTime <= 0) {
                  setDeadline({
                    days: "00",
                    hours: "00",
                    minutes: "00",
                    seconds: "00",
                    isReached : true,
                  })
                  return;
              }
              const intervalId = setInterval(() => {
                  const now = new Date().getTime();
                  const remainingTime = deadlineTime - now;
                  const seconds = Math.floor((remainingTime / 1000) % 60);
                  const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
                  const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
                  const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
                  setDeadline({
                    days: days,
                    hours: hours,
                    minutes: minutes,
                    seconds: seconds,
                    isReached : false,
                  })
  
                  if (remainingTime <= 0) {
                      setDeadline('Deadline reached !')
                      clearInterval(intervalId);
                  }
              }, 1000); // Update every second
          }
  
          // Example usage
          countdown();
      }, [])


  return (
    <div class="min-w-screen min-h-screen bg-white flex flex-col space-y-4 lg:flex-row lg:space-x-8  p-5 lg:px-10 lg:pt-20 overflow-hidden relative">
    <div class="w-full max-w-6xl rounded bg-white shadow-xl p-10 lg:p-20 mx-auto text-gray-800 relative md:text-left">
      {/* count-down Timer */}
      <div className=" countDownTimer mb-4">
      <div className="flex flex-col items-center justify-center w-full h-full gap-8 sm:gap-16">
      <span className="text-2xl  font-semibold text-black text-center tracking-widest px-2">
          Take Offer Now, Time is Short
        </span>
        <div className="flex justify-center gap-3 sm:gap-8">
          <div className="flex flex-col gap-5 relative">
            <div className="h-16 w-16 sm:w-20 sm:h-20   flex justify-between items-center bg-yellow-500 ">
              <div className="relative h-2.5 w-2.5 sm:h-3 sm:w-3 !-left-[6px] rounded-full bg-yellow-700"></div>
              <span className="sm:text-4xl text-3xl font-semibold text-white">
                {deadline?.days}
              </span>
              <div className="relative h-2.5 w-2.5 sm:h-3 sm:w-3 -right-[6px] rounded-full bg-yellow-700"></div>
            </div>
            <span className="text-[#8486A9] text-xs sm:text-lg text-center capitalize">
              {deadline?.days == 1 ? "Day" : "Days"}
            </span>
          </div>
          <div className="flex flex-col gap-5 relative">
            <div className="h-16 w-16 sm:w-20 sm:h-20   flex justify-between items-center bg-yellow-500 ">
              <div className="relative h-2.5 w-2.5 sm:h-3 sm:w-3 !-left-[6px] rounded-full bg-yellow-700"></div>
              <span className="sm:text-4xl text-3xl font-semibold text-white">
                {deadline?.hours}
              </span>
              <div className="relative h-2.5 w-2.5 sm:h-3 sm:w-3 -right-[6px] rounded-full bg-yellow-700"></div>
            </div>
            <span className="text-[#8486A9] text-xs sm:text-lg text-center font-medium">
              {deadline?.hours == 1 ? "Hour" : "Hours"}
            </span>
          </div>
          <div className="flex flex-col gap-5 relative">
            <div className="h-16 w-16 sm:w-20 sm:h-20   flex justify-between items-center bg-yellow-500 ">
              <div className="relative h-2.5 w-2.5 sm:h-3 sm:w-3 !-left-[6px] rounded-full bg-yellow-700"></div>
              <span className="sm:text-4xl text-3xl font-semibold text-white">
                {deadline?.minutes}
              </span>
              <div className="relative h-2.5 w-2.5 sm:h-3 sm:w-3 -right-[6px] rounded-full bg-yellow-700"></div>
            </div>
            <span className="text-[#8486A9] text-xs sm:text-lg text-center capitalize">
              {deadline?.minutes == 1 ? "Minute" : "Minutes"}
            </span>
          </div>
          <div className="flex flex-col gap-5 relative">
            <div className="h-16 w-16 sm:w-20 sm:h-20  flex justify-between items-center bg-yellow-500 ">
              <div className="relative h-2.5 w-2.5 sm:h-3 sm:w-3 !-left-[6px] rounded-full bg-yellow-700"></div>
              <span className=" sm:text-4xl text-3xl font-semibold text-white">
                {deadline?.seconds}
              </span>
              <div className="relative h-2.5 w-2.5 sm:h-3 sm:w-3 -right-[6px] rounded-full bg-yellow-700"></div>
            </div>
            <span className="text-[#8486A9] text-xs sm:text-lg text-center capitalize">
              {deadline?.seconds == 1 ? "Second" : "Seconds"}
            </span>
          </div>
          <div>
            {
              deadline.isReached? <h1 className='text-xl font-bold text-red-800'>Deadline Reached</h1> : <h1></h1>
            }
          </div>
        </div>
      </div>
    </div>
    {/* fin count- down timer */}
        <div class="md:flex items-center -mx-10">
            <div class="w-full md:w-1/2 px-10 mb-10 md:mb-0">
                <div class="relative">
                    {product && product?.data?.photo && (
                        <img src={`/Photos/${product?.data?.photo}`} className="w-full relative z-10" alt="" />
                    )}
                    <div class="border-4 border-yellow-200 absolute top-10 bottom-10 left-10 right-10 z-0"></div>
                </div>
            </div>
            <div class="w-full md:w-1/2 px-10">
                <div class="mb-10">
                {product && (
                      <h1 class="font-bold uppercase text-2xl mb-5">{product?.data?.n_product}</h1>
                  )}
                {product && (
                    <p class="text-sm">{product?.data?.description} <a href="#" class="opacity-50 text-gray-900 hover:opacity-100 inline-block text-xs leading-none border-b border-gray-900">MORE <i class="mdi mdi-arrow-right"></i></a></p>
                )}
                </div>
                <div>
                    <div class="inline-block align-bottom mr-5">
                      {isLoading && (
                          <p>Loading...</p>
                        ) }
                        {/* {product && product.data.photo && (
                        <span class="font-bold text-5xl leading-none align-baseline">{product.data.unit_price}</span>
                        
                        )} */}
                        {isLoading ? (
                          <p>Loading...</p>
                        ) : (<>
                        <p className="pt-1 text-gray-900">Open Price : <span className='font-semibold text-xl bg-red-500 p-1'>${product?.data?.open_price}</span></p>
                          <p className="pt-1 text-gray-900">Actual Price : <span className='font-semibold text-4xl'>${product?.data?.unit_price}</span></p>
                        </>
                          
                        )}
                        {/* <p className="pt-1 text-gray-900">Actual Price : <span className='font-semibold text-md bg-red-500 p-1'>{product.data.unit_price}</span></p> */}
                        {/* <p className="pt-1 text-gray-900">Actual Price : <span className='font-semibold text-2xl'></span></p> */}
                        
                        <input type='number' placeholder='add your price here' value={myprice} onChange={(e) => setMyprice(e.target.value)} className='mt-3 p-4 bg-gray-200' />
                    </div>
                    <div class="inline-block align-bottom mt-2">
  
                        <button onClick={handleUpdateCAution} class="bg-yellow-300 opacity-75 hover:opacity-100 text-yellow-900 hover:text-gray-900 rounded-md px-10 py-2 font-semibold"><i class="mdi mdi-cart -ml-2 mr-2"></i>Submit your price</button>
                    </div>
                 
                </div>
            </div>
        </div>
    </div>
        {/* ///list aside */}
        <div class="max-w-2xl min-w-[23rem]  lg:min-w-[25rem]  mx-auto ">

<div class="p-4 max-w-md shadow-xl bg-white rounded-lg border  sm:p-8 dark:bg-gray-800 dark:border-gray-700">
  <div class="flex justify-between items-center mb-4">
      <h3 class="text-xl font-bold leading-none text-gray-900 dark:text-white">Price Rank</h3>
      <a href="#" class="text-sm font-medium text-yellow-600 hover:underline dark:text-yellow-500">
          View all
      </a>
</div>
<div class="flow-root">
      <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
          <li class="py-3 sm:py-4">
              <div class="flex items-center space-x-4">
                  <div class="flex-shrink-0">
                      <img class="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-1.jpg" alt="Neil image"/>
                  </div>
                  <div class="flex-1 min-w-0">
                      <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                          Neil Sims
                      </p>
                      <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                          email@windster.com
                      </p>
                  </div>
                  <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      $320
                  </div>
              </div>
          </li>
          <li class="py-3 sm:py-4">
              <div class="flex items-center space-x-4">
                  <div class="flex-shrink-0">
                      <img class="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-3.jpg" alt="Bonnie image"/>
                  </div>
                  <div class="flex-1 min-w-0">
                      <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                          Bonnie Green
                      </p>
                      <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                          email@windster.com
                      </p>
                  </div>
                  <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      $3467
                  </div>
              </div>
          </li>
          <li class="py-3 sm:py-4">
              <div class="flex items-center space-x-4">
                  <div class="flex-shrink-0">
                      <img class="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-2.jpg" alt="Michael image"/>
                  </div>
                  <div class="flex-1 min-w-0">
                      <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                          Michael Gough
                      </p>
                      <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                          email@windster.com
                      </p>
                  </div>
                  <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      $67
                  </div>
              </div>
          </li>
          <li class="py-3 sm:py-4">
              <div class="flex items-center space-x-4">
                  <div class="flex-shrink-0">
                      <img class="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-4.jpg" alt="Lana image"/>
                  </div>
                  <div class="flex-1 min-w-0">
                      <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                          Lana Byrd
                      </p>
                      <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                          email@windster.com
                      </p>
                  </div>
                  <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      $367
                  </div>
              </div>
          </li>
          <li class="pt-3 pb-0 sm:pt-4">
              <div class="flex items-center space-x-4">
                  <div class="flex-shrink-0">
                      <img class="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="Thomas image"/>
                  </div>
                  <div class="flex-1 min-w-0">
                      <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                          Thomes Lean
                      </p>
                      <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                          email@windster.com
                      </p>
                  </div>
                  <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      $2367
                  </div>
              </div>
          </li>
      </ul>
</div>
</div>

</div>
    </div>
  );
};

export default AuctionProduct;

