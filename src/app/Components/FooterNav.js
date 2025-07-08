// import React from "react";

// function FooterNav({selectedItem}) {
//   const navItem = [
//     {
//       name: "Home",
//       link: "/",
//       image: "https://cdn-icons-png.flaticon.com/128/1946/1946436.png",
//     },
//     {
//       name: "Shop",
//       link: "/shop",
//       image: "https://cdn-icons-png.flaticon.com/128/151/151773.png",
//     },
//     {
//       name: "Menu",
//       link: "/",
//       image: "https://cdn-icons-png.flaticon.com/128/2976/2976215.png",
//     },
//     {
//       name: "Me",
//       link: "/profile",
//       image: "https://cdn-icons-png.flaticon.com/128/1077/1077114.png",
//     },
//   ];
//   return (
//     <div className="footerNav d-md-none d-block ">
//       <div className="row">
//         {navItem?.map((v, i) => {
//           return (
//             <div className="col footerItem" style={{borderColor : selectedItem==v?.name ? "black": "transparent", opacity:selectedItem==v?.name  ? "0.8":"0.6"}}>
//               <img src={v?.image} />
//               <p>{v?.name}</p>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default FooterNav;

"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

function FooterNav({ selectedItem }) {
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const footerMenuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuOpen &&
        footerMenuRef.current &&
        !footerMenuRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const navItem = [
    {
      name: "Home",
      link: "/",
      image: "https://cdn-icons-png.flaticon.com/128/1946/1946436.png",
    },
    {
      name: "Shop",
      link: "/shop",
      image: "https://cdn-icons-png.flaticon.com/128/151/151773.png",
    },
    {
      name: "Menu",
      link: "",
      image: "https://cdn-icons-png.flaticon.com/128/2976/2976215.png",
    },
    {
      name: "Me",
      link: "/profile",
      image: "https://cdn-icons-png.flaticon.com/128/1077/1077114.png",
    },
  ];
  return (
    <div className="footerNav d-md-none d-block ">
      <div className="row">
        {navItem?.map((v, i) => {
          return (
            <div
              className="col footerItem"
              onClick={() => {
                if (v.name == "Menu") {
                  setMenuOpen(!menuOpen);
                } else {
                  router.push(v.link);
                }
              }}
              style={{
                borderColor: selectedItem == v?.name ? "black" : "transparent",
                opacity: selectedItem == v?.name ? "0.8" : "0.6",
              }}
            >
              <img src={v?.image} />
              <p>{v?.name}</p>
            </div>
          );
        })}
      </div>

      {/* Mobile Bottom Slide-Up Menu */}
      {menuOpen && (
        <div
          ref={footerMenuRef}
          className={`mobile-bottom-menu d-md-none position-fixed bottom-0 start-0 w-100   p-3`}
          style={{
            zIndex: 1000,
            animation: "slideUp 1s ease",
            marginBottom: "55px",
            backgroundColor: "#f6f6f6",
          }}
        >
          <ul className={`navLinks list-unstyled mb-0 text-center`}>
            {/* <li className={pathname === "/" ? "active-link" : ""}>
            <Link href="/">Home</Link>
          </li> */}
            {/* <li className={pathname === "/shop" ? "active-link" : ""}>
              <Link href="/shop">Shop</Link>
            </li> */}
            <li className={pathname === "/combo-products" ? "active-link" : ""}>
              <Link href="/combo-products">Combo Packs</Link>
            </li>
            <li className={pathname === "/bulk-order" ? "active-link" : ""}>
              <Link href="/bulk-order">Bulk Order</Link>
            </li>
            <li className={pathname === "/about-us" ? "active-link" : ""}>
              <Link href="/about-us">About</Link>
            </li>
            <li className={pathname === "/blogs" ? "active-link" : ""}>
              <Link href="/blogs">Blogs</Link>
            </li>
            <li className={pathname === "/contact" ? "active-link" : ""}>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default FooterNav;
