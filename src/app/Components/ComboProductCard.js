"use client";
import React, { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { addToCartServ } from "../services/product.service";
import { toast } from "react-toastify";
import { LoggedDataContext } from "../context/Context";

function ComboProductCard({ value, showEdge }) {
  const { loggedUserData, comboCartList, setComboCartList, wishList, setWishList } =
    useContext(LoggedDataContext);
  const router = useRouter();


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

  const handleAddToWishListLocal = (e, v) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      let localWishList = JSON.parse(localStorage.getItem("wishList")) || [];

      // Check if product already exists in wishlist
      const existingProductIndex = localWishList.findIndex(
        (item) => item._id === v._id
      );

      if (existingProductIndex !== -1) {
        // If exists, remove it
        localWishList.splice(existingProductIndex, 1);
        toast.info("Item Removed From Wishlist");
      } else {
        // If not exists, add it
        localWishList.push(v);
        toast.success("Item Added To Wishlist");
      }

      // Update localStorage and state
      localStorage.setItem("wishList", JSON.stringify(localWishList));
      setWishList(localWishList);
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

  return (
    <div
      className="productCard bg-light  shadow pt-3"
      style={{ borderRadius: "12px" }}
      onClick={() => router.push("/combo-details/" + value?._id)}
    >
      {showEdge && (
        <div className="d-flex justify-content-center">
          <div className="upperCircle"></div>
        </div>
      )}

      <div className="d-flex justify-content-between align-items-center heartIcon pe-2">
        <h6 className="badge border bg-success m-2">
          Save{" "}
          {(
            ((value?.price - value?.discountedPrice) / value?.price) *
            100
          ).toFixed(2)}{" "}
          %
        </h6>
        <img
          onClick={(e) => handleAddToWishListLocal(e, value)}
          src={
            wishList?.find((item) => item._id === value._id)
              ? "https://cdn-icons-png.flaticon.com/128/2077/2077502.png"
              : "https://cdn-icons-png.flaticon.com/128/1077/1077035.png"
          }
        />
      </div>

      <div className="d-flex justify-content-center">
        <img src={value?.productHeroImage} className="img-fluid comboImg" />
      </div>

      <div className="comboInner">
        <div className="p-2 d-flex justify-content-between align-items-center">
        <div>
          <h4>{value?.name}</h4>
          <p>
            <s className="text-danger">{value?.price}</s>{" "}
            <span className="text-success text-bold">
              {value?.comboPrice} &#8377;
            </span>
          </p>
        </div>
      </div>
      <div className="p-2" style={{ display: "flex", flexWrap: "wrap" }}>
        {value?.productList?.slice(0, 2).map((v, i) => (
          <div key={i} className="comboProductNames p-1 px-2 border me-2 mb-2">
            {v?.productId?.name} : {v?.quantity}
          </div>
        ))}

        {value?.productList?.length > 2 && (
          <div className="comboProductNames p-1 px-2 border me-2 mb-2">
            +{value?.productList?.length - 2} more
          </div>
        )}
      </div>

      <div className="d-flex justify-content-around align-items-center px-2 pb-3">
        {comboCartList?.find((item) => item._id === value._id) ? (
              <div className="d-flex counterDiv rounded overflow-hidden w-100">
                <p
                  style={{ backgroundColor: "rgb(233, 42, 42)", cursor:"pointer" }}
                  className="w-100 text-white"
                  onClick={(e) => handleDecreaseQty(e, value)}
                >
                  -
                </p>
                <p className="w-100" style={{ backgroundColor: "#f9f5f5" }}>
                  {comboCartList.find((item) => item._id === value._id)?.quantity}
                </p>
                <p
                  className="w-100 text-white"
                  style={{ backgroundColor: "rgb(233, 42, 42)" , cursor:"pointer"}}
                  onClick={(e) => handleIncreaseQty(e, value)}
                > + </p>
              </div>
            ) : (
              <button onClick={(e) => handleAddToCartComboLocal(e, value)}>
                {" "}
                Add To Cart{" "}
              </button>
            )}
      </div>
      </div>
      {showEdge && (
        <div className="d-flex justify-content-center">
          <div className="lowerCircle"></div>
        </div>
      )}
    </div>
  );
}

export default ComboProductCard;
