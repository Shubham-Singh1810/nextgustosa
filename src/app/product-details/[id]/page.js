// "use client";
// import React from "react";
// import Navbar from "../../Components/Navbar";
// import { useState, useEffect, useContext } from "react";
// import { getProduct } from "../../services/product.service";
// import { useParams } from "next/navigation";
// import { LoggedDataContext } from "../../context/Context";
// import { useRouter } from "next/navigation";
// import Footer from "../../Components/Footer";
// import { addReviewServ } from "@/app/services/product.service";
// import { toast } from "react-toastify";

// function page() {
//   const { cartList, setCartList, loggedUserData } =
//     useContext(LoggedDataContext);

//   const router = useRouter();
//   const { id } = useParams();
//   const [details, setDetails] = useState(null);
//   const [ratingList, setRatingList] = useState([]);
//   const getProductDetails = async () => {
//     try {
//       let response = await getProduct(id);
//       setDetails(response.product);
//       setRatingList(response?.ratingList);
//     } catch (error) {}
//   };
//   useEffect(() => {
//     getProductDetails();
//   }, [id]);
//   const [selectedTab, setSelectedTab] = useState("Product Details");
//   const [selectedVariant, setSelectedVariant] = useState(null);
//   // add to cart

//   const handleAddToCartLocal = (e, v) => {
//     e.preventDefault();
//     e.stopPropagation();
//     try {
//       let localCartList = JSON.parse(localStorage.getItem("cartList")) || [];

//       const existingProduct = localCartList.find((item) => item._id === v._id);

//       if (existingProduct) {
//         existingProduct.quantity += 1;
//       } else {
//         localCartList.push({ ...v, quantity: 1 });
//       }

//       localStorage.setItem("cartList", JSON.stringify(localCartList));
//       setCartList(localCartList);
//       toast.success("Item Added To the cart");
//     } catch (error) {
//       console.log("Something went wrong", error);
//     }
//   };

//   const handleIncreaseQty = (e, v) => {
//     e.preventDefault();
//     e.stopPropagation();
//     let localCartList = JSON.parse(localStorage.getItem("cartList")) || [];

//     const existingProduct = localCartList.find((item) => item._id === v._id);
//     if (existingProduct) {
//       existingProduct.quantity += 1;
//     }

//     localStorage.setItem("cartList", JSON.stringify(localCartList));
//     setCartList(localCartList);
//   };

//   const handleDecreaseQty = (e, v) => {
//     e.preventDefault();
//     e.stopPropagation();
//     let localCartList = JSON.parse(localStorage.getItem("cartList")) || [];

//     const existingProduct = localCartList.find((item) => item._id === v._id);
//     if (existingProduct) {
//       existingProduct.quantity -= 1;
//       if (existingProduct.quantity <= 0) {
//         localCartList = localCartList.filter((item) => item._id !== v._id);
//       }
//     }

//     localStorage.setItem("cartList", JSON.stringify(localCartList));
//     setCartList(localCartList);
//   };
//   // buy now function

//   const handleBuyNow = (e, product) => {
//     e.preventDefault();
//     e.stopPropagation();

//     try {
//       let localCartList = JSON.parse(localStorage.getItem("cartList")) || [];
//       const existingProduct = localCartList.find(
//         (item) => item._id === product._id
//       );

//       if (!existingProduct) {
//         localCartList.push({ ...product, quantity: 1 });
//         localStorage.setItem("cartList", JSON.stringify(localCartList));
//         setCartList(localCartList);
//       }

//       router.push("/check-out");
//     } catch (error) {
//       console.log("Something went wrong", error);
//     }
//   };

//   const [showReviewPopup, setReviewPopup] = useState(false);
//   // review api

//   const [form, setForm] = useState({
//     rating: "",
//     review: "",
//   });

//   const handleRatingChange = (e) => {
//     setForm((prev) => ({ ...prev, rating: e.target.value }));
//   };

//   const handleReviewTextChange = (e) => {
//     setForm((prev) => ({ ...prev, review: e.target.value }));
//   };

//   const [userid, setUserid] = useState();
//   useEffect(() => {
//     setUserid(loggedUserData?._id);
//   }, [loggedUserData]);

//   const handleSubmitReview = async () => {
//     console.log("Review Form:", form);

//     const payload = {
//       rating: form.rating,
//       review: form.review,
//       userId: userid,
//       productId: id,
//     };

//     try {
//       const res = await addReviewServ(payload);
//       console.log(res);

//       if (res?.statusCode == "200") {
//         toast.success(res?.message);
//         getProductDetails();
//       }
//       setReviewPopup(false);
//     } catch (error) {
//       console.error("Error fetching addresses:", error);
//       toast.error(error?.response?.data?.message);
//     }
//   };

