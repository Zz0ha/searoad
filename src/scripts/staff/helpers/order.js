export const mapOrderByGroupId = (setOrdersByGroupId, ordersArr) => {
  const ordersByGroupId = {}
  ordersArr.forEach((order, idx) => {
    const groupId = order.order_group_id;
    if(ordersByGroupId[groupId] === undefined) {
      ordersByGroupId[groupId] = [];
    }
    ordersByGroupId[groupId].push(order);
  });
  setOrdersByGroupId(ordersByGroupId);
}
