
"use client";
import { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import PriceFilter from "../Components/PriceFilter";
import ProductCard from "../Components/ProductCard";
import {  getComboProductServ } from "../services/product.service";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ComboProductCard from "../Components/ComboProductCard";
import FooterNav from "../Components/FooterNav";
import Footer from "../Components/Footer";

const page = () => {
   const [comboProductlist, setComboProductList] = useState([]);
  const getComboProductList = async () => {
    try {
      let response = await getComboProductServ();
      if (response?.statusCode == "200") {
        setComboProductList(response?.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getComboProductList();
  }, []);

  

  return (
    <div>
      <Navbar selectedItem="Combo Packs" />
    <div className="" style={{backgroundColor:"#f9f9f9"}}>
        <div className="container productSliderDiv">
        <div className="row mx-0 pt-md-5 pt-2">
          <h1 className="mt-md-4 mt-2 text-center">Best Combo Offers</h1>
           <h5 className="text-center mb-md-4 mb-2">Explore Our Best Combo Deal</h5>
          {comboProductlist?.map((v, i) => {
            return (
              <div  className="col-lg-3 col-md-6  col-sm-12 col-12 mb-3">
                <ComboProductCard value={v} />
              </div>
            );
          })}
        </div>
      </div>
      </div>
        <FooterNav selectedItem="Menu" />
      <Footer/>
    </div>
  );
};

export default page;



// "use client";

// import React from "react";
// import Navbar from "../Components/Navbar";
// import PriceFilter from "../Components/PriceFilter";
// import ComboProductCard from "../Components/ComboProductCard";
// import { getComboProductServ } from "../services/product.service";
// import { useState, useEffect } from "react";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";
// import Footer from "../Components/Footer";


// const page = () => {

//    const [products, setProductList] = useState([]);
//   const [showLoader, setShowLoader] = useState(false);

//   const getProductList = async () => {
//     setShowLoader(true);
//     try {
//       let response = await getComboProductServ();
//       console.log(response?.data);
//       if (response?.statusCode == "200") {
//         setProductList(response?.data);
//       }
//     } catch (error) {}
//     setShowLoader(false);
//   };

//   useEffect(() => {
//     getProductList();
//   }, []);

//   return (
//     <>
//       <Navbar />

//       <div className=""
//       style={{backgroundColor: "rgb(246 244 244)" , marginTop: "10px" , paddingTop:"5%"}}>
//         <div className="">
//           <div>


//            <div className="mb-5 text-center" >
//              <h1 className="mb-2">Best Combo Offers</h1>
//              <p className="">Explore Our Best Combo Deal</p>
//            </div>

//            <div className="comboContainer position-relative p-md-5 p-2" 
//            style={{backgroundColor: "#bb3e3e"  , marginTop:"10rem"}}>

//            <div className="container comboInner" >
//              <div className="row gx-0  ">
//               {products && products.length > 0? (
//                  products.map((product) => (
//                 <div className="col-lg-3 col-md-4 col-sm-6 col-12  p-3">
//                   <ComboProductCard
//                     value={product}/>
//                 </div>
//               ))
//               ):(
//                  [1, 2, 3 ,4 ]?.map((v, i) => {
//                                     return (
//                                       <div className="col-md-3 col-6 mb-3 daily-sell p-3">
//                                         <div className="productCard shadow-sm border ">
//                                           <div className="d-flex justify-content-between align-items-center heartIcon pe-2">
//                                             <h6 className="badge border text-dark m-2">
//                                               <Skeleton height={20} width={100} />
//                                             </h6>
//                                             <Skeleton height={20} width={20} />
//                                           </div>
                
//                                           <div className="w-100">
//                                             <Skeleton height={180} width="100%" />
//                                           </div>
                
//                                           <div className="p-2">
//                                             <h4>
//                                               <Skeleton />
//                                             </h4>
//                                             <p>
//                                               <Skeleton />
//                                             </p>
                
//                                             <div className="w-100 ">
//                                               <Skeleton height={30} width="100%" />
//                                             </div>
//                                           </div>
//                                         </div>
//                                       </div>
//                                     );
//                                   }
//                                )
//               )}
             
//             </div>
//            </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer/>
//     </>
//   );
// };

// export default page;

// ;
