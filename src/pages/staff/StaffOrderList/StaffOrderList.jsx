import React, { useState, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import ModalPortal from 'ModalPortal';
import { ModalFlexible } from 'components/ModalFlexible';
import StaffBase from 'components/staff/template/StaffBase';
import OrderGroupTable from 'components/staff/organism/OrderGroupTable';
import OrderGroupControlPanel from 'components/staff/organism/OrderGroupControlPanel';

import { modalFlexibleCloseBtnState, modalOpenState } from 'state';
import * as constSet from 'constants/index';
import * as apiStaff from 'apis/staff';
import { mapOrderByGroupId, } from 'scripts/staff/helpers/order';

const ContentTitle = (props) => {
  return (
    <>
      <h1>고객발주 검토</h1>
      <p>고객의 발주를 검토합니다.</p>
    </>
  );
}

const ContentBody = (props) => {
  // 모달 State
  const setModalFlexibleCloseBtn = useSetRecoilState(modalFlexibleCloseBtnState);
  const modalOpen = useSetRecoilState(modalOpenState);
  const [modalContent, setModalContent] = useState(null);
  // API에서 가져온 주문 목록
  const [rawOrdersArr, setRawOrdersArr] = useState([]);
  // API에서 가져와 정제한 주문 목록
  const [ordersArr, setOrdersArr] = useState([]);
  const [ordersByGroupId, setOrdersByGroupId] = useState({});
  // 체크박스
  const [checkedOrders, setCheckedOrders] = useState(new Set());
  // 발주 확정 정보
  const [confirmOrderInfoByGroup, setConfirmOrderInfoByGroup] = useState({});

  // 주문 가져오기 옵션
  const [orderFetchOptions, ] = useState({
    statusArray: [constSet.OrderStatusObj.ORDERED],
    userNickname: '',
  });

  // 주문 목록을 가져온다.
  useEffect(() => {
    apiStaff.getOrdersWithQuery({
      setRawOrdersArr: setRawOrdersArr,
      orderFetchOptions: orderFetchOptions,
    });
  }, [orderFetchOptions]);

  // 정제할 주문 목록을 가져온다.
  useEffect(() => {
    setOrdersArr(rawOrdersArr);
  }, [rawOrdersArr]);

  useEffect(() => {
    mapOrderByGroupId(setOrdersByGroupId, ordersArr);
  }, [ordersArr]);

  const modalHandler = {
    'setModalFlexibleCloseBtn': setModalFlexibleCloseBtn,
    'modalOpen': modalOpen,
    'setModalContent': setModalContent,
  }

  const apiHandler = {
    'setRawOrdersArr': setRawOrdersArr,
    orderFetchOptions: orderFetchOptions,
  }

  return (
    <>
      <OrderGroupControlPanel
        confirmOrderInfoByGroup={confirmOrderInfoByGroup}
        setConfirmOrderInfoByGroup={setConfirmOrderInfoByGroup}
        ordersArr={ordersArr}
        setOrdersArr={setOrdersArr}
        checkedOrders={checkedOrders}
        setCheckedOrders={setCheckedOrders}
        modalHandler={modalHandler}
        apiHandler={apiHandler}
      />
      <OrderGroupTable
        ordersArr={ordersArr}
        setOrdersArr={setOrdersArr}
        ordersByGroupId={ordersByGroupId}
        checkedOrders={checkedOrders}
        setCheckedOrders={setCheckedOrders}
        confirmOrderInfoByGroup={confirmOrderInfoByGroup}
        modalHandler={modalHandler}
      />
      <ModalPortal>
        <ModalFlexible>
          {modalContent}
        </ModalFlexible>
      </ModalPortal>
    </>
  );
}

const StaffOrderList = (props) => {
  return (
    <StaffBase
      contentTitle={<ContentTitle {...props} />}
      contentBody={<ContentBody {...props} />}
    />
  );
}

export default StaffOrderList;
