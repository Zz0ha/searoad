import * as constSet from 'constants/index';

// order status filter functions

export const toggleTempOrderStatusForOrderFetchOptions = (filterFuncAttrs, orderStatus) => {
  let {
    tempOrderFetchOptions,
    setTempOrderFetchOptions,
  } = filterFuncAttrs;

  // 새로운 statusArray를 만들어서 tempOrderFetchOptions에 넣어준다.
  const tempOrderStatusSet = new Set(tempOrderFetchOptions.statusArray);
  if(tempOrderStatusSet.has(orderStatus)) {
    tempOrderStatusSet.delete(orderStatus);
  } else {
    tempOrderStatusSet.add(orderStatus);
  }
  const newTempOrderStatusArr = Array.from(tempOrderStatusSet);

  // tempOrderFetchOptions에 새로운 statusArray를 넣어준다.
  const newTempOrderFetchOptions = {
    ...tempOrderFetchOptions,
    statusArray: newTempOrderStatusArr,
  }
  setTempOrderFetchOptions(newTempOrderFetchOptions);
}

export const filterSearch = (filterFuncAttrs) => {
  let {
    tempOrderFetchOptions,
    apiHandler,
  } = filterFuncAttrs;

  apiHandler.setOrderFetchOptions({...tempOrderFetchOptions});
}
