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
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
     responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
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
