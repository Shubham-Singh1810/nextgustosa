// "use client";

// import React, { useState, useMemo, useEffect } from "react";
// import Navbar from "@/app/Components/Navbar";
// import PriceFilter from "@/app/Components/PriceFilter";
// import ProductCard from "../Components/ProductCard";
// import { getProductServ, getCategory } from "../services/product.service";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";
// import Footer from "../Components/Footer";
// import FooterNav from "../Components/FooterNav";

// const Page = () => {
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortOption, setSortOption] = useState("featured");
//   const [showCount, setShowCount] = useState(10);
//   const [showMobileFilter, setShowMobileFilter] = useState(false);
//   const [products, setProductList] = useState([]);
//   const [showLoader, setShowLoader] = useState(false);
//   const [priceRange, setPriceRange] = useState([0, 500]);

//   const [payload, setPayload] = useState({ pageCount: 100, pageNo: 1 });
//   const [statics, setStatics] = useState({ totalCount: 0 });

//   const getProductList = async () => {
//     setShowLoader(true);

//     try {
//       const response = await getProductServ({
//         pageCount: payload.pageCount,
//         pageNo: payload.pageNo,
//       });
//       // console.table(response?.data);
//       console.log("All products:", [...response?.data]);
//       // if (response?.statusCode == "200") {
//       setProductList(response?.data);
//       if (response?.documentCount?.totalCount) {
//         const pages = Math.ceil(
//           response.documentCount.totalCount / payload.pageCount
//         );
//         setTotalPages(pages);
//         setStatics(response.documentCount);
//       }
//       // }
//     } catch (error) {}
//     setShowLoader(false);
//   };

//   const [showLoaderCategory, setShowLoaderCategory] = useState(false);
//   const [categories, setCategoryList] = useState([]);
//   const getCategoryList = async () => {
//     setShowLoaderCategory(true);
//     try {
//       let response = await getCategory();
//       console.log(response?.data);
//       if (response?.statusCode == "200") {
//         const allCategory = { name: "All" };
//         const categoryWithAll = [allCategory, ...response.data];

//         setCategoryList(categoryWithAll);
//         // setCategoryList(response?.data);
//       }
//     } catch (error) {
//       console.log("error in getting category" + error);
//     }
//     setShowLoaderCategory(false);
//   };

//   useEffect(() => {
//     getCategoryList();
//   }, []);

//   useEffect(() => {
//     getProductList();
//   }, [payload]);

//   // handle categoryChange

//   const handleCategoryChange = (catName) => {
//     if (catName === "All") {
//       setSelectedCategories([]);
//     } else {
//       setSelectedCategories((prev) => {
//         if (prev.includes(catName)) {
//           return prev.filter((name) => name !== catName);
//         } else {
//           return [...prev, catName];
//         }
//       });
//     }
//   };

//   // Filtered and sorted products using useMemo for performance
//   const filteredProducts = useMemo(() => {
//     let filtered = products;
//     console.log("filtered product" + filtered);

//     if (selectedCategories.length > 0) {
//       filtered = filtered.filter((p) =>
//         p.categoryId?.some((cat) => selectedCategories.includes(cat.name))
//       );
//     }

//     console.log("select category" + selectedCategories);
//     console.log("filtered product" + filtered);

//     // Filter by search term
//     if (searchTerm.trim()) {
//       filtered = filtered.filter((p) =>
//         p.name.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     // Sort products
//     switch (sortOption) {
//       case "high to low":
//         filtered = filtered
//           .slice()
//           .sort((a, b) => b.discountedPrice - a.discountedPrice);
//         break;
//       case "low to high":
//         filtered = filtered
//           .slice()
//           .sort((a, b) => a.discountedPrice - b.discountedPrice);
//         break;
//       case "release date":
//         break;
//       case "avg. rating":
//         break;
//       case "featured":
//       default:
//         break;
//     }

