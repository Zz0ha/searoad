import React from "react";
import Product from "../../components/Product";
import * as IMGURL from "../../scripts/utils";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import { Navigation } from "swiper";
import { useQuery } from "react-query";
import { getProductsGroups } from "apis/products";

function MainRecommendedProduct() {
  const { data } = useQuery("allProducts");
  const productList = data.resMsg;
  return (
    <section className="mainProductBest10">
      <div className="container">
        <h1>MD가 추천하는 상품</h1>
        <article className="mainProductBest10Product">
          <div className="allSwiperWrap">
            <Swiper
              spaceBetween={30}
              slidesPerView={4}
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
              {data.resCode !== "E-C401-1001" &&
                productList.map((el) => {
                  return (
                    <SwiperSlide>
                      <Product el={el} />
                    </SwiperSlide>
                  );
                })}
            </Swiper>
            {/* <div>
              <div className="swiper-button-prev"></div>
              <div className="swiper-button-next"></div>
              <div className="swiper-pagination"></div>
            </div> */}
          </div>
        </article>
      </div>
    </section>
  );
}

export default MainRecommendedProduct;
