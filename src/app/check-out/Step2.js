

"use client";
import React, { useState, useContext, useEffect } from "react";
import { LoggedDataContext } from "../context/Context";
import { toast } from "react-toastify";
import { addressCreate,addressList, addressUpdate,} from "../services/address.service";
import { getNames, getCodeList } from 'country-list';

const Step2 = ({
  next,
  back,
  addressForm,
  setAddressForm,
  orderPayload,
  setOrderPayload,
  cityPrice,
}) => {
  const { loggedUserData, cartList } = useContext(LoggedDataContext);
  const [editAddress, setEditAddress] = useState(false);

  const [addresses, setAddresses] = useState([]);
  const fetchAddresses = async () => {
    try {
      const res = await addressList({ userId: loggedUserData?._id });
      setAddresses(res?.data || []);
      setAddressForm(res?.data[0]);
      if (res.data.length === 0) {
      setEditAddress(true); 
      console.log("edit addres is" ,true)
    } 
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };
  useEffect(() => {
    if (loggedUserData) {
      fetchAddresses();
    }
  }, [loggedUserData]);

  const [amountReached, setAmountReached] = useState(false);

  useEffect(() => {
    if (!loggedUserData || !cartList) return;

    const subTotal = cartList.reduce((total, item) => {
      const price = item?.discountedPrice ?? item?.pricing?.comboPrice;
      return total + price * item.quantity;
    }, 0);

    const originalTotal = cartList.reduce((total, item) => {
      const originalPrice = item?.price || item?.price || 0;
      return total + originalPrice * item.quantity;
    }, 0);

    const minCityPrice = cityPrice || 0;

    setAmountReached(subTotal >= minCityPrice);

    console.log("payload", orderPayload);
    console.log("amount reached", amountReached);
  }, [loggedUserData, cartList, addressForm, cityPrice]);

  useEffect(() => {
    if (!loggedUserData || !cartList || !cityPrice) return;

    const subTotal = cartList.reduce((total, item) => {
      const price = item?.discountedPrice ?? item?.comboPrice;
      return total + price * item.quantity;
    }, 0);

   
    setOrderPayload({
      userId: loggedUserData._id,
      product: cartList.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
        totalPrice:
          (item.discountedPrice ?? item?.comboPrice) * item.quantity,
        productHeroImage: item.productHeroImage,
      })),
      totalAmount: subTotal,
      address: addressForm,
      deliveryCharge,
    });

    setAmountReached(subTotal >= cityPrice);
  }, [cityPrice]);

  const handleAddressCreate = async (e) => {
    e.preventDefault();

    const isAddressDuplicate = addresses.some(
      (addr) =>
        addr.fullName === addressForm.fullName &&
        addr.phone === addressForm.phone &&
        // addr.alternatePhone === addressForm.alternatePhone &&
        addr.area === addressForm.area &&
        addr.city === addressForm.city &&
        addr.state === addressForm.state &&
        addr.pincode === addressForm.pincode &&
        addr.country === addressForm.country &&
        addr.landmark === addressForm.landmark
    );

    if (isAddressDuplicate) {
      toast.info("This address is already saved.");
      return;
    }

    const payload = {
      ...addressForm,
      type: "home",
      userId: loggedUserData?._id,
    };

    try {
      if (payload._id) {
        const res = await addressUpdate(payload);
        if (res?.statusCode == "200") {
          toast.success("Address updated successfully");
        }
      } else {
        const res = await addressCreate(payload);
        if (res?.statusCode == "200") {
          toast.success("Address saved successfully");
        }
      }

      fetchAddresses();
    } catch (error) {
      console.error("Address save/update error:", error);
      toast.error(error?.response?.data?.message || "Address operation failed");
    }
  };



  const [showAddress, setShowAddress] = useState(false);

  const handleSelectAdress = (address) => {
    // setSelectedAddress(address);
    console.log("selected address is", address);
    setAddressForm(address);
  };

  const handleNext = () => {
    next();
  };


  const countryNames = getNames(); 