//     // price filtering
//     if (priceRange.length === 2) {
//       filtered = filtered.filter(
//         (p) =>
//           p.discountedPrice >= priceRange[0] &&
//           p.discountedPrice <= priceRange[1]
//       );
//     }

//     // return filtered.slice(0, showCount);
//     return filtered;
//   }, [
//     selectedCategories,
//     searchTerm,
//     sortOption,
//     showCount,
//     products,
//     categories,
//     priceRange,
//   ]);

//   // pagination

//   const [totalPages, setTotalPages] = useState(1);

//   useEffect(() => {
//     if (statics?.totalCount && payload.pageCount) {
//       const pages = Math.ceil(statics.totalCount / payload.pageCount);
//       setTotalPages(pages);
//     }
//   }, [statics, payload.pageCount]);

//   const handlePageChange = (newPage) => {
//     if (newPage >= 1 && newPage <= totalPages) {
//       setPayload({ ...payload, pageNo: newPage });
//     }
//   };

//   return (
//     <>
//       <Navbar selectedItem="Shop" />
//       <div className="shop-page">
//         <div className="shop-sections d-flex flex-lg-nowrap flex-wrap">
//           {/* MOBILE: Filter Toggle Button */}
//           {/* <div className="d-lg-none mb-3  d-flex" style={{justifySelf:"self-start"}}>
//            <button
//   className="btn d-flex align-items-center gap-2 px-3 py-2 border rounded-3 shadow-sm bg-white text-dark hover-effect"
//   onClick={() => setShowMobileFilter(true)}
// >
//   <img
//     src="https://cdn-icons-png.flaticon.com/128/4502/4502383.png"
//     alt="filter icon"
//     style={{ width: "20px", height: "20px" }}
//   />
//   <span className="fw-semibold">Filters</span>
// </button>

//           </div> */}
//           {/* DESKTOP: Sidebar Filter */}
//           <div className="category-section d-none d-md-block">
//             <h5>Categories</h5>
//             <div className="all-category mb-5">
//               {showLoaderCategory
//                 ? [1, 2, 3, 4, 5, 6, 7, 8]?.map((v, i) => {
//                     return (
//                       <div>
//                         <div className="d-flex align-items-center px-2  text-light mb-1 shadow-sm rounded border">
//                           {/* <Skeleton height={40} width={40}/> */}
//                           <div className="m-1 w-100">
//                             <Skeleton width="100%" height={40} />
//                             {/* <Skeleton width="100%" height={18}/> */}
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })
//                 : categories.map((cat) => {
//                     const isAll = cat.name === "All";
//                     const isSelected = isAll
//                       ? selectedCategories.length === 0
//                       : selectedCategories.includes(cat.name);

//                     return (
//                       <div
//                         key={cat._id || cat.name}
//                         className="category d-flex gap-2 align-items-center"
//                         style={{
//                           cursor: "pointer",
//                           backgroundColor: isAll && isSelected ? "#3d9970" : "transparent",
//                           color: isAll && isSelected? "white": isSelected? "#3d9970" : "black",
//                           padding: "8px 12px",
//                           borderRadius: "6px",
//                           transition:
//                             "background-color 0.3s ease, color 0.3s ease",
//                           userSelect: "none",
//                         }}
//                         onClick={() => handleCategoryChange(cat.name)}
//                       >
//                         {!isAll && (
//                           <input
//                             type="checkbox"
//                             checked={isSelected}
//                             onChange={() => handleCategoryChange(cat.name)}
//                             onClick={(e) => e.stopPropagation()}
//                               style={{
//         width: "18px",
//         height: "18px",
//         accentColor: "#479d78",
//         cursor: "pointer",
//       }}
//                           />
//                         )}
//                         <p className="mb-0">{cat.name}</p>
//                       </div>
//                     );
//                   })}
//             </div>

//             <PriceFilter values={priceRange} setValues={setPriceRange} />
//           </div>

