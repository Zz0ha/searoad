import React, { useEffect, useState } from 'react';

import { AiOutlineSearch } from 'react-icons/ai';

import * as constSet from 'constants/index';
import { changeOrderStatus } from 'scripts/staff/handlers/confirmedOrderControlPanel/changeOrderStatus';
import {
  toggleTempOrderStatusForOrderFetchOptions,
  filterSearch,
} from 'scripts/staff/helpers/confirmedOrder';

import {
  StDivConfirmedOrderControlPanel,
  StDivUserNickNameSearchButtonGroup,
  StInputUserNickNameSearch,
  StButtonUserNickNameSearch,
  StDivOrderStatusReadFilterButtonGroup,
  StDivButtonOrderStatusReadFilter,
  StDivButtonOrderStatusReadFilterSearch,
  StDivOrderStatusChangeGroup,
  StyledButtonOrderStatusChange,
} from './ConfirmedOrderControlPanel.style';

const ConfirmedOrderControlPanel = (props) => {
  const {
    ordersArr,
    checkedOrderGroupSet,
    setCheckedOrderGroupSet,
    modalHandler,
    apiHandler,
  } = props;

  const [tempOrderFetchOptions, setTempOrderFetchOptions] = useState(apiHandler.orderFetchOptions);
  const [tempUserNickname, setTempUserNickname] = useState('');

  const [statusCtrlBtnActive, setStatusCtrlBtnActive] = useState({
    paid: false,
    paidTimeout: false,
    preparing: false,
    delivering: false,
    delivered: false,
  });

  const filterFuncAttrs = {
    tempOrderFetchOptions: tempOrderFetchOptions,
    setTempOrderFetchOptions: setTempOrderFetchOptions,
    apiHandler: apiHandler,
  };

  const controlFuncAttrs = {
    ordersArr: ordersArr,
    checkedOrderGroupSet: checkedOrderGroupSet,
    setCheckedOrderGroupSet: setCheckedOrderGroupSet,
    btnActive: statusCtrlBtnActive,
    modalHandler: modalHandler,
    apiHandler: apiHandler,
  };

  useEffect(() => {
    if(checkedOrderGroupSet.size < 1) {
      setStatusCtrlBtnActive({
        paid: false,
        paidTimeout: false,
        preparing: false,
        delivering: false,
        delivered: false,
      })
    } else {
      setStatusCtrlBtnActive({
        paid: true,
        paidTimeout: true,
        preparing: true,
        delivering: true,
        delivered: true,
      });
    }
  }, [checkedOrderGroupSet]);

  const filterBtnsInfo = {
    confirmed: {
      btnClassName: 'cp-filter__confirmed',
      btnText: '발주검토완료',
      orderStatus: constSet.OrderStatusObj.ORDER_CONFIRMED,
    },
    paid: {
      btnClassName: 'cp-filter__paid',
      btnText: '결제완료',
      orderStatus: constSet.OrderStatusObj.PAID,
    },
    paidTimeout: {
      btnClassName: 'cp-filter__paid-timeout',
      btnText: '결제시간초과',
      orderStatus: constSet.OrderStatusObj.PAYMENT_TIMEOUT,
    },
    paymentCanceled: {
      btnClassName: 'cp-filter__payment-canceled',
      btnText: '결제취소',
      orderStatus: constSet.OrderStatusObj.PAYMENT_CANCELED,
    },
    paymentFailed: {
      btnClassName: 'cp-filter__payment-failed',
      btnText: '결제실패',
      orderStatus: constSet.OrderStatusObj.PAYMENT_FAILED,
    },
    orderCanceled: {
      btnClassName: 'cp-filter__order-canceled',
      btnText: '발주취소',
      orderStatus: constSet.OrderStatusObj.ORDER_CANCELED,
    },
    preparing: {
      btnClassName: 'cp-filter__preparing',
      btnText: '상품준비중',
      orderStatus: constSet.OrderStatusObj.PRODUCT_PREPARING,
    },
    delivering: {
      btnClassName: 'cp-filter__delivering',
      btnText: '배송중',
      orderStatus: constSet.OrderStatusObj.DELIVERING,
    },
    delivered: {
      btnClassName: 'cp-filter__delivered',
      btnText: '배송완료',
      orderStatus: constSet.OrderStatusObj.DELIVERED,
    },
    defectResolved: {
      btnClassName: 'cp-filter__defect-resolved',
      btnText: '불량처리완료',
      orderStatus: constSet.OrderStatusObj.DEFECT_RESOLVED,
    },
  };

  return (
    <StDivConfirmedOrderControlPanel>
      <StDivUserNickNameSearchButtonGroup>
        <div className="group-title"><b>유저 닉네임 검색</b>:</div>
        <div className="group-item">
          <StInputUserNickNameSearch
            type="text"
            placeholder="유저 닉네임"
            value={tempUserNickname}
            onChange={(e) => setTempUserNickname(e.target.value)}
          ></StInputUserNickNameSearch>
          <StButtonUserNickNameSearch
            onClick={() => apiHandler.setOrderFetchOptions({
              ...apiHandler.orderFetchOptions,
              userNickname: document.querySelector('.search__input').value,
            })}
          >
            <AiOutlineSearch />검색
          </StButtonUserNickNameSearch>
        </div>
      </StDivUserNickNameSearchButtonGroup>
      <StDivOrderStatusReadFilterButtonGroup>
        <div className="group-title"><b>주문 상태 필터:</b> (검색을 누르지 않으면 반영되지 않음)</div>
        <div className="group-item button-wrapper">
          {
            Object.keys(filterBtnsInfo).map((key, index) => {
              const { btnClassName, btnText, orderStatus } = filterBtnsInfo[key];
              return (
                <StDivButtonOrderStatusReadFilter
                  className={`${btnClassName} ${tempOrderFetchOptions.statusArray.includes(orderStatus) ? 'active' : ''}`}
                  key={index}
                  onClick={() => toggleTempOrderStatusForOrderFetchOptions(filterFuncAttrs, orderStatus)}
                >
                  {btnText}
                </StDivButtonOrderStatusReadFilter>
              );
            })
          }
          <StDivButtonOrderStatusReadFilterSearch
            onClick={() => filterSearch(filterFuncAttrs)}
          >
            <AiOutlineSearch />검색
          </StDivButtonOrderStatusReadFilterSearch>
        </div>
      </StDivOrderStatusReadFilterButtonGroup>
      <StDivOrderStatusChangeGroup>
        <div className="group-title"><b>주문 상태 변경:</b></div>
        <div className="group-item button-wrapper">
          <StyledButtonOrderStatusChange
            className={`cp-btn__paid ${statusCtrlBtnActive.paid ? 'active' : ''}`}
            onClick={() => changeOrderStatus({...controlFuncAttrs, status: 'paid'})}
          >
            결제완료
          </StyledButtonOrderStatusChange>
          <StyledButtonOrderStatusChange
            className={`${statusCtrlBtnActive.paidTimeout ? 'active' : ''} warning`}
            onClick={() => changeOrderStatus({...controlFuncAttrs, status: 'paid-timeout'})}
          >
            결제시간초과
          </StyledButtonOrderStatusChange>
          <StyledButtonOrderStatusChange
            className={`cp-btn__preparing ${statusCtrlBtnActive.preparing ? 'active' : ''}`}
            onClick={() => changeOrderStatus({...controlFuncAttrs, status: 'preparing'})}
          >
            상품준비중
          </StyledButtonOrderStatusChange>
          <StyledButtonOrderStatusChange
            className={`cp-btn__delivering ${statusCtrlBtnActive.delivering ? 'active' : ''}`}
            onClick={() => changeOrderStatus({...controlFuncAttrs, status: 'delivering'})}
          >
            배송중
          </StyledButtonOrderStatusChange>
          <StyledButtonOrderStatusChange
            className={`cp-btn__delivered ${statusCtrlBtnActive.delivered ? 'active' : ''}`}
            onClick={() => changeOrderStatus({...controlFuncAttrs, status: 'delivered'},)}
          >
            배송완료
          </StyledButtonOrderStatusChange>
        </div>
      </StDivOrderStatusChangeGroup>
    </StDivConfirmedOrderControlPanel>
  );
}

export default ConfirmedOrderControlPanel;
