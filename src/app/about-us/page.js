"use client";

import React, { useRef, useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import HeroSection from "../Components/HeroSection";
import { getBanners } from "../services/banner.service";
import FooterNav from "../Components/FooterNav";
const page = () => {
  const infoArr = [
    {
      img: " https://cdn-icons-png.flaticon.com/128/11495/11495248.png",
      title: "Who we are",
      subtitle: [
        "We are passionate and innovative makhana brand dedicated to providing delicious and nutritious snacking options. We pride ourselves on offering a diverse range of raw and roasted flavored makhana snacks that cater to various tastes and preferences.",
      ],
    },
    {
      img: "https://cdn-icons-png.flaticon.com/128/33/33308.png",
      title: "Our Vision",
      subtitle: [
        "To spark a hygiene revolution across India—making every home, car, and workspace fresher, safer, and smarter.",
        "We’re building more than just a brand; we’re creating a movement powered by innovation, sustainability, and local pride.",
      ],
    },
    {
      img: " https://cdn-icons-png.flaticon.com/128/2006/2006789.png",
      title: "Our Mission",
      subtitle: [
        "To empower everyday hygiene with smart, affordable, and high-performance solutions that people trust.",
        "Through continuous innovation, eco-conscious choices, and a strong community-first approach,",
        "we aim to make hygiene not just a routine—but a way of life.",
      ],
    },
  ];

  const certifications = [
    {
      title: "ISO 9001:2015",
      description:
        "Assurance of a robust quality management system—yielding consistent products, optimized processes, and continuous improvement.",
    },
    {
      title: "IndiaMART Trust Seal",
      description:
        "Verified supplier credentials that ensure secure and trustworthy transactions.",
    },
    {
      title: "GeM Registered",
      description:
        "Authorized to seamlessly serve government and public-sector clients via the e-Marketplace.",
    },
    {
      title: "MSME Registered",
      description:
        "Recognition as a micro/small enterprise—making us eligible for government benefits and support.",
    },
  ];

  const [slides, setSlides] = useState([]);
  const [showloader, setShowLoader] = useState(false);
  useEffect(() => {
    const fetchBanners = async () => {
      setShowLoader(true);
      try {
        const response = await getBanners();
        if (response?.data?.length > 0) {
          setSlides(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch banners", error);
      }
      setShowLoader(false);
    };

    fetchBanners();
  }, []);
    const [category, setCategory] = useState("About");

  useEffect(() => {
    const updateCategory = () => {
      setCategory(window.innerWidth < 500 ? "AboutMobile" : "About");
    };

    // Set category on load
    updateCategory();

    // Optional: update on window resize
    window.addEventListener("resize", updateCategory);
    return () => window.removeEventListener("resize", updateCategory);
  }, []);
  return (
    <>
      <Navbar selectedItem="About" />
      <HeroSection category={category} />
      <div className="container aboutMain">
        <div className="row my-md-5 my-4 mx-0 mx-md-2">
          <div className="col-md-6 mt-auto col-12 px-0 px-md-2 ">
            <h1>Discover the Story Behind Our Nutritious Makhana Brand</h1>
            <p className="pe-md-3 pe-0">
              Our journey began when our founders, inspired by their love for
              traditional Indian dishes and their desire to create healthier
              alternatives, set out to explore innovative ways to showcase the
              versatility of makhana. After countless hours spent researching,
              testing, and refining recipes, they developed a line of
              mouthwateringly delicious makhana snacks that would appeal to
              people of all ages and dietary preferences.Today, we are proudly
              recognized as a leader in the makhana industry, offering a wide
              array of raw, roasted, and flavored makhana snacks that cater to
              diverse tastes and cravings. From classic salted varieties to
              exotic combinations such as cheese, caramel, and chocolate,
              there’s something for everyone in our extensive collection. And
              because we understand the importance of maintaining high standards
              throughout the entire production process, we source only the
              finest quality ingredients and utilize sustainable practices
              whenever possible.Join us on our mission to redefine snacking and
              discover the endless possibilities offered by nature’s most
              underrated superfood – makhana! Try our delectable creations today
              and taste the difference for yourself. You won’t regret it!
            </p>
          </div>
          <div className="col-md-6  col-12 px-0 px-md-2">
            <img
              src={
                slides?.find((v) => v?.category === "About Hero Image")?.image
              }
              className="img-fluid w-100"
            />
          </div>
        </div>
        <div className="row">
          {infoArr?.map((v, i) => {
            return (
              <div className="col-md-4 col-12 px-0 px-md-2 py-md-5 py-3 mb-sm-5 mb-3 " key={i}>
                <div className="aboutMissionCard border p-md-4 p-2  shadow mb-2 h-100">
                  <img src={v?.img} className="img-fluid" />
                  <h3>{v?.title}</h3>
                  {v.subtitle.map((text, i) => (
                    <p className="mb-1" key={i}>
                      {text}
                    </p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
               

      </div>
      <FooterNav selectedItem="Menu" />
      <Footer />
    </>
  );
};

export default page;
