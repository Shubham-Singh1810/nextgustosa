"use client";
import React, { useState, useContext  , useEffect} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LoggedDataContext } from "../context/Context";
import "../globals.css";
import { otpSend, otpVerify } from "../services/authentication.service";
import { toast } from "react-toastify";
import { getPolicy } from '../services/support.service';

const Navbar = ({ selectedItem }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { loggedUserData, cartList, setCartList, setComboCartList, comboCartList , varientList ,  setVarientList  , setDeliveryCharge } =
    useContext(LoggedDataContext);
  const router = useRouter();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // 🔁 Conditional navigation logic
  const handleProfileClick = () => {
    console.log(loggedUserData);
    if (loggedUserData) {
      router.push("/profile");
    } else {
      router.push("/signup");
    }
  };
  const navArr = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Shop",
      link: "/shop",
    },
    {
      name: "Combo Packs",
      link: "/combo-products",
    },
    {
      name: "Bulk Order",
      link: "/bulk-order",
    },
   
    {
      name: "Blogs",
      link: "/blogs",
    },
     {
      name: "About",
      link: "/about-us",
    },
    //  {
    //   name: "Contact",
    //   link: "/contact",
    // },
    
  ];
  const handleIncreaseQty = (e, v) => {
    e.preventDefault();
    e.stopPropagation();
    let localCartList = JSON.parse(localStorage.getItem("cartList")) || [];

    const existingProduct = localCartList.find((item) => item._id === v._id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    }

    localStorage.setItem("cartList", JSON.stringify(localCartList));
    setCartList(localCartList);
  };

  const handleDecreaseQty = (e, v) => {
    e.preventDefault();
    e.stopPropagation();
    let localCartList = JSON.parse(localStorage.getItem("cartList")) || [];

    const existingProduct = localCartList.find((item) => item._id === v._id);
    if (existingProduct) {
      existingProduct.quantity -= 1;
      if (existingProduct.quantity <= 0) {
        localCartList = localCartList.filter((item) => item._id !== v._id);
      }
    }

    localStorage.setItem("cartList", JSON.stringify(localCartList));
    setCartList(localCartList);
  };

  

   const handleIncreaseComboQty = (e, v) => {
    e.preventDefault();
    e.stopPropagation();
    let localComboCartList = JSON.parse(localStorage.getItem("comboCartList")) || [];

    const existingProduct = localComboCartList.find((item) => item._id === v._id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    }

    localStorage.setItem("comboCartList", JSON.stringify(localComboCartList));
    setComboCartList(localComboCartList);
  };

  const handleDecreaseComboQty = (e, v) => {
    e.preventDefault();
    e.stopPropagation();
    let localComboCartList = JSON.parse(localStorage.getItem("comboCartList")) || [];

    const existingProduct = localComboCartList.find((item) => item._id === v._id);
    if (existingProduct) {
      existingProduct.quantity -= 1;
      if (existingProduct.quantity <= 0) {
        localComboCartList = localComboCartList.filter((item) => item._id !== v._id);
      }
    }

    localStorage.setItem("comboCartList", JSON.stringify(localComboCartList));
    setComboCartList(localComboCartList);
  };


  const handleIncreaseVarientQty = (e, v) => {
    e.preventDefault();
    e.stopPropagation();
    let localVarientList = JSON.parse(localStorage.getItem("varientList")) || [];

    const existingProduct = localVarientList.find((item) => item._id === v._id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    }

    localStorage.setItem("varientList", JSON.stringify(localVarientList));
    setVarientList(localVarientList);
  };

  const handleDecreaseVarientQty = (e, v) => {
    e.preventDefault();
    e.stopPropagation();
    let localVarientList = JSON.parse(localStorage.getItem("varientList")) || [];

    const existingProduct = localVarientList.find((item) => item._id === v._id);
    if (existingProduct) {
      existingProduct.quantity -= 1;
      if (existingProduct.quantity <= 0) {
        localVarientList = localVarientList.filter((item) => item._id !== v._id);
      }
    }

    localStorage.setItem("varientList", JSON.stringify(localVarientList));
    setVarientList(localVarientList);
  };

    const [policyData, setPolicyData] = useState(null);
      const [showWarningPopup, setShowWarningPopup] = useState(null);

    useEffect(() => {
        const fetchPolicy = async () => {
          try {
            const res = await getPolicy();
            setPolicyData(res.data); // API se data store
          } catch (error) {
            console.error("Error fetching policy:", error);
          }
        };
    
        fetchPolicy();
      }, []);

      const totalSubtotal =
  cartList?.reduce(
    (total, item) => total + item.discountedPrice * item.quantity,
    0
  ) +
  comboCartList?.reduce(
    (total, item) => total + item.comboPrice * item.quantity,
    0
  ) +
  varientList?.reduce(
    (total, item) => total + item.variantDiscountedPrice * item.quantity,
    0
  );

      
      const handleProceed = () => {
  
  if (policyData && totalSubtotal >= policyData.minimumFreeOrderAmount) {
    setDeliveryCharge(0);
    router.push("/check-out");
  } else {
    
    setShowWarningPopup(true);
  }
};

