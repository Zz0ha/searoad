import React from 'react';

import CheckBox from 'components/molecule/CheckBox';
import BooleanItem from 'components/staff/atom/BooleanItem';

import { formatDatetimeFromString } from 'scripts/utils';
import { reverseFindConstantText } from 'scripts/helpers/common';

import * as constSet from 'constants';

import { StTableMainContent } from 'styles/staff/MainContentTable.style';

const openProductDescriptionModal = (modalOpen, setModalContent, desc) => {
  setModalContent(desc);
  modalOpen(true);
}

export default function ProductListTable (props) {
  let {
    modalOpen,
    setModalContent,
    productGroup,
    checkedProductIdSet,
    setCheckedProductIdSet,
  } = props;

  return (<>
    <StTableMainContent>
      <thead>
        <tr>
          <th></th>
          <th>순서</th>
          <th>ID</th>
          <th>개체 최소/최대 용량</th>
          <th>1{productGroup.volume_code} 당 가격</th>
          <th>총재고</th>
          <th>예약재고</th>
          <th>판매시작</th>
          <th>판매중</th>
          <th>판매종료</th>
          <th>등록일</th>
          <th>판매시작일</th>
          <th>판매일시중지일</th>
          <th>판매종료일</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {productGroup.products.map((product, idx) => {
          return (
            <tr key={idx}>
              <td>
                <CheckBox
                  checkBoxId={product.id}
                  checkBoxIdSet={checkedProductIdSet}
                  setCheckBoxIdSet={setCheckedProductIdSet}
                />
              </td>
              <td>{product.display_priority}</td>
              <td>{product.id}</td>
              <td>{product.entity_size_str}</td>
              <td>{product.price_per_volume}{reverseFindConstantText(constSet.CurrencyCodeArr, productGroup.currency_code)}</td>
              <td>{product.total_stock}</td>
              <td>{product.reserve_stock}</td>
              <td><BooleanItem booleanValue={product.is_sale_start} /></td>
              <td><BooleanItem booleanValue={product.visible} /></td>
              <td><BooleanItem booleanValue={product.is_sale_end} /></td>
              <td>{formatDatetimeFromString(product.date_registration)}</td>
              <td>{formatDatetimeFromString(product.date_sale_start)}</td>
              <td>{formatDatetimeFromString(product.date_sale_pause)}</td>
              <td>{formatDatetimeFromString(product.date_sale_end)}</td>
              <td>
                <button
                  onClick={()=>openProductDescriptionModal(modalOpen, setModalContent, product.description)}>
                  상세
                </button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </StTableMainContent>
  </>);
}
