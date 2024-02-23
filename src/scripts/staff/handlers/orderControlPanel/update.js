import React, { useState } from 'react';

import * as constSet from 'constants';
import { reverseFindConstantText } from 'scripts/helpers/common';
import { getPrettyProductName } from 'scripts/helpers/product';
import {
  findOrderFromArray,
  cleanUpCheckedOrders,
  removePrevConfirmOrderFromConfirmOrderInfo,
  warmUpConfirmOrderInfoByGroup,
  findConfirmOrderFromConfirmOrderInfoByGroup
} from './helper';

import { StDivConfirmOrderModal } from 'styles/staff/handlers/orderControlPanel/Modal.style';

const postUpdateOrder = ({
  ordersArr,
  checkedOrders,
  setCheckedOrders,
  confirmOrderInfoByGroup,
  setConfirmOrderInfoByGroup,
  modalHandler,
  confirmInfo,
}) => {
  checkedOrders.forEach((orderId) => {
    const order = findOrderFromArray(ordersArr, orderId);
    const orderGroupId = order.order_group_id;

    // 현재 수정은 order iteration을 돌지 않는다. (= 1 iteration)
    confirmOrderInfoByGroup = warmUpConfirmOrderInfoByGroup(confirmOrderInfoByGroup, orderGroupId);

    removePrevConfirmOrderFromConfirmOrderInfo(confirmOrderInfoByGroup, order);

    const confirmOrderGroup = confirmOrderInfoByGroup[orderGroupId];
    confirmOrderGroup.confirm_order_info_list.push({
      order_id: order.id,
      confirm_type: 'update',
      confirm_data: {
        price_per_volume: confirmInfo.pricePerVolume,
        quantity: confirmInfo.quantity,
        total_price: confirmInfo.totalPrice,
      }
    });

    confirmOrderInfoByGroup[orderGroupId] = confirmOrderGroup;
  });

  setConfirmOrderInfoByGroup({...confirmOrderInfoByGroup});
  cleanUpCheckedOrders(setCheckedOrders);

  modalHandler.modalOpen(false);
  modalHandler.setModalFlexibleCloseBtn(true);
}

const ConfirmOrderModalToUpdate = (props) => {
  let {
    ordersArr,
    checkedOrders,
    setCheckedOrders,
    confirmOrderInfoByGroup,
    setConfirmOrderInfoByGroup,
    modalHandler,
  } = props;

  const [checkedOrderId] = checkedOrders;  // Set의 첫번째 Element를 가져온다.
  const order = findOrderFromArray(ordersArr, checkedOrderId);

  let confirmOrder = findConfirmOrderFromConfirmOrderInfoByGroup(confirmOrderInfoByGroup, order);

  let defaultPricePerVolume = confirmOrder?.confirm_data?.price_per_volume;
  defaultPricePerVolume = (typeof defaultPricePerVolume === 'undefined') ? order.price_per_volume : defaultPricePerVolume;
  let defaultQuantity = confirmOrder?.confirm_data?.quantity;
  defaultQuantity = (typeof defaultQuantity === 'undefined') ? order.quantity : defaultQuantity;
  const [confirmPricePerVolume, setConfirmPricePerVolume] = useState(defaultPricePerVolume);
  const [confirmQuantity, setConfirmQuantity] = useState(defaultQuantity);

  return (
    <StDivConfirmOrderModal>
      <div className="modal__header">
        <h2 className="modal__title">발주 수정</h2>
      </div>
      <div className="modal__body">
        <div className="modal__content">
          <table>
            <tbody>
              <tr>
                <td>상품요약:</td>
                <td
                  colSpan={2}
                >{getPrettyProductName(order.product)}</td>
              </tr>
              <tr>
                <td></td>
                <td>구매자 발주</td>
                <td>관리자 수정 발주</td>
              </tr>
              <tr>
                <td>단가:</td><td>{order.price_per_volume}</td>
                <td>
                  <input
                    type="number"
                    value={confirmPricePerVolume}
                    onChange={(e) => {
                      setConfirmPricePerVolume(parseInt(e.target.value));
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td>수량{`(${reverseFindConstantText(constSet.VolumeCodeArr, order.product.volume_code)})`}:</td>
                <td>{order.quantity}</td>
                <td>
                  <input
                    type="number"
                    value={confirmQuantity}
                    onChange={(e) => {
                      setConfirmQuantity(parseInt(e.target.value));
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td>총액:</td><td>{order.price_per_volume * order.quantity}</td>
                <td>{confirmPricePerVolume * confirmQuantity}</td>
              </tr>
            </tbody>
          </table>
        </div>
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
          onClick={() => {
            postUpdateOrder({
              ordersArr,
              checkedOrders,
              setCheckedOrders,
              confirmOrderInfoByGroup,
              setConfirmOrderInfoByGroup,
              modalHandler,
              confirmInfo: {
                pricePerVolume: confirmPricePerVolume,
                quantity: confirmQuantity,
                totalPrice: confirmPricePerVolume * confirmQuantity,
              },
            });
          }}
        >
          확인
        </button>
      </div>
    </StDivConfirmOrderModal>
  )
}

export default function updateOrders ({
  ordersArr,
  checkedOrders,
  setCheckedOrders,
  confirmOrderInfoByGroup,
  setConfirmOrderInfoByGroup,
  btnActive,
  modalHandler,
}) {
  if(!btnActive.update || checkedOrders.size === 0) {
    return;
  } else if(checkedOrders.size > 1) {
    alert('한번에 하나의 주문만 수정할 수 있습니다.');
    return;
  }

  const modalAttrs ={
    ordersArr: ordersArr,
    checkedOrders: checkedOrders,
    setCheckedOrders: setCheckedOrders,
    confirmOrderInfoByGroup: confirmOrderInfoByGroup,
    setConfirmOrderInfoByGroup: setConfirmOrderInfoByGroup,
    btnActive: btnActive,
    modalHandler: modalHandler,
  }

  let setModalFlexibleCloseBtn = modalHandler.setModalFlexibleCloseBtn;
  let modalOpen = modalHandler.modalOpen;
  let setModalContent = modalHandler.setModalContent;

  const modalContent = (
    <ConfirmOrderModalToUpdate {...modalAttrs} />
  )
  setModalFlexibleCloseBtn(false);
  setModalContent(modalContent);
  modalOpen(true);
}
