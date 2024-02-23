import {
  findOrderFromArray,
  cleanUpCheckedOrders,
  removePrevConfirmOrderFromConfirmOrderInfo,
  warmUpConfirmOrderInfoByGroup
} from './helper';

export default function pickOrders ({
  ordersArr,
  checkedOrders,
  setCheckedOrders,
  confirmOrderInfoByGroup,
  setConfirmOrderInfoByGroup,
  btnActive,
}) {
  if(!btnActive.pick || checkedOrders.size === 0) {
    return;
  }

  checkedOrders.forEach((orderId) => {
    const order = findOrderFromArray(ordersArr, orderId);
    const orderGroupId = order.order_group_id;

    confirmOrderInfoByGroup = warmUpConfirmOrderInfoByGroup(confirmOrderInfoByGroup, orderGroupId);

    removePrevConfirmOrderFromConfirmOrderInfo(confirmOrderInfoByGroup, order);

    const confirmOrderGroup = confirmOrderInfoByGroup[orderGroupId];
    confirmOrderGroup.confirm_order_info_list.push(
      {
        order_id: order.id,
        confirm_type: 'pick',
      }
    );

    confirmOrderInfoByGroup[orderGroupId] = confirmOrderGroup;
  });

  setConfirmOrderInfoByGroup({...confirmOrderInfoByGroup});
  cleanUpCheckedOrders(setCheckedOrders);
}
