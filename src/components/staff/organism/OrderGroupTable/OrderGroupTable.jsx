import React from 'react';

import CheckBox from 'components/molecule/CheckBox';
import CheckBoxAll from 'components/molecule/CheckBoxAll';
import BooleanItem from 'components/staff/atom/BooleanItem';
import { UserMarked } from 'components/staff/atom/UserMarked';

import { formatAccountNumber } from 'scripts/utils';
import * as constSet from 'constants/index';
import { reverseFindConstantText } from 'scripts/helpers/common';
import { getPrettyProductName } from 'scripts/helpers/product';
import { findConfirmOrderFromConfirmOrderInfoByGroup } from 'scripts/staff/handlers/orderControlPanel/helper';

import { StTableOrderDetailValue } from 'styles/staff/OrderDetailViewTable.style';
import {
  StTableOrderGroup,
  StTrOrderGroupTableRow,
  StSpanConfirmResult,
} from './OrderGroupTable.style';

const renderConfirmValueCompare = (order, valueName, valueCode, confirmOrderInfo, confirmType) => {
  const confirmData = confirmOrderInfo?.confirm_data;

  let confirmPricePerVolume;
  if(confirmType === 'pick') {
    confirmPricePerVolume = formatAccountNumber(order[valueName]);
  } else if(confirmType === 'delete') {
    confirmPricePerVolume = '-';
  } else if(confirmData) {
    confirmPricePerVolume = formatAccountNumber(confirmData[valueName]);
  }
  return (
    <StTableOrderDetailValue>
      <tbody>
        <tr>
          <td className="value-title">검토전:</td>
          <td className="value-cell">{formatAccountNumber(order[valueName])}</td>
          {
            valueCode !== '원' ? (
              <td className="value-code-cell" rowSpan={2}>{valueCode}</td>
            ) : null
          }
        </tr>
        <tr>
          <td className="value-title">검토후:</td>
          <td className="value-cell">{confirmPricePerVolume}</td>
        </tr>
      </tbody>
    </StTableOrderDetailValue>
  )
}

const renderDetailTableForGroupValueCompare = (ordersByGroupId, confirmOrderInfoByGroup, groupId) => {
  // ordersArr로부터 정제해서 만든 orderGroup
  const originOrderGroup = ordersByGroupId[groupId];
  // 검토 확정을 위해 생성한 orderGroup
  const confirmOrderGroup = confirmOrderInfoByGroup[groupId];

  // 검토전 총 금액
  const originTotalPrice = originOrderGroup.reduce((accum, order) => {
    if(order.id === '!new!') {  // 검토에 의해 ordersArr에 추가된 발주 건너뛰기
      return accum;
    }
    return accum + order.total_price;
  }, 0);

  // 검토후 총 금액
  let confirmTotalPrice = 0;
  if(confirmOrderGroup) {
    confirmTotalPrice = confirmOrderGroup.confirm_order_info_list.reduce((accum, confirmOrderInfo) => {
      const confirmType = confirmOrderInfo.confirm_type;
      const order_id = confirmOrderInfo.order_id;

      if(confirmType === 'pick') {
        const order = originOrderGroup.find(order => order.id === order_id);
        return accum + order.total_price;
      } else if(confirmType === 'delete') {
        return accum;
      } else if(confirmType === 'create' || confirmType === 'update') {
        const order = confirmOrderInfo.confirm_data;
        return accum + order.total_price;
      } else {
        alert(`잘못된 confirmType: ${confirmType}`);
        return accum;
      }

    }, 0);
  }

  // 그룹 배송비
  let deliveryFee = 0;
  const delivery_group_fee_policy = confirmOrderGroup?.delivery_group_fee_policy;
  if(delivery_group_fee_policy && !(Object.keys(delivery_group_fee_policy).length === 0)) {
    deliveryFee = delivery_group_fee_policy.fee_by_group;
  }

  return (
    <StTableOrderDetailValue>
      <tbody>
        <tr>
          <td className="value-title">검토전:</td>
          <td className="value-cell">{formatAccountNumber(originTotalPrice)}</td>
        </tr>
        <tr>
          <td className="value-title">검토후:<br/><span className="modifier">(배송비 X)</span></td>
          <td className="value-cell">{formatAccountNumber(confirmTotalPrice)}</td>
        </tr>
        <tr>
          <td className="value-title">그룹 배송비:</td>
          <td className="value-cell">{formatAccountNumber(deliveryFee)}</td>
        </tr>
        <tr>
          <td className="value-title final-bill">최종 금액:<br/><span className="modifier">(배송비 O)</span></td>
          <td className="value-cell final-bill">{formatAccountNumber(confirmTotalPrice+deliveryFee)}</td>
        </tr>
      </tbody>
    </StTableOrderDetailValue>
  )
}

