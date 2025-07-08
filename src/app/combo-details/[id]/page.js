"use client";
import React from "react";
import Navbar from "../../Components/Navbar";
import { useState, useEffect, useContext } from "react";
import { getComboProductDetails } from "../../services/product.service";
import { useParams } from "next/navigation";
import { LoggedDataContext } from "../../context/Context";
import { useRouter } from "next/navigation";
import Footer from "../../Components/Footer";
import { addReviewServ } from "@/app/services/product.service";
import { toast } from "react-toastify";
import FooterNav from "@/app/Components/FooterNav";

function page() {
  const { comboCartList, setComboCartList, loggedUserData } =
    useContext(LoggedDataContext);

  const router = useRouter();
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [ratingList, setRatingList] = useState([]);

  const getProductDetails = async () => {
  
    try {
      let response = await getComboProductDetails(id);
        console.log("inside")
      setDetails(response);
      console.log("response" , response)
      setRatingList(response?.ratingList);
    } catch (error) {}
  };
  useEffect(() => {
    getProductDetails();
  }, [id]);

  useEffect(() => {
    console.log("combo details" , details)
  }, [details]);

  const [selectedTab, setSelectedTab] = useState("View Products");
  const [selectedVariant, setSelectedVariant] = useState(null);

  // add to cart

  const handleAddToCartComboLocal = (e, v) => {
     e.preventDefault();
     e.stopPropagation();
     try {
       let localComboCartList = JSON.parse(localStorage.getItem("comboCartList")) || [];
 
       const existingProduct = localComboCartList.find((item) => item._id === v._id);
 
       if (existingProduct) {
         existingProduct.quantity += 1;
       } else {
         localComboCartList.push({ ...v, quantity: 1 });
       }
 
       localStorage.setItem("comboCartList", JSON.stringify(localComboCartList));
       setComboCartList(localComboCartList);
       toast.success("Item Added To the cart");
     } catch (error) {
       console.log("Something went wrong", error);
     }
   };

  const handleIncreaseQty = (e, v) => {
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

  const handleDecreaseQty = (e, v) => {
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
  // buy now function

  const handleBuyNow = (e, product) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      let localComboCartList = JSON.parse(localStorage.getItem("comboCartList")) || [];
      const existingProduct = localComboCartList.find(
        (item) => item._id === product._id
      );

      if (!existingProduct) {
       localComboCartList.push({ ...product, quantity: 1 });
        localStorage.setItem("comboCartList", JSON.stringify(localComboCartList));
        setComboCartList(localComboCartList);
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
  if (details?.productHeroImage) {
    setMainImage(details.productHeroImage);
  }
}, [details]);



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
            onClick={() => router.push("/combo-products")}
          >
            Combo Packs-
          </p>
          <p>{details?.name}</p>
        </div>
        <div className="row px-md-2 px-0 marginLeft0">
          <div className="col-md-6 col-12 row px-md-2 px-0">
            <div className="col-md-12 col-12 d-flex justify-content-center align-items-center mb-2"
            style={{backgroundColor:"#f7f7f7"}}>
              <img
                src={mainImage}

                // style={{ height: "400px", width: "400px" }}
                className="detailProductImg"
              />
            </div>
            <div className="col-md-12 col-12 row my-auto">
              {details?.productGallery?.map((v, i) => {
                return (
                  <div className={`p-1 rounded col-3 ${ mainImage === v ? " border border-2 border-success" : ""}`}>
                    <img
                      src={v}
                        onClick={() => setMainImage(v)}
                      className="img-fluid rounded "
                      style={{ height: "100px ", width:"100%", cursor:"pointer"}}
                    />
                  </div>
                );
              })}
              {details?.productVariants?.map((v, i) => {
                return (
                  <div  className={`p-1 m-0  rounded col-3 ${
        mainImage === v.variantImage ? "border border-2 border-danger" : ""
      }`}>
                    <img
                      src={v?.variantImage}
                        onClick={() => setMainImage(v?.variantImage)}
                      className="img-fluid rounded"
                      style={{ height: "100px", width:"100%", cursor:"pointer"}}
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

              {/* <div>{details?.productVariants[0]?.variantKey}</div>
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
                            <p className="mb-0">{v?.variantValue}</p>
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
              </div> */}

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

              <div className="d-flex justify-content-between mt-md-3 mt-1 gap-3 align-items-center productDetailsBtn col-sm-10 col-12 p-0">
                {comboCartList?.find((item) => item._id === details?._id) ? (
                  <div
                    className="d-flex align-items-center  w-100 overflow-hidden rounded-pill py-2"
                    style={{ borderRadius: "5px", height: "41px" ,   backgroundColor: "rgb(228 251 245)",
                      border: "1px solid rgb(218 255 251)"}}
                  >
                   <div  className="w-100 text-white mb-0 d-flex justify-content-center align-items-center" 
                    style={{ height: "100%" }}>
                     <p onClick={(e) => handleDecreaseQty(e, details)} className="mb-0 bgPrimary p-2 d-flex justify-content-center align-items-center" 
                     style={{borderRadius:"50%", width:"25px" , height:"25px" , cursor:"pointer"}} >
                      -
                    </p>
                   </div>
                   <div  className="w-100 mb-0 d-flex justify-content-center align-items-center"
                      style={{ height: "100%" }}>
                    <p className="mb-0">
                      {
                        comboCartList.find((item) => item._id === details?._id)
                          ?.quantity
                      }
                    </p>
                   </div>
                   <div  className="w-100 text-white mb-0 d-flex justify-content-center align-items-center "
                      style={{ height: "100%" }}>
                     <p onClick={(e) => handleIncreaseQty(e, details)}  className="mb-0 bgPrimary p-1 d-flex justify-content-center align-items-center" 
                     style={{borderRadius:"50%" , width:"25px" , height:"25px" , cursor:"pointer"}}>
                      +
                    </p>
                   </div>
                  </div>
                ) : (
                  <button
                    onClick={(e) => handleAddToCartComboLocal(e, details)}
                    className="w-100 bgPrimary rounded-pill"
                     style={{cursor:"pointer"}}
                  >
                    Add To Cart
                  </button>
                )}

                <button
                  className="w-100  rounded-pill"
                   style={{cursor:"pointer" , backgroundColor:"#b8dccc", color:"black" }}
                  onClick={(e) => handleBuyNow(e, details)}
                >
                  Buy Now
                </button>
              </div>
              <hr />
              <div>
                <h5
                  dangerouslySetInnerHTML={{
                    __html: details?.shortDescription,
                  }}
                ></h5>
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
            </div>
          </div>
        </div>


        <div className="p-md-3 p-1 mt-4" style={{border:"1px solid #dfdfdf" , borderRadius:"20px"}}>
          <div className="row" style={{borderBottom :"1px solid #dfdfdf"}}>
          <div className="col-12  p-md-3 p-2 pb-md-4  order-3 ">
            <div className="d-flex gap-3 justify-content-md-start justify-content-center productDetailsLeftBtnGroup ">
               <p
                onClick={() => setSelectedTab("View Products")}
                className={
                  selectedTab == "View Products"
                    ? "  text-light  selectedTabPrdct py-md-3 py-2"
                    : " tabProduct py-md-3 py-2"
                }
              >
                View Products
              </p>

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
                className={ selectedTab == "Reviews" ? " text-light selectedTabPrdct py-md-3 py-2" : "tabProduct py-md-3 py-2" }>
                Reviews
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
                <div className="d-flex justify-content-between">
                  <h3 className="mb-0">Peopls Thought's</h3>
                  <button
                    className="btn btn-danger rounded-pill"
                    style={{ height: "35px", fontFamily: "" }}
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
                              <img style={{height:"100px" , width:"100px"}} className="reviewProfileImg"
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
                                  ...Array(Math.round(Number(v?.rating) || 0)),
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
                  {ratingList?.length == 0 || !ratingList && (
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
             {/* sub products of combo */}
        {selectedTab == "View Products" && (
          <div className="container my-4">
           
            <div className=" p-4  rounded-3">
               <h2 className="">Products</h2>
              {details?.productList?.map((item, index) => (
                <div
                  key={item?.product?.id}
                  className=" p-3 py-4 "
                  style={{ borderBottom: "1px solid #c1c1c1" }}
                >
                  <div className="row g-0  justify-content-between">
                    <div className="col-md-2">
                      <div className="overflow-hidden">
                        <img
                          style={{ width: "160px", height: "auto" }}
                          src={item?.product?.productHeroImage}
                          alt={item?.product?.name}
                          className="img-fluid rounded-3 productImage mb-2 mb-sm-0"
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <h5 className="card-title mb-1">{item?.product?.name}</h5>
                      <div className="tags">
                        {item?.product?.tags.map((tag, index) => (
                          <span key={index} className="tag">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <p>
                        {item?.product?.shortDescription.replace(/<[^>]*>/g, "")}
                      </p>
                    </div>

                    <div className="col-md-3 text-md-center">
                      <p>Number of Pieces: {item?.product?.numberOfPieces}</p>
                    </div>

                    <div className="col-md-3 align-items-center text-md-center">
                      <p className=" text-decoration-line-through">
                        ₹{item?.product?.price}
                      </p>
                      <h6 className="text-success fw-bold fs-5">
                        Price: ₹{item?.product?.discountedPrice}
                      </h6>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
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
      <FooterNav/>
      <Footer/>
    </div>
  );
}

export default page;
