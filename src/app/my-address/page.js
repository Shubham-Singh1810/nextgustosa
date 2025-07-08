// "use client";
// import React, { useState, useContext, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { LoggedDataContext } from "../context/Context";
// import Navbar from "../Components/Navbar";
// import AccountDetails from "../Components/AccountDetails";
// import { addressCreate , addressList , addressDelete , addressUpdate} from '../services/address.service';
// import { toast } from "react-toastify";

// const Page = () => {
//   const { loggedUserData } = useContext(LoggedDataContext);
//   const router = useRouter();

//   const [form, setForm] = useState({
//     phone: "",
//     alternatePhone: "",
//     landmark: "",
//     area: "",
//     city: "",
//     state: "",
//     pincode: "",
//     country: "",
//     fullName: "",
//     type: "",
//     userId: ""
//   });

//   const [showForm, setShowForm] = useState(false);
//   const [addresses, setAddresses] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   const [editForm, setEditForm] = useState({});

//   useEffect(() => {
//     if (loggedUserData?._id) {
//       setForm((prevForm) => ({
//         ...prevForm,
//         userId: loggedUserData._id
//       }));
//     }
//   }, [loggedUserData]);

//   useEffect(() => {
//     if (!loggedUserData) {
//       const timer = setTimeout(() => {
//         router.push("/login");
//       }, 1500);
//       return () => clearTimeout(timer);
//     }
//   }, [loggedUserData, router]);

//   useEffect(() => {
//     fetchAddresses();
//   }, []);

//   const fetchAddresses = async () => {
//     try {
//       const res = await addressList({userId:loggedUserData?._id});
//       setAddresses(res?.data || []);
//     } catch (error) {
//       console.error("Error fetching addresses:", error);
//     }
//   };

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await addressCreate(form);
//       setShowForm(false);
//       setForm({
//         phone: "",
//         alternatePhone: "",
//         landmark: "",
//         area: "",
//         city: "",
//         state: "",
//         pincode: "",
//         country: "",
//         fullName: "",
//         type: "",
//         userId: loggedUserData?._id || ""
//       });
//       await fetchAddresses();
//       toast.success(res.message);
//     } catch (error) {
//       console.error("Error creating address:", error);
//       toast.error(error.response?.data?.message);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       const res = await addressDelete(id);
//       await fetchAddresses();
//       toast.success(res.message);
//     } catch (error) {
//       console.error("Error deleting address:", error);
//       toast.error(error.response?.data?.message);
//     }
//   };

//   const handleEdit = (address) => {
//     setEditingId(address._id);
//     setEditForm({ ...address });
//   };

//   const handleEditChange = (e) => {
//     setEditForm({ ...editForm, [e.target.name]: e.target.value });
//   };

//   const handleUpdate = async () => {
//     try {
//       const { _id, createdAt, updatedAt, __v, ...sanitizedData } = editForm;
//       const payload = { ...sanitizedData, _id };
//       await addressUpdate(payload);
//       alert("Address updated successfully");
//       setEditingId(null);
//       setEditForm({});
//       await fetchAddresses();
//     } catch (error) {
//       console.error("Error updating address:", error);
//       alert("Failed to update address");
//     }
//   };

//   if (!loggedUserData) {
//     return <div className="loading-div"><p>Loading user data...</p></div>;
//   }

//   return (
//     <>
//       <Navbar />
//       <div className="user-profile">
//         <h2>My Account</h2>
//         <div className="profile-section d-flex gap-3">
//           <AccountDetails />
//           <div className="profile-right">
//             <div className="my-address">
//               <h3>My Address</h3>
//               <div className="all-address d-flex gap-2 flex-wrap">
//                 {addresses.map((address) => (
//                   <div key={address._id} className="address-card">
//                     {editingId === address._id ? (
//                       <>
//                         <input name="fullName" value={editForm.fullName} onChange={handleEditChange} />
//                         <input name="phone" value={editForm.phone} onChange={handleEditChange} />
//                         <input name="alternatePhone" value={editForm.alternatePhone} onChange={handleEditChange} />
//                         <input name="landmark" value={editForm.landmark} onChange={handleEditChange} />
//                         <input name="area" value={editForm.area} onChange={handleEditChange} />
//                         <input name="city" value={editForm.city} onChange={handleEditChange} />
//                         <input name="state" value={editForm.state} onChange={handleEditChange} />
//                         <input name="pincode" value={editForm.pincode} onChange={handleEditChange} />
//                         <input name="country" value={editForm.country} onChange={handleEditChange} />
//                         <select name="type" value={editForm.type} onChange={handleEditChange}>
//                           <option value="">Select Address Type</option>
//                           <option value="Home">Home</option>
//                           <option value="Work">Work</option>
//                           <option value="Other">Other</option>
//                         </select>
//                         <div className="address-btns d-flex gap-2 mt-3">
//                           <button onClick={handleUpdate}>Save</button>
//                           <button onClick={() => setEditingId(null)}>Cancel</button>
//                         </div>
//                       </>
//                     ) : (
//                       <>
//                         <p className="address-name mb-0">{address.fullName}</p>
//                         <p className="address-phone mb-0">{address.phone}</p>
//                         <p className="address mb-0">
//                           {address.area}, {address.landmark}, {address.city}, {address.state}
//                         </p>
//                         <p className="pincode mb-0">{address.pincode}</p>
//                         <div className="address-btns d-flex gap-2 mt-3">
//                           <button onClick={() => handleEdit(address)}>Edit</button>
//                           <button onClick={() => handleDelete(address._id)} className="remove-btn">Remove</button>
//                         </div>
//                       </>
//                     )}
//                   </div>
//                 ))}
//               </div>

