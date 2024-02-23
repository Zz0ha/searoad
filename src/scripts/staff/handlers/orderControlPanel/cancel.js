import {
  findOrderFromArray,
  cleanUpCheckedOrders,
  removePrevConfirmOrderFromConfirmOrderInfo,
  warmUpConfirmOrderInfoByGroup
} from './helper';

export default function cancelOrders ({
  ordersArr,
  setOrdersArr,
  checkedOrders,
  setCheckedOrders,
  confirmOrderInfoByGroup,
  setConfirmOrderInfoByGroup,
  btnActive,
}) {
  if(!btnActive.cancel || checkedOrders.size === 0) {
    return;
  }

  checkedOrders.forEach((orderId) => {
    const order = findOrderFromArray(ordersArr, orderId);
    const orderGroupId = order.order_group_id;

    confirmOrderInfoByGroup = warmUpConfirmOrderInfoByGroup(confirmOrderInfoByGroup, orderGroupId);

    removePrevConfirmOrderFromConfirmOrderInfo(confirmOrderInfoByGroup, order);
    if(order.is_created) {
      deleteCreatedOrderRow(ordersArr, setOrdersArr, order);
    }
  });
  Object.keys(confirmOrderInfoByGroup).forEach((orderGroupId) => {
    const confirmOrderGroup = confirmOrderInfoByGroup[orderGroupId];
    if(confirmOrderGroup.confirm_order_info_list.length < 1) {
      delete confirmOrderInfoByGroup[orderGroupId];
    }
  });

  setConfirmOrderInfoByGroup({...confirmOrderInfoByGroup});
  cleanUpCheckedOrders(setCheckedOrders);
}

const deleteCreatedOrderRow = (ordersArr, setOrdersArr, order) => {
  const foundOrder = ordersArr.find((o) => o.created_order_id === order.created_order_id);
  const idx = ordersArr.indexOf(foundOrder);
  if(idx === -1) {
    alert('생성된 주문을 찾을 수 없습니다. 새로고침 후 처음부터 다시 시도해주세요.')
    return;
  }
  ordersArr.splice(idx, 1);
  setOrdersArr([...ordersArr]);
}
