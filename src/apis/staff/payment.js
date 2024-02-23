import { getCSRF } from 'apis/csrf';

export const postPaymentRefundOfDefect = async (props) => {
  let {
    apiPayload,
  } = props;

  const {
    defectId,
  } = apiPayload;

  const token = await getCSRF();

  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/api/v1/staff/payments/refund-defect/`,
    {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': token,
      },
      credentials: 'include',
      body: JSON.stringify({
        'defect_id': defectId,
      }),
    }
  );

  return response;
}

export const putPaymentDirectChange = async (props) => {
  let {
    apiPayload,
  } = props;

  let {
    orderGroupIds,
    status,
    paymentData,
  } = apiPayload;

  const token = await getCSRF();

  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/api/v1/staff/payments/direct/`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': token,
      },
      credentials: 'include',
      body: JSON.stringify({
        'order_group_ids': orderGroupIds,
        'status': status,
        'payment_data': paymentData,
      }),
    }
  );

  return response;
}
