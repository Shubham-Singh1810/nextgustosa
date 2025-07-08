// "use client";
// import React, { useState, useContext , useEffect } from "react";
// import Navbar from "../Components/Navbar";
// import Footer from "../Components/Footer";

// import Step1 from "./Step1";
// import Step2 from "./Step2";
// import Step3 from "./Step3";
// import Step4 from "./Step4";
// import Step5 from "./Step5";
// import { LoggedDataContext } from "../context/Context";
// import { placeOrderServ } from "../services/product.service";
// import { toast } from "react-toastify";

// const Page = () => {
//   const { loggedUserData , cartList , setCartList } = useContext(LoggedDataContext);

//   // const [step, setStep] = useState(1);


// const [step, setStep] = useState(() => {
//   // If user is logged in, start at Step 2
//   return loggedUserData?._id ? 2 : 1;
// });


//   const [shipping, setShipping] = useState("homeDelivery");

//   const [addressForm, setAddressForm] = useState({
//     phone: "",
//     alternatePhone: "",
//     landmark: "",
//     area: "",
//     city: "",
//     state: "",
//     pincode: "",
//     country: "",
//     fullName: "",
//   });

//   const [deliveryCharge, setDeliveryCharge] = useState(0);
//   const [discount, setDiscount] = useState(0);
 
//   const [cityPrice, setCityPrice] = useState(0);

//   const next = () => setStep((prev) => prev + 1);
//   const back = () => setStep((prev) => prev - 1);

//   const renderStepComponent = () => {
//     const stepProps = {
//       next,
//       back,
//       shipping,
//       setShipping,
//       addressForm,
//       setAddressForm,
//       deliveryCharge,
//       setDeliveryCharge,
//       discount,
//       setDiscount,
//       orderPayload,
//       setOrderPayload,
//       cityPrice,
//       setCityPrice,
//       cartList,
//       setCartList,
//       amountReached,
//       placeOrderFunc,
//       orderId
//     };

//     switch (step) {
//       case 1:
//         return <Step1 {...stepProps} />;
//       case 2:
//         return <Step2 {...stepProps} />;
//       case 3:
//         return <Step3 {...stepProps} />;
//       case 4:
//         return <Step4 {...stepProps} />;
//       case 5:
//         return <Step5 {...stepProps} />;
//       default:
//         return <Step1 {...stepProps} />;
//     }
//   };

//   const [orderPayload, setOrderPayload] = useState({
//       userId: loggedUserData?._id || "",
  
//       product: cartList?.map((item) => ({
//         productId: item._id,
//         quantity: item.quantity,
//         totalPrice: item.discountedPrice * item.quantity,
//         productHeroImage: item.productHeroImage,
//       })),
//       totalAmount: cartList?.reduce(
//         (total, item) => total + item?.discountedPrice * item.quantity,
//         0
//       ),
//       address: addressForm,
//     });

//   const [amountReached, setAmountReached] = useState(false);


//  useEffect(() => {
//     if (!loggedUserData || !cartList) return;

//     const subTotal = cartList.reduce((total, item) => {
//       const price = item?.discountedPrice ?? item?.pricing?.comboPrice;
//       return total + price * item.quantity;
//     }, 0);

//      const originalTotal = cartList.reduce((total, item) => {
//     const originalPrice = item?.pricing?.actualPrice  || item?.price || 0;
//     return total + originalPrice * item.quantity;
//   }, 0);

//   const calculatedDiscount = originalTotal - subTotal;
//   setDiscount(calculatedDiscount);

//     const minCityPrice = cityPrice || 0;

//     const deliveryCharge = subTotal >= minCityPrice ? 0 : 100;
//     setDeliveryCharge(deliveryCharge);

//     setOrderPayload({
//       userId: loggedUserData._id,
//       product: cartList.map((item) => ({
//         productId: item._id,
//         quantity: item.quantity,
//         totalPrice:
//           item.discountedPrice ?? item.pricing?.comboPrice * item.quantity,
//         productHeroImage: item.productHeroImage,
//       })),
//       totalAmount: subTotal,
//       address: addressForm,
//       deliveryCharge: deliveryCharge,
//       shipping: shipping
//     });

//     setAmountReached(subTotal >= minCityPrice);

//     console.log("payload", orderPayload);
//     console.log("amount reached", amountReached);
//   }, [loggedUserData, cartList, addressForm, cityPrice , shipping]);

//    const [orderId, setOrderId] = useState(null);

//   const placeOrderFunc = async () => {
//     try {
//       let response = await placeOrderServ(orderPayload);
//       if (response?.statusCode == 200) {
//       console.log("booking created" , response)
//         toast.success(response?.message);
//         setCartList([]);
//         localStorage.removeItem("cartList");
//         // router.push("/");

//         setOrderId(response?.data?._id);
//         next();
//         // setShowPaymentPopup(true);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };


