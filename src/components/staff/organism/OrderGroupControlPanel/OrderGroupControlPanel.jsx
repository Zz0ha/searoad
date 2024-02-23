import React, { useEffect, useState } from 'react';

import { markUpJSON } from 'scripts/utils';
import {
  cancelOrders,
  pickOrders,
  updateOrders,
  createOrders,
  deleteOrders,
  setDeliveryGroupFee,
} from 'scripts/staff/handlers/orderControlPanel';

import * as apiStaff from 'apis/staff';

import { StDivControlPanelButtonGroup } from 'styles/staff/ControlPanel.style';
import {
  StDivOrderListControlPanel,
  StButtonOrderListControlPanel,
} from './OrderGroupControlPanel.style';


const OrderGroupControlPanel = (props) => {
  const {
    ordersArr,
    setOrdersArr,
    checkedOrders,
    setCheckedOrders,
    confirmOrderInfoByGroup,
    setConfirmOrderInfoByGroup,
    modalHandler,
    apiHandler,
  } = props;
  const [btnActive, setBtnActive] = useState({
    cancel: false,
    pick: false,
    update: false,
    create: false,
    delete: false,
    deliveryFee: false,
  });

  const controlFuncAttrs = {
    ordersArr: ordersArr,
    setOrdersArr: setOrdersArr,
    checkedOrders: checkedOrders,
    setCheckedOrders: setCheckedOrders,
    confirmOrderInfoByGroup: confirmOrderInfoByGroup,
    setConfirmOrderInfoByGroup: setConfirmOrderInfoByGroup,
    btnActive: btnActive,
    modalHandler: modalHandler,
  };

  useEffect(() => {
    if(checkedOrders.size < 1) {
      setBtnActive({
        cancel: false,
        pick: false,
        update: false,
        create: false,
        delete: false,
        deliveryFee: false,
      })
    } else if(checkedOrders.size === 1) {
      setBtnActive({
        cancel: true,
        pick: true,
        update: true,
        create: true,
        delete: true,
        deliveryFee: true,
      })
    } else {
      setBtnActive({
        cancel: true,
        pick: true,
        update: false,
        create: false,
        delete: true,
        deliveryFee: false,
      });
    }
    checkedOrders.forEach((orderId) => {
      const order = ordersArr.find(order => order.created_order_id === orderId)
      if(order && order.is_created) {
        setBtnActive({
          cancel: true,
          pick: false,
          update: false,
          create: false,
          delete: false,
          deliveryFee: false,
        });
        return;
      }
    });
  }, [checkedOrders, ordersArr]);

  return (
    <StDivOrderListControlPanel>
      <StDivControlPanelButtonGroup>
        <span className="group-title">발주 검토 적용 예정 내용</span>
        <pre
          className="control-panel__preview"
          dangerouslySetInnerHTML={{ __html: markUpJSON(confirmOrderInfoByGroup)}}>
        </pre>
      </StDivControlPanelButtonGroup>
      <StDivControlPanelButtonGroup className="horizontal space-between">
        <div className="group-item button-wrapper">
          <StButtonOrderListControlPanel
            className={`btn__cancel ${btnActive.cancel ? 'active' : ''}`}
            onClick={() => cancelOrders(controlFuncAttrs)}
          >
            취소
          </StButtonOrderListControlPanel>

          <StButtonOrderListControlPanel
            className={`btn__pick ${btnActive.pick ? 'active' : ''}`}
            onClick={() => pickOrders(controlFuncAttrs)}
          >
            승인
          </StButtonOrderListControlPanel>

          <StButtonOrderListControlPanel
            className={`btn__update ${btnActive.update ? 'active' : ''}`}
            onClick={() => updateOrders(controlFuncAttrs)}
          >
            수정
          </StButtonOrderListControlPanel>

          <StButtonOrderListControlPanel
            className={`btn__create ${btnActive.create ? 'active' : ''}`}
            onClick={() => createOrders(controlFuncAttrs)}
          >
            추가
          </StButtonOrderListControlPanel>

          <StButtonOrderListControlPanel
            className={`btn__delete ${btnActive.delete ? 'active' : ''}`}
            onClick={() => deleteOrders(controlFuncAttrs)}
          >
            삭제
          </StButtonOrderListControlPanel>

          <StButtonOrderListControlPanel
            className={`btn__delivery-fee ${btnActive.deliveryFee ? 'active' : ''}`}
            onClick={() => setDeliveryGroupFee(controlFuncAttrs)}
          >
            그룹배송료 설정
          </StButtonOrderListControlPanel>

        </div>

        <div className="button-wrapper">
          <StButtonOrderListControlPanel
            className={`btn__submit active`}
            onClick={() => apiStaff.postConfirmOrder({
              confirmOrderInfoByGroup,
              setConfirmOrderInfoByGroup,
              apiHandler,
            })}
          >
            검토 완료 및 제출
          </StButtonOrderListControlPanel>
        </div>
      </StDivControlPanelButtonGroup>
    </StDivOrderListControlPanel>
  );
}

export default OrderGroupControlPanel;
