import React from 'react'
import { useRouter } from 'next/router'
import AuctionProduct from './components/auctionProduct'

const auctionProduct = () => {
    const router=useRouter()
    const {id}=router.query;
    console.log('objecto',id);
  return (
    <div>
        <AuctionProduct id={id}/>
    </div>
  )
}
export default auctionProduct