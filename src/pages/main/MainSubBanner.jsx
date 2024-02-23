import React from "react";
import * as utils from "scripts/utils";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

function MainSubBanner() {
  return (
    <section className="mainSubBanner">
      <div className="container">
        <Swiper
          slidesPerView={1}
          navigation={{
            nextEl: ".mainBannerNextButton",
            prevEl: "mainBannerPrevButton",
          }}
          modules={[Navigation]}
        >
          <SwiperSlide>
            <div className="mainBannerImage">
              <img src={utils.getImageURL("ui/v1.0/mainSubBanner")} alt="" />
            </div>
          </SwiperSlide>
          {/* <SwiperSlide>
            <div className="mainBannerImage">
              <img src={IMGURL.getImageURL("mainSubBanner")} alt="" />
            </div>
          </SwiperSlide> */}
        </Swiper>
        <div>
          <div className="mainBannerPrevButton"></div>
          <div className="mainBannerNextButton"></div>
        </div>
      </div>
    </section>
  );
}

export default MainSubBanner;
