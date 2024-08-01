import React, { useEffect, useState } from "react";
import { Autoplay, Navigation, Pagination, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar"; // Ensure this import if using Scrollbar
import { Swiper as ReactSwiper, SwiperSlide } from "swiper/react";
import Card from "./commonCard/Card";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa";

const Banner = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("fakedata.json")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="my-10 mx-5 w-auto md:max-w-4xl lg:max-w-5xl">
      <h1 className="font-bold text-2xl">OTC Medicine</h1>
      <div className="relative">
        <ReactSwiper
          spaceBetween={50}
          slidesPerView={3}
          navigation={{
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
          }}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Navigation, Pagination, Scrollbar]}
          breakpoints={{
            350: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {data.map((card) => (
            <SwiperSlide key={card.id}>
              <Card card={card} />
            </SwiperSlide>
          ))}
        </ReactSwiper>
        {/* Navigation buttons */}
        <div className="swiper-button-prev absolute top-1/2 left-0 transform -translate-y-1/2 bg-[#0e7673] text-white p-2 rounded-full cursor-pointer z-10">
          <span className="material-icons">
            <FaAngleLeft />
          </span>
        </div>
        <div className="swiper-button-next absolute top-1/2 right-0 transform -translate-y-1/2 bg-[#0e7673] text-white p-2 rounded-full cursor-pointer z-10">
          <span className="material-icons">
            <FaAngleRight />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Banner;
