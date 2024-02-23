import React from "react";

//swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import ProductLowest from "../../components/ProductLowest";

function MainLowestProduct() {
  return (
    <section className="mainLowestProduct">
      <div className="container">
        <h1>비교할 수 없는 최저가 상품</h1>
        <div className="allSwiperWrap">
          <Swiper
            spaceBetween={30}
            slidesPerView={5}
            pagination={{
              el: ".swiper-pagination",
              clickable: true,
            }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            modules={[Pagination, Navigation]}
            className="swiperWrap"
          >
            <SwiperSlide>
              <ProductLowest />
            </SwiperSlide>
            <SwiperSlide>
              <ProductLowest />
            </SwiperSlide>
            <SwiperSlide>
              <ProductLowest />
            </SwiperSlide>
            <SwiperSlide>
              <ProductLowest />
            </SwiperSlide>
            <SwiperSlide>
              <ProductLowest />
            </SwiperSlide>
            <SwiperSlide>
              <ProductLowest />
            </SwiperSlide>
            <SwiperSlide>
              <ProductLowest />
            </SwiperSlide>
          </Swiper>
          <div>
            <div className="swiper-button-prev"></div>
            <div className="swiper-button-next"></div>
            <div className="swiper-pagination"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MainLowestProduct;