//   return (
//     <div>
//       <Navbar selectedItem="Shop" />
//       <div className="container my-md-5 my-4">
//         <div className="d-flex mt-md-5 mt-5 breadcrumb">
//           <p
//             style={{ color: "rgb(188 94 94)", cursor: "pointer" }}
//             onClick={() => router.push("/")}
//           >
//             Home -
//           </p>
//           <p
//             style={{ color: "red", cursor: "pointer" }}
//             onClick={() => router.push("/shop")}
//           >
//             Shop -
//           </p>
//           <p>{details?.name}</p>
//         </div>
//         <div className="row px-md-2 px-0 marginLeft0">
//           <div className="col-md-6 col-12 row px-md-2 px-0">
//             <div className="col-md-12 col-12 d-flex justify-content-center align-items-center border  mb-2">
//               <img
//                 src={
//                   selectedVariant
//                     ? selectedVariant?.variantImage
//                     : details?.productHeroImage
//                 }
//                 style={{ height: "400px", width: "400px" }}
//               />
//             </div>
//             <div className="col-md-12 col-12 row my-auto">
//               {details?.productGallery?.map((v, i) => {
//                 return (
//                   <div className="p-0 m-0 border col-3">
//                     <img
//                       src={v}
//                       className="img-fluid"
//                       style={{ height: "100px", width: "100%" }}
//                     />
//                   </div>
//                 );
//               })}
//               {details?.productVariants?.map((v, i) => {
//                 return (
//                   <div className="p-0 m-0 border col-3">
//                     <img
//                       src={v?.variantImage}
//                       className="img-fluid"
//                       style={{ height: "100px", width: "100%" }}
//                     />
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//           <div className="col-md-6 col-12 mx-md-2 mx-0 px-md-2 px-0">
//             <div className="border rounded p-4 productDetailsDiv mt-md-0 mt-3">
//               {selectedVariant ? (
//                 <h5 className="badge" style={{ background: "#3D9970" }}>
//                   Save{" "}
//                   {(
//                     ((selectedVariant?.variantPrice -
//                       selectedVariant?.variantDiscountedPrice) /
//                       selectedVariant?.variantPrice) *
//                     100
//                   ).toFixed(2)}
//                   %
//                 </h5>
//               ) : (
//                 <h5 className="badge" style={{ background: "#3D9970" }}>
//                   Save{" "}
//                   {(
//                     ((details?.price - details?.discountedPrice) /
//                       details?.price) *
//                     100
//                   ).toFixed(2)}
//                   %
//                 </h5>
//               )}

//               <h1 className="my-2">{details?.name}</h1>
//               <div className="d-flex align-items-center reviewDiv">
//                 {[...Array(Math.round(Number(details?.rating) || 0))].map(
//                   (_, i) => (
//                     <img
//                       key={i}
//                       src="https://cdn-icons-png.flaticon.com/128/1828/1828884.png"
//                       style={{ height: "20px", marginRight: "4px" }}
//                     />
//                   )
//                 )}

//                 <a>({ratingList?.length} reviews)</a>
//               </div>
//               <hr />

//               <div>{details?.productVariants[0]?.variantKey}</div>
//               <div className="d-flex my-2" style={{ overflow: "auto" }}>
//                 {details?.productVariants?.map((v, i) => {
//                   return (
//                     <div
//                       className="varientDiv  mb-2 "
//                       style={{ cursor: "pointer" }}
//                       onClick={() => setSelectedVariant(v)}
//                     >
//                       <div
//                         className="d-flex me-2 shadow-sm"
//                         style={{
//                           border:
//                             selectedVariant?._id == v?._id
//                               ? "2px solid green"
//                               : "none",
//                           borderRadius: "10px",
//                           background: "whitesmoke",
//                         }}
//                       >
//                         <div className="  py-0 ">
//                           <img
//                             src={v?.variantImage}
//                             style={{
//                               height: "110px",
//                               width: "150px",
//                               borderRadius: "10px 10px 0px 0px",
//                             }}
//                           />
//                           <div className="p-1 px-2">
//                             <p className="mb-0">{v?.variantValue}</p>
//                             <p className="mb-0">
//                               Price : <s>{v?.variantPrice}</s>:{" "}
//                               <b>{v?.variantDiscountedPrice} INR</b>
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>

//               <div>
//                 <h5 className="mb-mb-3 mb-1">
//                   M.R.P :{" "}
//                   <s className="text-secondary">
//                     Rs.{" "}
//                     {selectedVariant
//                       ? selectedVariant?.variantPrice
//                       : details?.price}
//                   </s>
//                 </h5>
//               </div>
//               <div>
//                 <h5>
//                   Discounted Price :{" "}
//                   <span className="discountedPrice">
//                     R.s{" "}
//                     {selectedVariant
//                       ? selectedVariant?.variantDiscountedPrice
//                       : details?.discountedPrice}
//                   </span>{" "}
//                   {details?.tax}
//                   {" included"}
//                 </h5>
//               </div>
//               <div>
//                 <h5>
//                   Brand : <span>{details?.brandId?.name}</span>
//                 </h5>
//               </div>
//               <div>
//                 <h5>
//                   Tags :{" "}
//                   {details?.tags?.map((v, i) => {
//                     return <span>{v},</span>;
//                   })}
//                 </h5>
//               </div>

//               <div className="d-flex justify-content-between mt-md-3 mt-1 gap-3 align-items-center productDetailsBtn col-sm-10 col-12 p-0">
//                 {cartList?.find((item) => item._id === details?._id) ? (
//                   <div
//                     className="d-flex align-items-center counterDiv w-100 overflow-hidden"
//                     style={{ borderRadius: "5px", height: "41px" }}
//                   >
//                     <p
//                       style={{ height: "100%" }}
//                       className="w-100 text-white mb-0 d-flex justify-content-center align-items-center bg-danger "
//                       onClick={(e) => handleDecreaseQty(e, details)}
//                     >
//                       -
//                     </p>
//                     <p
//                       className="w-100 mb-0 d-flex justify-content-center align-items-center"
//                       style={{ backgroundColor: "#f9f5f5", height: "100%" }}
//                     >
//                       {
//                         cartList.find((item) => item._id === details?._id)
//                           ?.quantity
//                       }
//                     </p>
//                     <p
//                       className="w-100 text-white mb-0 d-flex justify-content-center align-items-center bg-danger"
//                       style={{ height: "100%" }}
//                       onClick={(e) => handleIncreaseQty(e, details)}
//                     >
//                       +
//                     </p>
//                   </div>
//                 ) : (
//                   <button
//                     onClick={(e) => handleAddToCartLocal(e, details)}
//                     className="w-100 bg-danger"
//                   >
//                     Add To Cart
//                   </button>
//                 )}

