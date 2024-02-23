import React from "react";
import { useQuery } from "react-query";
import styled from "styled-components";

import Loading from "components/Loading";
import ErrorPage from "components/ErrorPage";

import * as utils from "scripts/utils";
import { getPrettyProductName } from 'scripts/helpers/product';

const StyledOrderDetailCard = styled.div`
  display: flex;
  align-items: center;
  padding: 24px 0;
  border-bottom: 1px solid #eeeeee;
  img {
    width: 80px;
    height: 80px;
    margin-right: 30px;
  }
  .itemInfo {
    width: 100%;
    display: flex;
    justify-content: space-between;
    span {
      width: 100px;
    }
  }
  .itemName {
    flex: 1;
  }
`;

function OrderDetail({nick}) {
  const { data, isLoading, isError } = useQuery(["cart", nick]);
  const cartItem = data.resMsg;
  // const imageString = cartItem.product.image_meta;
  // const imageMeta = JSON.parse(cartItem.product.image_meta).thumbnail_url;
  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <ErrorPage />;
  }
  return (
    <section className="orderSection orderDetail">
      <h4>주문상세내역</h4>
      {cartItem.map((itemObj) => {
        const imageMeta = JSON.parse(itemObj.product.image_meta).thumbnail_url;
        return (
          <StyledOrderDetailCard key={itemObj.product.id}>
            <img
              src={
                imageMeta !== null
                  ? imageMeta
                  : utils.getImageURL("ui/v1.0/prepareImage")
              }
              alt="상품이미지"
            />
            <div className="itemInfo">
              <p className="itemName">{getPrettyProductName(itemObj.product)}</p>
              <span>{`${itemObj.quantity}개`}</span>
              <p>{`${utils.formatAccountNumber(itemObj.product.price_per_volume * itemObj.quantity)}원`}</p>
            </div>
          </StyledOrderDetailCard>
        );
      })}
    </section>
  );
}

export default OrderDetail;