// console.log("country names", countryNames);


  return (
    <div
      className=" p-sm-4 p-0 mb-4  container d-flex  flex-column justify-content-center align-items-center"
      style={{ borderRadius: "13px", minHeight: "50vh" }}
    >
      <div
        className="shadow rounded bg-light p-sm-3 p-3 mb-4 stepPage"
        style={{ width: "80%" }}
      >
        <h3 className="my-3 text-center">Delivery Address </h3>
        <div className="d-flex justify-content-between align-items-center mx-2 mb-2 steps">
          <h6 className="mb-0 fw-bold">Delivery Address</h6>
          {addresses?.length > 1 && (
            <img
              src="https://cdn-icons-png.flaticon.com/128/6364/6364586.png"
              style={{
                height: "15px",
                opacity: "0.6",
                cursor: "pointer",
              }}
              onClick={() => setShowAddress(!showAddress)}
            />
          )}
        </div>

        {showAddress && (
          <div className="all-addresses d-flex gap-2 flex-wrap">
            {addresses.map((address) => {
              return (
                <div className="address-card w-100 d-flex justify-content-between align-items-end">
                  <div>
                    <p className="address-name mb-0">{address.fullName}</p>
                    <p className="address-phone mb-0">{address.phone}</p>
                    {/* <p className="address mb-0">
                                {address.area}, {address.landmark},{" "}
                                {address.city}, {address.state}
                              </p> */}
                    <p className="address mb-0">
                      {address.area}, {address.landmark},{" "}
                     {address.city} , {address.state}
                    </p>

                    <p className="pincode mb-0">{address.pincode}</p>
                  </div>
                  <div className="address-btns d-flex gap-2 mt-3 ">
                    {address?._id == addressForm?._id ? (
                      <button
                        className="text-success"
                        style={{
                          // height: "40px",
                          backgroundColor: "rgb(253 231 233)",
                          border: "1px solid rgb(247 213 216)",
                        }}
                        onClick={() => handleSelectAdress(address)}
                      >
                        Selected
                      </button>
                    ) : (
                      <button
                        style={{
                          // height: "40px",
                          backgroundColor: "#dc3545",
                        }}
                        onClick={() => handleSelectAdress(address)}
                      >
                        Use Address
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="row m-0 p-0">
          <div className="col-md-6 col-12 p-0 px-md-2 my-2">
            <label className="steps-label">Name</label>
            <input
              className="form-control"
              placeholder="Enter Full Name"
              value={addressForm?.fullName}
              readOnly={!editAddress}
              onChange={(e) =>
                setAddressForm({
                  ...addressForm,
                  fullName: e?.target.value,
                })
              }
              style={{
                height: "45px",
                background: editAddress ? "white" : "whitesmoke",
              }}
            />
          </div>

          <div className="col-md-6 col-12 p-0 px-md-2 my-2">
            <label className="steps-label">Phone</label>
            <input
              className="form-control "
              placeholder="Enter Phone"
              value={addressForm?.phone}
              readOnly={!editAddress}
              onChange={(e) =>
                setAddressForm({
                  ...addressForm,
                  phone: e?.target.value,
                })
              }
              style={{
                height: "45px",
                background: editAddress ? "white" : "whitesmoke",
              }}
            />
          </div>

          {/* <div className="col-md-6 col-12 p-0 px-md-2 my-2">
            <label className="steps-label">Alternate Phone</label>
            <input
              className="form-control "
              placeholder="Enter Alternative Phone"
              value={addressForm?.alternatePhone}
              readOnly={!editAddress}
              onChange={(e) =>
                setAddressForm({
                  ...addressForm,
                  alternatePhone: e?.target.value,
                })
              }
              style={{
                height: "45px",
                background: editAddress ? "white" : "whitesmoke",
              }}
            />
          </div> */}
        </div>
        <div className="row m-0 p-0">

          <div className="col-md-12 col-12 p-0 px-md-2 my-2">
  <label className="steps-label">Country</label>
  <select
    className="form-control"
   value={addressForm?.country || "India"}

    disabled={!editAddress}
    onChange={(e) =>
      setAddressForm({
        ...addressForm,
        country: e.target.value,
      })
    }
    style={{
      height: "45px",
      background: editAddress ? "white" : "whitesmoke",
    }}
  >
    <option value="">Select a country</option>
    {countryNames.map((country, index) => (
      <option key={index} value={country}>
        {country}
      </option>
    ))}
  </select>
</div>


          <div className="col-md-4 col-12 p-0 px-md-2 my-2">
            <label className="steps-label">Pincode</label>
            <input
  type="text"
  className="form-control"
  placeholder="Pincode"
  value={addressForm?.pincode}
  readOnly={!editAddress}
  maxLength={6}
  onChange={(e) => {
    const value = e.target.value;
   
    if (/^\d{0,6}$/.test(value)) {
      setAddressForm({
        ...addressForm,
        pincode: value,
      });
    }
  }}
  style={{
    height: "45px",
    background: editAddress ? "white" : "whitesmoke",
  }}
/>

          </div>

          <div className="col-md-4 col-12 p-0 px-md-2 my-2">
            <label className="steps-label">State</label>
             <input
              className="form-control "
              placeholder="state"
              value={addressForm?.state}
              readOnly={!editAddress}
              onChange={(e) =>
                setAddressForm({
                  ...addressForm,
                  state: e?.target.value,
                })
              }
              style={{
                height: "45px",
                background: editAddress ? "white" : "whitesmoke",
              }}
            />
          </div>

          <div className="col-md-4 col-12 p-0 px-md-2 my-2">
            <label className="steps-label">City</label>
             <input
              className="form-control "
              placeholder="city"
              value={addressForm?.city}
              readOnly={!editAddress}
              onChange={(e) =>
                setAddressForm({
                  ...addressForm,
                  city: e?.target.value,
                })
              }
              style={{
                height: "45px",
                background: editAddress ? "white" : "whitesmoke",
              }}
            />  
          </div>


          <div className="col-md-6 col-12 p-0 px-md-2 my-2">
            <label className="steps-label">Area</label>
            <textarea
              className="form-control "
              placeholder="Area"
              value={addressForm?.area}
              readOnly={!editAddress}
              onChange={(e) =>
                setAddressForm({
                  ...addressForm,
                  area: e?.target.value,
                })
              }
              style={{
                height: "45px",
                background: editAddress ? "white" : "whitesmoke",
              }}
            />
          </div>

          <div className="col-md-6 col-12 p-0 px-md-2 my-2">
            <label className="steps-label">Landmark</label>
            <input
              className="form-control "
              placeholder="Landmark"
              value={addressForm?.landmark}
              readOnly={!editAddress}
              onChange={(e) =>
                setAddressForm({
                  ...addressForm,
                  landmark: e?.target.value,
                })
              }
              style={{
                height: "45px",
                background: editAddress ? "white" : "whitesmoke",
              }}
            />
          </div>
          

          

          
        </div>
        <div className="d-flex flex-column flex-sm-row">
          <div className="mx-1">
           { addresses.length > 0 && (
  <button
    onClick={() => setEditAddress(true)}
    className="btn btn-secondary w-100 mt-2"
  >
    Edit Address
  </button>
)}

          </div>
          <div className="mx-1">
            {addressForm?.fullName &&
            addressForm?.phone &&
            addressForm?.area &&
            addressForm?.pincode &&
            addressForm?.city &&
            addressForm?.state &&
            addressForm?.country &&
            addressForm?.landmark ? (
              <button className="btn btn-success w-100  mt-2"onClick={handleAddressCreate} >
                Save as delivery address
              </button>
            ) : (
              <button
                className="btn btn-success w-100  mt-2"
                style={{ opacity: "0.5" }}
              >
                Save as delivery address
              </button>
            )}
          </div>
        </div>

        

        <div className="d-flex justify-content-end gap-3 w-100 mt-3">
          <button onClick={handleNext} className="btn btn-success px-4" style={{fontFamily:"poppins"}}>
            {" "}
            Continue{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step2;