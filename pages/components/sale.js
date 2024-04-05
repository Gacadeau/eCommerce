import Link from 'next/link'
import React from 'react'
import { useState ,useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function Sale() {
    const [products,setProducts] = useState([]); 
    const [loading, setLoading] = useState(true);
    const {data: session, status:status} = useSession()
     const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const router = useRouter()

    useEffect(()=>{
      const fetchProducts = async()=>{
        try{
             const response = await fetch('/api/products');
             if(!response.ok){
                throw new Error('Failed to fetch products');
             }
             const data = await response.json();
             setProducts(data);
             setLoading(false);
        }catch(error){
            console.error('Error fetching products:',error);
            setLoading(false);
        }
      };

      fetchProducts();
    },[])

    useEffect(()=>{
        const interval = setInterval(()=>{
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % products.length);
        },2000);
        return ()=>clearInterval(interval);
    },[products.length])

    const handleBuyClick = (product) => {
        if(status!='authenticated' && !session ){
            router.push({
                pathname:'/api/auth/signin'
            })
        }
        else{
        router.push({
            pathname: '/productSale',
            query: { 
                id: product.id, 
            },
        })
    }
        ;
    };

  if(loading){
    return <div>Loading......</div>
  }

  return (
    <div>
        <section className="bg-white py-8">

            <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12">
                <nav id="store" className="w-full z-30 top-0 px-6 py-1">
                    <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3">
                        <a className="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl " href="#">
                        Sales
                    </a>
                        <div className="flex items-center" id="store-nav-content">
                            <a className="pl-3 inline-block no-underline hover:text-black" href="#">
                                <svg className="fill-current hover:text-black" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path d="M7 11H17V13H7zM4 7H20V9H4zM10 15H14V17H10z" />
                                </svg>
                            </a>

                            <a className="pl-3 inline-block no-underline hover:text-black" href="#">
                                <svg className="fill-current hover:text-black" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path d="M10,18c1.846,0,3.543-0.635,4.897-1.688l4.396,4.396l1.414-1.414l-4.396-4.396C17.365,13.543,18,11.846,18,10 c0-4.411-3.589-8-8-8s-8,3.589-8,8S5.589,18,10,18z M10,4c3.309,0,6,2.691,6,6s-2.691,6-6,6s-6-2.691-6-6S6.691,4,10,4z" />
                                </svg>
                            </a>

                        </div>
                </div>
                </nav>
                 {products.length >0 && (
                    <div className="bg-white shadow-md rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
                        <a href="#">
                        {products[currentImageIndex] && (
                            <img className="rounded-t-lg p-8"
                            src={`/Photos/${products[currentImageIndex].photo}`}
                            alt="product image"/>
                        )}
                        </a>
                            <div className="px-5 pb-5">
                                <a href="#">
                                {products[currentImageIndex] && (
                                <h3 className="text-gray-900 font-semibold text-xl tracking-tight dark:text-white">${products[currentImageIndex].n_product}</h3>
                                )}
                                </a>
                                <div className="flex items-center mt-2.5 mb-5">
                                    <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                        </path>
                                    </svg>
                                    <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                        </path>
                                    </svg>
                                    <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                        </path>
                                    </svg>
                                    <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                        </path>
                                    </svg>
                                    <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                        </path>
                                    </svg>
                                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">5.0</span>
                                </div>
                                <div className="flex items-center justify-between">
                                        {products[currentImageIndex] && (
                                        <span className="text-3xl font-bold text-gray-900 dark:text-white">${products[currentImageIndex].a_stock}</span>
                                        )}
                                        <button  onClick={() => handleBuyClick(products[currentImageIndex])} 
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add
                                        to cart
                                        </button>
                                </div>
                            </div>
                    </div>
                 )};
            
                {products.length > 0 && products.map((product, index) => (
                <div key={index} onClick={() => handleBuyClick(product)}  className="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col">
                
                    <img className="hover:grow hover:shadow-lg" src={`/Photos/${product.photo}`} alt={product.n_product} />
                    <div className="pt-3 flex items-center justify-between">
                        <p className="">{product.n_product}</p>
                        <button onClick={() => handleBuyClick(product)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4">
                            Buy
                        </button>
                    </div>
                    <p className="pt-1 text-gray-900">${product.unit_price}</p>
                
                </div>
                 ))}
                 <div className='flex  items-center'>
                 <button className="bg-yellow-300 opacity-75 hover:opacity-100 text-yellow-900 hover:text-gray-900 rounded-full px-10 py-2 font-semibold">
                     more product
                     </button>
                 </div>
            </div>
        </section>
    </div>
  )
}
