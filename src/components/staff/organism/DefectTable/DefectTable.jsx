import React from 'react';

import CheckBox from 'components/molecule/CheckBox';
import CheckBoxAll from 'components/molecule/CheckBoxAll';
import BooleanItem from 'components/staff/atom/BooleanItem';
import { UserMarked } from 'components/staff/atom/UserMarked';

import { formatAccountNumber, formatDatetimeFromString } from 'scripts/utils';

import { StTableMainContent } from 'styles/staff/MainContentTable.style';

const DefectTable = (props) => {
  const {
    defectsArr,
    checkedDefectSet,
    setCheckedDefectSet,
    modalHandler,
  } = props;

  const {
    modalOpen,
    setModalContent,
  } = modalHandler;

  return (
    <StTableMainContent>
      <thead>
        <tr>
          <th>
            <CheckBoxAll
              checkBoxId={'defect-checkbox-all'}
              checkBoxIdCandidates={defectsArr.map(defect => defect.id)}
              checkBoxIdSet={checkedDefectSet}
              setCheckBoxIdSet={setCheckedDefectSet}
            />
          </th>
          <th>ID</th>
          <th>신고일자<br/>접수일자</th>
          <th>신고내용</th>
          <th>불량<br/>인정</th>
          <th>검토내용</th>
          <th>신고<br/>접수</th>
          <th>신고<br/>검토</th>
          <th>보상<br/>예정</th>
          <th>처리<br/>완료</th>
          <th>보상<br/>타입</th>
          <th>불량<br/>수량</th>
          <th>보상<br/>총액(원)</th>
          <th>유저<br/>정보</th>
        </tr>
      </thead>
      <tbody>
        {defectsArr.map((defect, idx) => {
          return (
            <tr key={defect.id}>
              <td>
                <CheckBox
                  checkBoxId={defect.id}
                  checkBoxIdSet={checkedDefectSet}
                  setCheckBoxIdSet={setCheckedDefectSet}
                />
              </td>
              <td className="align-left">
                <span>불량: {defect.id}</span><br/>
                <span>발주: {defect.order.id}</span>
              </td>
              <td className="align-left">
              {`신고일: ${formatDatetimeFromString(defect.order.order_date.defect_reported)}`}<br/>
              {`접수일: ${defect.order.order_date.defect_received ? formatDatetimeFromString(defect.order.order_date.defect_received) : '-'}`}<br/>
              {`확정일: ${defect.order.order_date.defect_confirmed ? formatDatetimeFromString(defect.order.order_date.defect_confirmed) : '-'}`}<br/>
              {`해결일: ${defect.order.order_date.defect_resolved ? formatDatetimeFromString(defect.order.order_date.defect_resolved) : '-'}`}
              </td>
              <td className="align-left textarea-width">{defect.report_detail}</td>
              <td>
              {
                defect.is_defective ? (
                  <span>불량</span>
                ) : (
                  <span>X</span>
                )
              }</td>
              <td className="align-left textarea-width">{defect.confirm_detail}</td>
              <td><BooleanItem booleanValue={defect.is_received} /></td>
              <td><BooleanItem booleanValue={defect.is_confirmed} /></td>
              <td><BooleanItem booleanValue={defect.is_preresolved} /></td>
              <td><BooleanItem booleanValue={defect.is_resolved} /></td>
              <td>{defect.compensation_type}</td>
              <td>{defect.defective_quantity}</td>
              <td>{formatAccountNumber(defect.compensation_cost)}</td>
              <td>
                <UserMarked
                  user_info={defect.user_info}
                  has_defect_bonus_product={defect.has_defect_bonus_product}
                  modalOpen={modalOpen}
                  setModalContent={setModalContent}
                />
              </td>
            </tr>
          )
        })}
      </tbody>
    </StTableMainContent>
  );
}

export default DefectTable;
