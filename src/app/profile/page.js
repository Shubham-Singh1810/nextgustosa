


// "use client";
// import React, { useState, useContext, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { LoggedDataContext } from "../context/Context";
// import Navbar from "../Components/Navbar";
// import { toast } from "react-toastify";
// import AccountDetails from "../Components/AccountDetails";

// const Profile = () => {
//   const { loggedUserData , updateLoggedUserData  } = useContext(LoggedDataContext);
//   const router = useRouter();

//   const [selectedSection, setSelectedSection] = useState("details");

//   const [isEditing, setIsEditing] = useState(false);

//   const [formData, setFormData] = useState({
//   firstName: "",
//   lastName: "",
//   email: "",
// });


//     useEffect(() => {
//   if (loggedUserData) {
//      setFormData({
//       firstName: loggedUserData.firstName || "",
//       lastName: loggedUserData.lastName || "",
//       email: loggedUserData.email || "",
//     });
//   }
// }, [loggedUserData]);


//   // logout 

//     useEffect(() => {
//     if (selectedSection === "logout") {
//       updateLoggedUserData(null); 
//       localStorage.removeItem("user"); 
//        toast.success("Logged out successfully!");
//       router.push("/login"); 
//     }
//   }, [selectedSection]);

//   useEffect(() => {
//     if (!loggedUserData) {
//       const timer = setTimeout(() => {
//         router.push("/login");
//       }, 1500);
//       return () => clearTimeout(timer);
//     }
//   }, [loggedUserData, router]);
  
//     const handleChange = (e) => {
//       setFormData((prev) => ({
//         ...prev,
//         [e.target.name]: e.target.value,
//       }));
//     };
  
//     const handleSave = () => {
//       updateLoggedUserData({ ...loggedUserData, ...formData });
//       setIsEditing(false);
//     };

//       if (!loggedUserData) {
//     return (
//       <div className="loading-div">
//         <p>Loading user data...</p>
//       </div>
//     );
//   }
 

//   return (
//     <>
//       <Navbar />
//       <div className="user-profile">
//         <h2>My Account</h2>
//         <div className="profile-section d-flex gap-3">
          
//           {/* 🔵 Left Menu */}
//          <AccountDetails/>

//           {/* 🔵 Right Content */}
//           <div className="profile-right">
//            <div className="my-details">
//       <h3>My details</h3>

//       {/* Personal Info */}
//       <div className="personal-info">
//         <h5>Personal Information</h5>
//         <div className="d-flex gap-2">
//           {isEditing ? (
//             <>
//               <input
//                 type="text"
//                 name="firstName"
//                 value={formData.firstName}
//                 onChange={handleChange}
//                 className="editable-input"
//               />
//               <input
//                 type="text"
//                 name="lastName"
//                 value={formData.lastName}
//                 onChange={handleChange}
//                 className="editable-input"
//               />
//             </>
//           ) : (
//             <>
//               <p className="name">{loggedUserData.firstName}</p>
//               <p className="name">{loggedUserData.lastName}</p>
//             </>
//           )}
//         </div>
//       </div>

//       {/* Email */}
//       <div className="personal-info">
//         <h5>Email Address</h5>
//         <div className="d-flex gap-2">
//           {isEditing ? (
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="editable-input"
//             />
//           ) : (
//             <p className="name">{loggedUserData.email}</p>
//           )}
//         </div>
//       </div>

//       {/* Phone Number (non-editable) */}
//       <div className="personal-info">
//         <h5>Phone Number</h5>
//         <div className="d-flex gap-2">
//           <p className="name">{loggedUserData.phone}</p>
//         </div>
//       </div>

//       {/* Buttons */}
//       <div className="personal-info d-flex gap-2">
//         <button className="change-password">Change password</button>
//         {isEditing ? (
//           <button className="save-btn" onClick={handleSave}>
//             Save
//           </button>
//         ) : (
//           <button className="edit-btn" onClick={() => setIsEditing(true)}>
//             Edit
//           </button>
//         )}
//       </div>
//             </div>
//             </div>

//         </div>
//       </div>
//     </>
//   );
// };

// export default Profile;


"use client";
import React, { useState, useContext, useEffect, useRef } from "react";

import { useRouter } from "next/navigation";
import { LoggedDataContext } from "../context/Context";
import Navbar from "../Components/Navbar";
import { toast } from "react-toastify";
import AccountDetails from "../Components/AccountDetails";
import Footer from "../Components/Footer";
import { userUpdateServ } from "../services/authentication.service";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import FooterNav from "../Components/FooterNav";