//                 <button
//                   className="w-100 bg-warning"
//                   onClick={(e) => handleBuyNow(e, details)}
//                 >
//                   Buy Now
//                 </button>
//               </div>
//               <hr />
//               <div>
//                 <h5
//                   dangerouslySetInnerHTML={{
//                     __html: details?.shortDescription,
//                   }}
//                 ></h5>
//                 <u>read more</u>
//               </div>
//               <div>
//                 <h5>
//                   Product Code :{" "}
//                   <span className="border  px-2 rounded">
//                     {details?.hsnCode}
//                   </span>
//                 </h5>
//               </div>
//               <div>
//                 <h5>
//                   Stock Quantity :{" "}
//                   <span className="border  px-2 rounded">
//                     {details?.stockQuantity}
//                   </span>
//                 </h5>
//               </div>
//               <div>
//                 <h5 className="mb-0">
//                   Type :{" "}
//                   <span className="border  px-2 rounded">
//                     {details?.productType || "N/A"}
//                   </span>
//                 </h5>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="row">
//           <div className="col-12  p-2 mt-3 order-3 d-md-block d-none">
//             <div className="d-flex  productDetailsLeftBtnGroup">
//               <p
//                 onClick={() => setSelectedTab("Product Details")}
//                 className={
//                   selectedTab == "Product Details"
//                     ? " bg-secondary text-light "
//                     : " "
//                 }
//               >
//                 Product Details
//               </p>
//               <p
//                 onClick={() => setSelectedTab("Reviews")}
//                 className={
//                   selectedTab == "Reviews" ? " bg-secondary text-light " : " "
//                 }
//               >
//                 Reviews
//               </p>
//             </div>
//           </div>
//         </div>
//         {selectedTab == "Product Details" && (
//           <div>
//             <div className="productDetailsDiv mt-3 row">
//               <div className=" col-12 border">
//                 <div className="  p-2">
//                   <h3 className="mb-0">About The Product</h3>

//                   <div>
//                     <h4>
//                       Category :{" "}
//                       {details?.categoryId?.map((v, i) => {
//                         return <span>{v?.name}</span>;
//                       })}
//                     </h4>

//                     <div className=" ">
//                       <h4>Description : </h4>
//                       <p
//                         dangerouslySetInnerHTML={{
//                           __html: details?.description,
//                         }}
//                       ></p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="productDetailsDiv d-block d-md-none mt-3 row">
//               <div className="col-12 border">
//                 <div className="  p-2">
//                   <h3 className="mb-0">Peopls Thought's</h3>

//                   <div className="row">
//                     {ratingList?.map((v, i) => {
//                       return (
//                         <div className="col-lg-6 col-12">
//                           <div className="reviewBox p-2 py-3 shadow-sm mb-3 mt-2">
//                             <div className="d-flex align-items-center">
//                               <div>
//                                 <img
//                                   style={{ height: "60px" }}
//                                   src={
//                                     v?.userId?.profilePic
//                                       ? v?.userId?.profilePic
//                                       : "https://cdn-icons-png.flaticon.com/128/1077/1077114.png"
//                                   }
//                                 />
//                               </div>
//                               <div className="ms-3">
//                                 <h5>
//                                   {v?.userId?.firstName +
//                                     " " +
//                                     v?.userId?.lastName}
//                                 </h5>
//                                 <div className="d-flex starGroup">
//                                   {[
//                                     ...Array(
//                                       Math.round(Number(v?.rating) || 0)
//                                     ),
//                                   ].map((_, i) => (
//                                     <img
//                                       key={i}
//                                       src="https://cdn-icons-png.flaticon.com/128/1828/1828884.png"
//                                       style={{
//                                         height: "20px",
//                                         marginRight: "4px",
//                                       }}
//                                     />
//                                   ))}
//                                 </div>
//                                 <p className="mb-0">{v?.review}</p>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       );
//                     })}
//                     {ratingList?.length == 0 && (
//                       <div className=" p-2 ">
//                         <img src="https://cdn-icons-png.flaticon.com/256/6840/6840178.png" />
//                         <h5 className="text-secondary">No rewiews found</h5>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//         {selectedTab == "Reviews" && (
//           <div className="productDetailsDiv mt-3 row">
//             <div className="col-12 border">
//               <div className="  p-2">
//                 <div className="d-flex justify-content-between">
//                   <h3 className="mb-0">Peopls Thought's</h3>
//                   <button
//                     className="btn btn-danger"
//                     style={{ height: "35px", fontFamily: "poppins" }}
//                     onClick={() => setReviewPopup(true)}
//                   >
//                     + Add Review
//                   </button>
//                 </div>
//                 <div className="row">
//                   {ratingList?.map((v, i) => {
//                     return (
//                       <div className="col-lg-6 col-12">
//                         <div className="reviewBox p-sm-2 p-1 py-3 shadow-sm mb-sm-3 mb-1 mt-2">
//                           <div className="d-flex align-items-center">
//                             <div>
//                               <img style={{height:"100px" , width:"100px"}} className="reviewProfileImg"
//                                 src={
//                                   v?.userId?.profilePic
//                                     ? v?.userId?.profilePic
//                                     : "https://cdn-icons-png.flaticon.com/128/1077/1077114.png"
//                                 }
//                               />
//                             </div>
//                             <div className="ms-3">
//                               <h5>
//                                 {v?.userId?.firstName +
//                                   " " +
//                                   v?.userId?.lastName}
//                               </h5>
//                               <div className="d-flex starGroup">
//                                 {[
//                                   ...Array(Math.round(Number(v?.rating) || 0)),
//                                 ].map((_, i) => (
//                                   <img
//                                     key={i}
//                                     src="https://cdn-icons-png.flaticon.com/128/1828/1828884.png"
//                                     style={{
//                                       height: "20px",
//                                       marginRight: "4px",
//                                     }}
//                                   />
//                                 ))}
//                               </div>
//                               <p className="mb-0">{v?.review}</p>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })}
//                   {ratingList?.length == 0 && (
//                     <div className=" p-2 ">
//                       <img src="https://cdn-icons-png.flaticon.com/256/6840/6840178.png" />
//                       <h5 className="text-secondary">No rewiews found</h5>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* popup to add review  */}

