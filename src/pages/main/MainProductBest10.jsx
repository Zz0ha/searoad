import React from "react";
import { Link } from "react-router-dom";
import * as IMGURL from "../../scripts/utils";
import { Swiper } from "swiper/react";
import { SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import { Navigation } from "swiper";
const Product = React.lazy(() => import("../../components/Product"));

function MainProductBest10({ categoryData }) {

  return (
    <section className="mainProductBest10">
      <div className="container">
        <h1>CATEGORY</h1>
        <section>
          <Link to="" className="productCategoryMenu">
            <img
              src={IMGURL.getIconURL("productCategoryIcon_livefish")}
              alt="productCategoryIcon_all"
            />
            <p>활어</p>
          </Link>
          <article className="mainProductBest10Product">
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
                {categoryData.live.map((el, idx) => (
                  <SwiperSlide>
                    <Link to={`/productsList/${el.id}`}>
                      <Product el={el} idx={idx} />
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
              {/* <div>
                <div className="swiper-button-prev"></div>
                <div className="swiper-button-next"></div>
                <div className="swiper-pagination"></div>
              </div> */}
            </div>
          </article>
        </section>

        <section>
          <Link to="" className="productCategoryMenu">
            <img
              src={IMGURL.getIconURL("productCategoryIcon_freshfish")}
              alt="productCategoryIcon_all"
            />
            <p>선어</p>
          </Link>
          <article className="mainProductBest10Product">
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
                {categoryData.fresh.map((el, idx) => {
                  return (
                    <SwiperSlide>
                      <Product el={el} idx={idx} />
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
        </section>

        <section>
          <Link to="" className="productCategoryMenu">
            <img
              src={IMGURL.getIconURL("productCategoryIcon_shellfish")}
              alt="productCategoryIcon_all"
            />
            <p>패류</p>
          </Link>
          <article className="mainProductBest10Product">
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
                {categoryData.shell.map((el, idx) => {
                  return (
                    <SwiperSlide>
                      <Product el={el} idx={idx} />
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
        </section>

        <section>
          <Link to="" className="productCategoryMenu">
            <img
              src={IMGURL.getIconURL("productCategoryIcon_frozen")}
              alt="productCategoryIcon_all"
            />
            <p>냉동</p>
          </Link>
          <article className="mainProductBest10Product">
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
                {categoryData.frozen.map((el, idx) => {
                  return (
                    <SwiperSlide>
                      <Product el={el} idx={idx} />
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
        </section>
      </div>
    </section>
  );
}

export default MainProductBest10;
