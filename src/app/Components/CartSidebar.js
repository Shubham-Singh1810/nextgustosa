import React from "react";
import { useContext, useEffect, useState } from "react";
import { LoggedDataContext } from "../context/Context";
import { useRouter } from "next/navigation";
import { getPolicy } from "../services/support.service";

const CartSidebar = () => {
  const {
    loggedUserData,
    cartList,
    setCartList,
    setComboCartList,
    comboCartList,
    varientList,
    setVarientList,
    setDeliveryCharge,
  } = useContext(LoggedDataContext);
  const router = useRouter();

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
    let localComboCartList =
      JSON.parse(localStorage.getItem("comboCartList")) || [];

    const existingProduct = localComboCartList.find(
      (item) => item._id === v._id
    );
    if (existingProduct) {
      existingProduct.quantity += 1;
    }

    localStorage.setItem("comboCartList", JSON.stringify(localComboCartList));
    setComboCartList(localComboCartList);
  };

  const handleDecreaseComboQty = (e, v) => {
    e.preventDefault();
    e.stopPropagation();
    let localComboCartList =
      JSON.parse(localStorage.getItem("comboCartList")) || [];

    const existingProduct = localComboCartList.find(
      (item) => item._id === v._id
    );
    if (existingProduct) {
      existingProduct.quantity -= 1;
      if (existingProduct.quantity <= 0) {
        localComboCartList = localComboCartList.filter(
          (item) => item._id !== v._id
        );
      }
    }

    localStorage.setItem("comboCartList", JSON.stringify(localComboCartList));
    setComboCartList(localComboCartList);
  };

  const handleIncreaseVarientQty = (e, v) => {
    e.preventDefault();
    e.stopPropagation();
    let localVarientList =
      JSON.parse(localStorage.getItem("varientList")) || [];

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
    let localVarientList =
      JSON.parse(localStorage.getItem("varientList")) || [];

    const existingProduct = localVarientList.find((item) => item._id === v._id);
    if (existingProduct) {
      existingProduct.quantity -= 1;
      if (existingProduct.quantity <= 0) {
        localVarientList = localVarientList.filter(
          (item) => item._id !== v._id
        );
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
      setDeliveryCharge(policyData.deliveryCharge);
      router.push("/check-out");
    }
  };

   const amountRemaining = policyData?.minimumFreeOrderAmount - totalSubtotal;
  const progressPercent = Math.min((totalSubtotal / policyData?.minimumFreeOrderAmount) * 100, 100);

  return (
    <div>
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
            ) +
              comboCartList?.reduce(
                (total, item) => total + (item.quantity || 0),
                0
              ) +
              varientList?.reduce(
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
         
         {(cartList?.length > 0 ||
            comboCartList?.length > 0 ||
            varientList?.length > 0) &&
        <div className="AmountDetails">
          {policyData?.minimumFreeOrderAmount > totalSubtotal ? (
            <p>
              Add products worth{" "}
              <span className=" fw-bold">
                ₹{policyData?.minimumFreeOrderAmount - totalSubtotal}
              </span>{" "}
              to unlock Free Shipping!
            </p>
          ) : (
            <p className="text-center fw-bold">
              You’ve unlocked Free Shipping!
            </p>
          )}

          {/* progress bar */}
         <div className="d-flex align-items-center">
          <div className="shipping-progress position-relative w-100">
            <div className="progress">
              <div
                className="progress-bar bg-dark"
                 role="progressbar"
                  style={{ width: `${progressPercent}%` }}
                  aria-valuenow={progressPercent}
                  aria-valuemin="0"
                   aria-valuemax="100"
                />
            </div>
                
              
             <div className="milestone-label text-muted small">
               ₹{policyData?.minimumFreeOrderAmount} 
              
                </div>
          </div>
          <div>
           <img src="https://cdn-icons-png.flaticon.com/128/7610/7610711.png" style={{width:"27px" , height:"27px" , borderRadius:"50%" , border:"1px solid black" , padding:"3px"}}></img>
           {/* <p className="text-center" style={{fontSize:"10px"}}>Free shipping</p> */}
           </div>
          </div>
        </div>
        }

        <div className="offcanvas-body" style={{paddingBottom:"20%"}}>
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
                    style={{ borderColor: "red", cursor: "pointer" }}
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
                    style={{ borderColor: "green", cursor: "pointer" }}
                    onClick={(e) => handleIncreaseQty(e, item)}
                  >
                    +
                  </p>
                </div>
                <p className="text-muted mt-1">
                  <del>₹{item?.price * item?.quantity}</del> ₹
                  {item?.discountedPrice}*{item?.quantity}
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
                    style={{ borderColor: "red", cursor: "pointer" }}
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
                    style={{ borderColor: "green", cursor: "pointer" }}
                    onClick={(e) => handleIncreaseComboQty(e, item)}
                  >
                    +
                  </p>
                </div>
                <p className="text-muted mt-1">
                  <del>₹{item?.price * item?.quantity}</del> ₹{item?.comboPrice}
                  *{item?.quantity}
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
                <h6>
                  {item.name}
                  {" ("}
                  {item.variantValue}
                  {item.variantKey}
                  {") "}
                </h6>

                <div className="d-flex counterDiv ">
                  <p
                    style={{ borderColor: "red", cursor: "pointer" }}
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
                    style={{ borderColor: "green", cursor: "pointer" }}
                    onClick={(e) => handleIncreaseVarientQty(e, item)}
                  >
                    +
                  </p>
                </div>
                <p className="text-muted mt-1">
                  <del>₹{item?.variantPrice * item?.quantity}</del> ₹
                  {item?.variantDiscountedPrice}*{item?.quantity}
                </p>
              </div>
            </div>
          ))}

          {(cartList?.length > 0 ||
            comboCartList?.length > 0 ||
            varientList?.length > 0) && (
            <div className=" position-absolute bg-white" style={{width:"90%" , bottom:"1%"}}>
            
              <hr />

              <h6 className="">
                SUBTOTAL: ₹ (
                {cartList?.reduce(
                  (total, item) => total + item.discountedPrice * item.quantity,
                  0
                ) +
                  comboCartList?.reduce(
                    (total, item) => total + item.comboPrice * item.quantity,
                    0
                  ) +
                  varientList?.reduce(
                    (total, item) =>
                      total + item.variantDiscountedPrice * item.quantity,
                    0
                  )}
                )
              </h6>
              
              <div className="d-flex gap-2">
                 <button
                className="btn  text-dark w-100 mt-3" style={{backgroundColor:"#eaf9f2" , border:"1px solid #b1d4c5"}}
                //   className="btn-close"
            data-bs-dismiss="offcanvas"
              >
                Continue Shopping
              </button>
              <button
                className="btn btn-success w-100 mt-3"
                onClick={handleProceed}
              >
               Checkout
              </button>
              
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Payment Popup */}

      {/* {showWarningPopup && (
        <div
          className="payment-popup position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ background: "rgba(0,0,0,0.5)", zIndex: 9999 }}
        >
          <div
            className="bg-white p-md-4  px-2 py-5 rounded"
            style={{ width: "600px", maxWidth: "90%" }}
          >
            <div className="d-flex justify-content-center align-items-center mb-3">
              <h4 style={{ fontFamily: "'Nunito Sans', sans-serif" }}>
                Payment Summary
              </h4>
             
            </div>

            <div
              className="px-1"
              style={{
                fontFamily: "'Nunito Sans', sans-serif",
                fontSize: "15px",
                lineHeight: "1.6",
              }}
            >
              <div className="mb-2">
                <span style={{ fontWeight: 600 }}>
                  🚫 Minimum Order Amount:
                </span>{" "}
                <span className="text-danger fw-bold">
                  ₹{policyData?.minimumFreeOrderAmount}
                </span>
              </div>

              <div className="mb-2">
                <span style={{ fontWeight: 600 }}>
                  🛒 Your Current Subtotal:
                </span>{" "}
                <span className="text-primary fw-bold">₹{totalSubtotal}</span>
              </div>

              <div className="mb-2">
                <span style={{ fontWeight: 600 }}>🧾 Add More:</span>{" "}
                <span className="text-warning fw-bold">
                  ₹{policyData?.minimumFreeOrderAmount - totalSubtotal}
                </span>{" "}
                to reach minimum order amount and avoid extra charges.
              </div>

              <div className="mt-3">
                <span style={{ fontWeight: 600 }}>
                  🚚 Delivery Charge if you proceed:
                </span>{" "}
                <span className="text-danger fw-bold">
                  ₹{policyData?.deliveryCharge}
                </span>
              </div>
            </div>

            <div className="d-flex flex-sm-row flex-column  justify-content-between mt-4">
              <button
                className="btn btn-outline-secondary closeBtnWarning mb-2 mb-sm-3"
                onClick={handleCloseWarningPopup}
              >
                Close
              </button>
              <button
                className="btn btn-warning  continueBtnWarning"
                onClick={handleContinueAnyway}
              >
                Continue Anyway
              </button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default CartSidebar;
