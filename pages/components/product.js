import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react'

const Product = ({id}) => {
    const [product, setProduct] = useState(null);
    const {data: session, status:status} = useSession()

   useEffect(()=>{
    const fetchproduct = async ()=>{
      try{
      const response = await fetch(`/api/products/${id}`);
      if(!response.ok){
        throw new Error('Failed to fetch this product');
      }
      const data = await response.json();
      
      setProduct(data);
    }
    catch(error){
      console.error('Error fetching product:', error);
      }
    }
    fetchproduct();
   },[])
    // Function to handle add to cart button click
    const handleAddToCart = async () => {
      console.log('session:',session.user);
      const response = await fetch('/api/addtocart', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_product: product.data.id,
          id_user:session.user.email,
          n_product:product.data.n_product,
          unit_price : product.data.unit_price,
          photo:product.data.photo,
          total:product.data.unit_price,
          qte:1
        })
      })
      const data = await response.json()
      if (response.ok) {
        if (data.success) {
         console('product added successfully')
        } else {
          console.error('Error of adding');
        }

    };
  }

  return (
    <div class="min-w-screen min-h-screen bg-white flex items-center p-5 lg:p-10 overflow-hidden relative">
    <div class="w-full max-w-6xl rounded bg-white shadow-xl p-10 lg:p-20 mx-auto text-gray-800 relative md:text-left">
        <div class="md:flex items-center -mx-10">
            <div class="w-full md:w-1/2 px-10 mb-10 md:mb-0">
                <div class="relative">
                    {product && product.data.photo && (
                        <img src={`/Photos/${product.data.photo}`} className="w-full relative z-10" alt="" />
                    )}
                    <div class="border-4 border-yellow-200 absolute top-10 bottom-10 left-10 right-10 z-0"></div>
                </div>
            </div>
            <div class="w-full md:w-1/2 px-10">
                <div class="mb-10">
                {product && (
                      <h1 class="font-bold uppercase text-2xl mb-5">{product.data.n_product}</h1>
                  )}
                {product && (
                    <p class="text-sm">{product.data.description} <a href="#" class="opacity-50 text-gray-900 hover:opacity-100 inline-block text-xs leading-none border-b border-gray-900">MORE <i class="mdi mdi-arrow-right"></i></a></p>
                )}
                </div>
                <div>
                    <div class="inline-block align-bottom mr-5">
                        <span class="text-2xl leading-none align-baseline">$</span>
                        {product && product.data.photo && (
                        <span class="font-bold text-5xl leading-none align-baseline">{product.data.unit_price}</span>
                        )}
                    </div>
                    <a href='/'>
                    <div class="inline-block align-bottom">
                        <button onClick={handleAddToCart} class="bg-yellow-300 opacity-75 hover:opacity-100 text-yellow-900 hover:text-gray-900 rounded-full px-10 py-2 font-semibold"><i class="mdi mdi-cart -ml-2 mr-2"></i> Add to cart</button>
                    </div>
                 </a>
                </div>
            </div>
        </div>
    </div>
    </div>
  );
};

export default Product;
