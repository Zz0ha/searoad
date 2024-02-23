import React, { useState } from 'react';

import { cleanUpCheckedOrders, findOrderFromArray, warmUpConfirmOrderInfoByGroup } from './helper';

import { StDivStaffModal } from 'styles/staff/Modal.style';

const applyDeliveryGroupFee = (props) => {
  let {
    confirmOrderInfoByGroup,
    setConfirmOrderInfoByGroup,
    order,
    setCheckedOrders,
    feeInfo,
    modalHandler,
  } = props;

  confirmOrderInfoByGroup = warmUpConfirmOrderInfoByGroup(confirmOrderInfoByGroup, order.order_group_id);
  const confirmOrderGroup = confirmOrderInfoByGroup[order.order_group_id];
  confirmOrderGroup.delivery_group_fee_policy = {
    fee_by_group: feeInfo.feeByGroup,
    extra_fee_by_group: feeInfo.extraFeeByGroup,
  }
  confirmOrderInfoByGroup[order.order_group_id] = confirmOrderGroup;
  setConfirmOrderInfoByGroup({...confirmOrderInfoByGroup});
  cleanUpCheckedOrders(setCheckedOrders);

  modalHandler.modalOpen(false);
  modalHandler.setModalFlexibleCloseBtn(true);
}

const DeliveryGroupFeeModal = (props) => {
  let {
    modalHandler,
  } = props;

  const [feeByGroup, setFeeByGroup] = useState(80000);
  const [extraFeeByGroup, setExtraFeeByGroup] = useState(0);

  return (
    <StDivStaffModal>
      <div>그룹배송료 설정</div>
      <div>
        <table>
          <tbody>
            <tr>
              <td>그룹배송료</td>
              <td>
                <input
                  type="number"
                  value={feeByGroup}
                  onChange={(e) => setFeeByGroup(parseInt(e.target.value))}
                />
              </td>
            </tr>
            <tr>
              <td>추가배송료</td>
              <td>
                <input
                  type="number"
                  value={extraFeeByGroup}
                  onChange={(e) => setExtraFeeByGroup(parseInt(e.target.value))}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="modal__buttons">
        <button
          className="modal-cancel"
          onClick={() => {
            modalHandler.modalOpen(false);
            modalHandler.setModalFlexibleCloseBtn(true);
          }}
        >
          취소
        </button>
        <button
          className="modal-confirm"
          onClick={() => applyDeliveryGroupFee({
            ...props,
            feeInfo: {
              feeByGroup: feeByGroup,
              extraFeeByGroup: extraFeeByGroup,
            }})
          }
        >적용</button>
      </div>
    </StDivStaffModal>
  );
}

export default function setDeliveryGroupFee (props) {
  let {
    checkedOrders,
    ordersArr,
    modalHandler,
    btnActive,
  } = props;
  if(!btnActive.deliveryFee || checkedOrders.size === 0) return;

  const [checkedOrderID] = checkedOrders;  // Set의 첫번째 요소만 가져옴
  const order = findOrderFromArray(ordersArr, checkedOrderID);

  const modalContent = (
    <DeliveryGroupFeeModal {...props} order={order} />
  );

  modalHandler.setModalFlexibleCloseBtn(false);
  modalHandler.setModalContent(modalContent);
  modalHandler.modalOpen(true);
}
