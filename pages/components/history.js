import React from 'react'
import {  useSession } from 'next-auth/react'
import { useEffect,useState } from 'react';

function History() {
    const {data: session, status:status} = useSession()
    const [carts,setCarts] = useState([]); 
    const [cart,setCart] = useState([]); 

    const now = new Date();

    useEffect(() => {
        const fetchCarts = async () => {
            try {
                const response = await fetch(`/api/history/${session.user.email}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch carts');
                }
                const data = await response.json();
                console.log('data1:',data)
                setCart(data);
            } catch (error) {
                console.error('Error fetching cart:', error);
            }
        };
        fetchCarts();
    }, []);
   
    useEffect(() => {
      if(cart!==null){
        setCarts(cart.data);
      }
    }, [cart]);
   
  return (
    <>
          <head>
        <link rel="stylesheet" href="https://horizon-tailwind-react-corporate-7s21b54hb-horizon-ui.vercel.app/static/css/main.d7f96858.css" />
    </head>

        <div class="flex flex-col justify-center items-center  pt-4">
        <div class="flex items-center justify-between rounded-t-3xl p-6  w-full">
                    <div class="text-lg font-bold text-navy-700 lg:ml-28 dark:text-white">
                        History
                    </div>
                </div>
            <div class="relative flex flex-col items-center rounded-[10px] border-[1px] max-h-[100vh] overflow-y-auto border-gray-200 w-[600px] mx-auto p-4 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
            {carts && carts.map((cat, index) => (
                <div key={index} class="flex h-full w-full items-start justify-between rounded-md border-[1px] border-[transparent] dark:hover:border-white/20 bg-white px-3 py-[20px] transition-all duration-150 hover:border-gray-200 dark:!bg-navy-800 dark:hover:!bg-navy-700">
                    <div class="flex items-center gap-3">
                        <div class="flex h-16 w-16 items-center justify-center">
                        <img
                            class="h-full w-full rounded-xl"
                            src={`/Photos/${cat.photo}`} 
                            alt=""
                        />
                        </div>
                        <div class="flex flex-col">
                        <h5 class="text-base font-bold text-navy-700 dark:text-white">
                            {cat.n_product}
                        </h5>
                        <p class="mt-1 text-sm font-normal text-gray-600">
                            Qty : <span>{cat.qte}</span>
                        </p>
                        <p class="mt-1 text-sm font-normal text-yellow-600">
                            Paid and recieved
                        </p>
                        </div>
                    </div> 
                    <div class="mt-1 flex items-center justify-center text-navy-700 dark:text-white">
                        
                        <div class="ml-1 flex items-center text-sm font-bold text-yellow-700">
                        <p>   </p>
                        {cat.total}<p class="ml-1">$</p>
                        </div>
                        <div class="ml-2 flex items-center text-sm font-normal text-gray-600 dark:text-white">
                        <p>{`${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`}</p>
                        </div>
                    </div>
                </div>
            ))}
            </div>  
            

        </div>
    </>
  

  )
}

export default History