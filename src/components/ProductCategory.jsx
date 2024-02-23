import React from "react";
import { Link } from "react-router-dom";
import { Swiper } from "swiper/react";
import { SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";

import * as utils from "scripts/utils";
import * as constSet from 'constants/index';
import { reverseFindConstantText } from 'scripts/helpers/common';

const Product = React.lazy(() => import("components/Product"));

function ProductCategory({ categoryCode, categoryData }) {
  return (
    <section>
      <Link to="" className="productCategoryMenu">
        <img
          src={utils.getIconURL(`productCategoryIcon_${categoryCode}`)}
          alt=""
        />
        <p>{reverseFindConstantText(constSet.ProductCategoryArr, categoryCode)}</p>
      </Link>

      {categoryData && (
        <article className="mainProductBest10Product">
          <div className="allSwiperWrap">
            <Swiper
              spaceBetween={15}
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
              {categoryData.map((productGroup, idx) => {
                if(productGroup.products.length === 0) return false
                return (
                  <SwiperSlide key={productGroup.id}>
                    <Link to={`/allProductsList/${productGroup.id}`}>
                      <Product el={productGroup} idx={idx} />
                    </Link>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </article>
      )}
    </section>
  );
}

export default ProductCategory;
