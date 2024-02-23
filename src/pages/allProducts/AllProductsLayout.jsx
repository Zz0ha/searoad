import React from "react";
import styled from "styled-components/macro";

import AllProductsList from "components/AllProductsList";

import * as utils from "scripts/utils";
import * as constSet from 'constants/index'
import { reverseFindConstantText } from 'scripts/helpers/common';

import colors from 'styles/variables/colors';

const StyledLayout = styled.div`
  display: flex;
  flex-wrap: wrap;
  .productCategoryMenu {
    width: 100%;
    padding: 10px 0;
    background-color: ${colors.tableHeaderColor};
    border-radius: 10px;
    &.allProductsList-layout {
      margin-top: 50px;
    }
  }
`;

function AllProductsLayout(props) {
  let {
    productList: productGroupList,
    refetch
  } = props;

  // TODO:
  // isLoading, isError 구현

  return (
    <>
    {
      constSet.ProductCategoryArr.map((categoryNameInfo) => {
        const categoryCode = categoryNameInfo.value;
        const productGroupOfCat = productGroupList.filter((productGroup) => productGroup.category === categoryCode);
        if(!productGroupOfCat) return null;
        const totalCountProduct = productGroupOfCat.reduce((acc, cur) => acc + cur.products.length, 0);
        return (
          productGroupOfCat.length > 0 &&
          <StyledLayout
            key={categoryNameInfo.value}
            className="container"
          >
            <div className="productCategoryMenu allProductsList-layout">
              <img
                src={utils.getIconURL(`productCategoryIcon_${categoryCode}`)}
                alt="productCategoryIcon_all"
              />
              <p>{reverseFindConstantText(constSet.ProductCategoryArr, categoryCode)} ({`${productGroupOfCat.length}종류 / ${totalCountProduct}개`})</p>
            </div>
            {
              productGroupOfCat.map((productGroup) =>
                AllProductsList({
                  productGroup,
                  refetch,
                })
              )
            }
          </StyledLayout>
        )
      })
    }
    </>
  );
}

export default AllProductsLayout;
