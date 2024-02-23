import React from "react";

function Discount() {
  return (
    <section className="orderSection discount">
      <h4>쿠폰 / 포인트</h4>
      <ul>
        <li>
          <p>쿠폰 사용</p>
          <div className="customSelectBox">
            <select name="" id="" disabled={true}>
              <option value="준비중">쿠폰 준비중입니다.</option>
            </select>
          </div>
        </li>
        <li>
          <p>포인트 사용</p>
          <div className="customSelectBox">
            <input
              name=""
              id=""
              disabled={true}
              placeholder="포인트 준비중입니다."
            />
          </div>
        </li>
      </ul>
    </section>
  );
}

export default Discount;