const handleCloseWarningPopup = () => {
  setShowWarningPopup(false);
};

const handleContinueAnyway = () => {
   setDeliveryCharge(policyData.deliveryCharge);
  setShowWarningPopup(false);
  router.push("/check-out");
};

      

  return (
    <>
      <div className="navbar-outer d-flex py-3 justify-content-between align-items-center">
        {/* 🔷 Logo */}
        <div className="logo">
          <Link href="/">
            <img src="/assets/logo.png" alt="logo" className="logo-img" />
          </Link>
        </div>
        <ul
          className={`nav-links list-unstyled mb-0 ${menuOpen ? "open" : ""}`}
        >
          {navArr?.map((v, i) => {
            return (
              <li key={i}>
                <Link
                  href={v?.link}
                  style={{
                    color: selectedItem == v?.name ? "#479d78" : "#000",
                    opacity: selectedItem == v?.name ? "1" : "0.6",
                    fontWeight: selectedItem == v?.name ? "600" : "400",
                  }}
                >
                  {v?.name}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="nav-icons d-flex gap-4 align-items-center navRight">
          <div className="d-flex align-items-center ">
            <img
              src="https://cdn-icons-png.flaticon.com/128/665/665865.png"
              alt="notification-icon"
              data-bs-toggle="offcanvas"
              data-bs-target="#cartSidebar"
              style={{cursor:"pointer"}}
              className="greyNavIcon"
            />
            <div className="notificationDiv">
              <p>
                {cartList?.reduce(
                  (total, item) => total + (item.quantity || 0),
                  0
                ) + comboCartList?.reduce(
                  (total, item) => total + (item.quantity || 0),
                  0
                )+ varientList?.reduce(
                  (total, item) => total + (item.quantity || 0),
                  0
                )} 
                
              </p>
            </div>
          </div>
          {loggedUserData && loggedUserData.profilePic ? (
            <img
              src={loggedUserData.profilePic}
              alt="user-profile"
              // className="rounded-circle"
              title="Go to Profile"
              onClick={handleProfileClick}
              style={{
                cursor: "pointer",
                objectFit: "cover",
                borderRadius:"50%",
              }}
              className="d-md-block d-none"
            />
          ) : (
            <img
              src="https://cdn-icons-png.flaticon.com/128/1077/1077114.png"
              alt="profile-icon"
              title="Sign Up / Login"
              onClick={handleProfileClick}
               style={{cursor:"pointer"}}
              className="d-md-block d-none greyNavIcon"
            />
          )}

          {/* Cart Sidebar */}
          <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="cartSidebar"
            style={{ fontFamily: "'Nunito Sans', sans-serif" }}
          >
            <div className="offcanvas-header">
              <h5>
                Your Cart (
                {cartList?.reduce(
                  (total, item) => total + (item.quantity || 0),
                  0
                ) + comboCartList?.reduce(
                  (total, item) => total + (item.quantity || 0),
                  0
                )+ varientList?.reduce(
                  (total, item) => total + (item.quantity || 0),
                  0
                )}
                Products)
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
              ></button>
            </div>

            <div className="offcanvas-body">
              {cartList?.map((item) => (
                <div className="d-flex mb-3" key={item.id}>
                  <img
                    src={item.productHeroImage}
                    className="me-3"
                    style={{ width: "80px", height: "80px" }}
                  />
                  <div>
                    <h6>{item.name}</h6>

                    <div className="d-flex counterDiv ">
                      <p
                        style={{ borderColor: "red", cursor:"pointer" }}
                        onClick={(e) => handleDecreaseQty(e, item)}
                      >
                        -
                      </p>
                      <p>
                        {/* {
                          cartList.find((item) => item._id === value._id)
                            ?.quantity
                        } */}
                        {item?.quantity}
                      </p>
                      <p
                        style={{ borderColor: "green", cursor:"pointer" }}
                        onClick={(e) => handleIncreaseQty(e, item)}
                      >
                        +
                      </p>
                    </div>
                    <p className="text-muted mt-1">
                         <del>₹{item?.price*item?.quantity}</del> ₹{item?.discountedPrice}*{item?.quantity}
                    </p>
                  </div>
                </div>
              ))}
              {comboCartList?.map((item) => (
                <div className="d-flex mb-3" key={item.id}>
                  <img
                    src={item.productHeroImage}
                    className="me-3"
                    style={{ width: "80px", height: "80px" }}
                  />
                  <div>
                    <h6>{item.name}</h6>

                    <div className="d-flex counterDiv ">
                      <p
                        style={{ borderColor: "red" , cursor:"pointer"}}
                        onClick={(e) => handleDecreaseComboQty(e, item)}
                      >
                        -
                      </p>
                      <p>
                        {/* {
                          cartList.find((item) => item._id === value._id)
                            ?.quantity
                        } */}
                        {item?.quantity}
                      </p>
                      <p
                        style={{ borderColor: "green", cursor:"pointer" }}
                        onClick={(e) => handleIncreaseComboQty(e, item)}
                      >
                        +
                      </p>
                    </div>
                    <p className="text-muted mt-1">
                      <del>₹{item?.price*item?.quantity}</del> ₹{item?.comboPrice}*{item?.quantity}
                    </p>
                  </div>
                </div>
              ))}
              {varientList?.map((item) => (
                <div className="d-flex mb-3" key={item._id}>
                  <img
                    src={item.variantImage}
                    className="me-3"
                    style={{ width: "80px", height: "80px" }}
                  />
                  <div>
                    <h6>{item.name}{" ("}{item.variantValue}{item.variantKey}{") "}</h6>

                    <div className="d-flex counterDiv ">
                      <p
                        style={{ borderColor: "red" , cursor:"pointer"}}
                        onClick={(e) => handleDecreaseVarientQty(e, item)}
                      >
                        -
                      </p>
                      <p>
                        {/* {
                          cartList.find((item) => item._id === value._id)
                            ?.quantity
                        } */}
                        {item?.quantity}
                      </p>
                      <p
                        style={{ borderColor: "green", cursor:"pointer" }}
                        onClick={(e) => handleIncreaseVarientQty(e, item)}
                      >
                        +
                      </p>
                    </div>
                    <p className="text-muted mt-1">
                      <del>₹{item?.variantPrice*item?.quantity}</del> ₹{item?.variantDiscountedPrice}*{item?.quantity}
                    </p>
                  </div>
                </div>
              ))}


              {(cartList?.length > 0  || comboCartList?.length > 0 || varientList?.length > 0)&& <>
               <hr />

              <h6>
                SUBTOTAL: ₹ (
                {cartList?.reduce(
                  (total, item) => total + item.discountedPrice * item.quantity,
                  0
                ) + comboCartList?.reduce(
                  (total, item) => total + item.comboPrice * item.quantity,
                  0
                )+
                 varientList?.reduce(
                  (total, item) => total + item.variantDiscountedPrice * item.quantity,
                  0
                )
                }
                )
              </h6>
             
              <button
                className="btn btn-success w-100 mt-4"
                onClick={handleProceed}
              >
                Proceed To Checkout
              </button></>}
             
            </div>
          </div>
        </div>
      </div>
      {/* Payment Popup */}


      {showWarningPopup && (
        <div
          className="payment-popup position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ background: "rgba(0,0,0,0.5)", zIndex: 9999 }}
        >
          <div
            className="bg-white p-md-4  px-2 py-5 rounded"
            style={{ width: "600px", maxWidth: "90%" }}
          >
             <div className="d-flex justify-content-center align-items-center mb-3">
        <h4 style={{ fontFamily: "'Nunito Sans', sans-serif" }}>Payment Summary</h4>
        {/* <button className="btn-close" onClick={handleCloseWarningPopup}></button> */}
      </div>

      <div className="px-1" style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "15px", lineHeight: "1.6" }}>
  <div className="mb-2">
    <span style={{ fontWeight: 600 }}>🚫 Minimum Order Amount:</span>{" "}
    <span className="text-danger fw-bold">₹{policyData?.minimumFreeOrderAmount}</span>
  </div>

  <div className="mb-2">
    <span style={{ fontWeight: 600 }}>🛒 Your Current Subtotal:</span>{" "}
    <span className="text-primary fw-bold">₹{totalSubtotal}</span>
  </div>

  
    <div className="mb-2">
      <span style={{ fontWeight: 600 }}>🧾 Add More:</span>{" "}
      <span className="text-warning fw-bold">₹{policyData?.minimumFreeOrderAmount - totalSubtotal}</span>{" "}
      to reach minimum order amount and avoid extra charges.
    </div>


  <div className="mt-3">
    <span style={{ fontWeight: 600 }}>🚚 Delivery Charge if you proceed:</span>{" "}
    <span className="text-danger fw-bold">₹{policyData?.deliveryCharge}</span>
  </div>
</div>


      <div className="d-flex flex-sm-row flex-column  justify-content-between mt-4">
        <button className="btn btn-outline-secondary closeBtnWarning mb-2 mb-sm-3" onClick={handleCloseWarningPopup}>
          Close
        </button>
        <button className="btn btn-warning  continueBtnWarning" onClick={handleContinueAnyway}>
          Continue Anyway
        </button>
      </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