//   return (
//     <div style={{ backgroundColor: "#f6f6f6", minHeight: "100vh" }}>
//       <Navbar />
//       <div className="container  pt-md-5 pt-0">
//         <div className="my-5">
// {/* Stepper UI */}
//         <div className="checkout-steps mx-auto my-4">
//           {["Login", "Delivery", "Cart", "Summary", "Payment"].map((label, index) => {
//             const current = index + 1 === step;
//             const done = index + 1 < step;
//             return (
//               <div className="step-item" key={index}>
//                 <div
//                   className={`step-circle ${
//                     done ? "done" : current ? "active" : ""
//                   }`}
//                 >
//                   {done ? "✓" : index + 1}
//                 </div>
//                 <div className="step-label">{label}</div>
//                 {index < 4 && (
//                   <div
//                     className={`step-line ${
//                       index + 2 <= step ? "filled" : ""
//                     }`}
//                   ></div>
//                 )}
//               </div>
//             );
//           })}
//         </div>

//         {/* Step Component Rendering */}
//         <div className="mt-8">{renderStepComponent()}</div>
//         </div>
        
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Page;





"use client";
import React, { useState, useContext , useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import { LoggedDataContext } from "../context/Context";
import { placeOrderServ } from "../services/product.service";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import FooterNav from "../Components/FooterNav";



import { useWindowSize } from '@react-hook/window-size';
import Confetti from 'react-confetti'

const Page = () => {
  const { loggedUserData , deliveryCharge, cartList , setCartList , comboCartList , setComboCartList , varientList , setVarientList } = useContext(LoggedDataContext);
  const router  = useRouter();
  // const [step, setStep] = useState(1);

  useEffect(() => {
  // Check if overflow is being set to 'hidden'
  if (document.body.style.overflow === 'hidden') {
    document.body.style.overflowX = 'hidden';
    document.body.style.overflowY = 'auto'; // or 'scroll', as per your design
  }

  // Optional cleanup
  return () => {
    document.body.style.overflow = ''; // reset when page unmounts
  };
}, []);

const [step, setStep] = useState(() => {
  // If user is logged in, start at Step 2
  return loggedUserData?._id ? 2 : 1;
});

 const [width, height] = useWindowSize();

  const[showThanksPopup , setSHowThanksPopup] = useState(false)

  const [paymentMethod, setPaymentMethod] = useState("Online");

  const [shipping, setShipping] = useState("homeDelivery");

  const [addressForm, setAddressForm] = useState({
    phone: "",
    alternatePhone: "",
    landmark: "",
    area: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    fullName: "",
    email:""
  });

 
  const [discount, setDiscount] = useState(0);
 
  const [cityPrice, setCityPrice] = useState(0);

  const next = () => setStep((prev) => prev + 1);
  const back = () => setStep((prev) => prev - 1);

  const renderStepComponent = () => {
    const stepProps = {
      next,
      back,
      shipping,
      setShipping,
      addressForm,
      setAddressForm,
      deliveryCharge,
      discount,
      setDiscount,
      orderPayload,
      setOrderPayload,
      cityPrice,
      setCityPrice,
      cartList,
      setCartList,
      comboCartList ,
       setComboCartList,
      amountReached,
      placeOrderFunc,
      orderId,
      paymentMethod,
      setPaymentMethod,
      varientList
    };

    switch (step) {
      case 1:
        return <Step1 {...stepProps} />;
      case 2:
        return <Step2 {...stepProps} />;
      case 3:
        return <Step3 {...stepProps} />;
      case 4:
        return <Step4 {...stepProps} />;
      default:
        return <Step1 {...stepProps} />;
    }
  };

  const [orderPayload, setOrderPayload] = useState({
      userId: loggedUserData?._id || "",
  
      product: Array.isArray(cartList)
      ? cartList.map((item) => ({
      productId: item._id,
      quantity: item.quantity,
      totalPrice: item.discountedPrice * item.quantity,
      productHeroImage: item.productHeroImage, })): [],

      comboProduct: Array.isArray(comboCartList) ? comboCartList.map((item) => ({
       comboProductId: item._id,
      quantity: item.quantity,
      totalPrice: item.comboPrice * item.quantity,
      })): [],

       variantProduct: Array.isArray(varientList)
      ? varientList.map((item) => ({
      productId: item.productId,
       variantId:item._id,
      quantity: item.quantity,
      totalPrice: item.variantDiscountedPrice * item.quantity,
       })): [],

     totalAmount:
    (cartList?.reduce(
      (total, item) => total + item.discountedPrice * item.quantity,
      0
    ) || 0) +
    (comboCartList?.reduce(
      (total, item) => total + item.comboPrice * item.quantity,
      0
    ) || 0) +
    (varientList?.reduce(
      (total, item) => total + item.variantDiscountedPrice * item.quantity,
      0
    ) || 0),

      address: addressForm,
    });

  const [amountReached, setAmountReached] = useState(false);


 useEffect(() => {
    if (!loggedUserData || !cartList) return;

    const subTotal = 
    (cartList.reduce((total, item) => {
      const price = item?.discountedPrice;
      return total + price * item.quantity;
    }, 0)) +
    (comboCartList.reduce((total, item) => {
      const price = item?.comboPrice;
      return total + price * item.quantity;
    }, 0)) +
    (varientList.reduce((total, item) => {
      const price = item?.variantDiscountedPrice;
      return total + price * item.quantity;
    }, 0))

     const originalTotal =
     ( cartList.reduce((total, item) => {
    const originalPrice =  item?.price || 0;
    return total + originalPrice * item.quantity;
  }, 0))+
  ( comboCartList.reduce((total, item) => {
    const originalPrice = item?.price || 0;
    return total + originalPrice * item.quantity;
  }, 0)) +
  ( varientList.reduce((total, item) => {
    const originalPrice = item?.variantPrice || 0;
    return total + originalPrice * item.quantity;
  }, 0))

  const calculatedDiscount = originalTotal - subTotal;
  setDiscount(calculatedDiscount);

    // const minCityPrice = cityPrice || 0;

    // const deliveryCharge = subTotal >= minCityPrice ? 0 : 100;
    // setDeliveryCharge(deliveryCharge);

    setOrderPayload({
      userId: loggedUserData._id,

      product: Array.isArray(cartList)
      ? cartList.map((item) => ({
      productId: item._id,
      quantity: item.quantity,
      totalPrice: item.discountedPrice * item.quantity,
      productHeroImage: item.productHeroImage, })): [],

      comboProduct: Array.isArray(comboCartList) ? comboCartList.map((item) => ({
       comboProductId: item._id,
      quantity: item.quantity,
      totalPrice: item.comboPrice * item.quantity,
      })): [],

         variantProduct: Array.isArray(varientList)
      ? varientList.map((item) => ({
      productId: item.productId,
       variantId:item._id,
      quantity: item.quantity,
      totalPrice: item.variantDiscountedPrice * item.quantity,
       })): [],

      totalAmount: subTotal,
      address: addressForm,
      deliveryCharge: deliveryCharge,
      shipping: shipping,
      modeOfPayment:paymentMethod
    });

    // setAmountReached(subTotal >= minCityPrice);

    console.log("payload", orderPayload);
    console.log("comboCartList" , comboCartList) 
    console.log("CartList" , cartList) 
    console.log("amount reached", amountReached);
  }, [loggedUserData, cartList, comboCartList,  addressForm, cityPrice , shipping ,paymentMethod , varientList]);

   const [orderId, setOrderId] = useState(null);

  const placeOrderFunc = async () => {
    try {
      let response = await placeOrderServ(orderPayload);
      if (response?.statusCode == 200) {
      console.log("booking created" , response)
        // toast.success(response?.message);
        setCartList([]);
        setComboCartList([]);
        setVarientList([]);
        localStorage.removeItem("cartList");
        localStorage.removeItem("comboCartList");
        localStorage.removeItem("varientList");
        // router.push("/");
        setOrderId(response?.data?._id);
        setSHowThanksPopup(true);
        // next();
        // setShowPaymentPopup(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseThanksPopup = () => {
    setSHowThanksPopup(false);
    router.push("/")
  }


  return (
    <div style={{ backgroundColor: "#f6f6f6", minHeight: "100vh" }}>
      <Navbar />
      <div className="container  mb-4 pt-lg-5 pt-md-3 pt-0">
        {/* Stepper UI */}
        <div className="checkout-steps mx-auto my-4">
          {["Login", "Delivery", "Cart", "Confirm & Pay"].map((label, index) => {
            const current = index + 1 === step;
            const done = index + 1 < step;
            return (
              <div className="step-item" key={index}>
                <div
                  className={`step-circle ${
                    done ? "done" : current ? "active" : ""
                  }`}
                >
                  {done ? "✓" : index + 1}
                </div>
                <div className="step-label">{label}</div>
                {index < 3 && (
                  <div
                    className={`step-line ${
                      index + 2 <= step ? "filled" : ""
                    }`}
                  ></div>
                )}
              </div>
            );
          })}
        </div>

        {/* Step Component Rendering */}
        <div className="mt-8">{renderStepComponent()}</div>
      </div>

       {showThanksPopup && (
        <div
          className="payment-popup position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ background: "rgba(0,0,0,0.5)", zIndex: 9999 }}
        >
                <Confetti width={width} height={height} />

          <div
            className="bg-white p-4 rounded"
            style={{ width: "450px", maxWidth: "90%" }}
          >
              <div className="d-flex justify-content-between align-items-center mb-3">
            <img
          src="/assets/logo.png" 
          alt="Gustosa Logo"
          style={{ height: "40px", objectFit: "contain", marginBottom: "1rem" }}
        />
         
         <button className="btn-close" onClick={handleCloseThanksPopup}></button>
         </div>

         <div className="d-flex justify-content-center mb-3">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSPugZDTfJPSabVTfBmD8Hj3FD1sUJsJ9cog&s"
          style={{width:"70px" }} className="orderPlacedImg "></img>
          </div>
       
        <h4 className="text-success mb-3 text-center">🎉 Order Placed Successfully!</h4>
        <p className="mb-4 text-center">Thank you for shopping with Gustosa!</p>

       
          </div>
        </div>
      )}
      <FooterNav/>
      <Footer />
    </div>
  );
};

export default Page;

