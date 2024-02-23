import * as apiStaff from 'apis/staff';
import * as constSet from 'constants/index';


export const changeOrderStatus = (controlFuncAttrs) => {
  let {
    checkedOrderGroupSet,
    setCheckedOrderGroupSet,
    apiHandler,
    status,
  } = controlFuncAttrs;

  console.log(`Change Order Status to ${status}`);

  let response = null;

  const orderGroupSet = checkedOrderGroupSet;

  if (status === 'paid') {
    // checkedOrderSet iterate 하면서 order_group들의 status를 'paid'로 변경하는 API 호출

    // 1. 그냥 상태만 바꿈
    // response = apiStaff.putOrderGroupStatus({
    //   orderGroupIds: Array.from(orderGroupSet),
    //   status: constSet.OrderStatusObj.PAID,
    // });

    // 2. 계좌이체 처리하는 경우
    response = apiStaff.putPaymentDirectChange({
      apiPayload: {
        orderGroupIds: Array.from(orderGroupSet),
        status: constSet.OrderStatusObj.PAID,
      },
    });
  } else if (status === 'paid-timeout') {
    // checkedOrderSet iterate 하면서 order_group들의 status를 'paid-timeout'로 변경하는 API 호출
    response = apiStaff.putOrderGroupStatus({
      orderGroupIds: Array.from(orderGroupSet),
      status: constSet.OrderStatusObj.PAYMENT_TIMEOUT,
    });
  } else if (status === 'preparing') {
    // checkedOrderSet iterate 하면서 order_group들의 status를 'preparing'로 변경하는 API 호출
    response = apiStaff.putOrderGroupStatus({
      orderGroupIds: Array.from(orderGroupSet),
      status: constSet.OrderStatusObj.PRODUCT_PREPARING,
    })
  } else if (status === 'delivering') {
    // checkedOrderSet iterate 하면서 order_group들의 status를 'delivering'로 변경하는 API 호출
    response = apiStaff.putOrderGroupStatus({
      orderGroupIds: Array.from(orderGroupSet),
      status: constSet.OrderStatusObj.DELIVERING,
    })
  } else if (status === 'delivered') {
    // checkedOrderSet iterate 하면서 order_group들의 status를 'delivered'로 변경하는 API 호출
    response = apiStaff.putOrderGroupStatus({
      orderGroupIds: Array.from(orderGroupSet),
      status: constSet.OrderStatusObj.DELIVERED,
    })
  }

  response.then((res) => {
    // 체크된 order_group_id를 checkedOrderGroupSet에서 제거
    setCheckedOrderGroupSet(new Set());
  })
  .catch((err) => {
    console.log(err);
  });

  Promise.all([response]).then((values) => {
    apiStaff.getOrdersWithQuery({
      setRawOrdersArr: apiHandler.setRawOrdersArr,
      orderFetchOptions: apiHandler.orderFetchOptions,
    });
  });
}