//         {showReviewPopup && (
//           <div
//             className="review-popup position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
//             style={{ background: "rgba(0,0,0,0.5)", zIndex: 9999 }}
//           >
//             <div
//               className="bg-white p-sm-4 px-sm-5 p-3 py-4"
//               style={{ width: "500px", maxWidth: "90%", borderRadius: "3%" }}
//             >
//               <div className=" text-center align-items-center mb-3">
//                 <h4>Write a Review</h4>
//                 <p class="text-sm text-gray-500 mb-sm-4 mb-2">
//                   We value your feedback!
//                 </p>
//               </div>

//               <div className="d-flex flex-column ">
//                 <div class="star-rating mb-3 justify-content-center">
//                   <input
//                     type="radio"
//                     name="rating"
//                     id="star5"
//                     value="5"
//                     onChange={handleRatingChange}
//                   />
//                   <label for="star5">★</label>

//                   <input
//                     type="radio"
//                     name="rating"
//                     id="star4"
//                     value="4"
//                     onChange={handleRatingChange}
//                   />
//                   <label for="star4">★</label>

//                   <input
//                     type="radio"
//                     name="rating"
//                     id="star3"
//                     value="3"
//                     onChange={handleRatingChange}
//                   />
//                   <label for="star3">★</label>

//                   <input
//                     type="radio"
//                     name="rating"
//                     id="star2"
//                     value="2"
//                     onChange={handleRatingChange}
//                   />
//                   <label for="star2">★</label>

//                   <input
//                     type="radio"
//                     name="rating"
//                     id="star1"
//                     value="1"
//                     onChange={handleRatingChange}
//                   />
//                   <label for="star1">★</label>
//                 </div>

//                 <textarea
//                   placeholder="Share your thoughts about the product"
//                   rows={4}
//                   onChange={handleReviewTextChange}
//                   className="w-100 p-2 "
//                   style={{ borderRadius: "8px" }}
//                 />

//                 <div className="d-flex gap-3 w-100 mt-3">
//                   <button
//                     className="btn border-none  mt-3 mb-2 fw-bold"
//                     onClick={() => setReviewPopup(!showReviewPopup)}
//                     style={{
//                       width: "50%",
//                       backgroundColor: "rgb(211 211 211)",
//                       borderRadius: "5px",
//                     }}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     className="btn disclaimerBtn border-none text-white mt-3 mb-2 fw-bold"
//                     style={{
//                       width: "50%",
//                       backgroundColor: "#c01212",
//                       borderRadius: "5px",
//                     }}
//                     onClick={handleSubmitReview}
//                   >
//                     Submit Review
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default page;

// after change some designs

"use client";
import React from "react";
import Navbar from "../../Components/Navbar";
import { useState, useEffect, useContext } from "react";
import { getProduct } from "../../services/product.service";
import { useParams } from "next/navigation";
import { LoggedDataContext } from "../../context/Context";
import { useRouter } from "next/navigation";
import Footer from "../../Components/Footer";
import { addReviewServ } from "@/app/services/product.service";
import { toast } from "react-toastify";
import FooterNav from "@/app/Components/FooterNav";

