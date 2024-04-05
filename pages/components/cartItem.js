import React, { useEffect, useState } from 'react'

function CartItem({ cart, onUpdateTotal, onDeleteItem  }) {
    const [count, setCount] = useState(cart.qte);
    const [total, setTotal] = useState(cart.total); 
    const [value, setValue] = useState(true); 

    const decreaseCount = () => {
      if (count > 1) { 
        setCount(count - 1);
        const updatetotal = async (productId, newCount) => { 
          try {
            const response = await fetch(`/api/updatetotalcard/${productId}?body=${newCount}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              }
            });
            if (!response.ok) {
              throw new Error('Failed to update the total for this product');
            }
            setValue(!value)
          } catch (error) {
            console.error('Error updating product total:', error);
          }
        };
        updatetotal(cart.id_product, count - 1); 
      }
    };
    const increaseCount = () => {
      setCount(count + 1);
      const updatetotal = async (productId, newCount) => { 
        try {
          const response = await fetch(`/api/updatetotalcard/${productId}?body=${newCount}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            }
          });
          if (!response.ok) {
            throw new Error('Failed to update the total for this product');
          }
          setValue(!value)
        } catch (error) {
          console.error('Error updating product total:', error);
        }
      };  
      updatetotal(cart.id_product, count + 1); 
    };

    useEffect(() => {
      const newTotal = cart.unit_price * count;
      setTotal(newTotal);
      onUpdateTotal(newTotal); 
  }, [count]);
  
    const handleDelete = () => {
      onDeleteItem(cart.id_product);
    };
  return (
    <div>
        <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
          <img  src={`/Photos/${cart.photo}`}  alt="product-image" className="w-full rounded-lg sm:w-40" />
          <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
            <div className="mt-5 sm:mt-0">
              <h2 className="text-lg font-bold text-gray-900">{cart.n_product}</h2>
              <p className="mt-1 text-xs text-gray-700">{cart.unit_price} $</p>
            </div>
            <div className="mt-4 flex justify-between im sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
              <div className="flex items-center border-gray-100">
                <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50" onClick={decreaseCount}> - </span>
                <input className="h-8 w-8 border bg-white text-center text-xs outline-none" type="number" value={count} min="1" readOnly />
                <span className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50" onClick={increaseCount}> + </span>
            </div>
              <div className="flex items-center space-x-4">
                <p className="text-sm" >{total} $</p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500" onClick={handleDelete}>
                  <path stroke-linecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}
export default CartItem