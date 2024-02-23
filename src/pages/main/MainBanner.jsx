import React from "react";
import * as utils from "scripts/utils";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";


function MainBanner() {
  return (
    <section className="mainBanner">
      <div className="container">
        <div className="allSwiperWrap">
          <Swiper slidesPerView={1} modules={[Navigation]}>
            <SwiperSlide>
              <div className="mainBannerImage">
                <img src={utils.getImageURL("ui/v1.0/mainBanner")} alt="" />
              </div>
            </SwiperSlide>
            {/* <SwiperSlide>
              <div className="mainBannerImage">
                <img src={IMGURL.getImageURL("mainBanner")} alt="" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="mainBannerImage">
                <img src={IMGURL.getImageURL("mainBanner")} alt="" />
              </div>
            </SwiperSlide> */}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

export default MainBanner;
