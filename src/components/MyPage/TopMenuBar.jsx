import React from "react";
import * as IMGURL from "../../scripts/utils";
import { TfiArrowCircleRight } from "react-icons/tfi";

function TopMenuBar() {
  return (
    <div className="myPageTopMenuBar">
      <ul>
        <li>
          <div className="flex myPageUserInfo">
            <img src={IMGURL.getIconURL("gradeIcon_blue")} alt="" />
            <p>모세님</p>
          </div>
          <p>
            8월등급은 <span>BLUE</span>입니다.
          </p>
        </li>
        <li>
          <div className="flex">
            <p>배송중</p>
            <TfiArrowCircleRight />
          </div>
          <span>배송현황을 확인할 수 있어요!</span>
        </li>
        <li>
          <div className="flex">
            <p>나의 찜목록</p>
            <TfiArrowCircleRight />
          </div>
          <span>총 1004개</span>
        </li>
        <li>
          <div className="flex">
            <p>장바구니</p>
            <TfiArrowCircleRight />
          </div>
          <span>[제주/양식]제주산 줄돔(1kg~2kg)</span>
        </li>
      </ul>
    </div>
  );
}

export default TopMenuBar;
