import * as constSet from 'constants/index';
import { getCSRF } from 'apis/csrf';

// 결제하기

export const postPaymentReady = async (props) => {
  let {
    paymentGroupId,
    paymentMethod,
  } = props;

  const token = await getCSRF();

  let queryString = `pgid=${paymentGroupId}&payment_method=${paymentMethod}`;

  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/api/v1/payments/ready/?${queryString}`,
    {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': token,
      },
      credentials: 'include',
    }
  )
  .then((res) => res.json())
  .then((res) => {
    if(paymentMethod === constSet.PaymentMethodObj.KAKAO_PAY) {
      const payment_redirect_urls = res.resMsg?.payment_redirect_urls
      payment_redirect_urls && window.open(payment_redirect_urls.next_redirect_pc_url, '_blank')
    }
    return res;
  });

  return response;
}


// 토스 페이먼츠 - clientKey 가져오기

export const getTossPaymentsClientKey = async () => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/api/v1/payments/toss-payments/keys/client-key/`,
    {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }
  )
  .then((res) => res.json())
  return response;
}

// 결제 결과 페이지 가져오기

export const getPaymentResult = async (props) => {
  let {
    paymentGroupId,
  } = props;

  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/api/v1/payments/result/?pgid=${paymentGroupId}`,
    {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }
  )
  .then((res) => res.json())
  return response;
}
