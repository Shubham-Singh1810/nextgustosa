// import React, { useState } from "react";

// const Step4 = ({
//   cartList,
//   comboCartList,
//   addressForm,
//   discount,
//   cityPrice,
//   amountReached,
//   placeOrderFunc,
//   next , 
//   back
// }) => {
// const totalProducts =
//   (cartList?.reduce((total, item) => total + item.quantity, 0) || 0) +
//   (comboCartList?.reduce((total, item) => total + item.quantity, 0) || 0);


//   const totalPrice =
//   ( cartList?.reduce((total, item) => {
//     const price = item?.discountedPrice ?? item?.comboPrice ?? 0;
//     return total + price * (item.quantity || 0);
//   }, 0)) +
//   (
//  comboCartList?.reduce((total, item) => {
//     const price = item?.discountedPrice ?? item?.comboPrice ?? 0;
//     return total + price * (item.quantity || 0);
//   }, 0)
//   )

//   const subTotal = totalPrice + deliveryCharge;

//   const handleBack = () => {
//       back();
//   }  

//   const[nextMessage , setNextMessage] = useState("Please place your order first.")
//   const [messageShow , setMessageShow] = useState(false);

//    const handleNext = () => {
//      setMessageShow(true); 
//   }

//   const initiatePayment = () => {
//     const amount = cartList?.reduce(
//       (total, item) => total + item.discountedPrice * item.quantity,
//       0
//     );

//     const options = {
//       key: "rzp_test_fT349CvRXH2mv0",
//       amount: amount * 100, 
//       currency: "INR",
//       name: "Gustosa Foods",
//       description: "Purchase Transaction",
//       image: "/assets/logo.png",
//       handler: function (response) {
//         console.log(response);
//         alert(
//           "Payment Successful! Payment ID: " + response.razorpay_payment_id
//         );
//         setShowPaymentPopup(false);
//       },
//       prefill: {
//         name: loggedUserData?.name || "Guest User",
//         email: loggedUserData?.email || "guest@example.com",
//         contact: loggedUserData?.mobile || "9996588662",
//       },
//       theme: {
//         color: "#3D9970",
//       },
//     };

//     const rzp1 = new window.Razorpay(options);
//     rzp1.open();
//   };

//   return (

//     <div  className=" p-sm-4 p-2 mb-4 bg-white container d-flex flex-column justify-content-center align-items-center"
//      style={{borderRadius:"13px", minHeight:"50vh"}}>

//        <div style={{width: "70%"}} className="stepPage" >
//         <h3 className="my-3 text-center">Order Summary</h3>
//     <div className="row">
//       {/* Cart Summary */}
//       <div className=" col-12 mb-4">
//         {/* {cityPrice && <p>Minimum Price for this city: ₹{cityPrice}</p>} */}

//         <div className="d-flex justify-content-between">
//           <h6 className="fw-bold">Total Products:</h6>
//           <p className="fs-5 fw-bold">{totalProducts}</p>
//         </div>

//         <div className="d-flex justify-content-between">
//           <h6 className="fw-bold">Total:</h6>
//           <p className="fs-5 fw-bold">₹{totalPrice}</p>
//         </div>

//         {/* <div className="d-flex justify-content-between">
//           <h6 className="fw-bold">Delivery Charge:</h6>
//           <p className="fs-5 fw-bold">₹{deliveryCharge}</p>
//         </div> */}

//         {discount > 0 && (
//           <p style={{ color: "green", fontWeight: "500" }}>
//             You are saving ₹{discount} on this order!
//           </p>
//         )}

//         <div className="d-flex justify-content-between">
//           <h6 className="fw-bold">Subtotal:</h6>
//           <p className="fs-5 fw-bold" style={{ color: "coral" }}>
//             ₹{subTotal}
//           </p>
//         </div>

       
//           <button
//             className="btn btn-warning w-100 mt-3"
//             onClick={placeOrderFunc}
//           >
//             Place Order
//           </button>
        

//       </div>

     
//     </div>

//        {
//           messageShow && (
//             <p className="text-danger mt-3 text-end">  {nextMessage}</p>
//           )
//         }

//       <div className="d-flex justify-content-end gap-3 w-100 mt-3">
       
//                 <button onClick={handleBack} className="btn " style={{backgroundColor: "#ffe6ea" , border: "1px solid #ebcbd0"}}  >Back</button>
//         <button onClick={handleNext} className="btn btn-danger px-4" > Continue </button>
//     </div>
//     </div>
//     </div>
//   );
// };

// export default Step4;


import React, { useState } from "react";


