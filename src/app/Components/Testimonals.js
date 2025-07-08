import React from "react";

const Testimonals = () => {
  const testimonialArr = [
    {
      para: "I recently tried Gustoosa Food's raw makhana and was blown away by the quality and taste. The makhana was fresh and crunchy, and had a subtle nutty flavor that was simply delicious. I love that it's a healthy snack option that I can feel good about eating, and I'll definitely be ordering more in the future!",
      name: "Shubham Singh",
      designation: "Software Developer",
    },
    {
      para: "I recently tried Gustoosa Food's raw makhana and was blown away by the quality and taste. The makhana was fresh and crunchy, and had a subtle nutty flavor that was simply delicious. I love that it's a healthy snack option that I can feel good about eating, and I'll definitely be ordering more in the future!",
      name: "Shubham Singh",
      designation: "Software Developer",
    },
    {
      para: "I recently tried Gustoosa Food's raw makhana and was blown away by the quality and taste. The makhana was fresh and crunchy, and had a subtle nutty flavor that was simply delicious. I love that it's a healthy snack option that I can feel good about eating, and I'll definitely be ordering more in the future!",
      name: "Shubham Singh",
      designation: "Software Developer",
    },
  ];
  return (
    <>
      <div className="testimonals">
        <div className="row d-flex align-items-center gx-0">
          <div className="col-md-5 col-12 ">
            <h1 className="text-white">Testimonials</h1>
            <h1 className="testi-h">What our customers say</h1>
            {/* <h1  className="testi-h"></h1> */}
          </div>

          <div className="col-md-7 col-12">
            <div
              id="testimonialCarousel"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner ">
                {testimonialArr?.map((v, i) => {
                  return (
                    <div
                      className={"carousel-item  " + (i == 0 ? " active" : " ")}
                      key={i}
                    >
                      <div
                        className="card text-center d-flex align-items-center shadow"
                        style={{
                          height: "350px",
                          padding: "15px",
                          borderRadius: "none",
                        }}
                      >
                        <div className="testi-card my-auto">
                          <p className="mb-3 testimonal-para ">{v?.para}</p>
                          <h2 className="mb-0 ">{v?.name}</h2>
                          <h5 className="text-muted mb-0">{v?.designation}</h5>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Controls */}
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#testimonialCarousel"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon rounded-circle p-3"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#testimonialCarousel"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon  rounded-circle p-3"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimonals;
