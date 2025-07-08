import React from 'react'

function InfoContainer() {
    const infoArr = [
    {
      img: "https://cdn-icons-png.flaticon.com/128/67/67994.png",
      title: "Free Shipping",
      subTitle: "On order above 1000 ",
    },
    {
      img: "https://cdn-icons-png.flaticon.com/128/3059/3059502.png",
      title: "24/7 Customer Care",
      subTitle: "Call us on anytime",
    },
    {
      img: "https://cdn-icons-png.flaticon.com/128/726/726559.png",
      title: "Secure payment",
      subTitle: "100% Safe Payment",
    },
  ];
  return (
     <div className="container infoDiv pt-md-5 pt-2">
        <div className="row ">
          {infoArr?.map((v, i) => {
            return (
              <div className="col-md-4 col-6 d-flex justify-content-center  my-2" key={i}>
                <div className="d-flex align-items-center ">
                  <div className=" d-flex justify-content-center align-items-center me-2 bgPrimary infoIconDiv">
                    <img src={v?.img} />
                  </div>
                  <div>
                    <p>{v?.title}</p>
                    <p>{v?.subTitle}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
  )
}

export default InfoContainer