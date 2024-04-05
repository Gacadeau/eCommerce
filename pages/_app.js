// import "@/styles/globals.css";
import '@/styles/style.css';
import { useState } from 'react';
import { SessionProvider } from "next-auth/react";
import Navbar from './components/Navbar';

export default function App({ Component, pageProps }) {
  const [windw , setWindw] = useState('sale')
  
   
    const handleCallback = (windw) => {
      setWindw(windw);
    };
  return (
    <div>
      <SessionProvider session={pageProps.session}>
      <Navbar onCallback={handleCallback}/>
        <Component {...pageProps} windw={windw} />;
     </SessionProvider>
    </div>

  )
  
}
