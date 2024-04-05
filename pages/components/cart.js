import React, { useState,useEffect } from 'react'
import CartItem from './cartItem';
import { useRouter } from 'next/router';

function cart() {
  const [carts,setCarts] = useState([]); 
  const [initialTotal, setInitialTotal] = useState(0);
  const [subtotal, setSubtotal] = useState(initialTotal);
  const [updateTotal, setUpdateTotal] = useState(false);
  const router = useRouter();
  const Payment = () => {
    router.push('/components/paymentBtn');
  };

  useEffect(() => {
    const fetchCarts = async () => {
        try {
            const response = await fetch('/api/carts');
            if (!response.ok) {
                throw new Error('Failed to fetch carts');
            }
            const data = await response.json();
            setCarts(data);
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };
    fetchCarts();
}, []);

  useEffect(() => {
      const initialTotal = carts.reduce((acc, item) => acc + item.total, 0);
      setSubtotal(initialTotal);
  }, [carts,updateTotal]);

 const handleUpdateTotal = (newTotal) => {
    setSubtotal(prevSubtotal => prevSubtotal + newTotal - initialTotal);
    setInitialTotal(newTotal); 
};

const handleDeleteItem = async (productId) => {
  try {
    const response = await fetch(`/api/deletecat/${productId}`)
    if (response.ok) {
      const updatedCarts = carts.filter((cart) => cart.id_product !== productId);
      setCarts(updatedCarts);
    } else {
      throw new Error('Failed to delete product from cart');
    }
  } catch (error) {
    console.error('Error deleting product:', error);
  }
};

  return (
    <div>
  <div class="min-h-screen bg-gray-100 pt-20">
    <h1 class="mb-10 text-center text-2xl font-bold">Your Cart </h1>
    <div class="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
      <div class="rounded-lg md:w-2/3">
        {carts.length > 0 && carts.map((cart, index) => (
           <CartItem key={index} cart={cart} onUpdateTotal={handleUpdateTotal}  onDeleteItem={handleDeleteItem} />
        ))}
      </div>
      <div class="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
        <div class="mb-2 flex justify-between">
          <p class="text-gray-700">Subtotal</p>
          <p class="text-gray-700">${subtotal.toFixed(2)}</p>
        </div>
        <div class="flex justify-between">
          <p class="text-gray-700">Shipping</p>
          <p class="text-gray-700">$4.99</p>
        </div>
        <hr class="my-4" />
        <div class="flex justify-between">
          <p class="text-lg font-bold">Total</p>
          <div class="">
            <p class="mb-1 text-lg font-bold">${(subtotal + 4.99).toFixed(2)} USD</p>
            <p class="text-sm text-gray-700">including VAT</p>
          </div>
        </div>
          <button onClick={Payment} class="mt-6 w-full rounded-md bg-yellow-500 py-1.5 font-medium text-blue-50 hover:bg-yellow-600">Check out</button>
      </div>
    </div>
  </div>
</div>
  )
}

export default cart