import { useState } from 'react';

import { formatAccountNumber } from 'scripts/utils';
import * as constSet from 'constants/index';
import * as apiStaff from 'apis/staff/index';
import { simpleAlert } from 'apis/errors/errorMap';
import { getPrettyProductName } from 'scripts/helpers/product';
import { reverseFindConstantText } from 'scripts/helpers/common';

import {
  StDivConfirmDefectModal,
  StTableDefectReviewInfo,
} from 'styles/staff/handlers/defectControlPanel/Modal.style';

const ModalToConfirm = (props) => {
  let {
    defectsArr,
    checkedDefectSet,
    setCheckedDefectSet,
    modalHandler,
    apiHandler,
    force,
  } = props;

  const defectId = Array.from(checkedDefectSet)[0];
  const defect = defectsArr.find((defect) => defect.id === defectId);
  const order = defect.order;

  const [isDefective, setIsDefective] = useState(defect.is_defective ? true : false);
  const [confirmDetail, setConfirmDetail] = useState(defect.confirm_detail ? defect.confirm_detail : '');
  const [defectiveQuantity, setDefectiveQuantity] = useState(defect.defective_quantity ? defect.defective_quantity : 0);
  const [selectBoxCompensationType, setSelectBoxCompensationType] = useState(constSet.CompensationTypeObj.REFUND);
  const [compensationCost, setCompensationCost] = useState(defect.compensation_cost ? defect.compensation_cost : 0);

  return (
    <StDivConfirmDefectModal>
      <div>
        <h2>{force ? "검토 내용 수정" : "불량 검토"}</h2>
      </div>
      <div>
        <div className="defect-order-info">
          <h3>발주 정보</h3>
          <table>
            <tbody>
              <tr>
                <td className="align-left pr-10">품명:</td>
                <td className="align-left">{`${getPrettyProductName(order.product)}`}</td>
              </tr>
              <tr>
                <td className="align-left pr-10">단가:</td>
                <td className="align-left">{`${formatAccountNumber(order.price_per_volume)}`}원</td>
              </tr>
              <tr>
                <td className="align-left pr-10">발주 수량:</td>
                <td className="align-left">{`${order.quantity}${reverseFindConstantText(constSet.VolumeCodeArr, order.product.volume_code)}`}</td>
              </tr>
              <tr>
                <td className="align-left pr-10">발주 총액:</td>
                <td className="align-left">{`${formatAccountNumber(order.total_price)}`}원</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="defect-review-info">
          <h3>불량 검토</h3>
          <StTableDefectReviewInfo>
            <tbody>
              <tr>
                <td className="align-left pr-10">불량여부:</td>
                <td className="align-left">
                  <input
                    type='radio'
                    name='is-defective'
                    id='is-defective-true'
                    value={true}
                    checked={isDefective}
                    onChange={(e) => {
                      setIsDefective(JSON.parse(e.target.value));
                    }}
                  />
                  <label htmlFor='is-defective-true'>인정</label>
                  <input
                    type='radio'
                    name='is-defective'
                    id='is-defective-false'
                    value={false}
                    checked={!isDefective}
                    onChange={(e) => {
                      setIsDefective(JSON.parse(e.target.value));
                    }}
                  />
                  <label htmlFor='is-defective-false'>불인정</label>
                </td>
              </tr>
              <tr>
                <td
                  className="align-left pr-10"
                  colSpan={2}
                >검토사유:</td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <textarea
                    className="textarea"
                    type="text"
                    value={confirmDetail}
                    onChange={(e) => {
                      setConfirmDetail(e.target.value);
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td
                  className={`align-left pr-10 ${isDefective ? '' : 'disabled'}`}
                >불량 수량:</td>
                <td>
                  <input
                    disabled={!isDefective}
                    type="number"
                    value={defectiveQuantity}
                    onChange={(e) => {
                      const newQuantity = e.target.value;
                      setDefectiveQuantity(newQuantity);
                      const newCompensationCost = newQuantity * order.price_per_volume;
                      setCompensationCost(newCompensationCost);
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td
                  className={`align-left pr-10 ${isDefective ? '' : 'disabled'}`}
                >보상 방식:</td>
                <td>
                  <select
                    disabled={!isDefective}
                    value={selectBoxCompensationType}
                    onChange={(e) => {
                      setSelectBoxCompensationType(e.target.value);
                    }}
                  >
                    <option value={constSet.CompensationTypeObj.REFUND}>환불</option>
                    <option
                      disabled={true}
                      value={constSet.CompensationTypeObj.BONUS_PRODUCT}
                    >
                      보너스 상품
                    </option>
                  </select>
                </td>
              </tr>
              <tr>
                <td
                  className={`align-left pr-10 ${isDefective ? '' : 'disabled'}`}
                >보상 총액:</td>
                <td>
                  <input
                    disabled={!isDefective}
                    type="number"
                    value={compensationCost}
                    onChange={(e) => {
                      setCompensationCost(e.target.value);
                    }}
                  />
                </td>
              </tr>
            </tbody>
          </StTableDefectReviewInfo>
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
          className="modal-confirm"
          onClick={() => {
            apiStaff.postDefectToConfirmed({
              apiQueryStrings: {
                force: defect.is_confirmed,
              },
              apiPayload: {
                defectId: defectId,
                isDefective: isDefective,
                confirmDetail: confirmDetail,
                defectiveQuantity: defectiveQuantity,
                compensationType: selectBoxCompensationType,
                compensationCost: compensationCost,
              },
            })
            .then((res) => {
              modalHandler.modalOpen(false);
              modalHandler.setModalFlexibleCloseBtn(true);
              simpleAlert(res);
              setCheckedDefectSet(new Set());
              apiHandler.refreshRawDefectsArr({apiQueryStrings: {}});
            })
          }}
        >
          확인
        </button>
      </div>
    </StDivConfirmDefectModal>
  );
}

export const confirmDefect = (props) => {
  let {
    checkedDefectSet,
    btnActive,
    modalHandler,
  } = props;

  if(!btnActive.confirm || checkedDefectSet.size === 0) {
    return;
  } else if(checkedDefectSet.size > 1) {
    alert('한번에 하나의 불량만 검토할 수 있습니다.');
    return;
  }

  const modalContent = (
    <ModalToConfirm {...props} />
  )

  modalHandler.setModalFlexibleCloseBtn(false);
  modalHandler.setModalContent(modalContent);
  modalHandler.modalOpen(true);
}
