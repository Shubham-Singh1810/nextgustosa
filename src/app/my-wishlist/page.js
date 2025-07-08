"use client";
import React, { useEffect } from "react";
import { useContext } from "react";
import Navbar from "../Components/Navbar";
import AccountDetails from "../Components/AccountDetails";
import Footer from "../Components/Footer";
import { LoggedDataContext } from "../context/Context";
import ProductCard from "../Components/ProductCard";
import FooterNav from "../Components/FooterNav";

const page = () => {
  const { loggedUserData, cartList, setCartList, wishList, setWishList } =
    useContext(LoggedDataContext);

  return (
    <>
      <Navbar />
      <div className="user-profile">
        <div className="profile-section d-flex gap-3">
          <AccountDetails />

          <div className="profile-right mt-lg-5 pt-lg-4">
            <div className="my-details">
              <h3>Wishlisted Items</h3>
              <div className="wishlist-items row gx-md-4 gx-sm-3 gx-2 mt-4">
                {wishList && wishList.length > 0 ? (
                  wishList.map((v) => (
                  <div className="col-md-4 col-6 mb-sm-3 mb-2"> 
                  <ProductCard value={v}/>
                  
                </div>
                  ))
                ) : (
                  <p className="text-muted">Your wishlist is empty.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
        
        <FooterNav selectedItem="Me" />
      <Footer />
    </>
  );
};

export default page;
