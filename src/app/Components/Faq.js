"use client";
import React, { useEffect, useRef, useState } from "react";
import { getFaqListServ } from "../services/faq.service";
import { useRouter } from "next/navigation";
import moment from "moment";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function Faq() {
  const router = useRouter();
  const [list, setList] = useState([]);
  const getFaqListFunc = async () => {
    let response = await getFaqListServ();
    if (response?.data?.statusCode == "200") {
      setList(response?.data?.data);
    }
  };
  useEffect(() => {
    getFaqListFunc();
  }, []);
  var settings = {
    dots: true,
    arrows: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="py-md-5 py-4 " >
      <div className="container">
        <div className="d-flex align-items-center mb-4" style={{opacity:"0.7"}}>
          <img
            src="https://cdn-icons-png.flaticon.com/128/1660/1660165.png"
            style={{ height: "40px" }}
          />
          <h2 className="ms-2" style={{ fontFamily: "poppins" }}>
           <u>Commanlly Asked Questions</u> 
          </h2>
        </div>
        <div className="row mb-4">
           <Slider {...settings}>
            {list?.map((v, i) => {
            return (
              <div className="col-md-3 col-12 " key={i}>
                <div
                  className="aboutMissionCard px-3 border shadow-sm mb-2 blogCard mx-md-2 mx-0 d-flex justify-content-center align-items-center"
                  style={{ background: "whitesmoke", height: "300px" }}
                >
                  <div>
                    <h4 className="mb-2" >
                      {v?.question}
                    </h4>
                    <hr />
                    <p style={{ textAlign: "left" }}>{v?.answer} </p>
                  </div>
                </div>
              </div>
            );
          })}
           </Slider>
          
        </div>
      </div>
    </div>
  );
}

export default Faq;