//               {showForm && (
//                 <div className="address-form">
//                   <h3>Add new address</h3>
//                   <form onSubmit={handleSubmit}>
//                     <div className="d-flex gap-3">
//                       <input name="fullName" placeholder="Full Name" value={form.fullName} onChange={handleChange} />
//                       <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
//                     </div>
//                     <div className="d-flex gap-3">
//                       <input name="alternatePhone" placeholder="Alternate Phone" value={form.alternatePhone} onChange={handleChange} />
//                       <input name="landmark" placeholder="Landmark" value={form.landmark} onChange={handleChange} />
//                     </div>
//                     <div className="d-flex gap-3">
//                       <input name="area" placeholder="Area" value={form.area} onChange={handleChange} />
//                       <input name="city" placeholder="City" value={form.city} onChange={handleChange} />
//                     </div>
//                     <div className="d-flex gap-3">
//                       <input name="state" placeholder="State" value={form.state} onChange={handleChange} />
//                       <input name="pincode" placeholder="Pincode" value={form.pincode} onChange={handleChange} />
//                     </div>
//                     <div className="d-flex gap-3">
//                       <select name="type" value={form.type} onChange={handleChange}>
//                         <option value="">Select Address Type</option>
//                         <option value="Home">Home</option>
//                         <option value="Work">Work</option>
//                         <option value="Other">Other</option>
//                       </select>
//                     </div>
//                     <div>
//                       <input name="country" placeholder="Country" value={form.country} onChange={handleChange} />
//                     </div>
//                     <button type="submit">Save</button>
//                   </form>
//                 </div>
//               )}

//               <div className="add-address" onClick={() => setShowForm(!showForm)} style={{ cursor: 'pointer' }}>
//                 <div className="d-flex gap-2">
//                   <img src="https://cdn-icons-png.flaticon.com/128/10015/10015328.png" alt="Add" />
//                   <p className="mb-0">Add new address</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Page;


"use client";
import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoggedDataContext } from "../context/Context";
import Navbar from "../Components/Navbar";
import AccountDetails from "../Components/AccountDetails";
import { addressCreate, addressList, addressDelete, addressUpdate,} from "../services/address.service";
import { toast } from "react-toastify";
import Footer from "../Components/Footer";
import FooterNav from "../Components/FooterNav";

