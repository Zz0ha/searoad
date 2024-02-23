import {
  findOrderFromArray,
  cleanUpCheckedOrders,
  removePrevConfirmOrderFromConfirmOrderInfo,
  warmUpConfirmOrderInfoByGroup
} from './helper';

export default function deleteOrders ({
  ordersArr,
  checkedOrders,
  setCheckedOrders,
  confirmOrderInfoByGroup,
  setConfirmOrderInfoByGroup,
  btnActive,
}) {
  if(!btnActive.delete || checkedOrders.size === 0) {
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
        confirm_type: 'delete',
      }
    );

    confirmOrderInfoByGroup[orderGroupId] = confirmOrderGroup;
  });

  setConfirmOrderInfoByGroup({...confirmOrderInfoByGroup});
  cleanUpCheckedOrders(setCheckedOrders);
}