const Step4 = ({
  loggedUserData,
  cartList,
  comboCartList,
  addressForm,
  deliveryCharge,
  discount,
  cityPrice,
  amountReached,
  placeOrderFunc,
  next , 
  back,
  paymentMethod,
  setPaymentMethod,
  varientList
}) => {

 

const totalProducts =
  (cartList?.reduce((total, item) => total + item.quantity, 0) || 0) +
  (comboCartList?.reduce((total, item) => total + item.quantity, 0) || 0)+
  (varientList?.reduce((total , item) => total + item.quantity, 0) || 0)


  const totalPrice =
  ( cartList?.reduce((total, item) => {
    const price = item?.discountedPrice ?? 0;
    return total + price * (item.quantity || 0);
  }, 0)) +
  (
 comboCartList?.reduce((total, item) => {
    const price =  item?.comboPrice ?? 0;
    return total + price * (item.quantity || 0);
  }, 0)
  )+
  (
 varientList?.reduce((total, item) => {
    const price = item?.variantDiscountedPrice ;
    return total + price * (item.quantity || 0);
  }, 0)
  )

  const subTotal = totalPrice;

  const handleBack = () => {
      back();
  }  

  const[nextMessage , setNextMessage] = useState("Please place your order first.")
  const [messageShow , setMessageShow] = useState(false);

   const handleNext = () => {
     setMessageShow(true); 
  }

  const initiatePayment = () => {
    const amount = (cartList?.reduce(
      (total, item) => total + item.discountedPrice * item.quantity, 0 )
    )+(comboCartList?.reduce(
      (total, item) => total + item.comboPrice * item.quantity,0)
    ) +(varientList?.reduce(
      (total, item) => total + item.variantDiscountedPrice * item.quantity,0)
    )+ deliveryCharge

    const options = {
      key: "rzp_test_fT349CvRXH2mv0",
      amount: amount * 100, 
      currency: "INR",
       name: "Gustosa Foods",
      description: "Purchase Transaction",
      image: "/assets/logo.png",
      
      handler: function (response) {
        console.log(response);
        // alert(
        //   "Payment Successful! Payment ID: " + response.razorpay_payment_id
        // );
        placeOrderFunc();
        
      },

      prefill: {
        name: loggedUserData?.name || "Guest User",
        email: loggedUserData?.email || "guest@example.com",
        contact: loggedUserData?.mobile || "9996588662",
      },
      theme: {
       color: "#3D9970",
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (

    <div  className=" p-sm-4 p-2 mb-4 bg-white container d-flex flex-column justify-content-center align-items-center"
     style={{borderRadius:"13px", minHeight:"50vh"}}>

       <div style={{width: "70%"}} className="stepPage" >
        <h3 className="my-3 text-center">Order Summary</h3>
    <div className="row">
      {/* Cart Summary */}
      <div className=" col-12 mb-4">
        {/* {cityPrice && <p>Minimum Price for this city: ₹{cityPrice}</p>} */}

        <div className="d-flex justify-content-between">
          <h6 className="fw-bold">Total Products:</h6>
          <p className="fs-5 fw-bold">{totalProducts}</p>
        </div>

        <div className="d-flex justify-content-between">
          <h6 className="fw-bold">Total:</h6>
          <p className="fs-5 fw-bold">₹{totalPrice}</p>
        </div>

        <div className="d-flex justify-content-between">
          <h6 className="fw-bold">Delivery Charge:</h6>
          {deliveryCharge === 0 ? (
            <p className="fs-5 fw-bold text-success">Free</p>
          ):(
            <p className="fs-5 fw-bold">₹{deliveryCharge}</p>
          )}
        </div>

        {discount > 0 && (
          <p style={{ color: "green", fontWeight: "500" }}>
            You are saving ₹{discount} on this order!
          </p>
        )}

        <div className="d-flex justify-content-between">
          <h6 className="fw-bold">Subtotal:</h6>
          <p className="fs-5 fw-bold" style={{ color: "coral" }}>
            ₹{(subTotal) + (deliveryCharge)}
          </p>
        </div>

        <hr/>

        <div>
          <h5 className="fw-bold mb-3 text-secondary">Payment</h5>

           <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="radio"
            name="payment"
            id="cod"
            value="COD"
             checked={paymentMethod === "COD"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label className="form-check-label" htmlFor="cod">
            Cash on Delivery (COD)
          </label>          
        </div>

       <div className="form-check mb-3" >
         <input
            className="form-check-input"
            type="radio"
            name="payment"
            id="online"
            value="Online"
              checked={paymentMethod === "Online"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label className="form-check-label" htmlFor="online">
            Online Payment
          </label>
        </div>
        </div>
      
       
          {paymentMethod === "COD" ? (
            <button
            className="btn btn-warning w-100 mt-3"
            onClick={placeOrderFunc}
          >
            Place Order
          </button>
          ):(
            <button
            className="btn btn-warning w-100 mt-3"
            onClick={initiatePayment}
          >
            Pay Now
          </button>
          )}
        

      </div>

     
    </div>

       {
          messageShow && (
            <p className="text-success mt-3 text-end">  {nextMessage}</p>
          )
        }

      <div className="d-flex justify-content-end gap-3 w-100 mt-3">
       
                <button onClick={handleBack} className="btn px-4" style={{backgroundColor: "#e3f3ec" , border: "1px solid rgb(189 234 214)"}}  >Back</button>
        {/* <button onClick={handleNext} className="btn btn-danger px-4" > Continue </button> */}
    </div>
    </div>
    </div>
  );
};

export default Step4;
