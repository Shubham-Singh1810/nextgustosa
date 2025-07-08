"use client";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { getBanners } from "../services/banner.service";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const HeroSection = ({category}) => {
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
    <div className="hero-slider-wrapper">
      {showloader ? (
        <div>
          <Skeleton height={500} />
        </div>
      ) : (
        slides.length > 0 && (
          <Swiper
            key={slides.length}
            modules={[Autoplay]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            speed={1000}
            slidesPerView={1}
          >
            {slides.filter((v, i)=>{
              return v?.category == category
            }).map((slide, index) => (
              <SwiperSlide key={index}>
                <div className="hero-section d-flex flex-column justify-content-center">
                  <img
                    className="banner-img"
                    src={slide.image}
                    alt={`slide-${index}`}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )
      )}
    </div>
  );
};

export default HeroSection;
