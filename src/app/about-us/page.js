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
        "we aim to make hygiene not just a routine—but a way of life."
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
  return (
    <>
      <Navbar selectedItem="About" />
      <HeroSection category="About" />
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
              <div className="col-md-4 col-12 px-0 px-md-2 " key={i}>
                <div className="aboutMissionCard border p-md-4 p-2  shadow mb-2 h-100">
                  <img src={v?.img} className="img-fluid" />
                  <h3>{v?.title}</h3>
                  {v.subtitle.map((text, i) => (
                    <p className="mb-1" key={i}>{text}</p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
  
        {/* <div className="row my-5">
          <h3 className="mb-3 pb-2" style={{borderBottom:"2px solid red" , maxWidth:"150px"}}>About Us</h3>
          <p>Shriram Enterprises, under our trusted brand Hyzenith, is a premier manufacturer and wholesale supplier of cleaning and hygiene solutions—ranging from Household Cleaners, Auto Care, Laundry Care, Air Fresheners, to Industrial Chemicals. Based in Belagavi, Karnataka, Bharat, we have been delivering excellence since 2018. We are proudly ISO 9001:2015 certified, hold the IndiaMART Trust Seal, are a verified GeM seller, and are MSME registered.
          </p>
        </div> */}

         <div className="container py-5">
      <h2 className="text-center mb-4"> Certifications That Define Our Standard</h2>
      <div className="row g-4">
        {certifications.map((cert, idx) => (
          <div className="col-md-6" key={idx}>
            <div className="p-sm-5 p-2 shadow-sm border-0 h-100" style={{backgroundColor:"#fffafa" , borderRadius:"7px"}}>
              <div className="pb-md-5 pb-1">
                <h5 className=" fw-bold">{cert.title}</h5>
                <p className=" text-muted">{cert.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>


    <div className="container py-5">
      <h2 className="text-center mb-5"> Quality, Innovation & Capacity</h2>

      <h5 className="text-danger" >Advanced Manufacturing Facility</h5>
      <p>Located in Belagavi, our facility supports end-to-end production—from
         R&D and formulation to blending, filling, and strict quality testing.</p>
         
      <div className="row g-4">
          <h5 className="text-danger">Comprehensive Product Portfolio</h5>
          <div className="border p-3 shadow-sm mt-2" style={{borderRadius:"8px"}}>
            <p className="mb-0"><span className="fw-bold text-dark">Household Cleaners:</span> All‑purpose, kitchen, bathroom, and glass cleaners.</p>
          </div>
          <div className="border p-3 shadow-sm mt-2" style={{borderRadius:"8px"}}>
            <p  className="mb-0"><span className="fw-bold text-dark" >Auto Care:</span> Car shampoo, tire care, interior cleaning products.</p>
          </div>
           <div className="border p-3 shadow-sm mt-2" style={{borderRadius:"8px"}}>
            <p className="mb-0"><span className="fw-bold text-dark">Laundry Care:</span> Detergents, fabric softeners, stain removers.</p>
          </div>
          <div className="border p-3 shadow-sm mt-2" style={{borderRadius:"8px"}}>
            <p className="mb-0"><span className="fw-bold text-dark">Air Fresheners:</span> Sprays, gels, and diffusers.</p>
          </div>
          <div className="border p-3 shadow-sm mt-2" style={{borderRadius:"8px"}}>
            <p className="mb-0"><span className="fw-bold text-dark">Industrial Chemicals:</span> Degreasers, disinfectants, and specialty formulations.</p>
          </div>
      </div>
    </div>

    <div className="row my-5 ">
      <div className="col-md-6 col-12 p-2">
        <div className="p-3 h-100 py-5 " style={{borderRadius:"8px" ,  backgroundColor:"#f9e4e6"}}>
           <h5 className="fw-bold mb-3">Wholesale Excellence & Custom Solutions</h5>
         <p className="" style={{color:"#484646"}}>Flexible Packaging: Options from 250 ml bottles to 200 kg drums</p>
         <p  className="" style={{color:"#484646"}}>Pan‑India Reach: Reliable logistics ensure on-time delivery across Bharat</p>
         <p  className="" style={{color:"#484646"}} >Custom Formulations: Designed to meet the needs of institutions, commercial operations, and industrial clients.</p>
        </div>
      </div>

      <div className="col-md-6 col-12 p-2">
        <div className="p-3 h-100 py-5 " style={{borderRadius:"8px" , backgroundColor:"#f9e4e6"}}>
           <h5 className="fw-bold mb-3" >Sustainability & Community Commitment</h5>
         <p className="" style={{color:"#484646"}}>We prioritize biodegradable formulations and eco-friendly packaging.</p>
         <p  className="" style={{color:"#484646"}}>Rooted in Belagavi, we support local employment, vocational training, and collaboration with green vendors.
</p>
        
        </div>
      </div>

    </div>

    <div className="container py-5">
      <h2 className="text-center mb-5">Our Clients</h2>

      <h5 className="text-danger mb-4" >We proudly cater to:</h5>
  
         
      <div className="row g-4">
         
          <div className="border p-3 shadow-sm mt-2" style={{borderRadius:"8px"}}>
            <p className="mb-0"><span className="fw-bold text-dark">Distributors & retail chains</span></p>
          </div>
          <div className="border p-3 shadow-sm mt-2" style={{borderRadius:"8px"}}>
            <p  className="mb-0"><span className="fw-bold text-dark" >Hotels, restaurants, hostels</span></p>
          </div>
           <div className="border p-3 shadow-sm mt-2" style={{borderRadius:"8px"}}>
            <p className="mb-0"><span className="fw-bold text-dark">Schools, hospitals, and office complexes</span></p>
          </div>
          <div className="border p-3 shadow-sm mt-2" style={{borderRadius:"8px"}}>
            <p className="mb-0"><span className="fw-bold text-dark">AIndustrial cleaning and janitorial services</span></p>
          </div>
          <div className="border p-3 shadow-sm mt-2" style={{borderRadius:"8px"}}>
            <p className="mb-0"><span className="fw-bold text-dark">Partners trust us for certified quality, regulatory compliance, reliable supply, and custom-tailored solutions.</span></p>
          </div>
      </div>
    </div>

      {/* <div className="container py-5">
      <h2 className="text-center mb-4">Let’s Work Together</h2>
      <div className="row g-4 justify-content-center">
        
        <div className="col-md-8  col-12 d-flex flex-column align-items-center">
        <p className="mb-4">Looking for certified, high-quality hygiene products from a dependable supplier? Reach out to Shriram Enterprises (Hyzenith) for wholesale inquiries, sample requests, custom formulations, or collaborative opportunities.
</p>

 <button className="btn btn-danger"
  style={{width:"200px"}}>
    <a href="/contact" className=" border-0 text-white" style={{textDecoration:"none"}}>Contact us</a></button>
        </div>

       
     
      </div>
    </div> */}
    
        <div className="my-5">
          <h4 className="text-center mb-4 text-secondary">
            <u>Our Gallery</u>
          </h4>
          <div className="row">
            {slides
              ?.filter((v, i) => {
                return v?.category == "Gallery";
              })
              .map((v, i) => {
                return (
                  <div className="col-md-4 col-12 mb-md-4 mb-2 px-0 px-md-2">
                    <img className="img-fluid" src={v?.image} />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
        <FooterNav selectedItem="Menu" />
      <Footer />
    </>
  );
};

export default page;