const Profile = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const fileInputRef = useRef(null);

  const { loggedUserData, updateLoggedUserData } =
    useContext(LoggedDataContext);
  const router = useRouter();

  const [selectedSection, setSelectedSection] = useState("details");

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    profileImage: "",
  });

  useEffect(() => {
    if (loggedUserData) {
      setFormData({
        firstName: loggedUserData.firstName || "",
        lastName: loggedUserData.lastName || "",
        email: loggedUserData.email || "",
        profileImage: loggedUserData.profileImage || "",
      });
       setImageSrc((prev) => prev || loggedUserData.profilePic || "");
    }
  }, [loggedUserData]);

  // logout

  useEffect(() => {
    if (selectedSection === "logout") {
      updateLoggedUserData(null);
      localStorage.removeItem("user");
      toast.success("Logged out successfully!");
      router.push("/register");
    }
  }, [selectedSection]);

  useEffect(() => {
    if (!loggedUserData) {
      const timer = setTimeout(() => {
        router.push("/register");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [loggedUserData, router]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
  const form = new FormData();
  form.append("userId", loggedUserData._id);
  form.append("phone", loggedUserData.phone);
  form.append("firstName", formData.firstName);
  form.append("lastName", formData.lastName);
  form.append("email", formData.email);

    if (fileInputRef.current && fileInputRef.current.files[0]) {
    form.append("profilePic", fileInputRef.current.files[0]);
  } else if (formData.profileImage?.startsWith("data:image")) {
    const blob = dataURLtoBlob(formData.profileImage);
    form.append("profilePic", blob, loggedUserData?.profilePic);
  }

    try {
      const res = await userUpdateServ(form);
      if(res?.statusCode == 200){
         console.log("updated succesfully", res);
         setIsEditing(false);
         toast.success(res?.message);
          updateLoggedUserData(res?.data);
           setImageSrc(res?.data?.profilePic || "");
           console.log(imageSrc)
      }
      
    } catch (error) {
      console.log("update error", error);
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
  console.log("Updated imageSrc:", imageSrc);
}, [imageSrc]);


  // if (!loggedUserData) {
  //   return (
  //     <div className="loading-div">
  //       <p>Loading user data...</p>
  //     </div>
  //   );
  // }
 
  if (!loggedUserData) {
  return (
    <>
      <Navbar />
      <div className="user-profile">
        <div className="profile-section d-flex gap-3 flex-lg-row flex-column">
          {/* Left Menu Skeleton */}
          <div style={{ width: "250px", marginTop: "60px" }} className="d-none d-lg-block">
            {[1, 2, 3 , 4 , 5].map((_, i) => (
              <Skeleton
                key={i}
                height={40}
                style={{ marginBottom: "12px", borderRadius: "6px" }}
              />
            ))}
          </div>

          <div className="my-3 d-block d-lg-none">
            <Skeleton height={40} ></Skeleton>
          </div>

          {/* Right Content Skeleton */}
          <div className="profile-right mt-lg-5 pt-lg-4" style={{ flex: 1 }}>
            <div className="my-details">
              <Skeleton height={30} width={150} style={{ marginBottom: 24 }} />

              {/* Profile Picture */}
              <div className="personal-info my-4">
                <Skeleton
                  circle
                  height={70}
                  width={70}
                  style={{ marginBottom: 32 }}
                />
              </div>

              {/* Name Fields */}
              <div className="d-flex gap-2 mb-3">
                <Skeleton height={38} width={120} />
                <Skeleton height={38} width={120} />
              </div>

              {/* Email */}
              <div className="mb-3">
                <Skeleton height={38} width={250} />
              </div>

              {/* Phone */}
              <div className="mb-3">
                <Skeleton height={38} width={180} />
              </div>

              {/* Buttons */}
              <div className="d-flex gap-2 mt-3">
                <Skeleton height={35} width={120} />
                <Skeleton height={35} width={80} />
              </div>
            </div>
          </div>
        </div>
      </div>
       <FooterNav/>
      <Footer />
    </>
  );
}




  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
        setFormData((prev) => ({
          ...prev,
          profileImage: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Navbar />
      <div className="user-profile">
        <div className="profile-section d-flex gap-3">
          {/* 🔵 Left Menu */}

          <AccountDetails />

          {/* 🔵 Right Content */}
          <div className="profile-right mt-lg-5 pt-lg-4">
            <div className="my-details">
              <h3>My details</h3>

              {/* Profile pic Info */}
              <div className="personal-info">
                <h5>Profile picture</h5>
                {/* profile input */}
                <div className="signup-div d-flex  my-4">
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className="d-none"
                    disabled={!isEditing}
                  />
                  <div
                    onClick={() => {
                      if (isEditing) handleClick();
                    }}
                    className={`signup-profile rounded-circle border ${
                      isEditing ? "border-success" : "border-secondary"
                    } overflow-hidden`}
                    style={{
                      width: "70px",
                      height: "70px",
                      cursor: "pointer",
                      transition: "border 0.3s",
                    }}
                  >
                    <img
                      src={
                        imageSrc ||
                        "https://cdn-icons-png.flaticon.com/128/552/552721.png"
                      }
                      alt="Profile"
                      className="w-100 h-100"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </div>
              </div>

              {/* Personal Info */}
              <div className="personal-info">
                <h5>Name</h5>
                <div className="d-flex gap-2">
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="editable-input"
                        style={{ height: "38px" }}
                      />
                      {/* <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="editable-input"
                        style={{ height: "38px" }}
                      /> */}
                    </>
                  ) : (
                    <>
                      <p className="name" style={{ height: "38px" }}>
                        {loggedUserData.firstName}
                      </p>
                      {/* <p className="name" style={{ height: "38px" }}>
                        {loggedUserData.lastName}
                      </p> */}
                    </>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="personal-info">
                <h5>Email Address</h5>
                <div className="d-flex gap-2">
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="editable-input"
                      style={{ height: "38px" }}
                    />
                  ) : (
                    <p className="name" style={{ height: "38px" }}>
                      {loggedUserData.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Phone Number (non-editable) */}
              <div className="personal-info">
                <h5>Phone Number</h5>
                <div className="d-flex gap-2">
                  <p className="name">{loggedUserData.phone}</p>
                </div>
              </div>

              {/* Buttons */}
              <div className="personal-info d-flex gap-2">
                <button className="change-password">Change password</button>
                {isEditing ? (
                  <button className="save-btn" onClick={handleSave}>
                    Save
                  </button>
                ) : (
                  <button
                    className="edit-btn"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterNav selectedItem="Me" />
      <Footer />
    </>
  );
};

export default Profile;






