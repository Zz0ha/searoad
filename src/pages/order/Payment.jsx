import React, { useEffect, useState } from "react";
import OrderSummary from "../cart/OrderSummary";

function Payment({ orderButton }) {
  const [allAgree, setAllAgree] = useState(false);
  const [checkCondition, setCheckCondition] = useState(false);
  const [checkPersonalInfo, setCheckPersonalInfo] = useState(false);
  useEffect(()=>{
    if(checkCondition && checkPersonalInfo){
      setAllAgree(true)
    } else {
      setAllAgree(false)
    }
  },[checkCondition, checkPersonalInfo])

  return (
    <section className="orderSection payment">
      <div className="paymentInfo">
        <h4>결제동의</h4>
        {/* <div className="paymentMethodWrap">
          <p>결제수단 선택</p>
          <div className="paymentMethod">
            <div>무통장입금</div>
            <ul>
              <li>신용카드</li>
              <li>카카오페이</li>
              <li>네이버페이</li>
            </ul>
          </div>
        </div> */}

        {/* 체크박스 */}
        <div className="paymentCheckBox">
          <div className="paymentAgreementCheck">
            <div className="checkBoxButton paymentAllCheckBox">
              <input
                type="checkbox"
                id="paymentAllCheck"
                onChange={(e) => {
                  if (e.target.checked) {
                    setAllAgree(true);
                    setCheckCondition(true);
                    setCheckPersonalInfo(true);
                  } else {
                    setAllAgree(false);
                    setCheckCondition(false);
                    setCheckPersonalInfo(false);
                  }
                }}
                checked={checkCondition && checkPersonalInfo}
              />
              <label htmlFor="paymentAllCheck" className="allAgreeCheckBox">
                <span>전체동의</span> 개인정보 수집 및 제공
              </label>
            </div>
            <ul className="paymentEssential">
              <li>
                <input
                  type="checkbox"
                  id="checkCondition"
                  onChange={(e) => setCheckCondition(e.target.checked)}
                  checked={checkCondition}
                />
                <label htmlFor="checkCondition">
                  (필수)상품 구매조건을 확인하였으며, 결제 진행 및 개인정보
                  수집·이용에 동의합니다.
                </label>
              </li>
              <li>
                <input
                  type="checkbox"
                  id="checkPersonalInfo"
                  onChange={(e) => setCheckPersonalInfo(e.target.checked)}
                  checked={checkPersonalInfo}
                />
                <label htmlFor="checkPersonalInfo">
                  (필수)개인정보 수집 및 이용동의
                </label>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <OrderSummary orderButton={orderButton} allAgree={allAgree}/>
    </section>
  );
}

export default Payment;
