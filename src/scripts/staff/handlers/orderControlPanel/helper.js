export const findOrderFromArray = (ordersArr, orderId) => {
  return ordersArr.find((order) => {
    if(order.id !== '!new!') {
      return order.id === orderId
    } else {
      return order.created_order_id === orderId
    }
  });
}

export const warmUpConfirmOrderInfoByGroup = (confirmOrderInfo, orderGroupId) => {
  if(!confirmOrderInfo.hasOwnProperty(orderGroupId)) {
    confirmOrderInfo[orderGroupId] = {
      confirm_order_info_list: [],
      delivery_group_fee_policy: {},
    };
  }
  return confirmOrderInfo
}

export const cleanUpCheckedOrders = (setCheckedOrders) => {
  setCheckedOrders(new Set());
}

export const removePrevConfirmOrderFromConfirmOrderInfo = (confirmOrderInfoByGroup, order) => {
  const confirmOrderGroup = confirmOrderInfoByGroup[order.order_group_id];
  let confirmOrderToRemove = findConfirmOrderFromConfirmOrderInfoByGroup(confirmOrderInfoByGroup, order);
  const idx = confirmOrderGroup.confirm_order_info_list.indexOf(confirmOrderToRemove);
  if(idx === -1) {
    return;
  }
  confirmOrderGroup.confirm_order_info_list.splice(idx, 1);
  return confirmOrderInfoByGroup;
}

export const findConfirmOrderFromConfirmOrderInfoByGroup = (
  confirmOrderInfoByGroup,
  order,
) => {
  let confirmOrder = undefined;
  const confirmOrderGroup = confirmOrderInfoByGroup[order.order_group_id];
  if (confirmOrderGroup) {
    confirmOrder = confirmOrderGroup.confirm_order_info_list.find(
      (confirm_order) => confirm_order.order_id === order.id
    );
  }
  return confirmOrder;
}
