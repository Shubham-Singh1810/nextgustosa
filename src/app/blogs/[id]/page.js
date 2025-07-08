"use client";

import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import { getBlogDetailsServ } from "../../services/blog.service";
import moment from "moment";
import { useParams, useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const { id } = useParams();
  const [details, setDetails] = useState([]);
  const getBlogListFunc = async () => {
    let response = await getBlogDetailsServ(id);
    if (response?.data?.statusCode == "200") {
      setDetails(response?.data?.data);
    }
  };
  useEffect(() => {
    getBlogListFunc();
  }, []);

  return (
    <>
      <Navbar selectedItem="Blogs" />

      <div className="container aboutMain py-md-5 py-3">
        <div className="row my-md-5 my-2 mx-0 mx-md-2">
          <div className="col-md-6 mt-auto col-12 ">
            <h1>{details?.title}</h1>
            <h5>{moment(details?.createdAt).format("DD MMM YYYY")}</h5>
            <p
              dangerouslySetInnerHTML={{ __html: details?.shortDescription }}
            />

            <div className="d-flex w-100"  style={{ overflow:"auto"}}>
              {details?.tags?.split(",")?.map((v, i) => {
                return (
                  <p className="border me-2 px-2 py-1 text-dark shadow-sm">
                    {v}
                  </p>
                );
              })}
            </div>
            <button
              className="btn btn-success shadow my-2 "
              style={{ borderRadius: "8px", width: "120px" }}
              onClick={() => router.push("/blogs")}
            >
               More Blogs
            </button>
          </div>
          <div className="col-md-6  col-12 d-flex justify-content-between">
            <img src={details?.image} className="img-fluid" />
          </div>
        </div>
        <div dangerouslySetInnerHTML={{ __html: details?.description }} />
      </div>
      <Footer />
    </>
  );
};

export default page;
