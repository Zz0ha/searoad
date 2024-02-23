import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import styled from 'styled-components/macro';

import Loading from 'components/Loading';
import ErrorPage from 'components/ErrorPage';
import Product from 'components/Product';

import * as utils from 'scripts/utils';
import * as constSet from 'constants/index';
import { reverseFindConstantText } from 'scripts/helpers/common';
import { getProductsGroups } from 'apis/products';

import colors from 'styles/variables/colors';

const StyledProductGroupPage = styled.div`
  padding: 100px 0;
`;

const StyledProductGroupIdentity = styled.div`
  width: 700px;
  margin: auto auto 70px auto;
  display: flex;
  flex-direction: column;
  .pgDivider-row {
    display: flex;
    &.header {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 20px;
    }
    .pgDivider-row__left, .pgDivider-row__right {
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: center;
    }
    .pgDivider-row__left {
      &.categoryIconSet {
        display: flex;
        gap: 10px;
        .categoryIcon {
          width: 35px;
        }
        .categoryName {
          font-size: 25px;
          font-weight: bold;
        }
      }
    }
    .pgDivider-row__right {
      &.pgName {
        font-size: 30px;
        font-weight: bold;
        color: ${colors.primaryColor};
      }
    }
  }
`

const StyledProductGroupGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 30px;
  &.noProduct {
    display: block;
    padding: 100px 0;
    font-size: 30px;
    text-align: center;
  }
`;

export const ProductGroupPage = (props) => {
  const [searchParams, ] = useSearchParams();
  const [productGroupName, setProductGroupName] = React.useState('');
  const [categoryCode, setCategoryCode] = React.useState('');

  const [productGroupArr, setProductGroupArr] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isError, ] = React.useState(false);

  useEffect(() => {
    const pgName = searchParams.get('pgName');
    const catCode = searchParams.get('catCode');
    getProductsGroups({
      apiQueryString: {
        pgName: pgName,
        catCode: catCode,
      }
    }).then((pgGroupArr) => {
      setProductGroupName(pgName);
      setCategoryCode(catCode);
      setProductGroupArr(pgGroupArr);
      setIsLoading(false);
    });
  }, [searchParams]);

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <ErrorPage />;
  }

  return (
    <StyledProductGroupPage>
      <div className="container">
        {/* Page Title */}
        <StyledProductGroupIdentity>
          <div className="pgDivider-row header">
            <div className="pgDivider-row__left">
              카테고리
            </div>
            <div className="pgDivider-row__right">
              상품명
            </div>
          </div>
          <div className="pgDivider-row">
            <div className="pgDivider-row__left categoryIconSet">
              <img
                className="categoryIcon"
                src={utils.getIconURL(`productCategoryIcon_${categoryCode}`)}
                alt="productCategoryIcon_all"
              />
              <span className="categoryName">
                {reverseFindConstantText(constSet.ProductCategoryArr, categoryCode)}
              </span>
            </div>
            <div className="pgDivider-row__right pgName">
              {productGroupName}
            </div>
          </div>
        </StyledProductGroupIdentity>

        {/* Page Body */}
        <StyledProductGroupGrid className={productGroupArr.length === 0 ? 'noProduct' : null}>
        {
          productGroupArr.length === 0 ? (
            <p>
              "상품 준비중 입니다."
            </p>
          ) : (
            productGroupArr.map((productGroup) => {
              if (productGroup.products.length !== 0) {
                return (
                  <Link key={productGroup.id} to={`/allProductsList/${productGroup.id}`}>
                    <Product el={productGroup} />
                  </Link>
                );
              } else {
                return null;
              }
            })
          )
        }
        </StyledProductGroupGrid>
      </div>
    </StyledProductGroupPage>
  );
}

export default ProductGroupPage;
