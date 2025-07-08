// "use client";

// import React from "react";
// import Navbar from "../Components/Navbar";
// import Footer from "../Components/Footer";
// import FooterNav from "../Components/FooterNav";

// const page = () => {
//   return (
//     <>
//       <Navbar />

//       <div
//         className="policy-page d-flex flex-column align-items-center mt-lg-4 mt-0"
//         style={{ fontFamily: "'Nunito Sans', sans-serif" }}
//       >
//         <div className="row align-items-center text-center justify-content-center my-sm-5 my-2 py-2">
//           <div className="col-md-9 col-12 d-flex flex-column align-items-center">
//             <h2 className="mb-3 text-center" style={{ maxWidth: "600px" }}>
//               Hyzenith Return, Replacement & Cancellation Policy
//             </h2>
//             <p>
//               At Hyzenith - Home Hygiene Solutions, we care about your
//               satisfaction and hygiene needs. We follow a transparent return
//               policy to ensure a smooth and trustworthy shopping experience.
//             </p>
//           </div>
//         </div>

//         <div className="row w-100 p-md-4 p-0">
//           <div className="col-lg-8 col-md-7 col-12 mb-3">
//             <div className="bg-white p-md-5 p-2 h-100" style={{ borderRadius: "13px" }} >
//               <h4 className="text-danger mb-3">Eligibility for Returns</h4>

//               <div className="d-flex gap-2 mb-2">
//                 <img
//                   src="https://cdn-icons-png.flaticon.com/128/16165/16165701.png"
//                   style={{ height: "24px", width: "24px" }}
//                 />
//                 <p className="mb-0">
//                   Returns are accepted within 2 days of delivery.
//                 </p>
//               </div>

//               <div className="d-flex gap-2 mb-2">
//                 <img
//                   src="https://cdn-icons-png.flaticon.com/128/16165/16165701.png"
//                   style={{ height: "24px", width: "24px" }}
//                 />
//                 <p className="mb-0">
//                   Products must be unused, unopened, and in their original
//                   packaging.
//                 </p>
//               </div>

//               <div className="d-flex gap-2 mb-2">
//                 <img
//                   src="https://cdn-icons-png.flaticon.com/128/16165/16165701.png"
//                   style={{ height: "24px", width: "24px" }}
//                 />
//                 <p className="mb-0">
//                   In case of damaged, leaked, or missing items, the issue must
//                   be reported instantly during Open Box Delivery (OBD) to the
//                   delivery executive.
//                   <br />
//                   📦 If not reported during OBD, such claims will not be
//                   accepted.
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="col-lg-4 col-md-5 col-12 mb-3">
//             <div className="bg-white p-md-5 p-2 h-100" style={{ borderRadius: "13px" }} >
//               <h4 className="text-danger mb-3">Non-Returnable Items</h4>

//               <div className="d-flex gap-2 mb-2">
//                 <img
//                   src="https://cdn-icons-png.flaticon.com/128/16165/16165701.png"
//                   style={{ height: "24px", width: "24px" }}
//                 />
//                 <p className="mb-0">Used or opened hygiene products.</p>
//               </div>

//               <div className="d-flex gap-2 mb-2">
//                 <img
//                   src="https://cdn-icons-png.flaticon.com/128/16165/16165701.png"
//                   style={{ height: "24px", width: "24px" }}
//                 />
//                 <p className="mb-0">
//                   Promotional items, Combo offers and free gifts.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="row w-100 mt-4 gx-0">
//           <div className="col-12">
//             <div
//               className="p-md-5 p-3 "
//               style={{
//                 backgroundColor: "#fff6f7",
//                 border: "1px solid #f5c2c7",
//                 borderRadius: "13px",
//               }}
//             >
//               <h4 className="text-danger mb-4 d-flex align-items-center gap-2">
//                 How to Initiate a Return
//               </h4>

