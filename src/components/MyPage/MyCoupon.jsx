import React from "react";
import styled from "styled-components";

const Coupon = styled.div`
  text-align: center;
  font-size: 15px;
  padding: 15px 0;
`;
function MyCoupon() {
  return (
    <Coupon>
      <p>할인쿠폰 준비 중입니다.</p>
    </Coupon>
  );
}

export default MyCoupon;
