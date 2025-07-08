"use client"

import React from 'react'
import Navbar from '../Components/Navbar'
import AccountDetails from '../Components/AccountDetails'
import { LoggedDataContext } from '../context/Context'
import { useContext } from 'react'
import { useRouter } from "next/navigation";
import Footer from '../Components/Footer'
import FooterNav from '../Components/FooterNav'


const page = () => {
    const router = useRouter();
    const { updateLoggedUserData, setCartList, setWishList } = useContext(LoggedDataContext);


    const handleLogOut = () => {

         console.log("Logging out...");
     
           updateLoggedUserData(null);
         setCartList([]);
         setWishList([]);

    localStorage.removeItem("user");
    localStorage.removeItem("cartList");
    localStorage.removeItem("wishList");

     console.log("Logged out...");
        
     
    router.push("/login");
 

    }

  return (
      
 
    <div>
        <Navbar/>
        <div className='user-profile'>
                <div className="profile-section d-flex gap-3">
                    <AccountDetails/>

                      <div className='profile-right mt-lg-5 pt-lg-4'>
                      
                           <div   className="my-details" 
                           style={{minHeight: "50vh"}}>
                             <h3>Confirm Logout</h3>
                            <p>You’ll be signed out of your account and will need to log in again.</p>
                            <button className='btn btn-danger'
                            style={{width: "140px"}} onClick={handleLogOut}>Log Out</button>
                           </div>
                      </div>
                </div>

        </div>
        <FooterNav selectedItem="Me" />
      <Footer/>
    </div>
  )
}

export default page
