import React from "react";
import styled from "styled-components";
import { ReviewItems } from "./ItemCard";

const ReviewTabButton = styled.div`
  height: 54px;
  border: 1px solid #999999;
  line-height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  div {
    width: 50%;
    height: 100%;
    text-align: center;
    &:not(:last-child) {
      border-right: 1px solid #999999;
    }
  }
`;

function MyReview() {
  return (
    <div className="myReviewWrap">
      <ReviewTabButton>
        <div>작성가능 리뷰</div>
        <div>작성완료 리뷰</div>
      </ReviewTabButton>
      <ReviewItems />
    </div>
  );
}

export default MyReview;