//               <div className="d-flex gap-3 justify-content-between align-items-center flex-column flex-lg-row">
//                 <ol className="ps-3 mb-0">
//                   <li className="mb-3 medium-text-on-mobile">
//                     <strong className="">
//                       Ensure the product meets return conditions.
//                     </strong>
//                   </li>
//                   <li className="mb-3 medium-text-on-mobile">
//                     <strong className="">Contact us via:</strong>
//                     <ul className="list-unstyled ms-3 mt-2  small-text-on-mobile">
//                       <li className="mb-2 d-flex flex-wrap align-items-start ">
//                         📧 <strong>Email:</strong>
//                         <a
//                           href="mailto:shriramenterprises.query@gmail.com"
//                           className="text-danger text-decoration-none ms-1 "
//                         >
//                           shriramenterprises.query@gmail.com
//                         </a>
//                       </li>
//                       <li className="mb-2 d-flex flex-wrap align-items-start ">
//                         📱 <strong>WhatsApp/Call:</strong>
//                         <a
//                           href="tel:+917619564291"
//                           className="text-danger text-decoration-none ms-1 "
//                         >
//                           +91 76195 64291
//                         </a>
//                       </li>
//                       <li className="mb-2 d-flex flex-wrap align-items-start ">
//                         🌐 <strong>Website:</strong>
//                         <a
//                           href="https://www.hyzenith.com"
//                           className="text-danger text-decoration-none ms-1"
//                           target="_blank"
//                           rel="noopener noreferrer"
//                         >
//                           www.hyzenith.com
//                         </a>
//                       </li>
//                     </ul>
//                   </li>
//                   <li className="medium-text-on-mobile">
//                     <strong className="">
//                       Share your order ID, issue description, and photo/video
//                       evidence (if applicable).
//                     </strong>
//                   </li>
//                 </ol>

//                 <img
//                   src="https://img.freepik.com/premium-vector/delivery-design_24877-48526.jpg?uid=R195795735&ga=GA1.1.1778899298.1732287368&semt=ais_hybrid&w=740"
//                   style={{ height: "330px", width: "370px" }}
//                   className="me-md-5 me-0 img-fluid"
//                 ></img>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="row mt-5 py-4 mb-5">
//          <div className="col-lg-4 col-md-6 col-12 p-2">
//           <div className="p-4 shadow-sm h-100">
//             <h3 className="mb-3 text-danger  text-center">Refunds & Replacements</h3>

//             <p>We offer Replacement(Preferred ) or Refund once the returned item is received and verified.</p>
//             <p> Refunds are credited to your original payment method within 5–7 business days. </p>
//             <p>Refunds do not include any shipping and handling charges shown on the packaging slip or invoice.</p>
//           </div>
//          </div>
//          <div className="col-lg-4 col-md-6 col-12 p-2 ">
//           <div  className="p-4 shadow-sm h-100">
//             <h3  className="mb-3 text-danger text-center"> Return Shipping </h3>

//             <p>Hyzenith covers return shipping if the error is on our end (damaged/wrong product).</p>
//             <p> In other cases, the return shipping cost will be borne by the customer.</p>
//             <p>We are not responsible for any loss or damage to hardware during shipment.</p>
//           </div>
//          </div>
//          <div className="col-lg-4 col-md-6 col-12 p-2">
//           <div  className="p-4 shadow-sm h-100" >
//             <h3  className="mb-3 text-danger text-center" >Order Cancellations</h3>

//             <p>Orders can be cancelled before dispatch by contacting our support.</p>
//             <p>Once shipped, cancellations aren't possible—please follow the return process after delivery. </p>
//           </div>
//          </div>

         
//         </div>

        

//          <div className="d-flex flex-column align-items-center border-top">
          
//           <h5 className="text-center fw-bold mt-5">Your Hygiene. Our Promise. </h5>
//           <p className="text-secondary  text-center w-md-75 w-100">Hyzenith is committed to offering clean, safe, and reliable hygiene solutions. We ensure every delivery is made with care — and our policies protect both you and the integrity of our brand.</p>
//          </div>

       
//       </div>
       
//        <FooterNav/>
//       <Footer />
//     </>
//   );
// };

// export default page;



"use client";

import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { getPolicy } from '../services/support.service';
import FooterNav from '../Components/FooterNav';

const page = () => {
  const [policyData, setPolicyData] = useState(null);

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

  return (
    <>
      <Navbar />
      <div className='policy-page d-flex flex-column align-items-center'>
        <div className='policy-head d-flex align-items-center'>
          <div>
            <h1>Shipping Policy</h1>
            <p>
              At Gustosa, we believe in transparency and clarity.
              This policy is designed to inform you about how we operate and what you can expect from us regarding the topic covered below.
            </p>
          </div>
          <img
            src='https://t3.ftcdn.net/jpg/13/90/31/86/360_F_1390318667_bjVdMVxUeYvCARqYuc7datD4nlhTJ86l.jpg'
            alt='Shipping Policy'
          />
        </div>

        <div className='all-policies'>
          <div className='policy'>
            {policyData?.refundAndReturn ? (
             <div dangerouslySetInnerHTML={{ __html: policyData?.refundAndReturn}} />

            ) : (
              <p>Loading Refund and Returns...</p>
            )}
          </div>
        </div>
      </div>
      <FooterNav/>
      <Footer />
    </>
  );
};

export default page;
