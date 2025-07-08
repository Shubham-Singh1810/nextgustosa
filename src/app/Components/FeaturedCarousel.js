import React from "react";
import ProductCard from "./ProductCard";

function FeaturedCarousel({ categorylist }) {
  return (
    <div style={{ background: "whitesmoke" }}>
      <div className="container py-md-5 py-3 productSliderDiv">
        <h1 className="text-center text-secondary">Featured Categories</h1>
        {/* <h5>Featured Categories</h5> */}
        <div className="row py-3">
          {categorylist?.map((v, i) => {
            return (
              <div className="col-4 col-md-3 col-lg-2">
                <div className="categoryCard text-center">
                  <img src={v?.image} />
                  <p>{v?.name}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default FeaturedCarousel;
