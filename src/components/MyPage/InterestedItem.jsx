import React from "react";
import { LikeItems } from "./ItemCard";

function InterestedItem() {
  return (
    <div className="orderItemCardWrap">
      <LikeItems />
      <LikeItems />
      <ul>
        <li>찜한 상품은 최대 90일간 보관됩니다.</li>
        <li>찜한 날짜와 주문날짜 간의 가격 차이가 발생 할 수 있습니다.</li>
      </ul>
    </div>
  );
}

export default InterestedItem;
