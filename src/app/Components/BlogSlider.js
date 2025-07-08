"use client";
import React, { useEffect, useRef, useState } from "react";
import { getBlogListServ } from "../services/blog.service";
import { useRouter } from "next/navigation";
import moment from "moment";
function BlogSlider() {
  const router = useRouter();
  const [list, setList]=useState([])
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
    <div style={{background:"whitesmoke"}} className="py-md-5 py-2">
       <div className="container">
         <h2 className="mb-4" style={{ fontFamily: "poppins" }}>
        Must Read for Hyzine Business
      </h2>
      <div className="row mb-4">
        {list?.map((v, i) => {
          return (
            <div className="col-md-4 col-12 " key={i}>
              <div className="aboutMissionCard border p-2 shadow mb-2 blogCard" style={{background:"white"}}>
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
    </div>
  );
}

export default BlogSlider;
