"use client";

import React, { useRef, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useRouter } from "next/navigation";
import { signUp } from "../services/authentication.service";
import { otpSend } from "../services/authentication.service";
import { toast } from "react-toastify";
import FooterNav from "../Components/FooterNav";

const page = () => {
  const router = useRouter();

  const [imageSrc, setImageSrc] = useState(null);
  const fileInputRef = useRef(null);

  // 👇 Form data state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    profileImage: null,
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
        setFormData((prev) => ({
          ...prev,
          profileImage: reader.result, // save image in base64 format
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  // 👇 Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object for file upload
    const form = new FormData();
    form.append("firstName", formData.firstName);
    form.append("lastName", formData.lastName);
    form.append("email", formData.email);
    form.append("phone", formData.phone);
    form.append("password", formData.password);

    if (fileInputRef.current?.files[0]) {
      form.append("profilePic", fileInputRef.current.files[0]);
    }

    try {
      const response = await signUp(form); // calling API
      console.log("Signup successful:", response);
      toast.success(response.message);
      sessionStorage.setItem("userPhone", formData.phone);

      await otpSend(formData.phone);

      router.push("/otp-verify");
    } catch (error) {
      console.error("Signup or OTP failed:", error);
      toast.error(error.response?.data?.message);
    }
  };

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <>
      <Navbar />
      <div className="signup-page">
        <div className="signup-sections d-flex align-items-center flex-wrap flex-md-nowrap">
          <div className="signup-image d-flex justify-content-center">
            <img src="https://freshcart-next-js.vercel.app/images/svg-graphics/signup-g.svg" />
          </div>
          <div className="signup-form">
            <h2> Sign Up to Get Started</h2>
            <form
              className="d-flex flex-column align-items-center"
              onSubmit={handleSubmit}
            >
              {/* profile input */}
              <div className="signup-div d-flex justify-content-center my-4">
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="d-none"
                />
                <div
                  onClick={handleClick}
                  className="signup-profile rounded-circle border border-success overflow-hidden"
                  style={{
                    width: "90px",
                    height: "90px",
                    cursor: "pointer",
                    transition: "border 0.3s",
                  }}
                >
                  <img
                    src={
                      imageSrc ||
                      "https://cdn-icons-png.flaticon.com/128/14771/14771804.png"
                    }
                    alt="Profile"
                    className="w-100 h-100"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </div>

              <div className="signup-div row gx-0 gap-3">
                <div className="col">
                  <input
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col">
                  <input
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="signup-div">
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="signup-div">
                <input
                  type="tel"
                  placeholder="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

             <div className="signup-div">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div> 

              <button type="submit" className="register bgPrimary">
                Register
              </button>
            </form>
            <p className="signup-p">
              Already have an account?{" "}
              <span
                className="signin-option text-danger fw-bold"
                onClick={handleLogin}
              >
                Sign in
              </span>
            </p>
          </div>
        </div>
      </div>
      <FooterNav/>
      <Footer />
    </>
  );
};

export default page;