//           <div className="item-section">
//             {/* product search bar */}
//             <div className="d-flex gap-2 mb-3 flex-sm-nowrap flex-wrap">
//               <input
//                 className="product-search"
//                 placeholder="Search for products"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />

//               <div className="d-flex gap-2 w-md-auto sortSelectDiv">
//                 {/* <select  className="form-select form-select-sm  w-auto "
//                 value={showCount}
//                 onChange={(e) => setShowCount(Number(e.target.value))} >
//                 <option value={10}>Show: 10</option>
//                 <option value={20}>20</option>
//                 <option value={50}>50</option>
//               </select> */}

//                 <select
//                   className="form-select form-select-sm  text-center sortSelect border rounded-3 shadow-sm bg-white text-dark "
//                   value={sortOption}
//                   onChange={(e) => setSortOption(e.target.value)}
//                 >
//                   <option value="">Sort </option>
//                   <option value="high to low">Price: High to Low</option>
//                   <option value="low to high">Price: Low to High</option>
//                   <option value="release date">Release Date</option>
//                   <option value="avg. rating">Avg. Rating</option>
//                 </select>

//                 <div className="d-lg-none w-100">
//                   <button
//                     className="btn d-flex align-items-center justify-content-center gap-2 px-3 py-2 border rounded-3 shadow-sm bg-white text-dark w-100 h-100"
//                     onClick={() => setShowMobileFilter(true)}
//                   >
//                     <span className="fw-semibold w-100">Filters</span>
//                     <div className="d-flex justify-content-end w-100">
//                       <img
//                         src="https://cdn-icons-png.flaticon.com/128/4502/4502383.png"
//                         alt="filter icon"
//                         style={{ width: "17px", height: "17px" }}
//                       />
//                     </div>
//                   </button>
//                 </div>
//               </div>
//             </div>

//             <p className="product-quantity d-flex gap-2">
//               {filteredProducts.length}{" "}
//               <span className="quantity-p">Products found</span>
//               <h6 className=" text-danger">{selectedCategories.join(", ")}</h6>
//             </p>

//             {/* product card */}

//             <div className="row my-sm-4 my-2 gx-lg-4 gx-sm-3 gx-2">
//               {showLoader
//                 ? [1, 2, 3, 4, 5, 6]?.map((v, i) => {
//                     return (
//                       <div className="col-md-4 col-6 mb-2  mb-md-3  ">
//                         <div className="productCard shadow-sm border ">
//                           <div className="d-flex justify-content-between align-items-center heartIcon pe-2">
//                             <h6 className="badge border text-dark m-2">
//                               <Skeleton height={20} width={100} />
//                             </h6>
//                             <Skeleton height={20} width={20} />
//                           </div>

//                           <div className="w-100">
//                             <Skeleton height={180} width="100%" />
//                           </div>

//                           <div className="p-2">
//                             <h4>
//                               <Skeleton />
//                             </h4>
//                             <p>
//                               <Skeleton />
//                             </p>

//                             <div className="w-100 ">
//                               <Skeleton height={30} width="100%" />
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })
//                 : filteredProducts.map((v, i) => (
//                     <div className="col-lg-3 col-md-4 col-6 mb-md-3 mb-2">
//                       <ProductCard value={v} />
//                     </div>
//                   ))}
//             </div>

//             {/* pagination  start  .. */}
//             <div className="d-flex flex-column flex-md-row justify-content-end align-items-center gap-5 px-3 py-3 mt-4">
//               <div className="d-flex align-items-center gap-2">
//                 <span className="fw-semibold text-secondary">Show</span>
//                 <select
//                   className="form-select form-select-sm custom-select"
//                   value={payload.pageCount}
//                   onChange={(e) =>
//                     setPayload({
//                       ...payload,
//                       pageCount: parseInt(e.target.value),
//                       pageNo: 1,
//                     })
//                   }
//                 >
//                   {[10, 25, 50, 100].map((v) => (
//                     <option key={v} value={v}>
//                       {v}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <nav>
//                 <ul className="pagination pagination-sm mb-0 custom-pagination">
//                   <li
//                     className={`page-item ${
//                       payload.pageNo === 1 ? "disabled" : ""
//                     }`}
//                   >
//                     <button
//                       className="page-link"
//                       onClick={() => handlePageChange(payload.pageNo - 1)}
//                     >
//                       &lt;
//                     </button>
//                   </li>

