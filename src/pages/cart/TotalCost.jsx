import React from "react";
import styled from "styled-components";

const OrderBill = styled.div`
  width: 830px;
  background-color: rgba(28, 83, 199, 0.05);
  padding: 24px;
  display: flex;
  gap: 8px;

  p {
    font-size: 14px;
    span {
      font-size: 15px;
    }
  }
`;

function TotalCost() {
  return (
    <OrderBill>
      <p>
        주문금액 <span>115,850원 </span>
      </p>
      <p>-</p>
      <p>
        할인금액 <span>19,250원</span>
      </p>
      <p>+</p>
      <p>
        기본배송비 <span>3,000원</span>
      </p>
      <p>=</p>
      <p>
        <span>99,600원</span>
      </p>
    </OrderBill>
  );
}

export default TotalCost;
