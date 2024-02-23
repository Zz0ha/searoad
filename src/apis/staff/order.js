import { getCSRF } from 'apis/csrf';
import { simpleErrorAlert } from 'apis/errors/errorMap';

// 발주 조회
export const getOrdersWithQuery = async (props) => {
  let {
    setRawOrdersArr,
    orderFetchOptions,
  } = props;

  const {
    statusArray,
    userNickname,
  } = orderFetchOptions;

  let queryString = '';
  if(statusArray && statusArray.length > 0) {
    queryString = '?status=' + statusArray.join('&status=');
  }
  if(userNickname) {
    queryString += queryString ? `&userNickname=${userNickname}` : `?userNickname=${userNickname}`;
  }
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/api/v1/staff/orders/${queryString}`,
    {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }
  ).then((res) => res.json());

  simpleErrorAlert(response);
  if(response?.resMsg instanceof Array) {
    setRawOrdersArr(response.resMsg);
  }

  return response;
}


// 발주그룹 상태 변경
export const putOrderGroupStatus = async (props) => {
  let {
    orderGroupIds,
    status,
  } = props;

  const token = await getCSRF();

  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/api/v1/staff/order-groups/status/`,
    {
      method: 'PUT',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': token,
      },
      credentials: 'include',
      body: JSON.stringify({
        'order_group_ids': orderGroupIds,
        'status': status,
      }),
    }
  ).then((res) => res.json());

  simpleErrorAlert(response);

  return response;
}
