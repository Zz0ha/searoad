import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';

import MainSubBanner from "./MainSubBanner";
import MainBanner from "./MainBanner";
import ProductCategory from 'components/ProductCategory'
import ModalPortal from "ModalPortal";
import { NoticeModal } from "components/Modal";
import { MainStatistics } from './MainStatistics';

import * as constSet from 'constants/index';
import * as utils from "scripts/utils";
import { reverseFindConstantText } from 'scripts/helpers/common';
import { postUserHit } from 'apis/statistics';
import { getProductsGroupsOrigin } from 'apis/products';

const StyledDivProductsNowPreparing = styled.section`
  display: flex;
  flex-direction: column;
  height: 240px;
  .product-space {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-color: rgba(153, 153, 153, .1);
    color: #999;
    margin: 40px 0;
    font-size: 20px;
  }
`;

function MainIndex(props) {
  // 카테고리 별 상품리스트는 원래는 userQuery로 가져왔었지만
  // 메인 페이지에 뿌려지는 그것은 다른 페이지에서 보여지는 상품과
  // 다른 query param을 함께 사용해야 하므로 별도로 get 한다.
  // let {
  //   productList: productGroupList,
  // } = props;
  const [productGroupList, setProductGroupList] = useState([]);

  useEffect(() => {
    getProductsGroupsOrigin({
      apiQueryString: {
        ordering: 'promotion',
        limitByCat: 20,
      }
    })
    .then((res) => {
      if(res.status === 200) {
        res.json().then((data) => setProductGroupList(data.resMsg || []));
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  // TODO:
  // isLoading, isError 구현

  useEffect(() => {
    postUserHit();
  }, []);

  return (
    <>
      <ModalPortal>
        <NoticeModal />
      </ModalPortal>

      <MainBanner />
      {/* <MainProductBest10 categoryData={categoryData} /> */}

      <MainStatistics />

      <section className="mainProductBest10">
        <div className="container">
          <h1>CATEGORY</h1>
          {/*
            위 categoryData 생성 방법2가지 중 선택한 방식에 따라 iteration 대상이 달라짐
            현재 2번 방식을 선택한 상태
           */}
          {
            constSet.ProductCategoryArr.map((categoryNameInfo) => {
              const categoryCode = categoryNameInfo.value;
              const categoryData = productGroupList.filter((productGroup) => productGroup.category === categoryCode);
              if (categoryData.length === 0) return (
                null
                // <StyledDivProductsNowPreparing>
                //   <Link to="" className="productCategoryMenu">
                //     <img
                //       src={utils.getIconURL(`productCategoryIcon_${categoryCode}`)}
                //       alt=""
                //     />
                //     <p>{reverseFindConstantText(constSet.ProductCategoryArr, categoryCode)}</p>
                //   </Link>
                //   <div className="product-space">
                //     <span>상품 준비중입니다.</span>
                //   </div>
                // </StyledDivProductsNowPreparing>
              );
              return <ProductCategory key={categoryCode} categoryCode={categoryCode} categoryData={categoryData} />
            })
          }
        </div>
      </section>
      <MainSubBanner />
    </>
  );
}

export default MainIndex;