//                   {[...Array(totalPages)].map((_, i) => {
//                     const page = i + 1;
//                     if (
//                       page === 1 ||
//                       page === totalPages ||
//                       (page >= payload.pageNo - 1 && page <= payload.pageNo + 1)
//                     ) {
//                       return (
//                         <li
//                           key={page}
//                           className={`page-item ${
//                             payload.pageNo === page ? "active" : ""
//                           }`}
//                         >
//                           <button
//                             className="page-link"
//                             onClick={() => handlePageChange(page)}
//                           >
//                             {page}
//                           </button>
//                         </li>
//                       );
//                     } else if (
//                       (page === payload.pageNo - 2 && page > 2) ||
//                       (page === payload.pageNo + 2 && page < totalPages - 1)
//                     ) {
//                       return (
//                         <li key={page} className="page-item disabled">
//                           <span className="page-link">...</span>
//                         </li>
//                       );
//                     }
//                     return null;
//                   })}

//                   <li
//                     className={`page-item ${
//                       payload.pageNo === totalPages ? "disabled" : ""
//                     }`}
//                   >
//                     <button
//                       className="page-link"
//                       onClick={() => handlePageChange(payload.pageNo + 1)}
//                     >
//                       &gt;
//                     </button>
//                   </li>
//                 </ul>
//               </nav>
//             </div>
//             {/* pagination end ... */}
//           </div>
//         </div>
//       </div>
//       {/* MOBILE FILTER DRAWER */}
//       {showMobileFilter && (
//         <div
//           className="mobile-filter-drawer"
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             height: "100vh",
//             width: "80%",
//             maxWidth: "300px",
//             backgroundColor: "#fff",
//             boxShadow: "-2px 0 8px rgba(0,0,0,0.3)",
//             zIndex: 9999,
//             padding: "20px",
//             overflowY: "auto",
//           }}
//         >
//           <div className="d-flex justify-content-between align-items-center mb-3">
//             <h5 className="mb-0">Filter</h5>
//             <button
//               className="btn btn-outline-secondary btn-sm"
//               onClick={() => setShowMobileFilter(false)}
//             >
//               Close
//             </button>
//           </div>
//           <h4>Category</h4>

//           {categories.map((cat) => (
//             <div
//               key={cat._id}
//               className={`category d-flex justify-content-between ${
//                 selectedCategories === cat ? "selected-category" : ""
//               }`}
//               onClick={() => {
//                 setselectedCategories(cat.name);
//                 setShowMobileFilter(false); // Close on selection
//               }}
//               style={{
//                 cursor: "pointer",
//                 backgroundColor:
//                   selectedCategories === cat.name ? "#6d0d0c" : "transparent",
//                 color: selectedCategories === cat.name ? "white" : "black",
//                 padding: "8px 12px",
//                 borderRadius: "6px",
//                 transition: "background-color 0.3s ease, color 0.3s ease",
//                 userSelect: "none",
//               }}
//             >
//               <p className="mb-0">{cat.name}</p>
//               <img
//                 src="https://cdn-icons-png.flaticon.com/128/130/130884.png"
//                 alt="arrow icon"
//                 style={{
//                   filter:
//                     selectedCategories === cat.name ? "invert(1)" : "none",
//                   transition: "filter 0.3s ease",
//                 }}
//               />
//             </div>
//           ))}

//           <hr className="my-3" />
//           <PriceFilter values={priceRange} setValues={setPriceRange} />
//         </div>
//       )}

