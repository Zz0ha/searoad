import React from "react";
import * as IMGURL from "../scripts/utils";
import { AiOutlineSearch } from "react-icons/ai";

function SideCategoryFilter() {
  return (
    <div className="sideCategoryFilterWrap">
      <article className="sideCategory sideAll">
        <p>카테고리</p>
        <ul className="sideBarCategoryFilter_All">
          <li>전체</li>
          <li>
            <p>활어</p>
            <img src={IMGURL.getIconURL("addIcon")} alt="" />
          </li>
          <li>
            <p>선어</p>
            <img src={IMGURL.getIconURL("addIcon")} alt="" />
          </li>
          <li>
            <p>패류</p>
            <img src={IMGURL.getIconURL("addIcon")} alt="" />
          </li>
          <li>
            <p>냉동</p>
            <img src={IMGURL.getIconURL("addIcon")} alt="" />
          </li>
        </ul>
      </article>
      <article className="sideCategory sideAll">
        <p>수량</p>
        <ul>
          <li className="includeViewButton">
            <input type="checkbox" className="checkbox_16size" id="less10" />
            <label htmlFor="less10">10개 이하</label>
          </li>
          <li className="includeViewButton">
            <input type="checkbox" className="checkbox_16size" id="less10" />
            <label htmlFor="less10">11~20개</label>
          </li>
          <li className="includeViewButton">
            <input type="checkbox" className="checkbox_16size" id="less10" />
            <label htmlFor="less10">21~50개</label>
          </li>
          <li className="includeViewButton">
            <input type="checkbox" className="checkbox_16size" id="less10" />
            <label htmlFor="less10">51~100개</label>
          </li>
          <li className="includeViewButton">
            <input type="checkbox" className="checkbox_16size" id="less10" />
            <label htmlFor="less10">101개 이상</label>
          </li>
        </ul>
      </article>
      <article className="sideCategory">
        <p>별점</p>
        <ul>
          <li>
            <input type="checkbox" className="checkbox_16size" id="less10" />
            <label htmlFor="less10">5점</label>
            <img src={IMGURL.getIconURL("sideCategoryStarScore")} alt="" />
          </li>
          <li>
            <input type="checkbox" className="checkbox_16size" id="less10" />
            <label htmlFor="less10">4점</label>
            <img src={IMGURL.getIconURL("sideCategoryStarScore")} alt="" />
          </li>
          <li>
            <input type="checkbox" className="checkbox_16size" id="less10" />
            <label htmlFor="less10">3점</label>
            <img src={IMGURL.getIconURL("sideCategoryStarScore")} alt="" />
          </li>
          <li>
            <input type="checkbox" className="checkbox_16size" id="less10" />
            <label htmlFor="less10">2점</label>
            <img src={IMGURL.getIconURL("sideCategoryStarScore")} alt="" />
          </li>
          <li>
            <input type="checkbox" className="checkbox_16size" id="less10" />
            <label htmlFor="less10">점수상관 없이 MD추천!</label>
          </li>
        </ul>
      </article>
      <article className="sideCategory">
        <p>가격대</p>
        <ul>
          <li>
            <div className="priceFilterInput">
              <input type="text" placeholder="최소금액" />~
              <input type="text" placeholder="최대금액" />
            </div>
            <div>
              <AiOutlineSearch />
            </div>
          </li>
        </ul>
      </article>
    </div>
  );
}

export default SideCategoryFilter;
