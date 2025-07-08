"use client";
import React, { useState, useRef } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { bulkOrder } from "../services/support.service";
import { toast } from "react-toastify";
import FooterNav from "../Components/FooterNav";
function Page() {
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contact: "",
    message: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, file }));
  };
  const [loader, setLoader] = useState(false);
  const handleSubmit = async (e) => {
    setLoader(true);
    e.preventDefault();
    const newFormData = new FormData();
    newFormData.append("firstName", formData?.firstName)
    newFormData.append("lastName", formData?.lastName)
    newFormData.append("contactNumber", formData?.contact)
    newFormData.append("image", formData?.file)
    newFormData.append("message", formData?.message)
    try {
      const res = await bulkOrder(newFormData);
      if (res?.statusCode == "200") {
        setFormData({
          firstName: "",
          lastName: "",
          contact: "",
          message: "",
          file: null,
        });
        if (fileInputRef.current) {
          fileInputRef.current.value = null; // reset file input
        }
        toast.success(res?.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Inteernal Server Error");
    }
    setLoader(false);
  };

  return (
    <div>
      <Navbar selectedItem="Bulk Order" />
      <div className="container aboutMain">
        <form onSubmit={handleSubmit}>
          <div className="row my-md-5 my-2 mx-0 mx-md-2 shadow bg-light">
            <div className="col-md-4 col-12 d-flex justify-content-between px-0">
              <img
                style={{ width: "100%" }}
                src="/assets/bulk.png"
             
                className="img-fluid"
              />
            </div>
            <div className="col-md-8 my-auto col-12 p-sm-4 p-2">
              <div className="row col-12 p-md-3 p-0">
                <h1 className="py-md-4 py-3">Place Bulk Order</h1>
                <div className="col-md-6 col-12 mb-2">
                  <label>First Name</label>
                  <input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <label>Last Name</label>
                  <input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <label>Contact Number</label>
                  <input
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <label>File</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                  />
                </div>
                <div className="col-12 mb-2">
                  <label>Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="form-control"
                    rows={5}
                    required
                  />
                </div>
                <div className="col-12 my-3">
                  {formData?.firstName &&
                  formData?.lastName &&
                  formData?.contact &&
                  formData?.file &&
                  formData?.message ? (
                    <button type="submit" className="btn btn-success w-100">
                      Submit
                    </button>
                  ) : loader ? (
                    <button
                      style={{ opacity: "0.5" }}
                      className="btn btn-success w-100"
                    >
                      Saving ...
                    </button>
                  ) : (
                    <button
                      style={{ opacity: "0.5" }}
                      className="btn btn-success w-100"
                    >
                      Submit
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      {/* <Footer /> */}
        <FooterNav selectedItem="Menu" />
      <Footer/>
    </div>
  );
}

export default Page;
