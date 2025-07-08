


"use client"

import { useEffect, useState } from "react";
import React from "react";
import { getProductServ } from "../services/product.service";

const ShopFromFarm = () => {


      const [products, setProducts] = useState([]);
    
        useEffect(() => {
          const fetchProducts = async () => {
            try {
              const response = await getProductServ();
              console.log(response.data);
              setProducts(response.data || []);
            } catch (error) {
              console.error("Error loading products:", error);
            }
          };
      
          fetchProducts();
        }, []);


  return (


    <div className="from-farm d-flex flex-column align-items-center">
      <h2 className="farm-h">Our Shop</h2>
      <h1>From our Farm</h1>

      <div
        className="Farm-Products d-flex flex-wrap justify-content-center gap-4"
        
      >
        {products.slice(0, 8).map((product) => (
          <div
            key={product.id}
            className="product-card2 d-flex flex-column justify-content-between"
           
          >
            <div>
              <img
                src={product.productHeroImage}
                className="product-img"
                alt={product.description}
              />
              <p className="product-descrip mb-2">{product.name}</p>
              <div className="wishlist-icon">
                <img src="https://cdn-icons-png.flaticon.com/128/6051/6051092.png" />
              </div>
            </div>
            <div>
              <div className="price d-flex gap-1">
                <p className="price1">₹{product.price}</p>
                <p className="price2">₹{product.offerPrice}</p>
              </div>
              <button className="add-to-cart">Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopFromFarm;
