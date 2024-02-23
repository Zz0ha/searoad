import React, { useEffect } from 'react';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import ErrorPage from 'components/ErrorPage';
import Loading from 'components/Loading';

import { formatAccountNumber } from 'scripts/utils';

//styledComponents
const OrderForm = styled.div`
  width: 330px;
  padding: 24px;
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
  position: sticky;
  & > div {
    padding: 13px 0;

    span {
      font-size: 15px;
      color: #666666;
    }
    &:nth-child(1) {
      border-bottom: 2px solid #eeeeee;
    }
    &:nth-child(2) {
      display: flex;
      flex-direction: column;
      gap: 15px;
      border-bottom: 1px solid #999999;
    }
    &:nth-child(3) {
      display: flex;
      justify-content: space-between;
    }
    & > div {
      display: flex;
      justify-content: space-between;
    }
  }
  .shippingCostInfo {
    background-color: #ffeaee;
    border-radius: 10px;
    padding: 10px;
    font-size: 13px;
    color: #444;
  }
  .orderDesc {
    padding-top: 30px;
    font-size: 13px;
    color: rgb(237, 5, 5);
    display: ${(props) => {
      if (props.location.pathname === '/order') {
        return 'block';
      } else {
        return 'none';
      }
    }};
  }
  button {
    width: 280px;
    height: 50px;
    background-color: #1c53c7;
    text-align: center;
    color: #fff;
    margin-top: 20px;
    :disabled {
      cursor: auto;
      background-color: #fafafa;
      border: 1px solid #999999;
      color: #999999;
    }
  }
`;

function OrderSummary({
  orderButton,
  allAgree,
  totalPrice,
  onClickOrderButton,
}) {
  const location = useLocation();

  const [disable, setDisable] = useState(false);
  const { data: nickname } = useQuery('nickname');
  const nick = nickname?.resMsg.profile.nickname;

  const { data, isLoading, isError } = useQuery(['cart', nick], {
    enabled: !!nick,
  });

  useEffect(() => {
    if (data.resMsg.length !== 0) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [data]);
  const cartItem = data?.resMsg;
  const deliveryCharge = cartItem?.length === 0 ? 0 : 80000;

  // const totalPrice =
  //   cartItem?.length === 0
  //     ? deliveryCharge
  //     : cartItem?.reduce(
  //         (acc, cur) => {
  //           setTotalPriceState(acc + cur.product.price_per_volume * cur.quantity)
  //           return acc + cur.product.price_per_volume * cur.quantity},
  //         0
  //       );

  // const totalCartItemPriceArr = cartItem.map((el) => {
  //   const price = el.product.price_per_volume;
  //   const amount = el.quantity;
  //   return price * amount;
  // });

  // const totalCartItemPrice = totalCartItemPriceArr.reduce((el, cur) => {
  //   return el + cur;
  // });

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <ErrorPage />;
  }
  return (
    <OrderForm location={location}>
      <div>발주정보</div>
      <div>
        <div>
          <span>상품금액</span>
          {cartItem?.length !== 0 ? (
            <p>{formatAccountNumber(totalPrice)}원</p>
          ) : (
            <p>0원</p>
          )}
        </div>
        <div>
          <span>기본 배송비</span>
          <p>{formatAccountNumber(deliveryCharge)}원</p>
        </div>
        <div className="shippingCostInfo">
          <p>
            기본 배송비는 최종 배송비가 아닙니다. <br />
            발주서가 작성되면 수량, 금액, 배송지역을 검토한 후 최종 배송비가
            확정됩니다.
          </p>
        </div>
      </div>
      <div>
        <span>총 결제금액</span>
        {cartItem?.length !== 0 ? (
          <p>{formatAccountNumber(totalPrice + deliveryCharge)}원</p>
        ) : (
          <p>{formatAccountNumber(deliveryCharge)}원</p>
        )}
      </div>
      <p className="orderDesc">
        고객님의 발주가 등록되면 바닷길에서 발주수량, 금액, 배송 요청사항 등을
        검토합니다.
        <br />
        검토 중에 발주 내용 확인과 조율을 위해 회원정보에 저장된 연락처로
        연락드리겠습니다.
      </p>
      {location?.pathname === '/cart' ? (
        <Link to="/order">
          <button type="button" disabled={disable} onClick={onClickOrderButton}>
            발주서 작성하기
          </button>
        </Link>
      ) : (
        <button
          type="button"
          disabled={allAgree ? false : true}
          onClick={() => orderButton()}
        >
          발주하기
        </button>
      )}
    </OrderForm>
  );
}

export default OrderSummary;
