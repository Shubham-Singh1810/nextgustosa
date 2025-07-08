// "use client";
// import React, { useState } from "react";
// import { useRouter } from "next/navigation";

// const AccountDetails = () => {
//   const [selectedSection, setSelectedSection] = useState("details");
//   const router = useRouter();

//   const menuItems = [
//     { key: "details", label: "My details", icon: "https://cdn-icons-png.flaticon.com/128/1144/1144760.png", path: "/profile" },
//     { key: "address", label: "My address book", icon: "https://cdn-icons-png.flaticon.com/128/535/535239.png", path: "/my-address" },
//     { key: "orders", label: "My orders", icon: "https://cdn-icons-png.flaticon.com/128/1008/1008010.png", path: "/profile/orders" },
//     { key: "cart", label: "My cart", icon: "https://cdn-icons-png.flaticon.com/128/2838/2838895.png", path: "/cart" },
//     { key: "wishlist", label: "My wishlist", icon: "https://cdn-icons-png.flaticon.com/128/2767/2767018.png", path: "/wishlist" },
//     { key: "logout", label: "Log out", icon: "https://cdn-icons-png.flaticon.com/128/10609/10609328.png", path: "/logout" },
//   ];

//   const handleClick = (item) => {
//     setSelectedSection(item.key);
//     router.push(item.path);  // navigate to the respective path
//   };

//   return (
//     <div className="profile-left">
//       {menuItems.map((item) => (
//         <div
//           key={item.key}
//           className={`d-flex menu-item ${selectedSection === item.key ? "selected-detail" : ""}`}
//           onClick={() => handleClick(item)}
//           style={{ cursor: "pointer" }}
//         >
//           <img src={item.icon} className="profile-icons" alt={`${item.label} icon`} />
//           <h5 className="mb-0">{item.label}</h5>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default AccountDetails;

"use client";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const AccountDetails = () => {
  // const [selectedSection, setSelectedSection] = useState("details");
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    {
      key: "details",
      label: "My details",
      icon: "https://cdn-icons-png.flaticon.com/128/1144/1144760.png",
      path: "/profile",
    },
    {
      key: "address",
      label: "My address",
      icon: "https://cdn-icons-png.flaticon.com/128/535/535239.png",
      path: "/my-address",
    },
    {
      key: "orders",
      label: "My orders",
      icon: "https://cdn-icons-png.flaticon.com/128/1008/1008010.png",
      path: "/my-orders",
    },
    {
      key: "wishlist",
      label: "My wishlist",
      icon: "https://cdn-icons-png.flaticon.com/128/2767/2767018.png",
      path: "/my-wishlist",
    },
    {
      key: "logout",
      label: "Log out",
      icon: "https://cdn-icons-png.flaticon.com/128/10609/10609328.png",
      path: "/logout",
    },
  ];

  const handleClick = (item) => {
    router.push(item.path);
  };

  const handleSlider = () => {
    const offcanvas = new bootstrap.Offcanvas("#profileSidebar");
    offcanvas.show();
    console.log(loggedUserData);
  };

  return (
    <>
      <div
        className="left-menu d-flex flex-lg-column justify-content-lg-start justify-content-between mt-1 mt-lg-0 p-3 "
        style={{ backgroundColor: "white" }}
      >
        <h2>My Account</h2>

        <div>
          <img
            src="https://cdn-icons-png.flaticon.com/128/6015/6015685.png"
            className="d-block d-lg-none "
            style={{ width: "25px", height: "25px" }}
            onClick={handleSlider}
          ></img>

          <div className="profile-left d-lg-block d-none">
            {menuItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <div
                  key={item.key}
                  className={`d-flex menu-item  ${
                    isActive ? "selected-detail" : ""
                  }`}
                  onClick={() => handleClick(item)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={item.icon}
                    className="profile-icons"
                    alt={`${item.label} icon`}
                  />
                  <h5 className="mb-0">{item.label}</h5>
                </div>
              );
            })}
          </div>

          {/* profile slider */}

          <div
            className="offcanvas offcanvas-end "
            tabIndex="1"
            id="profileSidebar"
            style={{ fontFamily: "'Nunito Sans', sans-serif" }}
          >
            <div className="offcanvas-header">
              <h5 className="active-text">My Account</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
              ></button>
            </div>

            <div className="offcanvas-body">
              <div className="">
                {menuItems.map((item) => {
                  const isActive = pathname === item.path;
                  return (
                    <div
                      key={item.key}
                      className={`d-flex menu-item mb-4  ${
                        isActive ? "selected-detail" : ""
                      }`}
                      onClick={() => handleClick(item)}
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        src={item.icon}
                        className="profile-icons"
                        alt={`${item.label} icon`}
                      />
                      <h5 className="mb-0">{item.label}</h5>
                    </div>
                  );
                })}
              </div>
              <hr />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountDetails;
