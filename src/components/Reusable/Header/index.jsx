
import { Link } from "react-router-dom"

import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';

import "./Header.css"

import Img_1 from "../../../Images/sale-banner.webp"
import Img_2 from "../../../Images/swipe_banner.webp"

import { useEffect } from "react";

function HeaderPage() {
  return (
    <div className="swiper-container mx-auto px-3 py-6 sm:px-6 md:px-8 lg:px-10 xl:px-12 ">
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={0} // No space between slides
      slidesPerView={1} // Show only one slide at a time
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      autoplay={{
        delay: 2500,  // Delay between transitions (in ms)
        disableOnInteraction: false  // Continue autoplay after interaction
      }}
      className="w-full rounded-md"
    >
 
 <SwiperSlide>
  <img src={Img_1} alt="Slide 1" className="w-full  object-cover" />
</SwiperSlide>
      <SwiperSlide>
        <img src={Img_2} alt="Slide 2"className="w-full object-cover" />
      </SwiperSlide>
      {/* Additional slides if needed */}
    </Swiper>
    {/* Custom navigation buttons can be added here if desired */}
  </div>
  );
}

export default HeaderPage;