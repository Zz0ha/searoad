export const findOrderGroupIdFromArray = (ordersArr, orderId) => {
  const order = ordersArr.find((order) => {
      return order.id === orderId
  });
  return order.order_group_id;
}

export const makeOrderGroupSetFromCheckedOrderSet = (checkedOrderSet, ordersArr) => {
  // checkedOrderSet을 순회하면서 그 안에 있는 order id를 ordersArr에서 찾아서 order_group_id를 Set에 넣는다.
  const orderGroupSet = new Set();
  checkedOrderSet.forEach((orderId) => {
    orderGroupSet.add(findOrderGroupIdFromArray(ordersArr, orderId));
  });
  return orderGroupSet;
}

export const hasDuplicateOrderGroupInCheckedOrderSet = (checkedOrderSet, ordersArr) => {
  const orderGroupSet = makeOrderGroupSetFromCheckedOrderSet(checkedOrderSet, ordersArr);
  return orderGroupSet.size !== checkedOrderSet.size;
}
