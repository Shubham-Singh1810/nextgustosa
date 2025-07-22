import React from "react";
import ProductCard from "./ProductCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ProductSlider({title, subTitle, productList, textAlignCenter}) {
 var settings = {
    arrows: true,
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 3,
     responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
            dots: false,
             arrows: false,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
            dots: false,
             arrows: false,
        }
      }
    ]
  };
  return (
    <div className="container py-3 py-md-5 productSliderDiv">
      <h1 className={textAlignCenter  ? " text-center" :" "}>{title}</h1>
      <h5 className={textAlignCenter  ? " text-center" :" "}>{subTitle}</h5>
      <div className="row py-3">
        <Slider {...settings}>
          {productList?.map((v, i) => {
          return (
            <div className="col-6  col-lg-3 col-md-4 px-1 px-md-2 mb-4 mb-md-3 ">
              <ProductCard value={v}/>
            </div>
          );
        })}
        </Slider>
          
        
      </div>
       
    </div>
  );
}

export default ProductSlider;


// import React, { useEffect, useState } from "react";
// import ProductCard from "./ProductCard";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// function ProductSlider({ title, subTitle, productList, textAlignCenter }) {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [slidesToShow, setSlidesToShow] = useState(4);
//   const totalSlides = productList?.length || 0;

//   // ✅ Update slidesToShow based on screen width
//   useEffect(() => {
//     const updateSlidesToShow = () => {
//       const width = window.innerWidth;
//       if (width < 480) {
//         setSlidesToShow(2);
//       } else if (width < 768) {
//         setSlidesToShow(2);
//       } else if (width < 1024) {
//         setSlidesToShow(3);
//       } else {
//         setSlidesToShow(4);
//       }
//     };

//     updateSlidesToShow();
//     window.addEventListener("resize", updateSlidesToShow);
//     return () => window.removeEventListener("resize", updateSlidesToShow);
//   }, []);

//   // ✅ Custom 5-dot mapper
//   const mapToFiveDots = (index) => {
//     const lastIndex = totalSlides - slidesToShow;

//     if (totalSlides <= slidesToShow) return 0;

//     if (index === 0) return 0;
//     if (index === 1) return 1;
//     if (index >= lastIndex) return 4;
//     if (index === lastIndex - 1) return 3;
//     return 2;
//   };

//   const settings = {
//     arrows: true,
//     dots: true,
//     infinite: false,
//     speed: 1000,
//     slidesToShow,
//     slidesToScroll: 3,
//     beforeChange: (_, next) => setCurrentSlide(next),

//     customPaging: (i) => {
//       const activeDot = mapToFiveDots(currentSlide);
//       return (
//         <div
//           style={{
//             width: "8px",
//             height: "8px",
//             borderRadius: "50%",
//             background: i === activeDot ? "black" : "#ccc",
//             margin: "0 4px",
//           }}
//         ></div>
//       );
//     },

//     appendDots: (dots) => (
//       <div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
//         {dots.slice(0, 5)}
//       </div>
//     ),

//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 3,
//         },
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 2,
//         },
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 2,
//         },
//       },
//     ],
//   };

//   return (
//     <div className="container py-3 py-md-5 productSliderDiv">
//       <h1 className={textAlignCenter ? " text-center" : ""}>{title}</h1>
//       <h5 className={textAlignCenter ? " text-center" : ""}>{subTitle}</h5>
//       <div className="row py-3 gx-0">
//         <Slider {...settings}>
//           {productList?.map((v, i) => (
//             <div key={i} className="col-6 col-lg-3 col-md-4 px-1 px-md-2 mb-4 mb-md-3">
//               <ProductCard value={v} />
//             </div>
//           ))}
//         </Slider>
//       </div>
//     </div>
//   );
// }

// export default ProductSlider;
