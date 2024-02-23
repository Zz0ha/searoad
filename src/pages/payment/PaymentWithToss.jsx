import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components/macro';
import queryString from 'query-string'
import { loadPaymentWidget } from '@tosspayments/payment-widget-sdk'
// import { ANONYMOUS } from '@tosspayments/payment-widget-sdk'

import * as constSet from 'constants/index';
import { getOrderGroup } from 'apis/order'
import { postPaymentReady } from 'apis/payment';

const StyledPaymentWithToss = styled.div`
  width: 1024px;
  margin: 50px auto;
  .payment-vendor-wrapper {
    min-height: 400px;
  }
`;

const StyledPayButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
  width: 100%;
  height: 50px;
  button {
    width: 200px;
    height: 100%;
    background-color: rgb(29, 83, 201);
    color: white;
    text-align: center;
  }
`;

export const PaymentWithToss = () => {
  const queryParams = queryString.parse(window.location.search);
  const orderGroupId = queryParams.ogid;

  const [orderGroup, setOrderGroup] = useState(null);
  const [paymentRedirectUrl, setPaymentRedirectUrl] = useState(null);  // 결제 완료 후 리다이렉트할 URL
  const paymentWidgetRef = useRef(null);

  const clientKey = 'test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq';

  useEffect(() => {
    getOrderGroup({
      apiQueryString: {
        ogid: orderGroupId,
      }
    }).then((res) => {
      setOrderGroup(res.resMsg.data[0]);
    })
  }, [orderGroupId]);

  // Promise를 사용하는 경우
  // loadPaymentWidget(clientKey, customerKey).then(paymentWidget => {})

  // async/await을 사용하는 경우
  useEffect(() => {(async () => {
    if(!orderGroup) return;

    // ------  결제위젯 초기화 ------
    // 비회원 결제에는 customerKey 대신 ANONYMOUS를 사용하세요.
    const paymentWidget = await loadPaymentWidget(clientKey, orderGroup.user) // 회원 결제
    // const paymentWidget = await loadPaymentWidget(clientKey, ANONYMOUS) // 비회원 결제

    // ------  결제위젯 렌더링 ------
    // 결제위젯이 렌더링될 DOM 요소를 지정하는 CSS 선택자, 결제 금액을 넣어주세요.
    // https://docs.tosspayments.com/reference/widget-sdk#renderpaymentmethods선택자-결제-금액
    paymentWidget.renderPaymentMethods("#payment-method", orderGroup.total_price_to_pay)

    // ------  이용약관 렌더링 ------
    // 이용약관이 렌더링될 DOM 요소를 지정하는 CSS 선택자를 넣어주세요.
    // https://docs.tosspayments.com/reference/widget-sdk#renderagreement선택자
    paymentWidget.renderAgreement('#payment-term-agreement')

    paymentWidgetRef.current = paymentWidget;

    postPaymentReady({
      paymentGroupId: orderGroup.payment_group,
      paymentMethod: constSet.PaymentMethodObj.TOSS_PAYMENTS,
    })
    .then((res) => {
      const paymentRedirectUrls = res.resMsg?.payment_redirect_urls;
      setPaymentRedirectUrl({
        successUrl: paymentRedirectUrls.success_url,
        failUrl: paymentRedirectUrls.fail_url,
      });
    });

  })()}, [orderGroup]);

  return (
    <StyledPaymentWithToss>
      <div className="payment-vendor-wrapper">
        <div
          id="payment-method"
          className="payment"
        />
        <div id="payment-term-agreement" />
      </div>
      <StyledPayButton>
        <button
          onClick={() => {
            paymentWidgetRef.current.requestPayment({
              orderId: orderGroup.id,
              orderName: orderGroup.order_group_name,
              successUrl: paymentRedirectUrl.successUrl,  // 결제에 성공하면 이동
              failUrl: paymentRedirectUrl.failUrl,  // 결제에 실패하면 이동
              customerEmail: orderGroup.user_info.contact?.email,
              customerName: orderGroup.user_info.name,
            })
          }}
        >
          결제하기
        </button>
      </StyledPayButton>
    </StyledPaymentWithToss>
  );
}
