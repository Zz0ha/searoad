import React from 'react';

import CheckBox from 'components/molecule/CheckBox';
import CheckBoxAll from 'components/molecule/CheckBoxAll';
import BooleanItem from 'components/staff/atom/BooleanItem';
import { UserMarked } from 'components/staff/atom/UserMarked';

import { formatAccountNumber } from 'scripts/utils';
import * as constSet from 'constants/index';
import { reverseFindConstantText } from 'scripts/helpers/common';
import { getPrettyProductName } from 'scripts/helpers/product';

import { StTableOrderDetailValue } from 'styles/staff/OrderDetailViewTable.style';
import { StTableMainContent } from 'styles/staff/MainContentTable.style';

const renderTotalGroupPrice = (props) => {
  let {
    ordersByGroupId,
    groupId,
  } = props;

  const orderArrInGroup = ordersByGroupId[groupId];
  const totalPrice = orderArrInGroup.reduce((accum, order) => {
    return accum + order.total_price;
  }, 0);
  const totalDeliveryFeeByGroup = orderArrInGroup[0].total_delivery_fee_by_group;

  return (
    <StTableOrderDetailValue>
      <tbody>
        <tr>
          <td className="value-title">발주금액:</td>
          <td className="value-cell">{formatAccountNumber(totalPrice)}</td>
        </tr>
        <tr>
          <td className="value-title">배송비:</td>
          <td className="value-cell">{formatAccountNumber(totalDeliveryFeeByGroup)}</td>
        </tr>
        <tr>
          <td className="value-title final-bill">최종 금액:</td>
          <td className="value-cell final-bill">{formatAccountNumber(totalPrice + totalDeliveryFeeByGroup)}</td>
        </tr>
      </tbody>
    </StTableOrderDetailValue>
  )
}

const renderOrderRow = (props) => {
  const {
    checkedOrderGroupSet,
    setCheckedOrderGroupSet,
    numOrders,
    order,
    idx,
    modalHandler,
  } = props;

  const {
    modalOpen,
    setModalContent,
  } = modalHandler;

  const rowSpan = numOrders;
  return (
    <tr className={`${idx === 0 ? 'first-row-of-group' : ''}`} key={order.id}>
      {
        idx === 0 ? (
          <td rowSpan={rowSpan}>
            <CheckBox
              checkBoxId={order.order_group_id}
              checkBoxIdSet={checkedOrderGroupSet}
              setCheckBoxIdSet={setCheckedOrderGroupSet}
            />
          </td>
        ) : undefined
      }
      {
        idx === 0 ? (
          <td
            className="align-left"
            rowSpan={rowSpan}
          >
            <span>발주: {order.order_group_id}</span><br/>
            <span>배송: {order.delivery_group_id}</span><br/>
            <span>결제: {order.payment_group_id}</span>
          </td>
        ) : undefined
      }
      <td>{order.id}</td>
      <td>{order.status}</td>
      <td className="align-left">{getPrettyProductName(order.product)}</td>
      <td>
      {
        `${formatAccountNumber(order['price_per_volume'])}`
      }
      </td>
      <td>
      {
        `${formatAccountNumber(order['quantity'])} ${reverseFindConstantText(constSet.VolumeCodeArr, order.product.volume_code)}`
      }
      </td>
      <td>
      {
        `${formatAccountNumber(order['total_price'])}`
      }
      </td>
      {
        idx === 0 ? (
          <td rowSpan={rowSpan}>
            {renderTotalGroupPrice(props)}
          </td>
        ) : undefined
      }
      {
        idx === 0 ? (
          <>
          <td rowSpan={rowSpan} className="align-left">
            <p><b>배송지 주소:</b></p>
            <p style={{marginBottom: 5}}>
              {`(${order.delivery_request_info?.zonecode}) ${order.delivery_request_info?.address}`}<br/>
              {order.delivery_request_info?.address_detail}
            </p>
            <p><b>요청사항:</b></p>
            <p>{order.delivery_request_info?.request_detail}</p>
          </td>
          </>
        ) : undefined
      }
      {
        idx === 0 ? (
          <td
            className="align-left"
            rowSpan={rowSpan}
          >
            <span><b>성명:</b> {order.delivery_request_info?.receiver_name}</span><br/>
            <span><b>연락처:</b> {order.delivery_request_info?.receiver_contact}</span>
          </td>
        ) : undefined
      }
      <td><BooleanItem booleanValue={order.is_compensation} /></td>
      {
        idx === 0 ? (
          <td rowSpan={rowSpan}>
            <UserMarked
              user_info={order.user_info}
              has_defect_bonus_product={order.has_defect_bonus_product}
              modalOpen={modalOpen}
              setModalContent={setModalContent}
            />
          </td>
        ) : undefined
      }
      <td>{order.parent}<br/>{order.description_for_parent}</td>
    </tr>
  );
}

const ConfirmedOrderTable = (props) => {
  const {
    ordersByGroupId,
    checkedOrderGroupSet,
    setCheckedOrderGroupSet,
  } = props;
  return (
    <StTableMainContent>
      <thead>
        <tr>
          <th>
            <CheckBoxAll
              checkBoxId={'confirmed-order-checkbox-all'}
              checkBoxIdCandidates={Object.keys(ordersByGroupId)}
              checkBoxIdSet={checkedOrderGroupSet}
              setCheckBoxIdSet={setCheckedOrderGroupSet}
            />
          </th>
          <th>그룹ID</th>
          <th>발주ID</th>
          <th>상태</th>
          <th>상품요약</th>
          <th>단가 (원)</th>
          <th>수량</th>
          <th>총액 (원)</th>
          <th>그룹총액 (원)</th>
          <th>배송정보</th>
          <th>수령인 정보</th>
          <th>보상<br/>여부</th>
          <th>유저정보</th>
          <th>부모<br/>발주</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(ordersByGroupId).map(([groupId, orders], idx) => {
          const numOrders = orders.length;
          const orderRows = orders.map((order, idx) => {
            return renderOrderRow({...props, groupId, numOrders, order, idx});
          });
          return orderRows;
        })}
      </tbody>
    </StTableMainContent>
  );
}

export default ConfirmedOrderTable;