//       <FooterNav selectedItem="Shop" />
//       <Footer />
//     </>
//   );
// };

// export default Page;

"use client";

import React, { useState, useMemo, useEffect } from "react";
import Navbar from "@/app/Components/Navbar";
import PriceFilter from "@/app/Components/PriceFilter";
import ProductCard from "../Components/ProductCard";
import { getProductServ, getCategory } from "../services/product.service";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Footer from "../Components/Footer";
import FooterNav from "../Components/FooterNav";

const Page = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("featured");
  const [showCount, setShowCount] = useState(10);
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [products, setProductList] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [statics, setStatics] = useState({ totalCount: 0 });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [totalPages, setTotalPages] = useState(1);

  const getProductList = async () => {
    setShowLoader(true);

    try {
      const response = await getProductServ({
        pageCount: 100,
        pageNo: 1,
      });

      // if (response?.statusCode == "200") {
      console.log("All products:", [...response?.data]);
      setProductList(response?.data);
      // }
    } catch (error) {}
    setShowLoader(false);
  };

  const [showLoaderCategory, setShowLoaderCategory] = useState(false);
  const [categories, setCategoryList] = useState([]);
  const getCategoryList = async () => {
    setShowLoaderCategory(true);
    try {
      let response = await getCategory();
      console.log(response?.data);
      if (response?.statusCode == "200") {
        const allCategory = { name: "All" };
        const categoryWithAll = [allCategory, ...response.data];

        setCategoryList(categoryWithAll);
        // setCategoryList(response?.data);
      }
    } catch (error) {
      console.log("error in getting category" + error);
    }
    setShowLoaderCategory(false);
  };

  useEffect(() => {
    getCategoryList();
  }, []);

  useEffect(() => {
    getProductList();
  }, []);

  // handle categoryChange

  const handleCategoryChange = (catName) => {
    if (catName === "All") {
      setSelectedCategories([]);
    } else {
      setSelectedCategories((prev) => {
        if (prev.includes(catName)) {
          return prev.filter((name) => name !== catName);
        } else {
          return [...prev, catName];
        }
      });
    }
  };

  // Filtered and sorted products using useMemo for performance
  const filteredProducts = useMemo(() => {
    let filtered = products;
    console.log("filtered product" + filtered);

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) =>
        p.categoryId?.some((cat) => selectedCategories.includes(cat.name))
      );
    }

    console.log("select category" + selectedCategories);
    console.log("filtered product" + filtered);

    // Filter by search term
    if (searchTerm.trim()) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort products
    switch (sortOption) {
      case "high to low":
        filtered = filtered
          .slice()
          .sort((a, b) => b.discountedPrice - a.discountedPrice);
        break;
      case "low to high":
        filtered = filtered
          .slice()
          .sort((a, b) => a.discountedPrice - b.discountedPrice);
        break;
      case "release date":
        break;
      case "avg. rating":
        break;
      case "featured":
      default:
        break;
    }

    // price filtering
    if (priceRange.length === 2) {
      filtered = filtered.filter(
        (p) =>
          p.discountedPrice >= priceRange[0] &&
          p.discountedPrice <= priceRange[1]
      );
    }

    // return filtered.slice(0, showCount);
    return filtered;
  }, [
    selectedCategories,
    searchTerm,
    sortOption,
    showCount,
    products,
    categories,
    priceRange,
  ]);

  // pagination

  

  useEffect(() => {
    setTotalPages(Math.ceil(filteredProducts.length / itemsPerPage));
  }, [filteredProducts, itemsPerPage]);

  const paginatedProducts = useMemo(() => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    return filteredProducts.slice(startIdx, endIdx);
  }, [filteredProducts, currentPage, itemsPerPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <>
      <Navbar selectedItem="Shop" />
      <div className="shop-page">
        <div className="shop-sections d-flex flex-lg-nowrap flex-wrap">
          {/* DESKTOP: Sidebar Filter */}
          <div className="category-section d-none d-md-block">
            <h5>Categories</h5>
            <div className="all-category mb-5">
              {showLoaderCategory
                ? [1, 2, 3, 4, 5, 6, 7, 8]?.map((v, i) => {
                    return (
                      <div>
                        <div className="d-flex align-items-center px-2  text-light mb-1 shadow-sm rounded border">
                          {/* <Skeleton height={40} width={40}/> */}
                          <div className="m-1 w-100">
                            <Skeleton width="100%" height={40} />
                            {/* <Skeleton width="100%" height={18}/> */}
                          </div>
                        </div>
                      </div>
                    );
                  })
                : categories.map((cat) => {
                    const isAll = cat.name === "All";
                    const isSelected = isAll
                      ? selectedCategories.length === 0
                      : selectedCategories.includes(cat.name);

                    return (
                      <div
                        key={cat._id || cat.name}
                        className="category d-flex gap-2 align-items-center"
                        style={{
                          cursor: "pointer",
                          backgroundColor:
                            isAll && isSelected ? "#3d9970" : "transparent",
                          color:
                            isAll && isSelected
                              ? "white"
                              : isSelected
                              ? "#3d9970"
                              : "black",
                          padding: "8px 12px",
                          borderRadius: "6px",
                          transition:
                            "background-color 0.3s ease, color 0.3s ease",
                          userSelect: "none",
                        }}
                        onClick={() => handleCategoryChange(cat.name)}
                      >
                        {!isAll && (
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleCategoryChange(cat.name)}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                              width: "18px",
                              height: "18px",
                              accentColor: "#479d78",
                              cursor: "pointer",
                            }}
                          />
                        )}
                        <p className="mb-0">{cat.name}</p>
                      </div>
                    );
                  })}
            </div>

            <PriceFilter values={priceRange} setValues={setPriceRange} />
          </div>

          <div className="item-section">
            {/* product search bar */}
            <div className="d-flex gap-2 mb-3 flex-sm-nowrap flex-wrap">
              <input
                className="product-search"
                placeholder="Search for products"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <div className="d-flex gap-2 w-md-auto sortSelectDiv">
                <select
                  className="form-select form-select-sm  text-center sortSelect border rounded-3 shadow-sm bg-white text-dark "
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="">Sort </option>
                  <option value="high to low">Price: High to Low</option>
                  <option value="low to high">Price: Low to High</option>
                  <option value="release date">Release Date</option>
                  <option value="avg. rating">Avg. Rating</option>
                </select>

                <div className="d-lg-none w-100">
                  <button
                    className="btn d-flex align-items-center justify-content-center gap-2 px-3 py-2 border rounded-3 shadow-sm bg-white text-dark w-100 h-100"
                    onClick={() => setShowMobileFilter(true)}
                  >
                    <span className="fw-semibold w-100">Filters</span>
                    <div className="d-flex justify-content-end w-100">
                      <img
                        src="https://cdn-icons-png.flaticon.com/128/4502/4502383.png"
                        alt="filter icon"
                        style={{ width: "17px", height: "17px" }}
                      />
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <p className="product-quantity d-flex gap-2">
              {filteredProducts.length}{" "}
              <span className="quantity-p">Products found</span>
              <h6 className=" text-danger">{selectedCategories.join(", ")}</h6>
            </p>

            {/* product card */}

            <div className="row my-sm-4 my-2 gx-lg-3 gx-sm-3 gx-2">
              {showLoader
                ? [1, 2, 3, 4, 5, 6]?.map((v, i) => {
                    return (
                      <div className="col-md-4 col-6 mb-2  mb-md-3  ">
                        <div className="productCard shadow-sm border ">
                          <div className="d-flex justify-content-between align-items-center heartIcon pe-2">
                            <h6 className="badge border text-dark m-2">
                              <Skeleton height={20} width={100} />
                            </h6>
                            <Skeleton height={20} width={20} />
                          </div>

                          <div className="w-100">
                            <Skeleton height={180} width="100%" />
                          </div>

                          <div className="p-2">
                            <h4>
                              <Skeleton />
                            </h4>
                            <p>
                              <Skeleton />
                            </p>

                            <div className="w-100 ">
                              <Skeleton height={30} width="100%" />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                : paginatedProducts.map((v, i) => (
                    <div className="col-lg-3 col-md-4 col-6 mb-md-3 mb-2">
                      <ProductCard value={v} />
                    </div>
                  ))}
            </div>

            {/* pagination  start  .. */}
            <div className="d-flex flex-column flex-md-row justify-content-end align-items-center gap-5 px-3 py-3 mt-4">
              <div className="d-flex align-items-center gap-2">
                <span className="fw-semibold text-secondary">Show</span>
                <select
                  className="form-select form-select-sm custom-select"
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(parseInt(e.target.value));
                    setCurrentPage(1);
                  }}
                >
                  {[12, 25, 50, 100].map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>

              <nav>
                <ul className="pagination pagination-sm mb-0 custom-pagination">
                  <li
                    className={`page-item ${
                      currentPage === 1 ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(currentPage - 1)}
                    >
                      &lt;
                    </button>
                  </li>

                  {[...Array(totalPages)].map((_, i) => {
                    const page = i + 1;
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <li
                          key={page}
                          className={`page-item ${
                            currentPage === page ? "active" : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() => handlePageChange(page)}
                          >
                            {page}
                          </button>
                        </li>
                      );
                    } else if (
                      (page === currentPage - 2 && page > 2) ||
                      (page === currentPage + 2 && page < totalPages - 1)
                    ) {
                      return (
                        <li key={page} className="page-item disabled">
                          <span className="page-link">...</span>
                        </li>
                      );
                    }
                    return null;
                  })}

                  <li
                    className={`page-item ${
                      currentPage === totalPages ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(currentPage + 1)}
                    >
                      &gt;
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
            {/* pagination end ... */}
          </div>
        </div>
      </div>
      {/* MOBILE FILTER DRAWER */}
      {showMobileFilter && (
        <div
          className="mobile-filter-drawer"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            height: "100vh",
            width: "80%",
            maxWidth: "300px",
            backgroundColor: "#fff",
            boxShadow: "-2px 0 8px rgba(0,0,0,0.3)",
            zIndex: 9999,
            padding: "20px",
            overflowY: "auto",
          }}
        >
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0">Filter</h5>
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => setShowMobileFilter(false)}
            >
              Close
            </button>
          </div>
          <h4>Category</h4>

         {categories.map((cat) => {
                    const isAll = cat.name === "All";
                    const isSelected = isAll
                      ? selectedCategories.length === 0
                      : selectedCategories.includes(cat.name);

                    return (
                      <div
                        key={cat._id || cat.name}
                        className="category d-flex gap-2 align-items-center"
                        style={{
                          cursor: "pointer",
                          backgroundColor:
                            isAll && isSelected ? "#3d9970" : "transparent",
                          color:
                            isAll && isSelected
                              ? "white"
                              : isSelected
                              ? "#3d9970"
                              : "black",
                          padding: "8px 12px",
                          borderRadius: "6px",
                          transition:
                            "background-color 0.3s ease, color 0.3s ease",
                          userSelect: "none",
                        }}
                        onClick={() => handleCategoryChange(cat.name)}
                      >
                        {!isAll && (
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleCategoryChange(cat.name)}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                              width: "18px",
                              height: "18px",
                              accentColor: "#479d78",
                              cursor: "pointer",
                            }}
                          />
                        )}
                        <p className="mb-0">{cat.name}</p>
                      </div>
                    );
                  })}

          <hr className="my-3" />
          <PriceFilter values={priceRange} setValues={setPriceRange} />
        </div>
      )}

      <FooterNav selectedItem="Shop" />
      <Footer />
    </>
  );
};

export default Page;
