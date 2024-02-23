import React from "react";
import styled from "styled-components";

const Point = styled.div`
  text-align: center;
  font-size: 15px;
  padding: 15px 0;
`;

function MyPoint() {
  return (
    <Point>
      <p>바닷길S 포인트 준비중 입니다.</p>
    </Point>
  );
}

export default MyPoint;