const Page = () => {
  const { loggedUserData } = useContext(LoggedDataContext);

  const router = useRouter();

  const [form, setForm] = useState({
    phone: "",
    alternatePhone: "",
    landmark: "",
    area: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    fullName: "",
    type: "",
    userId: "",
  });

  const [showForm, setShowForm] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (loggedUserData?._id) {

      const id = loggedUserData?._id
      console.log("id" , id)
      setForm((prevForm) => ({
        ...prevForm,
        userId: id,
      }));
    }
  }, [loggedUserData]);

  useEffect(() => {
    if (!loggedUserData) {
      const timer = setTimeout(() => {
        router.push("/login");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [loggedUserData, router]);

  useEffect(() => {
    if (loggedUserData?._id) {
      
      fetchAddresses();
    }
  }, [loggedUserData]);

  const fetchAddresses = async () => {
    try {
      const res = await addressList({ userId: loggedUserData?._id });
      if (res?.statusCode == 200) {
        setAddresses(res?.data || []);
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(isEditMode == true){
      handleUpdate();
    }
   else{
     try {
      

      console.log("address create data", form);
      const res = await addressCreate(form);
      setShowForm(false);
      setForm({
        phone: "",
        alternatePhone: "",
        landmark: "",
        area: "",
        city: "",
        state: "",
        pincode: "",
        country: "",
        fullName: "",
        type: "",
        userId: loggedUserData?._id,
      });
      await fetchAddresses();
      toast.success(res.message);
    } catch (error) {
      console.error("Error creating address:", error);
      toast.error(error.response?.data?.message);
    }
   }
  };

  const handleDelete = async (id) => {
    try {
      const res = await addressDelete(id);
      await fetchAddresses();
      toast.success(res.message);
    } catch (error) {
      console.error("Error deleting address:", error);
      toast.error(error.response?.data?.message);
    }
  };

 const handleEdit = (address) => {
  setForm({
    fullName: address.fullName,
    phone: address.phone,
    alternatePhone: address.alternatePhone,
    landmark: address.landmark,
  area: address.areaId || address.area?._id || address.area,
    state: address.state,
    stateId: address.stateId,
    city: address.city,
    cityId: address.cityId,
    pincode: address.pincode,
    country: address.country,
    type: address.type,
  });

  setEditingId(address._id);
  setIsEditMode(true);
   setEditForm({ ...address });
  setShowForm(true);
};


  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
  try {
    const { _id, createdAt, updatedAt, __v, ...sanitizedData } = form; 
    const payload = { ...sanitizedData, _id: editingId }; 
    const res = await addressUpdate(payload);
    toast.success(res.message);
    setEditingId(null);
    setForm({ 
      phone: "",
      alternatePhone: "",
      landmark: "",
      area: "",
      city: "",
      state: "",
      pincode: "",
      country: "",
      fullName: "",
      type: "",
      userId: loggedUserData?._id,
    });
    await fetchAddresses();
  } catch (error) {
    console.error("Error updating address:", error);
    toast.error(error.response?.data?.message);
  }
  setIsEditMode(false);
  setShowForm(false);
};


  const handleShowForm = () => {
      setShowForm(!showForm)
       setForm((prevForm) => ({
  ...prevForm,
  phone: "",
  alternatePhone: "",
  landmark: "",
  area: "",
  city: "",
  state: "",
  pincode: "",
  country: "",
  fullName: "",
  type: "",
  userId: loggedUserData?._id,
}));
}


  return (
    <>
      <Navbar />
      <div className="user-profile">
        {/* <h2>My Account</h2> */}
        <div className="profile-section d-flex gap-3">
          <AccountDetails />

          <div className="profile-right mt-lg-5 pt-lg-4">
            <div className="my-address">
              <h3>My Address</h3>
              <div className="all-address d-flex gap-2 flex-wrap">
                {addresses.map((address) => (
                  <div key={address._id} className="address-card">
                   
                     
                        <p className="address-name mb-0">{address.fullName}</p>
                        <p className="address-phone mb-0">{address.phone}</p>
                        <p className="address mb-0">
                          {address.area}, {address.landmark},{" "}
                          {address.city}, {address.state}
                        </p>
                        <p className="pincode mb-0">{address.pincode}</p>
                        <div className="address-btns d-flex gap-2 mt-3">
                          <button onClick={() => handleEdit(address)}>
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(address._id)}
                            className="remove-btn"
                          >
                            Remove
                          </button>
                        </div>
                    
                   
                  </div>
                ))}
              </div>

              {showForm && (
                <div className="address-form">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                  <h3 className="mb-0 "> {isEditMode ? 'Update address' : 'Add new address'}</h3>
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/1828/1828778.png"
                      onClick={() => (
                        setShowForm(!showForm),
                        setIsEditMode(false)
                      )}
                      style={{ width: "18px", height: "18px" }}
                      className="mt-3 me-0 me-sm-5"
                    ></img>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="d-flex gap-3">
                      <input
                        name="fullName"
                        placeholder="Full Name"
                        value={form.fullName}
                        onChange={handleChange}
                      />
                      <input
                        name="phone"
                        placeholder="Phone"
                        value={form.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="d-flex gap-3">
                      <input
                        name="alternatePhone"
                        placeholder="Alternate Phone"
                        value={form.alternatePhone}
                        onChange={handleChange}
                      />
                     
                    </div>
                    <div className="d-flex gap-3">
                       <input
                        name="state"
                        placeholder="State"
                        value={form.state}
                        onChange={handleChange}
                      />

                      {/* city */}
                       <input
                        name="city"
                        placeholder="City"
                        value={form.city}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="d-flex gap-3">
                      {/* pincode */}
                       <input
                        name="pincode"
                        placeholder="Pincode"
                        value={form.pincode}
                        onChange={handleChange}
                      />

                      {/* area */}
                        <input
                        name="area"
                        placeholder="Area"
                        value={form.area}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="d-flex gap-3">
                      <input
                        name="landmark"
                        placeholder="Landmark"
                        value={form.landmark}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="d-flex gap-3">
                      <select
                        name="type"
                        value={form.type}
                        onChange={handleChange}
                      >
                        <option value="">Select Address Type</option>
                        <option value="Home">Home</option>
                        <option value="Work">Work</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <input
                        name="country"
                        placeholder="Country"
                        value={form.country}
                        onChange={handleChange}
                      />
                    </div>
                   <button type="submit">
  {isEditMode ? "Update" : "Save"}
</button>

                  </form>
                </div>
              )}

              <div
                className="add-address"
               onClick={handleShowForm}
                style={{ cursor: "pointer" }}
              >
                <div className="d-flex gap-2">
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/10308/10308038.png"
                    alt="Add"
                  />
                  <p className="mb-0">Add new address</p>
                </div>
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

export default Page;