function page() {
  const { cartList, setCartList, varientList, setVarientList, loggedUserData } =
  useContext(LoggedDataContext);
  const router = useRouter();
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [ratingList, setRatingList] = useState([]);
  const getProductDetails = async () => {
    try {
      let response = await getProduct(id);
      // setDetails(response);
      setDetails(response?.product);
      console.log("response" , response)
      let product = response.product;

      const defaultVariant = {
        _id: product._id,
        variantImage: product.productHeroImage,
        variantPrice: product.price,
        variantDiscountedPrice: product.discountedPrice,
        variantIcon: "https://cdn-icons-png.flaticon.com/128/5619/5619693.png",
      };

      product.productVariants = [defaultVariant, ...product.productVariants];
      setSelectedVariant(defaultVariant);

      setRatingList(response?.ratingList);
    } catch (error) {}
  };
  useEffect(() => {
    getProductDetails();
  }, [id]);
  const [selectedTab, setSelectedTab] = useState("Product Details");
  const [selectedVariant, setSelectedVariant] = useState(null);
  // add to cart

  const handleAddToCartLocal = (e, v) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      let localCartList = JSON.parse(localStorage.getItem("cartList")) || [];

      const existingProduct = localCartList.find((item) => item._id === v._id);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        localCartList.push({ ...v, quantity: 1 });
      }

      localStorage.setItem("cartList", JSON.stringify(localCartList));
      setCartList(localCartList);
      toast.success("Item Added To the cart");
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };

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
  // buy now function

  const handleBuyNow = (e, product) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      let localCartList = JSON.parse(localStorage.getItem("cartList")) || [];
      const existingProduct = localCartList.find(
        (item) => item._id === product._id
      );

      if (!existingProduct) {
        localCartList.push({ ...product, quantity: 1 });
        localStorage.setItem("cartList", JSON.stringify(localCartList));
        setCartList(localCartList);
      }

      router.push("/check-out");
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };

  const [showReviewPopup, setReviewPopup] = useState(false);
  // review api

  const [form, setForm] = useState({
    rating: "",
    review: "",
  });

  const handleRatingChange = (e) => {
    setForm((prev) => ({ ...prev, rating: e.target.value }));
  };

  const handleReviewTextChange = (e) => {
    setForm((prev) => ({ ...prev, review: e.target.value }));
  };

  const [userid, setUserid] = useState();
  useEffect(() => {
    setUserid(loggedUserData?._id);
  }, [loggedUserData]);

  const handleSubmitReview = async () => {
    console.log("Review Form:", form);

    const payload = {
      rating: form.rating,
      review: form.review,
      userId: userid,
      productId: id,
    };

    try {
      const res = await addReviewServ(payload);
      console.log(res);

      if (res?.statusCode == "200") {
        toast.success(res?.message);
        getProductDetails();
      }
      setReviewPopup(false);
    } catch (error) {
      console.error("Error fetching addresses:", error);
      toast.error(error?.response?.data?.message);
    }
  };

  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    if (selectedVariant) {
      setMainImage(selectedVariant?.variantImage);
    }
  }, [selectedVariant]);

  useEffect(() => {
    if (details?.productHeroImage) {
      setMainImage(details.productHeroImage);
    }
  }, [details]);

  // varient cart add

   const handleAddToVarientCartLocal = (e, v) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      let localVarientList = JSON.parse(localStorage.getItem("varientList")) || [];

       const updatedVariant = {
      ...v,
      productId: details?._id,
      name: details?.name,
    };

      const existingProduct = localVarientList.find((item) => item._id ===  updatedVariant._id);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
       localVarientList.push({ ...updatedVariant, quantity: 1 });
      }

      localStorage.setItem("varientList", JSON.stringify(localVarientList));
      setVarientList(localVarientList);
      toast.success("Item Added To the cart");
    } catch (error) {
      console.log("Something went wrong", error);
    }
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

  const handleBuyNowVarient = (e, product) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      let localVarientList = JSON.parse(localStorage.getItem("varientList")) || [];
      const existingProduct = localVarientList.find(
        (item) => item._id === product._id
      );

       const updatedProduct = {
      ...product,
      productId: details?._id,
      name: details?.name,
      quantity: 1,
    };

      if (!existingProduct) {
       localVarientList.push(updatedProduct);
        localStorage.setItem("varientList", JSON.stringify(localVarientList));
        setVarientList(localVarientList);
      }

      router.push("/check-out");
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };


  return (
    <div>
      <Navbar selectedItem="Shop" />
      <div className="container my-md-5 my-4">
        <div className="d-flex mt-md-5 mt-1 breadcrumb">
          <p
            style={{ color: "rgb(94 188 158)", cursor: "pointer" }}
            onClick={() => router.push("/")}
          >
            Home -
          </p>
          <p
            style={{ color: "#3d9970", cursor: "pointer" }}
            onClick={() => router.push("/shop")}
          >
            Shop -
          </p>
          <p>{details?.name}</p>
        </div>
        <div className="row px-md-2 px-0 marginLeft0">
          <div className="col-md-6 col-12 row px-md-2 px-0">
            <div
              className="col-md-12 col-12 d-flex justify-content-center align-items-center mb-2"
              style={{ backgroundColor: "#f7f7f7" }}
            >
              <img
                src={mainImage}
                // style={{height: "400px", width: "400px"}}
                className="detailProductImg"
              />
            </div>
            <div className="col-md-12 col-12 row my-auto">
              {details?.productGallery?.map((v, i) => {
                return (
                  <div
                    className={`p-1 rounded col-3 ${
                      mainImage === v ? " border border-2 border-success" : ""
                    }`}
                  >
                    <img
                      src={v}
                      onClick={() => setMainImage(v)}
                      className="img-fluid rounded "
                      style={{
                        height: "100px",
                        width: "100%",
                        cursor: "pointer",
                      }}
                    />
                  </div>
                );
              })}
              {details?.productVariants?.map((v, i) => {
                return (
                  <div
                    className={`p-1 m-0  rounded col-3 ${
                      mainImage === v.variantImage
                        ? "border border-2 border-success"
                        : ""
                    }`}
                  >
                    <img
                      src={v?.variantImage}
                      onClick={() => setMainImage(v?.variantImage)}
                      className="img-fluid rounded"
                      style={{
                        height: "100px",
                        width: "100%",
                        cursor: "pointer",
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-md-6 col-12 mx-md-2 mx-0 px-md-2 px-0">
            <div className=" rounded p-md-4 p-1 productDetailsDiv mt-md-0 mt-3">
              {selectedVariant ? (
                <h5 className="badge" style={{ background: "#3D9970" }}>
                  Save{" "}
                  {(
                    ((selectedVariant?.variantPrice -
                      selectedVariant?.variantDiscountedPrice) /
                      selectedVariant?.variantPrice) *
                    100
                  ).toFixed(2)}
                  %
                </h5>
              ) : (
                <h5 className="badge" style={{ background: "#3D9970" }}>
                  Save{" "}
                  {(
                    ((details?.price - details?.discountedPrice) /
                      details?.price) *
                    100
                  ).toFixed(2)}
                  %
                </h5>
              )}

              <h1 className="my-2">{details?.name}</h1>
              <div className="d-flex align-items-center reviewDiv">
                {[...Array(Math.round(Number(details?.rating) || 0))].map(
                  (_, i) => (
                    <img
                      key={i}
                      src="https://cdn-icons-png.flaticon.com/128/1828/1828884.png"
                      style={{ height: "20px", marginRight: "4px" }}
                    />
                  )
                )}

                <a>({ratingList?.length} reviews)</a>
              </div>
              <hr />

              <div>{details?.productVariants[0]?.variantKey}</div>
              <div className="d-flex my-2" style={{ overflow: "auto" }}>
                {details?.productVariants?.map((v, i) => {
                  return (
                    <div
                      className="varientDiv  mb-2 "
                      style={{ cursor: "pointer" }}
                      onClick={() => setSelectedVariant(v)}
                    >
                      <div
                        className="d-flex me-2 shadow-sm"
                        style={{
                          border:
                            selectedVariant?._id == v?._id
                              ? "2px solid green"
                              : "none",
                          borderRadius: "10px",
                          background: "whitesmoke",
                        }}
                      >
                        <div className="  py-0 ">
                          <img
                            src={v?.variantImage}
                            style={{
                              height: "110px",
                              width: "150px",
                              borderRadius: "10px 10px 0px 0px",
                            }}
                          />
                          <div className="p-1 px-2">
                           {
                            v?.variantValue ? (
                               <p className="mb-0">{v?.variantValue}</p>
                            ):(
                              // <img src={v?.variantIcon} style={{height:"14px" , width:"14px"}}></img>
                              <p className=" text-danger mb-0">Original</p>
                            )
                           }
                            <p className="mb-0">
                              Price : <s>{v?.variantPrice}</s>:{" "}
                              <b>{v?.variantDiscountedPrice} INR</b>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div>
                <h5 className="mb-mb-3 mb-1">
                  M.R.P :{" "}
                  <s className="text-secondary">
                    Rs.{" "}
                    {selectedVariant
                      ? selectedVariant?.variantPrice
                      : details?.price}
                  </s>
                </h5>
              </div>
              <div>
                <h5>
                  Discounted Price :{" "}
                  <span className="discountedPrice">
                    R.s{" "}
                    {selectedVariant
                      ? selectedVariant?.variantDiscountedPrice
                      : details?.discountedPrice}
                  </span>{" "}
                  {details?.tax}
                  {" included"}
                </h5>
              </div>
              <div>
                <h5>
                  Brand : <span>{details?.brandId?.name}</span>
                </h5>
              </div>
              <div>
                <h5>
                  Tags :{" "}
                  {details?.tags?.map((v, i) => {
                    return <span>{v},</span>;
                  })}
                </h5>
              </div>

              {/* Add to cart */}
              
              {selectedVariant?._id === details?._id ? (
                     <div className="d-flex justify-content-between mt-md-3 mt-1 gap-3 align-items-center productDetailsBtn col-sm-10 col-12 p-0">
                {cartList?.find((item) => item._id === details?._id) ? (
                  <div
                    className="d-flex align-items-center  w-100 overflow-hidden rounded-pill py-2"
                    style={{
                      borderRadius: "5px",
                      height: "41px",
                      backgroundColor: "rgb(228 251 245)",
                      border: "1px solid rgb(218 255 251)",
                    }}
                  >
                    <div
                      className="w-100 text-white mb-0 d-flex justify-content-center align-items-center"
                      style={{ height: "100%" }}
                    >
                      <p
                        onClick={(e) => handleDecreaseQty(e, details)}
                        className="mb-0 bgPrimary p-2 d-flex justify-content-center align-items-center"
                        style={{
                          borderRadius: "50%",
                          width: "25px",
                          height: "25px",
                          cursor: "pointer",
                        }}
                      >
                        -
                      </p>
                    </div>
                    <div
                      className="w-100 mb-0 d-flex justify-content-center align-items-center"
                      style={{ height: "100%" }}
                    >
                      <p className="mb-0">
                        {
                          cartList.find((item) => item._id === details?._id)
                            ?.quantity
                        }
                      </p>
                    </div>
                    <div
                      className="w-100 text-white mb-0 d-flex justify-content-center align-items-center "
                      style={{ height: "100%" }}
                    >
                      <p
                        onClick={(e) => handleIncreaseQty(e, details)}
                        className="mb-0 bgPrimary p-1 d-flex justify-content-center align-items-center"
                        style={{
                          borderRadius: "50%",
                          width: "25px",
                          height: "25px",
                          cursor: "pointer",
                        }}
                      >
                        +
                      </p>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={(e) => handleAddToCartLocal(e, details)}
                    className="w-100 bgPrimary rounded-pill"
                    style={{ cursor: "pointer" }}
                  >
                    Add To Cart
                  </button>
                )}

                <button
                  className="w-100  rounded-pill"
                  style={{ cursor: "pointer" , backgroundColor:"#b8dccc", color:"black" }}
                  onClick={(e) => handleBuyNow(e, details)}
                >
                  Buy Now
                </button>
              </div>
              ):(
                 
                <div className="d-flex justify-content-between mt-md-3 mt-1 gap-3 align-items-center productDetailsBtn col-sm-10 col-12 p-0">
                {varientList?.find((item) => item._id === selectedVariant?._id) ? (
                  <div
                    className="d-flex align-items-center  w-100 overflow-hidden rounded-pill py-2"
                    style={{
                      borderRadius: "5px",
                      height: "41px",
                      backgroundColor: "rgb(228 251 245)",
                      border: "1px solid rgb(218 255 251)",
                    }}
                  >
                    <div
                      className="w-100 text-white mb-0 d-flex justify-content-center align-items-center"
                      style={{ height: "100%" }}
                    >
                      <p
                        onClick={(e) => handleDecreaseVarientQty(e, selectedVariant)}
                        className="mb-0 bgPrimary p-2 d-flex justify-content-center align-items-center"
                        style={{
                          borderRadius: "50%",
                          width: "25px",
                          height: "25px",
                          cursor: "pointer",
                        }}
                      >
                        -
                      </p>
                    </div>
                    <div
                      className="w-100 mb-0 d-flex justify-content-center align-items-center"
                      style={{ height: "100%" }}
                    >
                      <p className="mb-0">
                        {
                          varientList.find((item) => item._id === selectedVariant?._id)
                            ?.quantity
                        }
                      </p>
                    </div>
                    <div
                      className="w-100 text-white mb-0 d-flex justify-content-center align-items-center "
                      style={{ height: "100%" }}
                    >
                      <p
                        onClick={(e) => handleIncreaseVarientQty(e, selectedVariant)}
                        className="mb-0 bgPrimary p-1 d-flex justify-content-center align-items-center"
                        style={{
                          borderRadius: "50%",
                          width: "25px",
                          height: "25px",
                          cursor: "pointer",
                        }}
                      >
                        +
                      </p>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={(e) => handleAddToVarientCartLocal(e, selectedVariant)}
                    className="w-100 bgPrimary rounded-pill"
                    style={{ cursor: "pointer" }}
                  >
                    Add To Cart
                  </button>
                )}

                <button
                  className="w-100 rounded-pill "
                  style={{ cursor: "pointer", backgroundColor:"#b8dccc" , color:"black" }}
                  onClick={(e) => handleBuyNowVarient(e, selectedVariant)}
                >
                  Buy Now 
                </button>
              </div>
              )}
              


              <hr />
              <div>
                {/* <p
                  dangerouslySetInnerHTML={{
                    __html: details?.shortDescription,
                  }}
                ></p> */}
                <div className="mb-2 mt-2">
                  <u>Read more</u>
                </div>
              </div>
              <div className="d-flex gap-1">
                <h5 style={{ minWidth: "140px" }}>Product Code : </h5>
                <h5 className=" text-secondary">{details?.hsnCode}</h5>
              </div>
              <div className="d-flex gap-1">
                <h5 style={{ minWidth: "140px" }}>Stock Quantity : </h5>
                <h5 className="text-secondary">{details?.stockQuantity}</h5>
              </div>
              <div className="d-flex gap-1">
                <h5 className="mb-0" style={{ minWidth: "140px" }}>
                  Type :{" "}
                </h5>
                <h5 className="text-secondary">{details?.productType}</h5>
              </div>
              <div className="d-flex gap-1">
                <h5 className="mb-0" style={{ minWidth: "140px" }}>
                  Number of Pieces :{" "}
                </h5>
                <h5 className="text-secondary">{details?.numberOfPieces}</h5>
              </div>
              
            </div>
          </div>
        </div>

        <div
          className="p-md-3 p-1 mt-4"
          style={{ border: "1px solid #dfdfdf", borderRadius: "20px" }}
        >
          <div className="row" style={{ borderBottom: "1px solid #dfdfdf" }}>
            <div className="col-12  p-md-3 p-2 pb-md-4  order-3 ">
              <div className="d-flex gap-3  productDetailsLeftBtnGroup ">
                <p
                  onClick={() => setSelectedTab("Product Details")}
                  className={
                    selectedTab == "Product Details"
                      ? "  text-light  selectedTabPrdct py-md-3 py-2"
                      : " tabProduct py-md-3 py-2"
                  }
                >
                  Product Details
                </p>
                <p
                  onClick={() => setSelectedTab("Reviews")}
                  className={
                    selectedTab == "Reviews"
                      ? " text-light selectedTabPrdct py-md-3 py-2"
                      : "tabProduct py-md-3 py-2"
                  }
                >
                  Reviews
                </p>
                 <p
                  onClick={() => setSelectedTab("nutrients")}
                  className={
                    selectedTab == "nutrients"
                      ? " text-light selectedTabPrdct py-md-3 py-2"
                      : "tabProduct py-md-3 py-2"
                  }
                >
                  Nutritional Facts
                </p>
              </div>
            </div>
          </div>
          {selectedTab == "Product Details" && (
            <div>
              <div className="productDetailsDiv mt-3 row">
                <div className=" col-12 ">
                  <div className="  p-2">
                    <h3 className="mb-0">About The Product</h3>

                    <div>
                      <h4>
                        Category :{" "}
                        {details?.categoryId?.map((v, i) => {
                          return <span>{v?.name}</span>;
                        })}
                      </h4>

                      <div className=" ">
                        <h4>Description : </h4>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: details?.description,
                          }}
                        ></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="productDetailsDiv  d-none mt-3 row">
                <div className="col-12 ">
                  <div className="  p-2">
                    <h3 className="mb-0">Peopls Thought's</h3>

                    <div className="row">
                      {ratingList?.map((v, i) => {
                        return (
                          <div className="col-lg-6 col-12">
                            <div className="reviewBox p-2 py-3 shadow-sm mb-3 mt-2">
                              <div className="d-flex align-items-center">
                                <div>
                                  <img
                                    style={{ height: "60px" }}
                                    src={
                                      v?.userId?.profilePic
                                        ? v?.userId?.profilePic
                                        : "https://cdn-icons-png.flaticon.com/128/1077/1077114.png"
                                    }
                                  />
                                </div>
                                <div className="ms-3">
                                  <h5>
                                    {v?.userId?.firstName +
                                      " " +
                                      v?.userId?.lastName}
                                  </h5>
                                  <div className="d-flex starGroup">
                                    {[
                                      ...Array(
                                        Math.round(Number(v?.rating) || 0)
                                      ),
                                    ].map((_, i) => (
                                      <img
                                        key={i}
                                        src="https://cdn-icons-png.flaticon.com/128/1828/1828884.png"
                                        style={{
                                          height: "20px",
                                          marginRight: "4px",
                                        }}
                                      />
                                    ))}
                                  </div>
                                  <p className="mb-0">{v?.review}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      {ratingList?.length == 0 && (
                        <div className=" p-2 ">
                          <img src="https://cdn-icons-png.flaticon.com/256/6840/6840178.png" />
                          <h5 className="text-secondary">No rewiews found</h5>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {selectedTab == "Reviews" && (
            <div className="productDetailsDiv mt-3 row">
              <div className="col-12">
                <div className="  p-2">
                  <div className="d-flex justify-content-between align-items-center">
                    <h3 className="mb-0">Peopls Thought's</h3>
                    <button
                      className="btn btn-danger rounded-pill"
                      style={{ height: "35px" }}
                      onClick={() => setReviewPopup(true)}
                    >
                      + Add Review
                    </button>
                  </div>
                  <div className="row">
                    {ratingList?.map((v, i) => {
                      return (
                        <div className="col-lg-6 col-12">
                          <div className="reviewBox p-sm-2 p-1 py-3 shadow-sm mb-sm-3 mb-1 mt-2">
                            <div className="d-flex align-items-center">
                              <div>
                                <img
                                  style={{ height: "100px", width: "100px" }}
                                  className="reviewProfileImg"
                                  src={
                                    v?.userId?.profilePic
                                      ? v?.userId?.profilePic
                                      : "https://cdn-icons-png.flaticon.com/128/1077/1077114.png"
                                  }
                                />
                              </div>
                              <div className="ms-3">
                                <h5>
                                  {v?.userId?.firstName +
                                    " " +
                                    v?.userId?.lastName}
                                </h5>
                                <div className="d-flex starGroup">
                                  {[
                                    ...Array(
                                      Math.round(Number(v?.rating) || 0)
                                    ),
                                  ].map((_, i) => (
                                    <img
                                      key={i}
                                      src="https://cdn-icons-png.flaticon.com/128/1828/1828884.png"
                                      style={{
                                        height: "20px",
                                        marginRight: "4px",
                                      }}
                                    />
                                  ))}
                                </div>
                                <p className="mb-0">{v?.review}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    {ratingList?.length == 0 && (
                      <div className=" p-2 ">
                        <img src="https://cdn-icons-png.flaticon.com/256/6840/6840178.png" />
                        <h5 className="text-secondary">No rewiews found</h5>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          { selectedTab == "nutrients" &&
            (
             <div className="table-responsive my-4 nutrientTable" style={{overflow:"hidden"}}>
  <table className="table table-bordered table-striped">
    <thead className="table-success">
      <tr>
        <th colSpan="2" className="text-center">Product Nutritional & Package Info</th>
      </tr>
    </thead>
  </table>

  <div className="row">
    <div className="col-md-6">
      <table className="table table-bordered table-striped">
        <tbody>
          <tr><th>Added Sugar</th><td>{details?.addedSugar}</td></tr>
          <tr><th>Calcium</th><td>{details?.calcium}</td></tr>
          <tr><th>Carbohydrate</th><td>{details?.carbohydrate}</td></tr>
          <tr><th>Fat</th><td>{details?.fat}</td></tr>
          <tr><th>Dietary Fiber</th><td>{details?.dietaryFiber}</td></tr>
          <tr><th>Energy</th><td>{details?.energy}</td></tr>
          <tr><th>Iron</th><td>{details?.iron}</td></tr>
          <tr><th>Item Weight</th><td>{details?.itemWeight} g</td></tr>
          <tr><th>Pack Of</th><td>{details?.packOf}</td></tr>
          {/* <tr><th>Pack Size</th><td>{details?.packSize}</td></tr> */}
        </tbody>
      </table>
    </div>

    <div className="col-md-6">
      <table className="table table-bordered table-striped">
        <tbody>
          <tr><th>Package Weight</th><td>{details?.packageWeight} g</td></tr>
          <tr><th>Phosphorus</th><td>{details?.phosphorus} mg</td></tr>
          <tr><th>Potassium</th><td>{details?.potassium} mg</td></tr>
          {/* <tr><th>Price</th><td>₹{details?.price}</td></tr> */}
          <tr><th>Protein</th><td>{details?.protein} g</td></tr>
          <tr><th>Saturated Fat</th><td>{details?.saturatedFat} g</td></tr>
          <tr><th>Serving Size</th><td>{details?.servingSize}</td></tr>
          <tr><th>Sodium</th><td>{details?.sodium} mg</td></tr>
          {/* <tr><th>Stock Quantity</th><td>{details?.stockQuantity}</td></tr> */}
          <tr><th>Total Sugar</th><td>{details?.totalSugar} g</td></tr>
          <tr><th>Trans Fat</th><td>{details?.transFat} g</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</div>


            )
          }
        </div>

        {/* popup to add review  */}

        {showReviewPopup && (
          <div
            className="review-popup position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
            style={{ background: "rgba(0,0,0,0.5)", zIndex: 9999 }}
          >
            <div
              className="bg-white p-sm-4 px-sm-5 p-3 py-4"
              style={{ width: "500px", maxWidth: "90%", borderRadius: "3%" }}
            >
              <div className=" text-center align-items-center mb-3">
                <h4>Write a Review</h4>
                <p class="text-sm text-gray-500 mb-sm-4 mb-2">
                  We value your feedback!
                </p>
              </div>

              <div className="d-flex flex-column ">
                <div class="star-rating mb-3 justify-content-center">
                  <input
                    type="radio"
                    name="rating"
                    id="star5"
                    value="5"
                    onChange={handleRatingChange}
                  />
                  <label for="star5">★</label>

                  <input
                    type="radio"
                    name="rating"
                    id="star4"
                    value="4"
                    onChange={handleRatingChange}
                  />
                  <label for="star4">★</label>

                  <input
                    type="radio"
                    name="rating"
                    id="star3"
                    value="3"
                    onChange={handleRatingChange}
                  />
                  <label for="star3">★</label>

                  <input
                    type="radio"
                    name="rating"
                    id="star2"
                    value="2"
                    onChange={handleRatingChange}
                  />
                  <label for="star2">★</label>

                  <input
                    type="radio"
                    name="rating"
                    id="star1"
                    value="1"
                    onChange={handleRatingChange}
                  />
                  <label for="star1">★</label>
                </div>

                <textarea
                  placeholder="Share your thoughts about the product"
                  rows={4}
                  onChange={handleReviewTextChange}
                  className="w-100 p-2 "
                  style={{ borderRadius: "8px" }}
                />

                <div className="d-flex gap-3 w-100 mt-3">
                  <button
                    className="btn border-none  mt-3 mb-2 fw-bold"
                    onClick={() => setReviewPopup(!showReviewPopup)}
                    style={{
                      width: "50%",
                      backgroundColor: "rgb(211 211 211)",
                      borderRadius: "5px",
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn disclaimerBtn border-none text-white mt-3 mb-2 fw-bold"
                    style={{
                      width: "50%",
                      backgroundColor: "#c01212",
                      borderRadius: "5px",
                    }}
                    onClick={handleSubmitReview}
                  >
                    Submit Review
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <FooterNav />
      <Footer />
    </div>
  );
}

export default page;
