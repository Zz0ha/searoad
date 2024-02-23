import React, { useState, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import ModalPortal from 'ModalPortal';
import { ModalFlexible } from 'components/ModalFlexible';
import StaffBase from 'components/staff/template/StaffBase';
import ConfirmedOrderControlPanel from 'components/staff/organism/ConfirmedOrderControlPanel';
import ConfirmedOrderTable from 'components/staff/organism/ConfirmedOrderTable';

import { modalFlexibleCloseBtnState, modalOpenState } from 'state';
import * as constSet from 'constants/index';
import * as apiStaff from 'apis/staff';
import { mapOrderByGroupId } from 'scripts/staff/helpers/order';


const ContentTitle = (props) => {
  return (<>
    <h1>확정발주 관리</h1>
    <p>관리자에 의해 발주확정된 고객발주의 목록을 표시하고 관리합니다.</p>
  </>);
}

const ContentBody = (props) => {
  // 모달 State
  const setModalFlexibleCloseBtn = useSetRecoilState(modalFlexibleCloseBtnState);
  const modalOpen = useSetRecoilState(modalOpenState);
  const [modalContent, setModalContent] = useState(null);

  // API에서 가져온 주문 목록
  const [rawOrdersArr, setRawOrdersArr] = useState([]);

  // API에서 가져와 정제한 주문 목록
  // - ordersArr:
  //   주문 목록 Array. rawOrderArr의 변화에 따라 trigger 됨.
  // - ordersByGroupId:
  //   ordersArr를 group id로 묶은 Object. ordersArr의 변화에 따라 trigger 됨.
  //   이 값으로 table이 렌더링 됨
  const [ordersArr, setOrdersArr] = useState([]);
  const [ordersByGroupId, setOrdersByGroupId] = useState({});

  // 발주 체크박스
  const [checkedOrderGroupSet, setCheckedOrderGroupSet] = useState(new Set());

  // 주문 가져오기 옵션
  const [orderFetchOptions, setOrderFetchOptions] = useState({
    statusArray: [
      constSet.OrderStatusObj.ORDER_CONFIRMED,
      constSet.OrderStatusObj.PAID,
      constSet.OrderStatusObj.PRODUCT_PREPARING,
      constSet.OrderStatusObj.DELIVERING,
      constSet.OrderStatusObj.DELIVERED,
      constSet.OrderStatusObj.DEFECT_REPORTED,
      constSet.OrderStatusObj.DEFECT_RECEIVED,
      constSet.OrderStatusObj.DEFECT_CONFIRMED,
      constSet.OrderStatusObj.DEFECT_RESOLVED,
    ],
    userNickname: '',
  });

  // 주문 목록 가져오기
  useEffect(() => {
    apiStaff.getOrdersWithQuery({
      setRawOrdersArr: setRawOrdersArr,
      orderFetchOptions: orderFetchOptions,
    });
  }, [orderFetchOptions]);

  // 정제할 주문 목록을 가져온다
  useEffect(() => {
    setOrdersArr(rawOrdersArr);
  }, [rawOrdersArr]);

  // 가져온 주문 목록을 group id로 묶는다
  useEffect(() => {
    mapOrderByGroupId(setOrdersByGroupId, ordersArr);
  }, [ordersArr]);

  const modalHandler = {
    modalOpen: modalOpen,
    setModalContent: setModalContent,
    setModalFlexibleCloseBtn: setModalFlexibleCloseBtn,
  }

  const apiHandler = {
    setRawOrdersArr: setRawOrdersArr,
    orderFetchOptions: orderFetchOptions,
    setOrderFetchOptions: setOrderFetchOptions,
  }

  return (
  <>
    <ConfirmedOrderControlPanel
      ordersArr={ordersArr}
      ordersByGroupId={ordersByGroupId}
      checkedOrderGroupSet={checkedOrderGroupSet}
      setCheckedOrderGroupSet={setCheckedOrderGroupSet}
      modalHandler={modalHandler}
      apiHandler={apiHandler}
    />
    <ConfirmedOrderTable
      ordersArr={ordersArr}
      ordersByGroupId={ordersByGroupId}
      checkedOrderGroupSet={checkedOrderGroupSet}
      setCheckedOrderGroupSet={setCheckedOrderGroupSet}
      modalHandler={modalHandler}
      apiHandler={apiHandler}
    />
    <ModalPortal>
      <ModalFlexible>
        {modalContent}
      </ModalFlexible>
    </ModalPortal>
  </>)
}

const StaffConfirmedOrderList = (props) => {
  return (
    <StaffBase
      contentTitle={<ContentTitle {...props} />}
      contentBody={<ContentBody {...props} />}
    />
  );
}

export default StaffConfirmedOrderList;
