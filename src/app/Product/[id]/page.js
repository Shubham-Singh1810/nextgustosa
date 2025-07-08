"use client";
import React from "react";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import { useState, useEffect } from "react";
import { getProduct } from "../../services/product.service";
import { useParams } from "next/navigation";
import FooterNav from "@/app/Components/FooterNav";

const page = () => {
  //  product api calling
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await getProduct(id);
        setProduct(data);
        console.log(data);
      } catch (err) {
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    }

    if (id) load();
  }, [id]);

  const [count, setCount] = useState(1);
  const [selectedImage, setSelectedImage] = useState(
    product?.productHeroImage || ""
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("details");

  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (product?.productHeroImage) {
      setSelectedImage(product.productHeroImage);
    }
  }, [product]);

  if (loading) return <p>Loading...</p>;

  // const images = [
  //    product.productHeroImage,
  //   "https://freshcart-next-js.vercel.app/images/products/product-single-img-2.jpg",
  //   "https://freshcart-next-js.vercel.app/images/products/product-single-img-3.jpg",
  //   "https://freshcart-next-js.vercel.app/images/products/product-single-img-4.jpg",
  // ];

  const images = product.productGallery || [];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (error) return <p>{error}</p>;
  if (!product) return <p>No product found.</p>;
  return (
    <>
      <Navbar />

      <div className="product-page">
        <div className="product-outer d-flex flex-md-nowrap flex-wrap gap-5">
          <div className="product-image-side d-flex">
            {/* Thumbnail Images */}
            <div className="d-flex flex-column gap-2">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  className={`product-img-small ${
                    index === activeIndex ? "active-border" : ""
                  }`}
                  alt="Product Thumbnail"
                  onClick={() => {
                    setSelectedImage(img);
                    setActiveIndex(index);
                  }}
                  style={{ cursor: "pointer" }}
                />
              ))}
            </div>

            {/* Hero Image */}
            <img
              src={selectedImage}
              className="product-img-hero mt-2"
              alt="Product"
            />

            {/* CSS Styling */}
            <style jsx>{`
              .product-img-small {
                transition: border 0.2s ease-in-out;
              }
              .active-border {
                border: 2px solid lightgreen;
              }
            `}</style>
          </div>
          <div className="product-details-side">
            <p className="product-category fw-bold">
              {" "}
              {product.category?.join(", ")}
            </p>
            <h1 className="product-name ">{product.name}</h1>
            <div className="product-rating d-flex gap-2">
              <img
                src="https://cdn-icons-png.flaticon.com/128/2107/2107957.png"
                className="rate"
              ></img>
              <img
                src="https://cdn-icons-png.flaticon.com/128/2107/2107957.png"
                className="rate"
              ></img>
              <img
                src="https://cdn-icons-png.flaticon.com/128/2107/2107957.png"
                className="rate"
              ></img>
              <img
                src="https://cdn-icons-png.flaticon.com/128/2107/2107957.png"
                className="rate"
              ></img>
              <img
                src="https://cdn-icons-png.flaticon.com/128/2107/2107737.png"
                className="rate"
              ></img>
              <p className="review fw-bold">(4 reviews)</p>
            </div>
            <div className="product-price d-flex gap-1">
              <p className=" fw-bold real-price mb-0">
                {product.discountedPrice}
              </p>{" "}
              <p className="cut-price mb-0">{product.price}</p>{" "}
              <p className=" text-danger mb-0">10% Off</p>
            </div>

            <hr className="hr mt-4 mb-4"></hr>

            {/* <div className="product-quantity d-flex gap-2">
              <p>250g</p> <p>500g</p> <p>1kg</p>
            </div> */}

            <div className="product-quantity d-flex align-items-center gap-2">
              <h6 className="mb-0 fw-bold">Weight</h6>{" "}
              <p>{product.itemWeight}</p>
            </div>

            <div className="product-count d-flex gap-1">
              <p
                onClick={() => setCount(count > 1 ? count - 1 : 1)}
                style={{ cursor: "pointer" }}
              >
                -
              </p>
              <p className="px-4">{count}</p>
              <p
                onClick={() => setCount(count + 1)}
                style={{ cursor: "pointer" }}
              >
                +
              </p>
            </div>

            <div className="d-flex gap-3 align-items-center">
              <button className="product-cart-btn d-flex gap-3">
                <img src="/assets/add-to-cart.png"></img>
                <p className="mb-0">Add to cart</p>
              </button>
              <img
                src="https://cdn-icons-png.flaticon.com/128/1077/1077035.png"
                className="wishlist"
              ></img>
            </div>

            <hr className="hr mt-4 mb-4"></hr>

            <div className="product-details d-flex ps-4">
              <div>
                <p>Product Code:</p>
                <p>Stock Quantity:</p>
                <p>Type:</p>
                <p>Shipping:</p>
              </div>
              <div>
                <p>{product.hsnCode}</p>
                <p>{product.stockQuantity}</p>
                <p>{product.productType}</p>
                <p>01 day shipping.( Free pickup today)</p>
              </div>
            </div>

            <div className="share-btn">
              <p>Share</p>
            </div>
          </div>
        </div>

        {/* product 4 informations section */}

        <div className="product-bottom">
          <div className="prdct-4-details d-flex ">
            <p
              className={`mb-0  ${
                activeTab === "details" ? "active-text " : ""
              }`}
              onClick={() => setActiveTab("details")}
            >
              Product Details
            </p>
            <p
              className={`mb-0  ${activeTab === "info" ? "active-text " : ""}`}
              onClick={() => setActiveTab("info")}
            >
              Attributes
            </p>
            <p
              className={`mb-0  ${
                activeTab === "reviews" ? "active-text" : ""
              }`}
              onClick={() => setActiveTab("reviews")}
            >
              Reviews
            </p>
            <p
              className={`mb-0  ${
                activeTab === "nutritional" ? "active-text" : ""
              }`}
              onClick={() => setActiveTab("nutritional")}
            >
              Nutritional Facts
            </p>
          </div>

          <hr className="hr mt-4 mb-4 "></hr>

          {/* product details */}

          {activeTab === "details" && (
            <div className="Product Details ">
              <div className="p-detail">
                <h4 className="">Product Overview</h4>
                <div dangerouslySetInnerHTML={{ __html: product.shortDescription }} />
              </div>
              <div className="p-detail">
                <h4>About the Product</h4>
                <div dangerouslySetInnerHTML={{ __html: product.description }} />

              </div>
              <div className="p-detail">
                <h4>Tax</h4>
                <p>{product.tax}</p>
              </div>
              <div className="p-detail">
                <h4>Ingredients</h4>
                <p>{product.ingredients}</p>
              </div>
            </div>
          )}

          {/* information */}
          {activeTab === "info" && (
            <div className="information">
              <h4 className="mb-4">Details</h4>
              <div className="info-tables d-flex flex-md-nowrap flex-wrap gap-4">
                <table className="info-table text-sm">
                  <tbody>
                    {product.productOtherDetails.map((detail) => (
                      <tr key={detail._id}>
                        <td className="font-medium">{detail.key}</td>
                        <td className="">
                          {detail.value && Array.isArray(detail.value)
                            ? detail.value.join(", ")
                            : detail.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* <table className=" info-table text-sm ">
                  <tbody>
                    <tr>
                      <td className=" font-medium">ASIN</td>
                      <td className="">SB0025UJ75W</td>
                    </tr>
                    <tr>
                      <td className=" font-medium">Best Sellers Rank</td>
                      <td className="">#2 in Fruits</td>
                    </tr>
                    <tr>
                      <td className=" font-medium">Date First Available</td>
                      <td className="">30 April 2022</td>
                    </tr>
                    <tr>
                      <td className=" font-medium">Item Weight</td>
                      <td className="">500g</td>
                    </tr>
                    <tr>
                      <td className="font-medium">Generic Name</td>
                      <td className="">Banana Robusta</td>
                    </tr>
                  </tbody>
                </table> */}
              </div>
            </div>
          )}

          {/* reviews section */}
          {activeTab === "reviews" && (
            <div className="reviews">
              <div className="review-sections d-flex flex-md-nowrap flex-wrap gap-5 justify-content-between">
                <div className="customer-reviews">
                  <h4 className="mb-3">Customer reviews</h4>
                  <div className="product-rating d-flex gap-2">
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/2107/2107957.png"
                      className="rate2"
                    ></img>
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/2107/2107957.png"
                      className="rate2"
                    ></img>
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/2107/2107957.png"
                      className="rate2"
                    ></img>
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/2107/2107957.png"
                      className="rate2"
                    ></img>
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/2107/2107737.png"
                      className="rate2"
                    ></img>
                    <p className="">
                      4.1 out of 5{" "}
                      <span className="ps-3"> 11,130 global ratings</span>
                    </p>
                  </div>
                  <div className="all-rating">
                    <div className="rate-1 d-flex align-items-center gap-1 mb-3">
                      <p className="mb-0">5</p>
                      <img
                        src="https://cdn-icons-png.flaticon.com/128/2107/2107957.png"
                        className="rate2"
                      ></img>
                      <div className="bar-container flex-grow-1">
                        <div
                          className="bar-fill"
                          style={{ width: "53%" }}
                        ></div>
                      </div>
                      <p className="mb-0">53%</p>
                    </div>
                    <div className="rate-1 d-flex  align-items-center gap-1 mb-3">
                      <p className="mb-0">4</p>
                      <img
                        src="https://cdn-icons-png.flaticon.com/128/2107/2107957.png"
                        className="rate2"
                      ></img>
                      <div className="bar-container flex-grow-1">
                        <div
                          className="bar-fill"
                          style={{ width: "22%" }}
                        ></div>
                      </div>
                      <p className="mb-0">22%</p>
                    </div>
                    <div className="rate-1 d-flex  align-items-center gap-1 mb-3">
                      <p className="mb-0">3</p>
                      <img
                        src="https://cdn-icons-png.flaticon.com/128/2107/2107957.png"
                        className="rate2"
                      ></img>
                      <div className="bar-container flex-grow-1">
                        <div
                          className="bar-fill"
                          style={{ width: "14%" }}
                        ></div>
                      </div>
                      <p className="mb-0">14%</p>
                    </div>
                    <div className="rate-1 d-flex  align-items-center gap-1 mb-3">
                      <p className="mb-0">2</p>
                      <img
                        src="https://cdn-icons-png.flaticon.com/128/2107/2107957.png"
                        className="rate2"
                      ></img>
                      <div className="bar-container flex-grow-1">
                        <div className="bar-fill" style={{ width: "7%" }}></div>
                      </div>
                      <p className="mb-0">7%</p>
                    </div>
                    <div className="rate-1 d-flex  align-items-center gap-1 mb-3">
                      <p className="mb-0">1</p>
                      <img
                        src="https://cdn-icons-png.flaticon.com/128/2107/2107957.png"
                        className="rate2"
                      ></img>
                      <div className="bar-container flex-grow-1">
                        <div className="bar-fill" style={{ width: "5%" }}></div>
                      </div>
                      <p className="mb-0">5%</p>
                    </div>
                  </div>
                  <h4>Review this product</h4>
                  <p>Share your thoughts with other customers.</p>
                  <div className="write-review-btn">
                    <p className="mb-0">Write the Review</p>
                  </div>
                </div>
                <div className="all-reviews-section">
                  <h3 className="mb-4">Reviews</h3>
                  <div className="all-reviews">
                    <div className="people-review d-flex gap-4">
                      <img
                        src="https://freshcart-next-js.vercel.app/images/avatar/avatar-10.jpg"
                        className="people-img"
                      ></img>
                      <div>
                        <h6>Shankar Subbaraman</h6>
                        <p className="fs-6">
                          30 December 2022{" "}
                          <span className="text-success fw-semibold ms-2">
                            Verified Purchase
                          </span>
                        </p>
                        <div className="product-rating d-flex flex-sm-nowrap flex-wrap gap-2">
                          <img
                            src="https://cdn-icons-png.flaticon.com/128/2107/2107957.png"
                            className="rate"
                          ></img>
                          <img
                            src="https://cdn-icons-png.flaticon.com/128/2107/2107957.png"
                            className="rate"
                          ></img>
                          <img
                            src="https://cdn-icons-png.flaticon.com/128/2107/2107957.png"
                            className="rate"
                          ></img>
                          <img
                            src="https://cdn-icons-png.flaticon.com/128/2107/2107957.png"
                            className="rate"
                          ></img>
                          <img
                            src="https://cdn-icons-png.flaticon.com/128/2107/2107957.png"
                            className="rate"
                          ></img>
                          <h6 className=" fw-bold">
                            Need to recheck the weight at delivery point
                          </h6>
                        </div>
                        <p>
                          Product quality is good. But, weight seemed less than
                          1kg. Since it is being sent in open package, there is
                          a possibility of pilferage in between. FreshCart sends
                          the veggies and fruits through sealed plastic covers
                          and Barcode on the weight etc..
                        </p>
                        <div className="d-flex gap-2">
                          <img
                            src="https://freshcart-next-js.vercel.app/images/products/product-img-1.jpg"
                            className="review-img"
                          ></img>
                          <img
                            src="https://freshcart-next-js.vercel.app/images/products/product-img-2.jpg"
                            className="review-img"
                          ></img>
                          <img
                            src="https://freshcart-next-js.vercel.app/images/products/product-img-3.jpg"
                            className="review-img"
                          ></img>
                        </div>
                        <div className="d-flex gap-2 mt-5 mb-4 justify-content-end">
                          <img
                            src="/assets/like.png"
                            style={{ width: "18px", height: "18px" }}
                          ></img>
                          <p className=" fs-6">Helpful</p>
                          <img
                            src="/assets/red-flag.png"
                            style={{ width: "18px", height: "18px" }}
                          ></img>
                          <p className=" fs-6">Report abuse</p>
                        </div>
                      </div>
                    </div>

                    <div className="people-review d-flex gap-4">
                      <img
                        src="https://freshcart-next-js.vercel.app/images/avatar/avatar-12.jpg"
                        className="people-img"
                      ></img>
                      <div>
                        <h6>Robert Thomas</h6>
                        <p className="fs-6">
                          29 December 2022
                          <span className="text-success fw-semibold ms-2">
                            Verified Purchase
                          </span>
                        </p>
                        <div className="product-rating d-flex flex-sm-nowrap flex-wrap gap-2">
                          <img
                            src="https://cdn-icons-png.flaticon.com/128/2107/2107957.png"
                            className="rate"
                          ></img>
                          <img
                            src="https://cdn-icons-png.flaticon.com/128/2107/2107957.png"
                            className="rate"
                          ></img>
                          <img
                            src="https://cdn-icons-png.flaticon.com/128/2107/2107957.png"
                            className="rate"
                          ></img>
                          <img
                            src="https://cdn-icons-png.flaticon.com/128/2107/2107957.png"
                            className="rate"
                          ></img>
                          <img
                            src="https://cdn-icons-png.flaticon.com/128/2107/2107957.png"
                            className="rate"
                          ></img>
                          <h6 className=" fw-bold">
                            Need to recheck the weight at delivery point
                          </h6>
                        </div>
                        <p>
                          Product quality is good. But, weight seemed less than
                          1kg. Since it is being sent in open package, there is
                          a possibility of pilferage in between. FreshCart sends
                          the veggies and fruits through sealed plastic covers
                          and Barcode on the weight etc..
                        </p>

                        <div className="d-flex gap-2 mt-5 mb-4 justify-content-end">
                          <img
                            src="/assets/like.png"
                            style={{ width: "18px", height: "18px" }}
                          ></img>
                          <p className=" fs-6">Helpful</p>
                          <img
                            src="/assets/red-flag.png"
                            style={{ width: "18px", height: "18px" }}
                          ></img>
                          <p className=" fs-6">Report abuse</p>
                        </div>
                      </div>
                    </div>

                    <div className="people-review d-flex gap-4">
                      <img
                        src="https://freshcart-next-js.vercel.app/images/avatar/avatar-9.jpg"
                        className="people-img"
                      ></img>
                      <div>
                        <h6>Barbara Tay</h6>
                        <p className="fs-6">
                          28 December 2022
                          <span className="text-danger fw-semibold ms-2">
                            Unverified Purchase
                          </span>
                        </p>
                        <div className="product-rating d-flex flex-sm-nowrap flex-wrap gap-2">
                          <img
                            src="https://cdn-icons-png.flaticon.com/128/2107/2107957.png"
                            className="rate"
                          ></img>
                          <img
                            src="https://cdn-icons-png.flaticon.com/128/2107/2107957.png"
                            className="rate"
                          ></img>
                          <img
                            src="https://cdn-icons-png.flaticon.com/128/2107/2107957.png"
                            className="rate"
                          ></img>
                          <img
                            src="https://cdn-icons-png.flaticon.com/128/2107/2107957.png"
                            className="rate"
                          ></img>
                          <img
                            src="https://cdn-icons-png.flaticon.com/128/2107/2107957.png"
                            className="rate"
                          ></img>
                          <h6 className=" fw-bold">
                            Need to recheck the weight at delivery point
                          </h6>
                        </div>
                        <p>
                          Everytime i ordered from fresh i got greenish yellow
                          bananas just like i wanted so go for it , its happens
                          very rare that u get over riped ones.
                        </p>

                        <div className="d-flex gap-2 mt-5 mb-4 justify-content-end">
                          <img
                            src="/assets/like.png"
                            style={{ width: "18px", height: "18px" }}
                          ></img>
                          <p className=" fs-6">Helpful</p>
                          <img
                            src="/assets/red-flag.png"
                            style={{ width: "18px", height: "18px" }}
                          ></img>
                          <p className=" fs-6">Report abuse</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h4>Create Review</h4>
                  <div className="add-review">
                    <h5>Overall rating</h5>
                    <div class="star-rating mb-3">
                      <input type="radio" name="rating" id="star5" value="5" />
                      <label for="star5">★</label>

                      <input type="radio" name="rating" id="star4" value="4" />
                      <label for="star4">★</label>

                      <input type="radio" name="rating" id="star3" value="3" />
                      <label for="star3">★</label>

                      <input type="radio" name="rating" id="star2" value="2" />
                      <label for="star2">★</label>

                      <input type="radio" name="rating" id="star1" value="1" />
                      <label for="star1">★</label>
                    </div>
                  </div>

                  <div className="add-review">
                    <h5>Rate Features</h5>

                    <h5>Flavor</h5>
                    <div class="star-rating mb-3">
                      <input type="radio" name="rating" id="star5" value="5" />
                      <label for="star5">★</label>

                      <input type="radio" name="rating" id="star4" value="4" />
                      <label for="star4">★</label>

                      <input type="radio" name="rating" id="star3" value="3" />
                      <label for="star3">★</label>

                      <input type="radio" name="rating" id="star2" value="2" />
                      <label for="star2">★</label>

                      <input type="radio" name="rating" id="star1" value="1" />
                      <label for="star1">★</label>
                    </div>
                    <h5>Value for money</h5>
                    <div class="star-rating mb-3">
                      <input type="radio" name="rating" id="star5" value="5" />
                      <label for="star5">★</label>

                      <input type="radio" name="rating" id="star4" value="4" />
                      <label for="star4">★</label>

                      <input type="radio" name="rating" id="star3" value="3" />
                      <label for="star3">★</label>

                      <input type="radio" name="rating" id="star2" value="2" />
                      <label for="star2">★</label>

                      <input type="radio" name="rating" id="star1" value="1" />
                      <label for="star1">★</label>
                    </div>
                    <h5>Scent</h5>
                    <div class="star-rating mb-3">
                      <input type="radio" name="rating" id="star5" value="5" />
                      <label for="star5">★</label>

                      <input type="radio" name="rating" id="star4" value="4" />
                      <label for="star4">★</label>

                      <input type="radio" name="rating" id="star3" value="3" />
                      <label for="star3">★</label>

                      <input type="radio" name="rating" id="star2" value="2" />
                      <label for="star2">★</label>

                      <input type="radio" name="rating" id="star1" value="1" />
                      <label for="star1">★</label>
                    </div>
                  </div>
                  <div className="add-review">
                    <h5>Add a headline</h5>
                    <input placeholder="What's most important to know"></input>
                  </div>
                  <div className="add-review mb-4">
                    <h5>Add a photo or video</h5>
                    <p>
                      Shoppers find images and videos more helpful than text
                      alone.
                    </p>

                    <label
                      htmlFor="imageUpload"
                      className="upload-box w-100 text-center d-flex align-items-center justify-content-center"
                    >
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="img-preview"
                        />
                      ) : (
                        "Drop files here to upload"
                      )}
                    </label>

                    <input
                      type="file"
                      id="imageUpload"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="form-control d-none"
                    />
                  </div>

                  <div className="add-review">
                    <h5>Add a written review</h5>
                    <input placeholder="What did you like or dislike? What did you use this product for?"></input>
                  </div>
                  <div className="d-flex justify-content-end mt-5">
                    <div className="sumbit-review">
                      <h6 className="mb-0">Sumbit Review</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* neutritional values */}
          {activeTab === "nutritional" && (
            <div className="neutritional">
              <h4>Neutritional Values</h4>
              <div className="info-tables d-flex flex-md-nowrap flex-wrap gap-4">
                <table className=" info-table text-sm ">
                  <tbody>
                    <tr>
                      <td className=" font-medium">Energy</td>
                      <td className="">450 Kcal</td>
                    </tr>
                    <tr>
                      <td className=" font-medium">Protein</td>
                      <td className="">5 g</td>
                    </tr>
                    <tr>
                      <td className=" font-medium">Carbohydrate</td>
                      <td className="">60 g</td>
                    </tr>
                    <tr>
                      <td className=" font-medium">Fat</td>
                      <td className="">20 g</td>
                    </tr>
                    <tr>
                      <td className=" font-medium">Saturated Fat</td>
                      <td className="">5 g</td>
                    </tr>
                    <tr>
                      <td className=" font-medium">Trans Fat</td>
                      <td className="">0.2 g</td>
                    </tr>
                    <tr>
                      <td className=" font-medium">Added Sugar</td>
                      <td className="">10 g</td>
                    </tr>
                    <tr>
                      <td className=" font-medium">Dietry Fiber</td>
                      <td className="">3 g</td>
                    </tr>
                  </tbody>
                </table>

                <table className=" info-table text-sm ">
                  <tbody>
                    <tr>
                      <td className=" font-medium">Calcium</td>
                      <td className="">100 mg</td>
                    </tr>
                    <tr>
                      <td className=" font-medium">Iron</td>
                      <td className="">3 mg</td>
                    </tr>
                    <tr>
                      <td className=" font-medium">Phosphorus</td>
                      <td className="">200 mg</td>
                    </tr>
                    <tr>
                      <td className=" font-medium">Potassium</td>
                      <td className="">400 mg</td>
                    </tr>
                    <tr>
                      <td className="font-medium">Sodium</td>
                      <td className="">150 mg</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
     <FooterNav/>
      <Footer />
    </>
  );
};

export default page;
