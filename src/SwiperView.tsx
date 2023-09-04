import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import clsx from "clsx";
import ChevronLeft from "./ChevronLeft";
import ChevronRight from "./ChevronRight";

const SwiperView = () => {
  return (
    <>
      <h1 className="headingText">Featured Places</h1>
      <p className="subText">
        Explore and discover a variety of tourist places
      </p>
      <div className="swiperContainer">
        <Swiper
          navigation={{ prevEl: "#prevEl", nextEl: "#nextEl" }}
          pagination={{ clickable: true }}
          effect="coverflow"
          loop
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
          }}
          slideToClickedSlide
          slidesPerView={"auto"}
          centeredSlides
          height={700}
          modules={[EffectCoverflow, Pagination, Navigation]}
        >
          <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-5.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-6.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-7.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-8.jpg" />
          </SwiperSlide>
        </Swiper>
        <div id="prevEl" className={clsx("navButton", "prevBtn")}>
          <ChevronLeft />
        </div>
        <div id="nextEl" className={clsx("navButton", "nextBtn")}>
          <ChevronRight />
        </div>
      </div>
    </>
  );
};

export default SwiperView;