const renderOrderRow = (props) => {
  const {
    ordersByGroupId,
    confirmOrderInfoByGroup,
    checkedOrders,
    setCheckedOrders,
    groupId,
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

  let confirmOrderInfo = findConfirmOrderFromConfirmOrderInfoByGroup(confirmOrderInfoByGroup, order);
  const confirmType = confirmOrderInfo?.confirm_type

  const isCreated = order.is_created;

  const uniqueOrderId = !isCreated ? order.id : order.created_order_id;
  return (
    <StTrOrderGroupTableRow className={`${idx === 0 ? 'first-row-of-group' : ''}`} key={uniqueOrderId}>
      <td>
        <CheckBox
          checkBoxId={uniqueOrderId}
          checkBoxIdSet={checkedOrders}
          setCheckBoxIdSet={setCheckedOrders}
        />
      </td>
      <td className="confirm-cell">
      {
        confirmType === undefined ? (
          <StSpanConfirmResult className="confirm-result" resultType="not-confirmed">
            미정
          </StSpanConfirmResult>
        ) :
        confirmType === 'pick' ? (
          <StSpanConfirmResult className="confirm-result" resultType="pick">
            승인
          </StSpanConfirmResult>
        ) :
        confirmType === 'update' ? (
          <StSpanConfirmResult className="confirm-result" resultType="update">
            수정
          </StSpanConfirmResult>
        ) :
        confirmType === 'create' ? (
          <StSpanConfirmResult className="confirm-result" resultType="create">
            추가
          </StSpanConfirmResult>
        ) :
        confirmType === 'delete' ? (
          <StSpanConfirmResult className="confirm-result" resultType="delete">
            삭제
          </StSpanConfirmResult>
        ) :
        (
          <StSpanConfirmResult className="confirm-result" resultType="not-defined">
            에러
          </StSpanConfirmResult>
        )
      }
      </td>
      {
        !isCreated && idx === 0 ? (
          <>
          <td rowSpan={rowSpan}>{groupId}</td>
          </>
        ) : undefined
      }
      <td>{order.id}</td>
      <td>{order.status}</td>
      <td className="align-left">{getPrettyProductName(order.product)}</td>
      <td>
      {
        renderConfirmValueCompare(
          order,
          'price_per_volume', reverseFindConstantText(constSet.CurrencyCodeArr, order.product.currency_code),
          confirmOrderInfo, confirmType
        )
      }
      </td>
      <td>
      {
        renderConfirmValueCompare(
          order,
          'quantity', reverseFindConstantText(constSet.VolumeCodeArr, order.product.volume_code),
          confirmOrderInfo, confirmType
        )
      }
      </td>
      <td>
      {
        renderConfirmValueCompare(
          order,
          'total_price', reverseFindConstantText(constSet.CurrencyCodeArr, order.product.currency_code),
          confirmOrderInfo, confirmType
        )
      }
      </td>
      {
        !isCreated && idx === 0 ? (
          <td rowSpan={rowSpan}>
          {
            renderDetailTableForGroupValueCompare(ordersByGroupId, confirmOrderInfoByGroup, groupId)
          }
          </td>
        ) : undefined
      }
      {
        !isCreated && idx === 0 ? (
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
        !isCreated && idx === 0 ? (
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
    </StTrOrderGroupTableRow>
  );
}

const OrderGroupTable = (props) => {
  const {
    ordersArr,
    ordersByGroupId,
    checkedOrders,
    setCheckedOrders,
  } = props;

  return (
    <StTableOrderGroup>
      <thead>
        <tr>
          <th>
            <CheckBoxAll
              checkBoxId={'order-checkbox-all'}
              checkBoxIdCandidates={ordersArr.map(order => order.id)}
              checkBoxIdSet={checkedOrders}
              setCheckBoxIdSet={setCheckedOrders}
            />
          </th>
          <th>검토<br/>결과</th>
          <th>발주그룹ID</th>
          <th>발주ID</th>
          <th>상태</th>
          <th>상품요약</th>
          <th>단가 (원)</th>
          <th>수량</th>
          <th>총액 (원)</th>
          <th>그룹 총액(원)</th>
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
    </StTableOrderGroup>
  );
}

export default OrderGroupTable;
