"use client";

import React, { useEffect, useRef, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import HeroSection from "../Components/HeroSection";
import { getBlogListServ } from "../services/blog.service";
import { useRouter } from "next/navigation";
import moment from "moment";
import FooterNav from "../Components/FooterNav";
const page = () => {
  const router = useRouter();
  const [list, setList] = useState([]);
  const getBlogListFunc = async () => {
    let response = await getBlogListServ();
    if (response?.data?.statusCode == "200") {
      let sortedList = response?.data?.data.sort((a, b) => a.rank - b.rank);
      setList(sortedList);
    }
  };
  useEffect(() => {
    getBlogListFunc();
  }, []);

  return (
    <>
      <Navbar selectedItem="Blogs" />

      <div className="container aboutMain">
        <div className="row my-md-5 py-md-4 py-2 my-2 mx-0 mx-md-2">
          <div className="col-md-6 mt-auto col-12 order-md-1 order-2 px-0 px-md-2">
            <h1 className="mt-md-0 mt-3">{list[0]?.title}</h1>
            <h5>{moment(list[0]?.createdAt).format("DD MMM YYYY")}</h5>
            <p
              dangerouslySetInnerHTML={{ __html: list[0]?.shortDescription }}
            />

            <div className="d-flex" style={{overflowX:"scroll"}}>
              {list[0]?.tags?.split(",")?.map((v, i) => {
                return (
                  <p className="border me-2 px-2 py-1 text-dark shadow-sm">
                    {v}
                  </p>
                );
              })}
            </div>
            <button
              className="btn btn-success shadow mt-3"
              style={{ borderRadius: "8px", width: "120px" }}
              onClick={() => router.push("/blogs/" + list[0]?._id)}
            >
              Read More
            </button>
          </div>
          <div className="col-md-6  col-12 d-flex justify-content-between order-md-2 order-1 px-md-2 px-0">
            <img src={list[0]?.image} className="img-fluid" />
          </div>
        </div>
        <h4>Latest Insight</h4>
        <div className="row mb-4">
          {list?.map((v, i) => {
            return (
              <div className="col-md-4 col-12 px-md-2 px-0">
                <div className="aboutMissionCard border p-2 shadow mb-2 blogCard">
                  <p style={{ textAlign: "left" }}>
                    {moment(v?.createdAt).format("DD MMM YYYY")}
                  </p>
                  <img
                    src={v?.image}
                    className="img-fluid mb-2"
                    style={{ width: "100%", height: "150px" }}
                  />
                  <h3>{v?.title}</h3>
                  <p style={{ textAlign: "left" }}>
                    {v?.subtitle}{" "}
                    <span
                      className="text-primary"
                      style={{ cursor: "pointer" }}
                      onClick={() => router.push("/blogs/" + v?._id)}
                    >
                      <u>read More</u>
                    </span>
                  </p>
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
