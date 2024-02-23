import { getCSRF } from 'apis/csrf';
import * as apiStaff from 'apis/staff';

// 발주 확정 (발주 2단계)
export const postConfirmOrder = async (props) => {
  let {
    confirmOrderInfoByGroup,
    setConfirmOrderInfoByGroup,
    apiHandler,
  } = props;

  const token = await getCSRF();

  const responses = [];

  Object.entries(confirmOrderInfoByGroup).forEach(([order_group_id, value]) => {
    const response = fetch(
      `${process.env.REACT_APP_API_URL}/api/v1/staff/orders/`,
      {
        method: 'POST',
        headers: {
          'X-CSRFToken': token,
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          order_group_id: order_group_id,
          ...value,
        }),
      }
    )
    .then((res) => res.json())
    .catch((err) => console.log(err));

    responses.push(response);
  });

  Promise.all(responses).then((values) => {
    apiStaff.getOrdersWithQuery({
      setRawOrdersArr: apiHandler.setRawOrdersArr,
      orderFetchOptions: apiHandler.orderFetchOptions,
    });
    setConfirmOrderInfoByGroup({});
    console.log('발주 확정 완료 promise callback')
  });

}
